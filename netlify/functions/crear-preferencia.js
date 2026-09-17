// ==========================================================
// LUMELLA BEAUTY — Netlify Function: crear-preferencia
// ----------------------------------------------------------
// Esta función corre en el SERVIDOR de Netlify, nunca en el
// navegador del cliente. Por eso aquí (y SOLO aquí) es seguro
// usar el Access Token secreto de Mercado Pago: el navegador
// del cliente nunca lo ve, solo llama a esta URL.
//
// El token se lee de una variable de entorno de Netlify
// (Site settings → Environment variables → MERCADOPAGO_ACCESS_TOKEN),
// nunca está escrito aquí en el código. Así, aunque cualquiera
// pueda ver el código de tu sitio (HTML/CSS/JS), JAMÁS podrá ver
// esta clave.
// ==========================================================

exports.handler = async (event) => {
  // Solo aceptamos solicitudes POST (las que hace script.js al pagar)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Falta configurar MERCADOPAGO_ACCESS_TOKEN en las variables de entorno de Netlify.",
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "JSON inválido" }) };
  }

  const { cliente, items } = payload;

  if (!cliente || !items || !Array.isArray(items) || items.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: "Faltan datos del pedido" }) };
  }

  // URL base de tu propio sitio (Netlify la provee automáticamente).
  // Sirve para que Mercado Pago sepa a dónde devolver al cliente
  // después de pagar (o de cancelar).
  const siteUrl = process.env.URL || "https://tu-sitio.netlify.app";

  // Armamos el "preference" que espera la API de Mercado Pago.
  // Documentación: https://www.mercadopago.com.co/developers/es/reference/preferences/_checkout_preferences/post
  const preference = {
    items: items.map((item) => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio,
      currency_id: "COP",
    })),
    payer: {
      name: cliente.nombre,
      phone: { number: cliente.telefono },
      address: { street_name: `${cliente.direccion}, ${cliente.ciudad}` },
    },
    back_urls: {
      success: `${siteUrl}/?pago=exitoso`,
      failure: `${siteUrl}/?pago=fallido`,
      pending: `${siteUrl}/?pago=pendiente`,
    },
    auto_return: "approved",
    notification_url: `${siteUrl}/.netlify/functions/webhook-pago`,
    // Guardamos los datos del cliente en metadata: el webhook los recibe
    // de vuelta cuando Mercado Pago confirma el pago, para poder avisarte
    // con el pedido completo (nombre, dirección, etc.)
    metadata: { cliente },
  };

  try {
    const respuesta = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error de Mercado Pago:", data);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Mercado Pago rechazó la solicitud", detalle: data }),
      };
    }

    // init_point es el link al que redirigimos al cliente para que pague
    return {
      statusCode: 200,
      body: JSON.stringify({ init_point: data.init_point }),
    };
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno" }) };
  }
};

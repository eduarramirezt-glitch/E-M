// ==========================================================
// E&M — Netlify Function: crear-orden
// ----------------------------------------------------------
// Esta función corre en el SERVIDOR de Netlify, nunca en el
// navegador del cliente. Por eso aquí (y SOLO aquí) es seguro
// usar el Access Token secreto de Mercado Pago.
//
// Usa la API de Orders (v1/orders), que es la integración de
// Checkout Pro RECOMENDADA actualmente por Mercado Pago — la
// antigua API de Preferences (checkout/preferences) está en
// camino de quedar obsoleta, así que esta función ya usa la
// vía nueva desde el principio.
//
// El token se lee de una variable de entorno de Netlify
// (Site settings → Environment variables → MERCADOPAGO_ACCESS_TOKEN),
// nunca está escrito aquí en el código.
// ==========================================================

exports.handler = async (event) => {
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

  if (!cliente || !cliente.email || !items || !Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Faltan datos del pedido (revisa que venga el correo del cliente)" }),
    };
  }

  const siteUrl = process.env.URL || "https://tu-sitio.netlify.app";

  // El total y cada precio deben mandarse como texto con 2 decimales,
  // y total_amount debe ser exactamente la suma de unit_price * quantity.
  const totalAmount = items
    .reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    .toFixed(2);

  const orderBody = {
    type: "online",
    processing_mode: "manual", // requerido para Checkout Pro (redirect)
    total_amount: totalAmount,
    external_reference: `EM-${Date.now()}`,
    payer: {
      email: cliente.email,
      first_name: cliente.nombre,
    },
    items: items.map((item) => ({
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio.toFixed(2),
    })),
    config: {
      online: {
        success_url: `${siteUrl}/?pago=exitoso`,
        failure_url: `${siteUrl}/?pago=fallido`,
        pending_url: `${siteUrl}/?pago=pendiente`,
        auto_return: "approved",
      },
    },
    // Guardamos los datos completos del cliente para poder avisarte
    // el pedido completo cuando llegue la confirmación por webhook.
    metadata: { cliente },
  };

  try {
    const respuesta = await fetch("https://api.mercadopago.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        // Requerido por Mercado Pago: un identificador único por cada
        // intento de pago, para evitar que se duplique si se reintenta.
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(orderBody),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error de Mercado Pago (status " + respuesta.status + "):", JSON.stringify(data));
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Mercado Pago rechazó la solicitud", detalle: data }),
      };
    }

    // checkout_url es el link al que redirigimos al cliente para pagar.
    // Se deja un pequeño log para poder confirmar en los logs de Netlify
    // la forma exacta de la respuesta la primera vez que se pruebe con
    // credenciales reales (las respuestas de APIs de pago pueden variar
    // ligeramente entre cuentas/países).
    console.log("Respuesta de Mercado Pago:", JSON.stringify(data));

    const checkoutUrl = data.checkout_url || data.init_point || data?.transactions?.checkout_url;

    if (!checkoutUrl) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Mercado Pago no devolvió un link de pago", detalle: data }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ init_point: checkoutUrl }) };
  } catch (error) {
    console.error("Error creando la orden:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno" }) };
  }
};

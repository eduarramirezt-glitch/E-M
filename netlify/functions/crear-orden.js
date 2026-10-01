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
//
// Los precios se toman SIEMPRE de perfumes.js (la misma lista que
// usa la página). El precio que manda el navegador se ignora: si
// alguien lo cambia, igual se cobra el precio real.
// ==========================================================

const TODOS_LOS_PERFUMES = require("../../perfumes.js");

// Mismo id que usa el carrito en script.js: el nombre sin tildes y en minúsculas
function perfumeId(nombre) {
  return (nombre || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Solo se pueden comprar los perfumes visibles y con precio
const PERFUMES_POR_ID = new Map(
  TODOS_LOS_PERFUMES.filter((p) => !p.oculto && p.precio > 0).map((p) => [perfumeId(p.nombre), p])
);

const MAX_UNIDADES = 20; // por perfume y por pedido

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

  // Cada producto se busca en la lista; nombre y precio salen de ahí, no del navegador
  const lineas = [];
  for (const item of items) {
    const perfume = PERFUMES_POR_ID.get(item && perfumeId(item.id));
    const cantidad = Number(item && item.cantidad);
    if (!perfume || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_UNIDADES) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "El pedido tiene un producto o una cantidad no válida" }),
      };
    }
    lineas.push({ nombre: perfume.nombre, precio: perfume.precio, cantidad });
  }

  const siteUrl = process.env.URL || "https://tu-sitio.netlify.app";

  // Para pesos colombianos (COP) Mercado Pago espera montos como texto
  // SIN decimales (la moneda no tiene centavos) — usar "145000", no "145000.00".
  const totalAmount = lineas
    .reduce((sum, linea) => sum + linea.precio * linea.cantidad, 0)
    .toString();

  const orderBody = {
    type: "online",
    processing_mode: "manual", // requerido para Checkout Pro (redirect)
    total_amount: totalAmount,
    external_reference: `EM-${Date.now()}`,
    payer: {
      email: cliente.email,
      first_name: cliente.nombre,
    },
    items: lineas.map((linea) => ({
      title: linea.nombre,
      quantity: linea.cantidad,
      unit_price: linea.precio.toString(),
    })),
    config: {
      online: {
        success_url: `${siteUrl}/?pago=exitoso`,
        failure_url: `${siteUrl}/?pago=fallido`,
        pending_url: `${siteUrl}/?pago=pendiente`,
        auto_return: "approved",
      },
    },
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

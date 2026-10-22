// ==========================================================
// E&M — Netlify Function: crear-orden (POST /.netlify/functions/crear-orden)
// ----------------------------------------------------------
// Esta función corre en el SERVIDOR de Netlify, nunca en el
// navegador del cliente. Por eso aquí (y SOLO aquí) es seguro
// usar el Access Token secreto de Mercado Pago.
//
// Usa la API de Orders (v1/orders), que es la integración de
// Checkout Pro recomendada actualmente por Mercado Pago.
//
// El token se lee de una variable de entorno de Netlify
// (Site settings → Environment variables → MERCADOPAGO_ACCESS_TOKEN),
// nunca está escrito aquí en el código.
//
// Nombre y precio de cada producto salen SIEMPRE del catálogo
// (el que edita el panel /admin). El precio que manda el navegador
// se ignora: si alguien lo cambia, igual se cobra el precio real.
// ==========================================================

import { leerCatalogo, normalizar } from "../compartido/catalogo.mjs";

const MAX_UNIDADES = 20; // por perfume y por pedido

const respuesta = (status, datos) =>
  new Response(typeof datos === "string" ? datos : JSON.stringify(datos), { status });

export default async (req) => {
  if (req.method !== "POST") return respuesta(405, "Método no permitido");

  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!ACCESS_TOKEN) {
    return respuesta(500, { error: "Falta configurar MERCADOPAGO_ACCESS_TOKEN en las variables de entorno de Netlify." });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (e) {
    return respuesta(400, { error: "JSON inválido" });
  }

  const { cliente, items } = payload || {};
  if (!cliente || !cliente.email || !items || !Array.isArray(items) || items.length === 0) {
    return respuesta(400, { error: "Faltan datos del pedido (revisa que venga el correo del cliente)" });
  }

  // Solo se pueden comprar los perfumes visibles y con precio
  const { perfumes } = await leerCatalogo();
  const porId = new Map(perfumes.filter((p) => !p.oculto && p.precio > 0).map((p) => [p.id, p]));

  // Cada producto se busca en el catálogo; nombre y precio salen de ahí, no del navegador
  const lineas = [];
  for (const item of items) {
    const perfume = porId.get(item && normalizar(item.id));
    const cantidad = Number(item && item.cantidad);
    if (!perfume || !Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_UNIDADES) {
      return respuesta(400, { error: "El pedido tiene un producto o una cantidad no válida" });
    }
    lineas.push({ nombre: perfume.nombre, precio: perfume.precio, cantidad });
  }

  const siteUrl = process.env.URL || "https://eymesencial.me";

  // Para pesos colombianos (COP) Mercado Pago espera montos como texto
  // SIN decimales (la moneda no tiene centavos) — usar "145000", no "145000.00".
  const totalAmount = lineas.reduce((sum, linea) => sum + linea.precio * linea.cantidad, 0).toString();

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
    const mp = await fetch("https://api.mercadopago.com/v1/orders", {
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

    const data = await mp.json();

    if (!mp.ok) {
      console.error("Error de Mercado Pago (status " + mp.status + "):", JSON.stringify(data));
      return respuesta(502, { error: "Mercado Pago rechazó la solicitud", detalle: data });
    }

    console.log("Respuesta de Mercado Pago:", JSON.stringify(data));

    const checkoutUrl = data.checkout_url || data.init_point || data?.transactions?.checkout_url;
    if (!checkoutUrl) {
      return respuesta(502, { error: "Mercado Pago no devolvió un link de pago", detalle: data });
    }

    return respuesta(200, { init_point: checkoutUrl });
  } catch (error) {
    console.error("Error creando la orden:", error);
    return respuesta(500, { error: "Error interno" });
  }
};

// ==========================================================
// LUMELLA BEAUTY — Netlify Function: webhook-pago
// ----------------------------------------------------------
// Mercado Pago llama automáticamente a esta URL cada vez que
// el estado de un pago cambia (aprobado, rechazado, pendiente).
// No la llama el cliente ni tu página: la llama Mercado Pago
// directamente desde sus servidores.
//
// IMPORTANTE — esto YA funciona sin que hagas nada extra:
// Mercado Pago también te avisa de cada venta automáticamente
// por su propia app / dashboard (mercadopago.com.co), con
// notificación push a tu celular. Esta función es un EXTRA
// por si más adelante quieres, por ejemplo, que también te
// llegue un correo o un mensaje de WhatsApp automático (eso
// requiere conectar un servicio adicional, como Resend para
// correos — te puedo ayudar con eso cuando quieras ese paso).
// Por ahora, esta función solo confirma que Mercado Pago
// recibió el aviso y deja el detalle registrado en los logs
// de Netlify (Site → Functions → webhook-pago → ver logs).
// ==========================================================

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

  try {
    const notificacion = JSON.parse(event.body || "{}");
    console.log("Notificación de Mercado Pago recibida:", notificacion);

    // Si es una notificación de pago, consultamos el detalle completo
    if (notificacion.type === "payment" && notificacion.data && notificacion.data.id && ACCESS_TOKEN) {
      const pagoId = notificacion.data.id;
      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${pagoId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      const pago = await resp.json();

      console.log("Detalle del pago:", {
        estado: pago.status,
        monto: pago.transaction_amount,
        correo_pagador: pago.payer?.email,
        referencia: pago.external_reference,
      });

      // 👉 Aquí es donde, en el futuro, se agregaría el envío de
      // correo o WhatsApp automático usando los datos de `pago`.
    }

    return { statusCode: 200, body: "OK" };
  } catch (error) {
    console.error("Error procesando webhook:", error);
    // Igual respondemos 200 para que Mercado Pago no siga reintentando
    return { statusCode: 200, body: "OK" };
  }
};

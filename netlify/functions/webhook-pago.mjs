// ==========================================================
// E&M — webhook de Mercado Pago (POST /.netlify/functions/webhook-pago)
// ----------------------------------------------------------
// Mercado Pago llama a esta dirección cuando cambia el estado de
// una orden o de un pago (se configura en su panel de
// desarrolladores → Webhooks). No se confía en lo que llega:
// se vuelve a consultar la orden o el pago con el token secreto
// y, con su "external_reference" (el código EM-XXXXXX), se
// actualiza el pedido que ve el panel /admin.
// Aunque esto no esté configurado, el panel consulta los pagos
// pendientes cada vez que se abre la pestaña Pedidos.
// ==========================================================

import { actualizarPedido, codigoValido, consultarOrdenMP, estadoDesdeMercadoPago, leerPedido } from "../compartido/pedidos.mjs";

const ok = () => new Response("OK", { status: 200 });

async function consultarPago(id) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) return null;
  const resp = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return resp.ok ? resp.json() : null;
}

export default async (req) => {
  if (req.method !== "POST") return new Response("Método no permitido", { status: 405 });

  try {
    const aviso = await req.json().catch(() => ({}));
    const url = new URL(req.url);
    const tipo = aviso.type || aviso.topic || url.searchParams.get("type") || url.searchParams.get("topic") || "";
    const id = (aviso.data && aviso.data.id) || url.searchParams.get("data.id") || url.searchParams.get("id");
    console.log("Aviso de Mercado Pago:", tipo, id);
    if (!id) return ok();

    let codigo = null;
    let estado = null;
    if (tipo.startsWith("order")) {
      const orden = await consultarOrdenMP(id);
      codigo = orden && orden.external_reference;
      estado = estadoDesdeMercadoPago(orden);
    } else if (tipo === "payment") {
      const pago = await consultarPago(id);
      codigo = pago && pago.external_reference;
      if (pago && pago.status === "approved") estado = "pagado";
      else if (pago && ["rejected", "cancelled", "refunded", "charged_back"].includes(pago.status)) estado = "pago fallido";
    }

    if (codigoValido(codigo) && estado) {
      // solo se toca un pedido que sigue esperando el pago (no se deshace "enviado", etc.)
      const actual = await leerPedido(codigo);
      if (actual && ["esperando pago", "pago fallido"].includes(actual.pedido.estado)) {
        await actualizarPedido(codigo, { estado });
        console.log("Pedido", codigo, "→", estado);
      }
    }
  } catch (error) {
    console.error("Error procesando el aviso:", error);
  }
  // siempre 200, para que Mercado Pago no reintente sin fin
  return ok();
};

// Panel /admin, pestaña Pedidos:
//   GET   /api/admin/pedidos                    → los últimos 200 pedidos (más recientes primero)
//   PATCH /api/admin/pedidos {codigo, estado}   → cambia el estado (enviado, entregado…)
// Antes de responder el GET, los pedidos de Mercado Pago que siguen
// "esperando pago" (de los últimos 7 días) se consultan en Mercado Pago,
// así quedan como "pagado" aunque el webhook no esté configurado.
import { exigirSesion, json } from "../compartido/catalogo.mjs";
import { ESTADOS, actualizarPedido, consultarOrdenMP, estadoDesdeMercadoPago, listarPedidos } from "../compartido/pedidos.mjs";

const SIETE_DIAS = 7 * 24 * 3600e3;

async function revisarPagosPendientes(pedidos) {
  const pendientes = pedidos
    .filter((p) => p.estado === "esperando pago" && p.mp_orden && Date.now() - Date.parse(p.fecha) < SIETE_DIAS)
    .slice(0, 15);
  await Promise.all(
    pendientes.map(async (p) => {
      try {
        const nuevo = estadoDesdeMercadoPago(await consultarOrdenMP(p.mp_orden));
        if (nuevo) Object.assign(p, await actualizarPedido(p.codigo, { estado: nuevo }));
      } catch (error) {
        console.error("No se pudo consultar Mercado Pago para", p.codigo, error);
      }
    })
  );
}

export default async (req) => {
  const sinSesion = exigirSesion(req);
  if (sinSesion) return sinSesion;

  try {
    if (req.method === "GET") {
      const pedidos = await listarPedidos(200);
      await revisarPagosPendientes(pedidos);
      return json({ pedidos });
    }

    if (req.method === "PATCH") {
      const { codigo, estado } = await req.json();
      if (!ESTADOS.includes(estado)) return json({ error: "Ese estado no existe." }, 400);
      const pedido = await actualizarPedido(codigo, { estado });
      if (!pedido) return json({ error: "No encontré ese pedido." }, 404);
      return json({ pedido });
    }

    return json({ error: "Método no permitido" }, 405);
  } catch (error) {
    console.error(error);
    return json({ error: "No se pudo completar. Intenta de nuevo." }, 500);
  }
};

export const config = { path: "/api/admin/pedidos" };

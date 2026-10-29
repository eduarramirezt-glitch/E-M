// ==========================================================
// E&M — pedidos (Netlify Blobs, almacén "em-pedidos")
// ----------------------------------------------------------
// Cada pedido se guarda en "pedidos/<fecha>-<código>" (así salen
// ordenados por fecha) y "codigos/<código>" apunta a esa clave.
// Los crea crear-orden (cualquier método de pago) y los lee y
// actualiza el panel (admin-pedidos) y el webhook de Mercado Pago.
// ==========================================================

import { getStore } from "@netlify/blobs";
import { randomBytes } from "node:crypto";

export const almacenPedidos = () => getStore({ name: "em-pedidos", consistency: "strong" });

export const ESTADOS = ["nuevo", "esperando pago", "pagado", "pago fallido", "enviado", "entregado", "cancelado"];

const LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O ni 1/I para dictarlo sin confusiones
export const codigoValido = (c) => /^EM-[A-HJ-NP-Z2-9]{6}$/.test(c || "");
export function codigoNuevo() {
  const b = randomBytes(6);
  return "EM-" + Array.from(b, (x) => LETRAS[x % LETRAS.length]).join("");
}

export async function guardarPedidoNuevo(pedido) {
  const tienda = almacenPedidos();
  const clave = `pedidos/${pedido.fecha.replace(/[:.]/g, "-")}-${pedido.codigo}`;
  const indice = await tienda.setJSON(`codigos/${pedido.codigo}`, { clave }, { onlyIfNew: true });
  if (!indice.modified) return false; // ese código ya existe
  await tienda.setJSON(clave, pedido);
  return true;
}

export async function leerPedido(codigo) {
  const tienda = almacenPedidos();
  const indice = await tienda.get(`codigos/${codigo}`, { type: "json" });
  if (!indice) return null;
  const pedido = await tienda.get(indice.clave, { type: "json" });
  return pedido ? { clave: indice.clave, pedido } : null;
}

export async function actualizarPedido(codigo, cambio) {
  const encontrado = await leerPedido(codigo);
  if (!encontrado) return null;
  const pedido = { ...encontrado.pedido, ...cambio, actualizado: new Date().toISOString() };
  await almacenPedidos().setJSON(encontrado.clave, pedido);
  return pedido;
}

// los más recientes primero
export async function listarPedidos(maximo = 200) {
  const tienda = almacenPedidos();
  const { blobs } = await tienda.list({ prefix: "pedidos/" });
  const claves = blobs.map((b) => b.key).sort().reverse().slice(0, maximo);
  const pedidos = await Promise.all(claves.map((k) => tienda.get(k, { type: "json" })));
  return pedidos.filter(Boolean);
}

// ---------- Mercado Pago: consultar si una orden ya se pagó ----------

// estado de la orden en Mercado Pago → estado del pedido (null = sin cambio)
export function estadoDesdeMercadoPago(orden) {
  const s = (orden && orden.status) || "";
  if (s === "processed") return "pagado";
  if (["canceled", "cancelled", "expired", "failed", "refunded", "charged_back"].includes(s)) return "pago fallido";
  return null;
}

export async function consultarOrdenMP(idOrden) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token || !idOrden) return null;
  const resp = await fetch(`https://api.mercadopago.com/v1/orders/${encodeURIComponent(idOrden)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) return null;
  return resp.json();
}

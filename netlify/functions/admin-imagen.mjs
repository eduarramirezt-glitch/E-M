// POST /api/admin/imagen — recibe la foto ya preparada por el panel
// (JPEG o WebP de 800x640) y la guarda en Netlify Blobs.
// Devuelve la dirección pública: /img/<clave>
import { randomBytes } from "node:crypto";
import { almacenImagenes, exigirSesion, json } from "../compartido/catalogo.mjs";

const MAX_BYTES = 2 * 1024 * 1024;

const tipoReal = (b) => {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { tipo: "image/jpeg", ext: "jpg" };
  if (b.slice(0, 4).toString() === "RIFF" && b.slice(8, 12).toString() === "WEBP") return { tipo: "image/webp", ext: "webp" };
  if (b[0] === 0x89 && b.slice(1, 4).toString() === "PNG") return { tipo: "image/png", ext: "png" };
  return null;
};

export default async (req) => {
  const sinSesion = exigirSesion(req);
  if (sinSesion) return sinSesion;
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  const bytes = Buffer.from(await req.arrayBuffer());
  if (bytes.length === 0) return json({ error: "No llegó ninguna foto." }, 400);
  if (bytes.length > MAX_BYTES) return json({ error: "La foto pesa demasiado (máximo 2 MB)." }, 413);
  const formato = tipoReal(bytes);
  if (!formato) return json({ error: "El archivo no es una foto JPG, PNG o WebP." }, 400);

  const clave = `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.${formato.ext}`;
  await almacenImagenes().set(clave, bytes, { metadata: { tipo: formato.tipo } });
  return json({ url: `/img/${clave}` });
};

export const config = { path: "/api/admin/imagen" };

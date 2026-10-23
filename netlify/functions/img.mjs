// GET /img/<clave> — entrega las fotos subidas desde el panel.
// Cada foto tiene una clave única y nunca cambia, así que la CDN la
// guarda para siempre y esta función casi nunca se ejecuta.
import { almacenImagenes } from "../compartido/catalogo.mjs";

export default async (req, context) => {
  const clave = context.params.clave || "";
  if (!/^[\w.-]+$/.test(clave)) return new Response("No encontrada", { status: 404 });

  const foto = await almacenImagenes().getWithMetadata(clave, { type: "arrayBuffer" });
  if (!foto) return new Response("No encontrada", { status: 404 });

  return new Response(foto.data, {
    headers: {
      "Content-Type": (foto.metadata && foto.metadata.tipo) || "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Netlify-CDN-Cache-Control": "public, durable, max-age=31536000, immutable",
      "Netlify-Vary": "query=v", // "?algo" inventado no salta la caché
    },
  });
};

export const config = { path: "/img/:clave" };

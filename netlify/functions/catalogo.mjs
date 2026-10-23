// GET /api/catalogo — los perfumes visibles, para la tienda.
// La CDN de Netlify guarda la respuesta; el panel la borra (etiqueta
// "catalogo") cada vez que alguien guarda un cambio.
import { json, leerCatalogo, versionPublica } from "../compartido/catalogo.mjs";

export default async (req) => {
  if (req.method !== "GET") return json({ error: "Método no permitido" }, 405);
  const { perfumes } = await leerCatalogo();
  return json({ perfumes: versionPublica(perfumes) }, 200, {
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control": "public, durable, s-maxage=300, stale-while-revalidate=60",
    "Netlify-Cache-Tag": "catalogo",
    // "?algo" inventado no crea otra copia en caché (ni otra ejecución de la función)
    "Netlify-Vary": "query=v",
  });
};

export const config = { path: "/api/catalogo" };

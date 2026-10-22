// Panel /admin:
//   GET    /api/admin/catalogo           → todos los perfumes (también los ocultos)
//   PUT    /api/admin/catalogo  {perfume} → crea o actualiza uno (sin id = nuevo)
//   DELETE /api/admin/catalogo?id=…      → lo borra del catálogo
// Todo exige la sesión de admin-login.
import { purgeCache } from "@netlify/functions";
import { exigirSesion, idNuevo, json, leerCatalogo, modificarCatalogo, validarPerfume } from "../compartido/catalogo.mjs";

// la tienda deja de mostrar la versión vieja apenas se guarda
async function refrescarTienda() {
  try {
    await purgeCache({ tags: ["catalogo"] });
  } catch (error) {
    console.error("No se pudo limpiar la caché del catálogo:", error);
  }
}

export default async (req) => {
  const sinSesion = exigirSesion(req);
  if (sinSesion) return sinSesion;

  try {
    if (req.method === "GET") {
      const { perfumes, origen } = await leerCatalogo();
      return json({ perfumes, origen });
    }

    if (req.method === "PUT") {
      const { perfume } = await req.json();
      const limpio = validarPerfume(perfume);
      let guardado;
      await modificarCatalogo((perfumes) => {
        const ids = new Set(perfumes.map((p) => p.id));
        const nombreRepetido = perfumes.find((p) => p.id !== limpio.id && p.nombre.toLowerCase() === limpio.nombre.toLowerCase());
        if (nombreRepetido) throw new Error(`Ya existe un perfume llamado "${limpio.nombre}".`);
        if (limpio.id && ids.has(limpio.id)) {
          guardado = limpio;
          return perfumes.map((p) => (p.id === limpio.id ? limpio : p));
        }
        guardado = { ...limpio, id: idNuevo(limpio.nombre, ids) };
        return [guardado, ...perfumes];
      });
      await refrescarTienda();
      return json({ perfume: guardado });
    }

    if (req.method === "DELETE") {
      const id = new URL(req.url).searchParams.get("id");
      let encontrado = false;
      await modificarCatalogo((perfumes) => {
        encontrado = perfumes.some((p) => p.id === id);
        return perfumes.filter((p) => p.id !== id);
      });
      if (!encontrado) return json({ error: "Ese perfume ya no existe." }, 404);
      await refrescarTienda();
      return json({ ok: true });
    }

    return json({ error: "Método no permitido" }, 405);
  } catch (error) {
    // los errores de validación traen un mensaje pensado para la persona del panel
    const mensaje = error instanceof SyntaxError ? "Datos inválidos." : error.message;
    return json({ error: mensaje || "No se pudo guardar." }, 400);
  }
};

export const config = { path: "/api/admin/catalogo" };

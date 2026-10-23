// POST /api/admin/login { contrasena } — entrega una sesión de 12 horas.
// Freno a la fuerza bruta: más de 30 intentos fallidos en una hora
// bloquean el ingreso hasta la hora siguiente.
import { almacen, contrasenaCorrecta, crearSesion, json } from "../compartido/catalogo.mjs";

const MAX_FALLOS_POR_HORA = 30;

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  if (!process.env.ADMIN_PASSWORD) return json({ error: "Falta configurar ADMIN_PASSWORD en Netlify." }, 503);

  const tienda = almacen();
  const claveHora = `intentos/${new Date().toISOString().slice(0, 13)}`;
  const fallos = Number(await tienda.get(claveHora)) || 0;
  if (fallos >= MAX_FALLOS_POR_HORA) {
    return json({ error: "Demasiados intentos. Espera una hora y vuelve a intentar." }, 429);
  }

  let datos = {};
  try {
    datos = await req.json();
  } catch {}

  if (!contrasenaCorrecta(datos.contrasena)) {
    await tienda.set(claveHora, String(fallos + 1));
    await new Promise((r) => setTimeout(r, 700));
    return json({ error: "Contraseña incorrecta." }, 401);
  }
  return json({ token: crearSesion() });
};

export const config = {
  path: "/api/admin/login",
  // además del bloqueo por hora: máximo 10 intentos por minuto por persona
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};

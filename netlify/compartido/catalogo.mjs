// ==========================================================
// E&M — catálogo compartido por las funciones de Netlify
// ----------------------------------------------------------
// El catálogo vivo (lo que edita el panel /admin) se guarda en
// Netlify Blobs, almacén "em", clave "perfumes". Mientras nadie
// haya guardado nada desde el panel se usa perfumes.js (la lista
// con la que arrancó la tienda) como semilla.
//
// Lo usan: catalogo (público), admin-* (panel) y crear-orden
// (cobra SIEMPRE el precio de aquí, nunca el del navegador).
// ==========================================================

import { getStore } from "@netlify/blobs";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import semilla from "../../public/perfumes.js";
import PIRAMIDES from "./piramides.mjs";

const CLAVE = "perfumes";
const MAX_HISTORIAL = 60; // copias anteriores del catálogo que se guardan

export const almacen = () => getStore({ name: "em", consistency: "strong" });
export const almacenImagenes = () => getStore({ name: "em-imagenes", consistency: "strong" });

// ---------- utilidades ----------

// mismo id que usa el carrito: nombre sin tildes y en minúsculas
export function normalizar(texto) {
  return (texto || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// id estable + pirámide de arranque si el perfume aún no tiene una propia
const conId = (p) => {
  const id = p.id || normalizar(p.nombre);
  return { ...p, id, piramide: p.piramide || PIRAMIDES[id] || null };
};

export function json(datos, status = 200, cabeceras = {}) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...cabeceras },
  });
}

// ---------- leer y guardar ----------

export async function leerCatalogo() {
  const guardado = await almacen().getWithMetadata(CLAVE, { type: "json" });
  if (guardado && Array.isArray(guardado.data)) {
    return { perfumes: guardado.data.map(conId), etag: guardado.etag || null, origen: "panel" };
  }
  return { perfumes: semilla.map(conId), etag: null, origen: "semilla" };
}

// Aplica un cambio sobre la versión más reciente. Si otra persona guardó
// justo en medio, se vuelve a leer y se reintenta (no se pisan cambios).
// (Si el almacén no devuelve la huella "etag" —pasa en `netlify dev`—,
// se guarda sin esa comprobación.)
export async function modificarCatalogo(cambio) {
  for (let intento = 0; intento < 4; intento++) {
    const { perfumes, etag, origen } = await leerCatalogo();
    const nuevos = cambio(perfumes.map((p) => ({ ...p })));
    const opciones = etag ? { onlyIfMatch: etag } : origen === "semilla" ? { onlyIfNew: true } : {};
    const resultado = await almacen().setJSON(CLAVE, nuevos, opciones);
    if (resultado.modified) {
      await guardarCopia(perfumes);
      return nuevos;
    }
  }
  throw new Error("No se pudo guardar: el catálogo cambió varias veces seguidas. Intenta de nuevo.");
}

// copia del catálogo ANTERIOR a cada cambio, para poder deshacer errores
async function guardarCopia(perfumes) {
  const tienda = almacen();
  await tienda.setJSON(`historial/${new Date().toISOString().replace(/[:.]/g, "-")}`, perfumes);
  const { blobs } = await tienda.list({ prefix: "historial/" });
  const sobrantes = blobs.map((b) => b.key).sort().slice(0, -MAX_HISTORIAL);
  await Promise.all(sobrantes.map((clave) => tienda.delete(clave)));
}

// solo los campos que ve el público
export function versionPublica(perfumes) {
  return perfumes
    .filter((p) => !p.oculto && p.precio > 0)
    .map(({ id, nombre, marca, categoria, notas, precio, precio_cofre, imagen_real, imagen_notas, imagen_placeholder, portada, piramide }) => ({
      id, nombre, marca, categoria, notas, precio, precio_cofre, imagen_real, imagen_notas, imagen_placeholder, portada, piramide,
    }));
}

// ---------- validación de lo que manda el panel ----------

export const COLECCIONES = ["Árabe", "Diseñador", "Nicho", "Celebridad"];
export const GENEROS = ["Hombre", "Mujer", "Unisex"];

const texto = (valor, nombreCampo, max) => {
  const limpio = (valor || "").toString().replace(/\s+/g, " ").trim();
  if (!limpio) throw new Error(`Falta ${nombreCampo}.`);
  if (limpio.length > max) throw new Error(`${nombreCampo} es muy largo (máximo ${max} letras).`);
  if (/[<>]/.test(limpio)) throw new Error(`${nombreCampo} no puede tener los signos < o >.`);
  return limpio;
};

const pesos = (valor, nombreCampo) => {
  const n = Number(valor);
  if (!Number.isInteger(n) || n < 1000 || n > 5000000) {
    throw new Error(`${nombreCampo} debe ser un número entero entre 1.000 y 5.000.000.`);
  }
  return n;
};

export function validarPerfume(entrada) {
  const p = entrada || {};
  const [coleccion, genero] = (p.categoria || "").split("/").map((s) => s.trim());
  if (!COLECCIONES.includes(coleccion) || !GENEROS.includes(genero)) {
    throw new Error("Elige la colección y el género.");
  }
  const notas = (Array.isArray(p.notas) ? p.notas : [])
    .map((n) => texto(n, "Cada nota", 30))
    .slice(0, 8);
  if (notas.length === 0) throw new Error("Escribe al menos una nota olfativa.");

  const fotoValida = (src) => !src || /^(images\/[\w.-]+\.(jpe?g|png|webp)|\/img\/[\w.-]+)$/i.test(src);
  const imagen = p.imagen_real || null;
  const imagenNotas = p.imagen_notas || null;
  if (!fotoValida(imagen) || !fotoValida(imagenNotas)) throw new Error("La foto no es válida.");

  // pirámide olfativa: hasta 8 notas por nivel
  const nivel = (lista, nombreCampo) => (Array.isArray(lista) ? lista : []).map((n) => texto(n, nombreCampo, 40)).slice(0, 8);
  const pir = p.piramide || {};
  const piramide = {
    salida: nivel(pir.salida, "Cada nota de salida"),
    corazon: nivel(pir.corazon, "Cada nota de corazón"),
    fondo: nivel(pir.fondo, "Cada nota de fondo"),
  };
  const tienePiramide = piramide.salida.length + piramide.corazon.length + piramide.fondo.length > 0;

  const limpio = {
    id: p.id ? normalizar(p.id) : undefined,
    nombre: texto(p.nombre, "El nombre", 80),
    marca: texto(p.marca, "La marca", 60),
    categoria: `${coleccion} / ${genero}`,
    notas,
    // un perfume oculto puede quedar sin precio (0); uno visible necesita precio real
    precio: p.oculto && !Number(p.precio) ? 0 : pesos(p.precio, "El precio"),
    imagen_real: imagen,
    imagen_notas: imagenNotas,
    piramide: tienePiramide ? piramide : null,
    imagen_placeholder: /^#[0-9a-f]{6}$/i.test(p.imagen_placeholder || "") ? p.imagen_placeholder : "#3b2412",
  };
  if (p.precio_cofre !== undefined && p.precio_cofre !== null && p.precio_cofre !== "") {
    limpio.precio_cofre = pesos(p.precio_cofre, "El precio en cofre");
  }
  if (p.oculto) limpio.oculto = true;
  if (p.portada) limpio.portada = true;
  return limpio;
}

// id nuevo y único a partir del nombre
export function idNuevo(nombre, existentes) {
  const base = normalizar(nombre);
  let id = base;
  for (let i = 2; existentes.has(id); i++) id = `${base} ${i}`;
  return id;
}

// ---------- sesión del panel (contraseña en la variable ADMIN_PASSWORD) ----------

const HORAS_SESION = 12;

const secreto = () => {
  const clave = process.env.ADMIN_PASSWORD;
  if (!clave) return null;
  return createHash("sha256").update(`em-admin|${clave}`).digest();
};

const firmar = (datos, llave) => createHmac("sha256", llave).update(datos).digest("base64url");

export function contrasenaCorrecta(intento) {
  const clave = process.env.ADMIN_PASSWORD;
  if (!clave) return false;
  const a = createHash("sha256").update(String(intento || "")).digest();
  const b = createHash("sha256").update(clave).digest();
  return timingSafeEqual(a, b);
}

export function crearSesion() {
  const llave = secreto();
  const datos = Buffer.from(JSON.stringify({ exp: Date.now() + HORAS_SESION * 3600e3, n: randomBytes(6).toString("hex") })).toString("base64url");
  return `${datos}.${firmar(datos, llave)}`;
}

// Devuelve una respuesta de error si la sesión no sirve; null si está bien
export function exigirSesion(req) {
  const llave = secreto();
  if (!llave) return json({ error: "Falta configurar ADMIN_PASSWORD en Netlify." }, 503);
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [datos, firma] = token.split(".");
  if (!datos || !firma) return json({ error: "Inicia sesión." }, 401);
  const esperada = Buffer.from(firmar(datos, llave));
  const recibida = Buffer.from(firma);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) {
    return json({ error: "Inicia sesión." }, 401);
  }
  try {
    const { exp } = JSON.parse(Buffer.from(datos, "base64url").toString());
    if (!(exp > Date.now())) return json({ error: "La sesión venció. Entra de nuevo." }, 401);
  } catch {
    return json({ error: "Inicia sesión." }, 401);
  }
  return null;
}

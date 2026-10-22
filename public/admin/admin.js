// ==========================================================
// E&M — panel de administración (/admin)
// Habla con las funciones /api/admin/* (ver netlify/functions).
// La sesión dura 12 horas y se guarda en este navegador.
// ==========================================================

const CLAVE_SESION = "em-admin-sesion";
const CREMA = [244, 236, 218]; // --canvas, el fondo de todas las fotos de la tienda

const estado = {
  perfumes: [],
  filtro: "todos",
  busqueda: "",
  editando: null, // perfume abierto en el editor (null = nuevo)
  fotoNueva: null, // URL de la foto recién subida en el editor
};

const $ = (id) => document.getElementById(id);

// ---------- utilidades ----------

const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const normalizar = (t) => (t || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const miles = (n) => (Number(n) ? Number(n).toLocaleString("es-CO") : "");
const leerPesos = (texto) => Number(String(texto || "").replace(/\D/g, "")) || 0;
const rutaFoto = (src) => (!src ? "" : src.startsWith("/") ? src : `/${src}`);

let temporizadorAviso;
function avisar(texto, esError = false) {
  const el = $("aviso");
  el.textContent = texto;
  el.classList.toggle("is-error", esError);
  el.hidden = false;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => (el.hidden = true), esError ? 6000 : 2800);
}

// ---------- servidor ----------

function token() {
  try {
    return localStorage.getItem(CLAVE_SESION) || "";
  } catch {
    return "";
  }
}

async function api(ruta, opciones = {}) {
  const resp = await fetch(ruta, {
    ...opciones,
    headers: { Authorization: `Bearer ${token()}`, ...(opciones.headers || {}) },
  });
  let datos = {};
  try {
    datos = await resp.json();
  } catch {}
  if (resp.status === 401) {
    mostrarLogin(datos.error);
    throw new Error(datos.error || "Inicia sesión.");
  }
  if (!resp.ok) throw new Error(datos.error || "No se pudo completar. Revisa tu conexión.");
  return datos;
}

async function guardarPerfume(perfume) {
  const { perfume: guardado } = await api("/api/admin/catalogo", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ perfume }),
  });
  const i = estado.perfumes.findIndex((p) => p.id === guardado.id);
  if (i >= 0) estado.perfumes[i] = guardado;
  else estado.perfumes.unshift(guardado);
  return guardado;
}

// ---------- ingreso ----------

function mostrarLogin(mensaje) {
  try {
    localStorage.removeItem(CLAVE_SESION);
  } catch {}
  if ($("editor").open) $("editor").close();
  $("vistaPanel").hidden = true;
  $("vistaLogin").hidden = false;
  $("loginError").hidden = !mensaje;
  $("loginError").textContent = mensaje || "";
  $("loginClave").focus();
}

$("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("loginBtn");
  btn.disabled = true;
  btn.textContent = "Entrando…";
  $("loginError").hidden = true;
  try {
    const resp = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contrasena: $("loginClave").value }),
    });
    const datos = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(datos.error || "No se pudo entrar.");
    localStorage.setItem(CLAVE_SESION, datos.token);
    $("loginClave").value = "";
    await abrirPanel();
  } catch (error) {
    $("loginError").textContent = error.message;
    $("loginError").hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = "Entrar";
  }
});

$("btnSalir").addEventListener("click", () => mostrarLogin());

async function abrirPanel() {
  const { perfumes } = await api("/api/admin/catalogo");
  estado.perfumes = perfumes;
  $("vistaLogin").hidden = true;
  $("vistaPanel").hidden = false;
  pintarLista();
}

// ---------- lista ----------

function filtrados() {
  const q = normalizar(estado.busqueda);
  return estado.perfumes.filter((p) => {
    if (estado.filtro === "visibles" && p.oculto) return false;
    if (estado.filtro === "ocultos" && !p.oculto) return false;
    if (estado.filtro === "portada" && !p.portada) return false;
    return !q || normalizar(`${p.nombre} ${p.marca}`).includes(q);
  });
}

function filaHTML(p) {
  const foto = p.imagen_real ? `<img src="${esc(rutaFoto(p.imagen_real))}" alt="" loading="lazy">` : "";
  const sinPrecio = !p.precio ? `<span class="fila-etiqueta">sin precio</span>` : "";
  return `
    <li class="fila${p.oculto ? " is-oculto" : ""}" data-id="${esc(p.id)}">
      <div class="fila-foto">${foto}</div>
      <div class="fila-info">
        <span class="fila-nombre">${esc(p.nombre)}${sinPrecio}</span>
        <span class="fila-meta">${esc(p.marca)} · ${esc(p.categoria)}</span>
      </div>
      <label class="fila-precio">
        <span>$</span>
        <input type="text" inputmode="numeric" value="${miles(p.precio)}" aria-label="Precio de ${esc(p.nombre)}" data-precio>
      </label>
      <div class="fila-toggles">
        <button type="button" class="toggle-btn" data-accion="visible" aria-pressed="${!p.oculto}" aria-label="Visible en la tienda" title="${p.oculto ? "Oculto: no se ve en la tienda" : "Visible en la tienda"}">
          <svg viewBox="0 0 16 16" aria-hidden="true">${p.oculto ? '<path d="M2 2l12 12M6.5 6.6a2 2 0 0 0 2.9 2.8M4.2 4.4C2.9 5.3 2 6.6 1.5 8c1.2 3 3.8 5 6.5 5 1.3 0 2.5-.4 3.6-1.2M9 3.1c3 .4 4.8 2.4 5.5 4.9-.3.8-.7 1.5-1.2 2.2"/>' : '<path d="M1.5 8C2.7 5 5.3 3 8 3s5.3 2 6.5 5c-1.2 3-3.8 5-6.5 5S2.7 11 1.5 8Z"/><circle cx="8" cy="8" r="2"/>'}</svg>
          <span class="toggle-texto">${p.oculto ? "Oculto" : "Visible"}</span>
        </button>
        <button type="button" class="toggle-btn" data-accion="portada" aria-pressed="${!!p.portada}" aria-label="Puede salir en la portada" title="Puede salir en la portada">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path class="estrella" d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8Z"/></svg>
          <span class="toggle-texto">Portada</span>
        </button>
      </div>
      <button type="button" class="btn btn-secundario fila-editar" data-accion="editar" aria-label="Editar ${esc(p.nombre)}">Editar</button>
    </li>`;
}

function pintarLista() {
  const lista = filtrados();
  $("lista").innerHTML = lista.map(filaHTML).join("");
  $("vacio").hidden = lista.length > 0;
  const visibles = estado.perfumes.filter((p) => !p.oculto).length;
  const portada = estado.perfumes.filter((p) => p.portada).length;
  $("resumen").textContent =
    `${visibles} visibles · ${estado.perfumes.length - visibles} ocultos` +
    (portada ? ` · ${portada} para la portada` : " · la portada elige entre todos");

  const marcas = [...new Set(estado.perfumes.map((p) => p.marca))].sort((a, b) => a.localeCompare(b, "es"));
  $("listaMarcas").innerHTML = marcas.map((m) => `<option value="${esc(m)}">`).join("");
}

$("buscar").addEventListener("input", (e) => {
  estado.busqueda = e.target.value;
  pintarLista();
});

document.querySelectorAll(".segmento").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".segmento").forEach((b) => b.classList.toggle("is-activo", b === btn));
    estado.filtro = btn.dataset.filtro;
    pintarLista();
  })
);

const perfumeDeFila = (el) => {
  const fila = el.closest(".fila");
  return fila && estado.perfumes.find((p) => p.id === fila.dataset.id);
};

// precio directo en la lista: se guarda al salir de la casilla o con Enter
$("lista").addEventListener("focusin", (e) => {
  if (e.target.matches("[data-precio]")) e.target.select();
});
$("lista").addEventListener("keydown", (e) => {
  if (e.target.matches("[data-precio]") && e.key === "Enter") e.target.blur();
});
$("lista").addEventListener("input", (e) => {
  if (!e.target.matches("[data-precio]")) return;
  const n = leerPesos(e.target.value);
  e.target.value = n ? miles(n) : "";
});
$("lista").addEventListener("focusout", async (e) => {
  if (!e.target.matches("[data-precio]")) return;
  const input = e.target;
  const perfume = perfumeDeFila(input);
  if (!perfume) return;
  const nuevo = leerPesos(input.value);
  if (nuevo === (perfume.precio || 0)) return;
  if (!nuevo) {
    input.value = miles(perfume.precio);
    return avisar("El precio no puede quedar vacío.", true);
  }
  const caja = input.closest(".fila-precio");
  caja.classList.add("is-guardando");
  try {
    const guardado = await guardarPerfume({ ...perfume, precio: nuevo });
    caja.classList.remove("is-guardando");
    caja.classList.add("is-guardado");
    setTimeout(() => caja.classList.remove("is-guardado"), 1400);
    avisar(`${guardado.nombre}: ahora $${miles(guardado.precio)}`);
  } catch (error) {
    caja.classList.remove("is-guardando");
    input.value = miles(perfume.precio);
    avisar(error.message, true);
  }
});

$("lista").addEventListener("click", async (e) => {
  const boton = e.target.closest("[data-accion]");
  if (!boton) return;
  const perfume = perfumeDeFila(boton);
  if (!perfume) return;
  const accion = boton.dataset.accion;
  if (accion === "editar") return abrirEditor(perfume);

  const cambio = accion === "visible" ? { oculto: !perfume.oculto } : { portada: !perfume.portada };
  if (cambio.oculto === false && !perfume.precio) {
    return avisar("Ponle precio antes de mostrarlo en la tienda.", true);
  }
  boton.disabled = true;
  try {
    const guardado = await guardarPerfume({ ...perfume, ...cambio });
    pintarLista();
    if (accion === "visible") avisar(guardado.oculto ? `${guardado.nombre} quedó oculto.` : `${guardado.nombre} ya se ve en la tienda.`);
    else avisar(guardado.portada ? `${guardado.nombre} puede salir en la portada.` : `${guardado.nombre} ya no sale en la portada.`);
  } catch (error) {
    boton.disabled = false;
    avisar(error.message, true);
  }
});

// ---------- editor ----------

function pintarFotoEditor(src) {
  $("fotoVista").innerHTML = src ? `<img src="${esc(rutaFoto(src))}" alt="Foto del perfume">` : "<span>Sin foto</span>";
}

function abrirEditor(perfume) {
  estado.editando = perfume || null;
  estado.fotoNueva = null;
  const p = perfume || { categoria: "Diseñador / Mujer", notas: [], precio: 0 };
  const [coleccion, genero] = p.categoria.split("/").map((s) => s.trim());
  $("editorTitulo").textContent = perfume ? "Editar perfume" : "Nuevo perfume";
  $("fNombre").value = p.nombre || "";
  $("fMarca").value = p.marca || "";
  $("fColeccion").value = coleccion;
  $("fGenero").value = genero;
  $("fNotas").value = (p.notas || []).join(", ");
  $("fPrecio").value = miles(p.precio);
  $("fCofre").value = miles(p.precio_cofre);
  $("fVisible").checked = perfume ? !perfume.oculto : true;
  $("fPortada").checked = !!p.portada;
  $("fotoArchivo").value = "";
  $("editorError").hidden = true;
  $("btnEliminar").hidden = !perfume;
  pintarFotoEditor(p.imagen_real);
  $("editor").showModal();
  $("fNombre").focus();
}

$("btnNuevo").addEventListener("click", () => abrirEditor(null));
$("editorCerrar").addEventListener("click", () => $("editor").close());
$("btnCancelar").addEventListener("click", () => $("editor").close());
["fPrecio", "fCofre"].forEach((id) =>
  $(id).addEventListener("input", (e) => {
    const n = leerPesos(e.target.value);
    e.target.value = n ? miles(n) : "";
  })
);

$("fotoArchivo").addEventListener("change", async (e) => {
  const archivo = e.target.files && e.target.files[0];
  if (!archivo) return;
  const vista = $("fotoVista");
  vista.classList.add("is-procesando");
  try {
    const foto = await prepararFoto(archivo, $("fotoFondo").checked);
    const resp = await fetch("/api/admin/imagen", {
      method: "POST",
      headers: { Authorization: `Bearer ${token()}`, "Content-Type": "image/jpeg" },
      body: foto,
    });
    const datos = await resp.json().catch(() => ({}));
    if (resp.status === 401) return mostrarLogin(datos.error);
    if (!resp.ok) throw new Error(datos.error || "No se pudo subir la foto.");
    estado.fotoNueva = datos.url;
    pintarFotoEditor(datos.url);
  } catch (error) {
    avisar(error.message || "No se pudo leer esa foto.", true);
  } finally {
    vista.classList.remove("is-procesando");
  }
});

$("formEditor").addEventListener("submit", async (e) => {
  e.preventDefault();
  const original = estado.editando || {};
  const perfume = {
    ...original,
    nombre: $("fNombre").value,
    marca: $("fMarca").value,
    categoria: `${$("fColeccion").value} / ${$("fGenero").value}`,
    notas: $("fNotas").value.split(",").map((n) => n.trim()).filter(Boolean),
    precio: leerPesos($("fPrecio").value),
    precio_cofre: leerPesos($("fCofre").value) || null,
    oculto: !$("fVisible").checked,
    portada: $("fPortada").checked,
    imagen_real: estado.fotoNueva || original.imagen_real || null,
  };
  const error = $("editorError");
  if (!perfume.oculto && !perfume.precio) {
    error.textContent = "Ponle precio o apaga «Visible en la tienda».";
    error.hidden = false;
    return;
  }
  const btn = $("btnGuardar");
  btn.disabled = true;
  btn.textContent = "Guardando…";
  error.hidden = true;
  try {
    const guardado = await guardarPerfume(perfume);
    $("editor").close();
    pintarLista();
    avisar(estado.editando ? `${guardado.nombre} quedó guardado.` : `${guardado.nombre} quedó agregado.`);
  } catch (err) {
    error.textContent = err.message;
    error.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = "Guardar";
  }
});

$("btnEliminar").addEventListener("click", async () => {
  const p = estado.editando;
  if (!p) return;
  if (!confirm(`¿Eliminar "${p.nombre}" del catálogo? Si solo quieres que no se vea, mejor apaga «Visible en la tienda».`)) return;
  try {
    await api(`/api/admin/catalogo?id=${encodeURIComponent(p.id)}`, { method: "DELETE" });
    estado.perfumes = estado.perfumes.filter((x) => x.id !== p.id);
    $("editor").close();
    pintarLista();
    avisar(`${p.nombre} se eliminó.`);
  } catch (error) {
    avisar(error.message, true);
  }
});

// ---------- fotos: 800x640 sobre el crema de la tienda ----------

function cargarImagen(archivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Ese archivo no es una foto que el navegador pueda abrir."));
    };
    img.src = url;
  });
}

// Pinta de crema el fondo blanco que toca los bordes de la foto (no el blanco
// del frasco o de la caja, que queda encerrado por el producto).
function fondoBlancoACrema(ctx, ancho, alto) {
  const datos = ctx.getImageData(0, 0, ancho, alto);
  const px = datos.data;
  const esBlanco = (i) => px[i] > 232 && px[i + 1] > 232 && px[i + 2] > 232;
  // el margen crema que rodea la foto también se recorre, para llegar al blanco de adentro
  const esCrema = (i) => Math.abs(px[i] - CREMA[0]) < 3 && Math.abs(px[i + 1] - CREMA[1]) < 3 && Math.abs(px[i + 2] - CREMA[2]) < 3;
  const visto = new Uint8Array(ancho * alto);
  const pila = [];
  for (let x = 0; x < ancho; x++) pila.push(x, (alto - 1) * ancho + x);
  for (let y = 0; y < alto; y++) pila.push(y * ancho, y * ancho + ancho - 1);
  while (pila.length) {
    const p = pila.pop();
    if (visto[p]) continue;
    visto[p] = 1;
    const i = p * 4;
    if (esBlanco(i)) {
      px[i] = CREMA[0];
      px[i + 1] = CREMA[1];
      px[i + 2] = CREMA[2];
    } else if (!esCrema(i)) {
      continue;
    }
    const x = p % ancho;
    if (x > 0) pila.push(p - 1);
    if (x < ancho - 1) pila.push(p + 1);
    if (p >= ancho) pila.push(p - ancho);
    if (p < ancho * (alto - 1)) pila.push(p + ancho);
  }
  ctx.putImageData(datos, 0, 0);
}

async function prepararFoto(archivo, quitarBlanco) {
  const img = await cargarImagen(archivo);
  const ANCHO = 800;
  const ALTO = 640;
  const lienzo = document.createElement("canvas");
  lienzo.width = ANCHO;
  lienzo.height = ALTO;
  const ctx = lienzo.getContext("2d", { willReadFrequently: true });
  ctx.fillStyle = `rgb(${CREMA.join(",")})`;
  ctx.fillRect(0, 0, ANCHO, ALTO);
  // el producto completo, centrado, con un margen como el de las demás fotos
  const escala = Math.min((ANCHO * 0.88) / img.naturalWidth, (ALTO * 0.88) / img.naturalHeight);
  const w = Math.round(img.naturalWidth * escala);
  const h = Math.round(img.naturalHeight * escala);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, Math.round((ANCHO - w) / 2), Math.round((ALTO - h) / 2), w, h);
  if (quitarBlanco) fondoBlancoACrema(ctx, ANCHO, ALTO);
  return new Promise((resolve, reject) =>
    lienzo.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No se pudo preparar la foto."))), "image/jpeg", 0.86)
  );
}

// ---------- arranque ----------

if (token()) {
  abrirPanel().catch((error) => {
    if (!$("vistaLogin").hidden) return;
    mostrarLogin(error.message);
  });
} else {
  mostrarLogin();
}

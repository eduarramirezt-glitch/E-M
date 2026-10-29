// ==========================================================
// LUMELLA BEAUTY — catálogo dinámico + WhatsApp + buscador/filtros
// ==========================================================

// Reemplaza este número por el WhatsApp real de E&M.
// Formato: código de país + número, SIN espacios, signos ni el "+"
// Ejemplo Colombia: 573001234567
const WHATSAPP_NUMBER = "573214276676";

// ----------------------------------------------------------
// 1) PERFUMES: salen de /api/catalogo (lo que edita el panel
//    /admin). Si esa llamada falla, se usa perfumes.js, la lista
//    con la que arrancó la tienda, para que nunca quede vacía.
// ----------------------------------------------------------

let PERFUMES = []; // solo los visibles
let PERFUMES_POR_ID = new Map();

function usarPerfumes(lista) {
  PERFUMES = lista
    .filter((perfume) => !perfume.oculto && perfume.precio > 0)
    .map((perfume) => ({ ...perfume, id: perfume.id || normalize(perfume.nombre) }));
  PERFUMES_POR_ID = new Map(PERFUMES.map((perfume) => [perfume.id, perfume]));
}

function cargarScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function cargarCatalogo() {
  try {
    const control = new AbortController();
    const espera = setTimeout(() => control.abort(), 10000); // el respaldo puede tener precios viejos: solo si de verdad falla
    const resp = await fetch("/api/catalogo", { signal: control.signal });
    clearTimeout(espera);
    if (!resp.ok) throw new Error(`catálogo ${resp.status}`);
    const datos = await resp.json();
    if (!Array.isArray(datos.perfumes) || datos.perfumes.length === 0) throw new Error("catálogo vacío");
    usarPerfumes(datos.perfumes);
  } catch (error) {
    console.warn("Usando la lista de respaldo:", error);
    try {
      await cargarScript("perfumes.js");
      usarPerfumes(TODOS_LOS_PERFUMES);
    } catch (e) {
      usarPerfumes([]);
    }
  }
}

// se pide apenas carga este archivo, sin esperar a que termine de armarse la página
const catalogoListo = cargarCatalogo();

// Escapa texto para meterlo en HTML (nombres y marcas vienen del panel)
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ----------------------------------------------------------
// 2) HELPERS
// ----------------------------------------------------------

// Arma el enlace dinámico de WhatsApp para un perfume dado
function buildWaLink(nombre) {
  const mensaje = `Hola E&M, me interesa el perfume ${nombre}. ¿Tienen disponibilidad?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

// Formatea un número como precio en pesos colombianos (ej: 145000 -> "$145.000")
function formatPrice(valor) {
  return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
}

// Quita tildes/acentos para comparar sin importar cómo escriba el usuario
function normalize(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// Genera una descripción olfativa más detallada para el modal,
// a partir de la colección, el género y las notas reales del perfume.
function generateDescription(perfume) {
  const [coleccionRaw, generoRaw] = perfume.categoria.split("/").map((s) => s.trim());
  const coleccion = normalize(coleccionRaw);
  const genero = normalize(generoRaw);

  const intros = {
    disenador: "una fragancia de casa de moda reconocida internacionalmente",
    arabe: "una composición oriental de larga duración, inspirada en la perfumería árabe",
    celebridad: "una fragancia dulce y desenfadada, firmada por una figura global",
    nicho: "una creación de perfumería nicho con una firma olfativa distintiva",
  };
  const generoTxt =
    genero === "unisex" ? "pensada para todos" : genero === "hombre" ? "pensada para él" : "pensada para ella";

  const notas = perfume.notas.join(", ");

  // el precio que se muestra es el de caja; el cofre se pide por WhatsApp
  const cofre = perfume.precio_cofre
    ? ` También viene en cofre por ${formatPrice(perfume.precio_cofre)}: pídelo por WhatsApp.`
    : "";

  return `${perfume.nombre} es ${intros[coleccion] || "una fragancia de nuestro catálogo"}, ${generoTxt}. Notas principales: ${notas}.${cofre}`;
}

// Icono de frasco de perfume, reutilizado en cada placeholder
const BOTTLE_ICON_SVG = `
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.3">
    <path d="M9.5 3h5v2.4l1.3 1.6v11a2 2 0 0 1-2 2h-3.6a2 2 0 0 1-2-2v-11l1.3-1.6V3Z"/>
    <path d="M9.5 9.5h5"/>
    <path d="M10.5 3h3"/>
  </svg>`;

// ----------------------------------------------------------
// 2.1) FICHA DE NOTAS OLFATIVAS ("segunda foto" del perfume)
//    Si el panel subió una imagen de notas, se usa esa. Si no, se arma
//    con la pirámide (salida / corazón / fondo) o, si no hay, con los acordes.
// ----------------------------------------------------------
function fichaNotasHTML(perfume) {
  if (perfume.imagen_notas) {
    return `<div class="ficha-notas"><img src="${esc(perfume.imagen_notas)}" alt="Notas olfativas de ${esc(perfume.nombre)}" loading="lazy"></div>`;
  }
  const p = perfume.piramide;
  const fila = (nivel, notas) =>
    notas && notas.length
      ? `<div class="ficha-fila"><span class="ficha-nivel">${nivel}</span><p class="ficha-lista">${esc(notas.join(" · "))}</p></div>`
      : "";
  const filas =
    p && (p.salida.length || p.corazon.length || p.fondo.length)
      ? fila("Salida", p.salida) + fila("Corazón", p.corazon) + fila("Fondo", p.fondo)
      : fila("Acordes", perfume.notas);
  return `
    <div class="ficha-notas" role="img" aria-label="Notas olfativas de ${esc(perfume.nombre)}">
      <p class="ficha-titulo">Notas olfativas</p>
      ${filas}
      ${p ? `<p class="ficha-nota-pie">De la fragancia original de referencia</p>` : ""}
    </div>`;
}

// ----------------------------------------------------------
// 3) GENERA LAS TARJETAS A PARTIR DEL ARREGLO PERFUMES
// ----------------------------------------------------------
function createProductCard(perfume) {
  const [coleccionRaw, generoRaw] = perfume.categoria.split("/").map((s) => s.trim());

  const coleccion = normalize(coleccionRaw);        // disenador | arabe | celebridad | nicho
  const genero = normalize(generoRaw);              // hombre | mujer | unisex

  // categoría usada por el filtro de colección (el pill "Diseñador" también
  // agrupa las fragancias de nicho, ya que comparten vitrina en el catálogo)
  const dataCategoria = coleccion === "nicho" ? "disenador" : coleccion;

  // género usado por los filtros "Hombre" / "Mujer"
  const dataGenero = genero === "unisex" ? "hombre mujer" : genero;

  const notasNormalizadas = perfume.notas.map(normalize);
  const dataNotas = notasNormalizadas.join(" ");

  const searchText = normalize(
    [perfume.nombre, perfume.marca, perfume.categoria, perfume.notas.join(" ")].join(" ")
  );

  const enlace_whatsapp = buildWaLink(perfume.nombre);

  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.name = normalize(perfume.nombre);
  card.dataset.search = searchText;
  card.dataset.category = dataCategoria;
  card.dataset.gender = dataGenero;
  card.dataset.notes = dataNotas;

  // --- Medio: foto real si ya existe, si no, placeholder elegante ---
  let mediaHTML;
  if (perfume.imagen_real) {
    mediaHTML = `<img src="${esc(perfume.imagen_real)}" alt="${esc(perfume.nombre)} de ${esc(perfume.marca)}" loading="lazy">`;
  } else {
    mediaHTML = `
      <div class="placeholder-media" style="background:${esc(perfume.imagen_placeholder)}">
        ${BOTTLE_ICON_SVG}
        <span class="placeholder-brand">${esc(perfume.marca)}</span>
      </div>`;
  }

  const generoTag =
    genero === "unisex" ? "Unisex" : genero === "hombre" ? "Para él" : "Para ella";

  card.innerHTML = `
    <div class="card-media">
      ${mediaHTML}
      ${fichaNotasHTML(perfume)}
      <button type="button" class="btn-notas" data-ver-notas aria-label="Ver notas olfativas de ${esc(perfume.nombre)}">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 4h10M3 8h10M3 12h6"/></svg>
        Notas
      </button>
    </div>
    <div class="card-body">
      <span class="card-brand">${esc(perfume.marca)}</span>
      <h3><button type="button" class="card-title-btn">${esc(perfume.nombre)}</button></h3>
      <p class="card-notes">${esc(perfume.notas.join(" · "))}</p>
      <p class="card-size">${esc(coleccionRaw)} · ${generoTag}</p>
      <div class="card-footer-row">
        <span class="card-price">${formatPrice(perfume.precio)}</span>
        <div class="card-actions">
          <button type="button" class="btn-add-cart btn-add-cart--card" data-add-to-cart>Agregar</button>
          <a href="${enlace_whatsapp}" class="card-wa" target="_blank" rel="noopener" aria-label="Consultar ${esc(perfume.nombre)} por WhatsApp" title="Consultar por WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.5 11.6a8.3 8.3 0 0 1-12.3 7.3L3.5 20.5l1.6-4.5a8.3 8.3 0 1 1 15.4-4.4Z"/>
              <path d="M9.2 8.9c.3 2.7 2.4 4.9 5.5 5.9"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  // guardamos el objeto completo en el propio nodo para poder
  // recuperarlo al abrir el modal (ver sección 5)
  card.perfumeRef = perfume;

  return card;
}

// ----------------------------------------------------------
// 3.1) PORTADA: tres perfumes distintos cada día
//    Salen de los marcados "En portada" en el panel (si hay al
//    menos 3) o de todos los que tienen foto. Todo el día se ven
//    los mismos para cualquier visitante; al día siguiente cambian.
// ----------------------------------------------------------
function hoyEnColombia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());
}

// generador de números al azar que siempre da lo mismo para la misma semilla
function azarConSemilla(semilla) {
  let h = 2166136261;
  for (const c of semilla) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function elegirPortada(perfumes, dia) {
  const conFoto = perfumes.filter((p) => p.imagen_real);
  const marcados = conFoto.filter((p) => p.portada);
  const grupo = marcados.length >= 3 ? marcados : conFoto;
  const azar = azarConSemilla(`em-portada-${dia}`);
  const barajados = grupo
    .map((p) => [azar(), p])
    .sort((a, b) => a[0] - b[0])
    .map((par) => par[1]);

  // variedad: primero uno de cada colección (árabe, diseñador…), luego lo que falte
  const elegidos = [];
  const colecciones = new Set();
  for (const p of barajados) {
    const coleccion = p.categoria.split("/")[0].trim();
    if (colecciones.has(coleccion)) continue;
    colecciones.add(coleccion);
    elegidos.push(p);
    if (elegidos.length === 3) return elegidos;
  }
  for (const p of barajados) {
    if (elegidos.length === 3) break;
    if (!elegidos.includes(p)) elegidos.push(p);
  }
  return elegidos;
}

function pintarPortada() {
  const fotos = document.querySelectorAll(".hero-art .arch img");
  const elegidos = elegirPortada(PERFUMES, hoyEnColombia());
  fotos.forEach((img, i) => {
    const perfume = elegidos[i];
    if (!perfume) return;
    img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    img.src = perfume.imagen_real;
  });
}

function renderCatalog() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  PERFUMES.forEach((perfume) => {
    fragment.appendChild(createProductCard(perfume));
  });
  grid.appendChild(fragment);
}

// ----------------------------------------------------------
// 5) MODAL DE PRODUCTO (se abre al hacer clic en el nombre)
// ----------------------------------------------------------
let currentModalPerfume = null;

// Ventanas (producto, carrito, pago) accesibles con teclado: al abrir, el foco
// entra a la ventana y el resto de la página queda inerte (Tab no se escapa);
// al cerrar, el foco vuelve a donde estaba.
let volverFoco = null;

function abrirCapa(capa, elementoFoco) {
  if (!document.querySelector("body > [data-capa-abierta]")) volverFoco = document.activeElement;
  capa.dataset.capaAbierta = "";
  for (const el of document.body.children) {
    if (!el.hasAttribute("data-capa-abierta")) el.inert = true;
  }
  (elementoFoco || capa.querySelector("button, [href], input, select, textarea")).focus();
}

function cerrarCapa(capa) {
  delete capa.dataset.capaAbierta;
  if (document.querySelector("body > [data-capa-abierta]")) return;
  for (const el of document.body.children) el.inert = false;
  if (volverFoco && document.contains(volverFoco)) volverFoco.focus();
  volverFoco = null;
}

// vista: "foto" o "notas" (la ficha de notas olfativas)
function openProductModal(perfume, vista = "foto") {
  currentModalPerfume = perfume;
  const modal = document.getElementById("productModal");
  const media = document.getElementById("modalMedia");
  const brand = document.getElementById("modalBrand");
  const title = document.getElementById("modalTitle");
  const category = document.getElementById("modalCategory");
  const description = document.getElementById("modalDescription");
  const notesWrap = document.getElementById("modalNotes");
  const priceEl = document.getElementById("modalPrice");
  const waBtn = document.getElementById("modalWaBtn");

  const foto = perfume.imagen_real
    ? `<img src="${esc(perfume.imagen_real)}" alt="${esc(perfume.nombre)} de ${esc(perfume.marca)}">`
    : `<div class="placeholder-media" style="background:${esc(perfume.imagen_placeholder)}">
         ${BOTTLE_ICON_SVG}
         <span class="placeholder-brand">${esc(perfume.marca)}</span>
       </div>`;
  media.innerHTML = `
    <div data-vista-panel="foto">${foto}</div>
    <div data-vista-panel="notas">${fichaNotasHTML(perfume)}</div>
    <div class="modal-vistas" role="group" aria-label="Ver">
      <button type="button" class="modal-vista" data-vista="foto">Foto</button>
      <button type="button" class="modal-vista" data-vista="notas">Notas olfativas</button>
    </div>`;
  mostrarVistaModal(vista);

  brand.textContent = perfume.marca;
  title.textContent = perfume.nombre;
  category.textContent = perfume.categoria;
  description.textContent = generateDescription(perfume);
  notesWrap.innerHTML = perfume.notas.map((n) => `<span>${esc(n)}</span>`).join("");
  priceEl.textContent = formatPrice(perfume.precio);
  waBtn.setAttribute("href", buildWaLink(perfume.nombre));

  modal.hidden = false;
  // requestAnimationFrame para que la transición de opacidad/escala sí se anime
  // (con fallback por si el entorno no lo soporta)
  (window.requestAnimationFrame || window.setTimeout)(() => modal.classList.add("is-open"));
  document.body.classList.add("modal-open");
  abrirCapa(modal, document.getElementById("modalClose"));
}

function mostrarVistaModal(vista) {
  const media = document.getElementById("modalMedia");
  media.querySelectorAll("[data-vista-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.vistaPanel !== vista;
  });
  media.querySelectorAll(".modal-vista").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.vista === vista));
  });
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal.hidden) return;

  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  setTimeout(() => {
    modal.hidden = true;
  }, 280);

  cerrarCapa(modal);
}

// ----------------------------------------------------------
// 6) CARRITO DE COMPRAS (persistido en localStorage del navegador)
// ----------------------------------------------------------
const CART_STORAGE_KEY = "lumella_cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const cart = raw ? JSON.parse(raw) : [];
    // El carrito guarda el precio del día en que se agregó: se cambia por el
    // precio actual y se quitan los perfumes que ya no se muestran.
    return cart
      .filter((item) => PERFUMES_POR_ID.has(item.id))
      .map((item) => {
        const actual = PERFUMES_POR_ID.get(item.id);
        return {
          ...item,
          nombre: actual.nombre,
          marca: actual.marca,
          precio: actual.precio,
          imagen: actual.imagen_real,
          imagen_placeholder: actual.imagen_placeholder,
          cantidad: Math.min(item.cantidad, MAX_UNIDADES),
        };
      });
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    /* si el navegador bloquea localStorage, el carrito simplemente no persiste */
  }
  renderCart();
}

// id único y estable por perfume (lo asigna el catálogo; no cambia si se renombra)
function perfumeId(perfume) {
  return perfume.id || normalize(perfume.nombre);
}

// Mismo tope que acepta la función de pago (crear-orden.js)
const MAX_UNIDADES = 20;

function addToCart(perfume, cantidad = 1) {
  const cart = getCart();
  const id = perfumeId(perfume);
  const existente = cart.find((item) => item.id === id);

  if (existente) {
    existente.cantidad = Math.min(existente.cantidad + cantidad, MAX_UNIDADES);
  } else {
    cart.push({
      id,
      nombre: perfume.nombre,
      marca: perfume.marca,
      precio: perfume.precio,
      imagen: perfume.imagen_real,
      imagen_placeholder: perfume.imagen_placeholder,
      cantidad,
    });
  }
  saveCart(cart);
  openCart();
}

function updateCartQty(id, cantidad) {
  let cart = getCart();
  if (cantidad <= 0) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const item = cart.find((i) => i.id === id);
    if (item) item.cantidad = Math.min(cantidad, MAX_UNIDADES);
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function cartItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.cantidad, 0);
}

function renderCart() {
  const cart = getCart();
  const itemsWrap = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmptyMsg");
  const subtotalEl = document.getElementById("cartSubtotal");
  const badge = document.getElementById("cartBadge");
  const checkoutBtn = document.getElementById("goToCheckout");
  const cartWaBtn = document.getElementById("cartWaBtn");

  if (!itemsWrap) return; // el DOM aún no está listo

  const count = cartItemCount(cart);
  badge.textContent = count;
  badge.hidden = count === 0;
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    itemsWrap.innerHTML = "";
    emptyMsg.hidden = false;
    subtotalEl.textContent = formatPrice(0);
    cartWaBtn.setAttribute("href", buildWaLink("consulta general"));
    return;
  }

  emptyMsg.hidden = true;

  itemsWrap.innerHTML = cart
    .map((item) => {
      const mediaHTML = item.imagen
        ? `<img src="${esc(item.imagen)}" alt="${esc(item.nombre)}">`
        : `<div class="placeholder-media" style="background:${esc(item.imagen_placeholder)}">${BOTTLE_ICON_SVG}</div>`;

      return `
        <div class="cart-item" data-id="${esc(item.id)}">
          <div class="cart-item-media">${mediaHTML}</div>
          <div class="cart-item-info">
            <span class="cart-item-brand">${esc(item.marca)}</span>
            <span class="cart-item-name">${esc(item.nombre)}</span>
            <span class="cart-item-price">${formatPrice(item.precio)}</span>
            <div class="cart-item-qty">
              <button type="button" data-qty-minus aria-label="Restar">−</button>
              <span>${item.cantidad}</span>
              <button type="button" data-qty-plus aria-label="Sumar">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-remove aria-label="Quitar del carrito">&times;</button>
        </div>`;
    })
    .join("");

  subtotalEl.textContent = formatPrice(cartTotal(cart));

  // Mensaje de WhatsApp con el resumen completo del carrito
  const resumen = cart
    .map((item) => `• ${item.nombre} x${item.cantidad} — ${formatPrice(item.precio * item.cantidad)}`)
    .join("\n");
  const mensaje = `Hola E&M, quiero pedir:\n${resumen}\n\nTotal: ${formatPrice(cartTotal(cart))}`;
  cartWaBtn.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`);
}

function openCart() {
  const overlay = document.getElementById("cartOverlay");
  overlay.hidden = false;
  (window.requestAnimationFrame || window.setTimeout)(() => overlay.classList.add("is-open"));
  document.body.classList.add("modal-open");
  abrirCapa(overlay, document.getElementById("cartClose"));
}

function closeCart() {
  const overlay = document.getElementById("cartOverlay");
  if (overlay.hidden) return;
  overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => (overlay.hidden = true), 280);
  cerrarCapa(overlay);
}

// ----------------------------------------------------------
// 7) CHECKOUT (formulario + Mercado Pago / contraentrega / WhatsApp)
// ----------------------------------------------------------
function openCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const summary = document.getElementById("checkoutOrderSummary");
  summary.innerHTML = `
    ${cart.map((i) => `<div class="checkout-line"><span>${esc(i.nombre)} x${i.cantidad}</span><span>${formatPrice(i.precio * i.cantidad)}</span></div>`).join("")}
    <div class="checkout-line checkout-total"><span>Total</span><span>${formatPrice(cartTotal(cart))}</span></div>
  `;

  closeCart();
  const modal = document.getElementById("checkoutModal");
  modal.hidden = false;
  (window.requestAnimationFrame || window.setTimeout)(() => modal.classList.add("is-open"));
  document.body.classList.add("modal-open");
  abrirCapa(modal, document.getElementById("checkoutClose"));
}

function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal.hidden) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => (modal.hidden = true), 280);
  cerrarCapa(modal);
}

// Código del pedido (EM-XXXXXX): sin 0/O ni 1/I para dictarlo sin confusiones
function codigoPedido() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const azar = new Uint8Array(6);
  crypto.getRandomValues(azar);
  return "EM-" + Array.from(azar, (x) => letras[x % letras.length]).join("");
}

// Arma el mensaje de WhatsApp con los datos del cliente + su pedido
function buildWaOrderMessage(datosCliente, cart, codigo) {
  const resumen = cart
    .map((item) => `• ${item.nombre} x${item.cantidad} — ${formatPrice(item.precio * item.cantidad)}`)
    .join("\n");
  return (
    `Hola E&M, quiero confirmar este pedido (${codigo}):\n\n${resumen}\n\n` +
    `Total: ${formatPrice(cartTotal(cart))}\n\n` +
    `Nombre: ${datosCliente.nombre}\n` +
    `Teléfono: ${datosCliente.telefono}\n` +
    `Dirección: ${datosCliente.direccion}, ${datosCliente.ciudad}\n` +
    `Método de pago elegido: ${datosCliente.metodo_pago === "contraentrega" ? "Pago contra entrega" : "Coordinar por WhatsApp"}\n` +
    `Autorizo el tratamiento de mis datos para este pedido (eymesencial.me/privacidad).`
  );
}

// Llama a la función serverless de Netlify que crea la preferencia de pago
// en Mercado Pago (el token secreto NUNCA viaja al navegador, ver /netlify/functions/).
async function iniciarPagoMercadoPago(datosCliente, cart) {
  const btn = document.getElementById("checkoutSubmitBtn");
  btn.disabled = true;
  btn.textContent = "Redirigiendo a Mercado Pago...";

  try {
    const respuesta = await fetch("/api/crear-orden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente: datosCliente, items: cart, metodo: "mercadopago" }),
    });

    if (!respuesta.ok) throw new Error("No se pudo crear la preferencia de pago");

    const data = await respuesta.json();
    if (data.init_point) {
      window.location.href = data.init_point; // redirige a la pasarela segura de Mercado Pago
    } else {
      throw new Error("Respuesta sin init_point");
    }
  } catch (error) {
    console.error(error);
    btn.disabled = false;
    btn.textContent = "Confirmar pedido";
    alert(
      "No pudimos conectar con la pasarela de pago en este momento. " +
      "Por favor intenta de nuevo o elige 'Coordinar por WhatsApp'."
    );
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const datos = new FormData(form);
  const datosCliente = {
    nombre: datos.get("nombre").trim(),
    telefono: datos.get("telefono").trim(),
    email: datos.get("email").trim(),
    direccion: datos.get("direccion").trim(),
    ciudad: datos.get("ciudad").trim(),
    metodo_pago: datos.get("metodo_pago"),
  };
  const cart = getCart();
  if (cart.length === 0) return;

  if (datosCliente.metodo_pago === "mercadopago") {
    iniciarPagoMercadoPago(datosCliente, cart);
    return;
  }

  // Contraentrega o "coordinar por WhatsApp": el pedido se registra para el panel
  // (sin esperar respuesta, para que WhatsApp abra de inmediato y el navegador no
  // lo bloquee) y abrimos WhatsApp con todo el pedido y su código ya escritos.
  const codigo = codigoPedido();
  fetch("/api/crear-orden", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cliente: datosCliente,
      items: cart.map(({ id, cantidad }) => ({ id, cantidad })),
      metodo: datosCliente.metodo_pago,
      codigo,
    }),
  }).catch(() => {});
  const mensaje = buildWaOrderMessage(datosCliente, cart, codigo);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
  closeCheckout();
}

// ----------------------------------------------------------
// 4) INICIALIZACIÓN GENERAL
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {

  // --- 4.1) Botones/enlaces fijos de WhatsApp (header, hero, footer, flotante) ---
  document.querySelectorAll("[data-wa-product]").forEach((el) => {
    const product = el.getAttribute("data-wa-product");
    const mensaje =
      product && product.toLowerCase() !== "consulta general"
        ? `Hola E&M, me interesa el perfume ${product}. ¿Tienen disponibilidad?`
        : "Hola E&M, quisiera más información sobre sus fragancias.";
    el.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- 4.2) Trae el catálogo, pinta la portada del día y todas las tarjetas ---
  await catalogoListo;
  pintarPortada();
  renderCatalog();

  // --- 4.2.-1) Cinta de marcas: sale sola de los datos de PERFUMES ---
  // Se ordena de la marca con más fragancias a la que tiene menos. Tocar una marca
  // la escribe en el buscador (que ya filtra por marca) y baja al catálogo.
  (function buildBrandStrip() {
    const track = document.getElementById("brandsTrack");
    if (!track) return;

    const counts = new Map();
    PERFUMES.forEach((p) => {
      if (/^colecci[oó]n/i.test(p.marca)) return; // "Colección Boutique/Nicho" no son marcas
      counts.set(p.marca, (counts.get(p.marca) || 0) + 1);
    });
    const brands = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map((entry) => entry[0]);

    // dos grupos idénticos: el segundo es solo para que el bucle no tenga salto
    const makeGroup = (isCopy) => {
      const group = document.createElement("div");
      group.className = "brands-group";
      if (isCopy) group.setAttribute("aria-hidden", "true");
      brands.forEach((brand) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "brand-chip";
        chip.dataset.brand = brand;
        chip.textContent = brand;
        if (isCopy) chip.tabIndex = -1;
        group.appendChild(chip);
      });
      return group;
    };
    track.append(makeGroup(false), makeGroup(true));

    track.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-brand]");
      if (!chip) return;
      const input = document.getElementById("searchInput");
      input.value = chip.dataset.brand;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    });
  })();

  // --- 4.2.0) Entrada suave de las tarjetas al hacer scroll ---
  // Solo si el navegador lo soporta y la persona no pidió menos movimiento.
  // Sin esta clase las tarjetas se ven normales (nada queda oculto si falla el JS).
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("reveal-on");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".product-card").forEach((card, i) => {
      card.style.setProperty("--d", `${(i % 4) * 60}ms`);
      revealObserver.observe(card);
    });
  }

  // --- 4.2.1) Abrir el modal al hacer clic en el NOMBRE del perfume ---
  // (delegación de eventos: un solo listener para las 186 tarjetas)
  document.getElementById("productGrid").addEventListener("click", (e) => {
    const h3 = e.target.closest("h3, .card-media");
    if (!h3) return;
    const card = e.target.closest(".product-card");
    // el botón "Notas" abre el perfume directo en la ficha de notas olfativas
    const vista = e.target.closest("[data-ver-notas]") ? "notas" : "foto";
    if (card && card.perfumeRef) openProductModal(card.perfumeRef, vista);
  });

  document.getElementById("modalMedia").addEventListener("click", (e) => {
    const btn = e.target.closest(".modal-vista");
    if (btn) mostrarVistaModal(btn.dataset.vista);
  });

  // --- 4.2.2) Cerrar el modal (botón X, clic fuera de la tarjeta, tecla Esc) ---
  document.getElementById("modalClose").addEventListener("click", closeProductModal);

  document.getElementById("productModal").addEventListener("click", (e) => {
    if (e.target.id === "productModal") closeProductModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.getElementById("productModal").hidden) {
      closeProductModal();
    }
  });

  // --- 4.2.3) Agregar al carrito (desde la tarjeta o desde el modal) ---
  document.getElementById("productGrid").addEventListener("click", (e) => {
    if (!e.target.closest("[data-add-to-cart]")) return;
    const card = e.target.closest(".product-card");
    if (card && card.perfumeRef) addToCart(card.perfumeRef, 1);
  });

  document.getElementById("modalAddCart").addEventListener("click", () => {
    if (currentModalPerfume) {
      addToCart(currentModalPerfume, 1);
      closeProductModal();
    }
  });

  // --- 4.2.4) Panel del carrito: abrir/cerrar y controles de cantidad ---
  document.getElementById("cartTrigger").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", (e) => {
    if (e.target.id === "cartOverlay") closeCart();
  });

  document.getElementById("cartItems").addEventListener("click", (e) => {
    const row = e.target.closest(".cart-item");
    if (!row) return;
    const id = row.dataset.id;
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (e.target.closest("[data-qty-plus]")) {
      updateCartQty(id, item.cantidad + 1);
    } else if (e.target.closest("[data-qty-minus]")) {
      updateCartQty(id, item.cantidad - 1);
    } else if (e.target.closest("[data-remove]")) {
      removeFromCart(id);
    }
  });

  // --- 4.2.5) Checkout: abrir desde el carrito, cerrar, y enviar el formulario ---
  document.getElementById("goToCheckout").addEventListener("click", openCheckout);
  document.getElementById("checkoutClose").addEventListener("click", closeCheckout);
  document.getElementById("checkoutModal").addEventListener("click", (e) => {
    if (e.target.id === "checkoutModal") closeCheckout();
  });
  document.getElementById("checkoutForm").addEventListener("submit", handleCheckoutSubmit);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!document.getElementById("cartOverlay").hidden) closeCart();
    if (!document.getElementById("checkoutModal").hidden) closeCheckout();
  });

  // Pinta el carrito guardado (si el cliente ya tenía algo de una visita anterior)
  renderCart();

  // --- 4.3) Buscador + filtros en tiempo real (sobre las tarjetas ya creadas) ---
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearch");
  const categoryButtons = document.querySelectorAll("#categoryFilters .pill");
  const noteButtons = document.querySelectorAll("#noteFilters .pill-note");
  const resetBtn = document.getElementById("resetFilters");
  const noResultsResetBtn = document.getElementById("noResultsReset");
  const resultCountEl = document.getElementById("resultCount");
  const noResultsEl = document.getElementById("noResults");

  const state = { category: "todos", notes: new Set(), search: "" };

  function getCards() {
    return Array.from(document.querySelectorAll(".product-card"));
  }

  function cardMatchesCategory(card) {
    if (state.category === "todos") return true;
    if (state.category === "hombre" || state.category === "mujer") {
      return (card.dataset.gender || "").split(/\s+/).includes(state.category);
    }
    return card.dataset.category === state.category;
  }

  function cardMatchesNotes(card) {
    if (state.notes.size === 0) return true;
    const cardNotes = (card.dataset.notes || "").split(/\s+/);
    for (const note of state.notes) {
      if (cardNotes.includes(note)) return true;
    }
    return false;
  }

  function cardMatchesSearch(card) {
    if (!state.search) return true;
    return (card.dataset.search || "").includes(state.search);
  }

  function applyFilters() {
    const cards = getCards();
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches =
        cardMatchesCategory(card) && cardMatchesNotes(card) && cardMatchesSearch(card);
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    noResultsEl.hidden = visibleCount !== 0;

    resultCountEl.textContent =
      visibleCount === 0
        ? ""
        : visibleCount === cards.length
        ? `Mostrando las ${cards.length} fragancias`
        : `${visibleCount} fragancia${visibleCount === 1 ? "" : "s"} encontrada${visibleCount === 1 ? "" : "s"}`;
  }

  searchInput.addEventListener("input", () => {
    state.search = normalize(searchInput.value);
    clearSearchBtn.hidden = searchInput.value.length === 0;
    applyFilters();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    clearSearchBtn.hidden = true;
    searchInput.focus();
    applyFilters();
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.category = btn.dataset.category;
      applyFilters();
    });
  });

  noteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const note = btn.dataset.note;
      if (state.notes.has(note)) {
        state.notes.delete(note);
        btn.classList.remove("is-active");
      } else {
        state.notes.add(note);
        btn.classList.add("is-active");
      }
      applyFilters();
    });
  });

  function resetAll() {
    state.category = "todos";
    state.notes.clear();
    state.search = "";
    searchInput.value = "";
    clearSearchBtn.hidden = true;
    categoryButtons.forEach((b) => b.classList.remove("is-active"));
    document.querySelector('[data-category="todos"]').classList.add("is-active");
    noteButtons.forEach((b) => b.classList.remove("is-active"));
    applyFilters();
  }

  resetBtn.addEventListener("click", resetAll);
  noResultsResetBtn.addEventListener("click", resetAll);

  applyFilters();
});

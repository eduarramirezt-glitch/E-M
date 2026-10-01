// ==========================================================
// LUMELLA BEAUTY — catálogo dinámico + WhatsApp + buscador/filtros
// ==========================================================

// Reemplaza este número por el WhatsApp real de E&M.
// Formato: código de país + número, SIN espacios, signos ni el "+"
// Ejemplo Colombia: 573001234567
const WHATSAPP_NUMBER = "573214276676";

// ----------------------------------------------------------
// 1) PERFUMES: la lista completa (TODOS_LOS_PERFUMES) vive en
//    perfumes.js, que index.html carga antes que este archivo.
// ----------------------------------------------------------

// Lo que se muestra en la tienda: todo menos los marcados como ocultos
const PERFUMES = TODOS_LOS_PERFUMES.filter((perfume) => !perfume.oculto);

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
    mediaHTML = `<img src="${perfume.imagen_real}" alt="${perfume.nombre} de ${perfume.marca}" loading="lazy">`;
  } else {
    mediaHTML = `
      <div class="placeholder-media" style="background:${perfume.imagen_placeholder}">
        ${BOTTLE_ICON_SVG}
        <span class="placeholder-brand">${perfume.marca}</span>
      </div>`;
  }

  const generoTag =
    genero === "unisex" ? "Unisex" : genero === "hombre" ? "Para él" : "Para ella";

  card.innerHTML = `
    <div class="card-media">
      ${mediaHTML}
    </div>
    <div class="card-body">
      <span class="card-brand">${perfume.marca}</span>
      <h3><button type="button" class="card-title-btn">${perfume.nombre}</button></h3>
      <p class="card-notes">${perfume.notas.join(" · ")}</p>
      <p class="card-size">${coleccionRaw} · ${generoTag}</p>
      <div class="card-footer-row">
        <span class="card-price">${formatPrice(perfume.precio)}</span>
        <div class="card-actions">
          <button type="button" class="btn-add-cart btn-add-cart--card" data-add-to-cart>Agregar</button>
          <a href="${enlace_whatsapp}" class="card-wa" target="_blank" rel="noopener" aria-label="Consultar ${perfume.nombre} por WhatsApp" title="Consultar por WhatsApp">
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
let lastFocusedElement = null;
let currentModalPerfume = null;

function openProductModal(perfume) {
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

  media.innerHTML = perfume.imagen_real
    ? `<img src="${perfume.imagen_real}" alt="${perfume.nombre} de ${perfume.marca}">`
    : `<div class="placeholder-media" style="background:${perfume.imagen_placeholder}">
         ${BOTTLE_ICON_SVG}
         <span class="placeholder-brand">${perfume.marca}</span>
       </div>`;

  brand.textContent = perfume.marca;
  title.textContent = perfume.nombre;
  category.textContent = perfume.categoria;
  description.textContent = generateDescription(perfume);
  notesWrap.innerHTML = perfume.notas.map((n) => `<span>${n}</span>`).join("");
  priceEl.textContent = formatPrice(perfume.precio);
  waBtn.setAttribute("href", buildWaLink(perfume.nombre));

  lastFocusedElement = document.activeElement;

  modal.hidden = false;
  // requestAnimationFrame para que la transición de opacidad/escala sí se anime
  // (con fallback por si el entorno no lo soporta)
  (window.requestAnimationFrame || window.setTimeout)(() => modal.classList.add("is-open"));
  document.body.classList.add("modal-open");
  document.getElementById("modalClose").focus();
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal.hidden) return;

  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  setTimeout(() => {
    modal.hidden = true;
  }, 280);

  if (lastFocusedElement) lastFocusedElement.focus();
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
      .map((item) => ({ ...item, precio: PERFUMES_POR_ID.get(item.id).precio }));
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

// id único y estable por perfume (usamos el nombre normalizado)
function perfumeId(perfume) {
  return normalize(perfume.nombre);
}

const PERFUMES_POR_ID = new Map(PERFUMES.map((perfume) => [perfumeId(perfume), perfume]));

function addToCart(perfume, cantidad = 1) {
  const cart = getCart();
  const id = perfumeId(perfume);
  const existente = cart.find((item) => item.id === id);

  if (existente) {
    existente.cantidad += cantidad;
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
    if (item) item.cantidad = cantidad;
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
        ? `<img src="${item.imagen}" alt="${item.nombre}">`
        : `<div class="placeholder-media" style="background:${item.imagen_placeholder}">${BOTTLE_ICON_SVG}</div>`;

      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-media">${mediaHTML}</div>
          <div class="cart-item-info">
            <span class="cart-item-brand">${item.marca}</span>
            <span class="cart-item-name">${item.nombre}</span>
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
  document.getElementById("cartOverlay").hidden = false;
  (window.requestAnimationFrame || window.setTimeout)(() =>
    document.getElementById("cartOverlay").classList.add("is-open")
  );
  document.body.classList.add("modal-open");
}

function closeCart() {
  const overlay = document.getElementById("cartOverlay");
  overlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => (overlay.hidden = true), 280);
}

// ----------------------------------------------------------
// 7) CHECKOUT (formulario + Mercado Pago / contraentrega / WhatsApp)
// ----------------------------------------------------------
function openCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const summary = document.getElementById("checkoutOrderSummary");
  summary.innerHTML = `
    ${cart.map((i) => `<div class="checkout-line"><span>${i.nombre} x${i.cantidad}</span><span>${formatPrice(i.precio * i.cantidad)}</span></div>`).join("")}
    <div class="checkout-line checkout-total"><span>Total</span><span>${formatPrice(cartTotal(cart))}</span></div>
  `;

  closeCart();
  const modal = document.getElementById("checkoutModal");
  modal.hidden = false;
  (window.requestAnimationFrame || window.setTimeout)(() => modal.classList.add("is-open"));
  document.body.classList.add("modal-open");
}

function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => (modal.hidden = true), 280);
}

// Arma el mensaje de WhatsApp con los datos del cliente + su pedido
function buildWaOrderMessage(datosCliente, cart) {
  const resumen = cart
    .map((item) => `• ${item.nombre} x${item.cantidad} — ${formatPrice(item.precio * item.cantidad)}`)
    .join("\n");
  return (
    `Hola E&M, quiero confirmar este pedido:\n\n${resumen}\n\n` +
    `Total: ${formatPrice(cartTotal(cart))}\n\n` +
    `Nombre: ${datosCliente.nombre}\n` +
    `Teléfono: ${datosCliente.telefono}\n` +
    `Dirección: ${datosCliente.direccion}, ${datosCliente.ciudad}\n` +
    `Método de pago elegido: ${datosCliente.metodo_pago === "contraentrega" ? "Pago contra entrega" : "Coordinar por WhatsApp"}`
  );
}

// Llama a la función serverless de Netlify que crea la preferencia de pago
// en Mercado Pago (el token secreto NUNCA viaja al navegador, ver /netlify/functions/).
async function iniciarPagoMercadoPago(datosCliente, cart) {
  const btn = document.getElementById("checkoutSubmitBtn");
  btn.disabled = true;
  btn.textContent = "Redirigiendo a Mercado Pago...";

  try {
    const respuesta = await fetch("/.netlify/functions/crear-orden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente: datosCliente, items: cart }),
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

  // Contraentrega o "coordinar por WhatsApp": abrimos WhatsApp con todo el
  // pedido ya escrito, y dejamos el carrito guardado por si vuelve a entrar.
  const mensaje = buildWaOrderMessage(datosCliente, cart);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
  closeCheckout();
}

// ----------------------------------------------------------
// 4) INICIALIZACIÓN GENERAL
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

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

  // --- 4.2) Genera todas las tarjetas desde el arreglo PERFUMES ---
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
    if (card && card.perfumeRef) openProductModal(card.perfumeRef);
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

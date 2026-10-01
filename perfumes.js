// ==========================================================
// E&M — LISTA DE PERFUMES Y PRECIOS
// ----------------------------------------------------------
// La usan la página (se carga antes de script.js) y la función
// de pago netlify/functions/crear-orden.js, que cobra SIEMPRE
// el precio de esta lista y no el que manda el navegador.
// Para cambiar un precio basta con cambiarlo aquí.
// ==========================================================

// ----------------------------------------------------------
// ARREGLO DE PERFUMES (extraído del catálogo E&M)
//    Cada objeto trae: nombre, marca, categoria, notas,
//    imagen_real (ruta si ya subiste la foto, o null) e
//    imagen_placeholder (color elegante de respaldo).
//
//    Precios (30/09/2026): salen del catálogo del proveedor
//    (catalogosvirtual.digital) con esta regla: precio del
//    catálogo + $10.000, salvo los de $125.000, que quedan igual.
//    Cada precio dice en su comentario de qué catálogo y página
//    sale. precio_cofre (opcional) se menciona en el modal.
//    oculto: true = no se muestra (no está en el catálogo).
// ----------------------------------------------------------
const TODOS_LOS_PERFUMES = [
  {
    nombre: 'Bharara Viking Dubai',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Ámbar', 'Especiado', 'Amaderado', 'Oud'],
    precio: 125000, // proveedor: $125.000 (Árabe p6, «BHARARA VIKING DUBAI»)
    imagen_real: 'images/bharara-viking-dubai.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Viking Khasmir',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 125000, // proveedor: $125.000 (línea BHARARA VIKING (Dubai / Cairo), este nombre exacto no aparece)
    imagen_real: 'images/bharara-viking-khasmir.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara King Parfum',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Agrios', 'Dulce', 'Vainilla', 'Ámbar'],
    precio: 125000, // proveedor: $125.000 (Árabe p5, «BHARARA KING PARFUM»)
    imagen_real: 'images/bharara-king-parfum.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Rose',
    marca: 'Bharara',
    categoria: 'Árabe / Mujer',
    notas: ['Cítrico', 'Rosa Floral', 'Amaderado'],
    precio: 125000, // proveedor: $125.000 (línea BHARARA (todos a $125), este nombre exacto no aparece)
    imagen_real: 'images/bharara-rose.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara King',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Ámbar', 'Especiado', 'Amaderado'],
    precio: 125000, // proveedor: $125.000 (Árabe p5, «BHARARA KING»)
    imagen_real: 'images/bharara-king.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Niche',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Aromático', 'Amaderado', 'Fresco'],
    precio: 125000, // proveedor: $125.000 (línea BHARARA (todos a $125), este nombre exacto no aparece)
    imagen_real: 'images/bharara-niche.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Niche Femme',
    marca: 'Bharara',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 125000, // proveedor: $125.000 (línea BHARARA (todos a $125), este nombre exacto no aparece)
    imagen_real: 'images/bharara-niche-femme.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Bleu',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Fresco', 'Acuático', 'Cítrico'],
    precio: 125000, // proveedor: $125.000 (línea BHARARA DOUBLE BLEU, este nombre exacto no aparece)
    imagen_real: 'images/bharara-bleu.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Cloud',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Lactónico', 'Vainilla', 'Coco'],
    precio: 115000, // proveedor: $105.000 (Diseñador p29, «CLOUD»)
    imagen_real: 'images/cloud.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Cloud 2.0 Intense',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Amaderado', 'Ámbar', 'Vainilla'],
    precio: 115000, // proveedor: $105.000 (Diseñador p29, «CLOUD 2.0»)
    imagen_real: 'images/cloud-20-intense.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Cloud Pink',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Sabroso', 'Tropical', 'Floral'],
    precio: 115000, // proveedor: $105.000 (línea ARIANA GRANDE (todos a $105), este nombre exacto no aparece)
    imagen_real: 'images/cloud-pink.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Thank U, Next',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Coco', 'Vainilla', 'Rosa'],
    precio: 115000, // proveedor: $105.000 (Diseñador p29, «THANK U NEXT»)
    imagen_real: 'images/thank-u-next.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Thank U, Next 2.0',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Frutal', 'Floral'],
    precio: 115000, // proveedor: $105.000 (Diseñador p28, «THANK U NEXT 2.0»)
    imagen_real: 'images/thank-u-next-20.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Sweet Like Candy',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Caramelo', 'Vainilla'],
    precio: 115000, // proveedor: $105.000 (Diseñador p29, «SWEET LIKE CANDY»)
    imagen_real: 'images/sweet-like-candy.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Sweet Like Candy 2.0',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Frutal', 'Almizclado'],
    precio: 115000, // proveedor: $105.000 (línea ARIANA GRANDE (todos a $105), este nombre exacto no aparece)
    imagen_real: 'images/sweet-like-candy-20.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'R.E.M',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Almizclado', 'Amaderado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p29, «REM»)
    imagen_real: 'images/rem.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Mod Blush',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 115000, // proveedor: $105.000 (Diseñador p28, «MOD BLUSH»)
    imagen_real: 'images/mod-blush.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Mood Vainilla',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Vainilla', 'Dulce', 'Amaderado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p28, «MOD VANILA»)
    imagen_real: 'images/mood-vainilla.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Pink Yara',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Vainilla', 'Cítrico'],
    precio: 0, // sin precio: Yara solo está en el catálogo ORIGINAL ($225.000)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/pink-yara.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Asad',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Vainilla', 'Amaderado', 'Dulce'],
    precio: 115000, // proveedor: $105.000 (Árabe p12, «ASAD»)
    imagen_real: 'images/asad.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Candy',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Caramelo', 'Vainilla'],
    precio: 0, // sin precio: Yara Candy solo está en el catálogo ORIGINAL ($210.000)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/yara-candy.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Moi',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Vainilla', 'Almizclado'],
    precio: 0, // sin precio: Yara Moi solo está en el catálogo ORIGINAL ($210.000)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/yara-moi.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Tous',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 0, // sin precio: Yara Tous solo está en el catálogo ORIGINAL ($225.000)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/yara-tous.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Asad Zanzibar',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Especiado', 'Amaderado', 'Oud'],
    precio: 115000, // proveedor: $105.000 (Árabe p12, «ASAD ZANZIBAR»)
    imagen_real: 'images/asad-zanzibar.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Khamrah',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p11, «KHAMRAH»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/khamrah.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Fakhar Black',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Aromático', 'Amaderado', 'Especiado'],
    precio: 125000, // proveedor: $125.000 (Árabe p14, «LATTAFA FAKHAR BLACK»)
    imagen_real: 'images/fakhar-black.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Fakhar White',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Fresco', 'Aromático', 'Almizclado'],
    precio: 125000, // proveedor: $125.000 (línea FAKHAR (Gold, Black, Rose a $125), este nombre exacto no aparece)
    imagen_real: 'images/fakhar-white.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Amethyst',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Vainilla', 'Cítrico', 'Floral'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p15, «BADE'E AL OUD AMETHYST»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/badee-al-oud-amethyst.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Sublime',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Floral', 'Amaderado', 'Ámbar'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p15, «BADE'E AL OUD SUBLIME»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/badee-al-oud-sublime.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Honor & Glory',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Especiado'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p15, «HONOR AND GLORY»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/badee-al-oud-honor-glory.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud For Glory',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Oud', 'Amaderado', 'Ámbar'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p15, «OUD FOR GLORY»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/badee-al-oud-for-glory.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Azure Fantasy',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Fresco', 'Acuático', 'Cítrico'],
    precio: 0, // sin precio: Azure Fantasy no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/azure-fantasy.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Private Edition',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Vainilla'],
    precio: 115000, // proveedor: $105.000 (Árabe p2, «AL HARAMAIN AMBER OUD PRIVATE»)
    imagen_real: 'images/amber-oud-private-edition.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Gold',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 115000, // proveedor: caja $105.000 (línea AMBER OUD (Black, Aqua, Rouge: caja $105 / cofre $125), este nombre exacto no aparece)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-oud-gold.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Rouge',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Frutal', 'Especiado'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p2, «AL HARAMAIN AMBER OUD ROUGE»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-oud-rouge.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Rouge',
    marca: 'Orientica',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Dulce', 'Especiado'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p19, «ORIENTICA AMBER ROUGE»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-rouge.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Royal Amber',
    marca: 'Orientica',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Vainilla'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p19, «ORIENTICA ROYAL AMBER»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-royal.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Velvet Gold',
    marca: 'Orientica',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Suave', 'Vainilla'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p19, «ORIENTICA VELVET GOLD»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-velvet.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Noir',
    marca: 'Orientica',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Especiado', 'Amaderado'],
    precio: 115000, // proveedor: caja $105.000 (línea ORIENTICA PREMIUM COLLECTION, este nombre exacto no aparece)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/amber-noir.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Oud Saffron',
    marca: 'Orientica',
    categoria: 'Árabe / Unisex',
    notas: ['Oud', 'Azafrán', 'Especiado'],
    precio: 115000, // proveedor: caja $105.000 (Árabe p19, «ORIENTICA OUD SAFFRON»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/oud-saffron.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Roso',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Rosa', 'Dulce'],
    precio: 125000, // proveedor: $125.000 (Árabe p26, «ILMIN IL ROSO»)
    imagen_real: 'images/roso.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Oomph',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Unisex',
    notas: ['Amaderado', 'Especiado', 'Ámbar'],
    precio: 125000, // proveedor: $125.000 (línea ILMIN (Il Roso, Il Vita a $125), este nombre exacto no aparece)
    imagen_real: 'images/oomph.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Erotique',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Floral', 'Almizclado'],
    precio: 125000, // proveedor: $125.000 (línea ILMIN (Il Roso, Il Vita a $125), este nombre exacto no aparece)
    imagen_real: 'images/erotique.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Orgasme',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Frutal', 'Vainilla'],
    precio: 125000, // proveedor: $125.000 (línea ILMIN (Il Roso, Il Vita a $125), este nombre exacto no aparece)
    imagen_real: 'images/orgasme.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Club de Nuit Intense Man',
    marca: 'Armaf',
    categoria: 'Nicho / Hombre',
    notas: ['Frutal', 'Amaderado', 'Ámbar'],
    precio: 115000, // proveedor: $105.000 (Árabe p6, «CLUB DE NUIT INTENSE»)
    imagen_real: 'images/club-de-nuit-intense-man.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Erba Pura',
    marca: 'Xerjoff',
    categoria: 'Nicho / Unisex',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 125000, // proveedor: $125.000 (Árabe p16, «XERJOFF ERBA PURA»)
    imagen_real: 'images/erba-pura.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Baccarat Rouge 540',
    marca: 'Maison Francis Kurkdjian',
    categoria: 'Nicho / Unisex',
    notas: ['Dulce', 'Ámbar', 'Floral'],
    precio: 100000, // proveedor: $90.000 (Árabe p21, «BACCARAT ROUGE 540»)
    imagen_real: 'images/baccarat-rouge-540.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'À la Rose',
    marca: 'Maison Francis Kurkdjian',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Ámbar', 'Dulce'],
    precio: 0, // sin precio: no aparece en el catálogo (antes estaba mal nombrado como «Amethyst» de Lattafa)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/amethyst.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Silver Mountain Water',
    marca: 'Creed',
    categoria: 'Nicho / Hombre',
    notas: ['Cítrico', 'Verde', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p42, «CREED SILVER MOUNTAIN WATER»)
    imagen_real: 'images/silver-mountain-water.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Aventus',
    marca: 'Creed',
    categoria: 'Nicho / Hombre',
    notas: ['Frutal', 'Ahumado', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p42, «CREED AVENTUS»)
    imagen_real: 'images/aventus.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Millésime Impérial',
    marca: 'Creed',
    categoria: 'Nicho / Unisex',
    notas: ['Cítrico', 'Acuático', 'Almizclado'],
    precio: 90000, // proveedor: $80.000 (Diseñador p42, «CREED MILLESIME IMPERIAL»)
    imagen_real: 'images/millesime-imperial.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Arabians Tonka',
    marca: 'Colección Nicho',
    categoria: 'Nicho / Unisex',
    notas: ['Dulce', 'Haba Tonka', 'Ámbar'],
    precio: 0, // sin precio: Arabians Tonka no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/arabians-tonka.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Montale Roses',
    marca: 'Montale',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Rosa', 'Frutal'],
    precio: 100000, // proveedor: $90.000 (línea MONTALE (4 aromas a $90; Roses Musk no está), este nombre exacto no aparece)
    imagen_real: 'images/montale-roses.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Daydreams',
    marca: 'Colección Nicho',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 0, // sin precio: Daydreams no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/daydreams.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Layton',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Dulce', 'Aromático', 'Amaderado'],
    precio: 100000, // proveedor: $90.000 (Árabe p21, «MARLY LAYTON ROYAL ESSENCE»)
    imagen_real: 'images/layton.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Kalan',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Dulce'],
    precio: 100000, // proveedor: $90.000 (Árabe p21, «MARLY LAYTON KALAN»)
    imagen_real: 'images/kalan.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Percival',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Cítrico', 'Aromático', 'Amaderado'],
    precio: 0, // sin precio: Percival no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/percival.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Althaïr',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 0, // sin precio: Althaïr no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/althair.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Herod',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 0, // sin precio: Herod no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/herod.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Delina',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p27, «DELINA ROYAL ESSENCE»)
    imagen_real: 'images/delina.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Hombre Nomade',
    marca: 'Louis Vuitton',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 115000, // proveedor: $105.000 (línea LOUIS VUITTON (3 aromas a $105; Ombré Nomade no está), este nombre exacto no aparece)
    imagen_real: 'images/hombre-nomade.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Attrape-Rêves',
    marca: 'Louis Vuitton',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 115000, // proveedor: $105.000 (línea LOUIS VUITTON (3 aromas a $105; Attrape-Rêves no está), este nombre exacto no aparece)
    imagen_real: 'images/attrape-reves.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Good Girl',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p2, «GOOD GIRL CLASSIC»)
    imagen_real: 'images/good-girl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Blush',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Dulce'],
    precio: 90000, // proveedor: $80.000 (Diseñador p2, «GOOD GIRL BLUSH»)
    imagen_real: 'images/good-girl-blush.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Very Good Girl',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 90000, // proveedor: $80.000 (Diseñador p2, «VERY GOOD GIRL»)
    imagen_real: 'images/very-good-girl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl White Supreme',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 90000, // proveedor: $80.000 (línea GOOD GIRL (variantes a $80), este nombre exacto no aparece)
    imagen_real: 'images/good-girl-white-supreme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Fantastic Pink',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 90000, // proveedor: $80.000 (Diseñador p2, «FANTASTIC PINK»)
    imagen_real: 'images/good-girl-fantastic-pink.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Supreme',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Amaderado', 'Vainilla'],
    precio: 90000, // proveedor: $80.000 (Diseñador p3, «SUPREME»)
    imagen_real: 'images/good-girl-supreme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Carolina Herrera Tradicional',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Amaderado', 'Aldehído'],
    precio: 90000, // proveedor: $80.000 (Diseñador p4, «CH CAROLINA HERRERA»)
    imagen_real: 'images/carolina-herrera-tradicional.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Sexy',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p5, «212 SEXY»)
    imagen_real: 'images/212-sexy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Rose',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 80000, // proveedor: $70.000 (Diseñador p5, «212 VIP ROSE»)
    imagen_real: 'images/212-vip-rose.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Dama',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p5, «212 NYC EAU DE TOILETTE»)
    imagen_real: 'images/212-dama.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Héroes Dama',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 90000, // proveedor: $80.000 (Diseñador p6, «212 HEROES FOREVER YOUNG»)
    imagen_real: 'images/212-heroes-dama.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (línea 212 HOMBRE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/212-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 VIP»)
    imagen_real: 'images/212-vip-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Black',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 VIP BLACK»)
    imagen_real: 'images/212-vip-black.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Sexy Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 SEXY MEN»)
    imagen_real: 'images/212-sexy-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Men Aqua',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Cítrico', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 AQUA»)
    imagen_real: 'images/212-men-aqua.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Héroes Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 MEN HEROES»)
    imagen_real: 'images/212-heroes-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men Wild Party',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Dulce', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p34, «212 WILD MEN»)
    imagen_real: 'images/212-vip-men-wild-party.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men Wins',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p33, «212 WINS»)
    imagen_real: 'images/212-vip-men-wins.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bad Boy',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cacao'],
    precio: 80000, // proveedor: $70.000 (Diseñador p33, «BAD BOY»)
    imagen_real: 'images/bad-boy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CH Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p33, «CH MEN»)
    imagen_real: 'images/ch-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Herrera For Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Aromático'],
    precio: 80000, // proveedor: $70.000 (línea CAROLINA HERRERA HOMBRE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/herrera-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Essential',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE ESSENTIAL»)
    imagen_real: 'images/lacoste-essential.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste White',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE L.12.12 BLANC»)
    imagen_real: 'images/lacoste-white.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Rouge',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE ROUGE»)
    imagen_real: 'images/lacoste-rouge.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Style in Play',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Fresco', 'Cítrico', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (línea LACOSTE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/lacoste-style-in-play.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Green',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Verde', 'Cítrico', 'Herbáceo'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE L.12.12 VERT»)
    imagen_real: 'images/lacoste-green.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Bleu Powerful',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE L.12.12 BLEU»)
    imagen_real: 'images/lacoste-bleu-powerful.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Yellow',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p38, «LACOSTE YELLOW OPTIMISTIC»)
    imagen_real: 'images/lacoste-yellow.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Pour Elle Sparkling',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p9, «LACOSTE SPARKLING»)
    imagen_real: 'images/lacoste-pour-elle-sparkling.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Pour Elle Natural',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (línea LACOSTE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/lacoste-pour-elle-natural.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Sensuelle',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (línea LACOSTE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/lacoste-sensuelle.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Cheap & Chic I Love Love',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 90000, // proveedor: $80.000 (Diseñador p25, «LOVE LOVE MOSCHINO»)
    imagen_real: 'images/cheap-chic-i-love-love.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Moschino Funny',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 80000, // proveedor: $70.000 (Diseñador p24, «FUNNY MOSCHINO»)
    imagen_real: 'images/moschino-funny.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bubble Gum',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Frutal', 'Almizclado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p24, «TOY 2 BUBBLE GUM MOSCHINO»)
    imagen_real: 'images/bubble-gum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy Boy',
    marca: 'Moschino',
    categoria: 'Diseñador / Unisex',
    notas: ['Floral', 'Especiado', 'Amaderado'],
    precio: 115000, // proveedor: $105.000 (Árabe p24, «MOSCHINO TOY BOY»)
    imagen_real: 'images/toy-boy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy 2',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 115000, // proveedor: $105.000 (Diseñador p24, «TOY 2 MOSCHINO»)
    imagen_real: 'images/toy-2.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy 2 Pearl',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 115000, // proveedor: $105.000 (Árabe p24, «MOSCHINO TOY 2 PEARL»)
    imagen_real: 'images/toy-2-pearl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Pink Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 115000, // proveedor: $105.000 (Diseñador p24, «MOSCHINO FRESH PINK»)
    imagen_real: 'images/pink-fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Fresco'],
    precio: 115000, // proveedor: $105.000 (Diseñador p24, «MOSCHINO FRESH»)
    imagen_real: 'images/fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Gold Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 90000, // proveedor: $80.000 (Diseñador p25, «FRESH GOLD (ojo: también hay "TOY 2 GOLD" a $105)»)
    imagen_real: 'images/gold-fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Paris Hilton Men',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Hombre',
    notas: ['Fresco', 'Amaderado', 'Especiado'],
    precio: 0, // sin precio: Paris Hilton Men no aparece (solo los de mujer)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/paris-hilton-men.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Paris Hilton',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Floral', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p13, «PARIS HILTON»)
    imagen_real: 'images/paris-hilton.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Paris Hilton Heiress',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p13, «HEIRESS PARIS HILTON»)
    imagen_real: 'images/paris-hilton-heiress.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Can Can',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Especiado', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p13, «CAN CAN PARIS HILTON»)
    imagen_real: 'images/can-can.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'One Million',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p48, «ONE MILLION CLÁSICA»)
    imagen_real: 'images/one-million.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Lucky',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Frutal'],
    precio: 90000, // proveedor: $80.000 (Diseñador p48, «ONE MILLION LUCKY»)
    imagen_real: 'images/one-million-lucky.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Elixir',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 90000, // proveedor: $80.000 (Diseñador p48, «ONE MILLION ELIXIR»)
    imagen_real: 'images/one-million-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 90000, // proveedor: $80.000 (Diseñador p48, «ONE MILLION PARFUM»)
    imagen_real: 'images/one-million-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Million Royal',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 90000, // proveedor: $80.000 (Diseñador p48, «ONE MILLION ROYAL»)
    imagen_real: 'images/million-royal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Privé',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 90000, // proveedor: $80.000 (Diseñador p48, «ONE MILLION PRIVE»)
    imagen_real: 'images/one-million-prive.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lady Million',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p7, «LADY MILLION»)
    imagen_real: 'images/lady-million.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lady Million Lucky',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p7, «LADY MILLION LUCKY»)
    imagen_real: 'images/lady-million-lucky.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p47, «INVICTUS CLÁSICA»)
    imagen_real: 'images/invictus.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Legend',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Fresco'],
    precio: 90000, // proveedor: $80.000 (Diseñador p47, «INVICTUS LEGEND»)
    imagen_real: 'images/invictus-legend.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Onyx',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 90000, // proveedor: $80.000 (Diseñador p47, «INVICTUS ONYX»)
    imagen_real: 'images/invictus-onyx.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cálido', 'Especiado'],
    precio: 90000, // proveedor: $80.000 (línea INVICTUS (variantes a $80), este nombre exacto no aparece)
    imagen_real: 'images/invictus-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Victory',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Dulce'],
    precio: 90000, // proveedor: $80.000 (Diseñador p47, «INVICTUS VICTORY»)
    imagen_real: 'images/invictus-victory.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Victory Elixir',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Intenso', 'Especiado'],
    precio: 90000, // proveedor: $80.000 (Diseñador p47, «INVICTUS VICTORY ELIXIR»)
    imagen_real: 'images/invictus-victory-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Olympéa',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Vainilla', 'Amaderado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «OLYMPEA CLÁSICA»)
    imagen_real: 'images/olympea.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Vainilla', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p45, «PHANTOM EDT PARFUM»)
    imagen_real: 'images/phantom.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom Legion',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (línea PHANTOM (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/phantom-legion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Vainilla', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p45, «PHANTOM PARFUM»)
    imagen_real: 'images/phantom-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS For Her',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p17, «BLACK XS»)
    imagen_real: 'images/black-xs-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS L\'Aphrodisiaque For Men',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 80000, // proveedor: $70.000 (Diseñador p46, «BLACK XS APHRODISIAQUE»)
    imagen_real: 'images/black-xs-laphrodisiaque-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS L\'Excès For Him',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p46, «BLACK XS LEXCES»)
    imagen_real: 'images/black-xs-lexces-for-him.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Dior Homme',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Iris', 'Cuero'],
    precio: 0, // sin precio: Dior Homme no aparece (sí Homme Intense a $80)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/dior-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Dior Homme Intense',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Iris', 'Cálido'],
    precio: 90000, // proveedor: $80.000 (Diseñador p35, «DIOR HOMME INTENSE»)
    imagen_real: 'images/dior-homme-intense.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Fahrenheit',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cuero', 'Floral'],
    precio: 80000, // proveedor: $70.000 (Diseñador p35, «DIOR FAHRENHEIT»)
    imagen_real: 'images/fahrenheit.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'J\'Adore',
    marca: 'Dior',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p23, «JADORE DIOR»)
    imagen_real: 'images/jadore.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Miss Dior',
    marca: 'Dior',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Rosa'],
    precio: 80000, // proveedor: $70.000 (Diseñador p23, «MISS DIOR»)
    imagen_real: 'images/miss-dior.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Sauvage',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p35, «DIOR SAUVAGE»)
    imagen_real: 'images/sauvage.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Sauvage Elixir',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 90000, // proveedor: $80.000 (Diseñador p35, «DIOR SAUVAGE ELIXIR»)
    imagen_real: 'images/sauvage-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Classique',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p21, «GAULTIER CLASSIQUE»)
    imagen_real: 'images/classique.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Gaultier Divine',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 115000, // proveedor: $105.000 (Diseñador p21, «GAULTIER DIVINE»)
    imagen_real: 'images/gaultier-divine.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'La Belle Fleur Terrible',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 115000, // proveedor: $105.000 (línea GAULTIER LA BELLE (todas a $105), este nombre exacto no aparece)
    imagen_real: 'images/la-belle-fleur-terrible.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'La Belle Le Parfum',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Vainilla'],
    precio: 115000, // proveedor: $105.000 (Diseñador p21, «GAULTIER LA BELLE»)
    imagen_real: 'images/la-belle-le-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Beau',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Fresco'],
    precio: 0, // sin precio: Le Beau no aparece (no hay Gaultier de hombre en el catálogo)
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/le-beau.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Male',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Aromático', 'Dulce', 'Amaderado'],
    precio: 0, // sin precio: Le Male no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/le-male.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Scandal Pour Homme',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p55, «SCANDAL (hombre)»)
    imagen_real: 'images/scandal-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Scandal',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p20, «SCANDAL JEAN PAUL GAULTIER»)
    imagen_real: 'images/scandal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Male Elixir',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 0, // sin precio: Le Male Elixir no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/le-male-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Ultra Male',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Especiado'],
    precio: 0, // sin precio: Ultra Male no aparece
    oculto: true, // no se muestra hasta tener su precio real
    imagen_real: 'images/ultra-male.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Pour Homme',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p41, «DOLCE GABBANA LIGHT BLUE»)
    imagen_real: 'images/light-blue-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Woman',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p12, «DOLCE AND GABBANA LIGHT BLUE»)
    imagen_real: 'images/light-blue-woman.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'K by Dolce & Gabbana',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Aromático'],
    precio: 80000, // proveedor: $70.000 (Diseñador p41, «K BY DOLCE GABBANA»)
    imagen_real: 'images/k-by-dolce-gabbana.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Devotion',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Vainilla'],
    precio: 80000, // proveedor: $70.000 (Diseñador p12, «DOLCE AND GABBANA DEVOTION»)
    imagen_real: 'images/devotion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Summer Vibes',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Unisex',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (línea LIGHT BLUE (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/light-blue-summer-vibes.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'The One Women',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p12, «THE ONE EAU DE PARFUM»)
    imagen_real: 'images/the-one-women.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'The One For Men',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p41, «DOLCE GABBANA THE ONE»)
    imagen_real: 'images/the-one-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Deep Red',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p8, «DEEP RED FOR HER»)
    imagen_real: 'images/deep-red.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Dark Blue',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p53, «HUGO BOSS DARK BLUE»)
    imagen_real: 'images/hugo-dark-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Frutal'],
    precio: 80000, // proveedor: $70.000 (Diseñador p52, «HUGO BOSS BOTTLED»)
    imagen_real: 'images/boss-bottled.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled Night',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 80000, // proveedor: $70.000 (Diseñador p52, «HUGO BOSS BOTTLED NIGHT»)
    imagen_real: 'images/boss-bottled-night.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled Unlimited',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p52, «HUGO BOSS UNLIMITED»)
    imagen_real: 'images/boss-bottled-unlimited.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss In Motion',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p53, «HUGO BOSS IN MOTION»)
    imagen_real: 'images/boss-in-motion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Orange For Men',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p54, «HUGO BOSS ORANGE»)
    imagen_real: 'images/boss-orange-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss The Scent Men',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cuero'],
    precio: 80000, // proveedor: $70.000 (Diseñador p52, «HUGO BOSS THE SCENT»)
    imagen_real: 'images/boss-the-scent-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss The Scent For Her',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p8, «THE SCENT FOR HER»)
    imagen_real: 'images/boss-the-scent-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Boss Cantimplora',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (línea HUGO BOSS (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/hugo-boss-cantimplora.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Red',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p53, «HUGO BOSS RED»)
    imagen_real: 'images/hugo-red.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK In2U For Her',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p18, «IN2U CK»)
    imagen_real: 'images/ck-in2u-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK In2U For Him',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (línea CALVIN KLEIN (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/ck-in2u-for-him.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK One',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Unisex',
    notas: ['Cítrico', 'Fresco', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (línea CALVIN KLEIN (todos a $70), este nombre exacto no aparece)
    imagen_real: 'images/ck-one.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Euphoria',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p18, «EUPHORIA CK»)
    imagen_real: 'images/euphoria.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Allure Homme Sport',
    marca: 'Chanel',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p41, «ALLURE HOME SPORT»)
    imagen_real: 'images/allure-homme-sport.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bleu de Chanel',
    marca: 'Chanel',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p43, «BLEU DE CHANEL»)
    imagen_real: 'images/bleu-de-chanel.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «CHANCE CHANEL PARFUM SPRAY»)
    imagen_real: 'images/chance.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance Eau Fraîche',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «CHANCE CHANEL FRAICHE SPRAY»)
    imagen_real: 'images/chance-eau-fraiche.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance Eau Tendre',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «CHANCE CHANEL EAU DE TENDRE»)
    imagen_real: 'images/chance-eau-tendre.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chanel Nº 5',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Amaderado', 'Floral', 'Cítrico'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «N°5 CHANEL»)
    imagen_real: 'images/chanel-no-5.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Coco Mademoiselle',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Amaderado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p11, «COCO MADEMOISELLE»)
    imagen_real: 'images/coco-mademoiselle.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Especiado'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE EROS»)
    imagen_real: 'images/eros.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Flame',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE EROS FLAME»)
    imagen_real: 'images/eros-flame.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Energy',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE EROS ENERGY»)
    imagen_real: 'images/eros-energy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bright Crystal',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p16, «VERSACE BRIGHT CRYSTAL»)
    imagen_real: 'images/bright-crystal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bright Crystal Absolu',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 80000, // proveedor: $70.000 (Diseñador p17, «VERSACE BRIGHT CRYSTAL ABSOLU»)
    imagen_real: 'images/bright-crystal-absolu.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Pour Femme',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Frutal'],
    precio: 90000, // proveedor: caja $80.000 (Diseñador p16, «EROS POUR FEMME»)
    precio_cofre: 125000, // proveedor: cofre $125.000
    imagen_real: 'images/eros-pour-femme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Man Eau Fraîche',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE MAN EAU FRAICHE»)
    imagen_real: 'images/versace-man-eau-fraiche.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Yellow Diamond',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Frutal'],
    precio: 80000, // proveedor: $70.000 (Diseñador p16, «YELLOW DIAMOND»)
    imagen_real: 'images/yellow-diamond.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Homme',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE POUR HOMME»)
    imagen_real: 'images/versace-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Homme Dylan Blue',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Aromático', 'Fresco'],
    precio: 80000, // proveedor: $70.000 (Diseñador p36, «VERSACE DYLAN BLUE»)
    imagen_real: 'images/versace-pour-homme-dylan-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Femme Dylan Blue',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 80000, // proveedor: $70.000 (Diseñador p16, «DYLAN BLUE»)
    imagen_real: 'images/versace-pour-femme-dylan-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Femme Dylan Purple',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 80000, // proveedor: $70.000 (Diseñador p16, «DYLAN PURPLE»)
    imagen_real: 'images/versace-pour-femme-dylan-purple.jpg',
    imagen_placeholder: '#1c1a1d',
  },
];

// En el servidor (Node) se exporta; en el navegador queda como variable global
if (typeof module !== "undefined") module.exports = TODOS_LOS_PERFUMES;

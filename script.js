// ==========================================================
// LUMELLA BEAUTY — catálogo dinámico + WhatsApp + buscador/filtros
// ==========================================================

// Reemplaza este número por el WhatsApp real de E&M.
// Formato: código de país + número, SIN espacios, signos ni el "+"
// Ejemplo Colombia: 573001234567
const WHATSAPP_NUMBER = "573214276676";

// ----------------------------------------------------------
// 1) ARREGLO DE PERFUMES (extraído del catálogo E&M)
//    Cada objeto trae: nombre, marca, categoria, notas,
//    imagen_real (ruta si ya subiste la foto, o null) e
//    imagen_placeholder (color elegante de respaldo).
// ----------------------------------------------------------
const PERFUMES = [
  {
    nombre: 'Bharara Viking Dubai',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Ámbar', 'Especiado', 'Amaderado', 'Oud'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-viking-dubai.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Viking Khasmir',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-viking-khasmir.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara King Parfum',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Agrios', 'Dulce', 'Vainilla', 'Ámbar'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-king-parfum.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Rose',
    marca: 'Bharara',
    categoria: 'Árabe / Mujer',
    notas: ['Cítrico', 'Rosa Floral', 'Amaderado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-rose.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara King',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Ámbar', 'Especiado', 'Amaderado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-king.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Niche',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Aromático', 'Amaderado', 'Fresco'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-niche.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Niche Femme',
    marca: 'Bharara',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-niche-femme.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bharara Bleu',
    marca: 'Bharara',
    categoria: 'Árabe / Hombre',
    notas: ['Fresco', 'Acuático', 'Cítrico'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bharara-bleu.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Cloud',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Lactónico', 'Vainilla', 'Coco'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/cloud.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Cloud 2.0 Intense',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Amaderado', 'Ámbar', 'Vainilla'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/cloud-20-intense.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Cloud Pink',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Sabroso', 'Tropical', 'Floral'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/cloud-pink.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Thank U, Next',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Coco', 'Vainilla', 'Rosa'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/thank-u-next.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Thank U, Next 2.0',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Frutal', 'Floral'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/thank-u-next-20.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Sweet Like Candy',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Caramelo', 'Vainilla'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/sweet-like-candy.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Sweet Like Candy 2.0',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Frutal', 'Almizclado'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/sweet-like-candy-20.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'R.E.M',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Almizclado', 'Amaderado'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/rem.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Mod Blush',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/mod-blush.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Mood Vainilla',
    marca: 'Ariana Grande',
    categoria: 'Celebridad / Mujer',
    notas: ['Vainilla', 'Dulce', 'Amaderado'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/mood-vainilla.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Pink Yara',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Vainilla', 'Cítrico'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/pink-yara.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Asad',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Vainilla', 'Amaderado', 'Dulce'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/asad.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Candy',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Caramelo', 'Vainilla'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/yara-candy.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Moi',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Vainilla', 'Almizclado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/yara-moi.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Yara Tous',
    marca: 'Lattafa',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/yara-tous.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Asad Zanzibar',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Especiado', 'Amaderado', 'Oud'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/asad-zanzibar.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Khamrah',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/khamrah.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Fakhar Black',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Aromático', 'Amaderado', 'Especiado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/fakhar-black.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Fakhar White',
    marca: 'Lattafa',
    categoria: 'Árabe / Hombre',
    notas: ['Fresco', 'Aromático', 'Almizclado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/fakhar-white.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Amethyst',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Vainilla', 'Cítrico', 'Floral'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/badee-al-oud-amethyst.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Sublime',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Floral', 'Amaderado', 'Ámbar'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/badee-al-oud-sublime.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud Honor & Glory',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Especiado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/badee-al-oud-honor-glory.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Bade\'e Al Oud For Glory',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Oud', 'Amaderado', 'Ámbar'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/badee-al-oud-for-glory.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Azure Fantasy',
    marca: 'Lattafa',
    categoria: 'Árabe / Unisex',
    notas: ['Fresco', 'Acuático', 'Cítrico'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/azure-fantasy.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Private Edition',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Vainilla'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-oud-private-edition.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Gold',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-oud-gold.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Oud Rouge',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Frutal', 'Especiado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-oud-rouge.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Rouge',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Dulce', 'Especiado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-rouge.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Royal',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Oud', 'Vainilla'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-royal.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Velvet',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Suave', 'Vainilla'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-velvet.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Amber Noir',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Ámbar', 'Especiado', 'Amaderado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amber-noir.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Oud Saffron',
    marca: 'Al Haramain',
    categoria: 'Árabe / Unisex',
    notas: ['Oud', 'Azafrán', 'Especiado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/oud-saffron.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Roso',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Floral', 'Rosa', 'Dulce'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/roso.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Oomph',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Unisex',
    notas: ['Amaderado', 'Especiado', 'Ámbar'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/oomph.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Erotique',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Floral', 'Almizclado'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/erotique.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Orgasme',
    marca: 'Colección Boutique',
    categoria: 'Árabe / Mujer',
    notas: ['Dulce', 'Frutal', 'Vainilla'],
    precio: 95000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/orgasme.jpg',
    imagen_placeholder: '#3b2412',
  },
  {
    nombre: 'Club de Nuit Intense Man',
    marca: 'Armaf',
    categoria: 'Nicho / Hombre',
    notas: ['Frutal', 'Amaderado', 'Ámbar'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/club-de-nuit-intense-man.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Erba Pura',
    marca: 'Xerjoff',
    categoria: 'Nicho / Unisex',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/erba-pura.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Baccarat Rouge 540',
    marca: 'Maison Francis Kurkdjian',
    categoria: 'Nicho / Unisex',
    notas: ['Dulce', 'Ámbar', 'Floral'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/baccarat-rouge-540.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Amethyst',
    marca: 'Lattafa',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Ámbar', 'Dulce'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/amethyst.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Silver Mountain Water',
    marca: 'Creed',
    categoria: 'Nicho / Hombre',
    notas: ['Cítrico', 'Verde', 'Almizclado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/silver-mountain-water.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Aventus',
    marca: 'Creed',
    categoria: 'Nicho / Hombre',
    notas: ['Frutal', 'Ahumado', 'Amaderado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/aventus.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Millésime Impérial',
    marca: 'Creed',
    categoria: 'Nicho / Unisex',
    notas: ['Cítrico', 'Acuático', 'Almizclado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/millesime-imperial.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Arabians Tonka',
    marca: 'Colección Nicho',
    categoria: 'Nicho / Unisex',
    notas: ['Dulce', 'Haba Tonka', 'Ámbar'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/arabians-tonka.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Montale Roses',
    marca: 'Montale',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Rosa', 'Frutal'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/montale-roses.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Daydreams',
    marca: 'Colección Nicho',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/daydreams.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Layton',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Dulce', 'Aromático', 'Amaderado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/layton.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Kalan',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Dulce'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/kalan.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Percival',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Cítrico', 'Aromático', 'Amaderado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/percival.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Althaïr',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/althair.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Herod',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/herod.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Delina',
    marca: 'Parfums de Marly',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/delina.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Hombre Nomade',
    marca: 'Louis Vuitton',
    categoria: 'Nicho / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/hombre-nomade.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Attrape-Rêves',
    marca: 'Louis Vuitton',
    categoria: 'Nicho / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 320000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/attrape-reves.jpg',
    imagen_placeholder: '#20261f',
  },
  {
    nombre: 'Good Girl',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Vainilla', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/good-girl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Blush',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/good-girl-blush.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Very Good Girl',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/very-good-girl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl White Supreme',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/good-girl-white-supreme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Fantastic Pink',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/good-girl-fantastic-pink.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Good Girl Supreme',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Amaderado', 'Vainilla'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/good-girl-supreme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Carolina Herrera Tradicional',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Amaderado', 'Aldehído'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/carolina-herrera-tradicional.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Sexy',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-sexy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Rose',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-vip-rose.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Dama',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-dama.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Héroes Dama',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-heroes-dama.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-vip-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Black',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-vip-black.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Sexy Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-sexy-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Men Aqua',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Cítrico', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-men-aqua.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 Héroes Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-heroes-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men Wild Party',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-vip-men-wild-party.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: '212 VIP Men Wins',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/212-vip-men-wins.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bad Boy',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cacao'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bad-boy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CH Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/ch-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Herrera For Men',
    marca: 'Carolina Herrera',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Aromático'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/herrera-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Essential',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-essential.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste White',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-white.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Rouge',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-rouge.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Style in Play',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Fresco', 'Cítrico', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-style-in-play.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Green',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Verde', 'Cítrico', 'Herbáceo'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-green.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Bleu Powerful',
    marca: 'Lacoste',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-bleu-powerful.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Yellow',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-yellow.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Pour Elle Sparkling',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-pour-elle-sparkling.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Pour Elle Natural',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-pour-elle-natural.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lacoste Sensuelle',
    marca: 'Lacoste',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lacoste-sensuelle.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Cheap & Chic I Love Love',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/cheap-chic-i-love-love.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Moschino Funny',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Dulce', 'Floral'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/moschino-funny.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bubble Gum',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Frutal', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bubble-gum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy Boy',
    marca: 'Moschino',
    categoria: 'Diseñador / Unisex',
    notas: ['Floral', 'Especiado', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/toy-boy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy 2',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/toy-2.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Toy 2 Pearl',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/toy-2-pearl.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Pink Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/pink-fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Gold Fresh Couture',
    marca: 'Moschino',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/gold-fresh-couture.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Paris Hilton Men',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Hombre',
    notas: ['Fresco', 'Amaderado', 'Especiado'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/paris-hilton-men.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Paris Hilton',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Dulce', 'Floral', 'Fresco'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/paris-hilton.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Paris Hilton Heiress',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/paris-hilton-heiress.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'Can Can',
    marca: 'Paris Hilton',
    categoria: 'Celebridad / Mujer',
    notas: ['Floral', 'Especiado', 'Dulce'],
    precio: 120000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/can-can.jpg',
    imagen_placeholder: '#8c5b52',
  },
  {
    nombre: 'One Million',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/one-million.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Lucky',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/one-million-lucky.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Elixir',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/one-million-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/one-million-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Million Royal',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cuero'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/million-royal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'One Million Privé',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/one-million-prive.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lady Million',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lady-million.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Lady Million Lucky',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/lady-million-lucky.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Legend',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus-legend.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Onyx',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus-onyx.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cálido', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Victory',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus-victory.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Invictus Victory Elixir',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Intenso', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/invictus-victory-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Olympéa',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Mujer',
    notas: ['Vainilla', 'Amaderado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/olympea.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Vainilla', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/phantom.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom Legion',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/phantom-legion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Phantom Parfum',
    marca: 'Paco Rabanne',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Vainilla', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/phantom-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS For Her',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Mujer',
    notas: ['Frutal', 'Floral', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/black-xs-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS L\'Aphrodisiaque For Men',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/black-xs-laphrodisiaque-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Black XS L\'Excès For Him',
    marca: 'Yves Saint Laurent',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/black-xs-lexces-for-him.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Dior Homme',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Iris', 'Cuero'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/dior-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Dior Homme Intense',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Iris', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/dior-homme-intense.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Fahrenheit',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cuero', 'Floral'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/fahrenheit.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'J\'Adore',
    marca: 'Dior',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/jadore.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Miss Dior',
    marca: 'Dior',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Rosa'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/miss-dior.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Sauvage',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/sauvage.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Sauvage Elixir',
    marca: 'Dior',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/sauvage-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Classique',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/classique.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Gaultier Divine',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/gaultier-divine.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'La Belle Fleur Terrible',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/la-belle-fleur-terrible.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'La Belle Le Parfum',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Vainilla'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/la-belle-le-parfum.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Beau',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/le-beau.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Male',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Aromático', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/le-male.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Scandal Pour Homme',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/scandal-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Scandal',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/scandal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Le Male Elixir',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Intenso'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/le-male-elixir.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Ultra Male',
    marca: 'Jean Paul Gaultier',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/ultra-male.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Pour Homme',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/light-blue-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Woman',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/light-blue-woman.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'K by Dolce & Gabbana',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Aromático'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/k-by-dolce-gabbana.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Devotion',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Vainilla'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/devotion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Light Blue Summer Vibes',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Unisex',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/light-blue-summer-vibes.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'The One Women',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/the-one-women.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'The One For Men',
    marca: 'Dolce & Gabbana',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/the-one-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Deep Red',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/deep-red.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Dark Blue',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Acuático', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/hugo-dark-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-bottled.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled Night',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Especiado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-bottled-night.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Bottled Unlimited',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-bottled-unlimited.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss In Motion',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Cítrico', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-in-motion.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss Orange For Men',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-orange-for-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss The Scent Men',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cuero'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-the-scent-men.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Boss The Scent For Her',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/boss-the-scent-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Boss Cantimplora',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/hugo-boss-cantimplora.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Hugo Red',
    marca: 'Hugo Boss',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/hugo-red.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK In2U For Her',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/ck-in2u-for-her.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK In2U For Him',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/ck-in2u-for-him.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'CK One',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Unisex',
    notas: ['Cítrico', 'Fresco', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/ck-one.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Euphoria',
    marca: 'Calvin Klein',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/euphoria.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Allure Homme Sport',
    marca: 'Chanel',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/allure-homme-sport.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bleu de Chanel',
    marca: 'Chanel',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bleu-de-chanel.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/chance.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance Eau Fraîche',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/chance-eau-fraiche.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chance Eau Tendre',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Almizclado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/chance-eau-tendre.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Chanel Nº 5',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Amaderado', 'Floral', 'Cítrico'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/chanel-no-5.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Coco Mademoiselle',
    marca: 'Chanel',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Cítrico', 'Amaderado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/coco-mademoiselle.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Dulce', 'Especiado'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/eros.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Flame',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Especiado', 'Amaderado', 'Cálido'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/eros-flame.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Energy',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/eros-energy.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bright Crystal',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bright-crystal.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Bright Crystal Absolu',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/bright-crystal-absolu.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Eros Pour Femme',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Dulce', 'Floral', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/eros-pour-femme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Man Eau Fraîche',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Acuático', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/versace-man-eau-fraiche.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Yellow Diamond',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Cítrico', 'Floral', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/yellow-diamond.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Homme',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Cítrico', 'Amaderado', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/versace-pour-homme.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Homme Dylan Blue',
    marca: 'Versace',
    categoria: 'Diseñador / Hombre',
    notas: ['Amaderado', 'Aromático', 'Fresco'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/versace-pour-homme-dylan-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Femme Dylan Blue',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Frutal', 'Dulce'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/versace-pour-femme-dylan-blue.jpg',
    imagen_placeholder: '#1c1a1d',
  },
  {
    nombre: 'Versace Pour Femme Dylan Purple',
    marca: 'Versace',
    categoria: 'Diseñador / Mujer',
    notas: ['Floral', 'Dulce', 'Frutal'],
    precio: 145000, // EJEMPLO — reemplaza por el precio real
    imagen_real: 'images/versace-pour-femme-dylan-purple.jpg',
    imagen_placeholder: '#1c1a1d',
  },
];
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

  return `${perfume.nombre} es ${intros[coleccion] || "una fragancia de nuestro catálogo"}, ${generoTxt}. Notas principales: ${notas}.`;
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
    return raw ? JSON.parse(raw) : [];
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

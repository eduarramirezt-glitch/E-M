// ==========================================================
// Pirámides olfativas de arranque (notas de salida, corazón y fondo)
// de la fragancia ORIGINAL de referencia de cada perfume.
// Clave = id del perfume (nombre sin tildes, en minúsculas).
// Solo están las que se conocen con seguridad; las demás se llenan
// desde el panel /admin. Si un perfume tiene su propia pirámide
// guardada desde el panel, esa manda sobre esta.
// ==========================================================

const p = (salida, corazon, fondo) => ({ salida, corazon, fondo });

export default {
  // ---- celebridades ----
  "cloud": p(["Lavanda", "Pera", "Bergamota"], ["Crema batida", "Praliné", "Coco", "Orquídea de vainilla"], ["Almizcle", "Maderas claras"]),
  "thank u, next": p(["Pera", "Fresa silvestre"], ["Coco", "Rosa"], ["Macarrón", "Almizcle blanco"]),

  // ---- árabes ----
  "asad": p(["Pimienta negra", "Piña", "Tabaco"], ["Café", "Pachulí", "Iris"], ["Vainilla", "Ámbar", "Madera seca", "Benjuí", "Láudano"]),
  "khamrah": p(["Canela", "Nuez moscada", "Bergamota"], ["Dátiles", "Praliné", "Nardo"], ["Vainilla", "Haba tonka", "Benjuí", "Mirra", "Amberwood"]),
  "bade'e al oud for glory": p(["Azafrán", "Nuez moscada", "Lavanda"], ["Oud"], ["Pachulí", "Almizcle"]),
  "club de nuit intense man": p(["Limón", "Piña", "Bergamota", "Grosella negra", "Manzana"], ["Rosa", "Jazmín", "Abedul"], ["Almizcle", "Ámbar gris", "Pachulí", "Vainilla"]),

  // ---- nicho ----
  "erba pura": p(["Naranja siciliana", "Limón", "Bergamota"], ["Frutas"], ["Almizcle blanco", "Vainilla de Madagascar", "Ámbar"]),
  "baccarat rouge 540": p(["Azafrán", "Jazmín"], ["Amberwood", "Ámbar gris"], ["Resina de abeto", "Cedro"]),
  "silver mountain water": p(["Bergamota", "Mandarina"], ["Té verde", "Grosella negra"], ["Almizcle", "Sándalo", "Gálbano"]),
  "aventus": p(["Piña", "Bergamota", "Grosella negra", "Manzana"], ["Abedul", "Pachulí", "Jazmín", "Rosa"], ["Almizcle", "Musgo de roble", "Ámbar gris", "Vainilla"]),
  "millesime imperial": p(["Sal marina", "Bergamota", "Limón", "Mandarina"], ["Iris", "Notas frutales"], ["Almizcle", "Maderas"]),
  "montale roses": p(["Rosa"], ["Jazmín"], ["Almizcle", "Ámbar"]),
  "layton": p(["Manzana", "Lavanda", "Bergamota", "Mandarina"], ["Geranio", "Violeta", "Jazmín"], ["Vainilla", "Cardamomo", "Sándalo", "Pimienta", "Pachulí"]),
  "delina": p(["Lichi", "Ruibarbo", "Bergamota", "Nuez moscada"], ["Rosa turca", "Peonía", "Almizcle", "Vainilla"], ["Cashmeran", "Incienso", "Vetiver"]),
  "hombre nomade": p(["Frambuesa", "Abedul"], ["Rosa", "Geranio"], ["Oud", "Benjuí", "Incienso"]),

  // ---- Carolina Herrera ----
  "good girl": p(["Almendra", "Café", "Bergamota", "Limón"], ["Nardo", "Jazmín sambac", "Azahar", "Rosa búlgara"], ["Haba tonka", "Cacao", "Vainilla", "Praliné", "Sándalo"]),
  "very good girl": p(["Lichi", "Grosella roja", "Rosa"], ["Rosa", "Vainilla"], ["Vetiver", "Vainilla"]),
  "212 sexy": p(["Mandarina", "Pimienta rosa"], ["Gardenia", "Rosa", "Peonía"], ["Vainilla", "Caramelo", "Almizcle"]),
  "212 vip rose": p(["Champán rosado", "Pimienta rosa"], ["Durazno"], ["Maderas blancas", "Almizcle"]),
  "212 vip men": p(["Limón", "Maracuyá", "Jengibre"], ["Menta", "Ginebra", "Vodka"], ["Ámbar", "Cuero", "Maderas"]),
  "212 vip black": p(["Absenta", "Anís", "Hinojo"], ["Lavanda"], ["Vainilla negra", "Almizcle"]),
  "bad boy": p(["Pimienta blanca", "Bergamota", "Pimienta negra"], ["Salvia", "Cedro"], ["Haba tonka", "Cacao", "Ámbar"]),

  // ---- Paco Rabanne ----
  "one million": p(["Toronja", "Menta", "Mandarina sanguina"], ["Rosa", "Canela", "Especias"], ["Cuero", "Ámbar", "Pachulí", "Maderas"]),
  "one million lucky": p(["Notas ozónicas", "Toronja", "Bergamota"], ["Avellana", "Miel", "Ciruela"], ["Pachulí", "Musgo de roble", "Cedro", "Ámbar"]),
  "lady million": p(["Neroli", "Frambuesa", "Limón"], ["Jazmín", "Azahar", "Gardenia"], ["Miel", "Pachulí", "Ámbar"]),
  "invictus": p(["Toronja", "Notas marinas", "Mandarina"], ["Laurel", "Jazmín"], ["Ámbar gris", "Guayaco", "Musgo de roble", "Pachulí"]),
  "olympea": p(["Mandarina verde", "Jazmín de agua", "Flor de jengibre"], ["Vainilla salada"], ["Madera de cachemira", "Ámbar gris", "Sándalo"]),

  // ---- Dior ----
  "dior homme intense": p(["Lavanda"], ["Iris", "Ambreta", "Pera"], ["Cedro de Virginia", "Vetiver"]),
  "fahrenheit": p(["Nuez moscada", "Lavanda", "Mandarina", "Bergamota", "Limón"], ["Hoja de violeta", "Cedro", "Sándalo", "Jazmín"], ["Cuero", "Vetiver", "Almizcle", "Ámbar"]),
  "j'adore": p(["Pera", "Melón", "Magnolia", "Durazno", "Mandarina", "Bergamota"], ["Jazmín", "Lirio de los valles", "Nardo", "Fresia", "Rosa", "Orquídea"], ["Almizcle", "Vainilla", "Mora", "Cedro"]),
  "sauvage": p(["Bergamota de Calabria", "Pimienta"], ["Pimienta de Sichuan", "Lavanda", "Pimienta rosa", "Vetiver", "Pachulí", "Geranio"], ["Ambroxan", "Cedro", "Láudano"]),
  "sauvage elixir": p(["Nuez moscada", "Canela", "Cardamomo", "Toronja"], ["Lavanda"], ["Regaliz", "Sándalo", "Ámbar", "Pachulí", "Vetiver"]),

  // ---- Jean Paul Gaultier ----
  "classique": p(["Rosa", "Pera", "Mandarina", "Anís estrellado"], ["Iris", "Jengibre", "Orquídea", "Azahar"], ["Vainilla", "Ámbar", "Sándalo", "Almizcle"]),
  "scandal": p(["Naranja sanguina", "Mandarina"], ["Miel", "Gardenia", "Jazmín", "Azahar", "Durazno"], ["Cera de abeja", "Caramelo", "Pachulí", "Regaliz"]),
  "scandal pour homme": p(["Mandarina", "Salvia"], ["Caramelo", "Haba tonka"], ["Vetiver"]),

  // ---- Dolce & Gabbana ----
  "light blue woman": p(["Limón siciliano", "Manzana", "Cedro", "Campanilla"], ["Bambú", "Jazmín", "Rosa blanca"], ["Cedro", "Almizcle", "Ámbar"]),
  "light blue pour homme": p(["Mandarina", "Toronja", "Bergamota", "Enebro"], ["Romero", "Pimienta de Sichuan", "Palo de rosa"], ["Almizcle", "Incienso", "Musgo de roble"]),
  "k by dolce & gabbana": p(["Naranja sanguina", "Enebro", "Limón siciliano"], ["Salvia", "Pimienta", "Geranio", "Lavanda"], ["Vetiver", "Pachulí", "Cedro"]),
  "the one women": p(["Durazno", "Lichi", "Mandarina", "Bergamota"], ["Lirio", "Ciruela", "Jazmín", "Lirio de los valles"], ["Vainilla", "Ámbar", "Almizcle", "Vetiver"]),
  "the one for men": p(["Toronja", "Cilantro", "Albahaca"], ["Cardamomo", "Jengibre", "Azahar"], ["Tabaco", "Ámbar", "Cedro"]),

  // ---- Hugo Boss ----
  "boss bottled": p(["Manzana", "Ciruela", "Bergamota", "Limón"], ["Canela", "Caoba", "Clavel"], ["Vainilla", "Sándalo", "Cedro", "Vetiver"]),
  "boss the scent men": p(["Jengibre", "Mandarina", "Bergamota"], ["Fruta maninka", "Lavanda"], ["Cuero", "Maderas"]),
  "boss the scent for her": p(["Fresia", "Durazno"], ["Osmanto"], ["Cacao tostado"]),
  "hugo boss cantimplora": p(["Manzana verde", "Menta", "Lavanda", "Toronja"], ["Salvia", "Geranio", "Clavel", "Jazmín"], ["Abeto", "Cedro", "Pachulí"]),

  // ---- Calvin Klein ----
  "ck one": p(["Limón", "Bergamota", "Piña", "Mandarina", "Cardamomo", "Papaya"], ["Lirio de los valles", "Jazmín", "Violeta", "Nuez moscada", "Rosa"], ["Almizcle", "Cedro", "Sándalo", "Musgo de roble", "Ámbar"]),
  "euphoria": p(["Granada", "Caqui", "Notas verdes"], ["Loto", "Orquídea"], ["Caoba", "Ámbar", "Violeta", "Almizcle"]),

  // ---- Chanel ----
  "allure homme sport": p(["Naranja", "Mandarina sanguina", "Notas marinas", "Aldehídos"], ["Pimienta", "Neroli", "Cedro"], ["Haba tonka", "Vainilla", "Almizcle", "Ámbar", "Vetiver"]),
  "bleu de chanel": p(["Toronja", "Limón", "Menta", "Pimienta rosa"], ["Jengibre", "Nuez moscada", "Jazmín"], ["Incienso", "Vetiver", "Cedro", "Sándalo", "Pachulí"]),
  "chance": p(["Pimienta rosa", "Limón", "Piña"], ["Jazmín", "Jacinto"], ["Pachulí", "Almizcle blanco", "Vainilla", "Vetiver", "Iris"]),
  "chance eau fraiche": p(["Limón", "Cedro"], ["Jacinto de agua", "Jazmín", "Pimienta rosa"], ["Teca", "Ámbar", "Pachulí", "Almizcle blanco", "Vetiver"]),
  "chance eau tendre": p(["Toronja", "Membrillo"], ["Jacinto", "Jazmín"], ["Almizcle blanco", "Iris", "Cedro", "Ámbar"]),
  "chanel nº 5": p(["Aldehídos", "Ylang-ylang", "Neroli", "Bergamota", "Limón"], ["Iris", "Jazmín", "Rosa", "Lirio de los valles"], ["Ámbar", "Sándalo", "Almizcle", "Vainilla", "Vetiver"]),
  "coco mademoiselle": p(["Naranja", "Mandarina", "Bergamota", "Azahar"], ["Rosa turca", "Jazmín", "Mimosa", "Ylang-ylang"], ["Pachulí", "Almizcle blanco", "Vainilla", "Vetiver", "Haba tonka"]),

  // ---- Versace ----
  "eros": p(["Menta", "Manzana verde", "Limón"], ["Haba tonka", "Ambroxan", "Geranio"], ["Vainilla", "Vetiver", "Musgo de roble", "Cedro"]),
  "eros flame": p(["Limón", "Chinotto", "Pimienta negra", "Mandarina", "Romero"], ["Pimienta", "Geranio", "Rosa"], ["Haba tonka", "Vainilla", "Pachulí", "Sándalo", "Cedro"]),
  "bright crystal": p(["Yuzu", "Granada", "Notas heladas"], ["Peonía", "Magnolia", "Loto"], ["Almizcle", "Caoba", "Ámbar"]),
  "eros pour femme": p(["Limón", "Granada", "Bergamota"], ["Flor de limón", "Jazmín", "Peonía"], ["Almizcle", "Ambroxan", "Sándalo", "Maderas"]),
  "yellow diamond": p(["Limón", "Bergamota", "Neroli", "Sorbete de pera"], ["Mimosa", "Azahar", "Fresia", "Nenúfar"], ["Ámbar", "Guayaco", "Almizcle"]),
  "versace pour homme": p(["Limón", "Neroli", "Bergamota", "Rosa de mayo"], ["Jacinto", "Salvia", "Cedro", "Geranio"], ["Haba tonka", "Almizcle", "Ámbar"]),
  "versace pour homme dylan blue": p(["Bergamota", "Toronja", "Hoja de higuera", "Notas acuáticas"], ["Hoja de violeta", "Papiro", "Pachulí", "Pimienta negra", "Ambroxan"], ["Notas minerales", "Haba tonka", "Azafrán", "Incienso", "Almizcle"]),
  "versace pour femme dylan blue": p(["Grosella negra", "Manzana", "Trébol"], ["Durazno", "Rosa", "Jazmín"], ["Almizcle", "Pachulí", "Estoraque", "Maderas"]),
};

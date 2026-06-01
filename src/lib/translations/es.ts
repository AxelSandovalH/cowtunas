import type { Translations } from "./types";

const es: Translations = {
  nav: {
    home: "Inicio",
    boat: "El Barco",
    captain: "Capitán",
    gallery: "Galería",
    reviews: "Reseñas",
    faq: "Preguntas",
    contact: "Contacto",
    book: "Reservar",
  },
  hero: {
    tagline: "Pesca deportiva de clase mundial en Los Cabos",
    headline: "Atrapa los Túnidos más Grandes\nen Cabo San Lucas",
    subheadline:
      "Zarpa desde la Marina Puerto Los Cabos a bordo del Kailani de 28 pies, al mando del Capitán Nestor, campeón de torneos con 35 años en estas aguas.",
    cta_primary: "Reserva tu Charter",
    cta_secondary: "Ver nuestras capturas",
    badge: "Salida desde Marina Puerto Los Cabos",
  },
  whyus: {
    title: "¿Por qué pescar con CowTunas?",
    subtitle:
      "Nos esforzamos al máximo para ponerte sobre el pescado — en cada salida.",
    items: [
      {
        title: "Capitán Campeón de Torneos",
        body: "El Capitán Nestor tiene 35 años navegando estas aguas y ganó el Torneo Brisbe Tuna Off Shore 2022. Su conocimiento local no tiene rival.",
      },
      {
        title: "Experiencia Uno a Uno",
        body: "Lo hacemos personal. Tienes toda la atención de tu capitán y tripulación desde el amanecer hasta que regresas al muelle.",
      },
      {
        title: "Puntos Secretos Locales",
        body: "Nuestro buscador de peces Lowrance tiene coordenadas de lugares que solo conocen los locales: Gordo Banks, Wahoo Banks, Cardon, Vinorama y más.",
      },
      {
        title: "Servicio Completo",
        body: "Nos encargamos de envolver, empacar al vacío y congelar tu captura para que la lleves a casa. También ofrecemos servicio de ahumado.",
      },
    ],
  },
  captain: {
    title: "Conoce al Capitán Nestor",
    subtitle: "Nacido y criado en La Playita — la pesca corre por sus venas.",
    body: "Con 35 años de experiencia navegando las aguas de San José del Cabo, el Capitán Nestor te llevará a los mejores sitios de pesca que Los Cabos tiene para ofrecer. Habla inglés y español con fluidez, y te enseñará todo lo que sabe para brindarte la experiencia auténtica de un experto local.",
    stats: [
      { value: "35+", label: "Años de Experiencia" },
      { value: "+300 lbs", label: "Atún más grande capturado" },
      { value: "2022", label: "Ganador Torneo Brisbe Tuna" },
    ],
  },
  boat: {
    title: "El Kailani",
    subtitle: "Mako 28 pies — Construido para estas aguas.",
    specs: [
      { label: "Eslora", value: "28 pies Mako" },
      { label: "Motores", value: "2 × Yamaha 200hp" },
      { label: "Alcance", value: "100 millas" },
      { label: "Capacidad", value: "2–3 pescadores" },
      { label: "Sonar", value: "Lowrance con puntos secretos" },
      { label: "Seguridad", value: "Radio VHF + salvavidas" },
      { label: "Confort", value: "Toldo T-Top + Baño portátil" },
      { label: "Vivero", value: "4 tubos de atún + cebo para todo el día" },
    ],
  },
  reviews: {
    title: "Nuestros Clientes No Paran de Presumir",
    subtitle: "No lo decimos nosotros — lo dicen ellos.",
    items: [
      {
        name: "Huésped del Charter de Bobby",
        stars: 5,
        text: "Recientemente tuve el placer de ir a un charter con Cowtunas en San José del Cabo — fue una experiencia increíble, ¡y el precio fue más bajo que cualquier otro charter en Cabo que hemos contratado! Bobby fue un anfitrión excepcional y el Capitán Nestor nos puso en el lugar correcto en el momento exacto.",
      },
      {
        name: "Pescador de Cabo",
        stars: 5,
        text: "Si quieres el viaje de pesca de tu vida, cowtunas.com es tu destino. Lo mejor de Baja — capitanes conocedores, capaces y amigables que te pondrán sobre Mahi-Mahi, Atún y Wahoo. Estuve sacando pez tras pez tras pez. Verdaderamente insuperable.",
      },
      {
        name: "Viaje Padre e Hijo",
        stars: 5,
        text: "Fui con mi hijo y fue una experiencia que atesoraremos para siempre. La alegría en su cara al sacar su primera captura quedará grabada en mi memoria. Creamos recuerdos de por vida — todo gracias a Cowtunas.",
      },
    ],
  },
  faq: {
    title: "Preguntas Frecuentes",
    items: [
      {
        q: "¿A qué hora sale el charter?",
        a: "Salimos al primer rayar del alba, típicamente a las 6:30 am, y regresamos alrededor de las 2:00 pm o cuando hayas obtenido tu captura.",
      },
      {
        q: "¿Cuántas personas pueden pescar?",
        a: "El Mako de 28 pies tiene capacidad para 2–3 pescadores. La regulación mexicana exige que todos los pasajeros de 12 años en adelante lleven licencia de pesca vigente.",
      },
      {
        q: "¿Está incluido el equipo?",
        a: "Sí — proveemos carretes Shimano de nivel profesional de torneo, cañas y todo el aparejo. También puedes traer tu propio equipo.",
      },
      {
        q: "¿Está incluido el cebo?",
        a: "El cebo no está incluido en el precio. Cuesta $300 pesos (~$20 USD) según el tipo. Te asesoraremos sobre el mejor cebo la mañana de tu salida.",
      },
      {
        q: "¿Cuál es la política de cancelación?",
        a: "Cancelaciones con 15+ días de anticipación reciben reembolso completo menos $30 de cargo administrativo. Menos de 15 días pierde el depósito. Por mal clima = reembolso completo.",
      },
      {
        q: "¿Cuál es la mejor temporada para pescar?",
        a: "La temporada alta es de octubre a febrero. Los atunes amarillos van de 50 a más de 300 lbs en otoño e invierno. Dicho esto, pescamos todo el año — ven cuando puedas.",
      },
    ],
  },
  contact: {
    title: "Contáctanos",
    subtitle: "¿Listo para reservar o tienes preguntas? Nos encantaría escucharte.",
    phone: "949-294-6790",
    email_reservations: "reservations@cowtunas.com",
    email_info: "info@cowtunas.com",
    location: "Marina Puerto Los Cabos, La Playita, San José del Cabo, México",
    form: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      subject: "Motivo del mensaje",
      message: "Mensaje",
      submit: "Enviar mensaje",
    },
  },
  footer: {
    tagline: "Pesca deportiva de clase mundial desde la Marina Puerto Los Cabos.",
    links_title: "Páginas",
    contact_title: "Contacto",
    rights: "Todos los derechos reservados.",
    sponsored: "Con el orgullo de nuestros patrocinadores",
  },
};

export default es;

/* =====================================================================
   FIERMONTE BOXING & FITNESS — i18n.js
   Tutti i testi del sito in Italiano (it) e Inglese (en).
   Per modificare una frase: cambiala qui, in entrambe le lingue.
   Le chiavi con <br> vanno a capo; &amp; = "&".
   ===================================================================== */

window.TRANSLATIONS = {

  it: {
    /* --- Meta pagina --- */
    'page.title': 'Fiermonte Boxing & Fitness — Boutique Boxing ai Parioli, Roma',

    /* --- Navigazione --- */
    'nav.about': 'Chi siamo',
    'nav.disciplines': 'Discipline',
    'nav.plus': 'Il nostro plus',
    'nav.trial': 'Prova gratuita',

    /* --- 1. Hero --- */
    'hero.overline': 'Dal 1996 · Roma Parioli',
    'hero.title': 'Allenati<br>da campione',
    'hero.sub': "Fiermonte Boxing &amp; Fitness è la boutique fitness e benessere ai Parioli, nata da un secolo di tradizione pugilistica di famiglia. Ridefiniamo cosa può essere una palestra di boxe: dal pugilato al cardio, dalle lezioni di gruppo al conditioning, con metodologie all'avanguardia, spazi d'eccellenza e istruttori esperti in ogni disciplina.",
    'hero.cta': 'Prenota la tua prova gratuita',

    /* --- 2. Chi siamo --- */
    'about.overline': 'Chi siamo',
    'about.title': 'Una storia che<br>parla per noi',
    'about.lead': 'Fiermonte nasce nel 1996 ai Parioli, ma le sue radici affondano in una tradizione di famiglia nel pugilato che dura da oltre un secolo.',
    'about.body': "Trent'anni di palestra, cento di boxe: qui il pugilato non si insegna, si tramanda. Accessibile a chiunque, a qualunque età. Non serve esperienza. Serve solo voglia di iniziare.",

    /* --- 3. Discipline --- */
    'disc.overline': 'Discipline',
    'disc.title': 'Cosa alleni da noi',

    /* --- 4. Il nostro plus --- */
    'plus.overline': 'Il nostro plus',
    'plus.title': 'Con te, sempre',
    'plus.lead': 'I nostri istruttori sono presenti dalle 7:00 alle 22:00, ogni giorno. Non ti alleni da solo: ti seguiamo noi.',
    'plus.hoursLabel': 'ogni giorno · sempre seguito',

    /* --- 5. Contatti / Form --- */
    'contact.overline': 'Prova gratuita',
    'contact.title': 'La prima lezione è nostra',
    'contact.lead': 'Lasciaci un contatto. Ti richiamiamo entro 24 ore.',
    'contact.name': 'Nome',
    'contact.phone': 'Telefono',
    'contact.email': 'Email',
    'contact.submit': 'Prenota ora',
    'form.error': 'Controlla i campi: nome, telefono ed email valida sono richiesti.',
    'form.success': 'Grazie {name}! Richiesta registrata. Ti richiamiamo entro 24 ore.',

    /* --- Footer --- */
    'footer.line1': 'Fiermonte Boxing &amp; Fitness · Roma Parioli',
    'footer.line2': 'Aperti tutti i giorni · 7:00 – 22:00',
    'footer.copy': '© {year} Fiermonte Boxing &amp; Fitness. Tutti i diritti riservati.'
  },

  en: {
    /* --- Page meta --- */
    'page.title': 'Fiermonte Boxing & Fitness — Boutique Boxing in Parioli, Rome',

    /* --- Navigation --- */
    'nav.about': 'About',
    'nav.disciplines': 'Disciplines',
    'nav.plus': 'Our edge',
    'nav.trial': 'Free trial',

    /* --- 1. Hero --- */
    'hero.overline': 'Since 1996 · Rome Parioli',
    'hero.title': 'Train like<br>a champion',
    'hero.sub': "Fiermonte Boxing &amp; Fitness is Rome Parioli's boutique for fitness and wellbeing, built on a century of family boxing tradition. We're redefining what a boxing gym can be — from boxing to cardio, from group classes to conditioning — with progressive training methods, elite-standard spaces and expert trainers across every discipline.",
    'hero.cta': 'Book your free trial',

    /* --- 2. About --- */
    'about.overline': 'About us',
    'about.title': 'A story that<br>speaks for itself',
    'about.lead': 'Fiermonte was born in 1996 in Parioli, but its roots run deep into a family boxing tradition spanning more than a century.',
    'about.body': "Thirty years of training, a hundred of boxing: here the sport isn't taught, it's handed down. Open to everyone, at any age. No experience needed. Just the will to begin.",

    /* --- 3. Disciplines --- */
    'disc.overline': 'Disciplines',
    'disc.title': 'What you train here',

    /* --- 4. Our edge --- */
    'plus.overline': 'Our edge',
    'plus.title': 'With you, always',
    'plus.lead': "Our trainers are here from 7:00 to 22:00, every day. You never train alone: we're right beside you.",
    'plus.hoursLabel': 'every day · always guided',

    /* --- 5. Contact / Form --- */
    'contact.overline': 'Free trial',
    'contact.title': 'The first lesson is on us',
    'contact.lead': "Leave us your details. We'll call you back within 24 hours.",
    'contact.name': 'Name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.submit': 'Book now',
    'form.error': 'Please check the fields: name, phone and a valid email are required.',
    'form.success': "Thank you {name}! Your request has been received. We'll call you within 24 hours.",

    /* --- Footer --- */
    'footer.line1': 'Fiermonte Boxing &amp; Fitness · Rome Parioli',
    'footer.line2': 'Open every day · 7:00 – 22:00',
    'footer.copy': '© {year} Fiermonte Boxing &amp; Fitness. All rights reserved.'
  }
};

/* =====================================================================
   DISCIPLINE — sorgente dati modulare e bilingue.
   Per aggiungere una disciplina: aggiungi un oggetto con it{} e en{}.
   ===================================================================== */
window.DISCIPLINE = [
  {
    it: { nome: 'Boxing',                desc: 'Tecnica, potenza, disciplina. Dal primo guantone alla forma agonistica.' },
    en: { nome: 'Boxing',                desc: 'Technique, power, discipline. From your first glove to competitive shape.' }
  },
  {
    it: { nome: 'Sparring',              desc: 'Il pugilato vero, in sicurezza, guidati dai nostri istruttori.' },
    en: { nome: 'Sparring',              desc: 'Real boxing, safely, guided by our trainers.' }
  },
  {
    it: { nome: 'Aeroboxing',            desc: 'Boxe in musica, in gruppo. Cardio ad alta intensità, zero noia.' },
    en: { nome: 'Aeroboxing',            desc: 'Boxing to music, in a group. High-intensity cardio, zero boredom.' }
  },
  {
    it: { nome: 'Cardio & Conditioning', desc: 'Forza e resistenza, costruite lezione dopo lezione.' },
    en: { nome: 'Cardio & Conditioning', desc: 'Strength and endurance, built session after session.' }
  },
  {
    it: { nome: 'Lezioni di gruppo',     desc: "L'energia della classe, il ritmo di un allenamento vero." },
    en: { nome: 'Group classes',         desc: 'The energy of the class, the rhythm of a real workout.' }
  }
];

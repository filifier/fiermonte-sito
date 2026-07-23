/* =====================================================================
   FIERMONTE BOXING & FITNESS — main.js
   Dipende da js/i18n.js (window.TRANSLATIONS, window.DISCIPLINE)
   ===================================================================== */
(function () {
  'use strict';

  var SUPPORTED = ['it', 'en'];
  var DEFAULT_LANG = 'it';
  var currentLang = DEFAULT_LANG;

  /* Foto di sfondo dell'hero (carosello). Aggiungi/togli file qui:
     vanno in media/foto/ con questi nomi. Ordine = ordine di apparizione. */
  var HERO_SLIDES = [
    'media/foto/hero-1.jpg',
    'media/foto/hero-2.jpg',
    'media/foto/hero-3.jpg',
    'media/foto/hero-5.jpg'
  ];
  var HERO_INTERVAL = 6000; // ms per slide

  /* -------------------------------------------------------------------
     Utility: lingua salvata / preferita dal browser
     ------------------------------------------------------------------- */
  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem('fiermonte_lang'); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
  }

  function t(key) {
    var dict = window.TRANSLATIONS[currentLang] || {};
    return dict[key] != null ? dict[key] : key;
  }

  /* -------------------------------------------------------------------
     TEMA chiaro / scuro
     ------------------------------------------------------------------- */
  function detectTheme() {
    var saved = null;
    try { saved = localStorage.getItem('fiermonte_theme'); } catch (e) {}
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // default coerente col brand
  }

  function setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('fiermonte_theme', theme); } catch (e) {}
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'light'));
      btn.setAttribute('aria-label', theme === 'light'
        ? 'Passa al tema scuro' : 'Passa al tema chiaro');
    }
  }

  function initTheme() {
    setTheme(detectTheme());
    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', function () {
      var now = document.documentElement.getAttribute('data-theme');
      setTheme(now === 'light' ? 'dark' : 'light');
    });
  }

  /* -------------------------------------------------------------------
     1. DISCIPLINE — schede generate dai dati bilingui
     ------------------------------------------------------------------- */
  function renderDiscipline() {
    var grid = document.getElementById('disciplinesGrid');
    if (!grid || !window.DISCIPLINE) return;
    var html = '';
    window.DISCIPLINE.forEach(function (d, i) {
      var data = d[currentLang] || d[DEFAULT_LANG];
      var n = ('0' + (i + 1)).slice(-2);
      html +=
        '<article class="discipline-card reveal in">' +
          '<span class="discipline-index">' + n + '</span>' +
          '<h3 class="discipline-name">' + data.nome + '</h3>' +
          '<p class="discipline-desc">' + data.desc + '</p>' +
        '</article>';
    });
    grid.innerHTML = html;
  }

  /* Pagina "Lista" discipline: due famiglie (Boxing / Fitness) apribili.
     openCat sopravvive ai re-render, cosi' il cambio lingua non richiude il pannello. */
  var DISC_CATS = ['boxing', 'fitness'];
  var openCat = null;

  function discRowHtml(d, i) {
    var data = d[currentLang] || d[DEFAULT_LANG];
    var n = ('0' + (i + 1)).slice(-2);
    var media = d.img
      ? '<img src="' + d.img + '" alt="' + data.nome + '" loading="lazy" onerror="this.closest(\'.disc-row-media\').classList.add(\'no-image\')" />'
      : '';
    var mediaCls = d.img ? '' : ' no-image';
    return '<article class="disc-row reveal in">' +
        '<div class="disc-row-media' + mediaCls + '" data-label="' + data.nome + '">' + media + '</div>' +
        '<div class="disc-row-text">' +
          '<span class="disc-row-num">' + n + '</span>' +
          '<h2 class="disc-row-name">' + data.nome + '</h2>' +
          '<p class="disc-row-desc">' + data.desc + '</p>' +
        '</div>' +
      '</article>';
  }

  function renderDisciplineList() {
    var box = document.getElementById('disciplineList');
    if (!box || !window.DISCIPLINE) return;

    var heads = '';
    var panels = '';

    DISC_CATS.forEach(function (cat) {
      var items = window.DISCIPLINE.filter(function (d) { return d.cat === cat; });
      var count = items.length === 1
        ? t('disc.cat.count.one')
        : t('disc.cat.count.many').replace('{n}', items.length);
      var open = openCat === cat;

      heads +=
        '<button type="button" class="disc-cat-head' + (open ? ' is-open' : '') + '" data-cat="' + cat + '"' +
          ' aria-expanded="' + open + '" aria-controls="discPanel-' + cat + '">' +
          '<span class="disc-cat-label">' +
            '<span class="disc-cat-name">' + t('disc.cat.' + cat) + '</span>' +
            '<span class="disc-cat-sub">' + t('disc.cat.' + cat + '.sub') + '</span>' +
          '</span>' +
          '<span class="disc-cat-foot">' +
            '<span class="disc-cat-count">' + count + '</span>' +
            '<span class="disc-cat-icon" aria-hidden="true"></span>' +
          '</span>' +
        '</button>';

      panels +=
        '<div class="disc-cat-panel" id="discPanel-' + cat + '" data-cat="' + cat + '"' + (open ? '' : ' hidden') + '>' +
          '<div class="disc-list">' + items.map(discRowHtml).join('') + '</div>' +
        '</div>';
    });

    box.innerHTML = heads + panels;
  }

  /* Apre/chiude senza rigenerare l'HTML (le foto gia' caricate restano). */
  function syncDisciplineCats() {
    var box = document.getElementById('disciplineList');
    if (!box) return;
    box.querySelectorAll('.disc-cat-head').forEach(function (h) {
      var on = h.getAttribute('data-cat') === openCat;
      h.classList.toggle('is-open', on);
      h.setAttribute('aria-expanded', String(on));
    });
    box.querySelectorAll('.disc-cat-panel').forEach(function (p) {
      p.hidden = p.getAttribute('data-cat') !== openCat;
    });
  }

  function initDisciplineCats() {
    var box = document.getElementById('disciplineList');
    if (!box) return;
    // delega: il listener sopravvive ai re-render di renderDisciplineList()
    box.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.disc-cat-head') : null;
      if (!btn || !box.contains(btn)) return;
      var cat = btn.getAttribute('data-cat');
      openCat = (openCat === cat) ? null : cat;  // ri-clic chiude
      syncDisciplineCats();
    });
  }

  /* Pagina "Storia del brand": timeline verticale scorrevole (dati window.STORIA).
     I box senza foto restano vuoti, pronti per una foto futura. */
  function renderStoriaTimeline() {
    var box = document.getElementById('storiaTimeline');
    if (!box || !window.STORIA) return;
    var html = '';
    window.STORIA.forEach(function (s, i) {
      var data = s[currentLang] || s[DEFAULT_LANG];
      var side = (i % 2 === 0) ? 'left' : 'right';
      var media = s.img
        ? '<img src="' + s.img + '" alt="' + data.t + '" loading="lazy" onerror="this.closest(\'.tl-media\').classList.add(\'no-image\')" />'
        : '';
      var mediaCls = s.img ? '' : ' no-image';
      html +=
        '<article class="tl-item reveal" data-side="' + side + '">' +
          '<div class="tl-dot" aria-hidden="true"></div>' +
          '<div class="tl-card">' +
            '<span class="tl-year">' + s.year + '</span>' +
            '<div class="tl-media' + mediaCls + '" data-label="' + s.year + '">' + media + '</div>' +
            '<h3 class="tl-title">' + data.t + '</h3>' +
            '<p class="tl-text">' + data.d + '</p>' +
          '</div>' +
        '</article>';
    });
    box.innerHTML = html;
    if (revealIO) observeReveals(box);  // re-render (es. cambio lingua): ri-osserva
  }

  /* -------------------------------------------------------------------
     2. i18n — applica la lingua a tutta la pagina
     ------------------------------------------------------------------- */
  function applyTranslations() {
    // elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    // titolo pagina + attributo lang
    document.documentElement.setAttribute('lang', currentLang);
    document.title = t('page.title');
    // footer copyright (con anno dinamico)
    var copy = document.getElementById('footerCopy');
    if (copy) copy.innerHTML = t('footer.copy').replace('{year}', new Date().getFullYear());
    // discipline (dipendono dalla lingua)
    renderDiscipline();
    renderDisciplineList();
    renderStoriaTimeline();
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === currentLang;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    currentLang = lang;
    try { localStorage.setItem('fiermonte_lang', lang); } catch (e) {}
    applyTranslations();
    updateLangButtons();
  }

  function initLang() {
    currentLang = detectLang();
    setLang(currentLang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  }

  /* -------------------------------------------------------------------
     2b. HERO — carosello foto di sfondo (crossfade + zoom lento)
     ------------------------------------------------------------------- */
  function initHeroSlideshow() {
    var box = document.getElementById('heroSlideshow');
    if (!box) return;

    HERO_SLIDES.forEach(function (src, i) {
      var slide = document.createElement('div');
      slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
      slide.setAttribute('data-label', 'Foto hero ' + (i + 1));
      var img = document.createElement('img');
      img.alt = '';
      img.decoding = 'async';
      // la prima slide subito, le altre a richiesta (pagina piu' leggera all'avvio)
      if (i > 0) img.loading = 'lazy';
      // se la foto non esiste ancora, mostra il placeholder
      img.addEventListener('error', function () { slide.classList.add('no-image'); });
      img.src = src;
      slide.appendChild(img);
      box.appendChild(slide);
    });

    var slides = box.querySelectorAll('.hero-slide');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (slides.length < 2 || reduce) return; // una sola slide o moto ridotto: statico

    var idx = 0;
    setInterval(function () {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, HERO_INTERVAL);
  }

  /* -------------------------------------------------------------------
     3. HEADER — sfondo pieno dopo lo scroll
     ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    // Nelle pagine interne l'header e' sempre solido (non c'e' hero scuro dietro)
    if (document.body.getAttribute('data-solid-header') === 'true') {
      header.classList.add('scrolled');
      return;
    }
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     Menu a tendina "Chi siamo" (desktop hover, mobile tap)
     ------------------------------------------------------------------- */
  function initDropdown() {
    var items = document.querySelectorAll('.nav-item.has-dropdown');
    items.forEach(function (item) {
      var toggle = item.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      // Solo i toggle <button> aprono la tendina al click.
      // Se il toggle e' un link (<a>), lascialo navigare normalmente.
      if (toggle.tagName !== 'BUTTON') return;
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        var open = item.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    });
    // chiudi le tendine cliccando fuori
    document.addEventListener('click', function (e) {
      items.forEach(function (item) {
        if (!item.contains(e.target)) {
          item.classList.remove('open');
          var tg = item.querySelector('.nav-dropdown-toggle');
          if (tg) tg.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* -------------------------------------------------------------------
     4. MENU MOBILE
     ------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('mainNav');
    var header = document.getElementById('siteHeader');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      if (header) header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* -------------------------------------------------------------------
     5. REVEAL allo scroll (IntersectionObserver)
     ------------------------------------------------------------------- */
  var revealIO = null;

  /* Osserva (o rivela subito) tutti i .reveal non ancora visibili.
     Richiamabile dopo un re-render (es. timeline al cambio lingua). */
  function observeReveals(scope) {
    var items = (scope || document).querySelectorAll('.reveal:not(.in)');
    if (!revealIO) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    items.forEach(function (el) { revealIO.observe(el); });
  }

  function initReveal() {
    if ('IntersectionObserver' in window) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    observeReveals(document);
  }

  /* -------------------------------------------------------------------
     6. FORM CONTATTI — NON invia ancora nulla.
        Valida i campi e mostra un messaggio (nella lingua attiva).
     ------------------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById('contactForm');
    var feedback = document.getElementById('formFeedback');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.className = 'form-feedback';

      var nome = form.nome.value.trim();
      var tel = form.telefono.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !tel || !emailOk) {
        feedback.textContent = t('form.error');
        feedback.classList.add('err');
        return;
      }

      // --- Qui in futuro andra' l'invio reale (email / API). ---
      feedback.textContent = t('form.success').replace('{name}', nome);
      feedback.classList.add('ok');
      form.reset();
    });
  }

  /* ---------- avvio ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();    // applica tema chiaro/scuro
    initLang();     // applica lingua + genera discipline
    initDisciplineCats();
    initHeroSlideshow();
    initHeader();
    initNav();
    initDropdown();
    initReveal();
    initForm();
  });
})();

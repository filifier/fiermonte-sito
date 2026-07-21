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
    'media/foto/hero-3.jpg'
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
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
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
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
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
    initHeroSlideshow();
    initHeader();
    initNav();
    initReveal();
    initForm();
  });
})();

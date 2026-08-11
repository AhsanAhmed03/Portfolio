/* Ahsan Ahmed — portfolio interactions. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme ---------- */
  var themeBtn = document.getElementById('theme');

  function store(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* private mode — ignore */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  var saved = read('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  function syncThemeLabel() {
    var now = root.getAttribute('data-theme');
    themeBtn.setAttribute('aria-label', now === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncThemeLabel();

  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('theme', next);
    syncThemeLabel();
  });

  /* ---------- mobile nav ---------- */
  var menu = document.getElementById('menu');
  var nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }

  menu.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- sticky bar shadow ---------- */
  var bar = document.getElementById('bar');
  function onScroll() {
    bar.classList.toggle('stuck', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal, .card, .app, .post, .tl-item, .facts');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        var i = Math.min(siblings.indexOf(el), 7);
        el.style.transitionDelay = (i > 0 ? i * 55 : 0) + 'ms';
        el.classList.add('in');
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ---------- install counter ---------- */
  var odo = document.querySelector('.odo');
  if (odo) {
    var target = parseInt(odo.getAttribute('data-to'), 10) || 0;
    var suffix = odo.getAttribute('data-suffix') || '';
    var fmt = new Intl.NumberFormat('en-US');

    function run() {
      if (reduced) { odo.textContent = fmt.format(target) + suffix; return; }
      var dur = 1600;
      var t0 = null;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        odo.textContent = fmt.format(Math.round(target * eased)) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var counter = new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) { run(); obs.disconnect(); }
      }, { threshold: 0.4 });
      counter.observe(odo);
    } else {
      run();
    }
  }

  /* ---------- app filters + pagination ---------- */
  var filterBtns = document.querySelectorAll('.chip-btn');
  var appCards = document.querySelectorAll('#appgrid .app');
  var empty = document.getElementById('empty');
  var showMoreBtn = document.getElementById('showMore');
  var PAGE_SIZE = 6;
  var currentFilter = 'all';
  var visibleCount = PAGE_SIZE;

  function matchesFilter(card, f) {
    return f === 'all' ||
      (f === 'play' && card.getAttribute('data-play') === 'yes') ||
      card.getAttribute('data-cat') === f;
  }

  function render() {
    var matchedCount = 0;
    Array.prototype.forEach.call(appCards, function (card) {
      if (matchesFilter(card, currentFilter)) matchedCount++;
    });

    var shown = 0;
    Array.prototype.forEach.call(appCards, function (card) {
      var match = matchesFilter(card, currentFilter);
      card.hidden = !match || shown >= visibleCount;
      if (match) shown++;
    });

    if (empty) empty.hidden = matchedCount !== 0;
    if (showMoreBtn) showMoreBtn.hidden = matchedCount <= visibleCount;
  }

  Array.prototype.forEach.call(filterBtns, function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(filterBtns, function (b) { b.classList.remove('is-on'); });
      btn.classList.add('is-on');

      currentFilter = btn.getAttribute('data-f');
      visibleCount = PAGE_SIZE;
      render();
    });
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      visibleCount += PAGE_SIZE;
      render();
    });
  }

  render();

  /* ---------- year ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();

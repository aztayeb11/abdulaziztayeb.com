/* Portfolio behaviour. Content/config lives in config.js; this file needs no edits. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- Social links (from config.js) ---------- */
  var L = window.SITE_LINKS || {};
  $$('[data-link]').forEach(function (a) {
    var u = (L[a.dataset.link] || '').trim();
    if (/^https?:\/\//i.test(u)) { a.href = u; a.target = '_blank'; a.hidden = false; }
  });

  /* ---------- Videos: YouTube facade -> iframe on click ---------- */
  var V = window.SITE_VIDEOS || {};
  var showEmpty = /[?&]placeholders\b/.test(location.search);
  function ytId(v) {
    v = (v || '').trim(); if (!v) return '';
    if (/^[\w-]{11}$/.test(v)) return v;
    var m = v.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
    return m ? m[1] : '';
  }
  function ytStart(v) { var t = (String(v).match(/[?&](?:t|start)=(\d+)/) || [])[1]; return t ? '&start=' + t : ''; }

  $$('[data-video]').forEach(function (fig) {
    var cfg = V[fig.dataset.video] || {};
    var label = cfg.title || fig.dataset.label || 'Video';
    var id = ytId(cfg.youtube);
    if (id) {
      fig.classList.add('yt');
      var group = fig.closest('[data-vgroup]'); if (group && group.querySelectorAll('[data-video]').length === 1) group.classList.add('vid-main');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'vbtn'; b.setAttribute('aria-label', 'Play video: ' + label);
      var img = document.createElement('img');
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      img.src = cfg.poster || 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
      if (!cfg.poster) img.onerror = function () { img.onerror = null; img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'; };
      b.appendChild(img);
      var lab = document.createElement('span'); lab.className = 'vlabel'; lab.textContent = label; b.appendChild(lab);
      var open = document.createElement('a');
      open.className = 'vopen'; open.href = 'https://www.youtube.com/watch?v=' + id; open.target = '_blank'; open.rel = 'noopener';
      open.textContent = 'Watch on YouTube ↗';
      b.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1' + ytStart(cfg.youtube);
        f.title = label; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true; f.referrerPolicy = 'strict-origin-when-cross-origin';
        b.replaceWith(f); open.remove(); f.focus();
      });
      fig.appendChild(b); fig.appendChild(open);
    } else if (cfg.local) {
      fig.style.setProperty('--r', cfg.localRatio || '16/9');
      var v = document.createElement('video');
      v.controls = true; v.preload = 'none'; v.playsInline = true; v.setAttribute('aria-label', label);
      if (cfg.poster) v.poster = cfg.poster;
      v.src = cfg.local; fig.appendChild(v);
    } else if (showEmpty) {
      fig.dataset.label = label + ' — add YouTube ID in assets/js/config.js';
    } else {
      fig.hidden = true;
    }
  });
  $$('[data-vgroup]').forEach(function (g) {
    if (!$$('[data-video]', g).some(function (f) { return !f.hidden; })) g.hidden = true;
  });

  /* ---------- Galleries: scroll-snap track, arrows, keyboard, counter ---------- */
  var sm = reduce ? 'auto' : 'smooth';
  $$('[data-gallery]').forEach(function (g) {
    var t = $('.gal-track', g), n = t.children.length, c = $('.gal-count', g);
    var step = function () { return t.children[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(t).columnGap) || 12); };
    var go = function (d) { t.scrollBy({ left: d * step(), behavior: sm }); };
    $$('.gal-btn', g).forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.dir === 'next' ? 1 : -1); }); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    });
    var upd = function () { c.textContent = (Math.min(Math.round(t.scrollLeft / step()), n - 1) + 1) + ' / ' + n; };
    t.addEventListener('scroll', upd, { passive: true }); upd();
  });

  /* ---------- Lightbox with previous/next ---------- */
  var lb = $('#lb'), lbImg = $('img', lb), lbCap = $('p', lb), lbPrev = $('#lb-prev'), lbNext = $('#lb-next');
  var lbSet = [], lbIdx = 0;
  function lbShow() { var o = lbSet[lbIdx]; lbImg.src = o.src; lbImg.alt = o.alt || ''; lbCap.textContent = o.cap || o.alt || ''; lbPrev.hidden = lbNext.hidden = lbSet.length < 2; }
  function lbOpen(set, i) { lbSet = set; lbIdx = i; lbShow(); if (!lb.open) lb.showModal(); }
  function lbStep(d) { if (lbSet.length < 2) return; lbIdx = (lbIdx + d + lbSet.length) % lbSet.length; lbShow(); }
  var full = function (img) { return img.dataset.full || img.currentSrc || img.src; };

  function openFromImage(im) {
    var g = im.closest('[data-gallery]');
    var imgs = g ? $$('.slide .ph img', g) : [im];
    lbOpen(imgs.map(function (i) {
      var sl = i.closest('.slide');
      return { src: full(i), alt: i.alt, cap: sl ? $('figcaption', sl).textContent : i.alt };
    }), imgs.indexOf(im));
  }
  /* make enlargeable images keyboard-operable */
  $$('.slide .ph img, .zoom img').forEach(function (im) {
    im.tabIndex = 0; im.setAttribute('role', 'button'); im.setAttribute('aria-label', 'Enlarge image: ' + im.alt);
    im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFromImage(im); } });
  });
  document.addEventListener('click', function (e) {
    var gi = e.target.closest('.gi');
    if (gi) {
      var vis = $$('.gg li:not([hidden]) .gi');
      lbOpen(vis.map(function (b) { var im = $('img', b); return { src: b.dataset.full, alt: im.alt, cap: b.dataset.cap }; }), vis.indexOf(gi));
      return;
    }
    var im = e.target.closest('.slide .ph img, .zoom img');
    if (im) { openFromImage(im); return; }
    if (e.target.closest('#lb-prev')) { lbStep(-1); return; }
    if (e.target.closest('#lb-next')) { lbStep(1); return; }
    if (e.target.closest('#lb')) lb.close();
  });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { lbStep(-1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { lbStep(1); e.preventDefault(); }
  });

  /* ---------- Gallery filter ---------- */
  $$('.tab').forEach(function (t) {
    t.addEventListener('click', function () {
      $$('.tab').forEach(function (x) { x.setAttribute('aria-pressed', x === t); });
      $$('.gg li').forEach(function (li) { li.hidden = t.dataset.f !== 'all' && li.dataset.p !== t.dataset.f; });
    });
  });

  /* ---------- Scroll reveals + nav state ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('show'); io.unobserve(x.target); } });
  }, { threshold: .12 });
  $$('.rise').forEach(function (el) { io.observe(el); });

  var links = $$('nav a');
  var workIds = ['knight-night', 'masterm1nd', 'philosophy', 'gallery'];
  var so = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      var id = workIds.indexOf(x.target.id) > -1 ? 'work' : x.target.id;
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        a.classList.toggle('on', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { threshold: .35 });
  $$('main > section, main > header').forEach(function (s) { so.observe(s); });

  /* ---------- Subtle hero parallax ---------- */
  var p = $('#parallax');
  if (p && !reduce) addEventListener('scroll', function () { if (scrollY < innerHeight) p.style.transform = 'translateY(' + scrollY * .15 + 'px)'; }, { passive: true });
})();

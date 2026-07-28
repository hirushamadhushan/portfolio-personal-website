/* ==========================================================================
   Hirusha Madhushan — Portfolio
   All interaction lives here. No dependencies.

   1. Helpers            6. Reveal on scroll
   2. Preloader          7. Counters
   3. Custom cursor      8. Skill bars
   4. Typing roles       9. Tilt + magnetic
   5. Nav / progress    10. Marquee, copy, particles
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------- 1. Helpers ---------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover:hover)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* -------------------- 1b. Render project cards -------------------------
     Cards come from window.PROJECTS (js/projects.js). This has to run before
     the observers below, so they pick up the freshly created elements.      */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var ICON_GITHUB = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>';
  var ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  function projectCard(p, i) {
    var tech = (p.tech || []).map(function (t) {
      return '<span class="chip">' + esc(t) + '</span>';
    }).join('');

    var links = '';
    if (p.code) {
      links += '<a href="' + esc(p.code) + '" target="_blank" rel="noopener">' + ICON_GITHUB + 'Code</a>';
    }
    if (p.demo) {
      links += '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + ICON_LINK + 'Live Demo</a>';
    }

    return '' +
      '<article class="proj ' + esc(p.theme || 'p1') + ' tilt reveal scale" data-delay="' + ((i % 5) + 1) + '">' +
        '<div class="proj-thumb">' +
          '<span class="bgfx"></span><span class="mesh"></span>' +
          (p.badge ? '<span class="proj-badge">' + esc(p.badge) + '</span>' : '') +
          (p.live ? '<span class="proj-live"><span class="d"></span>Live</span>' : '') +
          '<span class="glyph">' + esc(p.glyph || p.title) + '</span>' +
          (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" onerror="this.remove()" />' : '') +
        '</div>' +
        '<div class="proj-body">' +
          '<h3>' + esc(p.title) + ' <span class="arrow">&#8599;</span></h3>' +
          '<p>' + esc(p.description) + '</p>' +
          '<div class="chips">' + tech + '</div>' +
          (links ? '<div class="proj-links">' + links + '</div>' : '') +
        '</div>' +
      '</article>';
  }

  var grid = $('#projGrid');
  if (grid) {
    var list = window.PROJECTS || [];
    grid.innerHTML = list.map(projectCard).join('');
  }

  /* ------------------------ 2. Preloader --------------------------------- */
  var preloader = $('#preloader');
  function hidePreloader() { preloader.classList.add('done'); }
  window.addEventListener('load', function () { setTimeout(hidePreloader, 700); });
  setTimeout(hidePreloader, 3000);            // safety net if a font never loads

  $('#year').textContent = new Date().getFullYear();

  /* ----------------------- 3. Custom cursor ------------------------------ */
  if (!reduced && canHover) {
    var dot = $('.cursor-dot');
    var ring = $('.cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });

    (function follow() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(follow);
    })();

    $$('a, button, .proj, .role-card, .stat, .cc, .chip, .metric').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('grow'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('grow'); });
    });
  }

  /* ----------------------- 4. Typing roles ------------------------------- */
  var roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Machine Learning Enthusiast'
  ];
  var typedEl = $('#typed');

  if (reduced) {
    typedEl.textContent = roles[0];
  } else {
    var ri = 0, ci = 0, deleting = false;
    (function type() {
      var word = roles[ri];
      ci += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ci);

      var delay = deleting ? 45 : 85;
      if (!deleting && ci === word.length) {
        delay = 1700;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 350;
      }
      setTimeout(type, delay);
    })();
  }

  /* --------------------- 5. Nav / scroll progress ------------------------ */
  var nav = $('#nav');
  var progress = $('#progress');
  var navLinks = $$('#navLinks a');
  var sections = $$('main section[id]');

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    nav.classList.toggle('stuck', y > 40);

    var current = '';
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var burger = $('#burger');
  var menu = $('#mobileMenu');

  function toggleMenu(force) {
    var open = force === undefined ? !menu.classList.contains('open') : force;
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('locked', open);
  }
  burger.addEventListener('click', function () { toggleMenu(); });
  $$('#mobileMenu a').forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* --------------------- 6. Reveal on scroll ----------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  $$('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* ------------------------- 7. Counters --------------------------------- */
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var target = Number(el.dataset.to);
      var duration = 1500;
      var start = performance.now();

      (function step(now) {
        var p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(start);

      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  $$('.count').forEach(function (el) { countObserver.observe(el); });

  /* ------------------------ 8. Skill bars -------------------------------- */
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      $$('.bar-fill', entry.target).forEach(function (fill, i) {
        setTimeout(function () { fill.style.width = fill.dataset.w + '%'; }, i * 110);
      });
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  $$('.skill-card').forEach(function (el) { barObserver.observe(el); });

  /* --------------------- 9. Tilt + magnetic ------------------------------ */
  if (!reduced && canHover) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;

        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');

        var rotX = (0.5 - py) * 7;
        var rotY = (px - 0.5) * 7;
        card.style.transform =
          'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-8px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });

    $$('.magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.22 + 'px,' + y * 0.32 + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------------- 10. Marquee, copy-to-clipboard, particles ------------ */

  /* duplicate the track so the -50% loop is seamless */
  var track = $('#mqTrack');
  track.innerHTML += track.innerHTML;

  /* right-click a contact card to copy its value */
  var toast = $('#toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1900);
  }
  $$('.cc').forEach(function (card) {
    card.addEventListener('contextmenu', function (e) {
      if (!navigator.clipboard) return;
      e.preventDefault();
      var value = $('.v', card).textContent.trim();
      navigator.clipboard.writeText(value).then(function () {
        showToast(value + '  copied');
      });
    });
  });

  /* particle constellation */
  if (!reduced) {
    var canvas = $('#particles');
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, points = [];
    var pointer = { x: -9999, y: -9999 };

    function resize() {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      var count = Math.min(Math.round(window.innerWidth / 14), 110);
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28 * dpr,
          vy: (Math.random() - 0.5) * 0.28 * dpr,
          r: (Math.random() * 1.6 + 0.6) * dpr
        });
      }
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) {
      pointer.x = e.clientX * dpr;
      pointer.y = e.clientY * dpr;
    });
    resize();

    var LINK = 130 * dpr;
    var PUSH = 160 * dpr;

    (function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < points.length; i++) {
        var p = points[i];

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        /* drift away from the pointer */
        var dx = p.x - pointer.x;
        var dy = p.y - pointer.y;
        var dm = Math.sqrt(dx * dx + dy * dy);
        if (dm < PUSH && dm > 0) {
          p.x += (dx / dm) * 0.7;
          p.y += (dy / dm) * 0.7;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,.55)';
        ctx.fill();

        for (var j = i + 1; j < points.length; j++) {
          var q = points[j];
          var d = Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(139,92,246,' + (0.16 * (1 - d / LINK)) + ')';
            ctx.lineWidth = dpr;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    })();
  }

  /* hide the "HM" placeholder once a real photo loads */
  var photo = $('#portrait img');
  if (photo) {
    var hideFallback = function () {
      if (photo.naturalWidth) $('#portrait .fallback').style.display = 'none';
    };
    if (photo.complete) hideFallback();
    else photo.addEventListener('load', hideFallback);
  }
})();

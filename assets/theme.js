/* ============================================================
   PORTALWOW THEME — Global JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal ──────────────────────────────── */
  function initReveal() {
    var elements = document.querySelectorAll('.pw-reveal');
    if (!elements.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('pw-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) {
      /* Si ya está en el viewport al cargar, activar de inmediato */
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('pw-in');
      } else {
        obs.observe(el);
      }
    });
  }

  /* ── Custom Cursor ──────────────────────────────── */
  function initCursor() {
    var cur = document.getElementById('pw-cursor');
    var ring = document.getElementById('pw-cursor-ring');
    if (!cur || !ring) return;
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .pw-card-hover').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cur.style.transform = 'translate(-50%,-50%) scale(2.2)';
        ring.style.width = '52px'; ring.style.height = '52px';
        ring.style.borderColor = 'rgba(0,229,160,0.55)';
      });
      el.addEventListener('mouseleave', function () {
        cur.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.width = '32px'; ring.style.height = '32px';
        ring.style.borderColor = 'rgba(0,229,160,0.35)';
      });
    });
  }

  /* ── Nav Sticky + mobile ────────────────────────── */
  function initNav() {
    var nav = document.getElementById('pw-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('pw-nav--scrolled', window.scrollY > 40);
    });
    var ham = document.getElementById('pw-ham');
    var drawer = document.getElementById('pw-nav-drawer');
    var overlay = document.getElementById('pw-nav-overlay');
    if (ham && drawer) {
      function openDrawer() {
        drawer.classList.add('pw-open');
        if (overlay) overlay.classList.add('pw-open');
        document.body.style.overflow = 'hidden';
        ham.setAttribute('aria-expanded', 'true');
      }
      function closeDrawer() {
        drawer.classList.remove('pw-open');
        if (overlay) overlay.classList.remove('pw-open');
        document.body.style.overflow = '';
        ham.setAttribute('aria-expanded', 'false');
      }
      ham.addEventListener('click', function () {
        drawer.classList.contains('pw-open') ? closeDrawer() : openDrawer();
      });
      if (overlay) overlay.addEventListener('click', closeDrawer);
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    }
  }

  /* ── Smooth Scroll ──────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        var target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ── FAQ Accordion ──────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.pw-faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.pw-faq-item');
        var isOpen = item.classList.contains('pw-open');
        document.querySelectorAll('.pw-faq-item.pw-open').forEach(function (i) { i.classList.remove('pw-open'); });
        if (!isOpen) item.classList.add('pw-open');
      });
    });
  }

  /* ── Cart Count ─────────────────────────────────── */
  function updateCartCount() {
    fetch('/cart.js').then(function (r) { return r.json(); }).then(function (data) {
      var counts = document.querySelectorAll('.pw-cart-count');
      counts.forEach(function (el) {
        el.textContent = data.item_count;
        el.style.display = data.item_count > 0 ? 'flex' : 'none';
      });
    }).catch(function () {});
  }

  /* ── Add to Cart ────────────────────────────────── */
  function initAddToCart() {
    document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var variantId = btn.getAttribute('data-variant-id');
        if (!variantId) return;
        var original = btn.innerHTML;
        btn.innerHTML = '<span class="pw-loading-dots">Agregando</span>';
        btn.disabled = true;
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: variantId, quantity: 1 })
        })
          .then(function (r) { return r.json(); })
          .then(function () {
            btn.innerHTML = '✓ Agregado';
            btn.style.background = '#00C98A';
            updateCartCount();
            setTimeout(function () {
              btn.innerHTML = original;
              btn.style.background = '';
              btn.disabled = false;
            }, 2200);
          })
          .catch(function () { btn.innerHTML = original; btn.disabled = false; });
      });
    });
  }

  /* ── Variant radio labels ───────────────────────── */
  function initVariants() {
    document.querySelectorAll('.pw-variant-btn input[type="radio"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        var group = radio.closest('.pw-variants-options');
        if (group) {
          group.querySelectorAll('.pw-variant-btn').forEach(function(b) { b.classList.remove('active'); });
          radio.closest('.pw-variant-btn').classList.add('active');
        }
      });
    });
  }

  /* ── Tabs ───────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.pw-tabs').forEach(function (tabs) {
      var btns = tabs.querySelectorAll('.pw-tab-btn');
      var panels = tabs.querySelectorAll('.pw-tab-panel');
      btns.forEach(function (btn, i) {
        btn.addEventListener('click', function () {
          btns.forEach(function (b) { b.classList.remove('pw-active'); });
          panels.forEach(function (p) { p.classList.remove('pw-active'); });
          btn.classList.add('pw-active');
          if (panels[i]) panels[i].classList.add('pw-active');
        });
      });
    });
  }

  /* ── Notification Toast ─────────────────────────── */
  window.pwToast = function (msg, type) {
    var t = document.createElement('div');
    t.className = 'pw-toast pw-toast--' + (type || 'success');
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('pw-toast--show'); });
    setTimeout(function () {
      t.classList.remove('pw-toast--show');
      setTimeout(function () { t.remove(); }, 400);
    }, 3200);
  };

  /* ── Init ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCursor();
    initNav();
    initSmoothScroll();
    initFAQ();
    initAddToCart();
    initVariants();
    initTabs();
    updateCartCount();
  });
})();

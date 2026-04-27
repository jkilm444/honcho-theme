/* Honchō Athletic — Scroll Reveals + Page Transitions */

(function () {
  'use strict';

  /* ── Scroll Reveals ── */

  function initReveal() {
    const els = document.querySelectorAll('.hn-reveal, .hn-reveal--right');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ── Page Transitions ── */

  function initPageTransitions() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 350ms ease';

    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.target === '_blank' ||
        link.hostname !== window.location.hostname
      ) return;

      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 320);
    });
  }

  /* ── Theme Editor ── */

  document.addEventListener('shopify:section:load', initReveal);

  /* ── Init ── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initPageTransitions();
    });
  } else {
    initReveal();
    initPageTransitions();
  }
})();

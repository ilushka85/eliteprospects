/* ============================================================
   ELITE PROSPECTS HOCKEY — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ───────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Mobile dropdown toggles ─────────────────────────────── */
  document.querySelectorAll('.nav-dropdown').forEach((dd) => {
    const trigger = dd.querySelector('.dropdown-toggle');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });

  /* ── Sticky header shadow on scroll ─────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(0,0,0,.6)'
        : 'none';
    }, { passive: true });
  }

  /* ── Active nav link highlight ───────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    // Highlight "SHOWCASE" when on a showcase sub-page
    if (currentPage.includes('showcase') || window.location.pathname.includes('showcase')) {
      const parentDd = link.closest('.nav-dropdown');
      if (parentDd) {
        parentDd.querySelector('.dropdown-toggle')?.classList.add('active');
      }
    }
  });

  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Player submission form ──────────────────────────────── */
  const submissionForm = document.getElementById('player-submission-form');
  if (submissionForm) {
    submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = submissionForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = 'Thank you! Your player submission has been received. We will be in touch shortly.';
        submissionForm.prepend(alert);
        submissionForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        setTimeout(() => alert.remove(), 6000);
      }, 1200);
    });
  }

  /* ── Contact form ────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = 'Message sent! We\'ll get back to you as soon as possible.';
        contactForm.prepend(alert);
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;

        setTimeout(() => alert.remove(), 6000);
      }, 1000);
    });
  }

  /* ── News filter buttons ─────────────────────────────────── */
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      // Filter logic could be expanded with data attributes
    });
  });

})();

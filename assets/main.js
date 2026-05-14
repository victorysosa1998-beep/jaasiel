/* ============================================================
   JAASIEL EDUCATION CENTRE – MAIN JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ──
  const loader = document.getElementById('loader');
  if (loader) {
    const hideLoader = () => loader.classList.add('hidden');
    // Hide after 2s max — works whether load already fired or not
    const loaderTimer = setTimeout(hideLoader, 2000);
    if (document.readyState === 'complete') {
      // Page already loaded before script ran
      clearTimeout(loaderTimer);
      setTimeout(hideLoader, 500);
    } else {
      window.addEventListener('load', () => {
        clearTimeout(loaderTimer);
        setTimeout(hideLoader, 500);
      });
    }
  }

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    // Add X close button inside the drawer
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.style.cssText = 'position:absolute;top:24px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;padding:4px 8px;z-index:1002;display:none;';
    navLinks.appendChild(closeBtn);

    const openMenu = () => {
      hamburger.classList.add('open');
      navLinks.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (window.innerWidth <= 768) closeBtn.style.display = 'block';
    };
    const closeMenu = () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      closeBtn.style.display = 'none';
    };

    hamburger.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll(
    '.feature-card, .program-card, .testi-card, .news-card--big, .news-card-sm, .mvv-card, .team-card, .step, .extra-item, .gallery-item, .about-snap-grid > *, .stat-big'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── COUNTER ANIMATION ──
  function animateCounter(el, target, duration = 1600) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.stat-num, .stat-num-big');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.replace(/[^0-9]/g, '');
        const suffix = el.textContent.replace(/[0-9,]/g, '');
        if (raw) {
          el.dataset.suffix = suffix;
          animateCounter(el, parseInt(raw));
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => counterObserver.observe(el));

  // ── ACTIVE NAV LINK ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath) a.classList.add('active');
  });

  // ── SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
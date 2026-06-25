(function () {
  'use strict';

  /* Altitude progress bar */
  const progressFill = document.querySelector('.altitude-bar__fill');
  if (progressFill) {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* Navbar scroll state */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function updateNavbar() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  /* Mobile menu */
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* Scroll reveal */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* Trail marker count-up + wobble */
  const trailMarkers = document.querySelectorAll('.trail-marker');
  if (trailMarkers.length && 'IntersectionObserver' in window) {
    const markerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const marker = entry.target;
          const numEl = marker.querySelector('.trail-marker__number');
          if (numEl && numEl.dataset.count) {
            const target = parseFloat(numEl.dataset.count);
            const suffix = numEl.dataset.suffix || '';
            const isPercent = numEl.dataset.percent === 'true';
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(function () {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              const display = Number.isInteger(target) ? Math.floor(current) : current.toFixed(0);
              numEl.textContent = display + (isPercent ? '%' : '') + suffix;
            }, 30);
          }
          marker.classList.add('wobble');
          markerObserver.unobserve(marker);
        }
      });
    }, { threshold: 0.5 });

    trailMarkers.forEach(function (m) {
      markerObserver.observe(m);
    });
  }

  /* Star field */
  const starContainer = document.querySelector('.star-field__stars');
  if (starContainer) {
    const starCount = window.innerWidth <= 480 ? 40 : 80;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.animationDuration = (2 + Math.random() * 3) + 's';
      starContainer.appendChild(star);
    }
  }

  /* Snow particles */
  const snowContainer = document.querySelector('.snow-container');
  if (snowContainer) {
    const flakeCount = window.innerWidth <= 480 ? 10 : 25;
    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      flake.style.left = Math.random() * 100 + '%';
      flake.style.animationDuration = (5 + Math.random() * 10) + 's';
      flake.style.animationDelay = Math.random() * 10 + 's';
      flake.style.width = (2 + Math.random() * 3) + 'px';
      flake.style.height = flake.style.width;
      snowContainer.appendChild(flake);
    }
  }
})();

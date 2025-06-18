document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  // Theme toggle buttons
  const themeButtons = [
    document.getElementById('theme-toggle-desktop'),
    document.getElementById('theme-toggle-mobile')
  ];

  // === Theme functions ===
  const setThemeIcon = () => {
    const isDark = html.classList.contains('dark');
    themeButtons.forEach(btn => {
      if (btn) {
        btn.textContent = isDark ? '🌞' : '🌙';
        btn.classList.add('scale-110', 'rotate-12');
        setTimeout(() => {
          btn.classList.remove('scale-110', 'rotate-12');
        }, 300);
      }
    });
  };

  const applySavedTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
    }
    setThemeIcon();
  };

  const toggleTheme = () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    setThemeIcon();
  };

  applySavedTheme();
  themeButtons.forEach(btn => btn?.addEventListener('click', toggleTheme));

  // === Mobile Nav Toggle & Overlay ===
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('overlay');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  menuToggle?.addEventListener('click', () => {
    const isClosing = !mobileNav.classList.contains('hidden');
    mobileNav.classList.toggle('hidden');
    overlay.classList.toggle('hidden', isClosing);

    if (menuIcon) {
      menuIcon.classList.add('opacity-0', 'scale-75');
      setTimeout(() => {
        menuIcon.textContent = isClosing ? '☰' : '×';
        menuIcon.classList.remove('scale-75');
        menuIcon.classList.add('scale-100', 'opacity-100');
      }, 150);
    }
  });

  overlay?.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    overlay.classList.add('hidden');
    if (menuIcon) menuIcon.textContent = '☰';
  });

  // Close mobile nav on link/button click except theme toggle
  mobileNav?.querySelectorAll('a, button').forEach(el => {
    if (el !== themeToggleMobile) {
      el.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        overlay.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = '☰';
      });
    }
  });

  // Reset mobile menu on window resize ≥ 768px
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileNav.classList.add('hidden');
      overlay.classList.add('hidden');
      if (menuIcon) menuIcon.textContent = '☰';
    }
  });

  // === Fade-In Animation on Scroll ===
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
    appearOnScroll.observe(fader);
  });

   // === Smooth Scrolling + Close Mobile Nav ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });

      // Close mobile nav if open and not theme toggle
      if (window.innerWidth < 768 && this !== themeToggleMobile) {
        mobileNav?.classList.add('hidden');
        overlay?.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = '☰';
      }
    });
  });

});

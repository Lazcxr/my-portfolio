document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const themeButtons = [
    document.getElementById('theme-toggle-desktop'),
    document.getElementById('theme-toggle-mobile')
  ];

  // === Theme ===
  const setThemeIcon = () => {
    const isDark = html.classList.contains('dark');
    themeButtons.forEach(btn => {
      if (btn) {
        btn.textContent = isDark ? '🌞' : '🌙';
        btn.classList.add('scale-110', 'rotate-12');

        // Reset animation classes after animation
        setTimeout(() => {
          btn.classList.remove('scale-110', 'rotate-12');
        }, 300);
      }
    });
  };

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
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

  themeButtons.forEach(btn => {
    btn?.addEventListener('click', toggleTheme);
  });

  // === Mobile Nav Toggle with Animation ===
  const menuToggle = document.getElementById('menu-toggle');
  const menuIcon = document.getElementById('menu-icon');
  const mobileNav = document.getElementById('mobile-nav');

  menuToggle?.addEventListener('click', () => {
    const isClosing = !mobileNav.classList.contains('hidden');
    mobileNav?.classList.toggle('hidden');

    if (menuIcon) {
      // Animate icon change
      menuIcon.classList.add('opacity-0', 'scale-75');
      setTimeout(() => {
        menuIcon.textContent = isClosing ? '☰' : '×';
        menuIcon.classList.remove('scale-75');
        menuIcon.classList.add('scale-100', 'opacity-100');
      }, 150);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileNav?.classList.add('hidden');
      const menuIcon = document.getElementById('menu-icon');
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
      if (!entry.isIntersecting) return;
      entry.target.classList.add('opacity-100', 'translate-y-0');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    fader.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
    appearOnScroll.observe(fader);
  });
});

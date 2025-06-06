// === Theme Toggle ===
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
}

// Load saved theme
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggles
  document.getElementById('theme-toggle-desktop')?.addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

  // Mobile nav toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  menuToggle?.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Auto-hide mobile nav if resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileNav.classList.add('hidden');
    }
  });
});

// === Fade-In Scroll Animation ===
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

// Add animation classes
faders.forEach(fader => {
  fader.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
  appearOnScroll.observe(fader);
});

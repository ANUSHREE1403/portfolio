// Minimal placeholder to avoid 404 errors during local preview.
document.addEventListener('DOMContentLoaded', () => {
  // Smoothscroll for anchors with class .smoothscroll
  document.querySelectorAll('a.smoothscroll[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', evt => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        evt.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});


// Basic UI interactions for local preview.
(function () {
  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  // Mobile menu toggle (no full nav implemented, just stub)
  const toggle = document.querySelector('.s-header__menu-toggle');
  const nav = document.querySelector('.s-header__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.toggle('is-open');
    });
  }
})();


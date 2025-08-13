// Starfield + hyperspace page transitions
// Keeps it lightweight and framework-free; Tailwind is used only for utility classes if needed

(function () {
  const STAR_COUNT = 160;
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, stars;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: STAR_COUNT }, () => newStar());
  }

  function newStar() {
    return {
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      o: 0.2 + Math.random() * 0.8
    };
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    for (let s of stars) {
      s.z -= 6; // speed
      if (s.z <= 1) Object.assign(s, newStar(), { z: w });

      const k = 128 / s.z; // perspective
      const px = s.x * k + w / 2;
      const py = s.y * k + h / 2;
      const size = (1 - s.z / w) * 2.2;

      ctx.beginPath();
      ctx.fillStyle = `rgba(180, 225, 255, ${s.o})`;
      ctx.arc(px, py, Math.max(size, 0.3), 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();

  // Hyperspace transition
  const overlay = document.querySelector('.warp-overlay');
  const WARP_MS = 750;

  function warpTo(href) {
    if (!overlay) return (window.location.href = href);
    // countdown element
    let cd = document.getElementById('warp-countdown');
    if (!cd) {
      cd = document.createElement('div');
      cd.id = 'warp-countdown';
      cd.style.position = 'fixed';
      cd.style.inset = '0';
      cd.style.display = 'grid';
      cd.style.placeItems = 'center';
      cd.style.zIndex = '10000';
      cd.style.color = '#e6ebf2';
      cd.style.fontFamily = 'Orbitron, sans-serif';
      cd.style.fontSize = '64px';
      cd.style.letterSpacing = '0.1em';
      cd.style.pointerEvents = 'none';
      cd.textContent = '';
      document.body.appendChild(cd);
    }

    let t = 3;
    cd.textContent = t;
    overlay.classList.add('active');
    const iv = setInterval(() => {
      t -= 1; cd.textContent = t > 0 ? t : 'Go!';
      if (t <= 0) { clearInterval(iv); setTimeout(() => (window.location.href = href), 150); }
    }, 350);
  }

  document.querySelectorAll('a[data-warp]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = a.getAttribute('href');
      if (!url || url.startsWith('#')) return; // allow hash
      e.preventDefault();
      warpTo(url);
    });
  });

  // Tech stack fun facts (tooltip-like)
  const facts = {
    Python: 'Loved for readability and a massive ecosystem.',
    Java: 'Write once, run anywhere — the JVM superpower.',
    SQL: 'Declarative language to talk to relational data.',
    JavaScript: 'The language of the web — everywhere.',
    React: 'Build UIs as pure functions of state.',
    MongoDB: 'Document database that scales with you.',
    'scikit‑learn': 'Classic ML toolkit with clean APIs.',
    pandas: 'DataFrames for Python — tabular bliss.',
    NumPy: 'ND arrays: vectorized speed and power.',
    Streamlit: 'Turn Python scripts into apps fast.',
    'Power BI': 'Interactive dashboards for business insight.',
    Jupyter: 'Notebooks for explorative coding & reports.',
    Git: 'Version control for your entire brain.',
    GitHub: 'Where code collaborates and ships.'
  };
  const chipContainer = document.querySelector('.chips');
  if (chipContainer) {
    chipContainer.addEventListener('mouseover', (e) => {
      const t = e.target; if (t.tagName !== 'SPAN') return;
      const text = t.textContent.trim();
      const fact = facts[text];
      if (!fact) return;
      let tip = document.getElementById('chip-tip');
      if (!tip) {
        tip = document.createElement('div'); tip.id = 'chip-tip';
        tip.style.position = 'fixed'; tip.style.zIndex = '10001';
        tip.style.background = 'rgba(18,24,37,.95)';
        tip.style.border = '1px solid rgba(148,163,184,.25)';
        tip.style.padding = '8px 10px'; tip.style.borderRadius = '8px';
        tip.style.fontSize = '12px'; tip.style.color = '#e6ebf2';
        tip.style.pointerEvents = 'none'; tip.style.maxWidth = '240px';
        document.body.appendChild(tip);
      }
      tip.textContent = fact;
      const rect = t.getBoundingClientRect();
      tip.style.left = `${rect.left + rect.width/2}px`;
      tip.style.top = `${rect.top - 10}px`;
      tip.style.transform = 'translate(-50%,-100%)';
      tip.style.opacity = '1';
    });
    chipContainer.addEventListener('mouseout', () => {
      const tip = document.getElementById('chip-tip');
      if (tip) tip.style.opacity = '0';
    });
  }

  // Profile rocket + zoom
  const profile = document.getElementById('profile-img');
  if (profile) {
    profile.addEventListener('mouseenter', () => {
      profile.style.transition = 'transform .35s ease';
      profile.style.transform = 'scale(1.08)';
      let rocket = document.createElement('div');
      rocket.textContent = '🚀';
      rocket.style.position = 'fixed'; rocket.style.left = '-40px'; rocket.style.bottom = '40px'; rocket.style.fontSize = '28px';
      rocket.style.filter = 'drop-shadow(0 4px 10px rgba(0,0,0,.4))';
      rocket.style.zIndex = '10002';
      document.body.appendChild(rocket);
      const fly = rocket.animate([
        { transform: 'translate(0,0) rotate(0deg)' },
        { transform: 'translate(120vw,-60vh) rotate(25deg)' }
      ], { duration: 900, easing: 'cubic-bezier(.22,.61,.36,1)' });
      fly.onfinish = () => rocket.remove();
    });
    profile.addEventListener('mouseleave', () => {
      profile.style.transform = 'scale(1)';
    });
  }

  // Project Glitch Effect
  document.querySelectorAll('.project-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const entry = link.closest('.entry');
      
      if (entry) {
        entry.style.position = 'relative';
        entry.classList.add('glitching');
        
        setTimeout(() => {
          window.open(url, '_blank');
          entry.classList.remove('glitching');
        }, 2000);
      }
    });
  });
})();


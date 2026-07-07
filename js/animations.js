/* ── Animations: reveal on scroll, hero particles ──────────── */

export function initAnimations() {
  initRevealOnScroll();
  initParticles();
}

/* ── IntersectionObserver fade-in ── */
function initRevealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ── Hero ember particles (canvas) ── */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let w, h;

  function resize() {
    w = canvas.width = container.clientWidth;
    h = canvas.height = container.clientHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: h + 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.3 + Math.random() * 0.8),
      size: 1.5 + Math.random() * 2,
      life: 0,
      maxLife: 200 + Math.random() * 300,
      hue: 35 + Math.random() * 15,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    // Spawn
    if (particles.length < 30 && Math.random() < 0.15) {
      particles.push(createParticle());
    }

    // Update & draw
    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      const progress = p.life / p.maxLife;
      const alpha = progress < 0.1
        ? progress / 0.1
        : progress > 0.7
          ? 1 - (progress - 0.7) / 0.3
          : 1;

      if (alpha <= 0 || p.life >= p.maxLife) return false;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha * 0.4})`;
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha * 0.08})`;
      ctx.fill();

      return true;
    });

    animId = requestAnimationFrame(tick);
  }

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  resize();
  window.addEventListener('resize', resize, { passive: true });
  tick();

  // Cleanup when hero out of view
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      cancelAnimationFrame(animId);
    } else {
      tick();
    }
  }, { threshold: 0 });

  const heroEl = document.querySelector('.hero');
  if (heroEl) heroObserver.observe(heroEl);
}

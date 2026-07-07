/* ── Navigation: scroll, active highlight, mobile menu, CTA ── */

export function initNav() {
  const nav = document.querySelector('.site-nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const allLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.querySelector('.scroll-top');

  // Scroll shadow on nav
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 20);

    // Scroll-to-top button
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > 600);
    }

    // Active section highlight
    highlightActiveSection(sections, allLinks);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-to-top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // CTA buttons: anti-double-click with loading state
  initCtaButtons();
}

function highlightActiveSection(sections, links) {
  let currentId = '';
  const offset = 120;

  sections.forEach(section => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  links.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('is-active', href === `#${currentId}`);
  });
}

/* ── CTA Buttons: loading state + anti-double-click ── */
function initCtaButtons() {
  const ctaBtns = document.querySelectorAll('.btn[href^="#"]');

  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent double-click
      if (btn.classList.contains('is-loading')) {
        e.preventDefault();
        return;
      }

      const targetId = btn.getAttribute('href')?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        e.preventDefault();

        // Show loading state
        btn.classList.add('is-loading');

        // Smooth scroll to target
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Remove loading state after scroll completes
        const removeLoading = () => {
          btn.classList.remove('is-loading');
        };

        // Use scrollend if available, fallback to timeout
        if ('onscrollend' in window) {
          window.addEventListener('scrollend', removeLoading, { once: true });
          // Safety timeout in case scrollend doesn't fire
          setTimeout(removeLoading, 1200);
        } else {
          setTimeout(removeLoading, 800);
        }
      }
    });
  });
}

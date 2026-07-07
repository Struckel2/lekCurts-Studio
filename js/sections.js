/* ── Section interactions: tabs, FAQ accordion ─────────────── */

export function initSections() {
  initCodexTabs();
  initFaqAccordion();
}

/* ── Codex category tabs ── */
function initCodexTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter]');
  const cards = document.querySelectorAll('.codex-card[data-category]');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active tab
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Filter cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ── FAQ Accordion ── */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');

      // Close all others
      items.forEach(i => i.classList.remove('is-open'));

      // Toggle current
      if (!wasOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

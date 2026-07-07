/* ── Language Toggle (EN / PT) ──────────────────────────────── */

const STORAGE_KEY = 'lekcurts-lang';

export function initLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'pt') setLang('pt');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) setLang(lang);
    });
  });
}

export function setLang(lang) {
  document.body.classList.toggle('lang-pt', lang === 'pt');
  localStorage.setItem(STORAGE_KEY, lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
}

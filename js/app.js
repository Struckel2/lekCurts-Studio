/* ── App Entry Point ────────────────────────────────────────── */

import { initLang } from './lang.js';
import { initNav } from './nav.js';
import { initSections } from './sections.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNav();
  initSections();
  initAnimations();
});

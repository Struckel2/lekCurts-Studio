/* ── App Entry Point ────────────────────────────────────────── */

import { initNav } from './nav.js';
import { initSections } from './sections.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSections();
  initAnimations();
});

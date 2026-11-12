/**
 * PRYXON STUDIO - MAIN APPLICATION ORCHESTRATOR
 * Modular ES6 Architecture:
 * - modules/scroll-progress.js: Viewport reading scroll line
 * - modules/navigation.js: Topbar sticky nav & mobile drawer
 * - modules/hero-physics.js: 28 3D liquid floating tech icons render loop
 * - modules/coverflow.js: 3D Coverflow carousel with touch velocity swipe
 * - modules/inquiry.js: Project inquiry form validation & dual-layer API sync
 */

import { initScrollProgress } from './modules/scroll-progress.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroPhysics } from './modules/hero-physics.js';
import { initCoverflowGallery } from './modules/coverflow.js';
import { initInquiryForm } from './modules/inquiry.js';

export function initPryxon() {
  // 1. Reading Scroll Progress Bar
  initScrollProgress();

  // 2. Navigation & Mobile Drawer
  initNavigation();

  // 3. Procedural WebGL GPU Cloud Sky
  if (typeof window.initCloudSky === 'function') {
    window.initCloudSky('hero3dCanvas', {
      zenith: '#0284c7',    // Sky blue
      horizon: '#d4eafc',   // Soft horizon
      cloud: '#ffffff',     // Fluffy white clouds
      glow: 'rgba(255, 255, 255, 0.95)',
      coverage: 0.62,       // Lush cloud coverage
      speed: 1.2,           // Natural drift
      size: 1.3,            // Full cumulus puffs
      softness: 2.4,        // Feathered edges
      shadow: 0.65,         // Volumetric atmospheric depth
      cirrus: 0.7,          // High wispy veil
      sunX: 0.82,
      sunY: 0.94,
      parallax: 2.0,        // Wind & parallax response
      wind: 1.8,
      damping: 30
    });
  }

  // 4. Liquid Glass Floating Tech Icons Physics
  initHeroPhysics();

  // 5. 3D Coverflow Gallery
  initCoverflowGallery();

  // 6. Client Project Inquiry Form
  initInquiryForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPryxon);
} else {
  initPryxon();
}

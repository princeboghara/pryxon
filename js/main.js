/**
 * PRYXON - LIQUID 3D FLOATING TECH & CLOUD SKY INITIALIZATION
 * Features:
 * 1. Topbar Navigation & Mobile Drawer
 * 2. Originkit Procedural WebGL Cloud Sky Background Initialization
 * 3. 28 Liquid Glass Floating Tech Icons with Viscous Fluid Physics
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ===================================================================
     1. TOPBAR & MOBILE NAVIGATION
     =================================================================== */
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Active Link Switcher
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
      document.querySelectorAll('.mobile-nav-link').forEach((l) => l.classList.remove('active'));

      const href = link.getAttribute('href');
      document.querySelectorAll(`a[href="${href}"]`).forEach((matchedLink) => {
        matchedLink.classList.add('active');
      });

      if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('is-open')) {
        closeMobileDrawer();
      }
    });
  });

  // Mobile Drawer Open / Close
  function openMobileDrawer() {
    mobileMenuDrawer.classList.add('is-open');
    mobileToggleBtn.classList.add('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    mobileMenuDrawer.classList.remove('is-open');
    mobileToggleBtn.classList.remove('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggleBtn && mobileMenuDrawer) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenuDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenuDrawer.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        closeMobileDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuDrawer.classList.contains('is-open')) {
        closeMobileDrawer();
      }
    });
  }

  /* ===================================================================
     2. ORIGINKIT CLOUD SKY WEBGL INITIALIZATION
     =================================================================== */
  if (typeof window.initCloudSky === 'function') {
    window.initCloudSky('hero3dCanvas', {
      zenith: '#0284c7',    // Sky blue
      horizon: '#d4eafc',   // Soft horizon
      cloud: '#ffffff',     // Fluffy white clouds
      glow: 'rgba(255, 255, 255, 0.95)',
      coverage: 0.62,       // Lush cloud coverage
      speed: 1.2,           // Natural drift
      size: 1.3,            // Full cumulus cloud puffs
      softness: 2.4,        // Soft feathered edges
      shadow: 0.65,         // Volumetric atmospheric depth
      cirrus: 0.7,          // High wispy veil
      sunX: 0.82,
      sunY: 0.94,
      parallax: 2.0,        // Wind & parallax response
      wind: 1.8,
      damping: 30
    });
  }

  /* ===================================================================
     3. LIQUID 3D FLOATING TECH ICONS PHYSICS
     =================================================================== */
  let mouseX = 0;
  let mouseY = 0;
  let smoothMouseX = 0;
  let smoothMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    // Range: -1 to +1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouseX = 0;
    mouseY = 0;
  }, { passive: true });

  const techCards = document.querySelectorAll('.tech-card-3d');
  const cardItems = [];

  techCards.forEach((card) => {
    cardItems.push({
      el: card,
      depth: parseFloat(card.dataset.depth) || 1.0,
      speed: parseFloat(card.dataset.speed) || 1.0,
      phase: parseFloat(card.dataset.phase) || 0.0,
      currX: 0,
      currY: 0,
      currZ: 0,
      currRotX: 0,
      currRotY: 0,
      currRotZ: 0
    });
  });

  const startTime = performance.now();

  function animate(currentTime) {
    if (document.hidden) {
      requestAnimationFrame(animate);
      return;
    }

    const elapsed = (currentTime - startTime) * 0.001;

    // Ultra-soft liquid easing for fluid motion
    smoothMouseX += (mouseX - smoothMouseX) * 0.028;
    smoothMouseY += (mouseY - smoothMouseY) * 0.028;

    // Animate each liquid glass tech orb with wider, fluid floating motion
    for (let i = 0; i < cardItems.length; i++) {
      const item = cardItems[i];
      const { el, depth, speed, phase } = item;

      // Harmonic multi-frequency waves with wide floating area
      const waveY = (Math.sin(elapsed * (speed * 0.5) + phase) + 0.38 * Math.sin(elapsed * (speed * 0.8) + phase * 1.3)) * (22 * depth);
      const waveX = (Math.cos(elapsed * (speed * 0.4) + phase) + 0.3 * Math.cos(elapsed * (speed * 0.65) + phase * 0.7)) * (18 * depth);
      const waveRotZ = Math.sin(elapsed * (speed * 0.35) + phase) * 4.5;

      // Target position with expanded drift and mouse responsiveness
      const targetX = waveX + smoothMouseX * (48 * depth);
      const targetY = -waveY - smoothMouseY * (38 * depth);
      const targetRotX = -smoothMouseY * 12;
      const targetRotY = smoothMouseX * 14;

      // Viscous liquid fluid easing
      item.currX += (targetX - item.currX) * 0.042;
      item.currY += (targetY - item.currY) * 0.042;
      item.currRotX += (targetRotX - item.currRotX) * 0.035;
      item.currRotY += (targetRotY - item.currRotY) * 0.035;
      item.currRotZ += (waveRotZ - item.currRotZ) * 0.035;

      el.style.transform = `translate3d(${item.currX.toFixed(1)}px, ${item.currY.toFixed(1)}px, 0px) rotateX(${item.currRotX.toFixed(1)}deg) rotateY(${item.currRotY.toFixed(1)}deg) rotateZ(${item.currRotZ.toFixed(1)}deg)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});

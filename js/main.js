/**
 * PRYXON - LIQUID 3D FLOATING TECH & CLOUD SKY INITIALIZATION
 * Features:
 * 1. Topbar Navigation & Mobile Drawer
 * 2. Originkit Procedural WebGL Cloud Sky Background Initialization
 * 3. 28 Liquid Glass Floating Tech Icons with Viscous Fluid Physics
 */

function initPryxon() {
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
      zenith: '#38bdf8',    // Luminous celestial sky
      horizon: '#fce7f3',   // Soft warm pastel sunrise blush / pearl
      cloud: '#ffffff',     // Fluffy white clouds
      glow: 'rgba(253, 224, 71, 0.45)', // Warm golden sun aura
      coverage: 0.62,       // Lush cloud coverage
      speed: 1.2,           // Natural drift
      size: 1.3,            // Full cumulus cloud puffs
      softness: 2.4,        // Soft feathered edges
      shadow: 0.58,         // Volumetric atmospheric depth
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

  /* ===================================================================
     4. ORIGINKIT 3D COVERFLOW GALLERY CONTROLLER
     =================================================================== */
  function initCoverflowGallery() {
    const galleryWrapper = document.getElementById('coverflowGallery');
    const cards = Array.from(document.querySelectorAll('.coverflow-card'));
    const prevBtn = document.getElementById('coverflowPrevBtn');
    const nextBtn = document.getElementById('coverflowNextBtn');
    const dotsContainer = document.getElementById('coverflowDots');

    if (!galleryWrapper || cards.length === 0) return;

    const n = cards.length;
    let active = 0;
    let isLocked = false;
    let autoplayTimer = null;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < n; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'coverflow-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to service slide ${i + 1}`);
        dot.addEventListener('click', () => {
          setActive(i);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateCoverflow() {
      const isMobile = window.innerWidth <= 640;
      const gap = isMobile ? 6.2 : 8.5;
      const tilt = isMobile ? 12 : 16;
      const sideTilt = isMobile ? 4 : 6;
      const depth = isMobile ? 180 : 250;
      const scaleStep = isMobile ? 0.14 : 0.16;

      cards.forEach((card, i) => {
        let rel = i - active;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;

        const ax = Math.abs(rel);
        const visible = ax <= 2;
        const isActive = rel === 0;

        const sc = Math.max(0.42, 1 - ax * scaleStep);
        const tx = rel * (gap * 30);
        const tz = -ax * depth;
        const ry = -rel * tilt;
        const rz = rel * sideTilt;

        card.style.transform = `translate(-50%, -50%) translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = visible ? (isActive ? '1' : (ax === 1 ? '0.78' : '0.45')) : '0';
        card.style.zIndex = (10 - ax).toString();
        card.style.pointerEvents = visible ? 'auto' : 'none';

        if (isActive) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.classList.remove('is-active');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.coverflow-dot');
        dots.forEach((dot, idx) => {
          if (idx === active) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }
    }

    function setActive(newActive) {
      if (isLocked) return;
      isLocked = true;
      active = (((newActive % n) + n) % n);
      updateCoverflow();
      setTimeout(() => {
        isLocked = false;
      }, 550);
    }

    // Card click brings to center
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (idx !== active) {
          e.preventDefault();
          setActive(idx);
          resetAutoplay();
        }
      });
    });

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        setActive(active - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        setActive(active + 1);
        resetAutoplay();
      });
    }

    // Keyboard arrow navigation when gallery in focus
    galleryWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive(active + 1);
        resetAutoplay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive(active - 1);
        resetAutoplay();
      }
    });

    // Touch swipe navigation for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    galleryWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    galleryWrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // Horizontal swipe detected
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            setActive(active + 1); // Swipe left -> next
          } else {
            setActive(active - 1); // Swipe right -> prev
          }
          resetAutoplay();
        }
      }
    }, { passive: true });

    // Autoplay (every 3.8s, pauses on hover)
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!document.hidden) {
          setActive(active + 1);
        }
      }, 3800);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    galleryWrapper.addEventListener('mouseenter', stopAutoplay);
    galleryWrapper.addEventListener('mouseleave', startAutoplay);
    window.addEventListener('resize', updateCoverflow, { passive: true });

    // Initial render & start autoplay
    updateCoverflow();
    startAutoplay();
  }

  initCoverflowGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPryxon);
} else {
  initPryxon();
}

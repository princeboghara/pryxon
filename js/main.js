/**
 * PRYXON - LIQUID 3D FLOATING TECH & CLOUD SKY INITIALIZATION
 * Features:
 * 1. Topbar Navigation & Mobile Drawer
 * 2. Originkit Procedural WebGL Cloud Sky Background Initialization
 * 3. 28 Liquid Glass Floating Tech Icons with Viscous Fluid Physics
 */

function initPryxon() {
  /* ===================================================================
     0. SCROLL READING PROGRESS BAR
     =================================================================== */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

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

  /* ===================================================================
     4. ORIGINKIT 3D COVERFLOW GALLERY CONTROLLER (REAL-TIME TOUCH & DRAG)
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

    // Drag interaction states
    let isPointerDown = false;
    let isDragging = false;
    let hasMovedEnough = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let activeOnStart = 0;
    let currentDragOffset = 0;

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

    function renderCoverflow(offset = 0, isInteractive = false) {
      const isMobile = window.innerWidth <= 640;
      const gap = isMobile ? 5.8 : 8.2;
      const tilt = isMobile ? 12 : 16;
      const sideTilt = isMobile ? 4 : 5.5;
      const depth = isMobile ? 175 : 245;
      const scaleStep = isMobile ? 0.13 : 0.15;

      const currentVirtualActive = active + offset;

      cards.forEach((card, i) => {
        // Continuous circular relative offset
        let rel = (i - currentVirtualActive) % n;
        rel = (rel + n) % n;
        if (rel > n / 2) rel -= n;

        const ax = Math.abs(rel);
        const visible = ax <= 2.25;
        const isCurrentActive = ax < 0.45;

        const sc = Math.max(0.42, 1 - ax * scaleStep);
        const tx = rel * (gap * 30);
        const tz = -ax * depth;
        const ry = -rel * tilt;
        const rz = rel * sideTilt;

        if (isInteractive) {
          card.style.transition = 'none';
        } else {
          card.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        card.style.transform = `translate(-50%, -50%) translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        card.style.opacity = visible ? (Math.max(0, 1 - ax * 0.3)).toFixed(2) : '0';
        card.style.zIndex = Math.round(20 - ax * 4).toString();
        card.style.pointerEvents = visible ? 'auto' : 'none';

        if (isCurrentActive) {
          card.classList.add('is-active');
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.classList.remove('is-active');
          card.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots indicator to closest active card
      if (dotsContainer) {
        const closestActive = (((Math.round(currentVirtualActive) % n) + n) % n);
        const dots = dotsContainer.querySelectorAll('.coverflow-dot');
        dots.forEach((dot, idx) => {
          if (idx === closestActive) {
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
      renderCoverflow(0, false);
      setTimeout(() => {
        isLocked = false;
      }, 650);
    }

    // Card click brings to center if not dragged
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (hasMovedEnough) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
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

    // Keyboard arrow navigation
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

    // Real-time Pointer (Touch & Mouse) Gesture Physics with Momentum
    let dragStartTime = 0;
    let lastMoveTime = 0;
    let lastMoveX = 0;
    let velocityX = 0;

    function getSwipeDistance() {
      const cardWidth = window.innerWidth <= 480 ? 295 : (window.innerWidth <= 768 ? 340 : 420);
      return cardWidth * 0.62;
    }

    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      isPointerDown = true;
      hasMovedEnough = false;
      isDragging = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      activeOnStart = active;
      currentDragOffset = 0;
      dragStartTime = performance.now();
      lastMoveTime = dragStartTime;
      lastMoveX = e.clientX;
      velocityX = 0;
      stopAutoplay();
    }

    function onPointerMove(e) {
      if (!isPointerDown) return;
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;

      if (!hasMovedEnough) {
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
          if (Math.abs(deltaX) >= Math.abs(deltaY)) {
            hasMovedEnough = true;
            isDragging = true;
            galleryWrapper.classList.add('is-dragging');
            try {
              if (galleryWrapper.setPointerCapture) {
                galleryWrapper.setPointerCapture(e.pointerId);
              }
            } catch (_) {}
          } else {
            // Predominantly vertical scroll, abandon gallery drag
            isPointerDown = false;
            return;
          }
        }
      }

      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        const now = performance.now();
        const dt = now - lastMoveTime;
        if (dt > 12) {
          velocityX = (e.clientX - lastMoveX) / dt;
          lastMoveTime = now;
          lastMoveX = e.clientX;
        }

        const swipeDistance = getSwipeDistance();
        // Negative deltaX (dragging to the left) moves forward (positive offset)
        currentDragOffset = -deltaX / swipeDistance;
        renderCoverflow(currentDragOffset, true);
      }
    }

    function onPointerUp(e) {
      if (!isPointerDown && !isDragging) return;

      if (isDragging) {
        galleryWrapper.classList.remove('is-dragging');
        try {
          if (galleryWrapper.releasePointerCapture) {
            galleryWrapper.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}

        const deltaX = e.clientX - dragStartX;
        const swipeDuration = performance.now() - dragStartTime;
        const isQuickFlick = swipeDuration < 320 && Math.abs(deltaX) > 18;
        const threshold = 32;

        let target = activeOnStart;
        if (isQuickFlick || Math.abs(velocityX) > 0.32) {
          if (velocityX < -0.18 || deltaX < -threshold) {
            target = activeOnStart + 1;
          } else if (velocityX > 0.18 || deltaX > threshold) {
            target = activeOnStart - 1;
          }
        } else if (deltaX < -threshold) {
          target = activeOnStart + Math.max(1, Math.round(Math.abs(currentDragOffset)));
        } else if (deltaX > threshold) {
          target = activeOnStart - Math.max(1, Math.round(Math.abs(currentDragOffset)));
        }

        active = (((target % n) + n) % n);
        renderCoverflow(0, false);
        resetAutoplay();
      }

      isPointerDown = false;
      setTimeout(() => {
        isDragging = false;
        hasMovedEnough = false;
      }, 60);
    }

    function onPointerCancel(e) {
      if (isPointerDown || isDragging) {
        galleryWrapper.classList.remove('is-dragging');
        renderCoverflow(0, false);
        isPointerDown = false;
        isDragging = false;
        hasMovedEnough = false;
        resetAutoplay();
      }
    }

    galleryWrapper.addEventListener('pointerdown', onPointerDown);
    galleryWrapper.addEventListener('pointermove', onPointerMove, { passive: false });
    galleryWrapper.addEventListener('pointerup', onPointerUp);
    galleryWrapper.addEventListener('pointercancel', onPointerCancel);

    // Touch event fallbacks to guarantee 100% responsiveness on all mobile browsers
    galleryWrapper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        onPointerDown({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          button: 0,
          pointerId: 1
        });
      }
    }, { passive: true });

    galleryWrapper.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isPointerDown) {
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
          if (e.cancelable) e.preventDefault();
        }
        onPointerMove({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
          cancelable: e.cancelable,
          preventDefault: () => { if (e.cancelable) e.preventDefault(); },
          pointerId: 1
        });
      }
    }, { passive: false });

    galleryWrapper.addEventListener('touchend', (e) => {
      if (isPointerDown || isDragging) {
        const touch = e.changedTouches[0] || {};
        onPointerUp({
          clientX: touch.clientX || dragStartX,
          clientY: touch.clientY || dragStartY,
          pointerId: 1
        });
      }
    }, { passive: true });

    // Autoplay (every 4.2s, pauses on hover/drag)
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!document.hidden && !isDragging && !isPointerDown) {
          setActive(active + 1);
        }
      }, 4200);
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
    galleryWrapper.addEventListener('mouseleave', () => {
      if (!isDragging && !isPointerDown) startAutoplay();
    });

    window.addEventListener('resize', () => {
      renderCoverflow(0, false);
    }, { passive: true });

    // Initial render & start autoplay
    renderCoverflow(0, false);
    startAutoplay();
  }

  /* ===================================================================
     5. INTERACTIVE CONTACT FORM SUBMISSION
     =================================================================== */
  window.handleProjectFormSubmit = function() {
    const form = document.getElementById('projectInquiryForm');
    const statusMsg = document.getElementById('formStatusMsg');
    const submitBtn = document.getElementById('formSubmitBtn');
    if (!form || !statusMsg) return;

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const serviceInput = document.getElementById('serviceSelect');
    const detailsInput = document.getElementById('projectDetails');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !serviceInput.value || !detailsInput.value.trim()) {
      statusMsg.style.color = '#ef4444';
      statusMsg.textContent = 'Please fill out all required fields.';
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Inquiry...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      statusMsg.style.color = '#10b981';
      statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${nameInput.value.trim()}</strong>! Your inquiry has been received. Our architects will contact you within 24 hours.`;
      form.reset();
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 7000);
    }, 600);
  };

  initCoverflowGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPryxon);
} else {
  initPryxon();
}

/**
 * Module: 3D Coverflow Gallery Controller
 * Features:
 * - Real-time touch and mouse swipe gestures with velocity & inertia calculation
 * - Silky smooth cubic-bezier(0.16, 1, 0.3, 1) transition curves
 * - Dot indicators, keyboard navigation, and smart autoplay
 */
export function initCoverflowGallery() {
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

  // Real-time drag & gesture states
  let isPointerDown = false;
  let isDragging = false;
  let hasMovedEnough = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let activeOnStart = 0;
  let currentDragOffset = 0;
  let dragStartTime = 0;
  let lastMoveTime = 0;
  let lastMoveX = 0;
  let velocityX = 0;

  // Render dots
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

    if (dotsContainer) {
      const closestActive = (((Math.round(currentVirtualActive) % n) + n) % n);
      const dots = dotsContainer.querySelectorAll('.coverflow-dot');
      dots.forEach((dot, idx) => {
        if (idx === closestActive) dot.classList.add('is-active');
        else dot.classList.remove('is-active');
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

  function onPointerCancel() {
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

  renderCoverflow(0, false);
  startAutoplay();
}

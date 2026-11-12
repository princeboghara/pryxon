/**
 * Module: Liquid 3D Floating Tech Icons Physics
 * High-performance 60fps render loop with viscous liquid easing and mouse parallax response.
 */
export function initHeroPhysics() {
  let mouseX = 0;
  let mouseY = 0;
  let smoothMouseX = 0;
  let smoothMouseY = 0;

  window.addEventListener('mousemove', (e) => {
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

    smoothMouseX += (mouseX - smoothMouseX) * 0.028;
    smoothMouseY += (mouseY - smoothMouseY) * 0.028;

    for (let i = 0; i < cardItems.length; i++) {
      const item = cardItems[i];
      const { el, depth, speed, phase } = item;

      const waveY = (Math.sin(elapsed * (speed * 0.5) + phase) + 0.38 * Math.sin(elapsed * (speed * 0.8) + phase * 1.3)) * (22 * depth);
      const waveX = (Math.cos(elapsed * (speed * 0.4) + phase) + 0.3 * Math.cos(elapsed * (speed * 0.65) + phase * 0.7)) * (18 * depth);
      const waveRotZ = Math.sin(elapsed * (speed * 0.35) + phase) * 4.5;

      const targetX = waveX + smoothMouseX * (48 * depth);
      const targetY = -waveY - smoothMouseY * (38 * depth);
      const targetRotX = -smoothMouseY * 12;
      const targetRotY = smoothMouseX * 14;

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
}

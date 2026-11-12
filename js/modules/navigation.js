/**
 * Module: Navigation & Mobile Drawer
 * Manages active anchor switching, smooth scrolling, and mobile menu toggle.
 */
export function initNavigation() {
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

  function openMobileDrawer() {
    if (!mobileMenuDrawer || !mobileToggleBtn) return;
    mobileMenuDrawer.classList.add('is-open');
    mobileToggleBtn.classList.add('is-active');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    if (!mobileMenuDrawer || !mobileToggleBtn) return;
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
}

/**
 * PRYXON STUDIO - EXECUTIVE ADMIN PORTAL CONTROLLER
 * Handles:
 * 1. Studio Master Passcode Authentication & Session Management
 * 2. Real-time Inquiries Sync (API + Local Database Hybrid)
 * 3. KPI Metrics Pipeline Calculation
 * 4. Filtering, Search, Status Mutation, and CSV/JSON Export
 */

(function () {
  'use strict';

  // Config & State
  const MASTER_KEY_DEFAULT = 'pryxon@2026';
  const STORAGE_KEY = 'pryxon_inquiries_db';
  const AUTH_KEY = 'pryxon_admin_token';

  let inquiriesData = [];
  let currentFilter = 'all';
  let searchQuery = '';
  let activeModalInquiry = null;

  // DOM Elements
  const loginView = document.getElementById('loginView');
  const dashboardView = document.getElementById('dashboardView');
  const loginForm = document.getElementById('loginForm');
  const passcodeInput = document.getElementById('passcodeInput');
  const togglePasscodeEye = document.getElementById('togglePasscodeEye');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const logoutBtn = document.getElementById('logoutBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  const exportBtn = document.getElementById('exportBtn');

  // KPI Elements
  const totalCountEl = document.getElementById('totalCount');
  const newCountEl = document.getElementById('newCount');
  const contactedCountEl = document.getElementById('contactedCount');
  const pipelineValueEl = document.getElementById('pipelineValue');

  // Filter & Search
  const filterTabs = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const inquiriesList = document.getElementById('inquiriesList');

  // Detail Modal Elements
  const detailModal = document.getElementById('detailModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalClientName = document.getElementById('modalClientName');
  const modalClientEmail = document.getElementById('modalClientEmail');
  const modalService = document.getElementById('modalService');
  const modalBudget = document.getElementById('modalBudget');
  const modalDate = document.getElementById('modalDate');
  const modalMessage = document.getElementById('modalMessage');
  const modalStatusSelect = document.getElementById('modalStatusSelect');
  const modalEmailReplyBtn = document.getElementById('modalEmailReplyBtn');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
  const modalDeleteBtn = document.getElementById('modalDeleteBtn');

  /* ===================================================================
     1. AUTHENTICATION & SESSION HANDLING
     =================================================================== */
  function isAuthenticated() {
    return !!sessionStorage.getItem(AUTH_KEY);
  }

  function setAuthenticated(token) {
    sessionStorage.setItem(AUTH_KEY, token || 'authenticated_session');
    showDashboard();
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    showLogin();
  }

  function showLogin() {
    if (loginView) loginView.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
    if (passcodeInput) passcodeInput.value = '';
    if (loginErrorMsg) loginErrorMsg.textContent = '';
  }

  function showDashboard() {
    if (loginView) loginView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'block';
    loadInquiries();
  }

  if (togglePasscodeEye && passcodeInput) {
    togglePasscodeEye.addEventListener('click', () => {
      const isPassword = passcodeInput.type === 'password';
      passcodeInput.type = isPassword ? 'text' : 'password';
      togglePasscodeEye.innerHTML = isPassword ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = passcodeInput.value.trim();
      loginErrorMsg.textContent = '';

      if (!code) {
        loginErrorMsg.textContent = 'Please enter administrative passcode.';
        return;
      }

      // First check with server API
      try {
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: code })
        });
        const result = await res.json();
        if (result.success) {
          setAuthenticated(result.token);
          return;
        }
      } catch (err) {
        // Fallback local check if offline
        if (code === MASTER_KEY_DEFAULT) {
          setAuthenticated('local_offline_token');
          return;
        }
      }

      loginErrorMsg.textContent = 'Access Denied: Invalid studio master passcode.';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.querySelector('i').classList.add('fa-spin');
      loadInquiries().finally(() => {
        setTimeout(() => refreshBtn.querySelector('i').classList.remove('fa-spin'), 400);
      });
    });
  }

  /* ===================================================================
     2. DATA LAYER (SERVER API + LOCALSTORAGE RESILIENT SYNC)
     =================================================================== */
  async function loadInquiries() {
    let apiInquiries = [];
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.inquiries && Array.isArray(json.inquiries)) {
          apiInquiries = json.inquiries;
        }
      }
    } catch (_) {}

    // Merge with client localStorage
    let localInquiries = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) localInquiries = JSON.parse(raw);
    } catch (_) {}

    // Union by id
    const map = new Map();
    apiInquiries.forEach(inq => map.set(inq.id, inq));
    localInquiries.forEach(inq => {
      if (!map.has(inq.id)) map.set(inq.id, inq);
    });

    inquiriesData = Array.from(map.values());
    // Sort newest first
    inquiriesData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    // Update storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiriesData));
    } catch (_) {}

    updateKPIs();
    renderInquiriesList();
  }

  async function updateInquiryStatus(id, newStatus) {
    // Update local state immediately
    const found = inquiriesData.find(x => x.id === id);
    if (found) {
      found.status = newStatus;
      found.updatedAt = new Date().toISOString();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiriesData));

    // Try API
    try {
      await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (_) {}

    updateKPIs();
    renderInquiriesList();
  }

  async function deleteInquiry(id) {
    if (!confirm('Are you sure you want to delete this client inquiry? This action cannot be undone.')) {
      return;
    }

    inquiriesData = inquiriesData.filter(x => x.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiriesData));

    try {
      await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch (_) {}

    closeDetailModal();
    updateKPIs();
    renderInquiriesList();
  }

  /* ===================================================================
     3. KPI METRICS CALCULATION
     =================================================================== */
  function updateKPIs() {
    const total = inquiriesData.length;
    const newCount = inquiriesData.filter(x => x.status === 'new').length;
    const contacted = inquiriesData.filter(x => x.status === 'contacted' || x.status === 'read').length;

    // Calculate approximate pipeline valuation
    const budgetMap = {
      '1k-3k': 2000,
      '3k-8k': 5500,
      '8k-15k': 11500,
      '15k+': 20000
    };

    let totalVal = 0;
    inquiriesData.forEach(inq => {
      if (inq.status !== 'archived') {
        totalVal += budgetMap[inq.budget] || 5000;
      }
    });

    if (totalCountEl) totalCountEl.textContent = total;
    if (newCountEl) newCountEl.textContent = newCount;
    if (contactedCountEl) contactedCountEl.textContent = contacted;
    if (pipelineValueEl) pipelineValueEl.textContent = `$${(totalVal / 1000).toFixed(1)}k+`;

    // Update filter badge counts
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const type = btn.dataset.filter;
      const countBadge = btn.querySelector('.filter-count');
      if (countBadge) {
        if (type === 'all') countBadge.textContent = total;
        else countBadge.textContent = inquiriesData.filter(x => x.status === type).length;
      }
    });
  }

  /* ===================================================================
     4. INQUIRIES RENDERING & SEARCH
     =================================================================== */
  function renderInquiriesList() {
    if (!inquiriesList) return;

    let filtered = inquiriesData.filter(item => {
      // Filter status
      if (currentFilter !== 'all' && item.status !== currentFilter) return false;

      // Filter search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = (item.name || '').toLowerCase().includes(q);
        const matchesEmail = (item.email || '').toLowerCase().includes(q);
        const matchesService = (item.serviceName || item.service || '').toLowerCase().includes(q);
        const matchesDetails = (item.details || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesService && !matchesDetails) return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      inquiriesList.innerHTML = `
        <div class="empty-inquiries">
          <div class="empty-icon"><i class="fa-regular fa-folder-open"></i></div>
          <h3>No inquiries match your filter.</h3>
          <p>Any project inquiries submitted through the website contact form will appear here in real-time.</p>
        </div>
      `;
      return;
    }

    inquiriesList.innerHTML = '';
    filtered.forEach(inq => {
      const card = document.createElement('div');
      card.className = `inquiry-card ${inq.status === 'new' ? 'is-new' : ''}`;
      
      const dateFormatted = inq.createdAt ? formatInquiryDate(inq.createdAt) : 'Recently';

      card.innerHTML = `
        <div class="client-name-cell">
          <span class="client-name">${escapeHtml(inq.name)}</span>
          <span class="client-email">${escapeHtml(inq.email)}</span>
        </div>
        <div class="service-cell">
          <span class="badge-service">${escapeHtml(inq.serviceName || inq.service)}</span>
          <span class="badge-budget">${escapeHtml(inq.budgetLabel || inq.budget)}</span>
        </div>
        <div class="message-preview-cell">
          ${escapeHtml(inq.details)}
        </div>
        <div class="date-status-cell">
          <span class="status-badge ${inq.status}">${inq.status.toUpperCase()}</span>
          <span class="inquiry-date">${dateFormatted}</span>
        </div>
        <div class="actions-cell">
          <button type="button" class="btn-icon-action btn-view" title="View Full Inquiry">
            <i class="fa-regular fa-eye"></i>
          </button>
          <a href="mailto:${encodeURIComponent(inq.email)}?subject=${encodeURIComponent('Pryxon Studio - Project Inquiry Follow-Up')}" class="btn-icon-action" title="Send Email" onclick="event.stopPropagation();">
            <i class="fa-regular fa-envelope"></i>
          </a>
          <button type="button" class="btn-icon-action btn-del" title="Delete Inquiry" onclick="event.stopPropagation(); window.pryxonAdminDelete('${inq.id}');">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        openDetailModal(inq);
      });

      inquiriesList.appendChild(card);
    });
  }

  function formatInquiryDate(isoStr) {
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const diffMs = now - d;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (_) {
      return 'Recently';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  /* ===================================================================
     5. DETAIL MODAL DIALOG
     =================================================================== */
  function openDetailModal(inq) {
    activeModalInquiry = inq;
    if (!detailModal) return;

    // If viewing a new inquiry, mark as read
    if (inq.status === 'new') {
      updateInquiryStatus(inq.id, 'read');
    }

    if (modalClientName) modalClientName.textContent = inq.name;
    if (modalClientEmail) modalClientEmail.textContent = inq.email;
    if (modalService) modalService.textContent = inq.serviceName || inq.service;
    if (modalBudget) modalBudget.textContent = inq.budgetLabel || inq.budget;
    if (modalDate) modalDate.textContent = inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'N/A';
    if (modalMessage) modalMessage.textContent = inq.details;
    if (modalStatusSelect) modalStatusSelect.value = inq.status;

    if (modalEmailReplyBtn) {
      modalEmailReplyBtn.href = `mailto:${encodeURIComponent(inq.email)}?subject=${encodeURIComponent('Pryxon Studio - Project Inquiry: ' + (inq.serviceName || 'Custom Project'))}`;
    }

    if (modalWhatsAppBtn) {
      modalWhatsAppBtn.href = `https://wa.me/?text=${encodeURIComponent('Hi ' + inq.name + ', this is Pryxon Studio reaching out regarding your project inquiry!')}`;
    }

    detailModal.classList.add('is-open');
  }

  function closeDetailModal() {
    if (detailModal) detailModal.classList.remove('is-open');
    activeModalInquiry = null;
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDetailModal);
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  if (modalStatusSelect) {
    modalStatusSelect.addEventListener('change', () => {
      if (activeModalInquiry) {
        updateInquiryStatus(activeModalInquiry.id, modalStatusSelect.value);
      }
    });
  }

  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', () => {
      if (activeModalInquiry) {
        deleteInquiry(activeModalInquiry.id);
      }
    });
  }

  window.pryxonAdminDelete = function(id) {
    deleteInquiry(id);
  };

  /* ===================================================================
     6. FILTER & SEARCH LISTENERS
     =================================================================== */
  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      renderInquiriesList();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderInquiriesList();
    });
  }

  /* ===================================================================
     7. EXPORT DATA (CSV & JSON)
     =================================================================== */
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (inquiriesData.length === 0) {
        alert('No inquiries to export.');
        return;
      }

      const headers = ['ID', 'Name', 'Email', 'Service', 'Budget', 'Status', 'Date', 'Details'];
      const rows = inquiriesData.map(inq => [
        `"${inq.id}"`,
        `"${(inq.name || '').replace(/"/g, '""')}"`,
        `"${(inq.email || '').replace(/"/g, '""')}"`,
        `"${(inq.serviceName || inq.service || '').replace(/"/g, '""')}"`,
        `"${(inq.budgetLabel || inq.budget || '').replace(/"/g, '""')}"`,
        `"${inq.status}"`,
        `"${inq.createdAt || ''}"`,
        `"${(inq.details || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `pryxon_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /* ===================================================================
     8. INITIALIZATION
     =================================================================== */
  if (isAuthenticated()) {
    showDashboard();
  } else {
    showLogin();
  }

})();

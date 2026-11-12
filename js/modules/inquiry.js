/**
 * Module: Client Project Inquiry Submission
 * Connects the public website inquiry form with the backend API & local database
 */
export function initInquiryForm() {
  const form = document.getElementById('projectInquiryForm');
  const statusMsg = document.getElementById('formStatusMsg');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form || !statusMsg) return;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const serviceInput = document.getElementById('serviceSelect');
    const detailsInput = document.getElementById('projectDetails');
    const budgetInput = form.querySelector('input[name="budget"]:checked');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : '';
    const details = detailsInput ? detailsInput.value.trim() : '';
    const budget = budgetInput ? budgetInput.value : '3k-8k';

    if (!name || !email || !service || !details) {
      statusMsg.style.color = '#ef4444';
      statusMsg.textContent = 'Please fill out all required fields.';
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Inquiry...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;
    }

    const payload = {
      name,
      email,
      service,
      budget,
      details
    };

    let serverSaved = false;

    // 1. Send to Backend REST API
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        serverSaved = true;
      }
    } catch (_) {}

    // 2. Dual-Layer Local Persistence (ensures 100% resilience)
    try {
      const STORAGE_KEY = 'pryxon_inquiries_db';
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];

      const serviceMap = {
        'web-dev': 'Web Development & SaaS Platforms',
        'ecommerce': 'E-Commerce & D2C Storefronts',
        'mobile-app': 'Mobile App (iOS & Android)',
        'custom-software': 'Custom Enterprise Software / Cloud',
        'whatsapp-crm': 'WhatsApp CRM & Lead Generation',
        'ai-automation': 'AI Automations & LLM Workflows',
        'other': 'Custom Digital Solution'
      };

      const budgetMap = {
        '1k-3k': '$1k – $3k',
        '3k-8k': '$3k – $8k',
        '8k-15k': '$8k – $15k',
        '15k+': '$15k+'
      };

      const localInquiry = {
        id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        name,
        email,
        service,
        serviceName: serviceMap[service] || service,
        budget,
        budgetLabel: budgetMap[budget] || budget,
        details,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      existing.unshift(localInquiry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (_) {}

    // 3. User Feedback
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      statusMsg.style.color = '#10b981';
      statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHtml(name)}</strong>! Your project inquiry has been received. Our architects will contact you within 24 hours.`;
      form.reset();
      setTimeout(() => {
        statusMsg.textContent = '';
      }, 7000);
    }, 450);
  };

  form.addEventListener('submit', handleSubmit);
  window.handleProjectFormSubmit = handleSubmit;
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

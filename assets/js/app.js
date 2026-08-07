// Application Controller - Displays Categories, Catalog Cards & Full Guide Reader View

let activeCategory = 'all';
let currentGuideIndex = 0;
let currentTocItems = [];

// State variables for Expandable Sections
var isCategoriesExpanded = false;
var DEFAULT_VISIBLE_CATEGORIES = 6;
var visibleGuidesLimit = 12;
var GUIDES_STEP = 12;

// Category Definitions with SVG icons, descriptions and badges
var CATEGORIES = [
  { 
    id: 'all', 
    title: 'Все гайды', 
    desc: 'Полная база практических инструкций по нейросетям и монетизации',
    badge: 'Все разделы',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`
  },
  { 
    id: 'programming', 
    title: 'Программирование & ИИ', 
    desc: 'Написание идеального кода, рефакторинг, автотесты, MCP и Claude Code',
    badge: 'Код & Dev',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
  },
  { 
    id: 'chatbots', 
    title: 'Чат-боты & Консалтинг', 
    desc: 'Аудит TG-каналов, ИИ-диагностика, голосовые роботы и пакеты услуг',
    badge: 'Консалтинг',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
  },
  { 
    id: 'images', 
    title: 'Маркетплейсы & SEO', 
    desc: 'Продающие карточки для WB/Ozon, SEO-тексты и продажи Digital Drop',
    badge: 'Маркетплейсы',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`
  },
  { 
    id: 'prompts', 
    title: 'Промпт-инжиниринг', 
    desc: 'Сценарии для игровых серверов, бытовые задачи, ИИ в жизни и монетизация',
    badge: 'Промпты',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`
  },
  { 
    id: 'other', 
    title: 'Бизнес & Без кода', 
    desc: 'Claude Code для маркетологов, менеджеров, юристов, бухгалтеров и HR',
    badge: 'No-Code',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
  },
  { 
    id: 'design_graphics', 
    title: 'Дизайн & Графика', 
    desc: 'Генерация ТЗ, промптов для инфографики, иллюстраций и обложек через ИИ',
    badge: 'Дизайн',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
  },
  { 
    id: 'content_copywriting', 
    title: 'Контент & SMM', 
    desc: 'Автоматизация контент-планов, написание статей, постов и сценариев',
    badge: 'Контент',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
  },
  { 
    id: 'data_analytics', 
    title: 'Аналитика & Таблицы', 
    desc: 'ИИ в Excel, Google Таблицах, генерация формул, макросов и отчетов',
    badge: 'Аналитика',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
  },
  { 
    id: 'education_tutor', 
    title: 'Обучение & Инфопродукты', 
    desc: 'Создание онлайн-курсов, структура уроков, тестов и презентаций через ИИ',
    badge: 'Инфопродукты',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
  },
  { 
    id: 'automation_n8n', 
    title: 'Автоматизация & AI-агенты', 
    desc: 'Связка сервисов n8n/Make, автономные агенты и обработка заявок без кода',
    badge: 'Автоматизация',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
  }
];

let isInitialized = false;

// Theme Toggle Logic
function initTheme() {
  const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  if (savedTheme === 'dark' || (!savedTheme && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', 'light');
  }
}

function toggleTheme() {
  if (typeof document === 'undefined') return;
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', newTheme);
  }
}

// Main Initialization Function
function initApp() {
  if (isInitialized) return;
  isInitialized = true;

  initTheme();
  renderCategoryBlocks();
  renderCategoryFilterPills();
  renderGuidesGrid(typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : []);
  setupModalEvents();
  setupSearchEvent();
  setupHashRouting();
  checkHash();
}

// Reliable DOM Ready Check (Handles script execution after DOMContentLoaded)
if (typeof document !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initApp();
  } else {
    document.addEventListener('DOMContentLoaded', initApp);
  }
}
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('load', initApp);
}

// Render Visual Category Cards / Blocks
function renderCategoryBlocks() {
  const container = document.getElementById('categoriesBlocksGrid');
  const wrapper = document.getElementById('categoriesExpandWrapper');
  if (!container) return;

  container.innerHTML = '';
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const categoryList = CATEGORIES.filter(c => c.id !== 'all');

  categoryList.forEach((cat, index) => {
    const guideCount = data.filter(g => g.category === cat.id).length;
    const isHidden = !isCategoriesExpanded && index >= DEFAULT_VISIBLE_CATEGORIES;

    const block = document.createElement('div');
    block.className = `category-block-card ${activeCategory === cat.id ? 'active-category' : ''} ${index >= DEFAULT_VISIBLE_CATEGORIES ? 'is-collapsible-card' : ''} ${isHidden ? 'is-hidden-card' : ''}`;
    block.onclick = () => selectCategoryAndScroll(cat.id);

    block.innerHTML = `
      <div class="cat-card-top">
        <div class="cat-card-icon">${cat.icon}</div>
        <span class="cat-card-badge">${cat.badge}</span>
      </div>
      <h3 class="cat-card-title">${cat.title}</h3>
      <p class="cat-card-desc">${cat.desc}</p>
      <div class="cat-card-footer">
        <span class="cat-card-count">${guideCount} ${getGuideWordNoun(guideCount)}</span>
        <span class="cat-card-action">
          Смотреть
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
      </div>
    `;

    container.appendChild(block);
  });

  if (wrapper) {
    if (categoryList.length > DEFAULT_VISIBLE_CATEGORIES) {
      wrapper.innerHTML = `
        <button type="button" class="btn-expand-more ${isCategoriesExpanded ? 'expanded' : ''}" onclick="toggleCategoriesExpand(event)">
          <span>${isCategoriesExpanded ? 'Свернуть категории' : `Показать все категории (${categoryList.length})`}</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      `;
    } else {
      wrapper.innerHTML = '';
    }
  }
}

function toggleCategoriesExpand(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  isCategoriesExpanded = !isCategoriesExpanded;

  const container = document.getElementById('categoriesBlocksGrid');
  const btn = document.querySelector('#categoriesExpandWrapper .btn-expand-more');
  if (!container) return;

  const extraCards = container.querySelectorAll('.is-collapsible-card');
  extraCards.forEach((card, idx) => {
    if (isCategoriesExpanded) {
      card.classList.remove('is-hidden-card');
      card.style.animation = 'none';
      card.offsetHeight; // trigger reflow
      card.style.animation = `cardExpandIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04}s both`;
    } else {
      card.classList.add('is-hidden-card');
    }
  });

  if (btn) {
    const categoryList = CATEGORIES.filter(c => c.id !== 'all');
    btn.classList.toggle('expanded', isCategoriesExpanded);
    const span = btn.querySelector('span');
    if (span) {
      span.textContent = isCategoriesExpanded ? 'Свернуть категории' : `Показать все категории (${categoryList.length})`;
    }
  }
}

// Helper Noun declension for Russian language
function getGuideWordNoun(count) {
  if (count === 1) return 'гайд';
  if (count >= 2 && count <= 4) return 'гайда';
  return 'гайдов';
}

// Select category & smoothly scroll to catalog grid
function selectCategoryAndScroll(catId) {
  filterByCategory(catId);
  const catalogSection = document.getElementById('popularGuidesSection');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Render Category Filter Pills at Top of Grid
function renderCategoryFilterPills() {
  const container = document.getElementById('categoriesGrid');
  if (!container) return;

  container.innerHTML = '';
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];

  CATEGORIES.forEach(cat => {
    const count = cat.id === 'all' 
      ? data.length 
      : data.filter(g => g.category === cat.id).length;

    const pill = document.createElement('button');
    pill.className = `filter-pill-btn ${activeCategory === cat.id ? 'active' : ''}`;
    pill.innerHTML = `<span>${cat.title}</span> <span class="pill-count">${count}</span>`;
    pill.onclick = () => filterByCategory(cat.id);

    container.appendChild(pill);
  });
}

// Render Guides Cards with Batch Expansion
function renderGuidesGrid(guides) {
  const container = document.getElementById('guidesGridContainer');
  const countText = document.getElementById('guidesCountText');
  const wrapper = document.getElementById('guidesExpandWrapper');
  if (!container) return;

  const totalCount = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA.length : guides.length;
  const filteredCount = guides ? guides.length : 0;
  const visibleGuides = guides.slice(0, visibleGuidesLimit);

  if (countText) {
    countText.textContent = `Показано ${visibleGuides.length} из ${filteredCount} гайдов`;
  }

  container.innerHTML = '';

  if (!guides || guides.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;">
        <p style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Гайды не найдены</p>
        <p style="font-size: 14px; color: #64748b;">Попробуйте выбрать другую категорию или сбросить поиск</p>
        <button onclick="resetCategoryFilter()" style="margin-top: 16px; padding: 10px 20px; border-radius: 9999px; background: #0f172a; color: #fff; border: none; font-weight: 600; cursor: pointer;">Показать все гайды</button>
      </div>
    `;
    if (wrapper) wrapper.innerHTML = '';
    return;
  }

  visibleGuides.forEach((guide) => {
    const card = document.createElement('div');
    card.className = 'guide-block-card';
    card.onclick = () => openReader(guide.id);

    const tagsHtml = guide.tags ? guide.tags.map(t => `<span class="card-tag-pill">${t}</span>`).join('') : '';
    const aiModelsHtml = guide.aiModels && guide.aiModels.length
      ? `<div class="card-ai-models">${guide.aiModels.map(m => `<span class="ai-model-pill">${m}</span>`).join('')}</div>`
      : '';
    const readTime = Math.ceil((guide.wordCount || 1200) / 220);

    card.innerHTML = `
      <div>
        <div class="card-top-bar">
          <span class="card-num-badge">Гайд №${guide.id}</span>
          <span class="card-cat-name">${guide.categoryName || ''}</span>
        </div>
        <h3 class="card-main-title">${guide.title}</h3>
        <p class="card-focus-text">${guide.focus || ''}</p>
        <div class="card-tags-group">${tagsHtml}</div>
        ${aiModelsHtml}
      </div>

      <div class="card-bottom-actions">
        <button class="btn-card-read" onclick="event.stopPropagation(); openReader('${guide.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><polyline points="14 2 14 8 11 6 8 8 8 2"></polyline></svg>
          <span>Читать гайд</span>
          <span class="read-time-pill">⏱ ${readTime} мин</span>
        </button>
        <div style="display: flex; gap: 6px;">
          <button class="btn-card-download" onclick="event.stopPropagation(); downloadGuideTxt('${guide.id}')" title="Скачать TXT">.TXT</button>
          <button class="btn-card-download" onclick="event.stopPropagation(); downloadGuideMd('${guide.id}')" title="Скачать MD">.MD</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  if (wrapper) {
    if (filteredCount > visibleGuidesLimit) {
      const remaining = filteredCount - visibleGuidesLimit;
      wrapper.innerHTML = `
        <button class="btn-expand-more" onclick="showMoreGuides()">
          <span>Показать ещё гайды (${remaining})</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      `;
    } else if (visibleGuidesLimit > GUIDES_STEP && filteredCount > GUIDES_STEP) {
      wrapper.innerHTML = `
        <button class="btn-expand-more expanded" onclick="collapseGuides()">
          <span>Свернуть каталог</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      `;
    } else {
      wrapper.innerHTML = '';
    }
  }
}

function showMoreGuides() {
  visibleGuidesLimit += GUIDES_STEP;
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const filtered = activeCategory === 'all' 
    ? data 
    : data.filter(g => g.category === activeCategory);
  renderGuidesGrid(filtered);
}

function collapseGuides() {
  visibleGuidesLimit = GUIDES_STEP;
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const filtered = activeCategory === 'all' 
    ? data 
    : data.filter(g => g.category === activeCategory);
  renderGuidesGrid(filtered);

  const catalogSection = document.getElementById('popularGuidesSection');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Category Filter Handler
function filterByCategory(catId) {
  activeCategory = catId;
  visibleGuidesLimit = GUIDES_STEP; // Reset limit when switching categories
  renderCategoryBlocks();
  renderCategoryFilterPills();

  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const filtered = activeCategory === 'all' 
    ? data 
    : data.filter(g => g.category === activeCategory);

  renderGuidesGrid(filtered);
}

// Reset Filter to All
function resetCategoryFilter() {
  activeCategory = 'all';
  renderCategoryBlocks();
  renderCategoryFilterPills();
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  renderGuidesGrid(data);
}

// Search Handler
function setupSearchEvent() {
  const searchInput = document.getElementById('headerSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
    const filtered = data.filter(g => 
      g.title.toLowerCase().includes(q) || 
      g.focus.toLowerCase().includes(q) ||
      (g.tags && g.tags.some(t => t.toLowerCase().includes(q))) ||
      (g.aiModels && g.aiModels.some(m => m.toLowerCase().includes(q)))
    );
    renderGuidesGrid(filtered);
  });
}

// Open Full Guide Reader
function openReader(id) {
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const guide = data.find(g => g.id === id);
  if (!guide) return;

  currentGuideIndex = data.findIndex(g => g.id === id);

  // Set Hash URL for direct linking
  if (window.location.hash !== `#guide-${id}`) {
    history.pushState(null, '', `#guide-${id}`);
  }

  // Update Header Meta
  const titleEl = document.getElementById('modalTitleText');
  const catBadge = document.getElementById('readerCategoryBadge');
  const readTime = document.getElementById('readerReadTime');
  const bodyEl = document.getElementById('guideContent');

  if (titleEl) titleEl.textContent = guide.shortTitle || guide.title;
  if (catBadge) catBadge.textContent = guide.categoryName || '';
  
  const estimatedMin = Math.ceil((guide.wordCount || 1200) / 220);
  if (readTime) readTime.textContent = `⏱ ${estimatedMin} мин чтения`;

  // Render Content and Table of Contents
  const { html, toc } = parseMarkdownWithToc(guide.content || "");
  currentTocItems = toc;

  const aiBarHtml = guide.aiModels && guide.aiModels.length
    ? `<div class="reader-ai-models-bar"><span class="reader-ai-label">Подходящие ИИ:</span> ${guide.aiModels.map(m => `<span class="ai-model-pill-lg">${m}</span>`).join('')}</div>`
    : '';

  if (bodyEl) {
    bodyEl.innerHTML = aiBarHtml + html;
  }

  renderTocSidebar(toc);
  renderFooterGuideNav();

  // Show Reader Overlay
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  }

  // Setup Progress & TOC Scroll Tracking
  setupReaderScrollProgress();
}

// Close Reader
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('active');
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }

  if (typeof window !== 'undefined' && window.location && window.location.hash && window.location.hash.startsWith('#guide-')) {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }
}

// Hash Routing Setup
function setupHashRouting() {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('hashchange', checkHash);
  }
}

function checkHash() {
  const hash = (typeof window !== 'undefined' && window.location && window.location.hash) || '';
  if (hash && hash.startsWith('#guide-')) {
    const guideId = hash.replace('#guide-', '');
    const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
    if (data.some(g => g.id === guideId)) {
      openReader(guideId);
    }
  } else {
    const overlay = document.getElementById('modalOverlay');
    if (overlay && overlay.classList.contains('active')) {
      closeModal();
    }
  }
}

// Parse Markdown & Extract TOC Items
function parseMarkdownWithToc(md) {
  const toc = [];
  let headingCounter = 0;

  // Clean filename comments
  let cleanMd = md.replace(/^<!-- (.*?) -->\n?/gm, '');

  // Replace Headings & Extract TOC
  let html = cleanMd.replace(/^(#{1,3})\s+(.*$)/gm, (match, hashes, text) => {
    headingCounter++;
    const level = hashes.length;
    const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();
    const headingId = `section-${headingCounter}`;

    toc.push({ id: headingId, title: cleanText, level: level });

    if (level === 1) return `<h1 id="${headingId}">${text}</h1>`;
    if (level === 2) return `<h2 id="${headingId}">${text}</h2>`;
    return `<h3 id="${headingId}">${text}</h3>`;
  });

  // Basic Markdown inline replacements
  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^(\d+)\. (.*$)/gm, '<ol><li>$2</li></ol>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/<\/ol>\s*<ol>/g, '')
    .replace(/\n\n/g, '<p></p>');

  return { html, toc };
}

// Render Sidebar Table of Contents
function renderTocSidebar(toc) {
  const container = document.getElementById('readerTocContainer');
  if (!container) return;

  container.innerHTML = '';

  if (!toc || toc.length === 0) {
    container.innerHTML = `<p style="font-size: 12.5px; color: #94a3b8; padding: 6px 0;">Оглавление отсутствует</p>`;
    return;
  }

  toc.forEach(item => {
    const link = document.createElement('a');
    link.className = `toc-item-link level-${item.level}`;
    link.href = `#${item.id}`;
    link.textContent = item.title;
    link.onclick = (e) => {
      e.preventDefault();
      const targetEl = document.getElementById(item.id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightTocItem(item.id);
      }
    };

    container.appendChild(link);
  });
}

function highlightTocItem(id) {
  const links = document.querySelectorAll('.toc-item-link');
  links.forEach(l => {
    if (l.getAttribute('href') === `#${id}`) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });
}

// Setup Reading Scroll Progress Bar & TOC Auto-highlight
function setupReaderScrollProgress() {
  const overlay = document.getElementById('modalOverlay');
  const progressBar = document.getElementById('readerProgressBar');
  if (!overlay || !progressBar) return;

  overlay.onscroll = () => {
    const scrollTop = overlay.scrollTop;
    const scrollHeight = overlay.scrollHeight - overlay.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;

    // Highlight current heading in TOC
    if (currentTocItems.length > 0) {
      let currentId = currentTocItems[0].id;
      for (const item of currentTocItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          currentId = item.id;
        }
      }
      highlightTocItem(currentId);
    }
  };
}

// Render Footer Prev / Next Guide Cards
function renderFooterGuideNav() {
  const container = document.getElementById('guideFooterNav');
  if (!container) return;

  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const prevGuide = data[currentGuideIndex - 1];
  const nextGuide = data[currentGuideIndex + 1];

  let prevHtml = prevGuide ? `
    <button class="nav-guide-btn prev" onclick="openReader('${prevGuide.id}')">
      <span class="nav-btn-sub">← Предыдущий гайд</span>
      <span class="nav-btn-title">Гайд №${prevGuide.id}: ${prevGuide.shortTitle || prevGuide.title}</span>
    </button>
  ` : `<div></div>`;

  let nextHtml = nextGuide ? `
    <button class="nav-guide-btn next" onclick="openReader('${nextGuide.id}')">
      <span class="nav-btn-sub">Следующий гайд →</span>
      <span class="nav-btn-title">Гайд №${nextGuide.id}: ${nextGuide.shortTitle || nextGuide.title}</span>
    </button>
  ` : `<div></div>`;

  container.innerHTML = `
    <div class="guide-nav-wrapper">
      ${prevHtml}
      ${nextHtml}
    </div>
  `;
}

// Download Helper functions
function downloadGuideTxt(id) {
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const guide = data.find(g => g.id === id);
  if (guide) downloadBlob(guide.txtFile, guide.content);
}

function downloadGuideMd(id) {
  const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
  const guide = data.find(g => g.id === id);
  if (guide) downloadBlob(guide.mdFile, guide.content);
}

// Modal Setup
function setupModalEvents() {
  const closeBtn = document.getElementById('closeModalBtn');
  const copyBtn = document.getElementById('copyTxtBtn');
  const dlTxtBtn = document.getElementById('downloadTxtBtn');
  const dlMdBtn = document.getElementById('downloadMdBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const data = typeof GUIDES_DATA !== 'undefined' ? GUIDES_DATA : [];
      const guide = data[currentGuideIndex];
      if (guide) {
        navigator.clipboard.writeText(guide.content);
        showToast('Текст гайда скопирован в буфер!');
      }
    });
  }

  if (dlTxtBtn) {
    dlTxtBtn.addEventListener('click', () => {
      downloadGuideTxt(GUIDES_DATA[currentGuideIndex]?.id);
    });
  }

  if (dlMdBtn) {
    dlMdBtn.addEventListener('click', () => {
      downloadGuideMd(GUIDES_DATA[currentGuideIndex]?.id);
    });
  }
}

// Download Helper
function downloadBlob(filename, textContent) {
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast(`Файл ${filename} скачан!`);
}

// Toast Alert Helper
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" fill="none" stroke="#ffffff" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

// Floating Back to Top Button Scroll Handler
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// Intercept all internal anchor clicks for smooth scrolling without jump
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#guide-')) return;
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

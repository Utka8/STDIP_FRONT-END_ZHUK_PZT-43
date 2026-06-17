// ===== NOTIFICATION BAR =====
const notifBar = document.getElementById('notificationBar');
const notifClose = document.getElementById('notifClose');
const header = document.getElementById('mainHeader');

function hideNotification() {
  notifBar.style.display = 'none';
  header.classList.add('notif-hidden');
  document.body.classList.add('no-notif');
}

if (notifClose) {
  notifClose.addEventListener('click', hideNotification);
}

// ===== HEADER: transparent → white on scroll =====
function updateHeaderOnScroll() {
  if (!header) return;
  const scrolled = window.scrollY > 10;
  if (scrolled) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
// Run once on load to set correct state
updateHeaderOnScroll();

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isOpen) item.classList.add('active');
  });
});

// ===== FAQ TABS =====
document.querySelectorAll('.faq-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ===== GALLERY TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ===== FEATURES SLIDER (mobile & tablet) =====
function initFeaturesSlider() {
  if (window.innerWidth > 1024) return;
  const grid = document.getElementById('featuresGrid');
  const dotsEl = document.getElementById('featuresDots');
  if (!grid || !dotsEl) return;

  const slides = Array.from(grid.querySelectorAll('.features-slide'));
  const total = slides.length;
  let current = 0;

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    grid.style.transform = `translateX(${-(current * 100)}%)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  buildDots();

  let startX = 0;
  grid.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  grid.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

// ===== TEAM SLIDER (mobile) =====
function initTeamSlider() {
  if (window.innerWidth > 768) return;
  const grid = document.getElementById('teamGrid');
  const dotsEl = document.getElementById('teamDots');
  if (!grid || !dotsEl) return;

  const cards = Array.from(grid.querySelectorAll('.team-card'));
  const total = cards.length;
  let current = 0;

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const w = cards[0] ? cards[0].offsetWidth : 0;
    grid.style.transform = `translateX(${-(current * w)}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  buildDots();

  let startX = 0;
  grid.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  grid.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

// ===== REVIEWS SLIDER =====
function initReviewsSlider() {
  const track = document.getElementById('reviewsTrack');
  const dotsEl = document.getElementById('reviewsDots');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  if (!track || !dotsEl || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll('.review-card'));
  const isMobile = window.innerWidth <= 768;
  const perView = isMobile ? 1 : 2;
  const total = Math.ceil(cards.length / perView);
  let current = isMobile ? 0 : 1;

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const cardW = cards[0] ? cards[0].offsetWidth + 16 : 0;
    track.style.transform = `translateX(${-(current * perView * cardW)}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  buildDots();
  if (!isMobile) goTo(1);

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initFeaturesSlider();
  initTeamSlider();
  initReviewsSlider();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const featGrid = document.getElementById('featuresGrid');
    const teamGrid = document.getElementById('teamGrid');
    if (featGrid) featGrid.style.transform = '';
    if (teamGrid) teamGrid.style.transform = '';
    if (window.innerWidth <= 1024) initFeaturesSlider();
    if (window.innerWidth <= 768) initTeamSlider();
  }, 150);
});

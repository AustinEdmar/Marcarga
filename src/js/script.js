gsap.registerPlugin(ScrollTrigger);

// ===== HERO CAROUSEL =====
(function () {


  const bgSlides = document.querySelectorAll('.hero-slide');
  const dots = document.getElementById('hero-dots');
  const tabs = document.querySelectorAll('.hero-tab');
  const label = document.getElementById('hc-label');
  const title = document.getElementById('hc-title');
  const desc = document.getElementById('hc-desc');
  const btn1 = document.getElementById('hc-btn1');
  const btn2 = document.getElementById('hc-btn2');
  const content = document.getElementById('hc-title').parentElement;

  let current = 0, timer, busy = false;
  const N = SLIDES.length;

  SLIDES.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'hero-dot h-2 rounded-full transition-all duration-300';
    d.style.cssText = `width:${i === 0 ? '28px' : '8px'};background:${i === 0 ? '#f5a623' : 'rgba(255,255,255,0.35)'}`;
    d.addEventListener('click', () => { stopT(); goTo(i); startT(); });
    dots.appendChild(d);
  });

  function setDots(idx) {
    dots.querySelectorAll('.hero-dot').forEach((d, i) => {
      d.style.width = i === idx ? '28px' : '8px';
      d.style.background = i === idx ? '#f5a623' : 'rgba(255,255,255,0.35)';
    });
  }

  function setTabs(idx) {
    tabs.forEach((t, i) => {
      const active = i === idx % 3;
      t.classList.toggle('text-white', active);
      t.classList.toggle('text-white/70', !active);
    });
  }

  function paintContent(idx) {
    const s = SLIDES[idx];
    label.textContent = s.label;
    title.innerHTML = s.titleHtml;
    desc.textContent = s.desc;
    btn1.textContent = s.btn1;
    btn2.textContent = s.btn2;
    setDots(idx);
    setTabs(idx);
  }

  function goTo(next) {
    if (busy || next === current) return;
    busy = true;
    const prev = current;
    current = ((next % N) + N) % N;

    gsap.to(bgSlides[prev], { opacity: 0, duration: 1, ease: 'power2.inOut' });
    gsap.fromTo(bgSlides[current], { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.inOut' });

    gsap.to(content, {
      opacity: 0, y: -18, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        paintContent(current);
        gsap.fromTo(content,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
            onComplete: () => { busy = false; }
          }
        );
      }
    });
  }

  paintContent(0);
  gsap.fromTo(content, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 });

  function startT() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stopT() { clearInterval(timer); }
  startT();

  document.getElementById('hero-next').addEventListener('click', () => { stopT(); goTo(current + 1); startT(); });
  document.getElementById('hero-prev').addEventListener('click', () => { stopT(); goTo(current - 1); startT(); });
  tabs.forEach(t => t.addEventListener('click', () => { const i = +t.dataset.idx; stopT(); goTo(i); startT(); }));

  let tx = 0;
  document.getElementById('hero-section').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  document.getElementById('hero-section').addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) { stopT(); goTo(dx < 0 ? current + 1 : current - 1); startT(); }
  });
})();

// Crane swing
ScrollTrigger.create({
  trigger: '#crane-container',
  start: 'top 90%',
  onEnter: () => {
    gsap.to('#crane-container', { rotationZ: 5, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center' });
    gsap.to('#swinging-box', { rotationZ: -3, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center', delay: 0.1 });
    gsap.fromTo('#crane-container', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' });
  }
});

function scrollAnim(id, delay = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  gsap.fromTo(el,
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.9, delay, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
    }
  );
}

scrollAnim("about-img");
scrollAnim("about-text", 0.15);
scrollAnim("services-title");
scrollAnim("process-title");
scrollAnim("step-1");
scrollAnim("step-2", 0.2);
scrollAnim("step-3", 0.4);
scrollAnim("blog-title");
scrollAnim("blog-1");
scrollAnim("blog-2", 0.15);
scrollAnim("blog-3", 0.3);

// ===== MOVIE-APP CARD DECK =====
const SERVICES = [
  { title: "Transporte Marítimo", sub: "Agenciamento & Frete", icon: "fa-ship", img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&q=80", color: "#1a2a6c" },
  { title: "Transporte Aéreo", sub: "Carga & Logística", icon: "fa-plane", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", color: "#0d47a1" },
  { title: "Transporte Terrestre", sub: "Distribuição Nacional", icon: "fa-truck", img: "https://images.unsplash.com/photo-1519003300449-424ad0405076?w=600&q=80", color: "#1b5e20" },
  { title: "Armazenagem", sub: "Gestão de Stocks", icon: "fa-warehouse", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#4a148c" },
  { title: "Desalfandegamento", sub: "Documentação & Trânsito", icon: "fa-file-contract", img: "https://images.unsplash.com/photo-1609592804168-85dd3c00f2bb?w=600&q=80", color: "#b71c1c" },
];

const stage = document.getElementById('card-stage');
const dotsContainer = document.getElementById('card-dots');
let currentIndex = 0;
let isAnimating = false;
let dragStartX = 0;
let isDragging = false;

const CW = window.innerWidth < 640 ? 220 : 280;
const CH = window.innerWidth < 640 ? 340 : 420;

SERVICES.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'h-2 rounded-full transition-all duration-300 cursor-pointer';
  dot.style.background = i === 0 ? '#f5a623' : '#d1d5db';
  dot.style.width = i === 0 ? '24px' : '8px';
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  const dots = dotsContainer.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].style.background = i === currentIndex ? '#f5a623' : '#d1d5db';
    dots[i].style.width = i === currentIndex ? '24px' : '8px';
  }
}

function buildCard(service) {
  const el = document.createElement('div');
  el.className = 'absolute rounded-3xl overflow-hidden shadow-2xl select-none cursor-grab';
  el.style.cssText = `width:${CW}px; height:${CH}px; will-change:transform;`;
  el.innerHTML = `
    <img src="${service.img}" class="w-full h-full object-cover pointer-events-none" draggable="false">
    <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"></div>
    <div class="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
      <i class="fas ${service.icon} text-white text-sm"></i>
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <p class="text-white/60 text-center text-xs font-semibold uppercase tracking-widest mb-1">${service.sub}</p>
      <h3 class="text-white font-heading font-bold text-xl text-center leading-tight mb-3">${service.title}</h3>
      <button
 onclick="window.location.href='./detail.html'"
 class="mx-auto text-white cursor-pointer text-xs font-bold flex items-center gap-2
 bg-white/20 backdrop-blur px-4 py-2 rounded-full
 border border-white/30 hover:bg-white/30 transition">

 Ver detalhes
 <i class="fas fa-arrow-right text-xs"></i>

</button>
    </div>
  `;
  return el;
}

let cardEls = [];

function getCardProps(relIndex) {
  const abs = Math.abs(relIndex);
  const sign = relIndex === 0 ? 0 : relIndex > 0 ? 1 : -1;
  const xSpread = window.innerWidth < 640 ? 110 : 160;
  const x = sign * xSpread * (abs === 1 ? 1 : abs === 2 ? 1.6 : 2);
  const z = abs === 0 ? 0 : abs === 1 ? -80 : abs === 2 ? -160 : -240;
  const scale = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.72 : 0.6;
  const rotY = sign * (abs === 1 ? 12 : abs === 2 ? 20 : 25);
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.85 : abs === 2 ? 0.6 : 0;
  const zIndex = 100 - abs * 10;
  const brightness = abs === 0 ? 1 : 1 - abs * 0.12;
  return { x, z, scale, rotY, opacity, zIndex, brightness };
}

function applyProps(el, props, duration = 0.55, ease = "power3.out") {
  gsap.to(el, { x: props.x, z: props.z, scale: props.scale, rotateY: props.rotY, opacity: props.opacity, duration, ease, filter: `brightness(${props.brightness})`, zIndex: props.zIndex });
}

function initCards() {
  stage.innerHTML = '';
  cardEls = [];
  const n = SERVICES.length;
  for (let i = 0; i < n; i++) {
    const card = buildCard(SERVICES[i]);
    stage.appendChild(card);
    cardEls.push(card);
    const rel = ((i - currentIndex) + n) % n;
    const relSigned = rel > n / 2 ? rel - n : rel;
    const props = getCardProps(relSigned);
    gsap.set(card, { x: props.x, z: props.z, scale: props.scale, rotateY: props.rotY, opacity: props.opacity, zIndex: props.zIndex, filter: `brightness(${props.brightness})` });
    card.addEventListener('mousedown', onDragStart);
    card.addEventListener('touchstart', onDragStart, { passive: true });
  }
}

function layoutCards(animate = true) {
  const n = SERVICES.length;
  for (let i = 0; i < n; i++) {
    const rel = ((i - currentIndex) + n) % n;
    const relSigned = rel > n / 2 ? rel - n : rel;
    const props = getCardProps(relSigned);
    if (animate) {
      applyProps(cardEls[i], props);
    } else {
      gsap.set(cardEls[i], { x: props.x, z: props.z, scale: props.scale, rotateY: props.rotY, opacity: props.opacity, zIndex: props.zIndex, filter: `brightness(${props.brightness})` });
    }
  }
  updateDots();
}

function goTo(index) {
  if (isAnimating) return;
  isAnimating = true;
  currentIndex = ((index % SERVICES.length) + SERVICES.length) % SERVICES.length;
  layoutCards(true);
  setTimeout(() => { isAnimating = false; }, 600);
}

function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

document.getElementById('next-card').addEventListener('click', next);
document.getElementById('prev-card').addEventListener('click', prev);

function onDragStart(e) {
  isDragging = true;
  dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchmove', onDragMove, { passive: true });
  document.addEventListener('touchend', onDragEnd);
}

function onDragMove(e) {
  if (!isDragging) return;
  const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const delta = x - dragStartX;
  gsap.set(cardEls[currentIndex], { x: delta * 0.4 });
}

function onDragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  const x = e.type === 'touchend' ? (e.changedTouches[0]?.clientX || dragStartX) : e.clientX;
  const delta = x - dragStartX;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  document.removeEventListener('touchmove', onDragMove);
  document.removeEventListener('touchend', onDragEnd);
  if (Math.abs(delta) > 60) { if (delta < 0) next(); else prev(); }
  else { layoutCards(true); }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

let autoPlay = setInterval(next, 3500);
stage.addEventListener('mouseenter', () => clearInterval(autoPlay));
stage.addEventListener('mouseleave', () => { autoPlay = setInterval(next, 3500); });

ScrollTrigger.create({
  trigger: '#services-section',
  start: 'top 70%',
  onEnter: () => {
    initCards();
    gsap.fromTo(stage, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
  }
});

// Navbar scroll effect


// Mobile menu
const menu = document.querySelector("#fullscreenMenu");
const links = document.querySelectorAll(".menuLink");
const hamburger = document.querySelector("#hamburger");
const closeIcon = document.querySelector("#closeIcon");
let open = false;

const tl = gsap.timeline({ paused: true });
tl.to(menu, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power3.out" })
  .from(links, { y: 100, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" }, "-=0.3");

document.querySelector("#menuBtn").addEventListener("click", () => {
  if (!open) {
    tl.play();
    gsap.to(hamburger, { opacity: 0, rotate: 90, duration: 0.3 });
    gsap.to(closeIcon, { opacity: 1, rotate: 0, duration: 0.3 });
    open = true;
  } else {
    tl.reverse();
    gsap.to(hamburger, { opacity: 1, rotate: 0, duration: 0.3 });
    gsap.to(closeIcon, { opacity: 0, rotate: -90, duration: 0.3 });
    open = false;
  }
});
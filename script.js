const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

/* =========================
   EDITÁ TODO ACÁ
   ========================= */
const CONFIG = {
  heroTitle: "Para vos, mi amor 🎄❤️",
  heroSubtitle: "Quería regalarte algo distinto… hecho por mí, con todo lo que siento por vos.",
  relationshipStart: "2025-02-13T00:00:00-03:00",
  datingStart: "2025-05-24T00:00:00-03:00",
  videoUnlockWord: "pana",
  videoUnlockStorageKey: "navidad_video_unlocked",
  video: {
    youtubeId: "dQw4w9WgXcQ" // <-- CAMBIAR (ID de YouTube)
  }
};

const TIMELINE = [
  { date: "Etapa 1", title: "Recuerdo 1", desc: "", media: "img/etapa1.mp4" },
  { date: "Etapa 2", title: "Recuerdo 2", desc: "", media: "img/etapa2.jpeg" },
  { date: "Etapa 3", title: "Recuerdo 3", desc: "", media: "img/etapa3.mp4" },
  { date: "Etapa 4", title: "Recuerdo 4", desc: "", media: "img/etapa4.jpeg" },
  { date: "Etapa 5", title: "Recuerdo 5", desc: "", media: "img/imagen 7.jpeg" },
  { date: "Etapa 6", title: "Recuerdo 6", desc: "", media: "img/etapa6.jpeg" },
  { date: "Etapa 7", title: "Recuerdo 7", desc: "", media: "img/Imagen13.jpeg" },
];

const GALLERY = [
  { src: "img/g1.jpg", title: "Nosotros", caption: "Un pie de foto tierno." },
  { src: "img/g2.jpg", title: "Ese día", caption: "Otro mini recuerdo." },
  { src: "img/g3.jpg", title: "Tu sonrisa", caption: "La mejor del mundo." },
  { src: "img/g4.jpg", title: "Momento", caption: "Que no olvido." },
];

const DEDICATIONS = [
  { text: "Si tuviera que elegir un lugar en el mundo, te elegiría a vos.", meta: "— siempre" },
  { text: "Gracias por hacerme sentir en casa.", meta: "— mi lugar seguro" },
  { text: "Sos mi parte favorita del día.", meta: "— todos los días" },
  { text: "Te amo en lo simple y en lo grande.", meta: "— ❤️" },
];

const SONG_QUOTES = [
  { text: "“[Tu frase de canción acá]”", meta: "Canción — Artista" },
  { text: "“[Tu frase de canción acá]”", meta: "Canción — Artista" },
];

const GOALS_2026 = [
  { id: "g1", title: "Un viaje juntos", desc: "Un destino que nos ilusione.", icon: "icon-plane" },
  { id: "g2", title: "Más recuerdos", desc: "Fotos, risas, abrazos.", icon: "icon-camera" },
  { id: "g3", title: "Cuidarnos siempre", desc: "Estar del mismo lado.", icon: "icon-heart" },
  { id: "g4", title: "Cumplir un sueño", desc: "Algo importante para nosotros.", icon: "icon-target" },
];

/* =========================
   DOM refs
   ========================= */
const startBtn = $("#startBtn");
const previewBtn = $("#previewBtn");
const typeTitle = $("#typeTitle");
const heroSub = $("#heroSub");

const bgMusic = $("#bgMusic");
const musicBtn = $("#musicBtn");
const musicLabel = $("#musicLabel");
const musicIcon = $("#musicIcon");
const heroMusicBtn = $("#heroMusicBtn");
const heroMusicIcon = $("#heroMusicIcon");
const heroMusicSub = $("#heroMusicSub");
const musicCard = $("#musicCard");

const progressBar = $("#progressBar");
const btnHelp = $("#btnHelp");
const btnScrollTop = $("#btnScrollTop");

const timelineItems = $("#timelineItems");
const galleryGrid = $("#galleryGrid");
const galleryModal = $("#galleryModal");
const galleryImage = $("#galleryImage");
const galleryTitle = $("#galleryTitle");
const galleryCaption = $("#galleryCaption");
const prevPhoto = $("#prevPhoto");
const nextPhoto = $("#nextPhoto");

const videoEmbed = $("#videoEmbed");
const videoGate = $("#videoGate");
const gateInput = $("#gateInput");
const gateBtn = $("#gateBtn");
const gateError = $("#gateError");
const gateHint = $("#gateHint");

const daysCountMet = $("#daysCountMet");
const sinceDateMet = $("#sinceDateMet");
const timeBreakdownMet = $("#timeBreakdownMet");
const daysCountDating = $("#daysCountDating");
const sinceDateDating = $("#sinceDateDating");
const timeBreakdownDating = $("#timeBreakdownDating");

const dedicationText = $("#dedicationText");
const dedicationMeta = $("#dedicationMeta");
const dedPrev = $("#dedPrev");
const dedNext = $("#dedNext");
const dedDots = $("#dedDots");

const songText = $("#songText");
const songMeta = $("#songMeta");
const songPrev = $("#songPrev");
const songNext = $("#songNext");
const songDots = $("#songDots");

const goalsGrid = $("#goalsGrid");
const resetGoals = $("#resetGoals");

const btnYes = $("#btnYes");
const btnObvio = $("#btnObvio");
const finalMessage = $("#finalMessage");
const footer = $(".footer");

/* state */
let started = false;
let musicOn = false;
let galleryIndex = 0;
let dedIndex = 0;
let songIndex = 0;
let stepsEnabled = false;
let stepSections = [];
let maxUnlockedIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  heroSub.textContent = CONFIG.heroSubtitle;
  typeWriter(typeTitle, CONFIG.heroTitle, 30);

  updateMusicUI(false);
  setupStepLock();
  setupStepButtons();
  setupReveal();
  setupHUD();
  setupModals();

  buildTimeline();
  buildGallery();
  initVideoGate();
  initCounter();

  initCarousel("ded");
  setDed(0);

  initCarousel("song");
  setSong(0);

  buildGoals();
  setupFinale();

  setupSnow();
  setupConfetti();
  attemptAutoplay();

  startBtn.addEventListener("click", () => {
    started = true;
    enableStepUnlock();
    safePlayMusic();
    smoothGoTo("#s2");
  });

  if (previewBtn){
    previewBtn.addEventListener("click", () => {
      enableStepUnlock();
      smoothGoTo("#s2");
    });
  }

  musicBtn.addEventListener("click", () => {
    if (!started) started = true;
    toggleMusic();
  });
  if (heroMusicBtn){
    heroMusicBtn.addEventListener("click", () => {
      if (!started) started = true;
      toggleMusic();
    });
  }

  btnScrollTop.addEventListener("click", () => smoothGoTo("#s1"));
  btnHelp.addEventListener("click", () => openModal("helpModal"));

  prevPhoto.addEventListener("click", () => openPhoto(galleryIndex - 1));
  nextPhoto.addEventListener("click", () => openPhoto(galleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".modal.show").forEach(m => m.classList.remove("show"));
    }
    if (galleryModal && galleryModal.classList.contains("show")) {
      if (e.key === "ArrowLeft") openPhoto(galleryIndex - 1);
      if (e.key === "ArrowRight") openPhoto(galleryIndex + 1);
    }
  });
});

/* Typewriter */
function typeWriter(el, text, speed=28){
  el.textContent = "";
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) requestAnimationFrame(() => setTimeout(tick, speed));
  };
  tick();
}

/* Reveal */
function setupReveal(){
  const io = new IntersectionObserver((entries)=>{
    for (const e of entries){
      if (e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.14 });

  $$(".reveal").forEach(el => io.observe(el));
}

/* HUD progress */
function setupHUD(){
  window.addEventListener("scroll", () => updateProgress(), { passive:true });
  updateProgress();
}
function updateProgress(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  if (progressBar) progressBar.style.width = `${pct}%`;
}
function smoothGoTo(selector){
  const el = $(selector);
  if (!el) return;
  if (el.hasAttribute("hidden")) return;
  el.scrollIntoView({ behavior:"smooth", block:"start" });
}

/* Step lock */
function setupStepLock(){
  stepSections = $$(".section");
  if (!stepSections.length) return;

  maxUnlockedIndex = 0;
  stepSections.forEach((section, idx) => {
    if (idx > 0) setSectionLocked(section, true);
  });
  setFooterLocked(true);
}

function setupStepButtons(){
  const buttons = $$(".section-next");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!stepsEnabled) stepsEnabled = true;
      const target = btn.dataset.next;
      if (target) unlockTo(target);
      else unlockNextStep();
      if (target) smoothGoTo(target);
    });
  });
}

function unlockTo(selector){
  const target = $(selector);
  if (!target) return;
  const idx = stepSections.indexOf(target);
  if (idx === -1) return;
  while (maxUnlockedIndex < idx){
    unlockNextStep();
  }
}

function enableStepUnlock(){
  if (stepsEnabled) return;
  stepsEnabled = true;
  unlockNextStep();
}

function unlockNextStep(){
  if (maxUnlockedIndex >= stepSections.length - 1) return;
  maxUnlockedIndex += 1;
  setSectionLocked(stepSections[maxUnlockedIndex], false);
  if (maxUnlockedIndex >= stepSections.length - 1) setFooterLocked(false);
  updateProgress();
}

function setSectionLocked(section, locked){
  if (!section) return;
  section.toggleAttribute("hidden", locked);
  section.setAttribute("aria-hidden", locked ? "true" : "false");
}

function setFooterLocked(locked){
  if (!footer) return;
  footer.toggleAttribute("hidden", locked);
  footer.setAttribute("aria-hidden", locked ? "true" : "false");
}

/* Modals */
function setupModals(){
  document.addEventListener("click", (e) => {
    const closeId = e.target?.dataset?.close;
    if (closeId) closeModal(closeId);
  });
}
function openModal(id){
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add("show");
  m.setAttribute("aria-hidden", "false");
}
function closeModal(id){
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove("show");
  m.setAttribute("aria-hidden", "true");
}

/* Timeline */
function buildTimeline(){
  if (!timelineItems) return;
  timelineItems.innerHTML = "";
  TIMELINE.forEach((item, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    const wrap = document.createElement("div");
    wrap.className = `titem ${side} reveal`;

    const blank = document.createElement("div");
    blank.className = "tblank";
    wrap.appendChild(blank);

    const mid = document.createElement("div");
    mid.className = "tmid";
    mid.innerHTML = `<div class="tdot"></div>`;
    wrap.appendChild(mid);

    const card = document.createElement("div");
    card.className = "tcard";
    const mediaSrc = item.media || item.img || "";
    const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaSrc);
    const safeTitle = escapeHtml(item.title);
    const safeDate = escapeHtml(item.date);
    const safeDesc = escapeHtml(item.desc);

    const mediaHtml = isVideo
      ? `<video src="${mediaSrc}" muted loop autoplay playsinline></video>`
      : `
        <img src="${mediaSrc}" alt="${safeTitle}"
          onerror="this.style.display='none'; this.parentElement.style.background='rgba(1,17,38,.06)';"
        />
      `;

    card.innerHTML = `
      ${item.date ? `<div class="tdate">${safeDate}</div>` : ""}
      ${item.title ? `<div class="ttitle">${safeTitle}</div>` : ""}
      ${item.desc ? `<p class="tdesc">${safeDesc}</p>` : ""}
      <div class="timg">
        ${mediaHtml}
      </div>
    `;
    wrap.appendChild(card);

    timelineItems.appendChild(wrap);
  });

  setupReveal();
}

/* Gallery */
function buildGallery(){
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  GALLERY.forEach((ph, idx) => {
    const div = document.createElement("div");
    div.className = "gitem";
    div.innerHTML = `
      <img src="${ph.src}" alt="${escapeHtml(ph.title)}"
        onerror="this.style.display='none'; this.parentElement.style.background='rgba(255,255,255,.78)';"
      />
      <div class="gcap">${escapeHtml(ph.title)}</div>
    `;
    div.addEventListener("click", () => openPhoto(idx));
    galleryGrid.appendChild(div);
  });
}
function openPhoto(i){
  if (!GALLERY.length || !galleryModal) return;
  galleryIndex = (i + GALLERY.length) % GALLERY.length;
  const ph = GALLERY[galleryIndex];

  if (galleryTitle) galleryTitle.textContent = ph.title || "Foto";
  if (galleryCaption) galleryCaption.textContent = ph.caption || "";
  if (galleryImage){
    galleryImage.src = ph.src || "";
    galleryImage.onerror = () => {
      galleryImage.removeAttribute("src");
      galleryImage.alt = "Agregá tu foto en img/";
    };
  }

  openModal("galleryModal");
}

/* Video: se inserta solo cuando desbloquea */
function buildVideo(){
  const id = String(CONFIG.video.youtubeId || "").trim();
  const src = `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1`;
  videoEmbed.innerHTML = `
    <iframe
      src="${src}"
      title="Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  // bajar música cuando está encima del video
  videoEmbed.addEventListener("mouseenter", () => setMusicVolume(.25));
  videoEmbed.addEventListener("mouseleave", () => setMusicVolume(.85));
}

/* =========================
   VIDEO GATE (ADIVINANZA)
   palabra: "pana" (case-insensitive)
   ========================= */
function initVideoGate(){
  const unlocked = localStorage.getItem(CONFIG.videoUnlockStorageKey) === "1";

  if (unlocked){
    unlockVideoUI(true);
    return;
  }

  lockVideoUI();

  const tryUnlock = () => {
    const guess = normalizeWord(gateInput.value);
    const target = normalizeWord(CONFIG.videoUnlockWord);

    if (guess === target){
      localStorage.setItem(CONFIG.videoUnlockStorageKey, "1");

      gateError.textContent = "¡Sii! Desbloqueado 💖";
      gateError.style.color = "rgba(1,17,38,.82)";

      fireConfetti(160);
      unlockVideoUI(false);

      if (!musicOn) safePlayMusic();
      setMusicVolume(.85);

      setTimeout(() => (gateError.textContent = ""), 1600);
    } else {
      gateError.textContent = "Mmm… esa no 😅 Probá de nuevo.";
      gateError.style.color = "rgba(242,75,89,.95)";
      gateInput.focus();
      gateInput.select();
    }
  };

  gateBtn.addEventListener("click", tryUnlock);
  gateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
}

function lockVideoUI(){
  if (videoGate) videoGate.style.display = "block";
  if (videoEmbed){
    videoEmbed.classList.add("video--locked");
    videoEmbed.innerHTML = "";
  }
}

function unlockVideoUI(skipMessage){
  if (videoGate) videoGate.style.display = "none";
  if (videoEmbed) videoEmbed.classList.remove("video--locked");

  buildVideo();

  if (!skipMessage){
    setMusicVolume(.35);
    setTimeout(() => setMusicVolume(.85), 2500);
  }
}

/* Normaliza: ignora mayúsc/minúsc y espacios */
function normalizeWord(s){
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

/* Counter */
function initCounter(){
  const counters = [
    {
      start: new Date(CONFIG.relationshipStart),
      daysEl: daysCountMet,
      sinceEl: sinceDateMet,
      timeEl: timeBreakdownMet
    },
    {
      start: new Date(CONFIG.datingStart),
      daysEl: daysCountDating,
      sinceEl: sinceDateDating,
      timeEl: timeBreakdownDating
    }
  ];

  counters.forEach((c) => {
    if (c.sinceEl) c.sinceEl.textContent = fmtDate(c.start);
  });

  const tick = () => {
    const now = new Date();

    counters.forEach((c) => {
      if (!c.start) return;
      const diff = Math.max(0, now - c.start);
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const hoursLabel = hours === 1 ? "hora" : "horas";

      if (c.daysEl) animateNumber(c.daysEl, days, 650);
      if (c.timeEl){
        c.timeEl.textContent = `${hours} ${hoursLabel}`;
      }
    });

    requestAnimationFrame(() => setTimeout(tick, 1200));
  };
  tick();
}
function animateNumber(el, to, duration=600){
  const from = Number(el.dataset.n || "0");
  const start = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - start) / duration);
    const v = Math.round(from + (to - from) * easeOutCubic(p));
    el.textContent = v.toLocaleString("es-AR");
    if (p < 1) requestAnimationFrame(step);
    else el.dataset.n = String(to);
  };
  requestAnimationFrame(step);
}
function easeOutCubic(x){ return 1 - Math.pow(1-x, 3); }

/* Carousels */
function initCarousel(type){
  if (type === "ded"){
    dedDots.innerHTML = "";
    DEDICATIONS.forEach((_, i) => dedDots.appendChild(makeDot(() => setDed(i))));
    dedPrev.addEventListener("click", () => setDed(dedIndex - 1));
    dedNext.addEventListener("click", () => setDed(dedIndex + 1));
  } else {
    songDots.innerHTML = "";
    SONG_QUOTES.forEach((_, i) => songDots.appendChild(makeDot(() => setSong(i))));
    songPrev.addEventListener("click", () => setSong(songIndex - 1));
    songNext.addEventListener("click", () => setSong(songIndex + 1));
  }
}
function makeDot(onClick){
  const d = document.createElement("button");
  d.className = "cdot";
  d.type = "button";
  d.addEventListener("click", onClick);
  return d;
}
function setDed(i){
  if (!DEDICATIONS.length) return;
  dedIndex = (i + DEDICATIONS.length) % DEDICATIONS.length;
  const item = DEDICATIONS[dedIndex];
  swapText(dedicationText, item.text);
  swapText(dedicationMeta, item.meta);
  updateDots(dedDots, dedIndex);
}
function setSong(i){
  if (!SONG_QUOTES.length) return;
  songIndex = (i + SONG_QUOTES.length) % SONG_QUOTES.length;
  const item = SONG_QUOTES[songIndex];
  swapText(songText, item.text);
  swapText(songMeta, item.meta);
  updateDots(songDots, songIndex);
}
function updateDots(el, idx){
  $$(".cdot", el).forEach((d, i) => d.classList.toggle("active", i === idx));
}
function swapText(el, text){
  if (!el) return;
  el.animate(
    [{opacity:1, transform:"translateY(0px)", filter:"blur(0)"},
     {opacity:0, transform:"translateY(8px)", filter:"blur(2px)"}],
    {duration:170, easing:"cubic-bezier(.2,.8,.2,1)"}
  ).onfinish = () => {
    el.textContent = text;
    el.animate(
      [{opacity:0, transform:"translateY(-6px)", filter:"blur(2px)"},
       {opacity:1, transform:"translateY(0px)", filter:"blur(0)"}],
      {duration:280, easing:"cubic-bezier(.2,.8,.2,1)"}
    );
  };
}

/* Goals */
function buildGoals(){
  const key = "navidad_goals_2026";
  const saved = safeJSON(localStorage.getItem(key)) || {};

  goalsGrid.innerHTML = "";
  GOALS_2026.forEach(g => {
    const card = document.createElement("div");
    const checked = !!saved[g.id];
    card.className = `goal ${checked ? "checked" : ""}`;
    card.dataset.id = g.id;

    card.innerHTML = `
      <div class="gicon">
        <svg class="icon"><use href="img/icons/sprite.svg#${g.icon}"></use></svg>
      </div>
      <div class="gtxt">
        <p class="title">${escapeHtml(g.title)}</p>
        <p class="desc">${escapeHtml(g.desc)}</p>
      </div>
      <div class="check">
        <svg class="icon"><use href="img/icons/sprite.svg#icon-check"></use></svg>
      </div>
    `;

    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const nowChecked = !card.classList.contains("checked");
      card.classList.toggle("checked", nowChecked);
      saved[id] = nowChecked;
      localStorage.setItem(key, JSON.stringify(saved));
    });

    goalsGrid.appendChild(card);
  });

  resetGoals.addEventListener("click", () => {
    localStorage.removeItem(key);
    buildGoals();
  });
}
function safeJSON(s){ try { return JSON.parse(s); } catch { return null; } }

/* Finale */
function setupFinale(){
  const onChoose = () => {
    finalMessage.textContent = "Te amo. Gracias por existir en mi vida. 🎄❤️";
    fireConfetti(180);
    if (!musicOn) safePlayMusic();
    setMusicVolume(.95);
  };
  btnYes.addEventListener("click", onChoose);
  btnObvio.addEventListener("click", onChoose);
}

/* Music */
function safePlayMusic(){
  if (musicOn) return;
  toggleMusic(true);
}

function attemptAutoplay(){
  if (!bgMusic) return;
  safePlayMusic();
  const resume = () => {
    if (!musicOn) safePlayMusic();
  };
  window.addEventListener("pointerdown", resume, { once: true });
  window.addEventListener("keydown", resume, { once: true });
}

function updateMusicUI(isOn){
  if (musicLabel) musicLabel.textContent = isOn ? "Reproduciendo" : "Pausado";
  if (musicIcon){
    const use = musicIcon.querySelector("use");
    if (use) use.setAttribute("href", `img/icons/sprite.svg#icon-${isOn ? "pause" : "play"}`);
  }
  if (heroMusicSub) heroMusicSub.textContent = isOn ? "Reproduciendo" : "Tocá para reproducir";
  if (heroMusicIcon){
    const use = heroMusicIcon.querySelector("use");
    if (use) use.setAttribute("href", `img/icons/sprite.svg#icon-${isOn ? "pause" : "play"}`);
  }
  if (musicCard) musicCard.classList.toggle("is-playing", isOn);
}

function toggleMusic(forceOn=null){
  const wantOn = forceOn === null ? !musicOn : forceOn;

  if (wantOn){
    bgMusic.volume = 0;
    bgMusic.play()
      .then(() => {
        musicOn = true;
        updateMusicUI(true);
        fadeAudio(bgMusic, 0.0, 0.85, 850);
      })
      .catch(() => {
        musicOn = false;
        updateMusicUI(false);
      });
  } else {
    musicOn = false;
    updateMusicUI(false);
    fadeAudio(bgMusic, bgMusic.volume, 0.0, 450, () => bgMusic.pause());
  }
}
function setMusicVolume(v){
  if (!musicOn) return;
  bgMusic.volume = Math.max(0, Math.min(1, v));
}
function fadeAudio(audio, from, to, ms, cb){
  const start = performance.now();
  const step = (t) => {
    const p = Math.min(1, (t - start) / ms);
    audio.volume = from + (to - from) * easeOutCubic(p);
    if (p < 1) requestAnimationFrame(step);
    else if (cb) cb();
  };
  requestAnimationFrame(step);
}

/* Snow (canvas) */
let snowCtx, snowFlakes = [];
function setupSnow(){
  const c = $("#snow");
  if (!c) return;
  snowCtx = c.getContext("2d");
  resizeCanvas(c);
  window.addEventListener("resize", () => resizeCanvas(c));

  snowFlakes = Array.from({length: 110}, () => makeFlake());
  requestAnimationFrame(snowLoop);
}
function resizeCanvas(c){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.floor(window.innerWidth * dpr);
  c.height = Math.floor(window.innerHeight * dpr);
  c.style.width = "100%";
  c.style.height = "100%";
  snowCtx.setTransform(dpr,0,0,dpr,0,0);
}
function makeFlake(){
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 0.8 + Math.random() * 2.4,
    s: 0.35 + Math.random() * 1.15,
    a: 0.22 + Math.random() * 0.45,
    w: (Math.random() - 0.5) * 0.7
  };
}
function snowLoop(){
  snowCtx.clearRect(0,0,window.innerWidth, window.innerHeight);
  for (const f of snowFlakes){
    f.y += f.s;
    f.x += f.w;

    if (f.y > window.innerHeight + 10) { f.y = -10; f.x = Math.random()*window.innerWidth; }
    if (f.x < -10) f.x = window.innerWidth + 10;
    if (f.x > window.innerWidth + 10) f.x = -10;

    snowCtx.globalAlpha = f.a;
    snowCtx.beginPath();
    snowCtx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    snowCtx.fillStyle = "white";
    snowCtx.fill();
  }
  requestAnimationFrame(snowLoop);
}

/* Confetti (canvas) */
let confCtx, confetti = [];
function setupConfetti(){
  const c = $("#confetti");
  if (!c) return;
  confCtx = c.getContext("2d");
  resizeConfetti(c);
  window.addEventListener("resize", () => resizeConfetti(c));
  requestAnimationFrame(confettiLoop);
}
function resizeConfetti(c){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.floor(window.innerWidth * dpr);
  c.height = Math.floor(window.innerHeight * dpr);
  c.style.width = "100%";
  c.style.height = "100%";
  confCtx.setTransform(dpr,0,0,dpr,0,0);
}
function fireConfetti(amount=140){
  const canvas = $("#confetti");
  if (canvas) canvas.style.opacity = "1";

  const colors = ["#F24B59","#F2AB6D","#F2845C","#ffffff","#ffd9d9"];

  for (let i=0;i<amount;i++){
    confetti.push({
      x: window.innerWidth/2,
      y: window.innerHeight*0.25,
      vx: (Math.random()-0.5)*10,
      vy: - (5 + Math.random()*8),
      g: 0.25 + Math.random()*0.25,
      r: 2 + Math.random()*4,
      a: 0.9,
      rot: Math.random()*Math.PI,
      vr: (Math.random()-0.5)*0.3,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }

  setTimeout(() => { if (canvas) canvas.style.opacity = "0"; }, 1200);
}
function confettiLoop(){
  confCtx.clearRect(0,0,window.innerWidth, window.innerHeight);

  for (let i=confetti.length-1; i>=0; i--){
    const p = confetti[i];
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.a -= 0.008;

    confCtx.globalAlpha = Math.max(0, p.a);
    confCtx.save();
    confCtx.translate(p.x, p.y);
    confCtx.rotate(p.rot);
    confCtx.fillStyle = p.color;
    confCtx.fillRect(-p.r, -p.r, p.r*2, p.r*2);
    confCtx.restore();

    if (p.a <= 0 || p.y > window.innerHeight + 30) confetti.splice(i, 1);
  }
  requestAnimationFrame(confettiLoop);
}

/* Utils */
function fmtDate(d){
  const dd = String(d.getDate()).padStart(2,"0");
  const mm = String(d.getMonth()+1).padStart(2,"0");
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

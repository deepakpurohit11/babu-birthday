// ═══════════════════════════════════════════════════════════════
//  ANNIVERSARY WEBSITE — script.js
// ═══════════════════════════════════════════════════════════════

// ── 1. SECTION NAVIGATION ───────────────────────────────────────
const sections = ['s-landing','s-galaxy','s-letter','s-photos','s-finale'];
let currentSection = 's-landing';

function goTo(id) {
  document.getElementById(currentSection).classList.remove('active');
  document.getElementById(id).classList.add('active');
  currentSection = id;
  if (id === 's-galaxy')  initGalaxy();
  if (id === 's-letter')  initLetter();
  if (id === 's-finale')  initFireworks();
}

// ── 2. COUNTDOWN TIMER (March 19) ──────────────────────────────
function updateCountdown() {
  const now      = new Date();
  const year     = (now.getMonth() > 2 || (now.getMonth() === 2 && now.getDate() > 19))
                    ? now.getFullYear() + 1
                    : now.getFullYear();
  const target   = new Date(year, 2, 19, 0, 0, 0); // March 19
  const diff     = target - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '00');
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── 3. STAR BACKGROUND ──────────────────────────────────────────
function drawStarBg(canvasId) {
  const c = document.getElementById(canvasId);
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx.clearRect(0, 0, c.width, c.height);
  for (let i = 0; i < 220; i++) {
    const x  = Math.random() * c.width;
    const y  = Math.random() * c.height;
    const r  = Math.random() * 1.4;
    const op = 0.2 + Math.random() * 0.7;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,230,240,${op})`;
    ctx.fill();
  }
}
['starsCanvas1','starsCanvas2','starsCanvas3'].forEach(drawStarBg);
window.addEventListener('resize', () => ['starsCanvas1','starsCanvas2','starsCanvas3'].forEach(drawStarBg));

// ── 4. GALAXY ────────────────────────────────────────────────────
let galaxyInit = false;
function initGalaxy() {
  if (galaxyInit) return;
  galaxyInit = true;

  const c   = document.getElementById('galaxyCanvas');
  const ctx = c.getContext('2d');
  c.width   = window.innerWidth;
  c.height  = window.innerHeight;

  const bg = ctx.createRadialGradient(c.width/2, c.height/2, 0, c.width/2, c.height/2, c.width*.8);
  bg.addColorStop(0, '#12002a');
  bg.addColorStop(1, '#020008');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, c.width, c.height);

  for (let n = 0; n < 4; n++) {
    const nx = Math.random() * c.width;
    const ny = Math.random() * c.height;
    const nr = 150 + Math.random() * 200;
    const nb = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    const colors = ['rgba(201,24,74,','rgba(100,0,150,','rgba(255,77,109,','rgba(50,0,100,'];
    nb.addColorStop(0, colors[n % colors.length] + '0.12)');
    nb.addColorStop(1, 'transparent');
    ctx.fillStyle = nb;
    ctx.fillRect(0, 0, c.width, c.height);
  }

  for (let i = 0; i < 350; i++) {
    const x  = Math.random() * c.width;
    const y  = Math.random() * c.height;
    const r  = Math.random() * 1.2;
    const op = 0.3 + Math.random() * 0.7;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,220,240,${op})`;
    ctx.fill();
  }

  placeStars();
}

const reasons = [
  "She is the perfect girl",
  "She is such a cutiepie",
  "She is beautiful internally and externally",
  "She makes even my worst days feel lighter",
  "The way she cares about me without even trying",
  "She understands me in ways no one else does",
  "Her smile can literally fix my mood instantly",
  "She makes small moments feel special",
  "She believes in me even when I doubt myself",
  "Being with her feels like home"
];

function placeStars() {
  const field  = document.getElementById('starsField');
  field.innerHTML = '';
  const glyphs = ['★','✦','✶','✸','✺','❋','✷','✹','✵','✴'];
  const margin = 12;
  const positions = [];
  let attempts = 0;
  while (positions.length < 10 && attempts < 500) {
    attempts++;
    const x = margin + Math.random() * (100 - margin * 2);
    const y = 18 + Math.random() * 74;
    if (y < 22) continue;
    const tooClose = positions.some(p => Math.hypot(p.x - x, p.y - y) < 12);
    if (tooClose) continue;
    positions.push({x, y});
  }

  positions.forEach((pos, i) => {
    const btn = document.createElement('button');
    btn.className = 'star-btn';
    btn.style.left = pos.x + '%';
    btn.style.top  = pos.y + '%';
    btn.innerHTML  = `
      <span class="star-inner">
        <span class="star-glyph">${glyphs[i]}</span>
        <span class="star-num">${String(i+1).padStart(2,'0')}</span>
      </span>`;
    btn.addEventListener('click', () => openReason(i, btn));
    field.appendChild(btn);
  });
}

function openReason(i, btn) {
  btn.classList.add('discovered');
  document.getElementById('reasonNum').textContent  = 'reason ' + String(i+1).padStart(2,'0');
  document.getElementById('reasonText').textContent = reasons[i];
  document.getElementById('reasonPopup').classList.add('open');
}
function closeReason() {
  document.getElementById('reasonPopup').classList.remove('open');
}

// ── 5. LOVE LETTER ───────────────────────────────────────────────
const letterText = `Today marks something truly magical — another year of us, another year of the most beautiful story I never knew I'd get to be a part of.

Being with you has shown me what it really means to love someone. Not just on the big days, but in the quiet ordinary ones — the random messages, the small laughs, the moments where it's just you and me against the whole world.

You have loved me through my best and my worst, and somehow you make me want to become better every single day. That's not something everyone gets. I am so lucky that I get it with you.

On this anniversary, I want you to know — I would choose you again and again, in every version of my life, in every universe that ever exists.

Happy Anniversary, My Babu. You are my greatest adventure. ❤️`;

let letterDone = false;
function initLetter() {
  if (letterDone) return;
  letterDone = true;

  const el = document.getElementById('letterBody');
  el.innerHTML = '<span class="cursor"></span>';
  let i = 0;

  function type() {
    if (i < letterText.length) {
      const char   = letterText[i];
      const cursor = el.querySelector('.cursor');
      if (char === '\n') {
        cursor.insertAdjacentHTML('beforebegin', '<br/>');
      } else {
        cursor.before(document.createTextNode(char));
      }
      i++;
      setTimeout(type, char === '.' || char === ',' ? 60 : 22);
    } else {
      el.querySelector('.cursor')?.remove();
    }
  }
  setTimeout(type, 600);
}

// ── 6. FIREWORKS ─────────────────────────────────────────────────
let fireworksRunning = false;
function initFireworks() {
  if (fireworksRunning) return;
  fireworksRunning = true;

  const c   = document.getElementById('fireworksCanvas');
  const ctx = c.getContext('2d');
  c.width   = window.innerWidth;
  c.height  = window.innerHeight;

  const particles = [];

  function Firework(x, y) {
    const hue    = Math.random() * 60 - 30;
    const count  = 80 + Math.floor(Math.random() * 60);
    const colors = [
      `hsl(${340 + hue},100%,65%)`,
      `hsl(${355 + hue},100%,75%)`,
      `hsl(40,100%,80%)`,
      `hsl(${320 + hue},80%,75%)`,
    ];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 2,
        decay: 0.012 + Math.random() * 0.01,
        gravity: 0.08,
      });
    }
  }

  function launch() {
    const x = 0.15 * c.width + Math.random() * c.width * 0.7;
    const y = 0.1  * c.height + Math.random() * c.height * 0.5;
    Firework(x, y);
  }

  let frameCount = 0;
  function animate() {
    if (!fireworksRunning) return;
    requestAnimationFrame(animate);
    frameCount++;
    ctx.fillStyle = 'rgba(7,0,15,0.18)';
    ctx.fillRect(0, 0, c.width, c.height);
    if (frameCount % 38 === 0) launch();
    if (frameCount % 70 === 0) launch();
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.alpha -= p.decay;
      if (p.alpha <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  for (let i = 0; i < 5; i++) setTimeout(launch, i * 300);
  animate();
}

// ── 7. GLOBAL PETALS & HEARTS ────────────────────────────────────
const petalColors = ['#ff4d6d','#ff758f','#ff85a1','#ffb3c1','#c9184a','#ffd6e0'];
const heartEmojis = ['❤️','🩷','💕','💗','💖'];

function spawnPetal() {
  const el = document.createElement('div');
  el.className = 'g-petal';
  el.style.cssText = `
    left: ${Math.random()*100}%;
    background: ${petalColors[Math.floor(Math.random()*petalColors.length)]};
    animation-duration: ${9 + Math.random()*9}s;
    animation-delay: ${Math.random()*6}s;
    transform: scale(${0.5 + Math.random()*1.2}) rotate(${Math.random()*360}deg);
  `;
  document.getElementById('globalPetals').appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

function spawnHeart() {
  const el = document.createElement('span');
  el.className = 'g-heart';
  el.textContent = heartEmojis[Math.floor(Math.random()*heartEmojis.length)];
  el.style.cssText = `
    left: ${Math.random()*100}%;
    font-size: ${0.7 + Math.random()*0.9}rem;
    animation-duration: ${9 + Math.random()*9}s;
    animation-delay: ${Math.random()*6}s;
  `;
  document.getElementById('globalHearts').appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

for (let i = 0; i < 20; i++) spawnPetal();
for (let i = 0; i < 10; i++) spawnHeart();
setInterval(spawnPetal, 600);
setInterval(spawnHeart, 1200);

// ── 8. RESIZE ────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  const fw = document.getElementById('fireworksCanvas');
  if (fw) { fw.width = window.innerWidth; fw.height = window.innerHeight; }
  const gw = document.getElementById('galaxyCanvas');
  if (gw) { gw.width = window.innerWidth; gw.height = window.innerHeight; }
});

// =====================
// ALIEN BUTTON
// =====================

function showBookmarkHint() {
  const hint = document.getElementById("bookmarkHint");
  const ua = navigator.userAgent || "";
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    || navigator.maxTouchPoints > 0;
  const isIOS = /iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);

  const isMac = (navigator.userAgentData && navigator.userAgentData.platform === "macOS")
    || ua.includes("Mac");

  let shortcut = "Ctrl + D";

  if (isTouchDevice) {
    if (isIOS) {
      shortcut = "Share -> Add to Home Screen";
    } else if (isAndroid) {
      shortcut = "Menu -> Add to Home screen";
    } else {
      shortcut = "Browser menu -> Add to Home screen";
    }
  } else if (isMac) {
    shortcut = "Cmd + D";
  }

  hint.textContent = `ANCHOR THIS SIGNAL (${shortcut})`;
  hint.classList.add("show");

  setTimeout(() => {
    hint.classList.remove("show");
  }, 7000);
}


const btn = document.getElementById("alienBtn");

const idleTexts = [
  "Receive Transmission",
  "Join the Event Horizon",
  "Start the Anomaly",
  "Summon Something Questionable",
  "Press at Your Own Risk",
  "Decrypt Signal",
  "Open the Portal",
  "Distort Reality",
  "Contact the Unknown",
  "They Are Waiting...",
  "Activate the Supervoid",
  "Embrace the Void",
  "Unleash the Anomaly",
  "Initiate Contact",
  "The Signal is Calling",
  "Something is Out There...",
  "The Unknown Beckons",
  "Can You Hear It?",
  "The Event Horizon is Near",
  "They Are Watching...",
  "Embrace the Darkness",
  "The Anomaly is Alive",
  "They Are Already Here..."
];

const hoverTexts = [
  "Are you sure?",
  "This could be dangerous...",
  "No turning back",
  "They are listening...",
  "Last warning",
  "The void is calling",
  "Can you feel it?",
  "The event horizon is near",
  "Something is watching you...",
  "The unknown beckons",
  "Embrace the darkness",
  "The anomaly is alive",
  "They are already here...",
  "The signal is getting stronger",
  "The void is hungry",
  "Can you hear it?"
];

const loadingTexts = [
  "Contacting...",
  "Opening portal...",
  "Distorting reality...",
  "Summoning...",
  "Signal detected..."
];

const finalTexts = [
  "They have arrived 👽",
  "Event horizon reached",
  "Anomaly active",
  "Something answered...",
  "Too late now",
  "Welcome to the void",
  "The unknown is here",
  "Embrace the supervoid",
  "Reality is bending",
  "They are among us...",
  "The signal is strong",
  "The void is alive",
  "Contact established"
];

let runaway = false;

// случайный стартовый текст
btn.textContent = idleTexts[Math.floor(Math.random() * idleTexts.length)];

btn.addEventListener("mouseenter", () => {
  btn.textContent = hoverTexts[Math.floor(Math.random() * hoverTexts.length)];
});

btn.addEventListener("mouseleave", () => {
  btn.textContent = idleTexts[Math.floor(Math.random() * idleTexts.length)];
});

btn.addEventListener("click", () => {
  if (runaway) return;

  runaway = true;
  btn.classList.add("active");


  let i = 0;
  btn.textContent = loadingTexts[i];

  const interval = setInterval(() => {
    i++;
    if (i < loadingTexts.length) {
      btn.textContent = loadingTexts[i];
    } else {
      clearInterval(interval);
      btn.textContent = finalTexts[Math.floor(Math.random() * finalTexts.length)];

      // здесь можно открыть сайт 👇
      setTimeout(() => {
        //window.location.href = "https://example.com";
        showBookmarkHint();
        runaway = false;
        btn.classList.remove("active");
      }, 1000);
    }
  }, 400);

  //runaway = false;

});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// =====================
// AUDIO
// =====================
const bgAudio = document.getElementById('bgAudio');
if (bgAudio) {
    bgAudio.volume = 0.02; // 0-1, где 0 = беззвучно, 1 = максимум

    // Разрешить звук после клика пользователя
    document.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play().catch(e => console.log('Не удалось воспроизвести:', e));
        }
    }, { once: true });
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// =====================
// TEXT SYSTEM
// =====================
const titleText = " supervoid.ru ";
const titleEl = document.getElementById('title');

let letters = [];

function initText() {
    titleEl.innerHTML = '';
    letters = [];

    for (let i = 0; i < titleText.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = titleText[i];
        span.style.color = '#ffffff';
        titleEl.appendChild(span);

        letters.push({
            el: span,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            homeX: 0,
            homeY: 0,
            infected: false,
            wobble: 0
        });
    }

    updateLetterPositions();
}

function updateLetterPositions() {
    const centerY = window.innerHeight * 0.55;
    const spacing = 16;

    const totalWidth = (letters.length - 1) * spacing;
    const startX = window.innerWidth / 2 - totalWidth / 2;

    letters.forEach((l, i) => {
        l.homeX = startX + i * spacing;
        l.homeY = centerY;

        if (l.x === 0 && l.y === 0) {
            l.x = l.homeX;
            l.y = l.homeY;
        }
    });
}

window.addEventListener('resize', updateLetterPositions);

// =====================
// AGENTS
// =====================
class Agent {
    constructor(id) {
        this.id = id;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = 2 + Math.random() * 4;
        this.color = `hsl(${Math.random()*360}, 80%, 60%)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += (Math.random() - 0.5) * 0.15;
        this.vy += (Math.random() - 0.5) * 0.15;

        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        const maxSpeed = 2;
        if (speed > maxSpeed) {
            this.vx *= maxSpeed / speed;
            this.vy *= maxSpeed / speed;
        }

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2.0);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function getAgentCount() {
  const width = window.innerWidth;

  if (width < 500) return 30;     // маленькие телефоны
  if (width < 900) return 50;    // планшеты
  return 180;                     // десктоп
}

const NUM_AGENTS = getAgentCount();
const agents = [];
for (let i = 0; i < NUM_AGENTS; i++) agents.push(new Agent(i));

// =====================
// ORBIT SYSTEM
// =====================
let mouse = {x: 0, y: 0};
let pointerActive = false;
let activeTouchPointerId = null;
let orbitMode = false;

const ORBIT_ON = 160;
const ORBIT_OFF = 200;

function getCenter() {
    return {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.55
    };
}

function updateLetters() {
    const center = getCenter();

    if (!pointerActive) {
        orbitMode = false;
    } else {
        const dxm = mouse.x - center.x;
        const dym = mouse.y - center.y;
        const dist = Math.sqrt(dxm*dxm + dym*dym);

        if (!orbitMode && dist < ORBIT_ON) orbitMode = true;
        if (orbitMode && dist > ORBIT_OFF) orbitMode = false;
    }

    const n = letters.length;

    for (let i = 0; i < n; i++) {
        const l = letters[i];

        let tx = l.homeX;
        let ty = l.homeY;

        // Отталкивание от курсора
        if (pointerActive && orbitMode) {
            const dx = l.x - mouse.x;
            const dy = l.y - mouse.y;
            const d = Math.sqrt(dx*dx + dy*dy);

            if (d < 200) {
                const repulsion = 8.0 * (1 - d/200);
                l.vx += (dx / (d + 1)) * repulsion;
                l.vy += (dy / (d + 1)) * repulsion;
            }
        }

        const dx = tx - l.x;
        const dy = ty - l.y;

        l.vx += dx * 0.06;
        l.vy += dy * 0.06;

        l.vx *= 0.75;
        l.vy *= 0.75;

        l.x += l.vx;
        l.y += l.vy;

        const ox = l.x - l.homeX;
        const oy = l.y - l.homeY;

        l.el.style.transform = `translate(${ox}px, ${oy}px)`;
    }
}

// =====================
// AGENTS LOGIC
// =====================
function updateAgents() {
    const center = getCenter();

    for (let idx = 0; idx < agents.length; idx++) {
        const a = agents[idx];

        if (runaway) {
            const dx = center.x - a.x;
            const dy = center.y - a.y;
            const d = Math.sqrt(dx*dx + dy*dy);

            if (d < 1000 || true) {
                a.vx += dx * 0.02; // * Math.random();
                a.vy += dy * 0.02; // * Math.random();
            }
            continue;
        }

        // Только 10% агентов притягиваются к тексту
        if (idx < agents.length * 0.5) {
            const dx = center.x - a.x;
            const dy = center.y - a.y;
            const d = Math.sqrt(dx*dx + dy*dy);

            if (d < 300) {
                a.vx += dx * 0.0003/2;
                a.vy += dy * 0.0003/2;
            }
        }

        if (pointerActive) {
            const mx = mouse.x - a.x;
            const my = mouse.y - a.y;
            const md = Math.sqrt(mx*mx + my*my);

            if (md < 200) {
                a.vx -= mx * 0.015/2;
                a.vy -= my * 0.015/2;
            }
        }
    }
}

function setPointerPosition(clientX, clientY) {
    mouse.x = clientX;
    mouse.y = clientY;
    pointerActive = true;
}

function clearPointerPosition(pointerId = null) {
    if (pointerId !== null && activeTouchPointerId !== null && pointerId !== activeTouchPointerId) {
        return;
    }

    pointerActive = false;
    activeTouchPointerId = null;
    orbitMode = false;
}

function handlePointerDown(e) {
    if (e.pointerType === 'touch') {
        if (activeTouchPointerId !== null && activeTouchPointerId !== e.pointerId) {
            return;
        }

        activeTouchPointerId = e.pointerId;

        if (canvas.setPointerCapture) {
            try {
                canvas.setPointerCapture(e.pointerId);
            } catch (err) {
                console.debug('Pointer capture skipped:', err);
            }
        }
    }

    setPointerPosition(e.clientX, e.clientY);
}

function handlePointerMove(e) {
    if (e.pointerType === 'touch' && activeTouchPointerId !== null && e.pointerId !== activeTouchPointerId) {
        return;
    }

    setPointerPosition(e.clientX, e.clientY);
}

function handlePointerUp(e) {
    if (e.pointerType !== 'touch') return;

    if (canvas.releasePointerCapture) {
        try {
            canvas.releasePointerCapture(e.pointerId);
        } catch (err) {
            console.debug('Pointer release skipped:', err);
        }
    }

    clearPointerPosition(e.pointerId);
}

if ('PointerEvent' in window) {
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    canvas.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') {
            clearPointerPosition();
        }
    });
} else {
    canvas.addEventListener('mousemove', (e) => {
        setPointerPosition(e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseleave', () => {
        clearPointerPosition();
    });

    const syncTouch = (e) => {
        const touch = e.touches[0];
        if (!touch) return;
        setPointerPosition(touch.clientX, touch.clientY);
    };

    canvas.addEventListener('touchstart', (e) => {
        syncTouch(e);
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        syncTouch(e);
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
        clearPointerPosition();
    });

    canvas.addEventListener('touchcancel', () => {
        clearPointerPosition();
    });
}

// =====================
// SPATIAL HASHING / GRID
// =====================
const GRID_SIZE = 100; // размер клетки в пикселях
let grid = {};

function getGridKey(x, y) {
    const gridX = Math.floor(x / GRID_SIZE);
    const gridY = Math.floor(y / GRID_SIZE);
    return `${gridX},${gridY}`;
}

function buildGrid() {
    grid = {};

    for (const a of agents) {
        const key = getGridKey(a.x, a.y);
        if (!grid[key]) grid[key] = [];
        grid[key].push(a);
    }
}

function getNeighbors(x, y) {
    const neighbors = [];
    const gridX = Math.floor(x / GRID_SIZE);
    const gridY = Math.floor(y / GRID_SIZE);

    // Проверяем 9 клеток (текущая + 8 соседей)
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const key = `${gridX + dx},${gridY + dy}`;
            if (grid[key]) {
                neighbors.push(...grid[key]);
            }
        }
    }

    return neighbors;
}

// =====================
// DRAW
// =====================
function drawConnections() {
    const maxDist = 90; // максимальное расстояние для соединения
    const processed = new Set();

    for (const a of agents) {
        const neighbors = getNeighbors(a.x, a.y);

        for (const b of neighbors) {
            // Проверяем только пары где a.id < b.id, чтобы не рисовать линию дважды
            if (a.id >= b.id) continue;

            const pairKey = `${a.id}-${b.id}`;
            if (processed.has(pairKey)) continue;
            processed.add(pairKey);

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx*dx + dy*dy);

            if (d < maxDist) {
                ctx.strokeStyle = `rgba(${255 * (d/maxDist)},${255-255 * (d/maxDist)},100,${1 - (d/maxDist)**3})`;
                //ctx.strokeStyle = `rgba(255,50,50,${1 - (d/maxDist)**3})`;
                ctx.lineWidth = 0.3;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    }
}

// =====================
// LOOP
// =====================
function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateAgents();

    for (const a of agents) {
        a.update();
        a.draw();
    }

    buildGrid();
    drawConnections();
    updateLetters();

    requestAnimationFrame(animate);
}

initText();
animate();

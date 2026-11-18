// ─── Config ─────────────────────────────────────────────────────────────────
const CONFIG = {
  defaultSize: 180,     // px, closed diameter when a project doesn't specify one
  openDiameter: 620,    // px, diameter content is laid out for when open (capped to viewport)
  openShrink: 0.88,     // open bubble = layout size × this; content keeps its size, edges get clipped
  riseSpeed: [0.2, 0.4],// px/frame range, upward drift
  wobble: 150,          // px, horizontal noise amplitude
  wobbleSpeed: 0.0015,  // noise time step per frame
  ease: 1 / 7,          // size/position easing factor
  cardGap: 12,          // px, min space between bubbles and the center card
};

// ─── 1D Perlin noise ──────────────────────────────────────────────────────────
const perlin = (() => {
  const grad = Array.from({ length: 256 }, () => Math.random() * 2 - 1);
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  return x => {
    const xi = Math.floor(x) & 255, xf = x - Math.floor(x);
    const a = grad[xi] * xf, b = grad[(xi + 1) & 255] * (xf - 1);
    return a + fade(xf) * (b - a);
  };
})();

// ─── Build bubbles from data ─────────────────────────────────────────────────
const field = document.getElementById("bubble-field");
const rand = (min, max) => min + Math.random() * (max - min);
// random x (0–1) in the left or right third, away from the center card
const randomSideX = () => (Math.random() < 0.5 ? rand(0.05, 0.28) : rand(0.72, 0.95));

function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

// Returns an absolute http(s) URL, or null if the string isn't a usable link.
// Relative paths (e.g. "./demos/game/") resolve against this site.
function validUrl(str) {
  if (typeof str !== "string" || !str.trim()) return null;
  try {
    const url = new URL(str.trim(), location.href);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

// github.com repos/gists are source code; *.github.io pages are live demos.
const isGitHub = url => {
  const host = new URL(url).hostname;
  return host === "github.com" || host.endsWith(".github.com");
};

function createBubble(project, i) {
  const size = project.size || CONFIG.defaultSize;
  const link = validUrl(project.link);
  const color = project.color || PALETTE[i % PALETTE.length];

  const mask = el("div", { className: "mask" }, [
    el("img", { className: "cover", src: project.cover, alt: project.title, loading: "lazy" }),
    ...(project.detail ? [el("img", { className: "detail", src: project.detail, alt: "", loading: "lazy" })] : []),
    el("div", { className: "info" }, [
      el("h2", { textContent: project.title }),
      el("p", { textContent: project.text }),
      ...(project.awards?.trim() ? [el("p", { className: "awards", textContent: project.awards })] : []),
      ...(link ? [el("p", { className: "link", textContent: isGitHub(link) ? "Click for source" : "Click for demo" })] : []),
    ]),
  ]);

  const node = el("article", { className: "bubble", tabIndex: 0 }, [mask]);
  node.setAttribute("aria-label", project.title);
  if (!project.detail) node.classList.add("no-detail");
  if (link) node.classList.add("has-link");
  node.style.setProperty("--d", `${size}px`);
  node.style.setProperty("--rim", color);
  field.append(node);

  const category = Object.keys(CATEGORIES)
    .find(k => CATEGORIES[k].toLowerCase() === color.toLowerCase());

  const b = {
    node, project, size, category,
    // anchor x as fraction of width so it survives resizes
    xFrac: project.x ?? randomSideX(),
    y: (project.y ?? rand(0, 1)) * innerHeight,
    t: Math.random() * 100,
    speed: rand(...CONFIG.riseSpeed),
    scale: 1,
    hovered: false,
    pinned: false,
  };

  node.addEventListener("mouseenter", () => (b.hovered = true));
  node.addEventListener("mouseleave", () => (b.hovered = false));
  node.addEventListener("focus", () => (b.hovered = true));
  node.addEventListener("blur", () => (b.hovered = false));
  node.addEventListener("click", e => {
    e.stopPropagation();
    // open bubble with a link acts as a button (on touch: 1st tap opens, 2nd launches)
    if (isOpen(b) && link) return window.open(link, "_blank", "noopener");
    bubbles.forEach(o => o !== b && (o.pinned = false));
    b.pinned = !b.pinned; // tap-to-open for touch screens
  });
  node.addEventListener("keydown", e => {
    if (link && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      window.open(link, "_blank", "noopener");
    }
  });

  return b;
}

const bubbles = PROJECTS.map(createBubble);
document.addEventListener("click", () => bubbles.forEach(b => (b.pinned = false)));

// ─── Category filter ────────────────────────────────────────────────────────
// Clicking a category dims bubbles of other colours; clicking it again clears.
let activeCategory = null;
const filterButtons = document.querySelectorAll(".interest-buttons button");

filterButtons.forEach(btn => {
  const color = CATEGORIES[btn.dataset.category];
  if (color) btn.style.setProperty("--cat", color);
  btn.setAttribute("aria-pressed", "false");

  btn.addEventListener("click", e => {
    e.stopPropagation();
    activeCategory = activeCategory === btn.dataset.category ? null : btn.dataset.category;
    applyFilter();
  });
});

function applyFilter() {
  filterButtons.forEach(btn => {
    const on = btn.dataset.category === activeCategory;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
  });
  for (const b of bubbles) {
    const dim = activeCategory != null && b.category !== activeCategory;
    b.node.classList.toggle("dimmed", dim);
    b.node.tabIndex = dim ? -1 : 0;
    if (dim) b.pinned = b.hovered = false;
  }
}

// ─── Animation ──────────────────────────────────────────────────────────────
const isOpen = b => !b.node.classList.contains("dimmed") && (b.hovered || b.pinned);
const layoutDiameter = () => Math.min(CONFIG.openDiameter, Math.min(innerWidth, innerHeight) * 0.92);
const openScale = b => Math.max(1, (layoutDiameter() * CONFIG.openShrink) / b.size);

// Text is laid out once at its fully-open size (mask = 90% of the bubble).
function setOpenSizes() {
  for (const b of bubbles) {
    b.node.style.setProperty("--open-mask", `${layoutDiameter() * 0.9}px`);
  }
}
setOpenSizes();
addEventListener("resize", setOpenSizes);

const card = document.querySelector(".center-card");

function animate() {
  const W = innerWidth, H = innerHeight;
  const cardRect = card?.getBoundingClientRect();

  for (const b of bubbles) {
    const open = isOpen(b);
    const target = open ? openScale(b) : 1;
    b.node.classList.toggle("open", open);

    b.scale += (target - b.scale) * CONFIG.ease;
    // freeze drift and wobble entirely while open
    if (!open) {
      b.y -= b.speed;
      b.t += CONFIG.wobbleSpeed;
    }

    const half = (b.size * b.scale) / 2;

    // wrap around once fully off the top
    if (b.y < -b.size) {
      b.y = H + b.size / 2;
      if (b.project.x == null) b.xFrac = randomSideX();
    }

    let x = b.xFrac * W + perlin(b.t) * CONFIG.wobble;

    // push out of the center card, toward whichever side the bubble is on
    if (cardRect) {
      const left = cardRect.left - CONFIG.cardGap, right = cardRect.right + CONFIG.cardGap;
      if (x + half > left && x - half < right) {
        x = x < W / 2 ? left - half : right + half;
      }
    }

    // keep open bubbles on screen (wins over card avoidance if there's no room)
    if (open) {
      const clampY = Math.min(Math.max(b.y, half), H - half);
      b.y += (clampY - b.y) / 20;
      x = Math.min(Math.max(x, half), W - half);
    }

    b.x = b.x == null ? x : b.x + (x - b.x) * CONFIG.ease;
    b.node.style.transform = `translate(${b.x}px, ${b.y}px)`;

    // Resize for real (not via transform scale) so text/images render crisply.
    if (Math.abs(b.scale - b.lastScale) > 0.0005 || b.lastScale == null) {
      b.lastScale = b.scale;
      b.node.style.setProperty("--d", `${b.size * b.scale}px`);
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

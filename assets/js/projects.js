/*
 * ─── PROJECTS ───────────────────────────────────────────────────────────────
 * Add a bubble by adding an object to this list. That's it.
 *
 *   title   (required) Heading shown when the bubble is open.
 *   text    (required) Description shown when the bubble is open.
 *   awards  (optional) Shown under the text, no header. Hidden if empty.
 *   cover   (required) Image shown on the closed bubble.
 *   detail  (optional) Second image shown when open.
 *   color   (optional) Rim colour. Also decides the bubble's category (see
 *           CATEGORIES below). Defaults to cycling through PALETTE.
 *   size    (optional) Closed diameter in px. Default 180.
 *   x, y    (optional) Starting position, 0–1 of the screen. Random if omitted.
 *   link    (optional) URL opened when the open bubble is clicked.
 */
const PALETTE = ["#dc3545", "#0d6efd", "#73e380", "#f0ad4e", "#9b59b6", "#20c997"];

/*
 * ─── CATEGORIES ─────────────────────────────────────────────────────────────
 * A bubble's rim colour decides its category. Keys match the data-category
 * attributes on the "What are you looking for?" buttons in index.html.
 */
const CATEGORIES = {
  games:    "#73e380", // Game Development
  software: "#0d6efd", // Software Projects
  other:    "#dc3545", // Other Experience
};

const PROJECTS = [
  {
    title: "Commencement Speaker",
    text: "Voted by my peers to be commencement speaker for the founding class of the Mastery School of Hawken.",
    awards: "",
    cover: "./assets/images/Commencement.jpeg",
    detail: "./assets/images/CommencementOverview.jpeg",
    color: "#dc3545",
    size: 250,
    x: 0.2, y: 0.3,
  },
  {
    title: "Cognitive Robotics @ Kent State",
    text: "Developed gesture-based control methods for drone swarms, and drafted an IEEE paper on the process.",
    awards: "",
    cover: "./assets/images/KentStatePhysical.png",
    detail: "./assets/images/DroneVR.gif",
    color: "#0d6efd",
    size: 250,
    x: 0.25, y: 0.7,
  },
  {
    title: "TechCORPS Educator",
    text: "Youngest educator ever hired by TechCORPS, teaching robotics in outreach programs around Cleveland.",
    awards: "",
    cover: "./assets/images/TechCorps.png",
    detail: "./assets/images/TechieCamp.jpeg",
    color: "#dc3545",
    size: 150,
    x: 0.85, y: 0.4,
  },
  {
    title: "Counter Melody",
    text: "Competitive rhythm game that taught me how to implement lockstep multiplayer!",
    awards: "GCC Game Jam Winner",
    cover: "./assets/images/Melodies.png",
    detail: "./assets/images/CounterMelody.png",
    color: "#73e380",
    size: 200,
    x: 0.78, y: 0.55,
  },
];

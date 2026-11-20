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
 *   link    (optional) URL (http/https or a relative path). If valid, the
 *           bubble shows "Click for demo" ("Click for source" for github.com
 *           links) and clicking the open bubble
 *           opens it in a new tab. Ignored if empty/invalid.
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
    text: "Voted by my peers to be commencement speaker for the founding class of the Mastery School of Hawken",
    awards: "",
    cover: "./assets/images/Commencement.jpeg",
    detail: "./assets/images/CommencementOverview.jpeg",
    color: "#dc3545",
    size: 240,
    x: 0.15, y: 0.3,
  },
  {
    title: "TechCORPS Educator",
    text: "Youngest educator ever hired by TechCORPS, teaching robotics in outreach programs around Cleveland",
    awards: "",
    cover: "./assets/images/TechCorps.png",
    detail: "./assets/images/TechieCamp.jpeg",
    color: "#dc3545",
    size: 150,
    x: 0.86, y: 0.25,
  },
  {
    title: "Cognitive Robotics @ Kent State",
    text: "Developed gesture-based control methods for drone swarms, and drafted an IEEE paper on the process",
    awards: "",
    link: "https://jonahsagers.itch.io/counter-melody",
    cover: "./assets/images/KentStatePhysical.png",
    detail: "./assets/images/DroneVR.gif",
    color: "#0d6efd",
    size: 220,
    x: 0.25, y: 0.7,
  },
  {
    title: "Empowered Recall",
    text: "Agentic development pipeline for context specification and hot-patching directly in engine",
    awards: "Riot Game DevHack Winner",
    link: "https://youtu.be/0tDqeJNzCjY",
    cover: "./assets/images/RecallTeam.jpg",
    detail: "./assets/images/RecallDemo.png",
    color: "#0d6efd",
    size: 250,
    x: 0.3, y: 0.4,
  },
  {
    title: "AgilityForge",
    text: "Open die incremental forging simulation, built for NSF and used in Columbus Metro Schools curriculum!",
    awards: "Featured in STEM Magazine!",
    link: "https://stemmagazine.com/gMAY26/viewer/desktop/#page/10",
    cover: "./assets/images/AgilityMetro.png",
    detail: "./assets/images/AgilityScreen.png",
    color: "#0d6efd",
    size: 250,
    x: 0.75, y: 0.35,
  },
  {
    title: "Honda ARHUD",
    text: "Augmented reality display for debugging self driving cars",
    awards: "Shown at Honda Tech Day 2026",
    link: "",
    cover: "./assets/images/HondaTest.png",
    detail: "./assets/images/HondaTeam.jpeg",
    color: "#0d6efd",
    size: 250,
    x: 0.7, y: 0.85,
  },
  {
    title: "Counter Melody",
    text: "Competitive rhythm game that taught me how to implement lockstep multiplayer!",
    awards: "GCC Game Jam Winner",
    link: "https://jonahsagers.itch.io/counter-melody",
    cover: "./assets/images/Melodies.png",
    detail: "./assets/images/CounterMelody.png",
    color: "#73e380",
    size: 225,
    x: 0.8, y: 0.6,
  },
  {
    title: "Stick Kin",
    text: "Alternative Contol stop motion fighting game, using IR tracking through a Raspberry Pi",
    awards: "Alt Ctrl 2026 Entry",
    link: "https://jonahsagers.itch.io/altctrl",
    cover: "./assets/images/StickKin.png",
    detail: "./assets/images/StickIRL.png",
    color: "#73e380",
    size: 210,
    x: 0.1, y: 0.6,
  },
];

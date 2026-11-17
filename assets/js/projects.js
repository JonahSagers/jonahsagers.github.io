/*
 * ─── PROJECTS ───────────────────────────────────────────────────────────────
 * Add a bubble by adding an object to this list. That's it.
 *
 *   title   (required) Heading shown when the bubble is open.
 *   text    (required) Description shown when the bubble is open.
 *   cover   (required) Image shown on the closed bubble.
 *   detail  (optional) Second image shown when open.
 *   color   (optional) Rim colour. Defaults to cycling through PALETTE.
 *   size    (optional) Closed diameter in px. Default 180.
 *   x, y    (optional) Starting position, 0–1 of the screen. Random if omitted.
 *   link    (optional) URL opened when the open bubble is clicked.
 */
const PALETTE = ["#dc3545", "#0d6efd", "#73e380", "#f0ad4e", "#9b59b6", "#20c997"];

const PROJECTS = [
  {
    title: "Commencement Speaker",
    text: "Voted by my peers to be commencement speaker for the founding class of the Mastery School of Hawken.",
    cover: "./assets/images/Commencement.jpeg",
    detail: "./assets/images/CommencementOverview.jpeg",
    color: "#dc3545",
    size: 250,
    x: 0.2, y: 0.3,
  },
  {
    title: "Cognitive Robotics @ Kent State",
    text: "Developed gesture-based control methods for drone swarms, and drafted an IEEE paper on the process.",
    cover: "./assets/images/KentStatePhysical.png",
    detail: "./assets/images/DroneVR.gif",
    color: "#0d6efd",
    size: 250,
    x: 0.25, y: 0.7,
  },
  {
    title: "TechCORPS Educator",
    text: "Youngest educator ever hired by TechCORPS, teaching robotics in outreach programs around Cleveland.",
    cover: "./assets/images/TechCorps.png",
    detail: "./assets/images/TechieCamp.jpeg",
    color: "#dc3545",
    size: 150,
    x: 0.8, y: 0.5,
  },
];

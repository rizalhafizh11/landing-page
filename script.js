const qs = (s, el = document) => el.querySelector(s);

const burger = qs("#burger");
const mobileMenu = qs("#mobileMenu");
const yearEl = qs("#year");
const toTop = qs("#toTop");

const themeBtn = qs("#themeBtn");
const themeIcon = qs("#themeIcon");

yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
}
burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

// Close mobile menu when click a link
mobileMenu?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  setMenu(false);
});

// Back to top
toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle (saved in localStorage)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
function refreshIcon() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  themeIcon.textContent = isLight ? "☀️" : "🌙";
}
refreshIcon();

themeBtn?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  refreshIcon();
});

// Auto-close menu on resize (optional)
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

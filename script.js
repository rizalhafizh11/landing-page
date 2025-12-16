// Helper: querySelector biar singkat
const qs = (s, el = document) => el.querySelector(s);

// Ambil elemen-elemen yang dipakai JS
const burger = qs("#burger");
const mobileMenu = qs("#mobileMenu");
const yearEl = qs("#year");
const toTop = qs("#toTop");

const themeBtn = qs("#themeBtn");
const themeIcon = qs("#themeIcon");

const copyBtn = qs("#copyBtn");
const copied = qs("#copied");

// Tampilkan tahun otomatis di footer
yearEl.textContent = new Date().getFullYear();

/* =========================
   MOBILE MENU (burger)
   ========================= */

// Fungsi untuk membuka/menutup menu mobile
function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open)); // aksesibilitas
  mobileMenu.hidden = !open; // true = disembunyikan, false = tampil
}

// Klik burger = toggle menu
burger.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") !== "true";
  setMenu(open);
});

// Klik link di menu mobile = tutup menu
mobileMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

/* =========================
   BACK TO TOP
   ========================= */

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   THEME TOGGLE (dark/light)
   ========================= */

// Ambil theme yang disimpan sebelumnya
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

// Update ikon biar sesuai theme
function refreshIcon() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  themeIcon.textContent = isLight ? "☀️" : "🌙";
}
refreshIcon();

// Klik tombol theme = ganti tema dan simpan ke localStorage
themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  refreshIcon();
});

/* =========================
   COPY BRIEF TEMPLATE
   ========================= */

copyBtn.addEventListener("click", async () => {
  const text =
`Brief Website (singkat)
1) Tujuan website:
2) Target audience:
3) Layanan/produk utama:
4) Referensi desain (link):
5) Warna/brand:
6) Konten yang disiapkan (logo, foto, teks):
7) Deadline:
8) Kontak penanggung jawab:`;

  try {
    // Clipboard API: copy teks ke clipboard
    await navigator.clipboard.writeText(text);
    copied.textContent = "Brief template berhasil dicopy.";
    setTimeout(() => (copied.textContent = ""), 2500);
  } catch {
    copied.textContent = "Gagal copy. Coba ulang.";
    setTimeout(() => (copied.textContent = ""), 2500);
  }
});

/* =========================
   CLOSE MENU ON RESIZE
   ========================= */
// Kalau layar membesar ke desktop, kita paksa menu mobile tertutup
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenu(false);
});

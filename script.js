const header = document.getElementById("header");
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

function atualizarHeaderPorScroll() {
  if (!header) return;

  if (window.innerWidth <= 900) {
    header.classList.remove("scrolled");
    return;
  }

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function lerTemaSalvo() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function salvarTema(isDarkMode) {
  try {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  } catch {
    // Ignora falha de armazenamento em navegadores restritivos.
  }
}

function aplicarTema(isDarkMode) {
  if (!body || !themeToggle) return;

  body.classList.toggle("dark-mode", isDarkMode);
  themeToggle.textContent = isDarkMode ? "🌙" : "☀️";
  themeToggle.setAttribute("aria-pressed", String(isDarkMode));
  salvarTema(isDarkMode);
}

const temaSalvo = lerTemaSalvo();
const temaInicial = temaSalvo === "dark";
aplicarTema(temaInicial);

window.addEventListener("scroll", atualizarHeaderPorScroll);
window.addEventListener("resize", atualizarHeaderPorScroll);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDarkMode = !body.classList.contains("dark-mode");
    aplicarTema(isDarkMode);
  });
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));

    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

atualizarHeaderPorScroll();
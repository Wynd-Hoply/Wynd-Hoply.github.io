const header = document.getElementById("header");
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const copyEmailButton = document.querySelector(".copy-email");
const typingText = document.getElementById("typing-text");

const textosHero = [
  "Desenvolvedor Full Stack",
  "Desenvolvedor Web",
  "Estudante de Tecnologia",
];

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

function iniciarAnimacaoHero() {
  if (!typingText || textosHero.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    typingText.textContent = textosHero[0];
    return;
  }

  let textoAtualIndex = 0;
  let letraAtual = 0;
  let apagando = false;

  function digitar() {
    const textoAtual = textosHero[textoAtualIndex];

    if (!apagando) {
      letraAtual += 1;
      typingText.textContent = textoAtual.slice(0, letraAtual);

      if (letraAtual === textoAtual.length) {
        apagando = true;
        setTimeout(digitar, 1300);
        return;
      }

      setTimeout(digitar, 95);
      return;
    }

    letraAtual -= 1;
    typingText.textContent = textoAtual.slice(0, Math.max(letraAtual, 0));

    if (letraAtual <= 0) {
      apagando = false;
      textoAtualIndex = (textoAtualIndex + 1) % textosHero.length;
      setTimeout(digitar, 260);
      return;
    }

    setTimeout(digitar, 55);
  }

  digitar();
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

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      const iconHtml = copyEmailButton.querySelector("img")?.outerHTML || "";
      const textoOriginal = copyEmailButton.innerHTML;

      copyEmailButton.innerHTML = `${iconHtml}<span class="copy-success-text">Email copiado!</span>`;
      copyEmailButton.classList.add("copy-success");

      setTimeout(() => {
        copyEmailButton.classList.remove("copy-success");
        copyEmailButton.innerHTML = textoOriginal;
      }, 1500);
    } catch {
      const iconHtml = copyEmailButton.querySelector("img")?.outerHTML || "";
      const textoOriginal = copyEmailButton.innerHTML;

      copyEmailButton.innerHTML = `${iconHtml}<span>Não foi possível copiar</span>`;

      setTimeout(() => {
        copyEmailButton.innerHTML = textoOriginal;
      }, 1500);
    }
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
iniciarAnimacaoHero();
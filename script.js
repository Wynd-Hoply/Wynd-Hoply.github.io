// Cria uma constante que puxa a id "Header"
const header = document.getElementById("header");
// Quando descer um pouco o Header vai fazer algo
window.addEventListener("scroll", () => {
  if (window.scrollY > 90) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// Cria uma constante que puxa a id "Body"
const body = document.getElementById("body");
// Quando descer um pouco o Body vai fazer algo
window.addEventListener("scroll", () => {
  if (window.scrollY > 90) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }
});


window.addEventListener("scroll", () => {

    if (window.innerWidth <= 900) {
        header.classList.remove("scrolled");
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute('href'));

    destino.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
/* Eu sei que eu poderia fazer direto no CSS. Mas eu prefiro desse jeito pela velocidade. 

html {
    scroll-behavior: smooth;
}

*/
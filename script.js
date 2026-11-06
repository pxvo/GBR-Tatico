
// =========================
// MENU MOBILE
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});

// Fecha o menu após clicar em um link.

document.querySelectorAll("#navLinks a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


// =========================
// ANO AUTOMÁTICO
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();


// =========================
// WHATSAPP DOS PRODUTOS
// =========================

const whatsappNumber = "5595991357558";

document.querySelectorAll(".whatsapp-product").forEach((link) => {

  const product = link.dataset.product;

  const message =
    `Olá! Vi o site da GBR e gostaria de saber mais sobre: ${product}.`;

  link.href =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  link.target = "_blank";

  link.rel = "noopener";

});


// =========================
// BOTÃO VOLTAR AO TOPO
// =========================

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {

  backTop.classList.toggle(
    "visible",
    window.scrollY > 450
  );

});

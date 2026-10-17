const services = [
  ["Corte de cabelo", "45,00", "✂"],
  ["Cabelo (pezinho)", "30,00", "✂"],
  ["Barba / toalha", "45,00", "◈"],
  ["Barba apenas máquina", "40,00", "◈"],
  ["Raspar na máquina (cabelo ou barba)", "30,00", "✂"],
  ["Risco simples", "5,00", "⌁"],
  ["Risco freestyle", "15,00", "⌁"],
  ["Alisamento", "45,00", "✦"],
  ["Pigmentação cabelo", "35,00", "✦"],
  ["Pigmentação barba", "20,00", "✦"],
  ["Sobrancelha", "15,00", "◈"],
  ["Limpeza facial simples", "25,00", "✧"],
  ["Limpeza completa de pele", "45,00", "✧"],
  ["Depilação (orelha / nariz)", "25,00", "✧"],
  ["Cone hindu", "50,00", "◈"],
  ["Cavanhaque", "20,00", "◈"],
  ["Platinado", "a partir de 180,00", "✦"],
  ["Luzes (touca)", "a partir de 160,00", "✦"],
];
const grid = document.querySelector("#services-grid");
services.forEach(([name, price, symbol]) => {
  const item = document.createElement("div");
  item.className = "service-card";
  item.innerHTML = `<span class="service-icon">${symbol}</span><span class="service-name"></span><strong></strong>`;
  item.querySelector(".service-name").textContent = name;
  item.querySelector("strong").textContent = price.startsWith("a partir")
    ? "R$ " + price
    : "R$ " + price;
  grid.appendChild(item);
});
document.querySelector("#year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle"),
  nav = document.querySelector("#menu");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }),
);

// Fotos reais compartilhadas pelo carrossel e pela galeria
const photos = [
  {
    src: "assets/galeria/corte-estilizado.webp",
    alt: "Corte masculino ruivo com desenho lateral",
    category: "cortes",
  },
  {
    src: "assets/galeria/barba-desenhada.webp",
    alt: "Barba masculina com acabamento definido",
    category: "barbas",
  },
  {
    src: "assets/galeria/corte-infantil-01.webp",
    alt: "Corte de cabelo infantil",
    category: "cortes",
  },
  {
    src: "assets/galeria/barba-longa.webp",
    alt: "Barba longa bem cuidada",
    category: "barbas",
  },
  {
    src: "assets/galeria/corte-infantil-02.webp",
    alt: "Corte infantil na Barbearia Stylos",
    category: "cortes",
  },
];
const track = document.getElementById("slide-track"),
  photoGrid = document.getElementById("photo-grid"),
  lightbox = document.getElementById("photo-lightbox"),
  lightboxImg = document.getElementById("lightbox-image");
let currentPhoto = 0;
function openPhoto(photo) {
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.alt;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}
function closePhoto() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}
function renderSlide() {
  const photo = photos[currentPhoto];
  track.innerHTML = "";
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.alt;
  img.decoding = "async";
  track.appendChild(img);
  track.onclick = () => openPhoto(photo);
}
document.getElementById("prev-photo").onclick = () => {
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  renderSlide();
};
document.getElementById("next-photo").onclick = () => {
  currentPhoto = (currentPhoto + 1) % photos.length;
  renderSlide();
};
function renderGallery(filter = "todos") {
  photoGrid.innerHTML = "";
  photos
    .filter((p) => filter === "todos" || p.category === filter)
    .forEach((photo) => {
      const button = document.createElement("button");
      button.className = "photo-item";
      button.type = "button";
      button.setAttribute("aria-label", "Ampliar: " + photo.alt);
      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = "lazy";
      img.decoding = "async";
      button.appendChild(img);
      button.onclick = () => openPhoto(photo);
      photoGrid.appendChild(button);
    });
}
document.querySelectorAll(".filter-btn").forEach(
  (button) =>
    (button.onclick = () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      renderGallery(button.dataset.filter);
    }),
);
document.getElementById("close-lightbox").onclick = closePhoto;
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closePhoto();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePhoto();
});
renderSlide();
renderGallery();

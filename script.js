const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");

function openLightbox(src, alt, caption) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxCaption.textContent = caption || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxImage.src = "";
}

document.querySelector(".identity").addEventListener("click", () => {
  openLightbox("images/profile.png", "Portrait of Rasool Fattahi", "Rasool Fattahi");
});

document.querySelectorAll(".photo-button").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    openLightbox(button.dataset.src, image.alt, button.dataset.caption);
  });
});

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

/* =========================================================
   YEAR
========================================================= */

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();


/* =========================================================
   ELEMENTS
========================================================= */

const gallery = document.getElementById("gallery");
const categoryButtons = document.querySelectorAll(".category-button");
const profileButton = document.getElementById("profileButton");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");


/* =========================================================
   KEYBOARD SCROLLING
========================================================= */

document.addEventListener("keydown", function (event) {
  if (lightbox.classList.contains("is-open")) return;

  const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
  if (!keys.includes(event.key)) return;

  const active = document.activeElement;
  const isTextField = active &&
    (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);

  if (isTextField) return;
  event.preventDefault();

  if (event.key === "ArrowDown") {
    gallery.scrollBy({ top: 140, behavior: "smooth" });
  } else if (event.key === "ArrowUp") {
    gallery.scrollBy({ top: -140, behavior: "smooth" });
  } else if (event.key === "PageDown" || event.key === " ") {
    gallery.scrollBy({ top: gallery.clientHeight * 0.85, behavior: "smooth" });
  } else if (event.key === "PageUp") {
    gallery.scrollBy({ top: -gallery.clientHeight * 0.85, behavior: "smooth" });
  } else if (event.key === "Home") {
    gallery.scrollTo({ top: 0, behavior: "smooth" });
  } else if (event.key === "End") {
    gallery.scrollTo({ top: gallery.scrollHeight, behavior: "smooth" });
  }
});


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(imageSrc, imageAlt, caption) {
  lightboxImage.src = imageSrc;
  lightboxImage.alt = imageAlt || "Photograph by Rasool Fattahi";
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

profileButton.addEventListener("click", function () {
  openLightbox(
    "images/profile.png",
    "Portrait of photographer Rasool Fattahi",
    "Rasool Fattahi"
  );
});


/* =========================================================
   IMAGE ASPECT RATIO
========================================================= */

function getImageOrientation(width, height) {
  const ratio = width / height;
  if (ratio > 1.15) return "landscape";
  if (ratio < 0.87) return "portrait";
  return "square";
}


/* =========================================================
   CREATE PHOTO CARD
   Expected photo object:
   file, caption, alt, title, description, category, location, date
========================================================= */

function createPhotoCard(photo) {
  const figure = document.createElement("figure");
  figure.className = "photo-card";
  figure.dataset.category = photo.category || "Other";

  const button = document.createElement("button");
  button.className = "photo-button";
  button.type = "button";
  button.dataset.src = "images/" + photo.file;
  button.dataset.caption = photo.caption || "";
  button.setAttribute("aria-label", "Open photograph: " + (photo.title || photo.alt || "Photograph"));

  const image = document.createElement("img");
  image.src = "images/" + photo.file;
  image.alt = photo.alt || photo.caption || "Photograph by Rasool Fattahi";
  if (photo.title) image.title = photo.title;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("load", function () {
    figure.classList.add("is-" + getImageOrientation(image.naturalWidth, image.naturalHeight));
  });

  button.appendChild(image);
  figure.appendChild(button);

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption || "";
  figure.appendChild(caption);

  button.addEventListener("click", function () {
    openLightbox(button.dataset.src, image.alt, button.dataset.caption);
  });

  return figure;
}


/* =========================================================
   RENDER GALLERY
========================================================= */

function renderGallery(category = "All") {
  gallery.innerHTML = "";

  const filteredPhotos = category === "All"
    ? photos
    : photos.filter(function (photo) {
        return photo.category === category;
      });

  if (filteredPhotos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-gallery";
    empty.textContent = "The archive is being curated.";
    gallery.appendChild(empty);
    return;
  }

  filteredPhotos.forEach(function (photo) {
    gallery.appendChild(createPhotoCard(photo));
  });
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;

    categoryButtons.forEach(function (item) {
      item.classList.remove("is-active");
    });

    button.classList.add("is-active");
    renderGallery(category);

    requestAnimationFrame(function () {
      gallery.scrollTo({ top: 0, behavior: "auto" });
    });
  });
});


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});


/* =========================================================
   INITIAL RENDER
========================================================= */

renderGallery("All");

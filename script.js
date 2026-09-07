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
   CATEGORY HELPERS
   Final public categories: Animals | Documentary | People | Places
   All is a filter state, not a photo category.
========================================================= */
const allowedCategories = ["Animals", "Documentary", "People", "Places"];

function getPhotoCategories(photo) {
  if (Array.isArray(photo.categories)) {
    return photo.categories.filter(function (category) {
      return allowedCategories.includes(category);
    });
  }

  // Backward compatibility for any older photo records.
  if (typeof photo.category === "string") {
    const normalized = photo.category === "Animal" ? "Animals" : photo.category;
    if (allowedCategories.includes(normalized)) return [normalized];
  }

  return [];
}

/* =========================================================
   PHOTO STRUCTURED DATA
========================================================= */
function absoluteImageUrl(file) {
  return new URL("images/" + file, window.location.href).href;
}

function addPhotoStructuredData() {
  if (!Array.isArray(photos) || photos.length === 0) return;

  const existing = document.getElementById("photo-structured-data");
  if (existing) existing.remove();

  const imageObjects = photos.map(function (photo) {
    const image = {
      "@type": "ImageObject",
      "contentUrl": absoluteImageUrl(photo.file),
      "url": absoluteImageUrl(photo.file),
      "name": photo.title || photo.alt || "Photograph by Rasool Fattahi",
      "description": photo.description || photo.caption || photo.alt || "Photograph by Rasool Fattahi",
      "author": { "@id": "https://thefattahi.github.io/#person" },
      "creator": { "@id": "https://thefattahi.github.io/#person" },
      "creditText": "Rasool Fattahi"
    };

    const categories = getPhotoCategories(photo);
    if (categories.length) image.genre = categories;
    if (photo.caption) image.caption = photo.caption;
    if (photo.location) image.contentLocation = { "@type": "Place", "name": photo.location };
    if (photo.date) image.dateCreated = photo.date;
    if (Array.isArray(photo.keywords) && photo.keywords.length) image.keywords = photo.keywords.join(", ");
    if (photo.width) image.width = photo.width;
    if (photo.height) image.height = photo.height;
    return image;
  });

  const script = document.createElement("script");
  script.id = "photo-structured-data";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ImageGallery",
        "@id": "https://thefattahi.github.io/#photo-gallery",
        "url": "https://thefattahi.github.io/",
        "name": "Rasool Fattahi Photography Archive",
        "author": { "@id": "https://thefattahi.github.io/#person" },
        "image": imageObjects
      },
      ...imageObjects
    ]
  });
  document.head.appendChild(script);
}

/* =========================================================
   KEYBOARD SCROLLING
========================================================= */
document.addEventListener("keydown", function (event) {
  if (lightbox.classList.contains("is-open")) return;
  const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
  if (!keys.includes(event.key)) return;
  const active = document.activeElement;
  const isTextField = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
  if (isTextField) return;
  event.preventDefault();

  if (event.key === "ArrowDown") gallery.scrollBy({ top: 140, behavior: "smooth" });
  else if (event.key === "ArrowUp") gallery.scrollBy({ top: -140, behavior: "smooth" });
  else if (event.key === "PageDown" || event.key === " ") gallery.scrollBy({ top: gallery.clientHeight * 0.85, behavior: "smooth" });
  else if (event.key === "PageUp") gallery.scrollBy({ top: -gallery.clientHeight * 0.85, behavior: "smooth" });
  else if (event.key === "Home") gallery.scrollTo({ top: 0, behavior: "smooth" });
  else if (event.key === "End") gallery.scrollTo({ top: gallery.scrollHeight, behavior: "smooth" });
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
  openLightbox("images/profile.png", "Portrait of photographer Rasool Fattahi", "Rasool Fattahi");
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
========================================================= */
function createPhotoCard(photo, index) {
  const figure = document.createElement("figure");
  figure.className = "photo-card";

  const categories = getPhotoCategories(photo);
  figure.dataset.categories = categories.join(",");
  figure.setAttribute("itemscope", "");
  figure.setAttribute("itemtype", "https://schema.org/ImageObject");

  const imageUrl = "images/" + photo.file;
  const imageTitle = photo.title || photo.alt || "Photograph by Rasool Fattahi";
  const imageAlt = photo.alt || photo.caption || photo.title || "Photograph by Rasool Fattahi";

  const link = document.createElement("a");
  link.className = "photo-button";
  link.href = imageUrl;
  link.dataset.src = imageUrl;
  link.dataset.caption = photo.caption || "";
  link.setAttribute("aria-label", "Open photograph: " + imageTitle);
  link.setAttribute("itemprop", "url");

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = imageAlt;
  image.title = imageTitle;
  image.setAttribute("itemprop", "contentUrl");
  image.loading = index < 2 ? "eager" : "lazy";
  image.fetchPriority = index < 2 ? "high" : "auto";
  image.decoding = "async";
  if (photo.width) image.width = photo.width;
  if (photo.height) image.height = photo.height;

  image.addEventListener("load", function () {
    figure.classList.add("is-" + getImageOrientation(image.naturalWidth, image.naturalHeight));
  });

  link.appendChild(image);
  figure.appendChild(link);

  if (photo.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;
    caption.setAttribute("itemprop", "caption");
    figure.appendChild(caption);
  }

  const metadata = document.createElement("meta");
  metadata.setAttribute("itemprop", "name");
  metadata.content = imageTitle;
  figure.appendChild(metadata);

  link.addEventListener("click", function (event) {
    event.preventDefault();
    openLightbox(imageUrl, imageAlt, photo.caption || "");
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
        return getPhotoCategories(photo).includes(category);
      });

  if (filteredPhotos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-gallery";
    empty.textContent = "The archive is being curated.";
    gallery.appendChild(empty);
    return;
  }

  filteredPhotos.forEach(function (photo, index) {
    gallery.appendChild(createPhotoCard(photo, index));
  });
}

/* =========================================================
   CATEGORY FILTER
========================================================= */
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;
    categoryButtons.forEach(function (item) { item.classList.remove("is-active"); });
    button.classList.add("is-active");
    renderGallery(category);
    requestAnimationFrame(function () { gallery.scrollTo({ top: 0, behavior: "auto" }); });
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
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

/* =========================================================
   INITIAL RENDER
========================================================= */
addPhotoStructuredData();
renderGallery("All");

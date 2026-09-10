/* =========================================================
   YEAR
========================================================= */
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

/* =========================================================
   ELEMENTS
========================================================= */
const gallery = document.getElementById("gallery");
const profileButton = document.getElementById("profileButton");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

/* =========================================================
   PHOTO ORDER
   The archive is ordered automatically by publication/upload
   timestamp, newest first. This is separate from the date the
   photograph was taken.
========================================================= */
function getOrderedPhotos() {
  if (!Array.isArray(photos)) return [];
  return photos.slice().sort(function (a, b) {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

/* =========================================================
   PHOTO STRUCTURED DATA
   The main ImageObject graph is present in the initial HTML.
   This function remains as a fallback for future dynamically
   added photos, but is not injected on the current static archive.
========================================================= */
function absoluteImageUrl(file) {
  return new URL("images/" + file, window.location.href).href;
}

function addPhotoStructuredData() {
  const orderedPhotos = getOrderedPhotos();
  if (orderedPhotos.length === 0) return;
  if (document.querySelector('script[type="application/ld+json"]')) return;

  const imageObjects = orderedPhotos.map(function (photo) {
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

    if (photo.caption) image.caption = photo.caption;
    if (photo.location) image.contentLocation = { "@type": "Place", "name": photo.location };
    if (photo.date) image.dateCreated = photo.date;
    if (photo.publishedAt) image.datePublished = photo.publishedAt;
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

  bindPhotoButton(link);
  return figure;
}

/* =========================================================
   BIND STATIC HTML GALLERY
   The portfolio cards now exist in the initial HTML for crawlability.
   JavaScript only enhances them with the existing lightbox behavior.
========================================================= */
function bindPhotoButton(link) {
  if (link.dataset.lightboxBound === "true") return;
  link.dataset.lightboxBound = "true";

  link.addEventListener("click", function (event) {
    event.preventDefault();
    const image = link.querySelector("img");
    const caption = link.dataset.caption || "";
    openLightbox(link.dataset.src || link.getAttribute("href"), image ? image.alt : "", caption);
  });
}

function bindStaticGallery() {
  const staticButtons = gallery.querySelectorAll(".photo-button");
  staticButtons.forEach(bindPhotoButton);
}

/* =========================================================
   RENDER GALLERY
   Preserve server-rendered cards when available. The dynamic
   renderer remains only as a fallback if the gallery is empty.
========================================================= */
function renderGallery() {
  if (gallery.children.length > 0) {
    bindStaticGallery();
    return;
  }

  const orderedPhotos = getOrderedPhotos();

  if (orderedPhotos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-gallery";
    empty.textContent = "The archive is being curated.";
    gallery.appendChild(empty);
    return;
  }

  orderedPhotos.forEach(function (photo, index) {
    gallery.appendChild(createPhotoCard(photo, index));
  });
}

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
renderGallery();

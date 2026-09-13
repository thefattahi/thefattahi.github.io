import fs from "node:fs";
import vm from "node:vm";

const site = "https://thefattahi.github.io";
const source = fs.readFileSync("photos.js", "utf8");
const context = {};
vm.runInNewContext(`${source}\nresult = photos;`, context);
const photos = Array.isArray(context.result) ? context.result : [];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const cleanCaption = (value) => String(value || "").replace(/\s+/g, " ").trim();

for (const photo of photos) {
  if (!photo?.file) continue;

  const slug = photo.file.replace(/\.[^.]+$/, "");
  const pageUrl = `${site}/photos/${encodeURIComponent(slug)}.html`;
  const imageUrl = `${site}/images/${encodeURI(photo.file)}`;
  const title = photo.title || photo.alt || "Photograph by Rasool Fattahi";
  const location = photo.location || "";
  const place = location.split(",")[0].trim() || "Photography Archive";
  const year = String(photo.date || "").slice(0, 4);
  const pageTitle = `${title} | Rasool Fattahi Photography`;
  const description = photo.description || photo.alt || `Photograph by Rasool Fattahi: ${title}.`;
  const ogDescription = `${title}${year ? `, photographed in ${year}` : ""}.`;
  const caption = cleanCaption(photo.caption || `${place}${year ? `, ${year}` : ""}`);
  const visibleDescription = cleanCaption(photo.alt || photo.description || title);

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "url": imageUrl,
    "name": title,
    "description": description,
    "caption": caption,
    ...(location ? { "contentLocation": { "@type": "Place", "name": location } } : {}),
    ...(photo.date ? { "dateCreated": photo.date } : {}),
    ...(photo.width ? { "width": photo.width } : {}),
    ...(photo.height ? { "height": photo.height } : {}),
    "author": { "@type": "Person", "name": "Rasool Fattahi", "url": `${site}/` }
  };

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="author" content="Rasool Fattahi">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${pageUrl}">
<link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Rasool Fattahi Photography">
<meta property="og:title" content="${escapeHtml(pageTitle)}">
<meta property="og:description" content="${escapeHtml(ogDescription)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:image:alt" content="${escapeHtml(photo.alt || title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(pageTitle)}">
<meta name="twitter:description" content="${escapeHtml(ogDescription)}">
<meta name="twitter:image" content="${imageUrl}">
<script type="application/ld+json">${JSON.stringify(imageObject)}</script>
<link rel="stylesheet" href="photo.css">
</head>
<body class="photo-page">
<header class="photo-header"><a class="photo-brand" href="../">Rasool Fattahi</a><a class="photo-back" href="../">Photography Archive</a></header>
<main class="photo-main"><figure class="photo-figure"><img class="photo-image" src="../images/${photo.file}" alt="${escapeHtml(photo.alt || title)}"${photo.width ? ` width="${photo.width}"` : ""}${photo.height ? ` height="${photo.height}"` : ""}><figcaption class="photo-info"><h1 class="photo-title">${escapeHtml(caption)}</h1><p class="photo-meta">${escapeHtml(location)}${year ? ` · ${escapeHtml(year)}` : ""}</p></figcaption><p class="photo-description">${escapeHtml(visibleDescription)}</p></figure></main>
<footer class="photo-footer">© Rasool Fattahi</footer>
</body>
</html>
`;

  fs.writeFileSync(`photos/${slug}.html`, html);
}

console.log(`Generated ${photos.length} photo detail pages from photos.js.`);

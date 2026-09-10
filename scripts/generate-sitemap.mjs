import fs from "node:fs";
import vm from "node:vm";

const site = "https://thefattahi.github.io";
const source = fs.readFileSync("photos.js", "utf8");
const context = {};
vm.runInNewContext(`${source}\nresult = photos;`, context);
const photos = Array.isArray(context.result) ? context.result : [];

const escapeXml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const today = new Date().toISOString().slice(0, 10);

const images = photos.map((photo) => {
  const loc = `${site}/images/${encodeURI(photo.file)}`;
  const title = photo.title || photo.alt || "Photograph by Rasool Fattahi";
  const caption = photo.caption || photo.description || photo.alt || title;
  return `    <image:image>\n      <image:loc>${escapeXml(loc)}</image:loc>\n      <image:title>${escapeXml(title)}</image:title>\n      <image:caption>${escapeXml(caption)}</image:caption>\n    </image:image>`;
}).join("\n");

const photoPages = photos.map((photo) => {
  const slug = photo.file.replace(/\.[^.]+$/, "");
  return `  <url>\n    <loc>${site}/photos/${encodeURIComponent(slug)}.html</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${site}/</loc>\n    <lastmod>${today}</lastmod>\n${images}\n  </url>\n  <url>\n    <loc>${site}/fa/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n${photoPages}\n</urlset>\n`;

fs.writeFileSync("sitemap.xml", sitemap);
console.log(`Generated sitemap for ${photos.length} photos plus the Persian archive and photo detail pages.`);

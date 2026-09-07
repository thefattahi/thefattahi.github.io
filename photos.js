/*
  PHOTO PUBLISHING FORMAT
  -----------------------
  file        : exact filename inside /images
  title       : specific, natural, SEO-friendly title (English)
  alt         : factual visual description; never keyword-stuffed
  description : optional longer editorial description with real context
  caption     : optional visible caption; leave empty/omit for captionless images
  location    : optional city/country or specific place
  date        : optional YYYY-MM-DD (when the photograph was taken)
  publishedAt : publication/upload timestamp used for archive order
  keywords    : optional search-intent phrases in English and Persian
  width       : optional original pixel width
  height      : optional original pixel height

  SEO RULES
  ---------
  There are intentionally no public photo categories. Each photograph is part of
  one curated archive. Use metadata to describe the actual subject and context.

  Titles should identify the image naturally, ideally including a real place,
  subject or event when relevant. Avoid generic titles and keyword stuffing.

  Alt text should describe what is visibly present in the image for accessibility
  and image search. Do not write SEO copy as alt text.

  Keywords may include genuine secondary subjects, locations, photography terms,
  and useful Persian search phrases. Only add terms that truly describe the image.

  The gallery is ordered automatically by publishedAt, newest first.

  PHOTO 01: Cologne — 2022
  PHOTO 02: Autumn Tree, Frankfurt — 2022
  PHOTO 03: Hafez–Goethe Monument, Weimar — 2022
*/

const photos = [
  {
    file: "cologne-cathedral-2022.jpg",
    title: "Cologne Cathedral and Equestrian Monument",
    alt: "Cologne Cathedral rises behind a bronze equestrian monument, with orange trains crossing the railway tracks in the foreground under an overcast sky.",
    description: "Cologne Cathedral and an equestrian monument near the Hohenzollern Bridge, photographed in Cologne in 2022. Orange trains pass through the foreground, contrasting with the Gothic cathedral and historic monument.",
    caption: "Cologne, 2022",
    location: "Cologne, Germany",
    date: "2022",
    publishedAt: "2026-09-08T00:28:00+02:00",
    keywords: [
      "Cologne Cathedral",
      "Kölner Dom",
      "Cologne Germany photography",
      "Cologne photography",
      "Hohenzollern Bridge",
      "equestrian monument Cologne",
      "Cologne train photography",
      "urban photography Cologne",
      "Gothic architecture Cologne",
      "عکاسی کلن",
      "کلیسای جامع کلن",
      "کلن آلمان",
      "پل هوهنزولرن"
    ],
    width: 1024,
    height: 1536
  },
  {
    file: "autumn-tree-frankfurt-2022.jpg",
    title: "Autumn Tree, Frankfurt",
    alt: "A large autumn tree with rust-coloured leaves beside a park path and pond in Frankfurt, Germany, with two people walking beneath it.",
    description: "An autumn scene in Frankfurt, photographed in 2022. A large tree with dense rust-coloured foliage dominates the frame, while two people walk along a quiet path beside the water.",
    caption: "Frankfurt, 2022",
    location: "Frankfurt, Germany",
    date: "2022",
    publishedAt: "2026-09-07T22:18:43+02:00",
    keywords: [
      "Frankfurt autumn",
      "Frankfurt Germany photography",
      "autumn tree Frankfurt",
      "Frankfurt park",
      "Frankfurt nature photography",
      "autumn photography Germany",
      "fall foliage Frankfurt",
      "urban nature Frankfurt",
      "عکاسی فرانکفورت",
      "پاییز فرانکفورت",
      "درخت پاییزی",
      "فرانکفورت آلمان"
    ],
    width: 1024,
    height: 1536
  },
  {
    file: "hafez-goethe-monument-weimar-2022.jpg",
    title: "Hafez–Goethe Monument, Weimar",
    alt: "Two monumental granite chairs facing each other at the Hafez–Goethe Monument in Weimar, Germany, surrounded by autumn trees and a historic white building.",
    description: "The Hafez–Goethe Monument on Beethovenplatz in Weimar, photographed in autumn 2022. Two monumental granite chairs face one another, symbolising the imagined dialogue between the Persian poet Hafez and the German poet Johann Wolfgang von Goethe.",
    caption: "HAFEZ-Goethe\nWeimar, 2022",
    location: "Weimar, Germany",
    date: "2022",
    publishedAt: "2026-09-07T17:12:35+02:00",
    keywords: [
      "Hafez-Goethe Monument",
      "Hafis-Goethe-Denkmal",
      "Hafez Goethe Weimar",
      "Hafez monument Weimar",
      "Goethe monument Weimar",
      "Beethovenplatz Weimar",
      "Weimar Germany photography",
      "Hafez photography",
      "Persian poetry in Germany",
      "Goethe and Hafez",
      "East-West cultural dialogue",
      "عکاسی وایمار",
      "بنای حافظ گوته",
      "حافظ و گوته",
      "وایمار آلمان"
    ],
    width: 1536,
    height: 1024
  }
];

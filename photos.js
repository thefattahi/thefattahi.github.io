/*
  PHOTO PUBLISHING FORMAT
  -----------------------
  file        : exact filename inside /images
  title       : specific, natural, SEO-friendly title (English)
  alt         : factual visual description; never keyword-stuffed
  description : optional longer editorial description with real context
  caption     : optional visible caption; leave empty/omit for captionless images
  location    : optional city/country or specific place
  date        : optional YYYY-MM-DD
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

  PHOTO 01: Hafez–Goethe Monument, Weimar — 2022
  PHOTO 02: Autumn Tree, Frankfurt — 2022
*/

const photos = [
  {
    file: "hafez-goethe-monument-weimar-2022.jpg",
    title: "Hafez–Goethe Monument, Weimar",
    alt: "Two monumental granite chairs facing each other at the Hafez–Goethe Monument in Weimar, Germany, surrounded by autumn trees and a historic white building.",
    description: "The Hafez–Goethe Monument on Beethovenplatz in Weimar, photographed in autumn 2022. Two monumental granite chairs face one another, symbolising the imagined dialogue between the Persian poet Hafez and the German poet Johann Wolfgang von Goethe.",
    caption: "HAFEZ-Goethe\nWeimar, 2022",
    location: "Weimar, Germany",
    date: "2022",
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
  },
  {
    file: "autumn-tree-frankfurt-2022.jpg",
    title: "Autumn Tree, Frankfurt",
    alt: "A large autumn tree with rust-coloured leaves beside a park path and pond in Frankfurt, Germany, with two people walking beneath it.",
    description: "An autumn scene in Frankfurt, photographed in 2022. A large tree with dense rust-coloured foliage dominates the frame, while two people walk along a quiet path beside the water.",
    caption: "Frankfurt\n2022",
    location: "Frankfurt, Germany",
    date: "2022",
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
  }
];

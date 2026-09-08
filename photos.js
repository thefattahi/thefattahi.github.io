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

  PHOTO 01: Prague — 2023
  PHOTO 02: Prague — 2023
  PHOTO 03: Nordhausen — 2022
  PHOTO 04: Hamburg — 2022
  PHOTO 05: Berlin — 2022
  PHOTO 06: Cologne — 2022
  PHOTO 07: Autumn Tree, Frankfurt — 2022
  PHOTO 08: Hafez–Goethe Monument, Weimar — 2022
*/

const photos = [
  {
    file: "prague-wenceslas-square-night-2023.jpg",
    title: "Wenceslas Square at Night",
    alt: "Wenceslas Square at night in Prague, with illuminated historic buildings, Christmas lights, a central monument and a bench in the foreground.",
    description: "Wenceslas Square at night in Prague, photographed in 2023. The illuminated historic buildings, festive trees and central monument form a symmetrical urban scene, with a rain-darkened square and bench in the foreground.",
    caption: "Prague, 2023",
    location: "Wenceslas Square, Prague, Czech Republic",
    date: "2023",
    publishedAt: "2026-09-08T17:54:01+02:00",
    keywords: [
      "Wenceslas Square Prague",
      "Václavské náměstí",
      "Wenceslas Square at night",
      "Prague night photography",
      "Prague Christmas lights",
      "Prague city centre",
      "Prague architecture",
      "Prague photography",
      "Czech Republic photography",
      "عکاسی پراگ",
      "میدان ونسسلاس پراگ",
      "میدان واتسلاو پراگ",
      "پراگ در شب",
      "جمهوری چک"
    ],
    width: 1086,
    height: 1630
  },
  {
    file: "prague-night-view-2023.jpg",
    title: "Prague at Night",
    alt: "Night view over Prague with illuminated historic buildings, the Vltava River and Charles Bridge seen from a hillside path.",
    description: "A night view across Prague, photographed in 2023. The illuminated historic cityscape and Vltava River unfold beyond a descending cobblestone path, framed by bare trees and warm street lights.",
    caption: "Prague, 2023",
    location: "Prague, Czech Republic",
    date: "2023",
    publishedAt: "2026-09-08T17:54:00+02:00",
    keywords: [
      "Prague at night",
      "Prague night view",
      "Prague skyline",
      "Vltava River Prague",
      "Charles Bridge Prague",
      "Prague cityscape",
      "Prague night photography",
      "Prague photography",
      "Czech Republic photography",
      "عکاسی پراگ",
      "پراگ در شب",
      "نمای شبانه پراگ",
      "رود ولتاوا",
      "پل چارلز"
    ],
    width: 896,
    height: 1195
  },
  {
    file: "nordhausen-fog-2022.jpg",
    title: "Foggy Street, Nordhausen",
    alt: "A fog-covered urban intersection in Nordhausen, Germany, with tram tracks, overhead wires, traffic lights and a Rossmann building fading into the mist.",
    description: "A foggy street scene in Nordhausen, photographed in 2022. Tram tracks, overhead wires and traffic lights disappear gradually into dense mist, creating a quiet and atmospheric urban landscape.",
    caption: "Nordhausen, 2022",
    location: "Nordhausen, Germany",
    date: "2022",
    publishedAt: "2026-09-08T15:55:00+02:00",
    keywords: [
      "Nordhausen fog",
      "Nordhausen Germany photography",
      "foggy street Nordhausen",
      "Nordhausen tram",
      "Nordhausen urban photography",
      "fog photography Germany",
      "misty city street",
      "atmospheric urban photography",
      "عکاسی نوردهاوزن",
      "مه نوردهاوزن",
      "خیابان مه آلود",
      "نوردهاوزن آلمان"
    ],
    width: 1024,
    height: 1536
  },
  {
    file: "hamburg-speicherstadt-2022.jpg",
    title: "Hamburg Speicherstadt",
    alt: "Historic red-brick warehouse buildings lining a canal in Hamburg's Speicherstadt, with a bridge in the distance.",
    description: "A symmetrical view through Hamburg's historic Speicherstadt, photographed in 2022. Red-brick warehouse buildings line both sides of the canal, creating strong architectural perspective and leading lines toward the distant bridge.",
    caption: "Hamburg, 2022",
    location: "Speicherstadt, Hamburg, Germany",
    date: "2022",
    publishedAt: "2026-09-08T15:55:00+02:00",
    keywords: [
      "Hamburg Speicherstadt",
      "Speicherstadt Hamburg",
      "Hamburg canal",
      "Hamburg warehouse district",
      "Hamburg architecture",
      "Hamburg photography",
      "Speicherstadt photography",
      "UNESCO Hamburg",
      "red brick architecture",
      "Germany photography",
      "عکاسی هامبورگ",
      "اشپایشرشتات هامبورگ",
      "کانال هامبورگ",
      "معماری هامبورگ",
      "هامبورگ آلمان"
    ],
    width: 1024,
    height: 1536
  },
  {
    file: "berlin-victory-column-2022.jpg",
    title: "Berlin Victory Column",
    alt: "The Berlin Victory Column with the gilded Victoria statue viewed from a broad staircase between stone walls under a clear sky.",
    description: "The Berlin Victory Column (Siegessäule), photographed from the entrance staircase in Berlin in 2022. The symmetrical staircase and surrounding stone walls lead the eye toward the column and its gilded Victoria statue.",
    caption: "Berlin, 2022",
    location: "Berlin, Germany",
    date: "2022",
    publishedAt: "2026-09-08T03:18:00+02:00",
    keywords: [
      "Berlin Victory Column",
      "Siegessäule Berlin",
      "Goldelse Berlin",
      "Victory Column Germany",
      "Berlin landmark",
      "Berlin monument",
      "Berlin photography",
      "Berlin architecture photography",
      "Tiergarten Berlin",
      "Germany photography",
      "عکاسی برلین",
      "ستون پیروزی برلین",
      "زیگس زویله برلین",
      "برلین آلمان"
    ],
    width: 1024,
    height: 1536
  },
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

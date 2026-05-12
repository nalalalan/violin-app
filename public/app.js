const app = document.getElementById("app");

const metBase = "https://images.metmuseum.org/CRDImages/mi/web-large/";

function metImage(file) {
  return `${metBase}${encodeURIComponent(file)}`;
}

function metPage(id) {
  return `https://www.metmuseum.org/art/collection/search/${id}`;
}

function locImage(root, index, pct = "70.0") {
  const number = String(index).padStart(4, "0");
  return `https://tile.loc.gov/image-services/iiif/public:music:${root}:${root}.${number}/full/pct:${pct}/0/default.jpg`;
}

function locPage(id) {
  return `https://www.loc.gov/item/${id}/`;
}

function commonsImage(file, width = 1800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function metBack(key, id, file, title, kind = "full") {
  return {
    key,
    image: metImage(file),
    url: metPage(id),
    title,
    kind,
  };
}

function locBack(key, id, root, index, title, kind = "full", pct = "70.0") {
  return {
    key,
    image: locImage(root, index, pct),
    url: locPage(id),
    title,
    kind,
  };
}

function commonsBack(key, file, title, kind = "full") {
  return {
    key,
    image: commonsImage(file),
    url: commonsSource(file),
    title,
    kind,
  };
}

function directBack(key, image, url, title, kind = "full") {
  return {
    key,
    image,
    url,
    title,
    kind,
  };
}

// Accepted gate: every source below is a back view or back detail of a fine
// violin from a museum, public archive, or fine-instrument publication.
const backSources = [
  metBack("met-strad-antonius-back", 503008, "DP216543.jpg", "1711 Antonius Stradivari"),
  metBack("met-strad-francesca-back", 503010, "DP167846.jpg", "1694 Francesca Stradivari"),
  metBack("met-nicolo-amati-back", 503057, "DP232340.jpg", "1669 Nicolo Amati"),
  metBack("met-gragnani-back", 500905, "DP230470.jpg", "1783 Antonio Gragnani"),
  metBack("met-gemunder-1893-back", 504401, "DP-20993-002.jpg", "1893 August Martin Gemunder"),
  metBack("met-gemunder-second-back", 504402, "DP-20992-002.jpg", "August Martin Gemunder"),
  metBack("met-pique-back", 504515, "DP-21006-002.jpg", "1803 Francois-Louis Pique"),
  metBack("met-carcassi-back", 504665, "DP-21000-002.jpg", "1752 Lorenzo Carcassi"),
  metBack("met-hyde-back", 505793, "DP-20991-002.jpg", "1889 Andrew Hyde"),
  metBack("met-italian-back", 504254, "DP-21555-002.jpg", "Italian violin back"),
  metBack("met-gedler-back", 505322, "DP-21586-002.jpg", "Johann Anton Gedler"),

  locBack("loc-betts-back", "2022560101", "musihas-200154811", 1, "1704 Betts Stradivari"),
  locBack("loc-betts-corners", "2022560101", "musihas-200154811", 4, "1704 Betts Stradivari", "detail"),
  locBack("loc-betts-waist", "2022560101", "musihas-200154811", 6, "1704 Betts Stradivari", "detail"),
  locBack("loc-betts-endpin", "2022560101", "musihas-200154811", 8, "1704 Betts Stradivari", "detail"),
  locBack("loc-betts-lower", "2022560101", "musihas-200154811", 16, "1704 Betts Stradivari", "detail"),

  locBack("loc-castelbarco-back", "2022560098", "musihas-200154809", 1, "1699 Castelbarco Stradivari"),
  locBack("loc-castelbarco-corners", "2022560098", "musihas-200154809", 4, "1699 Castelbarco Stradivari", "detail"),
  locBack("loc-castelbarco-waist", "2022560098", "musihas-200154809", 6, "1699 Castelbarco Stradivari", "detail"),
  locBack("loc-castelbarco-endpin", "2022560098", "musihas-200154809", 9, "1699 Castelbarco Stradivari", "detail"),

  locBack("loc-ward-back", "2022560100", "musihas-200154810", 1, "1700 Ward Stradivari"),
  locBack("loc-ward-corners", "2022560100", "musihas-200154810", 4, "1700 Ward Stradivari", "detail"),
  locBack("loc-ward-waist", "2022560100", "musihas-200154810", 6, "1700 Ward Stradivari", "detail"),

  locBack("loc-kreisler-back", "2022560099", "musihas-200154814", 1, "ca. 1730 Kreisler Guarneri del Gesu"),
  locBack("loc-kreisler-corners", "2022560099", "musihas-200154814", 4, "ca. 1730 Kreisler Guarneri del Gesu", "detail"),
  locBack("loc-kreisler-waist", "2022560099", "musihas-200154814", 6, "ca. 1730 Kreisler Guarneri del Gesu", "detail"),
  locBack("loc-kreisler-endpin", "2022560099", "musihas-200154814", 9, "ca. 1730 Kreisler Guarneri del Gesu", "detail"),

  locBack("loc-brookings-back", "2022560097", "musihas-200154831", 1, "1654 Brookings Nicolo Amati"),
  locBack("loc-brookings-corners", "2022560097", "musihas-200154831", 4, "1654 Brookings Nicolo Amati", "detail"),
  locBack("loc-brookings-waist", "2022560097", "musihas-200154831", 6, "1654 Brookings Nicolo Amati", "detail"),
  locBack("loc-brookings-endpin", "2022560097", "musihas-200154831", 9, "1654 Brookings Nicolo Amati", "detail"),

  directBack(
    "strings-ysaye-back",
    "https://i0.wp.com/stringsmagazine.com/wp-content/uploads/2023/10/l40064back.jpg?resize=1200%2C2000&ssl=1",
    "https://stringsmagazine.com/beauty-of-the-1740-ysaye-guarneri-del-gesu-violin/",
    "1740 Ysaye Guarneri del Gesu"
  ),
  directBack(
    "strings-ysaye-detail",
    "https://i0.wp.com/stringsmagazine.com/wp-content/uploads/2023/10/1740-Ysaye-Guarneri-del-Gesu-violin-back-detail-Nippon-Music-Foundation.jpg?fit=1800%2C1200&ssl=1",
    "https://stringsmagazine.com/beauty-of-the-1740-ysaye-guarneri-del-gesu-violin/",
    "1740 Ysaye Guarneri del Gesu",
    "detail"
  ),

  directBack(
    "commons-prince-doria-back",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Back_Plate_Prince_Doria_1734.jpg",
    commonsSource("Back Plate Prince Doria 1734.jpg"),
    "1734 Prince Doria Guarneri del Gesu",
    "detail"
  ),
  directBack(
    "commons-strad-back",
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/Stradivarius_violin_back.jpg",
    commonsSource("Stradivarius violin back.jpg"),
    "Stradivari violin back"
  ),
  directBack(
    "commons-sderci-back",
    "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sderci_Igino_violin_back_1924.jpg",
    commonsSource("Sderci Igino violin back 1924.jpg"),
    "1924 Igino Sderci"
  ),
  directBack(
    "commons-garimberti-back",
    "https://upload.wikimedia.org/wikipedia/commons/2/29/Ferdinando_Garimberti_Violin%2C_Featured_in_the_Ferdinando_Garimberti_Book%2C_Back.jpg",
    commonsSource("Ferdinando Garimberti Violin, Featured in the Ferdinando Garimberti Book, Back.jpg"),
    "Ferdinando Garimberti"
  ),
];

const fullVariants = [
  { key: "body", detail: "maple back", shape: "cinema", focus: "center 76%" },
  { key: "upper", detail: "upper back", shape: "portrait", focus: "center 68%" },
  { key: "center", detail: "maple center", shape: "cinema", focus: "center 68%" },
  { key: "lower", detail: "lower back", shape: "square", focus: "center 74%" },
];

const detailVariants = [
  { key: "detail", detail: "back detail", shape: "cinema", focus: "center 50%" },
  { key: "grain", detail: "maple flame", shape: "square", focus: "center 55%" },
  { key: "edge", detail: "edgework", shape: "wide", focus: "center 62%" },
];

function variantsFor(source) {
  return source.kind === "detail" ? detailVariants : fullVariants;
}

function expandSourceVariant(source, variant) {
  return {
    key: `${source.key}-${variant.key}`,
    image: source.image,
    url: source.url,
    caption: `${source.title}, ${variant.detail}.`,
    shape: variant.shape,
    focus: variant.focus,
  };
}

function interleaveSources(sources) {
  const longestVariantSet = Math.max(...sources.map((source) => variantsFor(source).length));
  const interleaved = [];
  for (let variantIndex = 0; variantIndex < longestVariantSet; variantIndex += 1) {
    sources.forEach((source) => {
      const variant = variantsFor(source)[variantIndex];
      if (variant) interleaved.push(expandSourceVariant(source, variant));
    });
  }
  return interleaved;
}

function expandSource(source) {
  const variants = source.kind === "detail" ? detailVariants : fullVariants;
  return variants.map((variant) => expandSourceVariant(source, variant));
}

const items = interleaveSources(backSources);

function createTile(item, index) {
  const link = document.createElement("a");
  link.className = `tile tile--${item.shape || "standard"}`;
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", item.caption);
  link.style.setProperty("--focus", item.focus || "center");

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = "";
  img.loading = index < 24 ? "eager" : "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => link.remove(), { once: true });

  const caption = document.createElement("span");
  caption.className = "caption";
  const captionText = document.createElement("span");
  captionText.textContent = item.caption;
  caption.append(captionText);

  link.append(img, caption);
  return link;
}

const batchSize = 72;

function batchItems(batch) {
  const start = batch * batchSize;
  return items.slice(start, start + batchSize);
}

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 2;
  if (width <= 820) return 3;
  if (width <= 1180) return 4;
  return Math.max(5, Math.min(7, Math.floor(width / 270)));
}

function shapeScore(item) {
  return {
    cinema: 0.72,
    hero: 1.72,
    portrait: 1.4,
    square: 1,
    tall: 1.75,
    wide: 0.62,
  }[item.shape || "standard"] || 1.25;
}

function layoutWall(wall, renderedItems) {
  const count = columnCount();
  const columns = Array.from({ length: count }, () => {
    const column = document.createElement("div");
    column.className = "masonry-column";
    return column;
  });
  const heights = Array.from({ length: count }, () => 0);

  renderedItems.forEach((item, index) => {
    let target = 0;
    for (let i = 1; i < heights.length; i += 1) {
      if (heights[i] < heights[target]) target = i;
    }
    columns[target].append(createTile(item, index));
    heights[target] += shapeScore(item) + 0.03;
  });

  wall.style.setProperty("--columns", count);
  wall.replaceChildren(...columns);
}

function render() {
  const main = document.createElement("main");
  main.className = "image-app";
  main.setAttribute("aria-label", "Fine violin back wall");

  const wall = document.createElement("div");
  wall.className = "wall";

  const marker = document.createElement("span");
  marker.className = "corner-mark";
  marker.setAttribute("aria-hidden", "true");

  const sentinel = document.createElement("div");
  sentinel.className = "sentinel";
  sentinel.setAttribute("aria-hidden", "true");

  let batch = 0;
  let exhausted = false;
  const renderedItems = [];
  const appendBatch = () => {
    if (exhausted) return;
    const nextItems = batchItems(batch);
    if (!nextItems.length) {
      exhausted = true;
      sentinel.hidden = true;
      return;
    }
    renderedItems.push(...nextItems);
    layoutWall(wall, renderedItems);
    batch += 1;
    exhausted = renderedItems.length >= items.length;
    sentinel.hidden = exhausted;
  };

  appendBatch();
  appendBatch();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!exhausted && entries.some((entry) => entry.isIntersecting)) {
        appendBatch();
      }
    }, { rootMargin: "1800px 0px" });
    observer.observe(sentinel);
  } else {
    window.addEventListener("scroll", () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 1800;
      if (!exhausted && nearBottom) appendBatch();
    }, { passive: true });
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => layoutWall(wall, renderedItems), 140);
  }, { passive: true });

  main.append(wall, marker, sentinel);
  app.replaceChildren(main);
}

render();

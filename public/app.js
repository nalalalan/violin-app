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

function metBack(key, id, file, title) {
  return {
    key,
    image: metImage(file),
    url: metPage(id),
    title,
  };
}

function metFileBack(key, file, title) {
  return {
    key,
    image: metImage(file),
    url: metImage(file),
    title,
  };
}

function locBack(key, id, root, index, title, pct = "70.0") {
  return {
    key,
    image: locImage(root, index, pct),
    url: locPage(id),
    title,
  };
}

function commonsBack(key, file, title) {
  return {
    key,
    image: commonsImage(file),
    url: commonsSource(file),
    title,
  };
}

function directBack(key, image, url, title) {
  return {
    key,
    image,
    url,
    title,
  };
}

// Accepted gate: every source below is a full violin-back view of a fine,
// antique, historically important, or high-end instrument. No fronts, scrolls,
// labels, diagrams, crops, corner details, or manufactured zoom variants.
const backSources = [
  metBack("met-tielke-back", 503443, "DP163303.jpg", "Joachim Tielke violin"),
  metBack("met-strad-antonius-back", 503008, "DP216543.jpg", "1711 Antonius Stradivari"),
  metBack("met-strad-francesca-back", 503010, "DP167846.jpg", "1694 Francesca Stradivari"),
  metBack("met-andrea-amati-kurtz-back", 503517, "DP147094.jpg", "ex Kurtz Andrea Amati"),
  metBack("met-nicolo-amati-back", 503057, "DP232340.jpg", "1669 Nicolo Amati"),
  metBack("met-gragnani-back", 500905, "DP230470.jpg", "1783 Antonio Gragnani"),
  metBack("met-holmes-back", 506169, "DP222974.jpg", "Philip Henry Holmes violin"),
  metBack("met-gemunder-1893-back", 504401, "DP-20993-002.jpg", "1893 August Martin Gemunder"),
  metBack("met-gemunder-second-back", 504402, "DP-20992-002.jpg", "August Martin Gemunder"),
  metBack("met-pique-back", 504515, "DP-21006-002.jpg", "1803 Francois-Louis Pique"),
  metBack("met-carcassi-back", 504665, "DP-21000-002.jpg", "1752 Lorenzo Carcassi"),
  metBack("met-hyde-back", 505793, "DP-20991-002.jpg", "1889 Andrew Hyde"),
  metBack("met-italian-back", 504254, "DP-21555-002.jpg", "Italian violin back"),
  metBack("met-gedler-back", 505322, "DP-21586-002.jpg", "Johann Anton Gedler"),
  metFileBack("met-testore-back", "DP-21005-002.jpg", "1737 Carlo Antonio Testore"),
  metFileBack("met-olsen-back", "DP-21003-002.jpg", "1915 Lars Jorgen Rudolf Olsen"),
  metFileBack("met-unknown-1625-back", "DP-21004-002.jpg", "after 1625 violin"),
  metFileBack("met-eighteenth-century-back", "DP-21007-002.jpg", "18th-century violin"),
  metFileBack("met-plain-maple-back", "DP-21579-002.jpg", "Metropolitan Museum violin"),
  metFileBack("met-decorated-back", "DP-21580-002.jpg", "decorated violin"),
  metFileBack("met-light-maple-back", "DP-21581-002.jpg", "Metropolitan Museum violin"),
  metFileBack("met-older-maple-back", "DP-21582-002.jpg", "Metropolitan Museum violin"),
  metFileBack("met-broad-maple-back", "DP-21583-002.jpg", "Metropolitan Museum violin"),

  locBack("loc-betts-back", "2022560101", "musihas-200154811", 1, "1704 Betts Stradivari"),
  locBack("loc-castelbarco-back", "2022560098", "musihas-200154809", 1, "1699 Castelbarco Stradivari"),
  locBack("loc-ward-back", "2022560100", "musihas-200154810", 1, "1700 Ward Stradivari"),
  locBack("loc-kreisler-back", "2022560099", "musihas-200154814", 1, "ca. 1730 Kreisler Guarneri del Gesu"),
  locBack("loc-brookings-back", "2022560097", "musihas-200154831", 1, "1654 Brookings Nicolo Amati"),

  directBack(
    "strings-ysaye-back",
    "https://i0.wp.com/stringsmagazine.com/wp-content/uploads/2023/10/l40064back.jpg?resize=1200%2C2000&ssl=1",
    "https://stringsmagazine.com/beauty-of-the-1740-ysaye-guarneri-del-gesu-violin/",
    "1740 Ysaye Guarneri del Gesu"
  ),

  directBack(
    "commons-prince-doria-back",
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Back_Plate_Prince_Doria_1734.jpg",
    commonsSource("Back Plate Prince Doria 1734.jpg"),
    "1734 Prince Doria Guarneri del Gesu"
  ),
  commonsBack("commons-bisiach-back", "Bisiach Carlo Firenze 1938 2.jpg", "1938 Carlo Bisiach"),
  commonsBack("commons-collin-mezin-back", "Charles Jean B.Collin-Mezin,Violin 1890.JPG", "1890 Charles Jean Baptiste Collin-Mezin"),
  commonsBack("commons-guy-rabut-black-back", "The Black Violin (back) at Guy Rabut's workshop.jpg", "Guy Rabut Black Violin"),
  commonsBack("commons-vuillaume-messie-copy-back", "J.B.Vuillaume 1860 back \"Le Messie\" Stradivarius copy.jpg", "1860 J. B. Vuillaume Le Messie copy"),
  commonsBack("commons-vuillaume-back", "Vuillaume violin backside.jpg", "J. B. Vuillaume violin"),
  commonsBack("commons-rautmann-back", "Rautmann Violin Back.jpg", "1893 Hermann Rautmann"),
  commonsBack("commons-caussin-back", "Caussin-dos.jpg", "Caussin school violin"),
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
  directBack(
    "commons-poggi-back",
    "https://upload.wikimedia.org/wikipedia/commons/5/5a/Italian_Violin_by_Ansaldo_Poggi%2C_Bologna%2C_Stradivari_Model%2C_Back.jpg",
    commonsSource("Italian Violin by Ansaldo Poggi, Bologna, Stradivari Model, Back.jpg"),
    "Ansaldo Poggi"
  ),
];

const items = backSources.map((source) => ({
  ...source,
  caption: `${source.title}, full back.`,
  shape: "back",
  focus: "center",
}));

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
  img.loading = index < 48 ? "eager" : "lazy";
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
    back: 1.54,
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

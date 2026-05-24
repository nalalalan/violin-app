const app = document.getElementById("app");

const selectedViolins = [
  {
    key: "ysaye-guarneri-1740",
    image: "https://www.s-mf.or.jp/instruments/1740.png",
    url: "https://www.s-mf.or.jp/english/instruments/post_293.html",
    title: "1740 Ysaye Guarneri del Gesu",
    note: "Sasakawa Music Foundation image and history; Tarisio Cozio Archive 40064 checked.",
  },
  {
    key: "lord-wilton-guarneri-1742",
    image: "https://dnan0fzjxntrj.cloudfront.net/Pictures/1024x536/3/8/7/31387_lordwiltonviolin_185501.jpg",
    url: "https://www.thestrad.com/lutherie/the-strad-calendar-2024-1742-lord-wilton-guarneri-del-gesu-violin/16949.article",
    title: "1742 Lord Wilton Guarneri del Gesu",
    note: "The Strad calendar source; Tarisio Cozio Archive 40256 checked.",
  },
  {
    key: "spagnoletti-guarneri-1734",
    image: "https://dnan0fzjxntrj.cloudfront.net/Pictures/780xany/9/9/0/9990_full_574379.png",
    url: "https://www.thestrad.com/lutherie/from-the-archive-the-1734-spagnoletti-guarneri-del-gesu-violin/7609.article",
    title: "1734 Spagnoletti Guarneri del Gesu",
    note: "The Strad archive source.",
  },
  {
    key: "ex-vieuxtemps-stradivari-1710",
    image: "https://darntonhersh.com/wp-content/uploads/Vieuxtemps-Stradivari-back-628x1024.jpg",
    url: "https://darntonhersh.com/a-violin-by-antonio-stradivari/",
    title: "1710 ex-Vieuxtemps Stradivari",
    note: "Darnton & Hersh article source.",
  },
  {
    key: "carl-g-becker-sr-1940",
    image: "https://www.sharmusic.com/cdn/shop/files/F1S5491_Back_1000x.jpg?v=1774449692",
    url: "https://www.sharmusic.com/products/carl-g-becker-violin-chicago-1940",
    title: "Carl G. Becker Sr. violin, Chicago, 1940",
    note: "SHAR product source.",
  },
];

const items = selectedViolins.map((source) => ({
  ...source,
  caption: `${source.title}. ${source.note}`,
  shape: ["ysaye-guarneri-1740", "lord-wilton-guarneri-1742", "spagnoletti-guarneri-1734"].includes(source.key) ? "plate" : "back",
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
  img.loading = index < items.length ? "eager" : "lazy";
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

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 1;
  if (width <= 1000) return 2;
  return 3;
}

function shapeScore(item) {
  return {
    back: 1.54,
    plate: 1.34,
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
  main.setAttribute("aria-label", "Selected violin image wall");

  const wall = document.createElement("div");
  wall.className = "wall";

  const marker = document.createElement("span");
  marker.className = "corner-mark";
  marker.setAttribute("aria-hidden", "true");

  const sentinel = document.createElement("div");
  sentinel.className = "sentinel";
  sentinel.hidden = true;
  sentinel.setAttribute("aria-hidden", "true");

  const renderedItems = [...items];
  layoutWall(wall, renderedItems);

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => layoutWall(wall, renderedItems), 140);
  }, { passive: true });

  main.append(wall, marker, sentinel);
  app.replaceChildren(main);
}

render();

const app = document.getElementById("app");

const metBase = "https://images.metmuseum.org/CRDImages/mi/web-large/";

function metImage(file) {
  return `${metBase}${encodeURIComponent(file)}`;
}

function metPage(id) {
  return `https://www.metmuseum.org/art/collection/search/${id}`;
}

function commonsImage(file, width = 1800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function metFile(id, file, caption, shape = "portrait", focus) {
  return {
    image: metImage(file),
    url: metPage(id),
    caption,
    shape,
    focus,
  };
}

function commonsFile(file, caption, shape = "portrait", focus) {
  return {
    image: commonsImage(file, 1800),
    url: commonsSource(file),
    caption,
    shape,
    focus,
  };
}

const items = [
  metFile(503045, "DT669.jpg", "1693 Stradivari Gould, amber varnish and a baroque silhouette.", "hero", "center 45%"),
  metFile(503008, "DP105130.jpg", "1711 Stradivari Antonius, long Cremonese lines and glowing maple.", "tall"),
  metFile(503010, "DP167848.jpg", "1694 Stradivari Francesca, polished orange-brown varnish.", "portrait"),
  metFile(503057, "DP230434.jpg", "1669 Nicolo Amati, honey varnish and elegant arching.", "tall"),
  metFile(503517, "DP302645.jpg", "Andrea Amati ex Kurtz, ca. 1560, royal old-world presence.", "hero"),
  metFile(500905, "DP230469.jpg", "1783 Antonio Gragnani, Tuscan warmth and broad maple flame.", "portrait"),
  metFile(503443, "DP163308.jpg", "Joachim Tielke, ca. 1685, courtly ornament and dark polish.", "hero"),
  metFile(503045, "DT669a.jpg", "Gould Stradivari side view, quiet curl under museum light.", "wide"),
  metFile(503045, "mi55.86 a-c.R.jpg", "Gould Stradivari scroll and fittings, spare and balanced.", "square", "center 42%"),
  metFile(503008, "DP216543.jpg", "Antonius Stradivari back detail, maple flame like moving water.", "cinema", "center 55%"),
  metFile(503010, "DP34.86.2.jpg", "Francesca Stradivari full length, old varnish and fine f-holes.", "tall"),
  metFile(503010, "DP167846.jpg", "Francesca detail, worn varnish and a soft antique sheen.", "wide"),
  metFile(503010, "DP167847.jpg", "Francesca back view, broad flame under red-brown varnish.", "portrait"),
  metFile(503057, "DP1974.229.jpg", "Nicolo Amati back, restrained corners and warm Cremona glow.", "portrait"),
  metFile(503057, "DP232340.jpg", "Amati detail, delicate purfling and calm old edges.", "square"),
  metFile(503057, "DP232341.jpg", "Amati side detail, honey color and quiet precision.", "wide"),
  metFile(503057, "DP232342.jpg", "Amati rib detail, polished amber and tiny craft marks.", "square"),
  metFile(503057, "DP233049.jpg", "Amati scroll, carved with restraint and museum-clean light.", "portrait"),
  metFile(503057, "DP233050.jpg", "Amati pegbox detail, warm varnish against black shadow.", "square"),
  metFile(503517, "DP147089.jpg", "Andrea Amati painted ornament, ceremonial and impossibly old.", "cinema"),
  metFile(503517, "DP147090.jpg", "Ex Kurtz Amati front detail, pale gold under centuries of wear.", "wide"),
  metFile(503517, "DP147091.jpg", "Amati back detail, royal decoration still carrying the room.", "square"),
  metFile(503517, "DP147092.jpg", "Andrea Amati ribs and edgework, aged and luminous.", "portrait"),
  metFile(503517, "DP147093.jpg", "Ex Kurtz Amati detail, hand-painted history in close view.", "wide"),
  metFile(503517, "DP147094.jpg", "Amati scroll and ribs, carved old edges with pale gold glow.", "portrait"),
  metFile(503517, "DP147095.jpg", "Andrea Amati close detail, ornate surface and antique wear.", "square"),
  metFile(503517, "DP147096.jpg", "Amati corner detail, tiny marks from a very long life.", "wide"),
  metFile(503517, "DP147097.jpg", "Ex Kurtz Amati ornament, museum light over old paint.", "square"),
  metFile(500905, "DP230470.jpg", "Gragnani back view, ripe color and wide maple movement.", "portrait"),
  metFile(500905, "DP232351.jpg", "Gragnani close detail, varnish, corners, and calm tool marks.", "wide"),
  metFile(500905, "DP232352.jpg", "Antonio Gragnani rib detail, satin edge and amber depth.", "square"),
  metFile(500905, "DP232354.jpg", "Gragnani scroll, late-Italian charm in miniature.", "portrait"),
  metFile(500905, "265012.jpg", "Gragnani detail plate, warm varnish and old geometry.", "wide"),
  metFile(500905, "265013.jpg", "Gragnani detail, maple curl and quiet surface texture.", "square"),
  metFile(503443, "255844.jpg", "Tielke back view, dark ground and court-furniture drama.", "portrait"),
  metFile(503443, "DP163303.jpg", "Tielke ornament detail, pale carved decoration over dark polish.", "wide"),
  metFile(503443, "DP163304.jpg", "Joachim Tielke detail, ornate surface and precise edging.", "square"),
  metFile(503443, "DP163305.jpg", "Tielke ribs and corners, antique luxury in close-up.", "portrait"),
  metFile(503443, "DP163306.jpg", "Tielke scroll detail, carved decoration and deep shadow.", "square"),
  metFile(504514, "MI13.jpg", "1737 Carlo Antonio Testore, rougher Milanese charm and old amber.", "portrait"),
  metFile(504665, "DP-21000-001.jpg", "1752 Lorenzo Carcassi, clean Florentine shape and golden varnish.", "portrait"),
  metFile(504665, "DP-21000-002.jpg", "Carcassi back plate, flame stacked in slow waves.", "wide"),
  metFile(504515, "DP-21006-001.jpg", "1803 Francois-Louis Pique, Parisian polish with a deep red cast.", "portrait"),
  metFile(504515, "DP-21006-002.jpg", "Pique back view, satin flame and compact French outline.", "wide"),
  metFile(504401, "DP-20993-001.jpg", "1893 August Martin Gemunder, old-world model made in New York.", "portrait"),
  metFile(504401, "DP-20993-002.jpg", "Gemunder back view, polished flame and crisp outline.", "wide"),
  metFile(504401, "134619.jpg", "Gemunder detail, amber surface and tight old-school craft.", "square"),
  metFile(504402, "DP-20992-001.jpg", "Second Gemunder violin, full body and a confident varnish glow.", "portrait"),
  metFile(504402, "DP-20992-002.jpg", "Gemunder maple back, bright curl under soft light.", "wide"),
  metFile(505793, "DP-20991-001.jpg", "1889 Andrew Hyde, clean American work with a polished back glow.", "portrait"),
  metFile(505793, "DP-20991-002.jpg", "Hyde back plate, luminous flame and tidy corners.", "wide"),
  metFile(506169, "DP222973.jpg", "1885 Philip Henry Holmes, antique American violin with amber depth.", "portrait"),
  metFile(506169, "DP222974.jpg", "Holmes back view, dark curl and museum-light sheen.", "wide"),
  metFile(506169, "DP222975.jpg", "Holmes detail, fine edgework and old varnish texture.", "square"),
  metFile(506169, "DP222976.jpg", "Holmes ribs and corners, warm polish in close view.", "portrait"),
  metFile(506169, "DP222977.jpg", "Holmes scroll detail, carved lines and compact balance.", "square"),
  metFile(506169, "DP222978.jpg", "Holmes f-hole detail, spruce grain and amber wear.", "wide"),
  metFile(506169, "DP222979.jpg", "Holmes corner detail, handwork visible in the varnish.", "square"),
  metFile(506169, "DP222980.jpg", "Holmes side detail, dark ribs and soft highlights.", "portrait"),
  metFile(506169, "DP223221.jpg", "Holmes violin detail, quiet old surface and deep brown tone.", "wide"),
  metFile(505737, "DP217175.jpg", "Unknown maker after 1625, antique shape with a solemn old glow.", "portrait"),
  metFile(505737, "DP217176.jpg", "After-1625 violin back, soft maple figure and worn varnish.", "wide"),
  metFile(505737, "DP217177.jpg", "After-1625 detail, edge wear and warm wood under glass.", "square"),
  metFile(505737, "DP217178.jpg", "After-1625 scroll, darkened patina and compact carving.", "portrait"),
  metFile(505322, "DP-21586-001.jpg", "Johann Anton Gedler, ca. 1752-1800, compact antique glow.", "portrait"),
  metFile(505322, "DP-21586-002.jpg", "Gedler back plate, soft flame and quiet German craft.", "wide"),
  metFile(503400, "255999.jpg", "1753 Giovanni Battista Gabrielli, golden surface and old Italian poise.", "portrait"),
  metFile(501878, "DP-21053-001.jpg", "19th-century violin, rich varnish and formal museum posture.", "portrait"),
  metFile(501878, "DP-21053-002.jpg", "19th-century back view, broad glow and tidy outline.", "wide"),
  commonsFile("Il Cannone Paganini.jpg", "Guarneri del Gesu Cannone, Paganini's 1743 violin, narrow and fierce.", "tall"),
  commonsFile("Violin, 1716-Antonio Stradivari.jpg", "1716 Stradivari, long golden body and finely drawn f-holes.", "tall"),
  commonsFile("\"The Antonius\" Violin MET_DP216543.jpg", "Antonius Stradivari back detail, maple flame in full motion.", "cinema"),
];

function createTile(item, index) {
  const link = document.createElement("a");
  link.className = `tile tile--${item.shape || "standard"}`;
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", item.caption);
  if (item.focus) {
    link.style.setProperty("--focus", item.focus);
  }

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = "";
  img.loading = index < 18 ? "eager" : "lazy";
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

function shuffled(list, seed) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const x = Math.sin((seed + 1) * (i + 17)) * 10000;
    const j = Math.floor((x - Math.floor(x)) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 2;
  if (width <= 820) return 3;
  return Math.max(4, Math.min(9, Math.floor(width / 218)));
}

function shapeScore(item) {
  return {
    cinema: 0.72,
    hero: 1.6,
    portrait: 1.45,
    square: 1,
    tall: 1.75,
    wide: 0.63,
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
  main.setAttribute("aria-label", "Fine violin source wall");

  const wall = document.createElement("div");
  wall.className = "wall";

  const marker = document.createElement("span");
  marker.className = "corner-mark";
  marker.setAttribute("aria-hidden", "true");

  const sentinel = document.createElement("div");
  sentinel.className = "sentinel";
  sentinel.setAttribute("aria-hidden", "true");

  let batch = 0;
  const renderedItems = [];
  const appendBatch = () => {
    const batchItems = batch === 0 ? items : shuffled(items, batch);
    renderedItems.push(...batchItems);
    layoutWall(wall, renderedItems);
    batch += 1;
  };

  appendBatch();
  appendBatch();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        appendBatch();
      }
    }, { rootMargin: "1800px 0px" });
    observer.observe(sentinel);
  } else {
    window.addEventListener("scroll", () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 1800;
      if (nearBottom) appendBatch();
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

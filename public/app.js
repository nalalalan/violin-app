const app = document.getElementById("app");

function commonsImage(file, width = 1800) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

function commonsSource(file) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const met = "https://www.metmuseum.org/art/collection/search/";

const items = [
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DT669.jpg",
    url: `${met}503045`,
    caption: "1693 Stradivari with a baroque setup and warm orange-brown varnish.",
    shape: "hero",
    focus: "center 45%",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP105130.jpg",
    url: `${met}503008`,
    caption: "The Antonius Stradivari, 1711, glowing maple and long Cremonese lines.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP167848.jpg",
    url: `${met}503010`,
    caption: "The Francesca Stradivari, 1694, polished amber over tight spruce grain.",
    shape: "tall",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP230434.jpg",
    url: `${met}503057`,
    caption: "Nicolo Amati, 1669, elegant Cremona arching and deep honey varnish.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP302645.jpg",
    url: `${met}503517`,
    caption: "Andrea Amati ex Kurtz, ca. 1560, one of the old royal shapes.",
    shape: "tall",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP230469.jpg",
    url: `${met}500905`,
    caption: "Antonio Gragnani, 1783, lustrous top and calm late-Italian symmetry.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP216543.jpg",
    url: `${met}503008`,
    caption: "Antonius Stradivari detail: flame, edgework, and a dark old glow.",
    shape: "wide",
    focus: "center 55%",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DT669a.jpg",
    url: `${met}503045`,
    caption: "The Gould from another angle, quiet maple curl under museum light.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/mi55.86 a-c.R.jpg",
    url: `${met}503045`,
    caption: "Gould Stradivari scroll and fittings, spare and perfectly balanced.",
    shape: "square",
    focus: "center 42%",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP167846.jpg",
    url: `${met}503010`,
    caption: "Francesca Stradivari detail, varnish worn into a soft antique sheen.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP167847.jpg",
    url: `${met}503010`,
    caption: "Francesca back view, broad flame moving under red-brown varnish.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP34.86.2.jpg",
    url: `${met}503010`,
    caption: "Francesca full length, a quiet 1694 Stradivari silhouette.",
    shape: "tall",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP232340.jpg",
    url: `${met}503057`,
    caption: "Amati detail with restrained corners and old Cremonese poise.",
    shape: "square",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP232341.jpg",
    url: `${met}503057`,
    caption: "Nicolo Amati side detail, honey varnish and delicate purfling.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP233049.jpg",
    url: `${met}503057`,
    caption: "Amati scroll, carved with soft restraint and museum-clean light.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP147089.jpg",
    url: `${met}503517`,
    caption: "Andrea Amati detail, old painted ornament still carrying the room.",
    shape: "cinema",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP147091.jpg",
    url: `${met}503517`,
    caption: "Ex Kurtz Amati back detail, ceremonial work from the 1500s.",
    shape: "square",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP147094.jpg",
    url: `${met}503517`,
    caption: "Amati scroll and ribs, aged edges with pale gold undercoat.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP230470.jpg",
    url: `${met}500905`,
    caption: "Gragnani back view, wide maple flame with a ripe Tuscan color.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP232351.jpg",
    url: `${met}500905`,
    caption: "Gragnani close detail: varnish, corners, and calm craft marks.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/MI13.jpg",
    url: `${met}504514`,
    caption: "Carlo Antonio Testore, 1737, rougher Milanese charm and old amber.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-21000-001.jpg",
    url: `${met}504665`,
    caption: "Lorenzo Carcassi, 1752, clean Florentine shape and golden varnish.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-21000-002.jpg",
    url: `${met}504665`,
    caption: "Carcassi back plate, flame stacked in slow waves.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP163308.jpg",
    url: `${met}503443`,
    caption: "Joachim Tielke, ca. 1685, a violin dressed like court furniture.",
    shape: "hero",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP163303.jpg",
    url: `${met}503443`,
    caption: "Tielke ornament detail, dark ground and pale carved decoration.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-21006-001.jpg",
    url: `${met}504515`,
    caption: "Francois-Louis Pique, 1803, Parisian polish with a deep red cast.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-21006-002.jpg",
    url: `${met}504515`,
    caption: "Pique back view, satin flame and a compact French outline.",
    shape: "wide",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-20993-001.jpg",
    url: `${met}504401`,
    caption: "August Martin Gemunder, 1893, old-world model made in New York.",
    shape: "portrait",
  },
  {
    image: "https://images.metmuseum.org/CRDImages/mi/web-large/DP-20991-001.jpg",
    url: `${met}505793`,
    caption: "Andrew Hyde, 1889, clean American work with a polished back glow.",
    shape: "portrait",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Il_Cannone_Paganini.jpg/500px-Il_Cannone_Paganini.jpg",
    url: commonsSource("Il Cannone Paganini.jpg"),
    caption: "Guarneri del Gesu Cannone, Paganini's 1743 violin, narrow and fierce.",
    shape: "tall",
  },
  {
    image: commonsImage("Violin, 1716-Antonio Stradivari.jpg", 1800),
    url: commonsSource("Violin, 1716-Antonio Stradivari.jpg"),
    caption: "1716 Stradivari, long golden body and finely drawn f-holes.",
    shape: "tall",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/%22The_Antonius%22_Violin_MET_DP216543.jpg",
    url: "https://commons.wikimedia.org/wiki/File:%22The_Antonius%22_Violin_MET_DP216543.jpg",
    caption: "Antonius Stradivari back detail, flame like moving water.",
    shape: "cinema",
  },
];

function localAsset(index) {
  return `/assets/${String(index + 1).padStart(2, "0")}.jpg`;
}

function render() {
  const tiles = items.map((item, index) => {
    const shape = item.shape || "standard";
    const loading = index < 10 ? "eager" : "lazy";
    const style = item.focus ? ` style="--focus: ${escapeHtml(item.focus)}"` : "";
    return `
      <a class="tile tile--${escapeHtml(shape)}" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.caption)}"${style}>
        <img src="${escapeHtml(localAsset(index))}" alt="" loading="${loading}" decoding="async">
        <span class="caption"><span>${escapeHtml(item.caption)}</span></span>
      </a>
    `;
  }).join("");

  app.innerHTML = `
    <main class="image-app" aria-label="Fine violin source wall">
      <div class="wall">${tiles}</div>
      <span class="corner-mark" aria-hidden="true"></span>
    </main>
  `;
}

render();

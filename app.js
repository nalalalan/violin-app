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

// Source-expanded full-back corpus. Entries are generated from full-back image
// records whose filenames/source pages identify the view as the back, then visually
// sampled before publication. Do not add fronts, scrolls, labels, or detail crops.
const inglesHaydayBacks = [
  {
    "key": "ingles-a-violin-by-aegidius-kloz-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/aegidius-kloz-violin-mittenwald-1772-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-aegidius-kloz-3",
    "title": "A violin by Aegidius Kloz"
  },
  {
    "key": "ingles-a-violin-by-albert-blanchi",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/05/Albert-Blanchi-Nice-1931-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-albert-blanchi",
    "title": "Albert Blanchi violin Nice 1931"
  },
  {
    "key": "ingles-a-violin-by-aldo-zani-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/aldo-zani-violin-1970-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-aldo-zani-2",
    "title": "A violin by Aldo Zani"
  },
  {
    "key": "ingles-a-violin-by-alessandro-gagliano",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Alessandro-Gagliano-Naples-c1720-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-alessandro-gagliano",
    "title": "Violin by Alessandro Gagliano, Naples, c.1720"
  },
  {
    "key": "ingles-a-violin-by-alessandro-gagliano-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Alessandro-Gagliano-Naples-1709-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-alessandro-gagliano-2",
    "title": "Alessandro Gagliano Violin, Naples, 1709"
  },
  {
    "key": "ingles-a-violin-by-alessandro-gagliano-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/alessandro-gagliano-violin-c1725-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-alessandro-gagliano-3",
    "title": "A violin by Alessandro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-alessandro-mezzadri",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/alessandro-mezzadri-violin-c1730-ferrara-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-alessandro-mezzadri",
    "title": "A violin by Alessandro Mezzadri"
  },
  {
    "key": "ingles-a-violin-by-alfredo-contino",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/alfredo-contino-violin-1916-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-alfredo-contino",
    "title": "A violin by Alfredo Contino"
  },
  {
    "key": "ingles-a-violin-by-ambrogio-sironi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ambrogio-sironi-violin-1927-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ambrogio-sironi",
    "title": "Ambrogio Sironi Violin, Milan, 1927"
  },
  {
    "key": "ingles-a-violin-by-ambrogio-sironi-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ambrogio-sironi-violin-1935-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ambrogio-sironi-2",
    "title": "A violin by Ambrogio Sironi, Milan, 1935"
  },
  {
    "key": "ingles-a-violin-by-andrea-guarneri-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Andrea-Guarneri-Venice-1687-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-andrea-guarneri-3",
    "title": "A violin by Andrea Guarneri"
  },
  {
    "key": "ingles-a-violin-by-annibale-fagnola",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/annibale-fagnola-violin-turin-1931-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-annibale-fagnola",
    "title": "A violin by Annibale Fagnola"
  },
  {
    "key": "ingles-a-violin-by-annibale-fagnola-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Annibale-Fagnola-Turin-1922-violin-2-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-annibale-fagnola-2",
    "title": "A violin by Annibale Fagnola"
  },
  {
    "key": "ingles-a-violin-by-annibale-fagnola-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/annibale-fagnola-turin-violin-1947-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-annibale-fagnola-3",
    "title": "A violin by Annibale Fagnola"
  },
  {
    "key": "ingles-a-violin-by-annibale-fagnola-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/annibale-fagnola-turin-1925-turin-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-annibale-fagnola-4",
    "title": "A violin by Annibale Fagnola"
  },
  {
    "key": "ingles-a-violin-by-antoine-didelin",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antoine-didelin-violin-1777-mirecourt-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antoine-didelin",
    "title": "A violin by Antoine Didelin"
  },
  {
    "key": "ingles-a-violin-by-anton-posch",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/anton-posch-violin-vienna-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-anton-posch",
    "title": "A violin by Anton Posch"
  },
  {
    "key": "ingles-a-violin-by-antonio-capela",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-capela-violin-1977-anta-espinho-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-capela",
    "title": "Antonio Capela Violin, Anta Espinho, 1977"
  },
  {
    "key": "ingles-a-violin-by-antonio-capela-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-capela-violin-1987-anta-espinho-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-capela-2",
    "title": "A violin by Antonio Capela"
  },
  {
    "key": "ingles-a-violin-by-antonio-cavalazzi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-cavalazzi-violin-ravenna-1968-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-cavalazzi",
    "title": "A violin by Antonio Cavalazzi"
  },
  {
    "key": "ingles-a-violin-by-antonio-gragnani-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-gragnani-Violin-livorno-1786-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-gragnani-2",
    "title": "A. Gragnani violin c1786, Livorno |Ingles & Hayday"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-11",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-1695-violin-goetz-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-11",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-12",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-1713-violin-pingrille-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-12",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-13",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-c1698-violin-guyot-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-13",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-14",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/antonio-stradivari-cremona-violin-1708-havemeyer-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-14",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-16",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/antonio-stradivari-cremona-violin-1712-le-brun-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-16",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-17",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/05/Antonio-Stradivari-Cremona-1734-vn-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-17",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-18",
    "image": "https://ingleshayday.com/wp-content/uploads/2026/01/Koeber-back-resized-e1768221266487-800x1679.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-18",
    "title": "A violin by Antonio Stradivari, Cremona, 1725"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/11/Antonio-Stradivari-Cremona-1697-violin-Molitor-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-2",
    "title": "Antonio Stradivari The Molitor Violin"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Antonio-Stradivari-Cremona-1717-violin-Sothebys-Ex-Piatti-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-3",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Antonio-Stradivari-Cremona-1709-violin-Sothebys-Ex-Marie-Hall-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-4",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Antonio-Stradivari-Cremona-1725-violin-Wilhelmj-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-5",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-violin-1667-sachs-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-6",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-8",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-1701-violin-ferraresi-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-8",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-9",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-violin-1716-nachez-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-9",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-antonio-stradivari-ex-hamma-hagner",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/antonio-stradivari-cremona-violin-c1717-hamma-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-antonio-stradivari-ex-hamma-hagner",
    "title": "A violin by Antonio Stradivari"
  },
  {
    "key": "ingles-a-violin-by-archimede-orlandini",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/archimede-orlandini-violin-1976-parma-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-archimede-orlandini",
    "title": "A violin by Archimede Orlandini"
  },
  {
    "key": "ingles-a-violin-by-armando-altavilla",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Armando-Altavilla-Naples-1938-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-armando-altavilla",
    "title": "A violin by Armando Altavilla"
  },
  {
    "key": "ingles-a-violin-by-armando-altavilla-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/armando-altavilla-naples-violin-1922-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-armando-altavilla-2",
    "title": "A violin by Armando Altavilla"
  },
  {
    "key": "ingles-a-violin-by-armando-piccagliani",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/armando-piccagliani-violin-1939-modena-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-armando-piccagliani",
    "title": "A violin by Armando Piccagliani"
  },
  {
    "key": "ingles-a-violin-by-arthur-richardson",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/arthur-richardson-violin-1936-crediton-1007-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-arthur-richardson",
    "title": "A violin by Arthur Richardson"
  },
  {
    "key": "ingles-a-violin-by-arthur-richardson-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/arthur-richardson-violin-1936-1010-crediton-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-arthur-richardson-2",
    "title": "A violin by Arthur Richardson"
  },
  {
    "key": "ingles-a-violin-by-arturo-fracassi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/arturo-fracassi-violin-cesena-1940-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-arturo-fracassi",
    "title": "A violin by Arturo Fracassi"
  },
  {
    "key": "ingles-a-violin-by-auguste-martin-gemunder",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/auguste-martin-gemunder-violin-1886-new-york-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-auguste-martin-gemunder",
    "title": "A violin by Auguste Martin Gemunder"
  },
  {
    "key": "ingles-a-violin-by-auguste-sebastien-philippe-bernardel",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/august-sebastien-bernardel-violin-mirecourt-1929-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-auguste-sebastien-philippe-bernardel",
    "title": "Auguste Sebastien Philippe Bernardel violin c1829, Paris"
  },
  {
    "key": "ingles-a-violin-by-auguste-sebastien-philippe-bernardel-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/august-sebastien-bernardel-paris-violin-1865-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-auguste-sebastien-philippe-bernardel-3",
    "title": "A violin by Auguste Sebastien Philippe Bernardel"
  },
  {
    "key": "ingles-a-violin-by-auguste-sebastien-philippe-bernardel-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/auguste-sebastien-philippe-bernardel-violin-paris-1838-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-auguste-sebastien-philippe-bernardel-4",
    "title": "Auguste Sebastien Philippe Bernardel Violin, c1838, Paris"
  },
  {
    "key": "ingles-a-violin-by-benigno-saccani",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/benigno-saccani-violin-milan-1909-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-benigno-saccani",
    "title": "Benigno Saccani Violin, c.1909, Milan"
  },
  {
    "key": "ingles-a-violin-by-benjamin-banks",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/benjamin-banks-violin-salisbury-1779-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-benjamin-banks",
    "title": "Benjamin Banks violin made c1779 in Salisbury"
  },
  {
    "key": "ingles-a-violin-by-benjamin-banks-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/benjamin-banks-Violin-salisbury-1781-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-benjamin-banks-2",
    "title": "Benjamin Banks violin c1781, Salisbury"
  },
  {
    "key": "ingles-a-violin-by-benjamin-banks-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/benjamin-banks-violin-salisbury-c1780-ex-albert-cooper-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-benjamin-banks-3",
    "title": "Benjamin Banks violin c1780, Salisbury"
  },
  {
    "key": "ingles-a-violin-by-bernardo-calcagni",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/bernardo-calcagni-violin-c1740-genoa-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-bernardo-calcagni",
    "title": "A violin by Bernardo Calcagni"
  },
  {
    "key": "ingles-a-violin-by-bernardo-calcagni-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/bernardo-calcagni-violin-genoa-c1740-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-bernardo-calcagni-2",
    "title": "A violin by Bernardo Calcagni"
  },
  {
    "key": "ingles-a-violin-by-bernhard-fendt-i",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/bernhard-fendt-violin-c1810-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-bernhard-fendt-i",
    "title": "Bernhard Simon Fendt I violin London, c1810"
  },
  {
    "key": "ingles-a-violin-by-bernhard-simon-fendt-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/bernard-simon-fendt-Violin-london-c1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-bernhard-simon-fendt-2",
    "title": "Bernhard Simon Fendt I violin c1830, London"
  },
  {
    "key": "ingles-a-violin-by-bruno-barbieri",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/bruno-barbieri-violin-mantua-1967-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-bruno-barbieri",
    "title": "A violin by Bruno Barbieri"
  },
  {
    "key": "ingles-a-violin-by-camillo-mandelli",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/camillo-mandelli-Violin-milan-c1930-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-camillo-mandelli",
    "title": "A violin by Camillo Mandelli"
  },
  {
    "key": "ingles-a-violin-by-carl-becker",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/carl-becker-violin-1928-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carl-becker",
    "title": "A violin by Carl Becker"
  },
  {
    "key": "ingles-a-violin-by-carlo-antonio-testore",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Carlo-Antonio-Testore-Milan-1736-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-antonio-testore",
    "title": "A violin by Carlo Antonio Testore"
  },
  {
    "key": "ingles-a-violin-by-carlo-antonio-testore-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-antonio-testore-violin-c1760-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-antonio-testore-2",
    "title": "A violin by Carlo Antonio Testore"
  },
  {
    "key": "ingles-a-violin-by-carlo-bisiach",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Carlo-Bisiach-Florence-1913-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-bisiach",
    "title": "Carlo Bisiach Violin, Milan, 1913"
  },
  {
    "key": "ingles-a-violin-by-carlo-bisiach-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-bisiach-florence-1922-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-bisiach-2",
    "title": "A Violin by Carlo Bisiach, Florence, 1922"
  },
  {
    "key": "ingles-a-violin-by-carlo-carletti",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-carletti-pieve-di-cento-c1910-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-carletti",
    "title": "A violin by Carlo Carletti"
  },
  {
    "key": "ingles-a-violin-by-carlo-carletti-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-carletti-violin-pieve-di-cento-c1925-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-carletti-2",
    "title": "A violin by Carlo Carletti"
  },
  {
    "key": "ingles-a-violin-by-carlo-de-march",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-de-march-violin-venice-1956-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-de-march",
    "title": "A violin by Carlo de March"
  },
  {
    "key": "ingles-a-violin-by-carlo-giuseppe-oddone",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Carlo-Giuseppe-Oddone-Rivadora-1909-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-giuseppe-oddone",
    "title": "A violin by Carlo Giuseppe Oddone"
  },
  {
    "key": "ingles-a-violin-by-carlo-giuseppe-oddone-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Carlo-Giuseppe-Oddone-Rivadora-1912-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-giuseppe-oddone-2",
    "title": "A violin by Carlo Giuseppe Oddone"
  },
  {
    "key": "ingles-a-violin-by-carlo-giuseppe-oddone-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Carlo-Giuseppe-Oddone-Rivadora-1934-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-giuseppe-oddone-3",
    "title": "A violin by Carlo Giuseppe Oddone"
  },
  {
    "key": "ingles-a-violin-by-carlo-loveri",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-loveri-violin-naples-1880-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-loveri",
    "title": "A violin by Carlo Loveri"
  },
  {
    "key": "ingles-a-violin-by-carlo-ravizza",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-ravizza-violin-1939-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-ravizza",
    "title": "A violin by Carlo Ravizza"
  },
  {
    "key": "ingles-a-violin-by-carlo-tononi-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/carlo-tononi-venice-violin-1709-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-carlo-tononi-2",
    "title": "A violin by Carlo Tononi"
  },
  {
    "key": "ingles-a-violin-by-cesare-candi",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Cesare-Candi-Genoa-1930-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-cesare-candi",
    "title": "A violin by Cesare Candi"
  },
  {
    "key": "ingles-a-violin-by-cesare-candi-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/cesare-candi-violin-1912-genoa-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-cesare-candi-2",
    "title": "A violin by Cesare Candi"
  },
  {
    "key": "ingles-a-violin-by-charles-adolphe-maucotel",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/Charles-Adolphe-Maucotel-Paris-c1840-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-adolphe-maucotel",
    "title": "A violin by Charles Adolphe Maucotel"
  },
  {
    "key": "ingles-a-violin-by-charles-boullangier",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-boullangier-violin-london-1878-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-boullangier",
    "title": "A violin by Charles Boullangier"
  },
  {
    "key": "ingles-a-violin-by-charles-francois-gand",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-francois-gand-violin-paris-1836-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-francois-gand",
    "title": "A violin by Charles Francois Gand"
  },
  {
    "key": "ingles-a-violin-by-charles-jacquot",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-jacquot-violin-c1857-mirecourt-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-jacquot",
    "title": "A violin by Charles Jacquot"
  },
  {
    "key": "ingles-a-violin-by-charles-jean-baptiste-collin-mezin",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/06/charles-jean-baptiste-collin-mezin-violin-paris-1888-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-jean-baptiste-collin-mezin",
    "title": "A violin by Charles Jean Baptiste Collin-Mezin"
  },
  {
    "key": "ingles-a-violin-by-charles-jean-baptiste-collin-mezin-i-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-jean-baptiste-collin-mezin-i-violin-paris-1893-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-jean-baptiste-collin-mezin-i-2",
    "title": "A violin by Charles Jean Baptiste Collin-Mezin I"
  },
  {
    "key": "ingles-a-violin-by-charles-jean-baptiste-collin-mezin-i-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-jean-baptiste-collin-mezin-paris-violin-1892-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-jean-baptiste-collin-mezin-i-3",
    "title": "A violin by Charles Jean Baptiste Collin-Mezin I"
  },
  {
    "key": "ingles-a-violin-by-charles-jean-baptiste-collin-mezin-i-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/charles-jean-baptiste-collin-mezin-violin-paris-1899-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-jean-baptiste-collin-mezin-i-4",
    "title": "A violin by Charles Jean Baptiste Collin-Mezin I"
  },
  {
    "key": "ingles-a-violin-by-charles-mennegand",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/Charles-mennegand-violin-paris-1879-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-charles-mennegand",
    "title": "A violin by Charles Mennegand"
  },
  {
    "key": "ingles-a-violin-by-claude-aubert",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/claude-aubert-troyes-violin-c1789-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-claude-aubert",
    "title": "A violin by Claude Aubert"
  },
  {
    "key": "ingles-a-violin-by-claude-pierray-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/claude-pierray-violin-paris-1731-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-claude-pierray-2",
    "title": "Claude Pierray Violin, c.1731, Paris"
  },
  {
    "key": "ingles-a-violin-by-claude-pirot",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/claude-pirot-violin-paris-1812-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-claude-pirot",
    "title": "Claude Pirot violin c1812, Paris"
  },
  {
    "key": "ingles-a-violin-by-claude-pirot-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/claude-pirot-violin-paris-1813-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-claude-pirot-2",
    "title": "Claude Pirot violin Made in Paris c1813"
  },
  {
    "key": "ingles-a-violin-by-daniel-parker",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/daniel-parker-violin-1716-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-daniel-parker",
    "title": "A violin by Daniel Parker"
  },
  {
    "key": "ingles-a-violin-by-daniel-parker-london-1716",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/02/Daniel-Parker-London-1716-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-daniel-parker-london-1716",
    "title": "A violin by Daniel Parker for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-dante-guastalla",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/dante-guastalla-violin-reggiolo-emiliano-early-20th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-dante-guastalla",
    "title": "A violin by Dante Guastalla"
  },
  {
    "key": "ingles-a-violin-by-david-stirrat",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/david-stirrat-violin-edinburgh-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-david-stirrat",
    "title": "A violin by David Stirrat"
  },
  {
    "key": "ingles-a-violin-by-david-tecchler",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/david-tecchler-violin-1726-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-david-tecchler",
    "title": "18th Century D.Tecchler Violin, Rome, 1726 |Ingles & Hayday"
  },
  {
    "key": "ingles-a-violin-by-david-tecchler-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/david-tecchler-violin-c1740-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-david-tecchler-2",
    "title": "David Tecchler Violin, Rome, circa 1740"
  },
  {
    "key": "ingles-a-violin-by-domenico-corbucci",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/domenico-corbucci-violin-citta-di-castello-c1885-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-domenico-corbucci",
    "title": "A violin by Domenico Corbucci"
  },
  {
    "key": "ingles-a-violin-by-domingos-antonio-capela",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/domingos-and-antonio-capela-violin-anta-espinho-1975-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-domingos-antonio-capela",
    "title": "A violin by Domingos & Antonio Capela"
  },
  {
    "key": "ingles-a-violin-by-eleuterio-leonardi",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/eleuterio-leonardo-violin-spoleto-1914-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-eleuterio-leonardi",
    "title": "Eleuterio Leonardi Violin, c.1914, Spoleto"
  },
  {
    "key": "ingles-a-violin-by-emil-hjorth-sonner",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emil-hjorth-and-sonner-violin-1913-copenhagen-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emil-hjorth-sonner",
    "title": "A violin by Emil Hjorth & Sønner"
  },
  {
    "key": "ingles-a-violin-by-emil-hjorth-sonner-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emil-hjorth-and-sonner-violin-1931-copenhagen-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emil-hjorth-sonner-2",
    "title": "A violin by Emil Hjorth & Sønner"
  },
  {
    "key": "ingles-a-violin-by-emil-hjorth-sonner-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emil-hjorth-and-sonner-violin-1917-copenhagen-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emil-hjorth-sonner-3",
    "title": "A violin by Emil Hjorth & Sønner"
  },
  {
    "key": "ingles-a-violin-by-emil-hjorth-sonner-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emil-hjorth-and-sonner-violin-copenhagen-1924-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emil-hjorth-sonner-4",
    "title": "A violin by Emil Hjorth & Sønner"
  },
  {
    "key": "ingles-a-violin-by-emile-germain",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emile-germain-violin-paris-1895-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emile-germain",
    "title": "A 1895 Violin, Made in Paris by Emile Germain"
  },
  {
    "key": "ingles-a-violin-by-emile-germain-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emile-germain-violin-1899-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emile-germain-2",
    "title": "Emile Germain Violin, Paris, 1899"
  },
  {
    "key": "ingles-a-violin-by-emile-lhumbert",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/emile-l-humbert-paris-violin-1929-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-emile-lhumbert",
    "title": "A violin by Emile L'Humbert"
  },
  {
    "key": "ingles-a-violin-by-enrico-clodoveo-melagari",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/Enrico-Clodoveo-melegari-violin-1886-turin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-clodoveo-melagari",
    "title": "A violin by Enrico Clodoveo Melegari"
  },
  {
    "key": "ingles-a-violin-by-enrico-marchetti-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/enrico-marchetti-violin-1915-turin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-marchetti-2",
    "title": "A violin by Enrico Marchetti"
  },
  {
    "key": "ingles-a-violin-by-enrico-marchetti-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/enrico-marchetti-Violin-turin-c1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-marchetti-3",
    "title": "A violin by Enrico Marchetti"
  },
  {
    "key": "ingles-a-violin-by-enrico-marchetti-turin-1885",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/Enrico-Marchetti-Turin-1885-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-marchetti-turin-1885",
    "title": "Enrico Marchetti violin Turin 1885"
  },
  {
    "key": "ingles-a-violin-by-enrico-politi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/enrico-politi-violin-rome-c1920-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-politi",
    "title": "A violin by Enrico Politi"
  },
  {
    "key": "ingles-a-violin-by-enrico-rocca",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/enrico-rocca-violin-genoa-1893-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-enrico-rocca",
    "title": "A violin by Enrico Rocca"
  },
  {
    "key": "ingles-a-violin-by-ernesto-pevere",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/ernesto-pevere-violin-1945-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ernesto-pevere",
    "title": "A violin by Ernesto Pevere"
  },
  {
    "key": "ingles-a-violin-by-ettore-siega",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ettore-siega-violin-venice-1928-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ettore-siega",
    "title": "A violin by Ettore Siega"
  },
  {
    "key": "ingles-a-violin-by-ettore-soffritti",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ettore-soffritti-violin-1892-ferrara-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ettore-soffritti",
    "title": "A violin by Ettore Soffritti"
  },
  {
    "key": "ingles-a-violin-by-eugenio-degani",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Eugenio-Degani-Venice-1899-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-eugenio-degani",
    "title": "A violin by Eugenio Degani"
  },
  {
    "key": "ingles-a-violin-by-felix-mori-costa",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Felix-Mori-Costa-Parma-c1820-violin-sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-felix-mori-costa",
    "title": "A violin by Felice Mori Costa"
  },
  {
    "key": "ingles-a-violin-by-ferdinando-gagliano",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/ferdinando-gagliano-violin-naples-1789-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ferdinando-gagliano",
    "title": "Ferdinando Gagliano Violin, Naples, 1789"
  },
  {
    "key": "ingles-a-violin-by-ferdinando-gagliano-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ferdinando-gagliano-violin-1762-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ferdinando-gagliano-2",
    "title": "A Violin Made by Ferdinando Gagliano, Naples, 1762"
  },
  {
    "key": "ingles-a-violin-by-ferdinando-garimberti",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/ferdinando-garimberti-milan-violin-1925-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-ferdinando-garimberti",
    "title": "A violin by Ferdinando Garimberti"
  },
  {
    "key": "ingles-a-violin-by-francesco-emiliani",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Francesco-Emiliani-Naples-1733-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-emiliani",
    "title": "A violin by Francesco Emiliani"
  },
  {
    "key": "ingles-a-violin-by-francesco-goffriller",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-goffriller-udine-violin-1730-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-goffriller",
    "title": "A violin by Francesco Goffriller"
  },
  {
    "key": "ingles-a-violin-by-francesco-maurizi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-maurizi-violin-appignano-c1850-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-maurizi",
    "title": "A violin by Francesco Maurizi"
  },
  {
    "key": "ingles-a-violin-by-francesco-rugeri-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-rugeri-violin-c1670-1009-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-rugeri-2",
    "title": "Francesco Rugeri Violin, c.1670, Cremona"
  },
  {
    "key": "ingles-a-violin-by-francesco-rugeri-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-rugeri-violin-c1670-cremona-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-rugeri-3",
    "title": "A Violin by F. Rugeri, Cremona, c.1670"
  },
  {
    "key": "ingles-a-violin-by-francesco-rugeri-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-rugeri-cremona-1685-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-rugeri-4",
    "title": "Francesco Rugeri Violin, c.1685, Cremona"
  },
  {
    "key": "ingles-a-violin-by-francesco-stradivari-circa-1740-trashed",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francesco-stradivari-violin-cremona-c1740-ex-TC-Petersen-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francesco-stradivari-circa-1740__trashed",
    "title": "A Violin by Francesco Stradivari, Made in Cremona c.1740"
  },
  {
    "key": "ingles-a-violin-by-francis-fendt",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/francis-fendt-violin-England-mid-19th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francis-fendt",
    "title": "Francis Fendt violin England Mid 19th Century"
  },
  {
    "key": "ingles-a-violin-by-franco-albanelli",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/franco-albanelli-violin-bologna-1997-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-franco-albanelli",
    "title": "Franco Albanelli Violin, c.1997, Bologna"
  },
  {
    "key": "ingles-a-violin-by-francois-bovis",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francois-bovis-violin-1910-nice-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francois-bovis",
    "title": "A violin by Francois Bovis"
  },
  {
    "key": "ingles-a-violin-by-francois-caussin-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francois-caussin-violin-c1860-neufchateau-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francois-caussin-3",
    "title": "A violin by Francois Caussin"
  },
  {
    "key": "ingles-a-violin-by-francois-caussin-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/francois-caussin-violin-mirecourt-c1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francois-caussin-5",
    "title": "Francois Caussin Violin, Mirecourt, c.1830"
  },
  {
    "key": "ingles-a-violin-by-francois-fent",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francois-fent-violin-paris-late-18th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francois-fent",
    "title": "A violin by Francois Fent"
  },
  {
    "key": "ingles-a-violin-by-francois-louis-pique",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/francois-louis-pique-violin-c1810-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-francois-louis-pique",
    "title": "A violin by Francois-Louis Pique"
  },
  {
    "key": "ingles-a-violin-by-franz-geissenhof",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/franz-geissenhof-violin-1808-vienna-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-franz-geissenhof",
    "title": "A violin by Franz Geissenhof"
  },
  {
    "key": "ingles-a-violin-by-franz-geissenhof-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/franz-geissenhof-violin-vienna-1812-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-franz-geissenhof-2",
    "title": "A violin by Franz Geissenhof"
  },
  {
    "key": "ingles-a-violin-by-franz-kinberg",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/franz-kinberg-violin-1951-chicago-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-franz-kinberg",
    "title": "A violin by Franz Kinberg"
  },
  {
    "key": "ingles-a-violin-by-gabriel-david-buchstetter",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gabriel-david-buchstetter-violin-regensburg-c1770-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gabriel-david-buchstetter",
    "title": "A violin by Gabriel David Buchstetter"
  },
  {
    "key": "ingles-a-violin-by-gabriel-lembock-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gabriel-lembock-violin-1873-vienna-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gabriel-lembock-2",
    "title": "A violin by Gabriel Lembock"
  },
  {
    "key": "ingles-a-violin-by-gabriel-lembock-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gabriel-lembock-violin-1862-vienna-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gabriel-lembock-3",
    "title": "A violin by Gabriel Lembock"
  },
  {
    "key": "ingles-a-violin-by-gaetano-guadagnini",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Gaetano-Guadagnini-c1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gaetano-guadagnini",
    "title": "Gaetano Guadagnini II Violin, Turin, c.1830"
  },
  {
    "key": "ingles-a-violin-by-gaetano-pasta",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/gaetano-pasta-violin-Brescia-c1750-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gaetano-pasta",
    "title": "A violin by Gaetano Pasta"
  },
  {
    "key": "ingles-a-violin-by-gaetano-pollastri",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Gaetano-Pollastri-Bologna-1948-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gaetano-pollastri",
    "title": "A violin by Gaetano Pollastri"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-violin-paris-1890-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel",
    "title": "A violin by Gand & Bernardel, Paris, 1890"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-violin-1890-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel-2",
    "title": "Gand & Bernardel Violin, Made in Paris in 1890"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel-freres",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-freres-violin-paris-1885-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel-freres",
    "title": "A violin by Gand & Bernardel Freres"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel-freres-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-freres-violin-1869-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel-freres-3",
    "title": "A violin by Gand & Bernardel Freres"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel-freres-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-freres-violin-1875-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel-freres-4",
    "title": "A violin by Gand & Bernardel Freres"
  },
  {
    "key": "ingles-a-violin-by-gand-bernardel-freres-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gand-and-bernardel-freres-violin-paris-1878-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gand-bernardel-freres-5",
    "title": "A violin by Gand & Bernardel Freres"
  },
  {
    "key": "ingles-a-violin-by-gennaro-de-luccia",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gennaro-de-luccia-violin-mercato-1929-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-de-luccia",
    "title": "A violin by Gennaro de Luccia"
  },
  {
    "key": "ingles-a-violin-by-gennaro-gagliano",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Gennaro-Gagliano-Naples-c1750-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-gagliano",
    "title": "A violin by Gennaro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-gennaro-gagliano-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gennaro-gagliano-naples-violin-1772-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-gagliano-2",
    "title": "A violin by Gennaro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-gennaro-gagliano-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gennaro-gagliano-violin-naples-c1760-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-gagliano-3",
    "title": "A violin by Gennaro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-gennaro-gagliano-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/gennaro-gagliano-violin-1765-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-gagliano-4",
    "title": "A violin by Gennaro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-gennaro-gagliano-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/06/gennaro-gagliano-violin-naples-c1770-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gennaro-gagliano-5",
    "title": "A violin by Gennaro Gagliano"
  },
  {
    "key": "ingles-a-violin-by-george-adolphe-chanot",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/georges-adolphe-chanot-violin-london-1898-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-adolphe-chanot",
    "title": "A violin by George Adolphe Chanot"
  },
  {
    "key": "ingles-a-violin-by-george-craske-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/george-craske-violin-c1880-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-craske-2",
    "title": "A violin by George Craske"
  },
  {
    "key": "ingles-a-violin-by-george-craske-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-craske-violin-c1870-stockport-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-craske-3",
    "title": "A violin by George Craske"
  },
  {
    "key": "ingles-a-violin-by-george-craske-stockport-circa-1880",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/George-Craske-Stockport-c1880-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-craske-stockport-circa-1880",
    "title": "George Craske violin, Stockport circa 1880"
  },
  {
    "key": "ingles-a-violin-by-george-pyne-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-pyne-violin-london-c1920-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-pyne-2",
    "title": "A violin by George Pyne"
  },
  {
    "key": "ingles-a-violin-by-george-withers",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-withers-violin-london-c1885-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-withers",
    "title": "A violin by George Withers"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-london-early-20th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-1948-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-2",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-1939-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-3",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-c1900-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-4",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-london-c1920-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-5",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-1902-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-6",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-george-wulme-hudson-7",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/george-wulme-hudson-violin-1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-george-wulme-hudson-7",
    "title": "A violin by George Wulme-Hudson"
  },
  {
    "key": "ingles-a-violin-by-georges-chanot",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/05/Georges-Chanot-Paris-c1840-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-georges-chanot",
    "title": "Georges Chanot violin Paris c1840"
  },
  {
    "key": "ingles-a-violin-by-georges-chanot-i",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/georges-chanot-violin-paris-1847-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-georges-chanot-i",
    "title": "1847 Violin by Georges Chanot I, Paris"
  },
  {
    "key": "ingles-a-violin-by-georges-chanot-i-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/06/georges-chanot-i-paris-1848-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-georges-chanot-i-2",
    "title": "Violin by Georges Chanot I, Paris, 1848"
  },
  {
    "key": "ingles-a-violin-by-georges-chanot-ii",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/georges-chanot-violin-london-c1880-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-georges-chanot-ii",
    "title": "A violin by Georges Chanot II"
  },
  {
    "key": "ingles-a-violin-by-geroges-chanot",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/georges-chanot-violin-1840-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-geroges-chanot",
    "title": "A violin by Georges Chanot"
  },
  {
    "key": "ingles-a-violin-by-giacinto-santagiuliana",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giacinto-santagiuliana-violin-Vicenza-1816-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giacinto-santagiuliana",
    "title": "A violin by Giacinto Santagiuliana"
  },
  {
    "key": "ingles-a-violin-by-giacomo-leandro-bisiach-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/06/giacomo-and-leandro-bisiach-violin-milan-c1960-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giacomo-leandro-bisiach-2",
    "title": "Violin by Giacomo e Leandro Bisiach, Milan, c.1960"
  },
  {
    "key": "ingles-a-violin-by-giacomo-rivolta",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giacomo-rivolta-Violin-milan-1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giacomo-rivolta",
    "title": "A violin by Giacomo Rivolta"
  },
  {
    "key": "ingles-a-violin-by-giacomo-rivolta-milan-1830",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/12/Giacomo-Rivolta-Milan-1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giacomo-rivolta-milan-1830",
    "title": "A violin by Giacomo Rivolta for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-gioffredo-cappa",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Gioffredo-Cappa-Saluzzo-c1695-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gioffredo-cappa",
    "title": "A violin by Gioffredo Cappa"
  },
  {
    "key": "ingles-a-violin-by-gioffredo-cappa-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Gioffredo-Cappa-Saluzzo-c1715-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gioffredo-cappa-2",
    "title": "A violin by Gioffredo Cappa"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-ceruti",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-battista-ceruti-violin-cremona-c1810-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-ceruti",
    "title": "A violin by Giovanni Battista Ceruti"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-ceruti-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-battista-ceruti-violin-cremona-c1791-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-ceruti-2",
    "title": "A violin by Giovanni Battista Ceruti"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-ceruti-cremona-1813",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/09/Giovanni-Battista-Ceruti-violin-Cremona-1813-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giovanni-battista-ceruti-cremona-1813",
    "title": "A violin by Giovanni Battista Ceruti for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-gabrielli-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-battista-gabrielli-violin-florence-c1760-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-gabrielli-3",
    "title": "A violin by Giovanni Battista Gabrielli"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-grancino-ii",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-battista-grancino-violin-c1715-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-grancino-ii",
    "title": "A violin by Giovanni Battista Grancino II"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-grancino-ii-milan-circa-1720",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/10/Giovanni-Battista-Grancino-II-violin-Milan-c1720-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giovanni-battista-grancino-ii-milan-circa-1720",
    "title": "A violin by Giovanni Battista Grancino II for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giovanni-Battista-Guadagnini-Piacenza-1741-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-2",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giovanni-Battista-Guadagnini-Piacenza-1744-violin-ex-Knoop-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-3",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Giovanni-Battista-Guadagnini-1748-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-4",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giovanni-Battista-Guadagnini-Turin-1755-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-5",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giovanni-Battista-Guadagnini-Turin-1756-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-6",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-7",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-battista-guadagnini-violin-1742-piacenza-ex-cubberly-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-guadagnini-7",
    "title": "A violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-guadagnini-turin-1772",
    "image": "https://ingleshayday.com/wp-content/uploads/2026/03/Giovanni-Battista-Guadagnini-1772-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giovanni-battista-guadagnini-turin-1772",
    "title": "A violin by Giovanni Battista Guadagnini, Turin, 1772 | Private Sales | Instrument for Sale"
  },
  {
    "key": "ingles-a-violin-by-giovanni-battista-rogeri",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giovanni-battista-rogeri-violin-c1685-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-battista-rogeri",
    "title": "A violin by Giovanni Battista Rogeri"
  },
  {
    "key": "ingles-a-violin-by-giovanni-dollenz",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-dollenz-violin-trieste-c1850-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-dollenz",
    "title": "A violin by Giovanni Dollenz"
  },
  {
    "key": "ingles-a-violin-by-giovanni-francesco-celoniati",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giovanni-francesco-celoniati-violin-c1740-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-francesco-celoniati",
    "title": "A violin by Giovanni Francesco Celoniati"
  },
  {
    "key": "ingles-a-violin-by-giovanni-francesco-leonpori",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-francesco-leonpori-violin-1759-rome-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-francesco-leonpori",
    "title": "A violin by Giovanni Francesco Leonpori"
  },
  {
    "key": "ingles-a-violin-by-giovanni-francesco-pressenda-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-francesco-pressenda-violin-turin-1845-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-francesco-pressenda-2",
    "title": "A violin by Giovanni Francesco Pressenda"
  },
  {
    "key": "ingles-a-violin-by-giovanni-francesco-pressenda-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-francesco-pressenda-violin-turin-1843-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-francesco-pressenda-3",
    "title": "A violin by Giovanni Francesco Pressenda"
  },
  {
    "key": "ingles-a-violin-by-giovanni-gagliano",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giovanni-gagliano-violin-1792-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-gagliano",
    "title": "A violin by Giovanni Gagliano"
  },
  {
    "key": "ingles-a-violin-by-giovanni-gaida",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-gaida-violin-ivrea-1900-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-gaida",
    "title": "1900 Violin by Giovanni Gaida, Ivrea| Ingles & Hayday"
  },
  {
    "key": "ingles-a-violin-by-giovanni-gaida-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/giovanni-gaida-violin-ivrea-1899-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-gaida-2",
    "title": "Violin by Giovanni Gaida, Ivrea, 1899, Signature F.W. Chanot"
  },
  {
    "key": "ingles-a-violin-by-giovanni-grancino",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/giovanni-grancino-violin-milan-c1700-Ex-Bagdasarjanz-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-grancino",
    "title": "Ex-Bagdasarjanz violin by Giovanni Grancino"
  },
  {
    "key": "ingles-a-violin-by-giovanni-grancino-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-grancino-milan-violin-c1700-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-grancino-2",
    "title": "Giovanni Grancino Violin, Milan, c.1700"
  },
  {
    "key": "ingles-a-violin-by-giovanni-grancino-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-grancino-violin-milan-c1690-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-grancino-3",
    "title": "A violin by Giovanni Grancino"
  },
  {
    "key": "ingles-a-violin-by-giovanni-grancino-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-grancino-violin-milan-c1695-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-grancino-4",
    "title": "A violin by Giovanni Grancino"
  },
  {
    "key": "ingles-a-violin-by-giovanni-maria-del-bussetto-cremona-circa-1680",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/10/Giovanni-Maria-del-Bussetto-violin-Cremona-c1680-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giovanni-maria-del-bussetto-cremona-circa-1680",
    "title": "A violin by Giovanni Maria del Bussetto for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-giovanni-paolo-maggini",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/05/Giovanni-Paolo-Maggini-Brescia-c1620-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-paolo-maggini",
    "title": "A violin by Giovanni Paolo Maggini"
  },
  {
    "key": "ingles-a-violin-by-giovanni-pistucci",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Giovanni-Pistucci-Naples-c1900-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-pistucci",
    "title": "A violin by Giovanni Pistucci"
  },
  {
    "key": "ingles-a-violin-by-giovanni-pistucci-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-pistucci-violin-naples-c1930-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-pistucci-2",
    "title": "A violin by Giovanni Pistucci"
  },
  {
    "key": "ingles-a-violin-by-giovanni-pistucci-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giovanni-pistucci-violin-c1910-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-pistucci-3",
    "title": "A violin by Giovanni Pistucci"
  },
  {
    "key": "ingles-a-violin-by-giovanni-pistucci-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/giovanni-pistucci-violin-naples-c1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-pistucci-4",
    "title": "A violin by Giovanni Pistucci"
  },
  {
    "key": "ingles-a-violin-by-giovanni-schwarz",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/giovanni-schwarz-Violin-venice-1927-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giovanni-schwarz",
    "title": "A violin by Giovanni Schwarz"
  },
  {
    "key": "ingles-a-violin-by-giulio-cesare-gigli",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giulio-cesare-gigli-violin-c1750-rome-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giulio-cesare-gigli",
    "title": "A violin by Giulio Cesare Gigli"
  },
  {
    "key": "ingles-a-violin-by-giulio-degani",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giulio-degani-violin-venice-1894-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giulio-degani",
    "title": "A violin by Giulio Degani"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-antonio-gagliano-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-and-antonio-gagliano-violin-naples-1800-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-antonio-gagliano-2",
    "title": "Giuseppe & Antonio Gagliano violin c1800, Naples"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-antonio-gagliano-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-and-antonio-gagliano-naples-violin-1805-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-antonio-gagliano-3",
    "title": "Giuseppe & Antonio Gagliano violin c1805, Naples"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-antonio-gagliano-naples-1789",
    "image": "https://ingleshayday.com/wp-content/uploads/2026/03/Giuseppe-Antonio-Gagliano-violin-Naples-1789-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giuseppe-antonio-gagliano-naples-1789",
    "title": "A violin by Giuseppe & Antonio Gagliano, Naples, 1789 | Private Sales | Instrument for Sale"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-antonio-gagliano-naples-1793",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/02/Giuseppe-Antonio-Gagliano-Naples-1793-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giuseppe-antonio-gagliano-naples-1793",
    "title": "A violin by Giuseppe & Antonio Gagliano for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-antonio-rocca",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giuseppe-Rocca-Turin-1854-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-antonio-rocca",
    "title": "A violin by Giuseppe Antonio Rocca"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-baldantoni",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Giuseppe-Baldantoni-Ancona-1845-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-baldantoni",
    "title": "A violin by Giuseppe Baldantoni"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-baldantoni-ancona-1840",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/10/back_trans-800x1900.png",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-giuseppe-baldantoni-ancona-1840",
    "title": "A violin by Giuseppe Baldantoni for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-bargelli",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/giuseppe-bargelli-violin-florence-1958-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-bargelli",
    "title": "Giuseppe Bargelli Violin, c.1958, Florence"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-bellinazzi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-bellinazzi-verona-violin-1928-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-bellinazzi",
    "title": "A violin by Giuseppe Bellinazzi"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-dallaglio",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Giuseppe-DallAglio-Mantua-c1830-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-dallaglio",
    "title": "A violin by Giuseppe dall'Aglio"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-dollenz",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/giuseppe-dollenz-violin-trieste-1879-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-dollenz",
    "title": "A violin by Giuseppe Dollenz"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-dollenz-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/giuseppe-dollenz-violin-trieste-1887-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-dollenz-2",
    "title": "Giuseppe Dollenz Violin, c.1887, Trieste"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-fiorini",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-fiorini-violin-zurich-1919-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-fiorini",
    "title": "A violin by Giuseppe Fiorini"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guadagnini",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giuseppe-guadagnini-violin-c1795-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guadagnini",
    "title": "A violin by Giuseppe Guadagnini"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-del-gesu",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/12/Giuseppe-Guarneri-del-Gesu-Cremona-1739-violin-Il-Museo-Grumiaux-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-del-gesu",
    "title": "Giuseppe Guarneri del Gesu Violin, Cremona, 1739"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-del-gesu-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Giuseppe-Guarneri-del-Gesu-Cremona-1732-violin-LeBrun-Bouthillard-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-del-gesu-2",
    "title": "A violin by Giuseppe Guarneri del Gesu"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-del-gesu-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/12/giuseppe-guarneri-del-gesu-cremona-violin-1738-fountaine-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-del-gesu-3",
    "title": "A violin by Giuseppe Guarneri del Gesu"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-del-gesu-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-guarneri-del-gesu-cremona-c1741-violin-Vieuxtemps-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-del-gesu-4",
    "title": "Violin by Giuseppe Guarneri del Gesu, Cremona, Circa 1741"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-del-gesu-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/giuseppe-guarneri-del-gesu-cremona-violin-c1733-sleeping-beauty-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-del-gesu-5",
    "title": "Circa 1733 Violin by Giuseppe Guarneri del Gesu, Cremona"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-filius-andreae",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Giuseppe-filius-Andreae-Guarneri-Cremona-1705-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-filius-andreae",
    "title": "Giuseppe Guarneri 'filius' Andreæ violin c1705-1710, Cremona"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-filius-andreae-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giuseppe-guarneri-filius-andreae-violin-1714-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-filius-andreae-2",
    "title": "Giuseppe Guarneri 'filius' Andreæ violin made c1714 in Cremona"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-filius-andreae-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-guarneri-filius-andreae-cremona-1716-violin-serdet-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-filius-andreae-3",
    "title": "Giuseppe Guarneri 'filius' Andreæ violin c1716, Cremona"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-guarneri-filius-andreae-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-guarneri-filius-andreae-violin-cremona-c1715-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-guarneri-filius-andreae-4",
    "title": "Giuseppe Guarneri 'filius' Andreæ violin c1715, Cremona"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-lucci-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-lucci-rome-1971-violin1-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-lucci-2",
    "title": "Violin by Giuseppe Lucci, Rome, 1971"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-lucci-2-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-lucci-rome-1971-violin2-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-lucci-2-2",
    "title": "1971 Violin by Giuseppe Lucci, Rome"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-lucci-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-lucci-violin-rome-1972-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-lucci-3",
    "title": "Giuseppe Lucci Violin, Rome, 1972"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-lucci-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-lucci-violin-rome-1973-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-lucci-4",
    "title": "1973 Violin by Giuseppe Lucci, Rome"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-pedrazzini-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/giuseppe-pedrazzini-violin-1921-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-pedrazzini-2",
    "title": "Giuseppe Pedrazzini violin c1921, Milan"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-pedrazzini-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-pedrazzini-violin-c1935-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-pedrazzini-4",
    "title": "Giuseppe Pedrazzini violin made in c1935 in Milan"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-pedrazzini-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-pedrazzini-violin-1928-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-pedrazzini-6",
    "title": "1928 Giuseppe Pedrazzini violin Made in Milan"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-pedrazzini-7",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/giuseppe-pedrazzini-violin-1925-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-pedrazzini-7",
    "title": "Violin by Giuseppe Pedrazzini, Milan, 1925"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-rocca",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-rocca-violin-genoa-1843-genoa-ex-campoli-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-rocca",
    "title": "A violin by Giuseppe Rocca"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-rocca-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-rocca-genoa-c1840-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-rocca-2",
    "title": "1840 Violin by Giuseppe Rocca, Turin"
  },
  {
    "key": "ingles-a-violin-by-giuseppe-tarasconi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/giuseppe-tarasconi-violin-1900-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-giuseppe-tarasconi",
    "title": "1857 Violin by Giuseppe Tarasconi, Saronno"
  },
  {
    "key": "ingles-a-violin-by-guido-maraviglia",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/guido-maraviglia-violin-1965-pistoia-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-guido-maraviglia",
    "title": "Guido Maraviglia Violin, Pistoia, 1965"
  },
  {
    "key": "ingles-a-violin-by-gustave-adolphe-bernardel-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/gustave-adolphe-bernardel-violin-paris-1898-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-gustave-adolphe-bernardel-2",
    "title": "Gustave Adolphe Bernardel Violin, c.1898, Paris"
  },
  {
    "key": "ingles-a-violin-by-hilaire-darche-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hilaire-darche-violin-brussels-1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hilaire-darche-2",
    "title": "Hilaire Darche violin c1910, Brussels"
  },
  {
    "key": "ingles-a-violin-by-hilaire-darche-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hilaire-darche-violin-brussels-1908-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hilaire-darche-3",
    "title": "H. Darche violin c1908, Brussels"
  },
  {
    "key": "ingles-a-violin-by-hippolyte-chretien-silvestre",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hippolyte-chretien-silvestre-violin-1866-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hippolyte-chretien-silvestre",
    "title": "Hippolyte Chretien Silvestre Violin, Lyon, 1866"
  },
  {
    "key": "ingles-a-violin-by-hippolyte-chretien-silvestre-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hippolyte-silvestre-violin-1847-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hippolyte-chretien-silvestre-2",
    "title": "Violin by Hippolyte Chretien Silvestre, Lyon, 1847"
  },
  {
    "key": "ingles-a-violin-by-hippolyte-chretien-silvestre-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hippolyte-chretien-silvestre-lyon-c1890-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hippolyte-chretien-silvestre-3",
    "title": "A Violin by Hippolyte Chretien Silvestre, Lyon, c.1890"
  },
  {
    "key": "ingles-a-violin-by-hippolyte-silvestre",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hippolyte-silvestre-violin-c1850-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-hippolyte-silvestre",
    "title": "Hippolyte Silvestre Violin, Lyon, 1865"
  },
  {
    "key": "ingles-a-violin-by-honore-derazey",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/honore-derazey-violin-mirecourt-1835-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-honore-derazey",
    "title": "Violin by Honore Derazey, Mirecourt, 1835"
  },
  {
    "key": "ingles-a-violin-by-jacob-stainer",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jacob-stainer-violin-1659-the-king-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jacob-stainer",
    "title": "Jacobus Stainer violin circa 1659"
  },
  {
    "key": "ingles-a-violin-by-jacob-stainer-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jacob-stainer-violin-1663-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jacob-stainer-2",
    "title": "Jacob Stainer violin c1663, Absam"
  },
  {
    "key": "ingles-a-violin-by-jacopo-filipo-cordano",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jacopo-filipo-cordano-genoa-violin-c1725-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jacopo-filipo-cordano",
    "title": "Jacopo Filipo Cordano Violin, Genoa, Circa 1725"
  },
  {
    "key": "ingles-a-violin-by-jago-peternella",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jago-peternella-violin-new-york-1925-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jago-peternella",
    "title": "Jago Peternella Violin, c.1925-30, New York"
  },
  {
    "key": "ingles-a-violin-by-jan-kulik",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jan-kulik-violin-1862-prague-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jan-kulik",
    "title": "Violin by Jan Kulik, Prague, 1862"
  },
  {
    "key": "ingles-a-violin-by-janos-toth",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/janos-toth-violin-1933-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-janos-toth",
    "title": "Janos Toth Violin, Budapest, 1933"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-deshayes-salomon",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-deshayes-salomon-violin-18th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-deshayes-salomon",
    "title": "A mid-18th century Jean Baptiste Deshayes Salomon Violin"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-deshayes-salomon-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-deshayes-salomon-violin-paris-c1760-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-deshayes-salomon-2",
    "title": "Jean Baptiste Deshayes Violin, Paris, C.1760"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-deshayes-salomon-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/jean-baptiste-deshayes-salomon-violin-paris-c1750-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-deshayes-salomon-3",
    "title": "Violin by Jean-Baptiste Deshayes Salomon, Paris, Circa 1750"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-10",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-paris-violin-1849-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-10",
    "title": "An 1849 Violin made by the esteemed Jean-Baptiste Vuillaume in Paris"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-11",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-violin-paris-1844-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-11",
    "title": "Jean-Baptiste Vuillaume Violin, Paris, 1844"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-12",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-Violin-paris-c1840-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-12",
    "title": "A Violin by Made by J.b. Vuillaume in Paris, circa 1840"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-13",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-violin-paris-1867-8-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-13",
    "title": "Jean-Baptiste Vuillaume Violin, Paris, 1867-68"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-14",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-violin-paris-c1862-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-14",
    "title": "Jean Baptiste Vuillaume Violin, c.1862 Made in Paris"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/05/Jean-Baptiste-Vuillaume-Paris-1854-violin-p.8-9-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-2",
    "title": "An 1854 violin by J.B. Vuillaume Paris"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/jean-baptiste-vuillaume-st-jean-violin-evangelist-quartet-1863-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-4",
    "title": "St. Jean Evangelists Quartet violin by J.B. Vuillaume, Paris 1863"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/jean-baptiste-vuillaume-st-marc-violin-evangelist-quartet-1863-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-5",
    "title": "St. Marc Evangelists Quartet violin by J.B. Vuillaume, Paris 1863"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/jean-baptiste-vuillaume-violin-c1830-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-6",
    "title": "Jean Baptiste Vuillaume violin Paris c1830"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-7",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Jean-Baptiste-Vuillaume-Paris-1855-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-7",
    "title": "J.B. Vuillaume Violin, Made in Paris in 1855"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-8",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Jean-Baptiste-Vuillaume-Paris-1866-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-8",
    "title": "A Violin by Jean-Baptiste Vuillaume, Paris, 1866"
  },
  {
    "key": "ingles-a-violin-by-jean-baptiste-vuillaume-9",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-baptiste-vuillaume-violin-1845-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-baptiste-vuillaume-9",
    "title": "Jean Baptiste Vuillaume Violin, Paris , 1845"
  },
  {
    "key": "ingles-a-violin-by-jean-francois-aldric",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/jean-francois-aldric-paris-violin-c1820-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-jean-francois-aldric",
    "title": "Violin by Jean Francois Aldric, Paris, Circa 1820"
  },
  {
    "key": "ingles-a-violin-by-johann-georg-leeb",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/johann-georg-leeb-violin-pressburg-1788-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johann-georg-leeb",
    "title": "Violin by Johann Georg Leeb, Vienna, 1788"
  },
  {
    "key": "ingles-a-violin-by-johann-karl-kloz",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/joan-carol-kloz-violin-1756-mittenwald-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johann-karl-kloz",
    "title": "Johann Karl Kloz Violin, Mittenwald, 1756"
  },
  {
    "key": "ingles-a-violin-by-johannes-theodorus-cuypers-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/johannes-theodorus-cuypers-violin-c1780-1004-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johannes-theodorus-cuypers-2",
    "title": "1780 Johannes T. Cuypers violin, The Hague"
  },
  {
    "key": "ingles-a-violin-by-johannes-theodorus-cuypers-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/johannes-theodorus-cuypers-the-hague-violin-c1780-1009-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johannes-theodorus-cuypers-3",
    "title": "J. Cuypers violin c1780, The Hague"
  },
  {
    "key": "ingles-a-violin-by-johannes-theodorus-cuypers-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/johannes-theodorus-cuypers-violin-the-hague-1807-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johannes-theodorus-cuypers-4",
    "title": "Johannes Cuypers violin c1807, The Hague"
  },
  {
    "key": "ingles-a-violin-by-johannes-theodorus-cuypers-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/johannes-theodorus-cuypers-the-hague-violin-c1780-1008-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johannes-theodorus-cuypers-5",
    "title": "Johannes Theodorus Cuypers violin c1780, The Hague"
  },
  {
    "key": "ingles-a-violin-by-johannes-theodorus-cuypers-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/johannes-theodorus-cuypers-the-hague-violin-c1780-1011-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-johannes-theodorus-cuypers-6",
    "title": "1780 Johannes Theodorus Cuypers violin, The Hague"
  },
  {
    "key": "ingles-a-violin-by-john-frederick-lott-ii",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/john-frederick-lott-ii-violin-london-c1860-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-john-frederick-lott-ii",
    "title": "John F. Lott II Violin, London, c. 1860, Alexander Gaglianus"
  },
  {
    "key": "ingles-a-violin-by-john-johnson",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/john-johnson-violin-london-c1755-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-john-johnson",
    "title": "John Johnson Violin, c.1755, London"
  },
  {
    "key": "ingles-a-violin-by-john-lott",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/john-lott-violin-c1860-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-john-lott",
    "title": "Violin by John Frederick Lott II, London, c. 1860"
  },
  {
    "key": "ingles-a-violin-by-joseph-panormo-london-circa-1800",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/08/Joseph-Panormo-London-c1800-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-joseph-panormo-london-circa-1800",
    "title": "A violin by Joseph Panormo for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-karel-vavra",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/karel-vavra-violin-prague-1940-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-karel-vavra",
    "title": "Karel Vavra Violin, Prague, 1940"
  },
  {
    "key": "ingles-a-violin-by-karel-vavra-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/karel-vavra-violin-Prague-1942-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-karel-vavra-2",
    "title": "A 1942 Violin Made By Karel Vavra in Prague"
  },
  {
    "key": "ingles-a-violin-by-karel-vavra-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/karel-vavra-violin-c1825-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-karel-vavra-3",
    "title": "A Violin by Karel Vavra, Made in Prague, 1941"
  },
  {
    "key": "ingles-a-violin-by-leandro-bisiach",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/leandro-bisiach-violin-1920-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-leandro-bisiach",
    "title": "Leandro Bisiach violin Milan 1920"
  },
  {
    "key": "ingles-a-violin-by-leandro-bisiach-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Leandro-Bisiach-Venegono-Superiore-1919-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-leandro-bisiach-2",
    "title": "Leandro Bisiach Violin, Milan, 1919"
  },
  {
    "key": "ingles-a-violin-by-leandro-bisiach-milan-1910",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/04/Leandro-Bisiach-Milan-1910-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-leandro-bisiach-milan-1910",
    "title": "A violin by Leandro Bisiach for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-leopold-widhalm",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/leopold-widhalm-violin-1776-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-leopold-widhalm",
    "title": "1776 Violin by Leopold Widhalm, Nuremberg"
  },
  {
    "key": "ingles-a-violin-by-lorenzo-bellafontana",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/lorenzo-bellafontana-genoa-violin-1948-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-lorenzo-bellafontana",
    "title": "Violin by Lorenzo Bellafontana, Genoa, 1948"
  },
  {
    "key": "ingles-a-violin-by-lorenzo-storioni",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/11/lorenzo-storioni-cremona-c1790-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-lorenzo-storioni",
    "title": "Lorenzo Storioni Violin, Cremona, Circa 1790"
  },
  {
    "key": "ingles-a-violin-by-lorenzo-storioni-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/lorenzo-storioni-violin-c1780-cremona-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-lorenzo-storioni-3",
    "title": "Violin by Lorenzo Storioni, Cremona, c.1780"
  },
  {
    "key": "ingles-a-violin-by-lorenzo-storioni-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/lorenzo-storioni-violin-1775-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-lorenzo-storioni-4",
    "title": "A 1775 Violin by Lorenzo Storioni in Cremona"
  },
  {
    "key": "ingles-a-violin-by-lorenzo-tomaso-carcassi-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/lorenzo-and-tomasso-carcassi-florence-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-lorenzo-tomaso-carcassi-3",
    "title": "Lorenzo & Tomaso Carcassi violin, c1770, Florence"
  },
  {
    "key": "ingles-a-violin-by-louis-guersan",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/louis-guersan-violin-1761-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-louis-guersan",
    "title": "1761 Violin by Louis Guersan, Paris"
  },
  {
    "key": "ingles-a-violin-by-louis-guersan-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/louis-guersan-violin-paris-1761-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-louis-guersan-2",
    "title": "Violin by Louis Guersan, Paris, 1761"
  },
  {
    "key": "ingles-a-violin-by-luigi-azzola",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/luigi-azzola-violin-turin-1948-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-luigi-azzola",
    "title": "Luigi Azzola Violin, Turin, Circa 1920"
  },
  {
    "key": "ingles-a-violin-by-luigi-galimberti",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/luigi-galimberti-violin-seveso-1929-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-luigi-galimberti",
    "title": "1929 Violin by Luigi Galimberti, Milan"
  },
  {
    "key": "ingles-a-violin-by-luigi-montevecchi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/luigi-montevecchi-violin-cesena-c1915-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-luigi-montevecchi",
    "title": "Violin by Luigi Montevecchi, Cesena, Circa 1915"
  },
  {
    "key": "ingles-a-violin-by-luigi-vistoli",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/luigi-vistoli-violin-venice-1951-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-luigi-vistoli",
    "title": "1951 Violin by Luigi Vistoli, Venice"
  },
  {
    "key": "ingles-a-violin-by-marco-dobretsovich",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/marco-dobretsovich-violin-cairo-1923-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-marco-dobretsovich",
    "title": "Marco Dobretsovich Violin, Cairo, 1923"
  },
  {
    "key": "ingles-a-violin-by-marino-capicchioni",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Marino-Capicchioni-Rimini-1965-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-marino-capicchioni",
    "title": "Marino Capicchioni Violin, Rimini, 1965"
  },
  {
    "key": "ingles-a-violin-by-marino-mario-capicchioni",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/marino-and-mario-capicchioni-violin-rimini-1976-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-marino-mario-capicchioni",
    "title": "Marino & Mario Capicchioni Violin, Rimini, 1976"
  },
  {
    "key": "ingles-a-violin-by-mario-gadda",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/mario-gadda-mantua-violin-c1980-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-mario-gadda",
    "title": "Mario Gadda Violin, Mantua, C.1980"
  },
  {
    "key": "ingles-a-violin-by-mario-gadda-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/mario-gadda-violin-mantua-c1970-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-mario-gadda-2",
    "title": "Sale of M. Gadda Violin, Mantua C.1970"
  },
  {
    "key": "ingles-a-violin-by-mario-gadda-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/mario-gadda-mantua-violin-1962-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-mario-gadda-3",
    "title": "Mario Gadda Violin, c.1962, Mantua"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/matteo-goffriller-violin-1706-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller",
    "title": "Matteo Goffriller Violin, Venice, 1706"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Matteo-Goffriller-Venice-1692-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller-2",
    "title": "Violin by Matteo Goffriller, Venice, 1706"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/matteo-goffriller-violin-c1720-1006-venice-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller-3",
    "title": "Matteo Goffriller Violin, Venice, Circa 1720"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/matteo-goffriller-violin-c1720-1011-venice-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller-4",
    "title": "1700 Violin by Matteo Goffriller, Venice"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/matteo-goffriller-violin-venice-c1700-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller-6",
    "title": "Violin by Matteo Goffriller, Venice, Circa 1700"
  },
  {
    "key": "ingles-a-violin-by-matteo-goffriller-7",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/09/Matteo-Goffriller-violin-Venice-c1710-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matteo-goffriller-7",
    "title": "Matteo Goffriller Violin, Venice, Circa 1710"
  },
  {
    "key": "ingles-a-violin-by-matthew-hardie",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/05/Matthew-Hardie-Edinburgh-1802-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matthew-hardie",
    "title": "Matthew Hardie Violin, Edinburgh, 1802"
  },
  {
    "key": "ingles-a-violin-by-matthew-hardie-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/matthew-hardie-violin-edinburgh-1928-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matthew-hardie-2",
    "title": "1928 Violin by Matthew Hardie, Edinburgh"
  },
  {
    "key": "ingles-a-violin-by-matthew-hardie-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/matthew-hardie-violin-c1800-edinburgh-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-matthew-hardie-3",
    "title": "Violin by Matthew Hardie, Edinburgh, Circa 1800"
  },
  {
    "key": "ingles-a-violin-by-max-mockel",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/max-mockel-violin-berlin-1925-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-max-mockel",
    "title": "A violin by Max Mockel"
  },
  {
    "key": "ingles-a-violin-by-michael-kloz",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/michael-kloz-violin-c1775-mittenwald-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michael-kloz",
    "title": "Michael Kloz Violin, Mittenwald, Circa 1775"
  },
  {
    "key": "ingles-a-violin-by-michael-strobl",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/michael-strobl-violin-1922-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michael-strobl",
    "title": "Michael Strobl Violin, Berlin, 1922"
  },
  {
    "key": "ingles-a-violin-by-michael-strobl-berlin-1924",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/michael-strobl-violin-1924-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michael-strobl-berlin-1924",
    "title": "Violin by Michael Strobl, Berlin, 1924"
  },
  {
    "key": "ingles-a-violin-by-michele-angelo-bergonzi",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Michelangelo-Bergonizi-Cremona-1744-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michele-angelo-bergonzi",
    "title": "Michele Angelo Bergonzi violin Cremona 1744"
  },
  {
    "key": "ingles-a-violin-by-michele-deconet",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Michele-Deconet-c1740-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michele-deconet",
    "title": "Michele Deconet Violin, Venice, Circa 1740"
  },
  {
    "key": "ingles-a-violin-by-michele-platner",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/michele-platner-violin-rome-1744-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-michele-platner",
    "title": "Michele Platner Violin, Rome, 1744"
  },
  {
    "key": "ingles-a-violin-by-nathaniel-cross",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/nathaniel-cross-violin-london-1719-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nathaniel-cross",
    "title": "Violin by Nathaniel Cross, London, 1719"
  },
  {
    "key": "ingles-a-violin-by-neuner-hornsteiner",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/neuner-and-hornsteiner-violin-c1900-mittenwald-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-neuner-hornsteiner",
    "title": "Neuner & Hornsteiner Violin, Mittenwald, Circa 1900"
  },
  {
    "key": "ingles-a-violin-by-nicola-marchioni",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/nicola-marchioni-violin-bologna-c1740-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicola-marchioni",
    "title": "Nicola Marchioni violin Bologna c1740 |Ingles & Hayday"
  },
  {
    "key": "ingles-a-violin-by-nicola-marchioni-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/nicola-marchioni-violin-1730-bologna-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicola-marchioni-2",
    "title": "Nicola Marchioni Violin, Bologna, 1730"
  },
  {
    "key": "ingles-a-violin-by-nicolas-lupot",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/nicolas-lupot-paris-1817-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolas-lupot",
    "title": "Nicolas Lupot Violin, Paris, 1817"
  },
  {
    "key": "ingles-a-violin-by-nicolas-vuillaume",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/nicolas-vuillaume-violin-19th-century-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolas-vuillaume",
    "title": "Nicolas Vuillaume Violin, Mirecourt, Mid-19th Century"
  },
  {
    "key": "ingles-a-violin-by-nicolo-amati-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Nicolo-Amati-Cremona-1650-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolo-amati-2",
    "title": "1660 Violin by Nicolo Amati, Cremona"
  },
  {
    "key": "ingles-a-violin-by-nicolo-amati-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/04/Nicolo-Amati-Cremona-1662-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolo-amati-3",
    "title": "Violin by Nicolo Amati, Cremona, 1662"
  },
  {
    "key": "ingles-a-violin-by-nicolo-gagliano",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/nicolo-gagliano-violin-naples-c1760-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolo-gagliano",
    "title": "A Nicolo Gagliano Violin, Naples, 1760"
  },
  {
    "key": "ingles-a-violin-by-nicolo-gagliano-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Nicolo-Gagliano-Naples-1758-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-nicolo-gagliano-4",
    "title": "A Violin by Nicolo Gagliano, Naples, 1758"
  },
  {
    "key": "ingles-a-violin-by-oreste-candi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/oreste-candi-violin-genoa-1928-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-oreste-candi",
    "title": "Violin by Oreste Candi, Genoa, 1928"
  },
  {
    "key": "ingles-a-violin-by-oswald-mockel",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/oswald-mockel-violin-berlin-1901-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-oswald-mockel",
    "title": "Violin by Oswald Mockel, Berlin, 1901"
  },
  {
    "key": "ingles-a-violin-by-paolo-de-barbieri",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/paolo-de-barbieri-violin-genoa-1926-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paolo-de-barbieri",
    "title": "Paolo de Barbieri Violin, Genoa, 1926"
  },
  {
    "key": "ingles-a-violin-by-paul-bailly-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/paul-bailly-violin-paris-1887-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-bailly-3",
    "title": "1887 Violin by Paul Bailly, Paris"
  },
  {
    "key": "ingles-a-violin-by-paul-bailly-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/paul-bailly-violin-paris-1902-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-bailly-4",
    "title": "Violin by Paul Bailly, London, 1902"
  },
  {
    "key": "ingles-a-violin-by-paul-bailly-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/paul-bailly-violin-paris-c1885-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-bailly-5",
    "title": "Paul Bailly Violin, Paris, Circa 1885"
  },
  {
    "key": "ingles-a-violin-by-paul-blanchard",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/02/paul-blanchard-violin-c1895-b.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-blanchard",
    "title": "Violin by Paul Blanchard, Lyon, Circa 1895"
  },
  {
    "key": "ingles-a-violin-by-paul-blanchard-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/paul-blanchard-violin-lyon-1888-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-blanchard-2",
    "title": "1888 Violin by Paul Blanchard, Lyon"
  },
  {
    "key": "ingles-a-violin-by-paul-kaul",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/paul-kaul-violin-mirecourt-1950-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-kaul",
    "title": "Paul Kaul Violin, Mirecourt, 1950"
  },
  {
    "key": "ingles-a-violin-by-paul-serdet",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/paul-serdet-violin-paris-1906-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-paul-serdet",
    "title": "Paul Serdet Violin, Paris, 1906"
  },
  {
    "key": "ingles-a-violin-by-pauli-merling",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/Pauli-merling-violin-copenhagen-1939-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pauli-merling",
    "title": "A Violin by Pauli Merling, Copenhagen, 1937"
  },
  {
    "key": "ingles-a-violin-by-pauli-merling-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/Pauli-merling-violin-1937-copenhagen-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pauli-merling-2",
    "title": "Pauli Merling Violin, Copenhagen, 1937"
  },
  {
    "key": "ingles-a-violin-by-piero-parravicini",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/piero-parravicini-violin-1928-milan-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-piero-parravicini",
    "title": "Violin by Piero Parravicini, Milan, 1928"
  },
  {
    "key": "ingles-a-violin-by-pierre-joseph-hel-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pierre-joseph-hel-violin-1881-lille-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pierre-joseph-hel-3",
    "title": "Pierre Joseph Hel Violin, Lille, 1881"
  },
  {
    "key": "ingles-a-violin-by-pierre-joseph-hel-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pierre-joseph-hel-violin-lille-1893-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pierre-joseph-hel-4",
    "title": "Pierre Joseph Hel violin c1893, Lille"
  },
  {
    "key": "ingles-a-violin-by-pierre-joseph-hel-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pierre-joseph-hel-Violin-lille-1901-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pierre-joseph-hel-6",
    "title": "Pierre Joseph Hel violin c1901, Lille"
  },
  {
    "key": "ingles-a-violin-by-pierre-silvestre",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Pierre-Silvestre-Lyon-1856-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pierre-silvestre",
    "title": "Pierre Silvestre Violin, Paris, 1856"
  },
  {
    "key": "ingles-a-violin-by-pierre-silvestre-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pierre-silvestre-violin-1846-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pierre-silvestre-2",
    "title": "Violin by Pierre Silvestre, Paris, 1846"
  },
  {
    "key": "ingles-a-violin-by-pietro-antonio-dalla-costa",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/Pietro-Antonio-dalla-Costa-Treviso-1764-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-antonio-dalla-costa",
    "title": "Dalla Costa Violin, Treviso, 1764"
  },
  {
    "key": "ingles-a-violin-by-pietro-antonio-dalla-costa-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pietro-antonio-dalla-costa-treviso-violin-1733-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-antonio-dalla-costa-2",
    "title": "1733 Pietro Antonio Dalla Costa Violin"
  },
  {
    "key": "ingles-a-violin-by-pietro-antonio-dalla-costa-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pietro-antonio-dalla-costa-violin-treviso-c1735-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-antonio-dalla-costa-3",
    "title": "A violin by Pietro Antonio Dalla Costa | Inlges & Hayday"
  },
  {
    "key": "ingles-a-violin-by-pietro-guarneri-of-mantua",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Pietro-Guarneri-of-Mantua-Mantua-1685-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-guarneri-of-mantua",
    "title": "Pietro Guarneri Violin, Cremona, 1685"
  },
  {
    "key": "ingles-a-violin-by-pietro-guarneri-of-venice",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pietro-guarneri-of-venice-violin-c1750-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-guarneri-of-venice",
    "title": "Violin by Pietro Guarneri, Venice, Circa 1750"
  },
  {
    "key": "ingles-a-violin-by-pietro-guarneri-of-venice-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pietro-guarneri-of-venice-violin-1754-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-guarneri-of-venice-2",
    "title": "1754 Violin by Pietro Guarneri, Venice"
  },
  {
    "key": "ingles-a-violin-by-pietro-guarneri-of-venice-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/pietro-guarneri-of-venice-violin-c1750-55-victor-aitay-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-pietro-guarneri-of-venice-3",
    "title": "Pietro Guarneri Violin, Venice, Circa 1750-55"
  },
  {
    "key": "ingles-a-violin-by-pietro-guarneri-venice-circa-1730",
    "image": "https://ingleshayday.com/wp-content/uploads/2026/03/Pietro-Guarneri-Venice-circa-1730-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-pietro-guarneri-venice-circa-1730",
    "title": "A violin by Pietro Guarneri, circa 1730 | Instrument for Private Sale"
  },
  {
    "key": "ingles-a-violin-by-raffaele-trapani",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Raffaele-Trapani-Naples-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-raffaele-trapani",
    "title": "Violin by Raffaele Trapani, Naples, 1815"
  },
  {
    "key": "ingles-a-violin-by-riccardo-genovese",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/riccardo-genovese-lecco-violin-c1930-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-riccardo-genovese",
    "title": "Riccardo Genovese Violin, Lecco, Circa 1930"
  },
  {
    "key": "ingles-a-violin-by-riccardo-genovese-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/riccardo-genovese-violin-montiglio-1926-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-riccardo-genovese-2",
    "title": "Violin by Riccardo Genovese, Montiglio, 1926"
  },
  {
    "key": "ingles-a-violin-by-richard-duke",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/richard-duke-Violin-london-c1780-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-richard-duke",
    "title": "Richard Duke Violin, London, Circa 1780"
  },
  {
    "key": "ingles-a-violin-by-richard-tobin",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/richard-tobin-violin-london-c1825-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-richard-tobin",
    "title": "Richard Tobin Violin, London, Circa 1825"
  },
  {
    "key": "ingles-a-violin-by-rodolfo-fredi",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/rodolfo-fredi-violin-rome-1944-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-rodolfo-fredi",
    "title": "Rodolfo Fredi Violin, c.1944, Rome"
  },
  {
    "key": "ingles-a-violin-by-roger-max-millant",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/Roger-Max-millant-violin-1942-paris-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-roger-max-millant",
    "title": "Roger & Max Millant Violin, Paris, 1942"
  },
  {
    "key": "ingles-a-violin-by-romeo-antoniazzi-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/romeo-antoniazzi-violin-1906-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-romeo-antoniazzi-2",
    "title": "1906 Romeo Antoniazzi violin, Milan"
  },
  {
    "key": "ingles-a-violin-by-romeo-antoniazzi-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/romeo-antoniazzi-milan-violin-c1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-romeo-antoniazzi-3",
    "title": "20th century Romeo Antoniazzi violin made in Milan"
  },
  {
    "key": "ingles-a-violin-by-romeo-antoniazzi-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/romeo-antoniazzi-violin-milan-c1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-romeo-antoniazzi-4",
    "title": "Romeo Antoniazzi violin c1910, Milan"
  },
  {
    "key": "ingles-a-violin-by-santo-serafin-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/santo-serafin-violin-1732-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-santo-serafin-2",
    "title": "Santo Serafin Violin, Venice, 1732"
  },
  {
    "key": "ingles-a-violin-by-santo-serafin-venice-circa-1735",
    "image": "https://ingleshayday.com/wp-content/uploads/2026/01/Santo-Serafin-violin-Venice-c1735-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-santo-serafin-venice-circa-1735",
    "title": "A violin by Santo Serafin, Venice, circa 1735 | Private Sales | Instrument for Sale"
  },
  {
    "key": "ingles-a-violin-by-sebastian-dallinger",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/sebastian-dallinger-violin-vienna-1802-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sebastian-dallinger",
    "title": "Sebastian Dalinger Violin, Vienna, 1802"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/sesto-rocchi-violin-1977-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi",
    "title": "Sesto Rocchi Violin, San Polo d'Enza, 1977"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2020/06/Sesto-Rocchi-San-Polo-dEnza-1972-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi-2",
    "title": "Sesto Rocchi Violin, San Polo d'Enza, 1972"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/sesto-rocchi-san-polo-denza-violin-1973-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi-3",
    "title": "A violin by Sesto Rocchi, San Polo d'Enza, 1973"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/sesto-rocchi-violin-1979-san-polo-denza-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi-4",
    "title": "1979 Sesto Rocchi Violin, Made in San Polo d'Enza"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-5",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/sesto-rocchi-san-polo-denza-violin-1980-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi-5",
    "title": "Sesto Rocchi Violin, San Polo d'Enza, 1980"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-6",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/07/sesto-rocchi-violin-san-polo-denza-1973-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-sesto-rocchi-6",
    "title": "Sesto Rocchi Violin, San Polo d'Enza, 1973"
  },
  {
    "key": "ingles-a-violin-by-sesto-rocchi-san-polo-denza-1981",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/11/Sesto-Rocchi-violin-San-Polo-DEnza-1981-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-sesto-rocchi-san-polo-denza-1981",
    "title": "A violin by Sesto Rocchi for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-simeone-morassi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/simeone-morassi-Violin-cremona-1988-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-simeone-morassi",
    "title": "Simeone Morassi Violin, Cremona, 1988"
  },
  {
    "key": "ingles-a-violin-by-stefan-peter-greiner",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/stefan-peter-greiner-violin-bonn-1996-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-stefan-peter-greiner",
    "title": "Stefan Peter Greiner Violin, Bonn, 1996"
  },
  {
    "key": "ingles-a-violin-by-stefano-scarampella-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/stefano-scarampella-violin-1910-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-stefano-scarampella-3",
    "title": "1910 Violin by Stefano Scarampella, Mantua"
  },
  {
    "key": "ingles-a-violin-by-the-voller-brothers-london-circa-1920",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/11/Voller-Brothers-violin-London-c.1920-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-the-voller-brothers-london-circa-1920",
    "title": "A violin by the Voller Brothers for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-thomas-hardie",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/thomas-hardie-violin-edinburgh-c1825-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-thomas-hardie",
    "title": "Violin by Thomas Hardie, Edinburgh, Circa 1825"
  },
  {
    "key": "ingles-a-violin-by-thomas-kennedy",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/thomas-kennedy-violin-1831-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-thomas-kennedy",
    "title": "Thomas Kennedy Violin, London, 1831"
  },
  {
    "key": "ingles-a-violin-by-thomas-perry",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/thomas-perry-violin-dublin-c1900-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-thomas-perry",
    "title": "Thomas Perry Violin, Dublin, Circa 1900"
  },
  {
    "key": "ingles-a-violin-by-thomas-urquhart",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/thomas-urquhart-violin-c1680-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-thomas-urquhart",
    "title": "Thomas Urquhart Violin, London, Circa 1680"
  },
  {
    "key": "ingles-a-violin-by-tomaso-eberle",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/tomaso-eberle-violin-1777-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomaso-eberle",
    "title": "Tomaso Eberle Violin, Naples, 1777"
  },
  {
    "key": "ingles-a-violin-by-tomaso-eberle-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/tomaso-eberle-violin-c1770-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomaso-eberle-2",
    "title": "Discover this c. 1770 Tomaso Eberle Violin"
  },
  {
    "key": "ingles-a-violin-by-tomaso-eberle-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/tomaso-eberle-violin-c1760-naples-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomaso-eberle-3",
    "title": "A Violin by Tomaso Eberle, Naples, 1771"
  },
  {
    "key": "ingles-a-violin-by-tomaso-eberle-4",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/tomaso-eberle-naples-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomaso-eberle-4",
    "title": "Tomaso Eberle Violin, Naples, c.1775"
  },
  {
    "key": "ingles-a-violin-by-tomasso-balestrieri-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/tomasso-balestrieri-mantua-violin-1792-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomasso-balestrieri-2",
    "title": "Tommaso Balestrieri Violin, Mantua, 1792"
  },
  {
    "key": "ingles-a-violin-by-tomasso-balestrieri-mantua-1765",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/11/tomasso-balestrieri-mantua-1765-mantua-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-tomasso-balestrieri-mantua-1765",
    "title": "1765 Violin by Tommaso Balestrieri, Mantua"
  },
  {
    "key": "ingles-a-violin-by-tommaso-balestrieri-mantua-1780",
    "image": "https://ingleshayday.com/wp-content/uploads/2024/08/Tommaso-Balestrieri-Mantua-1780-vioin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-tommaso-balestrieri-mantua-1780",
    "title": "A violin by Tommaso Balestrieri for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-umberto-lanaro",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/umberto-lanaro-violin-1976-padua-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-umberto-lanaro",
    "title": "Umberto Lanaro Violin, Padua, 1976"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-cavani",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/vincenzo-cavani-violin-modena-c1940-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-vincenzo-cavani",
    "title": "Vincenzo Cavani Violin, Modena, Circa 1940"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-panormo",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/02/vincenzo-panormo-violin-london-c1800-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-vincenzo-panormo",
    "title": "Violin by Vincenzo Panormo, London, Circa 1800"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-panormo-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/vincenzo-panormo-violin-c1810-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-vincenzo-panormo-2",
    "title": "1810 Vincenzo Trusiano Panormo Violin, London"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-panormo-3",
    "image": "https://ingleshayday.com/wp-content/uploads/2022/05/vincenzo-panormo-violin-mirecourt-london-c1810-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-vincenzo-panormo-3",
    "title": "Vincenzo Panormo Violin, c.1810, London"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-postiglione-naples-1895",
    "image": "https://ingleshayday.com/wp-content/uploads/2025/10/Vincenzo-Postiglione-violin-Naples-1895-b-800x1900.jpg",
    "url": "https://ingleshayday.com/private-sales-instrument/a-violin-by-vincenzo-postiglione-naples-1895",
    "title": "A violin by Vincenzo Postiglione for sale | Private Sales"
  },
  {
    "key": "ingles-a-violin-by-vincenzo-sannino",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/vincenzo-sannino-violin-c1910-15-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-vincenzo-sannino",
    "title": "Vincenzo Sannino Violin, Naples, Circa 1910-15"
  },
  {
    "key": "ingles-a-violin-by-w-e-hill-sons",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/hill-w-e-and-sons-violin-1914-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-w-e-hill-sons",
    "title": "W.E. Hill & Sons violin made in 1914, London"
  },
  {
    "key": "ingles-a-violin-by-willi-lindorfer",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/willi-lindorfer-violin-berlin-1939-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-willi-lindorfer",
    "title": "Willi Lindorfer Violin, Berlin, 1939"
  },
  {
    "key": "ingles-a-violin-by-william-forster-ii",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/william-forster-violin-london-c1780-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-william-forster-ii",
    "title": "William Forster II Violin, London, Circa 1780"
  },
  {
    "key": "ingles-a-violin-by-william-luff",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/william-luff-violin-1991-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-william-luff",
    "title": "Violin by William Luff, London, 1991"
  },
  {
    "key": "ingles-a-violin-by-william-luff-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/william-luff-violin-1986-london-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-william-luff-2",
    "title": "1986 Violin by William Luff, London"
  },
  {
    "key": "ingles-a-violin-by-zosimo-bergonzi",
    "image": "https://ingleshayday.com/wp-content/uploads/2021/03/zosimo-bergonzi-cremona-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/a-violin-by-zosimo-bergonzi",
    "title": "Zosimo Bergonzi Violin, Cremona, Circa 1770"
  },
  {
    "key": "ingles-violin-by-amati-girolamo",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/11/girolamo-amati-II-Cremona-c1700-violin-ex-corbett-ex-bennett-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-amati-girolamo",
    "title": "Girolamo Amati II Violin, Cremona, Circa 1700"
  },
  {
    "key": "ingles-violin-by-andrea-guarneri-in-cremona-on-1662",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Andrea-Guarneri-Cremona-1662-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-andrea-guarneri-in-cremona-on-1662",
    "title": "Violin by Andrea Guarneri, 1662"
  },
  {
    "key": "ingles-violin-by-andrea-guarneri-in-cremona-on-1673",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Andrea-Guarneri-Cremona-1673-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-andrea-guarneri-in-cremona-on-1673",
    "title": "Violin by Andrea Guarneri, 1673"
  },
  {
    "key": "ingles-violin-by-andrea-guarneri-in-cremona-on-1684",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Andrea-Guarneri-Cremona-1684-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-andrea-guarneri-in-cremona-on-1684",
    "title": "Violin by Andrea Guarneri, 1684"
  },
  {
    "key": "ingles-violin-by-annibale-fagnola-in-turin-on-1925",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Annibale-Fagnola-Turin-1925-violin-4C-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-annibale-fagnola-in-turin-on-1925",
    "title": "Violin by Annibale Fagnola, 1925"
  },
  {
    "key": "ingles-violin-by-annibale-fagnola-in-turin-on-1929",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Annibale-Fagnola-Turin-1929-violin-4C-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-annibale-fagnola-in-turin-on-1929",
    "title": "Violin by Annibale Fagnola, 1929"
  },
  {
    "key": "ingles-violin-by-annibale-fagnola-in-turin-on-1932",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Annibale-Fagnola-Turin-1932-violin-4C-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-annibale-fagnola-in-turin-on-1932",
    "title": "Violin by Annibale Fagnola, 1932"
  },
  {
    "key": "ingles-violin-by-anselmo-bellosio-in-venice-on-circa-1785",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Anselmo-Bellosio-Venice-c1785-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-anselmo-bellosio-in-venice-on-circa-1785",
    "title": "Anselmo Bellosio Violin | Expert Luthier"
  },
  {
    "key": "ingles-violin-by-antonio-amati-in-cremona-on-1596",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Girolamo-Antonio-Amati-Cremona-1596-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-amati-in-cremona-on-1596",
    "title": "Antonio & Girolamo Amati Violin, 1596"
  },
  {
    "key": "ingles-violin-by-antonio-amati-in-cremona-on-circa-1621",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Girolamo-Antonio-Amati-Cremona-c1620-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-amati-in-cremona-on-circa-1621",
    "title": "Antonio & Girolamo Amati Violin, 1621"
  },
  {
    "key": "ingles-violin-by-antonio-amati-in-cremona-on-circa-1625",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Girolamo-Antonio-Amati-Cremona-c1625-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-amati-in-cremona-on-circa-1625",
    "title": "Antonio & Girolamo Amati Violin, 1625"
  },
  {
    "key": "ingles-violin-by-antonio-gragnani-in-livorno-on-1773",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Gragnani-Livorno-1773-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-gragnani-in-livorno-on-1773",
    "title": "Antonio Gragnani Violin, Livorno 1773"
  },
  {
    "key": "ingles-violin-by-antonio-gragnani-in-livorno-on-1786",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Gragnani-Livorno-1786-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-gragnani-in-livorno-on-1786",
    "title": "Antonio Gragnani Violin, Livorno 1786"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1667",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1667-violin-Sothebys-Ex-Jenkins-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1667",
    "title": "Ex-Jenkins violin by Stradivari, Cremona, 1667"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1690",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1690-violin-Sothebys-Ex-Stephens-Verdehr-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1690",
    "title": "Stevens violin by Stradivari, Cremona, 1690"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1699",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1699-violin-Sothebys-Lady-Tennant-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1699",
    "title": "Lady Tennant violin by Stradivari, Cremona, 1699"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1709",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1709-violin-Sothebys-Greffuhle-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1709",
    "title": "Greffulhe violin by Stradivari, Cremona, 1709"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1713",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1713-violin-ex-kux-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1713",
    "title": "Ex-Kux Baron Rothschild violin by Stradivari"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1721",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/antonio-stradivari-cremona-1721-lady-blunt-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1721",
    "title": "Violin by Antonio Stradivari, 1721"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1727",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1727-violin-Sothebys-Ex-Reynier-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1727",
    "title": "Ex-Reynier violin by Antonio Stradivari, 1727"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1729",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1729-violin-Sothebys-innes-loder-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1729",
    "title": "Innes Loder violin by Stradivari, 1727"
  },
  {
    "key": "ingles-violin-by-antonio-stradivari-in-cremona-on-1732",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Stradivari-Cremona-1732-violin-Red-Diamond-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-stradivari-in-cremona-on-1732",
    "title": "Violin by Antonio Stradivari, 1732"
  },
  {
    "key": "ingles-violin-by-antonio-zanotti-in-mantua-on-circa-1720",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Antonio-Zanotti-violin-c1720-Sothebys-back-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-antonio-zanotti-in-mantua-on-circa-1720",
    "title": "Violin by Antonio Zanotti, circa 1720"
  },
  {
    "key": "ingles-violin-by-bernardo-calcagni-in-genoa-on-1743",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Bernardo-Calcagni-1743-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-bernardo-calcagni-in-genoa-on-1743",
    "title": "Bernardo Calcagni violin Genoa 1743"
  },
  {
    "key": "ingles-violin-by-camillo-camilli-in-mantua-on-1730",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Camillo-Camilli-Mantua-1730-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-camillo-camilli-in-mantua-on-1730",
    "title": "Camillo Camilli Violin, 1730 | Fine Violins"
  },
  {
    "key": "ingles-violin-by-camillo-camilli-in-mantua-on-1739",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Camillo-Camilli-Mantua-1739-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-camillo-camilli-in-mantua-on-1739",
    "title": "Camillo Camilli Violin, 1739 | Fine Violins"
  },
  {
    "key": "ingles-violin-by-camillo-camilli-in-mantua-on-1751",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Camillo-Camilli-Mantua-1751-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-camillo-camilli-in-mantua-on-1751",
    "title": "Camillo Camilli Violin, 1751 | Fine Violins"
  },
  {
    "key": "ingles-violin-by-camillo-camilli-in-mantua-on-circa-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Camillo-Camilli-Mantua-c1725-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-camillo-camilli-in-mantua-on-circa-1725",
    "title": "Camillo Camilli Violin, 1725 | Fine Violins"
  },
  {
    "key": "ingles-violin-by-carlo-antonio-testore-in-milan-on-1752",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Antonio-Testore-Milan-1752-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-antonio-testore-in-milan-on-1752",
    "title": "Violin by Carlo Antonio Testore, 1752"
  },
  {
    "key": "ingles-violin-by-carlo-bergonzi-in-cremona-on-1736",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Bergonzi-Cremona-1736-violin-Sothebys-ex-Segelman-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-bergonzi-in-cremona-on-1736",
    "title": "Carlo Bergonzi Violin, Cremona, 1736"
  },
  {
    "key": "ingles-violin-by-carlo-bergonzi-in-cremona-on-circa-1720",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Bergonzi-Cremona-c1720-violin-Sothebys-ex-Paganini-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-bergonzi-in-cremona-on-circa-1720",
    "title": "Ex-Paganini violin by C. Bergonzi, c1720"
  },
  {
    "key": "ingles-violin-by-carlo-ferdinando-landolfi-in-milan-on-circa-1750",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Ferdinando-Landolfi-Milan-c1750-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-ferdinando-landolfi-in-milan-on-circa-1750",
    "title": "Violin by Carlo Ferdinando Landolfi, 1750"
  },
  {
    "key": "ingles-violin-by-carlo-giuseppe-testore-in-milan-on-circa-1705",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Giuseppe-Testore-Milan-c1705-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-giuseppe-testore-in-milan-on-circa-1705",
    "title": "Violin by Carlo Giuseppe Testore, circa 1705"
  },
  {
    "key": "ingles-violin-by-carlo-giuseppe-testore-in-milan-on-circa-1710",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Giuseppe-Testore-Milan-c1710-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-giuseppe-testore-in-milan-on-circa-1710",
    "title": "Violin by Carlo Giuseppe Testore, circa 1710"
  },
  {
    "key": "ingles-violin-by-carlo-tononi-in-bologna-or-venice-on-circa-1715",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Tononi-Venice-c1715-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-tononi-in-bologna-or-venice-on-circa-1715",
    "title": "Violin by Carlo Tononi, circa 1715"
  },
  {
    "key": "ingles-violin-by-carlo-tononi-in-venice-on-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Tononi-Venice-1725-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-tononi-in-venice-on-1725",
    "title": "Violin by Carlo Tononi, circa 1725"
  },
  {
    "key": "ingles-violin-by-carlo-tononi-in-venice-on-1726",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Carlo-Tononi-Venice-1726-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-carlo-tononi-in-venice-on-1726",
    "title": "Violin by Carlo Tononi, 1726"
  },
  {
    "key": "ingles-violin-by-david-tecchler-in-rome-on-circa-1720",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/David-Tecchler-Rome-c1720-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-david-tecchler-in-rome-on-circa-1720",
    "title": "Violin by David Tecchler, circa 1720"
  },
  {
    "key": "ingles-violin-by-david-tecchler-in-rome-on-circa-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/David-Tecchler-Rome-c1725-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-david-tecchler-in-rome-on-circa-1725",
    "title": "Violin by David Tecchler, circa 1725"
  },
  {
    "key": "ingles-violin-by-david-tecchler-in-rome-on-circa-1730",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/David-Tecchler-Rome-c1730-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-david-tecchler-in-rome-on-circa-1730",
    "title": "Violin by David Tecchler, circa 1730"
  },
  {
    "key": "ingles-violin-by-domenico-montagnana-in-venice-on-1721",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Domenico-Montagnana-Venice-1721-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-domenico-montagnana-in-venice-on-1721",
    "title": "Violin by Domenico Montagnana, 1721"
  },
  {
    "key": "ingles-violin-by-domenico-montagnana-in-venice-on-1731",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Domenico-Montagnana-Venice-1731-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-domenico-montagnana-in-venice-on-1731",
    "title": "Bloomfield violin by Montagnana, 1731"
  },
  {
    "key": "ingles-violin-by-domenico-montagnana-in-venice-on-1735",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Domenico-Montagnana-Venice-1735-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-domenico-montagnana-in-venice-on-1735",
    "title": "Violin by Domenico Montagnana, 1735"
  },
  {
    "key": "ingles-violin-by-domenico-montagnana-in-venice-on-circa-1740",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Domenico-Montagnana-Venice-c1740-violin-4C-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-domenico-montagnana-in-venice-on-circa-1740",
    "title": "Violin by Domenico Montagnana, 1740"
  },
  {
    "key": "ingles-violin-by-enrico-ceruti-in-cremona-on-1863",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/enrico-ceruti-cremona-1863-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-enrico-ceruti-in-cremona-on-1863",
    "title": "Violin by Enrico Ceruti, 1863 |Ingles & Hayday"
  },
  {
    "key": "ingles-violin-by-enrico-ceruti-in-cremona-on-circa-1865",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/enrico-ceruti-cremona-1865-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-enrico-ceruti-in-cremona-on-circa-1865",
    "title": "Violin by Enrico Ceruti, 1865"
  },
  {
    "key": "ingles-violin-by-enrico-rocca-in-genoa-on-1911",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Enrico-Rocca-Genoa-1911-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-enrico-rocca-in-genoa-on-1911",
    "title": "Violin by Enrico Rocca, 1911"
  },
  {
    "key": "ingles-violin-by-felix-mori-costa-in-parma-on-circa-1800",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Felix-Mori-Costa-Parma-c1800-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-felix-mori-costa-in-parma-on-circa-1800",
    "title": "Violin by Felix Mori Costa, 1800"
  },
  {
    "key": "ingles-violin-by-felix-mori-costa-in-parma-on-circa-1805",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Felix-Mori-Costa-Parma-c1805-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-felix-mori-costa-in-parma-on-circa-1805",
    "title": "Violin by Felix Mori Costa, 1805"
  },
  {
    "key": "ingles-violin-by-ferdinando-gagliano-in-naples-on-1782",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Ferdinando-Gagliano-Naples-1782-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-ferdinando-gagliano-in-naples-on-1782",
    "title": "Ferdinando Gagliano Violin, Naples 1782"
  },
  {
    "key": "ingles-violin-by-ferdinando-gagliano-in-naples-on-1784",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Ferdinando-Gagliano-Naples-1784-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-ferdinando-gagliano-in-naples-on-1784",
    "title": "Violin by Ferdinando Gagliano, Naples, 1784"
  },
  {
    "key": "ingles-violin-by-ferdinando-gagliano-in-naples-on-circa-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Ferdinando-Gagliano-Naples-1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-ferdinando-gagliano-in-naples-on-circa-1770",
    "title": "Ferdinando Gagliano Violin, Naples 1770"
  },
  {
    "key": "ingles-violin-by-francesco-emilani-in-rome-on-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Emiliani-Rome-1725-violin-Sotheybs-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-emilani-in-rome-on-1725",
    "title": "Violin by Francesco Emiliani, 1725"
  },
  {
    "key": "ingles-violin-by-francesco-emilani-in-rome-on-circa-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Emiliani-Rome-1725-violin-2-Sotheybs-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-emilani-in-rome-on-circa-1725",
    "title": "Violin by Francesco Emiliani, circa 1725"
  },
  {
    "key": "ingles-violin-by-francesco-gobetti-in-venice-on-1717",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Gobetti-Venice-1717-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-gobetti-in-venice-on-1717",
    "title": "Francesco Gobetti Violin, Venice, 1717| Ingles & Hayday"
  },
  {
    "key": "ingles-violin-by-francesco-rugeri-in-cremona-on-1685",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Rugeri-Cremona-1685-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-rugeri-in-cremona-on-1685",
    "title": "Violin by Francesco Rugeri, 1685"
  },
  {
    "key": "ingles-violin-by-francesco-rugeri-in-cremona-on-1696",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Rugeri-Cremona-1696-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-rugeri-in-cremona-on-1696",
    "title": "Violin by Francesco Rugeri, 1696"
  },
  {
    "key": "ingles-violin-by-francesco-rugeri-in-cremona-on-circa-1670",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Rugeri-Cremona-c1670-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-rugeri-in-cremona-on-circa-1670",
    "title": "Violin by Francesco Rugeri, 1670"
  },
  {
    "key": "ingles-violin-by-francesco-rugeri-in-cremona-on-circa-1680",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Francesco-Rugeri-Cremona-c1680-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-francesco-rugeri-in-cremona-on-circa-1680",
    "title": "Violin by Francesco Rugeri, 1680"
  },
  {
    "key": "ingles-violin-by-gennaro-gagliano-in-naples-on-1763",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Gennaro-Gagliano-Naples-1763-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-gennaro-gagliano-in-naples-on-1763",
    "title": "Gennaro Gagliano Violin, 1763, Naples"
  },
  {
    "key": "ingles-violin-by-gioffredo-cappa-in-saluzzo-on-circa-1690",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Gioffredo-Cappa-Saluzzo-c1690-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-gioffredo-cappa-in-saluzzo-on-circa-1690",
    "title": "Gioffredo Cappa Violin, 1690 | Expert Luthier"
  },
  {
    "key": "ingles-violin-by-giorgio-serafin-in-venice-on-1743",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Georgio-Seraphin-Venice-1743-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giorgio-serafin-in-venice-on-1743",
    "title": "Violin by Giorgio Serafin, 1743"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-ceruti-in-cremona-on-1813",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Ceruti-Cremona-1813-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-ceruti-in-cremona-on-1813",
    "title": "Giovanni Battista Ceruti Violin, 1813"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-ceruti-in-cremona-on-circa-1805",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Ceruti-Cremona-c1805-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-ceruti-in-cremona-on-circa-1805",
    "title": "Violin by Giovanni Battista Ceruti, 1805"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-gabrielli-in-florence-on-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Gabrielli-Florence-1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-gabrielli-in-florence-on-1770",
    "title": "Violin by Giovanni Battista Gabrielli, 1770"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-cremona-on-1758",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1758-violin-ex-Briggs-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-cremona-on-1758",
    "title": "Violin by Giovanni Battista Guadagnini, 1758"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-milan-on-1751",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1751-violin-ex-Sametini-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-milan-on-1751",
    "title": "Violin by Giovanni Battista Guadagnini, 1751"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-milan-on-1757",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1757-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-milan-on-1757",
    "title": "Violin by Giovanni Battista Guadagnini, 1757"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-parma-on-1769",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Parma-1769-violin-ex-Kingman-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-parma-on-1769",
    "title": "Violin by Giovanni Battista Guadagnini"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-turin-on-1772",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1772-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-turin-on-1772",
    "title": "Violin by Giovanni Battista Guadagnini, 1772"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-turin-on-1772-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1772-2violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-turin-on-1772-2",
    "title": "Giovanni Battista Guadagnini Violin, crafted in 1772"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-turin-on-1780",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-1780-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-turin-on-1780",
    "title": "Giovanni Battista Guadagnini Violin, 1780"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-guadagnini-in-turin-on-circa-1772",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Guadagnini-Turin-c1772-violin-3-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-guadagnini-in-turin-on-circa-1772",
    "title": "Giovanni Battista Guadagnini Violin,Turin circa 1772"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-rogeri-in-brescia-on-1696",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Rogeri-Brescia-1696-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-rogeri-in-brescia-on-1696",
    "title": "Violin by Giovanni Battista Rogeri, 1696"
  },
  {
    "key": "ingles-violin-by-giovanni-battista-rogeri-in-brescia-on-1699",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Battista-Rogeri-Brescia-1699-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-battista-rogeri-in-brescia-on-1699",
    "title": "Violin by Giovanni Battista Rogeri, 1699"
  },
  {
    "key": "ingles-violin-by-giovanni-francesco-celoniati-in-turin-on-1722",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Francesco-Celoniato-Turin-1722-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-francesco-celoniati-in-turin-on-1722",
    "title": "Violin by Giovanni Francesco Celoniati"
  },
  {
    "key": "ingles-violin-by-giovanni-francesco-pressenda-in-turin-on-1827",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Francesco-Pressenda-Turin-1827-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-francesco-pressenda-in-turin-on-1827",
    "title": "Violin by Giovanni Francesco Pressenda, 1827"
  },
  {
    "key": "ingles-violin-by-giovanni-francesco-pressenda-in-turin-on-1834",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Francesco-Pressenda-Turin-1834-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-francesco-pressenda-in-turin-on-1834",
    "title": "Violin by Giovanni Francesco Pressenda, 1834"
  },
  {
    "key": "ingles-violin-by-giovanni-francesco-pressenda-in-turin-on-1846",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Francesco-Pressenda-Turin-1846-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-francesco-pressenda-in-turin-on-1846",
    "title": "Violin by Giovanni Francesco Pressenda, 1846"
  },
  {
    "key": "ingles-violin-by-giovanni-grancino-in-milan-on-1693",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Grancino-Milan-1693-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-grancino-in-milan-on-1693",
    "title": "1693 Violin by Giovanni Grancino, Milan"
  },
  {
    "key": "ingles-violin-by-giovanni-grancino-in-milan-on-circa-1695",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Grancino-Milan-c1695-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-grancino-in-milan-on-circa-1695",
    "title": "Giovanni Grancino Violin, Milan, Circa 1695"
  },
  {
    "key": "ingles-violin-by-giovanni-grancino-in-milan-on-circa-1700",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Grancino-Milan-c1700-violin-4C-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-grancino-in-milan-on-circa-1700",
    "title": "Ex-Bagdasarjanz violin, G. Grancino c1700"
  },
  {
    "key": "ingles-violin-by-giovanni-maria-del-bussetto-in-cremona-on-1675",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Maria-Del-Bussetto-Cremona-1675-violin-4C-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-maria-del-bussetto-in-cremona-on-1675",
    "title": "Violin by Giovanni Maria del Busetto, 1675"
  },
  {
    "key": "ingles-violin-by-giovanni-maria-del-bussetto-in-cremona-on-circa-1680",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Maria-Del-Bussetto-Cremona-c1680-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-maria-del-bussetto-in-cremona-on-circa-1680",
    "title": "Ex-Menuhin violin by G.M. Del Bussetto c1680"
  },
  {
    "key": "ingles-violin-by-giovanni-paolo-maggini-in-brescia-on-circa-1610",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Paolo-Maggini-Brescia-c1610-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-paolo-maggini-in-brescia-on-circa-1610",
    "title": "Violin by Giovanni Paolo Maggini, 1610"
  },
  {
    "key": "ingles-violin-by-giovanni-paolo-maggini-in-brescia-on-undated",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Paolo-Maggini-Brescia-undated-violin-sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-paolo-maggini-in-brescia-on-undated",
    "title": "Violin by Giovanni Paolo Maggini, Brescia, undated"
  },
  {
    "key": "ingles-violin-by-giovanni-rota-in-cremona-on-circa-1800",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Rota-Cremona-c1800-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-rota-in-cremona-on-circa-1800",
    "title": "Violin by Giovanni Rota, 1800"
  },
  {
    "key": "ingles-violin-by-giovanni-tononi-in-bologna-on-1704",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Tononi-Bologna-1704-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-tononi-in-bologna-on-1704",
    "title": "Violin by Giovanni Tononi, 1704"
  },
  {
    "key": "ingles-violin-by-giovanni-tononi-in-bologna-on-circa-1690",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giovanni-Tononi-Bologna-c1690-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giovanni-tononi-in-bologna-on-circa-1690",
    "title": "Violin by Giovanni Tononi, 1690"
  },
  {
    "key": "ingles-violin-by-girolamo-amati-ii-in-cremona-on-1693",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Girolamo-Amati-II-Cremona-1693-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-girolamo-amati-ii-in-cremona-on-1693",
    "title": "Violin by Girolamo Amati II | Amati Violin"
  },
  {
    "key": "ingles-violin-by-girolamo-amati-ii-in-cremona-on-1693-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Girolamo-Amati-II-Cremona-1693-violin-2-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-girolamo-amati-ii-in-cremona-on-1693-2",
    "title": "Violin by Girolamo Amati II, 1693 | Amati"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1800",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Antonio-Gagliano-Naples-c1800-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1800",
    "title": "Violin by Giuseppe & Antonio Gagliano, Circa 1800"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1800-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Antonio-Gagliano-Naples-c1800-violin-2-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1800-2",
    "title": "Violin by Giuseppe and Antonio Gagliano, 1800"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1805",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Antonio-Gagliano-Naples-c1805-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-gagliano-in-naples-on-circa-1805",
    "title": "Violin by Giuseppe and Antonio Gagliano, 1805"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-rocca-in-genoa-on-1854",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Rocca-Genoa-1846-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-rocca-in-genoa-on-1854",
    "title": "Violin by Giuseppe Antonio Rocca, 1854"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-rocca-in-turin-on-1847",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Rocca-Genoa-1847-violin-sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-rocca-in-turin-on-1847",
    "title": "Violin by Giuseppe Antonio Rocca, 1847"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-rocca-in-turin-on-1850",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Rocca-Genoa-1850-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-rocca-in-turin-on-1850",
    "title": "Violin by Giuseppe Antonio Rocca, 1850"
  },
  {
    "key": "ingles-violin-by-giuseppe-antonio-rocca-in-turin-on-1852",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Rocca-Genoa-1852-violin-4C-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-antonio-rocca-in-turin-on-1852",
    "title": "Violin by Giuseppe Antonio Rocca, 1852"
  },
  {
    "key": "ingles-violin-by-giuseppe-ceruti-in-cremona-on-circa-1820",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Ceruti-c1820-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-ceruti-in-cremona-on-circa-1820",
    "title": "Violin by Giuseppe Ceruti | Ceruti Violin"
  },
  {
    "key": "ingles-violin-by-giuseppe-gagliano-in-naples-on-1784",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Gagliano-Naples-1784-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-gagliano-in-naples-on-1784",
    "title": "Violin by Giuseppe Gagliano, 1784"
  },
  {
    "key": "ingles-violin-by-giuseppe-gagliano-in-naples-on-circa-1775",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Gagliano-Naples-c1775-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-gagliano-in-naples-on-circa-1775",
    "title": "Violin by Giuseppe Gagliano, Circa 1775, Naples"
  },
  {
    "key": "ingles-violin-by-giuseppe-gagliano-in-naples-on-circa-1780",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Gagliano-Naples-c1780-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-gagliano-in-naples-on-circa-1780",
    "title": "Guiseppe Gagliano Violin, Circa 1780, Naples"
  },
  {
    "key": "ingles-violin-by-giuseppe-guadagnini-in-como-on-circa-1785",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guadagnini-Pavia-c1785-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guadagnini-in-como-on-circa-1785",
    "title": "Giuseppe Guadagnini Violin, Circa 1785, Como"
  },
  {
    "key": "ingles-violin-by-giuseppe-guadagnini-in-pavia-on-circa-1780",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guadagnini-Pavia-c1780-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guadagnini-in-pavia-on-circa-1780",
    "title": "Violin by Giuseppe Guadagnini, 1780"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1736",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guarneri-del-Gesu-Cremona-1736-violin-Ex-Pollitzer-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1736",
    "title": "Violin by Giuseppe Guarneri del Gesu, 1736"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1739",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guarneri-del-gesu-Cremona-1739-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1739",
    "title": "Ex-Menuhin; ex-Ebersholt violin by Guarneri del Gesu, 1739"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1741",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guarneri-del-gesu-Cremona-1741-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1741",
    "title": "Ex-Duvette; ex-Doublday violin by Guarneri del Gesu, 1741"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1743",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guarneri-del-Gesu-Cremona-1743-violin-Baron-Heath-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1743",
    "title": "Violin by Guiseppe Guarneri del Gesu, Cremona, 1743"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1744",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-Guarneri-del-Gesu-Cremona-1744-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-del-gesu-in-cremona-on-1744",
    "title": "Ole Bull violin by Guarneri del Gesu, 1741"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1703",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-filius-Guarneri-Cremona-1703-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1703",
    "title": "Violin by Giuseppe Guarneri filius Andreæ, 1703"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1710",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-filius-Guarneri-Cremona-1710-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1710",
    "title": "Violin by Giuseppe Guarneri filius Andreæ, 1710"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1714",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-filius-Guarneri-Cremona-1714-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-1714",
    "title": "Violin by Giuseppe Guarneri filius Andreæ, 1714"
  },
  {
    "key": "ingles-violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-circa-1705",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Giuseppe-filius-Guarneri-Cremona-c1705-violin-Cremona-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-circa-1705",
    "title": "Violin by Giuseppe Guarneri filius Andreæ, 1705"
  },
  {
    "key": "ingles-violin-by-gregorio-antoniazzi-in-colle-on-1738",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Gregorio-Antoniazzi-Cremona-1738-viola-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-gregorio-antoniazzi-in-colle-on-1738",
    "title": "Violin by Gregorio Antoniazzi | Violin Maker"
  },
  {
    "key": "ingles-violin-by-jacob-stainer-in-absam-on-1662",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jacob-Stainer-Absam-1662-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jacob-stainer-in-absam-on-1662",
    "title": "Violin by Jacob Stainer, 1662"
  },
  {
    "key": "ingles-violin-by-jacob-stainer-in-absam-on-1668",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jacob-Stainer-Absam-1668-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jacob-stainer-in-absam-on-1668",
    "title": "Violin by Jacob Stainer, 1668"
  },
  {
    "key": "ingles-violin-by-jacob-stainer-in-absam-on-circa-1660",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jacob-Stainer-Absam-c1660-violin-4C-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jacob-stainer-in-absam-on-circa-1660",
    "title": "Violin by Jacob Stainer, circa 1660"
  },
  {
    "key": "ingles-violin-by-jacob-stainer-in-absam-on-circa-1670",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jacob-Stainer-Absam-c1670-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jacob-stainer-in-absam-on-circa-1670",
    "title": "Violin by Jacob Stainer, 1670"
  },
  {
    "key": "ingles-violin-by-jean-baptiste-vuiilaume-in-paris-on-1848",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jean-Baptiste-Vuillaume-Paris-1848-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jean-baptiste-vuiilaume-in-paris-on-1848",
    "title": "Jean Baptiste Vuillaume Violin, Paris 1848"
  },
  {
    "key": "ingles-violin-by-jean-baptiste-vuiilaume-in-paris-on-1862",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Jean-Baptiste-Vuillaume-Paris-1862-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-jean-baptiste-vuiilaume-in-paris-on-1862",
    "title": "Jean Baptiste Vuillaume Violin, Paris 1862"
  },
  {
    "key": "ingles-violin-by-lorenzo-tomaso-carcassi-in-florence-on-circa-1760",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Lorenzo-Tomaso-Carcassi-Florence-c1760-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-lorenzo-tomaso-carcassi-in-florence-on-circa-1760",
    "title": "Lorenzo & Tomaso Carcassi Violin 1760"
  },
  {
    "key": "ingles-violin-by-lorenzo-ventapane-in-naples-on-circa-1810",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Lorenzo-Ventapane-Naples-c1810-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-lorenzo-ventapane-in-naples-on-circa-1810",
    "title": "Violin by Lorenzo Ventapane, circa 1810"
  },
  {
    "key": "ingles-violin-by-lorenzo-ventapane-in-naples-on-circa-1820",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Lorenzo-Ventapane-Naples-c1820-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-lorenzo-ventapane-in-naples-on-circa-1820",
    "title": "Violin by Lorenzo Ventapane, circa 1820"
  },
  {
    "key": "ingles-violin-by-matteo-goffriller-in-venice-on-1703",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Matteo-Goffriller-Venice-1703-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-matteo-goffriller-in-venice-on-1703",
    "title": "Matteo Goffriller Violin, Venice 1703"
  },
  {
    "key": "ingles-violin-by-michele-deconet-in-venice-on-circa-1760",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Michele-Deconet-Venice-c1760-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-michele-deconet-in-venice-on-circa-1760",
    "title": "Violin by Michele Deconet, 1760"
  },
  {
    "key": "ingles-violin-by-nicola-marchioni-in-bologna-on-circa-1720",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicola-Marchioni-Bologna-c1720-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicola-marchioni-in-bologna-on-circa-1720",
    "title": "Violin by Nicola Marchioni, 1720"
  },
  {
    "key": "ingles-violin-by-nicola-marchioni-in-bologna-on-circa-1730",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicola-Marchioni-Bologna-c1730-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicola-marchioni-in-bologna-on-circa-1730",
    "title": "Violin by Nicola Marchioni, 1730"
  },
  {
    "key": "ingles-violin-by-nicolas-lupot-in-paris-on-1805",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolas-Lupot-Paris-1805-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolas-lupot-in-paris-on-1805",
    "title": "Violin by Nicolas Lupot, 1805"
  },
  {
    "key": "ingles-violin-by-nicolas-lupot-in-paris-on-1810",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/05/12988_Back.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolas-lupot-in-paris-on-1810",
    "title": "Violin by Nicolas Lupot, 1810"
  },
  {
    "key": "ingles-violin-by-nicolo-amati-in-cremona-on-1665",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Amati-Cremona-1665-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-amati-in-cremona-on-1665",
    "title": "Nicolo Amati Violin Cremona 1665 | Luthier"
  },
  {
    "key": "ingles-violin-by-nicolo-amati-in-cremona-on-1680",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Amati-Cremona-1680-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-amati-in-cremona-on-1680",
    "title": "Violin by Nicolo Amati | Amati Violin"
  },
  {
    "key": "ingles-violin-by-nicolo-amati-in-cremona-on-circa-1635",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Amati-Cremona-c1635-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-amati-in-cremona-on-circa-1635",
    "title": "Nicolo Amati Violin Cremona 1635 | Luthier"
  },
  {
    "key": "ingles-violin-by-nicolo-amati-in-cremona-on-circa-1645",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Amati-Cremona-c1645-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-amati-in-cremona-on-circa-1645",
    "title": "Nicolo Amati Violin Cremona 1645 | Luthier"
  },
  {
    "key": "ingles-violin-by-nicolo-gagliano-in-naples-on-1771",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Gagliano-Naples-1771-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-gagliano-in-naples-on-1771",
    "title": "Nicolo Gagliano Violin, Naples 1771"
  },
  {
    "key": "ingles-violin-by-nicolo-gagliano-in-naples-on-1780",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Gagliano-Naples-1780-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-gagliano-in-naples-on-1780",
    "title": "Violin by Nicolo Gagliano, 1780"
  },
  {
    "key": "ingles-violin-by-nicolo-gagliano-in-naples-on-circa-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Nicolo-Gagliano-Naples-c1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-nicolo-gagliano-in-naples-on-circa-1770",
    "title": "Violin by Nicolo Gagliano, 1770"
  },
  {
    "key": "ingles-violin-by-omobono-stradivari-in-cremona-on-1732",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Omobono-Stradivari-Cremona-1732-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-omobono-stradivari-in-cremona-on-1732",
    "title": "Violin by Omobono Stradivari, 1732"
  },
  {
    "key": "ingles-violin-by-paolo-castello-in-genoa-on-1765",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Paolo-Castello-Genoa-c1765-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-paolo-castello-in-genoa-on-1765",
    "title": "Paolo Castello Violin, 1765 | Expert Luthier"
  },
  {
    "key": "ingles-violin-by-paolo-castello-in-genoa-on-circa-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Paolo-Castello-Genoa-c1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-paolo-castello-in-genoa-on-circa-1770",
    "title": "Violin by Paolo Castello | Violin Maker"
  },
  {
    "key": "ingles-violin-by-pietro-antonio-landolfi-in-milan-on-1761",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Pietro-Antonio-Landolfi-Milan-1761-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-pietro-antonio-landolfi-in-milan-on-1761",
    "title": "Violin by Pietro Antonio Landolfi, 1761"
  },
  {
    "key": "ingles-violin-by-pietro-giovanni-guarneri-of-mantua-in-mantua-on-1704",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Pietro-Guarneri-of-Mantua-Mantua-1704-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-pietro-giovanni-guarneri-of-mantua-in-mantua-on-1704",
    "title": "Violin by Pietro Giovanni Guarneri, 1704"
  },
  {
    "key": "ingles-violin-by-pietro-giovanni-mantegazza-in-milan-on-circa-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Pietro-Giovanni-Mantegazza-Milan-c1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-pietro-giovanni-mantegazza-in-milan-on-circa-1770",
    "title": "Violin by Pietro Giovanni Mantegazza, 1770"
  },
  {
    "key": "ingles-violin-by-pietro-guarneri-of-venice-in-venice-on-circa-1745",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Pietro-Guarneri-of-Venice-Venice-c1745-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-pietro-guarneri-of-venice-in-venice-on-circa-1745",
    "title": "Violin by Pietro Guarneri, 1745"
  },
  {
    "key": "ingles-violin-by-pietro-guarneri-of-venice-in-venice-on-circa-1750",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Pietro-Guarneri-of-Venice-Venice-c1750-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-pietro-guarneri-of-venice-in-venice-on-circa-1750",
    "title": "Violin by Pietro Guarneri, 1750"
  },
  {
    "key": "ingles-violin-by-santo-serafin-in-venice-on-1739",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Santo-Seraphin-Udine-1739-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-santo-serafin-in-venice-on-1739",
    "title": "Violin by Santo Serafin, 1739"
  },
  {
    "key": "ingles-violin-by-santo-serafin-in-venice-on-1740",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Santo-Seraphin-Venice-c1740-violin-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-santo-serafin-in-venice-on-1740",
    "title": "Violin by Santo Serafin, 1740"
  },
  {
    "key": "ingles-violin-by-santo-serafin-in-venice-on-circa-1735",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Santo-Seraphin-Venice-c1735-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-santo-serafin-in-venice-on-circa-1735",
    "title": "Violin by Santo Serafin, circa 1735"
  },
  {
    "key": "ingles-violin-by-spirito-sorsana-in-cuneo-on-1725",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Spirito-Sorsana-Cuneo-c1725-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-spirito-sorsana-in-cuneo-on-1725",
    "title": "Violin by Spirito Sorsana, 1725"
  },
  {
    "key": "ingles-violin-by-spirito-sorsana-in-cuneo-on-1733",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Spirito-Sorsana-Cuneo-1733-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-spirito-sorsana-in-cuneo-on-1733",
    "title": "Violin by Spirito Sorsana, 1733"
  },
  {
    "key": "ingles-violin-by-stefano-scarampella-in-mantua-on-circa-1905",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Stefano-Scarampella-Mantua-c1905-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-stefano-scarampella-in-mantua-on-circa-1905",
    "title": "Violin By Stefano Scarampella, Circa 1905, Mantua"
  },
  {
    "key": "ingles-violin-by-tomaso-eberle-in-naples-on-circa-1770",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Tomaso-Eberle-Naples-c1770-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-tomaso-eberle-in-naples-on-circa-1770",
    "title": "Violin by Tomaso Eberle, 1770"
  },
  {
    "key": "ingles-violin-by-tomasso-balestrieri-in-mantua-on-1767",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Tomasso-Balestrieri-Mantua-c1767-violin-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-tomasso-balestrieri-in-mantua-on-1767",
    "title": "Violin by Tomasso Balestrieri, Mantua Violin circa 1767"
  },
  {
    "key": "ingles-violin-by-tomasso-balestrieri-in-mantua-on-circa-1760",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Tomasso-Balestrieri-Mantua-c1760-violin-2-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-tomasso-balestrieri-in-mantua-on-circa-1760",
    "title": "Tomasso Balestrieri Mantua Violin 1760"
  },
  {
    "key": "ingles-violin-by-tomasso-balestrieri-in-mantua-on-circa-1760-2",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Tomasso-Balestrieri-Mantua-c1760-violin-3-Sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-tomasso-balestrieri-in-mantua-on-circa-1760-2",
    "title": "Tomasso Balestrieri, Mantua Violin circa 1760"
  },
  {
    "key": "ingles-violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1790",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/05/13000_Back.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1790",
    "title": "Violin by Vincenzo Trusiano Panormo, 1790"
  },
  {
    "key": "ingles-violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1800",
    "image": "https://ingleshayday.com/wp-content/uploads/2019/05/13001_Back.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1800",
    "title": "Violin by Vincenzo Trusiano Panormo, 1800"
  },
  {
    "key": "ingles-violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1805",
    "image": "https://ingleshayday.com/wp-content/uploads/2018/09/Vincenzo-Panormo-London-c1805-violin-sothebys-b-800x1900.jpg",
    "url": "https://ingleshayday.com/notable-sales-instrument/violin-by-vincenzo-trusiano-panormo-in-london-on-circa-1805",
    "title": "Violin by Vincenzo Trusiano Panormo, 1805"
  }
].map(({ key, image, url, title }) => directBack(key, image, url, title));

const corilonFineBacks = [
  {
    "key": "corilon-officina-mauro-lucini-cremona-1",
    "image": "https://www.corilon.com/media/image/7a/31/0d/officina-mauro-lucini-n68-7684-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/officina-mauro-lucini-cremona-1",
    "title": "Cremona violin, Officina Mauro Lucini no.68 (certificate) - oil varnish"
  },
  {
    "key": "corilon-valerio-ferron-cremona",
    "image": "https://www.corilon.com/media/image/42/d4/6c/valerio-ferron-cremona-a280-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/valerio-ferron-cremona",
    "title": "Valerio Ferron, Italian violin from Cremona, 2020 (original certificate)"
  },
  {
    "key": "corilon-oskar-guetter-markneukirchen-violin",
    "image": "https://www.corilon.com/media/image/2f/2a/c0/oskar-guetter-markneukirchen-a237-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/german-violins/oskar-guetter-markneukirchen-violin",
    "title": "German master violin by Oskar Gutter, Markneukirchen"
  },
  {
    "key": "corilon-officina-mauro-lucini-cremona-2",
    "image": "https://www.corilon.com/media/image/3f/cb/d5/mauro-lucini-no81-7796-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/officina-mauro-lucini-cremona-2",
    "title": "Cremona violin no.81, Mauro Lucini (certificate)"
  },
  {
    "key": "corilon-modern-italian-violin-cremona-1972",
    "image": "https://www.corilon.com/media/image/71/86/10/hans-lisper-malung-7882-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/modern-italian-violin-cremona-1972",
    "title": "Professional master violin, Hans Lisper, Malung 1990"
  },
  {
    "key": "corilon-marsino-bran-roveredo",
    "image": "https://www.corilon.com/media/image/c4/fa/78/marsino-bran-7621-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/marsino-bran-roveredo",
    "title": "Italian violin by Marsino Bran, 1946 (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-officina-claudio-monteverde-cremona-1923-italian-violin",
    "image": "https://www.corilon.com/media/image/81/f4/32/italian-7670-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/officina-claudio-monteverde-cremona-1923-italian-violin",
    "title": "Old Italian violin, Cremona - Officina Claudio Monteverde (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-mario-gadda-violin-after-scarampella",
    "image": "https://www.corilon.com/media/image/12/88/37/mario-gadda-7693-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/mario-gadda-violin-after-scarampella",
    "title": "Italian violin by Mario Gadda, 1980 (certificate by Mario Gadda)"
  },
  {
    "key": "corilon-fine-violin-mittenwald-sebastian-klotz-circle",
    "image": "https://www.corilon.com/media/image/54/32/59/klotz-mittenwald-7779-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-violin-mittenwald-sebastian-klotz-circle",
    "title": "Fine Mittenwald violin, circa 1780 (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-officina-mauro-lucini-cremona-guarnerius",
    "image": "https://www.corilon.com/media/image/29/08/e9/mauro-lucini-n88-7791-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/officina-mauro-lucini-cremona-guarnerius",
    "title": "Italian violin, Mauro Lucini Cremona - No. 88"
  },
  {
    "key": "corilon-18th-century-mittenwald-violin",
    "image": "https://www.corilon.com/media/image/46/58/43/mittenwald-18thcentury-7986-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/18th-century-mittenwald-violin",
    "title": "Fine, late 18th century Mittenwald violin (circa 1780 - 1800)"
  },
  {
    "key": "corilon-fine-french-violin-daniel-moinel-paris",
    "image": "https://www.corilon.com/media/image/c6/11/b7/daniel-moinel-paris-7899-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-french-violin-daniel-moinel-paris",
    "title": "Fine French master violin by Daniel Moinel, Paris 1956"
  },
  {
    "key": "corilon-william-ebsworth-hill",
    "image": "https://www.corilon.com/media/image/7a/11/ec/english-hill-6999-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/william-ebsworth-hill",
    "title": "Fine English violin, circa 1800"
  },
  {
    "key": "corilon-venturi-violin",
    "image": "https://www.corilon.com/media/image/29/28/0e/marco-venturin-italian-7034-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/venturi-violin",
    "title": "Italian violin by Marco Venturi (2022)"
  },
  {
    "key": "corilon-italian-violin-romedio-muncher-cremona",
    "image": "https://www.corilon.com/media/image/5e/3b/64/romedio-muncher-cremona-7825-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-romedio-muncher-cremona",
    "title": "Italian violin by Romedio Muncher, Cremona 1923 (certificate Eric Blot)"
  },
  {
    "key": "corilon-historic-master-violin-from-the-vogtland-region-circa-1800",
    "image": "https://www.corilon.com/media/image/7b/7c/2c/vogtland-master-7769-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/german-violins/historic-master-violin-from-the-vogtland-region-circa-1800",
    "title": "Historic master violin from the Vogtland region, circa 1800"
  },
  {
    "key": "corilon-fine-french-violin-after-guarnerius",
    "image": "https://www.corilon.com/media/image/b6/1c/cc/french-c1800-7877-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-french-violin-after-guarnerius",
    "title": "Fine French master violin from around 1800 (certificate)"
  },
  {
    "key": "corilon-mauro-lucini-cremona-italian-violin",
    "image": "https://www.corilon.com/media/image/89/05/27/mauro-lucini-cremona-n122-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/mauro-lucini-cremona-italian-violin",
    "title": "Mauro Lucini Cremona, Italian violin after Stradivari No.122 (certificate)"
  },
  {
    "key": "corilon-fine-german-master-violin",
    "image": "https://www.corilon.com/media/image/2c/bd/e7/max-schlesinger-dresden-a264-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-german-master-violin",
    "title": "Antique German master violin, Max Schlesinger Dresden 1913"
  },
  {
    "key": "corilon-modern-italian-violin-cremonese",
    "image": "https://www.corilon.com/media/image/18/2f/73/massimo-ardoli-cremona-a279-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/modern-italian-violin-cremonese",
    "title": "Modern Italian violin from Cremona, Massimo Ardoli (original certificate)"
  },
  {
    "key": "corilon-young-violin-italy",
    "image": "https://www.corilon.com/media/image/9c/62/56/guido-zozzi-forli-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/young-violin-italy",
    "title": "Italian violin, Guido Zozzi Forli 1981 (certificate)"
  },
  {
    "key": "corilon-rare-violin-nicolas-mauchant-vaudel",
    "image": "https://www.corilon.com/media/image/b5/8b/95/mauchant-7139-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/rare-violin-nicolas-mauchant-vaudel",
    "title": "Fine French violin by Nicolas Mauchant-Vaudel, circa 1820 - professional"
  },
  {
    "key": "corilon-cremona-romedio-muncher",
    "image": "https://www.corilon.com/media/image/4c/1b/51/romedio-muncher-cremona-7228-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/cremona-violins/cremona-romedio-muncher",
    "title": "Petite Italian violin by Romedio Muncher, Cremona 1924 (35.2 cm)"
  },
  {
    "key": "corilon-italian-violin-puglisi-catania",
    "image": "https://www.corilon.com/media/image/99/4b/42/michelangelo-puglisi-7865-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-puglisi-catania",
    "title": "Old Italian violin, Michelangelo Puglisi Catania 1919"
  },
  {
    "key": "corilon-french-violin-georges-apparut",
    "image": "https://www.corilon.com/media/image/57/8f/83/georges-apparut-7433-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violin-georges-apparut",
    "title": "Fine French Georges Apparut violin, 1935 - Guarnerius"
  },
  {
    "key": "corilon-didier-nicolas-aine-french-violin-approx-1935",
    "image": "https://www.corilon.com/media/image/f4/a6/66/didier-nicolas-7788-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/didier-nicolas-aine-french-violin-approx-1935",
    "title": "Didier Nicolas (L'Aine), violin, Mirecourt 1820-1830 (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-tonino-boga-torino",
    "image": "https://www.corilon.com/media/image/32/12/23/tonino-boga-torino-7852-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/tonino-boga-torino",
    "title": "Italian violin. Tonino Boga, Turin 2011 (certificate by Tonino Boga)"
  },
  {
    "key": "corilon-monzino-figli-milano-italian-violin",
    "image": "https://www.corilon.com/media/image/65/34/f7/monzino-antoniazzi-milano-a242-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/monzino-figli-milano-italian-violin",
    "title": "Italian violin, Monzino & Figli Milano - Antoniazzi circle (certificate: Hieronymus Kostler)"
  },
  {
    "key": "corilon-kurt-guetter-markneukirchen-violin",
    "image": "https://www.corilon.com/media/image/93/e4/49/kurt-guetter-markneukirchen-7695-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/german-violins/kurt-guetter-markneukirchen-violin",
    "title": "German master violin by Kurt Gutter, Markneukirchen 1973"
  },
  {
    "key": "corilon-victor-audinot-paris",
    "image": "https://www.corilon.com/media/image/2a/b8/86/victor-audinot-mourot-7302-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/victor-audinot-paris",
    "title": "French violin by Victor Audinot, Paris 1927 (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-giuseppe-gagliano-violin-1760",
    "image": "https://www.corilon.com/media/image/e1/91/fd/giuseppe-gagliano_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/giuseppe-gagliano-violin-1760",
    "title": "Giuseppe Gagliano: a fine Italian violin c.178x (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-selectio-opus17-masterviolin",
    "image": "https://www.corilon.com/media/image/19/ae/73/opus17-7022-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/selectio-opus17-masterviolin",
    "title": "Master violin op.17"
  },
  {
    "key": "corilon-fine-french-violin-circa-1750",
    "image": "https://www.corilon.com/media/image/ec/c8/b5/french-1750-7781-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-french-violin-circa-1750",
    "title": "Fine French violin made around 1750"
  },
  {
    "key": "corilon-joseph-charotte-mirecourt",
    "image": "https://www.corilon.com/media/image/16/ed/d9/joseph-charotte-7783-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/joseph-charotte-mirecourt",
    "title": "Historic French violin. Joseph Charotte c.1820 (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-18th-century-vogtland-violin",
    "image": "https://www.corilon.com/media/image/a9/d3/0d/vogtland-7810-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/18th-century-vogtland-violin",
    "title": "18th century Vogtland master violin, Markneukirchen approx. 1800"
  },
  {
    "key": "corilon-mauro-lucini-master-violin",
    "image": "https://www.corilon.com/media/image/b9/6e/34/mauro-lucini-no32-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/mauro-lucini-master-violin",
    "title": "Mauro Lucini, Cremona No. 32 - Italian violin from Cremona (certificate)"
  },
  {
    "key": "corilon-italian-violin-20th-century",
    "image": "https://www.corilon.com/media/image/37/2f/fe/luciano-longo-7087-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-20th-century",
    "title": "Italian violin: Luciano Longo (certificate)"
  },
  {
    "key": "corilon-alceste-bulfari-cremona",
    "image": "https://www.corilon.com/media/image/de/f5/08/alceste-bulfair-cremona-a268-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/cremona-violins/alceste-bulfari-cremona",
    "title": "Cremonese violin, Alceste Bulfari Cremona 2013 - rich warm sound"
  },
  {
    "key": "corilon-antique-markneukirchen-master-violin-c1800",
    "image": "https://www.corilon.com/media/image/bb/0d/5f/saxon-masterpiece-1850-7224-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/antique-markneukirchen-master-violin-c1800",
    "title": "Fine antique German violin from Markneukirchen, c.1830/1840"
  },
  {
    "key": "corilon-fine-violin-louis-collenot",
    "image": "https://www.corilon.com/media/image/60/1a/2b/louis-collenot-7745-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-violin-louis-collenot",
    "title": "Fine French violin by Louis Collenot, 1905 (certificate by B. Sabatier)"
  },
  {
    "key": "corilon-contemporary-cremona-violin",
    "image": "https://www.corilon.com/media/image/ca/be/fc/alberto-medaglia-lodi-7052-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/contemporary-cremona-violin",
    "title": "Italian violin: Alberto Medaglia, Lodi 1986 (certificate Corilon)"
  },
  {
    "key": "corilon-master-violin-robert-reinert-chaux-de-fonds",
    "image": "https://www.corilon.com/media/image/4f/3f/df/robert-reinert-6991-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/master-violin-robert-reinert-chaux-de-fonds",
    "title": "Swiss master violin by Robert Reinert, Chaux-de-fonds"
  },
  {
    "key": "corilon-jean-baptiste-lemarquis-1780",
    "image": "https://www.corilon.com/media/image/0b/f6/34/jean-baptiste-lemarquis-7784-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/jean-baptiste-lemarquis-1780",
    "title": "Jean-Baptiste Lemarquis, antique French violin circa 1780 (certificate by J.-J. Rampal)"
  },
  {
    "key": "corilon-italian-violin-cremona-officina-claudio-monteverde",
    "image": "https://www.corilon.com/media/image/95/89/91/officina-claudio-monteverde-cremona-7282-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-cremona-officina-claudio-monteverde",
    "title": "Italian violin, Officina Claudio Monteverde, Cremona 1923"
  },
  {
    "key": "corilon-french-violin-by-jean-baptiste-grand-gerard",
    "image": "https://www.corilon.com/media/image/f3/29/d3/jean-baptiste-grand-gerard-7782-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violin-by-jean-baptiste-grand-gerard",
    "title": "Jean-Baptiste Grand-Gerard, French violin, circa 1770 (certificate by J.-J. Rampal)"
  },
  {
    "key": "corilon-claude-chevrier-violin-mirecourt",
    "image": "https://www.corilon.com/media/image/db/fa/3d/claude-chevirier-7586-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/claude-chevrier-violin-mirecourt",
    "title": "Antique French violin: Claude Chevrier around 1860 (Certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-gennaro-russo-taranto",
    "image": "https://www.corilon.com/media/image/fe/ec/13/russo-7718-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italien-violins/gennaro-russo-taranto",
    "title": "Italian violin by Gennaro Russo, Taranto 2006"
  },
  {
    "key": "corilon-fine-18th-century-mittenwald-violin-klotz-circle",
    "image": "https://www.corilon.com/media/image/7e/4f/d5/mittenwald-jais-7137-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-18th-century-mittenwald-violin-klotz-circle",
    "title": "Fine 18th century violin, approx.1800 (certificate Hiernymus Kostler)"
  },
  {
    "key": "corilon-old-italian-violin-naples",
    "image": "https://www.corilon.com/media/image/55/cd/54/italian-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/old-italian-violin-naples",
    "title": "Old Italian violin, 1976"
  },
  {
    "key": "corilon-johann-georg-schonfelder-markneukirchen-violin",
    "image": "https://www.corilon.com/media/image/6b/25/67/johann-georg-schonfelder-markneukirchen-a189-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/johann-georg-schonfelder-markneukirchen-violin",
    "title": "Johann Georg Schonfelder: fine Markneukirchen violin, 1806"
  },
  {
    "key": "corilon-aegidius-klotz-violin-mittenwald",
    "image": "https://www.corilon.com/media/image/1f/80/4a/aegidius-klotz-mittenwald-7146-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/aegidius-klotz-violin-mittenwald",
    "title": "Aegidius Klotz, 1775: Fine violin from Mittenwald (Certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-tomas-pilar-hradec-kralove",
    "image": "https://www.corilon.com/media/image/9a/3c/37/tomas-pilar-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/tomas-pilar-hradec-kralove",
    "title": "Tomas Pilar, 1983: professional violin, masterpiece (Certificate)"
  },
  {
    "key": "corilon-contemporary-italian-violin",
    "image": "https://www.corilon.com/media/image/86/69/9f/tullio-berti-6789-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/contemporary-italian-violin",
    "title": "Italian violin by Tullio Berti, 1978 (certificate Corilon)"
  },
  {
    "key": "corilon-italian-violin-schio",
    "image": "https://www.corilon.com/media/image/72/88/3a/edo-sartori-schio-7681-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/italian-violin-schio",
    "title": "Italian violin by Edo Sartori - Schio, 2016"
  },
  {
    "key": "corilon-monzino-garlandini-milano",
    "image": "https://www.corilon.com/media/image/a9/g0/e5/monzino-garlandini-milano-7587-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/monzino-garlandini-milano",
    "title": "A. Monzino & Garlandini, Milan - Italian violin, circa 1900"
  },
  {
    "key": "corilon-interesting-master-violin-1850",
    "image": "https://www.corilon.com/media/image/77/23/59/markneukirchen-7644-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/interesting-master-violin-1850",
    "title": "Interesting antique master violin, circa 1850 - Germany, Markneukirchen"
  },
  {
    "key": "corilon-ernst-heinrich-roth-master-violin-guarnerius",
    "image": "https://www.corilon.com/media/image/65/91/e8/ernst-heinrich-roth-7226-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/ernst-heinrich-roth-master-violin-guarnerius",
    "title": "Ernst Heinrich Roth, Markneukirchen circa 1917: rare master violin"
  },
  {
    "key": "corilon-sergio-antonelli",
    "image": "https://www.corilon.com/media/image/98/7a/c4/sergio-antonelli-mantova-7070-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/sergio-antonelli",
    "title": "Italian violin, Sergio Antonelli, Mantova 1998 (certificate)"
  },
  {
    "key": "corilon-emidio-pignotti",
    "image": "https://www.corilon.com/media/image/ca/1d/a3/emidio-pignotti-italy-7557-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/emidio-pignotti",
    "title": "Italian violin: Emidio Pignotti, 2018 (certificate E. Pignotti)"
  },
  {
    "key": "corilon-contemporary-italian-cremona-violin",
    "image": "https://www.corilon.com/media/image/9b/1a/0d/luca-branchetti-pistoia-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/contemporary-italian-cremona-violin",
    "title": "Italian violin: Luca Branchetti, Pistoia 2018 (certificate)"
  },
  {
    "key": "corilon-fine-italian-violin-mario-gadda",
    "image": "https://www.corilon.com/media/image/3d/12/14/mario-gadda-1972-7680-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-italian-violin-mario-gadda",
    "title": "Fine Italian violin by Mario Gadda, 1972 - soloist violin (certificate by Mario Gadda)"
  },
  {
    "key": "corilon-cremona-violin-luigi-aquilino",
    "image": "https://www.corilon.com/media/image/31/6a/ce/luigi-aquilino-cremona-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/cremona-violin-luigi-aquilino",
    "title": "New Cremona violin by Luigi Aquilino (original certificate)"
  },
  {
    "key": "corilon-nicolo-gagliano-violin-1762",
    "image": "https://www.corilon.com/media/image/b4/13/cf/nicolo-gagliano_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/nicolo-gagliano-violin-1762",
    "title": "Nicolo Gagliano: Fine Italian violin (certificate by J. & A. Beare)"
  },
  {
    "key": "corilon-gennaro-russo",
    "image": "https://www.corilon.com/media/image/fa/d7/82/gennaro-russo-7677-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italien-violins/gennaro-russo",
    "title": "Italian violin by Gennaro Russo"
  },
  {
    "key": "corilon-1970",
    "image": "https://www.corilon.com/media/image/c7/d1/8c/pietro-campanale-7672-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/1970",
    "title": "Italian violin by Pietro Paolo Campanale, Ruvo di Puglia 1970"
  },
  {
    "key": "corilon-ferarri-cremona-violin",
    "image": "https://www.corilon.com/media/image/ba/4b/bd/simona-ferrari-cremona-7624-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/ferarri-cremona-violin",
    "title": "Simona Ferrari, 2003: Italian violin from Cremona (certificate)"
  },
  {
    "key": "corilon-italian-violins-monzino-milan",
    "image": "https://www.corilon.com/media/image/d8/f0/c3/monzino-milano-a249-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins-monzino-milan",
    "title": "Fine Italian violin circa 1910, Antonio Monzino e figli"
  },
  {
    "key": "corilon-raffaele-calace-e-figlio-italian-violin",
    "image": "https://www.corilon.com/media/image/34/9c/4c/raffaele-calace-7083-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/raffaele-calace-e-figlio-italian-violin",
    "title": "Raffaele Calace e figlio, Napoli 1937: Italian violin (certificate Eric Blot)"
  },
  {
    "key": "corilon-giuseppe-nupieri-roma",
    "image": "https://www.corilon.com/media/image/bc/77/54/giuseppe-nupieri-roma-7557-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/giuseppe-nupieri-roma",
    "title": "Giuseppe Nupieri, Italian violin, Rome 1983 (Eric Blot certificate)"
  },
  {
    "key": "corilon-7279",
    "image": "https://www.corilon.com/media/image/b6/06/10/ghislotti-bologna-7600-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/7279",
    "title": "Italian violin, Dario Ghislotti Bologna 2019 (original certificate)"
  },
  {
    "key": "corilon-umberto-lanaro-violin",
    "image": "https://www.corilon.com/media/image/9d/db/f2/umberto-lanaro-7084-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/umberto-lanaro-violin",
    "title": "Italian violin by Umberto Lanaro, Padova 1977 (certificate Eric Blot)"
  },
  {
    "key": "corilon-justin-maucotel-antique-french-violin",
    "image": "https://www.corilon.com/media/image/79/d4/3a/michel-couturieux-7541-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/justin-maucotel-antique-french-violin",
    "title": "Justin Maucotel, French violin, circa 1820 (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-franco-italian-violin",
    "image": "https://www.corilon.com/media/image/6a/47/99/paolo-dre-torino-7546-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/franco-italian-violin",
    "title": "Franco-Italian violin with a signature, Collegno (Torino)"
  },
  {
    "key": "corilon-turin-italian-violin",
    "image": "https://www.corilon.com/media/image/28/13/g0/tonino-boga-torino-7088-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/turin-italian-violin",
    "title": "Italian violin by Tonino Boga, Turin (certificate)"
  },
  {
    "key": "corilon-gino-antonelli",
    "image": "https://www.corilon.com/media/image/1b/1e/cb/gino-antonelli-mantova-6988-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/gino-antonelli",
    "title": "Italian violin, Gino Antonelli, Mantova 1994 (certificate)"
  },
  {
    "key": "corilon-luigi-galimberti-fine-italian-violin-milano",
    "image": "https://www.corilon.com/media/image/6e/98/b7/luigi-galimberti-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/luigi-galimberti-fine-italian-violin-milano",
    "title": "Luigi Galimberti, fine Italian violin, Milano 1925 (certificate by Eric Blot)"
  },
  {
    "key": "corilon-italian-violin",
    "image": "https://www.corilon.com/media/image/3e/46/53/marco-pandozzi-7164-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/italian-violin",
    "title": "Italian violin by Marco Pandozzi"
  },
  {
    "key": "corilon-philippe-mahu-violin-paris",
    "image": "https://www.corilon.com/media/image/6f/bb/5d/philipe-mahu-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/philippe-mahu-violin-paris",
    "title": "Fine contemporary violin by Philippe Mahu, Paris 2020"
  },
  {
    "key": "corilon-paul-bailly-violin",
    "image": "https://www.corilon.com/media/image/e7/ee/e1/paul-bailly-paris-7428-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/paul-bailly-violin",
    "title": "Paul Bailly, Paris - fine French violin, 1881 - (top re-varnished)"
  },
  {
    "key": "corilon-lorenzo-locatelli-italian-violin-cremona",
    "image": "https://www.corilon.com/media/image/5e/29/fa/lorenzo-locatelli-cremona-7595-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/lorenzo-locatelli-italian-violin-cremona",
    "title": "Lorenzo Locatelli, Cremona violin 2024 (certificate Lorenzo Locatelli)"
  },
  {
    "key": "corilon-old-french-violin-mirecourt",
    "image": "https://www.corilon.com/media/image/00/ca/44/jean-larcher-7607-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/old-french-violin-mirecourt",
    "title": "Old French master violin, Jean Larcher (ex Collin-Mezin), 1927"
  },
  {
    "key": "corilon-emile-laurent-paris",
    "image": "https://www.corilon.com/media/image/90/2c/26/emile-laurent-paris-7451-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/emile-laurent-paris",
    "title": "Fine violin by Emile Laurent (fils), Paris 1928 (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-benito-tosello-1976",
    "image": "https://www.corilon.com/media/image/9a/a8/68/benito-tosello-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/benito-tosello-1976",
    "title": "Benito Tosello, Italian violin made in 1976"
  },
  {
    "key": "corilon-mittenwald-master-violin-19th-century",
    "image": "https://www.corilon.com/media/image/cb/45/51/mittenwald-1780-a201-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/mittenwald-master-violin-19th-century",
    "title": "Mittenwald master violin, c.1780 (certificate W. Fischer)"
  },
  {
    "key": "corilon-italian-baroque-violin",
    "image": "https://www.corilon.com/media/image/18/e3/12/barockgeige-sergi-massetto-7069-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-baroque-violin",
    "title": "Italian Baroque violin, Sergio Masetti 2008"
  },
  {
    "key": "corilon-mittenwald-violin-bruno-franz-paulus",
    "image": "https://www.corilon.com/media/image/72/08/ca/bruno-franz-paulus-7566-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/german-violins/mittenwald-violin-bruno-franz-paulus",
    "title": "German Master violin by Bruno Franz Paulus, Mittenwald circa 1960 - for soloists"
  },
  {
    "key": "corilon-eugen-gartner-stuttgart-violin",
    "image": "https://www.corilon.com/media/image/a8/d9/a9/eugen-gaertner-stuttgart-7551-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/eugen-gartner-stuttgart-violin",
    "title": "Eugen Gartner, Stuttgart: Professional soloist violin (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-carl-maechler-zurich",
    "image": "https://www.corilon.com/media/image/69/6e/f8/carl-maechler-zurich-7186-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/master-violins/carl-maechler-zurich",
    "title": "Fine Swiss master violin by award-winning Carl Machler, Zurich 1932 no.59"
  },
  {
    "key": "corilon-fine-french-violin-leon-victor-mougenot",
    "image": "https://www.corilon.com/media/image/51/0b/47/leon-mougenot-6209-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-french-violin-leon-victor-mougenot",
    "title": "Fine French violin by Leon Victor Mougenot, 1935 (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-modern-italian-violin-santino-masculo",
    "image": "https://www.corilon.com/media/image/02/8b/a0/santino-masculo-7079-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/modern-italian-violin-santino-masculo",
    "title": "Italian violin by Santino Masculo, 1987 (certificate S. Masculo)"
  },
  {
    "key": "corilon-georg-winterling-fine-violin",
    "image": "https://www.corilon.com/media/image/25/78/fd/georg-winterling-hamburg-7013-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/georg-winterling-fine-violin",
    "title": "Georg Winterling, a fine violin from Hamburg, 1905 (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-mario-gadda-mantova-modern-italian-violin",
    "image": "https://www.corilon.com/media/image/3b/8d/d7/mario-gadda-7141-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/mario-gadda-mantova-modern-italian-violin",
    "title": "Mario Gadda: Italian violin, 1970 - oil varnish (original certificate)"
  },
  {
    "key": "corilon-andrea-castagneri-paris",
    "image": "https://www.corilon.com/media/image/20/9a/16/andrea-castagneri-7275-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/andrea-castagneri-paris",
    "title": "Andrea Castagneri, 1742: Fine violin from professional ownership (Roger & Max Millant certificate)"
  },
  {
    "key": "corilon-gustave-villaume-french-violin-nancy",
    "image": "https://www.corilon.com/media/image/23/a9/7f/gustave-villaume-nancy-7300-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/gustave-villaume-french-violin-nancy",
    "title": "Gustave Villaume, French violin, Nancy 1929 (Certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-peter-hornsteiner-mittenwald-violin-circa-1790",
    "image": "https://www.corilon.com/media/image/4b/3b/13/peter-hornsteiner-5377-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/peter-hornsteiner-mittenwald-violin-circa-1790",
    "title": "Fine Mittenwald violin by Peter Hornsteiner, circa 1790 (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-sergio-covelli-bergamo",
    "image": "https://www.corilon.com/media/image/df/b2/b5/sergio-covelli-bergamo-7280-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/sergio-covelli-bergamo",
    "title": "Italian violin by Sergio Covelli, Bergamo 2005"
  },
  {
    "key": "corilon-palermo-violin",
    "image": "https://www.corilon.com/media/image/a3/a7/d9/graziano-palermo-7468-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/palermo-violin",
    "title": "Antonio Graziano, 1985: Italian violin from Palermo (Carlson & Neumann Cremona certificate)"
  },
  {
    "key": "corilon-constantino-celani-ascoli-piceno",
    "image": "https://www.corilon.com/media/image/80/c2/d4/constantino-celani-a221-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/constantino-celani-ascoli-piceno",
    "title": "Fine Italian violin: Constantino Celani, Ascoli Piceno (Florian Leonhard certificate)"
  },
  {
    "key": "corilon-francois-caussin-french-violin-circa-1850",
    "image": "https://www.corilon.com/media/image/8e/00/cd/francois-caussin-6483-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/francois-caussin-french-violin-circa-1850",
    "title": "Francois Caussin, magnificent French violin, Neufchateau approx. 1860"
  },
  {
    "key": "corilon-french-master-violin-mid-19th-century",
    "image": "https://www.corilon.com/media/image/58/96/cb/french-1850-7313-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-master-violin-mid-19th-century",
    "title": "Interesting French master violin, circa 1850 - Gand & Bernardel atelier label"
  },
  {
    "key": "corilon-violin-from-cremona",
    "image": "https://www.corilon.com/media/image/c7/da/30/virgilio-capellini-cremona-7424-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/violin-from-cremona",
    "title": "Cremona violin by Virgilio Capellini, 1984 (certificate Carlson & Neumann)"
  },
  {
    "key": "corilon-interesting-french-violin-paris-1827",
    "image": "https://www.corilon.com/media/image/66/af/75/rougier-7303-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/interesting-french-violin-paris-1827",
    "title": "Interesting French violin, Maurice Rougier (certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-laurent-bourlier-mirecourt-violin",
    "image": "https://www.corilon.com/media/image/42/71/33/etienne-perrin-7304-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/french-violins/laurent-bourlier-mirecourt-violin",
    "title": "Etienne Perrin, antique French violin from around 1830 (certificate J.J. Rampal)"
  },
  {
    "key": "corilon-italian-violin-primo-contavalli",
    "image": "https://www.corilon.com/media/image/4c/7d/83/primo-contavalli-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-primo-contavalli",
    "title": "Italian violin, Primo Contavalli, Imola (certificate Carlson & Neumann)"
  },
  {
    "key": "corilon-markneukirchen-soloist-violin-1940",
    "image": "https://www.corilon.com/media/image/d2/c2/ee/rudolf-schuster-graz-6695-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/markneukirchen-soloist-violin-1940",
    "title": "Austrian master violin by Rudolf Schuster, 1930's - Soloists"
  },
  {
    "key": "corilon-premsyl-otakar-spidlen-violin-prague",
    "image": "https://www.corilon.com/media/image/d1/ea/58/premsyl-otakar-spidlen-a176-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/premsyl-otakar-spidlen-violin-prague",
    "title": "Premsyl Otakar Spidlen, fine violin from Prague 1944"
  },
  {
    "key": "corilon-charles-maucotel-london",
    "image": "https://www.corilon.com/media/image/78/e1/e1/charles-maucotel-london-6800-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/charles-maucotel-london",
    "title": "Fine violin by Charles Nicolas Joseph Maucotel, London 1852 (Certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-heinrich-theodor-heberlein-jr-markneukirchen",
    "image": "https://www.corilon.com/media/image/0f/90/f9/heinrich-theodor-heberlein-jr-7285-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/master-violins/heinrich-theodor-heberlein-jr-markneukirchen",
    "title": "Fine German violin, Heinrich Th. Heberlein Jr., Markneukirchen 1937"
  },
  {
    "key": "corilon-fine-italian-master-violin-18th-century",
    "image": "https://www.corilon.com/media/image/ec/a6/a3/1489_2_venice_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-italian-master-violin-18th-century",
    "title": "Fine 18th century Italian violin (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-joseph-laurent-mast-violin-toulouse-1823",
    "image": "https://www.corilon.com/media/image/8c/e6/94/jl-mast-7289-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/joseph-laurent-mast-violin-toulouse-1823",
    "title": "Fine French violin, Joseph Laurent Mast, Toulouse, 1826 (Certificate J.-J. Rampal)"
  },
  {
    "key": "corilon-johann-ulrich-eberle-prague",
    "image": "https://www.corilon.com/media/image/e0/59/cf/johann-ulrich-eberle-a195-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/johann-ulrich-eberle-prague",
    "title": "Johann Ulrich Eberle - fine Prague violin from around 1750 (Certificate W. Zunterer)"
  },
  {
    "key": "corilon-19th-century-viennese-master-violin",
    "image": "https://www.corilon.com/media/image/3d/10/02/ferdinand-jaura-a191-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/19th-century-viennese-master-violin",
    "title": "Interesting master violin by Ferdinand Jaura, Munich 1942"
  },
  {
    "key": "corilon-leo-aschauer-mittenwald-soloist-violin",
    "image": "https://www.corilon.com/media/image/6d/a6/81/ludwig-aschauer-mittenwald-7010-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/leo-aschauer-mittenwald-soloist-violin",
    "title": "Ludwig Aschauer, Mittenwald: fine master violin for soloists, 1954"
  },
  {
    "key": "corilon-rare-violin-nicolas-mauchant",
    "image": "https://www.corilon.com/media/image/93/b1/f8/nicolas-mauchant-a193-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/rare-violin-nicolas-mauchant",
    "title": "French violin by Nicolas Mauchant-Vaudel, circa 1820 (certificate Hieronymus Kostler)"
  },
  {
    "key": "corilon-cesare-castelli-asculi-piceno",
    "image": "https://www.corilon.com/media/image/05/fd/2c/cesare-castelli-6640-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/cesare-castelli-asculi-piceno",
    "title": "Cesare Castelli, Italian violin no. 66, 1954 (certificate Eric Blot)"
  },
  {
    "key": "corilon-fine-violin-by-johannes-gaessler-mittenwald-1764",
    "image": "https://www.corilon.com/media/image/fb/6c/42/johannes-gaessler-mittenwald-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-violin-by-johannes-gaessler-mittenwald-1764",
    "title": "Fine historical Mittenwald violin by Johannes Gaßler, 1764 (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-fine-french-violin-louis-moitessier",
    "image": "https://www.corilon.com/media/image/53/44/29/louis-moitessier_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-french-violin-louis-moitessier",
    "title": "Fine antique French violin, Louis Moitessier, circa 1830 (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-ernst-heinrich-roth-fine-master-violin-after-amati",
    "image": "https://www.corilon.com/media/image/cf/d2/39/ernst-heinrich-roth-6586-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/ernst-heinrich-roth-fine-master-violin-after-amati",
    "title": "Ernst Heinrich Roth, rare master violin from the 1920's"
  },
  {
    "key": "corilon-markneukirchen-master-violin-by-theodor-berger",
    "image": "https://www.corilon.com/media/image/c1/88/fa/theodor-berger-markneukirchen_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/markneukirchen-master-violin-by-theodor-berger",
    "title": "Fine Markneukirchen master violin by Theodor Berger, 1957"
  },
  {
    "key": "corilon-sebastian-klotz-violin-circa-1750",
    "image": "https://www.corilon.com/media/image/76/96/33/sebastian-klotz_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/sebastian-klotz-violin-circa-1750",
    "title": "Sebastian Klotz: Fine Mittenwald violin dated circa 1750 (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-giulio-cesare-gigli-fine-italian-violin",
    "image": "https://www.corilon.com/media/image/dc/c7/1e/1447_2_gigli_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/giulio-cesare-gigli-fine-italian-violin",
    "title": "Giulio Cesare Gigli, fine 18th century Italian violin, approx. 1760 (certificate by Etienne Vatelot)"
  },
  {
    "key": "corilon-old-italian-violin-stefano-caponetti",
    "image": "https://www.corilon.com/media/image/0b/d1/c5/stefano-caponetto-7286-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/old-italian-violin-stefano-caponetti",
    "title": "Old Italian violin, Stefano Caponetto c.1920 (certificate)"
  },
  {
    "key": "corilon-raffaele-scalise-turin",
    "image": "https://www.corilon.com/media/image/ae/14/93/raffaele-scalise-turin-7032-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/raffaele-scalise-turin",
    "title": "Italian violin by Raffaele Scalise, Cafasse/Turin 1989"
  },
  {
    "key": "corilon-old-italian-violin-by-antonio-lechi",
    "image": "https://www.corilon.com/media/image/4e/a2/a3/antonio-lechi-cremona-6998-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/old-italian-violin-by-antonio-lechi",
    "title": "Old Italian violin by Antonio Lechi, Cremona 1923"
  },
  {
    "key": "corilon-italian-violin-bruno-piastri-1993",
    "image": "https://www.corilon.com/media/image/cd/48/c0/bruno-piastri_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-bruno-piastri-1993",
    "title": "Italian violin - Bruno Piastri, 1993"
  },
  {
    "key": "corilon-federico-mecatti-cremona-violin",
    "image": "https://www.corilon.com/media/image/4b/59/5c/federico-mecatti-cremona-6992-2a_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/federico-mecatti-cremona-violin",
    "title": "Federico Mecatti, older Italian violin from Cremona (certificate)"
  },
  {
    "key": "corilon-italian-violin-milan-1900",
    "image": "https://www.corilon.com/media/image/5d/fc/f9/italiano-milano-6791-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/italian-violin-milan-1900",
    "title": "Italian violin, Milan, c.1930 - unknown master"
  },
  {
    "key": "corilon-old-italian-violin-early-20th-century",
    "image": "https://www.corilon.com/media/image/44/4e/2d/antonio-iornini-italian_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/old-italian-violin-early-20th-century",
    "title": "Italian violin no. 89 by Antonio Iornini, circa 1940"
  },
  {
    "key": "corilon-modern-italian-violin-contemporary",
    "image": "https://www.corilon.com/media/image/2c/93/cd/lorenzo-guado-firenze-a193-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/modern-italian-violin-contemporary",
    "title": "Lorenzo Guado, Italian violin, Firenze 1996 - rich, mellow"
  },
  {
    "key": "corilon-italian-violin-luigi-lanaro",
    "image": "https://www.corilon.com/media/image/c9/be/02/1404_2_luigi_lanaro_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-luigi-lanaro",
    "title": "Luigi Lanaro, Padova, modern Italian violin, 1975 (certificate by Eric Blot)"
  },
  {
    "key": "corilon-fine-italian-violin",
    "image": "https://www.corilon.com/media/image/dd/d4/42/fine-italian-carlson-neumann_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/fine-italian-violin",
    "title": "Fine Italian violin with a certificate by Carlson & Neumann, Cremona"
  },
  {
    "key": "corilon-italian-violin-luigi-cardi-verona",
    "image": "https://www.corilon.com/media/image/4c/00/d6/1406_21449934271156_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-luigi-cardi-verona",
    "title": "19th century Italian violin by Luigi Cardi, Verona (certificate by Hieronymus Kostler)"
  },
  {
    "key": "corilon-massimo-negroni-cremona",
    "image": "https://www.corilon.com/media/image/ac/9c/00/massimo-negroni-cremona-7007-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violins/massimo-negroni-cremona",
    "title": "Massimo Negroni workshop: excellent Cremona violin anno 2000"
  },
  {
    "key": "corilon-italian-violin-from-cremona-renato-superti",
    "image": "https://www.corilon.com/media/image/11/4e/5f/renato-superti-cremona-6745-2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-from-cremona-renato-superti",
    "title": "Cremona violin by Renato Superti"
  },
  {
    "key": "corilon-italian-violin-giorgio-grisales-cremona",
    "image": "https://www.corilon.com/media/image/40/34/0b/giorgio-grisales_2_1890x1890.jpg",
    "url": "https://www.corilon.com/us/violins/italian-violin-giorgio-grisales-cremona",
    "title": "Cremona violin by Giorgio Grisales, 1993 (certificate by Giorgio Grisales)"
  }
].map(({ key, image, url, title }) => directBack(key, image, url, title));

const sharFineBacks = [
  {
    "key": "shar-12-000-00",
    "image": "https://www.sharmusic.com/cdn/shop/files/F2S5564_Violin_Back.jpg?v=1774454294",
    "url": "https://www.sharmusic.com/products/12-000-00",
    "title": "Joseph Dziaba Violin, Homer Glen, 2024"
  },
  {
    "key": "shar-miki-inokuchi-violin-toronto-2000",
    "image": "https://www.sharmusic.com/cdn/shop/files/F2S5579_Violin_Back.jpg?v=1745508561",
    "url": "https://www.sharmusic.com/products/miki-inokuchi-violin-toronto-2000",
    "title": "Miki Inokuchi Violin, Toronto, 2000"
  },
  {
    "key": "shar-tetsuo-matsuda-violin-chicago-1990",
    "image": "https://www.sharmusic.com/cdn/shop/files/F2S3363_Violin_Back.jpg?v=1774449587",
    "url": "https://www.sharmusic.com/products/tetsuo-matsuda-violin-chicago-1990",
    "title": "Tetsuo Matsuda Violin, Chicago, 1990"
  },
  {
    "key": "shar-ali-hosseini-violin-hamedan-2018",
    "image": "https://www.sharmusic.com/cdn/shop/files/F2S5572_Violin_Back.jpg?v=1774463161",
    "url": "https://www.sharmusic.com/products/ali-hosseini-violin-hamedan-2018",
    "title": "Ali Hosseini Violin, Hamedan, 2018"
  },
  {
    "key": "shar-e-h-roth-strad-violin-markneukirchen-1925",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5568_Violin_Back.jpg?v=1745511825",
    "url": "https://www.sharmusic.com/products/e-h-roth-strad-violin-markneukirchen-1925",
    "title": "E.H. Roth \"Strad\" Violin, Markneukirchen, 1925"
  },
  {
    "key": "shar-theodore-skreko-lord-wilton-violin-indianapolis-2025",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5566_Violin_Back.jpg?v=1745510159",
    "url": "https://www.sharmusic.com/products/theodore-skreko-lord-wilton-violin-indianapolis-2025",
    "title": "Theodore Skreko \"Lord Wilton\" Violin, Indianapolis, 2025"
  },
  {
    "key": "shar-paul-knorr-violin-markneukirchen-1929",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5555_Violin_Back.jpg?v=1738360730",
    "url": "https://www.sharmusic.com/products/paul-knorr-violin-markneukirchen-1929",
    "title": "Paul Knorr Violin, Markneukirchen, 1929"
  },
  {
    "key": "shar-paul-knorr-violin-markneukirchen-c-1940",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5560_Violin_Back.jpg?v=1774453203",
    "url": "https://www.sharmusic.com/products/paul-knorr-violin-markneukirchen-c-1940",
    "title": "Paul Knorr Violin, Markneukirchen, c.1940"
  },
  {
    "key": "shar-thomas-crompton-violin-indianapolis-2024",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5558_Violin_Back.jpg?v=1774454162",
    "url": "https://www.sharmusic.com/products/thomas-crompton-violin-indianapolis-2024",
    "title": "Thomas Crompton Violin, Indianapolis, 2024"
  },
  {
    "key": "shar-johann-glass-violin-leipzig-1903",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5551_Violin_Back.jpg?v=1738361287",
    "url": "https://www.sharmusic.com/products/johann-glass-violin-leipzig-1903",
    "title": "Johann Glass Violin, Leipzig, 1903"
  },
  {
    "key": "shar-e-h-roth-violin-vr-markneukirchen-1927",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5546_Violin_Back.jpg?v=1738361209",
    "url": "https://www.sharmusic.com/products/e-h-roth-violin-vr-markneukirchen-1927",
    "title": "E.H. Roth Violin, VR, Markneukirchen, 1927"
  },
  {
    "key": "shar-max-weller-co-violin-markneukirchen-c-1930",
    "image": "https://www.sharmusic.com/cdn/shop/files/F1S5341_Violin_Back.jpg?v=1741297464",
    "url": "https://www.sharmusic.com/products/max-weller-co-violin-markneukirchen-c-1930",
    "title": "Max Weller & Co. Violin, Markneukirchen, c.1930"
  },
  {
    "key": "shar-scrollavezza-zanre-g-b-guadagnini-1744-violin-parma-2013",
    "image": "https://www.sharmusic.com/cdn/shop/files/F2S5103_Violin_Back.jpg?v=1736191979",
    "url": "https://www.sharmusic.com/products/scrollavezza-zanre-g-b-guadagnini-1744-violin-parma-2013",
    "title": "Scrollavezza & Zanre \"G.B. Guadagnini 1744\" Violin, Parma, 2013"
  }
].map(({ key, image, url, title }) => directBack(key, image, url, title));

const reuningFineBacks = [
  {
    "key": "reuning-nicolo-gagliano-naples-c-1765-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2023/09/R25678_3.jpg",
    "url": "https://www.reuning.com/violins-250k-to-500k/nicolo-gagliano-naples-c-1765-violin",
    "title": "Nicolo Gagliano, Naples, c.1765"
  },
  {
    "key": "reuning-gasparo-lorenzini-piacenza-c-1780-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2024/02/R25692_3.jpg",
    "url": "https://www.reuning.com/violins-250k-to-500k/gasparo-lorenzini-piacenza-c-1780-violin",
    "title": "Gasparo Lorenzini, Piacenza, c.1780"
  },
  {
    "key": "reuning-jacob-fendt-london-c-1830-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2026/04/R25966_3.jpg",
    "url": "https://www.reuning.com/violins-priced-35k-to-75k/jacob-fendt-london-c-1830-violin",
    "title": "Jacob Fendt, London, c.1830"
  },
  {
    "key": "reuning-paolo-antonio-testore-milan-c-1750-later-head-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2026/04/R25783_3.jpg",
    "url": "https://www.reuning.com/violins-priced-75k-to-150k/paolo-antonio-testore-milan-c-1750-later-head-violin",
    "title": "Paolo Antonio Testore, Milan, c.1750"
  },
  {
    "key": "reuning-gaetano-gadda-mantua-c-1930-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2026/04/R25034_3.jpg",
    "url": "https://www.reuning.com/violins-priced-75k-to-150k/gaetano-gadda-mantua-c-1930-violin",
    "title": "Gaetano Gadda, Mantua, c.1930"
  },
  {
    "key": "reuning-carl-g-becker-chicago-1972-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2026/04/R26097_3.jpg",
    "url": "https://www.reuning.com/violins-priced-75k-to-150k/carl-g-becker-chicago-1972-violin",
    "title": "Carl G. Becker, Chicago, 1972"
  },
  {
    "key": "reuning-pierre-silvestre-lyon-1854-violin",
    "image": "https://www.reuning.com/wp-content/uploads/2026/04/R26084_3.jpg",
    "url": "https://www.reuning.com/violins-priced-75k-to-150k/pierre-silvestre-lyon-1854-violin",
    "title": "Pierre Silvestre, Lyon, 1854"
  }
].map(({ key, image, url, title }) => directBack(key, image, url, title));

// Accepted gate: every source below is a full violin-back view of a fine,
// antique, historically important, or high-end instrument. No fronts, scrolls,
// labels, diagrams, crops, corner details, or manufactured zoom variants.
const backSources = [
  directBack(
    "featured-vieuxtemps-stradivari-1710",
    "https://darntonhersh.com/wp-content/uploads/Vieuxtemps-Stradivari-back-628x1024.jpg",
    "https://darntonhersh.com/a-violin-by-antonio-stradivari/",
    "1710 ex-Vieuxtemps Stradivari"
  ),
  directBack(
    "featured-becker-sr-1940",
    "https://www.sharmusic.com/cdn/shop/files/F1S5491_Back_1000x.jpg?v=1774449692",
    "https://www.sharmusic.com/products/carl-g-becker-violin-chicago-1940",
    "1940 Carl G. Becker Sr. violin"
  ),
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
    "https://stringsmagazine.com/wp-content/uploads/2023/10/l40064back.jpg",
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
  ...inglesHaydayBacks,
  ...corilonFineBacks,
  ...sharFineBacks,
  ...reuningFineBacks,
];

// Display gate: full pale-background backs with one-piece or visually continuous flame.
const visualBackKeys = [
  "corilon-italian-violin-schio",
  "ingles-a-violin-by-w-e-hill-sons",
  "ingles-a-violin-by-roger-max-millant",
  "ingles-a-violin-by-gioffredo-cappa-2",
  "ingles-a-violin-by-george-craske-3",
  "ingles-a-violin-by-vincenzo-cavani",
  "ingles-a-violin-by-giuseppe-rocca-2",
  "ingles-a-violin-by-jean-baptiste-vuillaume-13",
  "ingles-a-violin-by-neuner-hornsteiner",
  "ingles-a-violin-by-giuseppe-pedrazzini-6",
  "ingles-a-violin-by-enrico-politi",
  "ingles-a-violin-by-giovanni-battista-gabrielli-3",
  "ingles-violin-by-domenico-montagnana-in-venice-on-1731",
  "ingles-a-violin-by-jean-baptiste-vuillaume-10",
  "ingles-a-violin-by-karel-vavra-2",
  "ingles-a-violin-by-giovanni-pistucci-2",
  "ingles-a-violin-by-armando-piccagliani",
  "ingles-a-violin-by-hilaire-darche-3",
  "ingles-a-violin-by-bernardo-calcagni",
  "ingles-a-violin-by-charles-francois-gand",
  "ingles-a-violin-by-gabriel-lembock-3",
  "shar-theodore-skreko-lord-wilton-violin-indianapolis-2025",
  "shar-scrollavezza-zanre-g-b-guadagnini-1744-violin-parma-2013",
  "reuning-nicolo-gagliano-naples-c-1765-violin",
  "reuning-gasparo-lorenzini-piacenza-c-1780-violin",
  "reuning-jacob-fendt-london-c-1830-violin",
  "reuning-paolo-antonio-testore-milan-c-1750-later-head-violin",
  "reuning-gaetano-gadda-mantua-c-1930-violin",
  "reuning-carl-g-becker-chicago-1972-violin",
  "reuning-pierre-silvestre-lyon-1854-violin",
  "corilon-markneukirchen-master-violin-by-theodor-berger",
  "corilon-fine-french-violin-daniel-moinel-paris",
  "corilon-fine-german-master-violin",
  "corilon-paul-bailly-violin",
  "corilon-joseph-laurent-mast-violin-toulouse-1823",
  "corilon-fine-french-violin-louis-moitessier",
  "corilon-william-ebsworth-hill",
  "corilon-didier-nicolas-aine-french-violin-approx-1935",
  "corilon-claude-chevrier-violin-mirecourt",
  "corilon-johann-georg-schonfelder-markneukirchen-violin",
  "corilon-monzino-garlandini-milano",
  "ingles-a-violin-by-willi-lindorfer",
  "ingles-a-violin-by-auguste-sebastien-philippe-bernardel-3",
  "ingles-a-violin-by-sesto-rocchi-3",
  "ingles-a-violin-by-jean-baptiste-vuillaume-12",
  "ingles-a-violin-by-giovanni-schwarz",
  "ingles-a-violin-by-giuseppe-antonio-gagliano-3",
  "ingles-a-violin-by-alessandro-gagliano-3",
  "ingles-a-violin-by-franz-kinberg",
  "ingles-a-violin-by-arthur-richardson",
  "ingles-a-violin-by-sesto-rocchi-6",
  "ingles-a-violin-by-sesto-rocchi-4",
  "ingles-a-violin-by-sesto-rocchi-2",
  "ingles-a-violin-by-george-pyne-2",
  "ingles-a-violin-by-sesto-rocchi",
  "ingles-a-violin-by-jean-baptiste-vuillaume-4",
  "ingles-a-violin-by-hilaire-darche-2",
  "ingles-a-violin-by-annibale-fagnola-2",
  "ingles-a-violin-by-domingos-antonio-capela",
  "ingles-a-violin-by-francois-fent",
  "ingles-a-violin-by-arthur-richardson-2",
  "ingles-a-violin-by-charles-boullangier",
  "ingles-a-violin-by-paul-serdet",
  "ingles-a-violin-by-aldo-zani-2",
  "ingles-a-violin-by-joseph-panormo-london-circa-1800",
  "ingles-a-violin-by-carlo-carletti-2",
  "ingles-violin-by-jean-baptiste-vuiilaume-in-paris-on-1862",
  "ingles-a-violin-by-jean-baptiste-vuillaume-7",
  "ingles-a-violin-by-matthew-hardie-2",
  "ingles-a-violin-by-giovanni-francesco-pressenda-3",
  "ingles-a-violin-by-giuseppe-antonio-rocca",
  "ingles-a-violin-by-albert-blanchi",
  "ingles-a-violin-by-hippolyte-chretien-silvestre-3",
  "ingles-a-violin-by-giuseppe-guarneri-del-gesu",
  "ingles-a-violin-by-nathaniel-cross",
  "ingles-violin-by-jean-baptiste-vuiilaume-in-paris-on-1848",
  "ingles-a-violin-by-john-johnson",
  "ingles-a-violin-by-jean-baptiste-vuillaume-11",
  "ingles-a-violin-by-romeo-antoniazzi-3",
  "ingles-a-violin-by-jean-baptiste-deshayes-salomon",
  "ingles-a-violin-by-george-craske-2",
  "ingles-a-violin-by-pauli-merling-2",
  "ingles-a-violin-by-paul-bailly-5",
  "ingles-a-violin-by-pierre-joseph-hel-6",
  "ingles-a-violin-by-giuseppe-dollenz-2",
  "ingles-a-violin-by-francesco-rugeri-2",
  "ingles-a-violin-by-arturo-fracassi",
  "ingles-a-violin-by-benigno-saccani",
  "ingles-a-violin-by-johannes-theodorus-cuypers-3",
  "ingles-violin-by-giuseppe-guarneri-filius-andreae-in-cremona-on-circa-1705",
  "ingles-a-violin-by-tomasso-balestrieri-2",
  "ingles-a-violin-by-piero-parravicini",
  "ingles-a-violin-by-emil-hjorth-sonner-3",
  "ingles-a-violin-by-giovanni-dollenz",
  "ingles-violin-by-giovanni-tononi-in-bologna-on-1704",
  "ingles-a-violin-by-william-luff",
  "ingles-a-violin-by-louis-guersan",
];

const onePieceTextBackKeys = [
  "ingles-a-violin-by-jean-baptiste-vuillaume-2",
  "corilon-fine-french-violin-daniel-moinel-paris",
  "corilon-fine-german-master-violin",
  "corilon-rare-violin-nicolas-mauchant-vaudel",
  "corilon-selectio-opus17-masterviolin",
  "corilon-18th-century-vogtland-violin",
  "corilon-master-violin-robert-reinert-chaux-de-fonds",
  "corilon-gennaro-russo-taranto",
  "corilon-old-italian-violin-naples",
  "corilon-italian-violin-schio",
  "corilon-gennaro-russo",
  "corilon-paul-bailly-violin",
  "corilon-benito-tosello-1976",
  "corilon-andrea-castagneri-paris",
  "corilon-laurent-bourlier-mirecourt-violin",
  "corilon-joseph-laurent-mast-violin-toulouse-1823",
  "corilon-leo-aschauer-mittenwald-soloist-violin",
  "corilon-fine-violin-by-johannes-gaessler-mittenwald-1764",
  "corilon-fine-french-violin-louis-moitessier",
  "corilon-markneukirchen-master-violin-by-theodor-berger",
  "corilon-premsyl-otakar-spidlen-violin-prague",
  "corilon-italian-violin-bruno-piastri-1993",
  "corilon-officina-mauro-lucini-cremona-guarnerius",
  "corilon-william-ebsworth-hill",
  "corilon-didier-nicolas-aine-french-violin-approx-1935",
  "corilon-claude-chevrier-violin-mirecourt",
  "corilon-johann-georg-schonfelder-markneukirchen-violin",
  "corilon-emidio-pignotti",
  "corilon-monzino-garlandini-milano",
  "corilon-interesting-french-violin-paris-1827",
  "corilon-johann-ulrich-eberle-prague",
  "shar-theodore-skreko-lord-wilton-violin-indianapolis-2025",
  "shar-scrollavezza-zanre-g-b-guadagnini-1744-violin-parma-2013",
  "corilon-officina-claudio-monteverde-cremona-1923-italian-violin",
  "ingles-violin-by-antonio-amati-in-cremona-on-circa-1621",
  "ingles-violin-by-antonio-amati-in-cremona-on-circa-1625",
  "ingles-violin-by-antonio-amati-in-cremona-on-1596",
  "corilon-fine-violin-mittenwald-sebastian-klotz-circle",
  "corilon-18th-century-mittenwald-violin",
  "corilon-modern-italian-violin-cremonese",
  "corilon-fine-french-violin-after-guarnerius",
  "corilon-french-violin-georges-apparut",
  "corilon-victor-audinot-paris",
  "corilon-monzino-figli-milano-italian-violin",
  "corilon-giuseppe-gagliano-violin-1760",
  "corilon-joseph-charotte-mirecourt",
  "corilon-mauro-lucini-master-violin",
  "corilon-alceste-bulfari-cremona",
  "corilon-antique-markneukirchen-master-violin-c1800",
  "corilon-fine-violin-louis-collenot",
  "corilon-italian-violin-cremona-officina-claudio-monteverde",
  "corilon-french-violin-by-jean-baptiste-grand-gerard",
  "corilon-fine-18th-century-mittenwald-violin-klotz-circle",
  "corilon-tomas-pilar-hradec-kralove",
  "corilon-interesting-master-violin-1850",
  "corilon-contemporary-italian-cremona-violin",
  "corilon-fine-italian-violin-mario-gadda",
  "corilon-cremona-violin-luigi-aquilino",
  "corilon-nicolo-gagliano-violin-1762",
  "corilon-1970",
  "corilon-ernst-heinrich-roth-master-violin-guarnerius",
  "corilon-luigi-galimberti-fine-italian-violin-milano",
  "corilon-philippe-mahu-violin-paris",
  "corilon-lorenzo-locatelli-italian-violin-cremona",
  "corilon-mittenwald-violin-bruno-franz-paulus",
  "corilon-modern-italian-violin-santino-masculo",
  "corilon-peter-hornsteiner-mittenwald-violin-circa-1790",
  "corilon-sergio-covelli-bergamo",
  "corilon-markneukirchen-soloist-violin-1940",
  "corilon-heinrich-theodor-heberlein-jr-markneukirchen",
  "corilon-19th-century-viennese-master-violin",
  "corilon-fine-italian-master-violin-18th-century",
  "corilon-italian-violin-milan-1900",
  "corilon-old-italian-violin-early-20th-century",
  "corilon-fine-italian-violin",
  "corilon-italian-violin-luigi-lanaro",
  "corilon-italian-violin-luigi-cardi-verona",
  "corilon-italian-violin-from-cremona-renato-superti",
  "corilon-italian-violin-giorgio-grisales-cremona",
  "shar-miki-inokuchi-violin-toronto-2000",
  "corilon-oskar-guetter-markneukirchen-violin",
  "corilon-historic-master-violin-from-the-vogtland-region-circa-1800",
  "corilon-young-violin-italy",
  "corilon-italian-violin-puglisi-catania",
  "corilon-kurt-guetter-markneukirchen-violin",
  "corilon-contemporary-italian-violin",
  "corilon-sergio-antonelli",
  "corilon-ferarri-cremona-violin",
  "corilon-raffaele-calace-e-figlio-italian-violin",
  "corilon-giuseppe-nupieri-roma",
  "corilon-umberto-lanaro-violin",
  "corilon-franco-italian-violin",
  "corilon-emile-laurent-paris",
  "corilon-french-master-violin-mid-19th-century",
  "corilon-charles-maucotel-london",
  "corilon-cesare-castelli-asculi-piceno",
];

const historicalMakerBackKeys = [
  "met-strad-antonius-back",
  "met-strad-francesca-back",
  "loc-betts-back",
  "loc-castelbarco-back",
  "loc-ward-back",
  "ingles-a-violin-by-antonio-stradivari-11",
  "ingles-a-violin-by-antonio-stradivari-12",
  "ingles-a-violin-by-antonio-stradivari-13",
  "ingles-a-violin-by-antonio-stradivari-14",
  "ingles-a-violin-by-antonio-stradivari-16",
  "ingles-a-violin-by-antonio-stradivari-17",
  "ingles-a-violin-by-antonio-stradivari-18",
  "ingles-a-violin-by-antonio-stradivari-2",
  "ingles-a-violin-by-antonio-stradivari-3",
  "ingles-a-violin-by-antonio-stradivari-4",
  "ingles-a-violin-by-antonio-stradivari-5",
  "ingles-a-violin-by-antonio-stradivari-6",
  "ingles-a-violin-by-antonio-stradivari-8",
  "ingles-a-violin-by-antonio-stradivari-9",
  "ingles-a-violin-by-antonio-stradivari-ex-hamma-hagner",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1667",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1690",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1699",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1709",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1713",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1721",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1727",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1729",
  "ingles-violin-by-antonio-stradivari-in-cremona-on-1732",
  "ingles-violin-by-omobono-stradivari-in-cremona-on-1732",
];

const excludedBackKeys = new Set([
  "corilon-andrea-castagneri-paris",
  "corilon-18th-century-mittenwald-violin",
  "corilon-benito-tosello-1976",
  "corilon-charles-maucotel-london",
  "corilon-contemporary-italian-violin",
  "corilon-emile-laurent-paris",
  "corilon-emidio-pignotti",
  "corilon-fine-german-master-violin",
  "corilon-fine-18th-century-mittenwald-violin-klotz-circle",
  "corilon-fine-italian-master-violin-18th-century",
  "corilon-fine-violin-by-johannes-gaessler-mittenwald-1764",
  "corilon-franco-italian-violin",
  "corilon-french-master-violin-mid-19th-century",
  "corilon-gennaro-russo",
  "corilon-gennaro-russo-taranto",
  "corilon-heinrich-theodor-heberlein-jr-markneukirchen",
  "corilon-historic-master-violin-from-the-vogtland-region-circa-1800",
  "corilon-interesting-french-violin-paris-1827",
  "corilon-italian-violin-cremona-officina-claudio-monteverde",
  "corilon-italian-violin-luigi-cardi-verona",
  "corilon-joseph-charotte-mirecourt",
  "corilon-johann-ulrich-eberle-prague",
  "corilon-joseph-laurent-mast-violin-toulouse-1823",
  "corilon-laurent-bourlier-mirecourt-violin",
  "corilon-lorenzo-locatelli-italian-violin-cremona",
  "corilon-master-violin-robert-reinert-chaux-de-fonds",
  "corilon-mittenwald-violin-bruno-franz-paulus",
  "corilon-monzino-garlandini-milano",
  "corilon-old-italian-violin-naples",
  "corilon-paul-bailly-violin",
  "corilon-peter-hornsteiner-mittenwald-violin-circa-1790",
  "corilon-raffaele-calace-e-figlio-italian-violin",
  "corilon-rare-violin-nicolas-mauchant-vaudel",
  "corilon-sergio-antonelli",
  "corilon-sergio-covelli-bergamo",
  "corilon-tomas-pilar-hradec-kralove",
  "corilon-victor-audinot-paris",
  "corilon-young-violin-italy",
  "ingles-a-violin-by-annibale-fagnola-2",
  "ingles-a-violin-by-carlo-carletti-2",
  "ingles-a-violin-by-giovanni-battista-gabrielli-3",
  "ingles-a-violin-by-giovanni-dollenz",
  "ingles-a-violin-by-john-johnson",
  "ingles-a-violin-by-joseph-panormo-london-circa-1800",
  "ingles-a-violin-by-louis-guersan",
  "ingles-a-violin-by-nathaniel-cross",
  "ingles-a-violin-by-tomasso-balestrieri-2",
  "ingles-violin-by-giovanni-tononi-in-bologna-on-1704",
  "reuning-gaetano-gadda-mantua-c-1930-violin",
  "shar-miki-inokuchi-violin-toronto-2000",
]);

const leadBackKeys = [
  "strings-ysaye-back",
  "featured-vieuxtemps-stradivari-1710",
  "featured-becker-sr-1940",
  "ingles-a-violin-by-w-e-hill-sons",
  "ingles-a-violin-by-roger-max-millant",
  "ingles-a-violin-by-gioffredo-cappa-2",
  "ingles-a-violin-by-giuseppe-pedrazzini-6",
  "ingles-a-violin-by-enrico-politi",
  "ingles-a-violin-by-jean-baptiste-vuillaume-10",
  "ingles-a-violin-by-karel-vavra-2",
  "ingles-a-violin-by-hilaire-darche-3",
  "ingles-a-violin-by-charles-francois-gand",
  "shar-theodore-skreko-lord-wilton-violin-indianapolis-2025",
  "shar-scrollavezza-zanre-g-b-guadagnini-1744-violin-parma-2013",
  "reuning-jacob-fendt-london-c-1830-violin",
];

const preferredBackKeys = Array.from(new Set([
  ...leadBackKeys,
  ...visualBackKeys,
  ...onePieceTextBackKeys,
  ...historicalMakerBackKeys,
])).filter((key) => !excludedBackKeys.has(key));

const sourceByKey = new Map(backSources.map((source) => [source.key, source]));
const displaySources = preferredBackKeys.map((key) => sourceByKey.get(key)).filter(Boolean);

const bodyOnlyDisplayScale = new Map([
  ["met-strad-antonius-back", 0.56],
  ["met-strad-francesca-back", 0.56],
  ["featured-vieuxtemps-stradivari-1710", 0.66],
  ["loc-castelbarco-back", 0.66],
  ["strings-ysaye-back", 0.70],
  ["loc-ward-back", 0.72],
  ["reuning-carl-g-becker-chicago-1972-violin", 0.74],
  ["reuning-gasparo-lorenzini-piacenza-c-1780-violin", 0.74],
  ["reuning-jacob-fendt-london-c-1830-violin", 0.74],
  ["reuning-nicolo-gagliano-naples-c-1765-violin", 0.74],
  ["reuning-paolo-antonio-testore-milan-c-1750-later-head-violin", 0.74],
  ["reuning-pierre-silvestre-lyon-1854-violin", 0.74],
  ["loc-betts-back", 0.78],
  ["ingles-a-violin-by-antonio-stradivari-18", 0.80],
]);

function normalizedAsset(key) {
  return `/assets/normalized/${key}.jpg`;
}

const items = displaySources.map((source) => ({
  ...source,
  sourceImage: source.image,
  image: normalizedAsset(source.key),
  caption: `${source.title}, full back.`,
  displayScale: bodyOnlyDisplayScale.get(source.key) || 1,
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
  if (item.displayScale && item.displayScale < 1) {
    link.classList.add("tile--display-scaled");
    link.style.setProperty("--tile-scale", item.displayScale);
  }

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

const batchSize = 96;

function batchItems(batch) {
  const start = batch * batchSize;
  return items.slice(start, start + batchSize);
}

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 1;
  if (width <= 1000) return 2;
  return 3;
}

function shapeScore(item) {
  const baseScore = {
    back: 1.54,
    cinema: 0.72,
    hero: 1.72,
    portrait: 1.4,
    square: 1,
    tall: 1.75,
    wide: 0.62,
  }[item.shape || "standard"] || 1.25;
  return baseScore * (item.displayScale || 1);
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

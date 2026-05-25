# Violin

A bookmarkable image wall for `violin.aolabs.io`.

The public wall uses the broader curated violin-back corpus, with selected user-found instruments pinned at the top only when the public full-back image is clean enough for the wall:

- 1740 Ysaye Guarneri del Gesu
- 1710 ex-Vieuxtemps Stradivari
- Carl G. Becker Sr. violin, Chicago, 1940

The 1734 Spagnoletti and 1742 Lord Wilton Guarneri del Gesu sources remain excluded until a public image route is good enough for the wall. The inspected Spagnoletti image has display-case glare and a vertical bar; the inspected Lord Wilton images were low-resolution, composite, or watermarked.

Tiles are intentionally image-only. Hovering reveals a short caption; clicking opens the source page for the instrument or image.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

## Deploy To Railway

1. Push this folder to a GitHub repo.
2. Create a Railway project from the repo.
3. Railway should detect Node and run `npm start`.
4. Add the custom domain `violin.aolabs.io`.

# DPRK Cyber Index (site)

The Astro code for cyber.nkzine.com. The data lives in a separate repo, [0tsh/not-so-awesome-dprk-hacks](https://github.com/0tsh/not-so-awesome-dprk-hacks): one Markdown file per event. This repo only turns those files into a website with year, actor and source pages and Pagefind search.

The deploy workflow checks out the data repo into `data/`, runs `astro build` and Pagefind, and publishes to GitHub Pages. It runs on every push here, every 6 hours, and on demand, so new data appears without touching this repo.

```
npm install
npm run data      # clones the data repo into ./data (or symlink your own checkout there)
npm run dev
npm run build && npm run preview
```

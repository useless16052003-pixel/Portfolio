# My little portfolio

Plain HTML, CSS and JavaScript. No build step. Open `index.html` in a browser to preview it.

## Make it yours (in this order)
1. **Name and tagline**: in `index.html`, change `Anonymous` (the `<h1>` and the `<title>`) and the line inside `<p class="tag">`.
2. **Contact stickers**: at the bottom of `index.html`, replace `you@example.com` and the two `https://example.com` links.
3. **Your work**: open `js/main.js` and find `YOUR CONTENT`. Every placeholder starts with `REPLACE:`.
   - **Photos**: put your images in `media/` (for example `media/sunrise.jpg`). In the `photo` list set `img:'media/sunrise.jpg'`, plus a `t` (title) and `c` (caption).
   - **Websites**: set `t` (name), `tech`, `d` (description), `live` (site link) and `code` (repo link).
   - **Videos**: put your file in `media/` and set `video:'media/my-film.mp4'`. Use `img` for a thumbnail picture.
   - **Writing**: set `t` (title), `ex` (excerpt shown on the page) and `body` (the full text shown when someone presses Read).
4. To use fewer or more than 6 items, replace `six((n,i)=>({...}))` with a plain list: `[{t:'...',img:'media/a.jpg'},{...}]`.
5. Delete the little `REPLACE` notes (`class="note"`) in `index.html` when you are done.

## Put it online with GitHub Pages
1. Create a public repository called `portfolio` on github.com.
2. Press **Add file → Upload files**, drag in everything from this folder (`index.html`, `css`, `js`, `media`, `README.md`), then **Commit changes**.
3. Go to **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

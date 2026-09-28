# MAZEN — Cinematic Stories

Static bilingual portfolio with a cinematic city still, warm orange accents,
social links, and an in-page video scene. No installation or build step.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory and open
http://127.0.0.1:8000/. Publish this directory to a static host.

## Structure

- `index.html` / `style.css`: introduction, five original social links, film preview.
- `portfolio.html` / `portfolio.css`: an honest work-in-progress page.
- `shared.css`: palette, typography, navigation, buttons, accessibility, footer.
- `script.js`: Riyadh clock and video controls shared by both pages.
- Original media remain intact. Pages use optimized image and video derivatives.
- `portfolio.js` is the original empty placeholder and is not loaded.

## Behavior

All content and navigation work without JavaScript. The video then displays its
poster. Reduced-motion preferences disable animation and initial video playback.
Videos pause when offscreen or in a hidden tab. A visible button controls playback.
The main page uses 700px and 380px layout breakpoints; shared navigation uses 900px
and 540px. There is no loading screen blocking content.

## Analytics and release

The existing G-72DHX7QHQP measurement ID is included once on each page. Configure
local/developer traffic filtering and verify production delivery in Tag Assistant.
Add canonical and absolute social preview URLs once the production domain is known.

Before publishing, check both pages on Safari/iOS, Firefox and Chrome, narrow
320px screens, tablet and desktop, keyboard navigation, 200% zoom, disabled
JavaScript, reduced motion and blocked autoplay. Do not replace the social URLs
without the owner's approval.

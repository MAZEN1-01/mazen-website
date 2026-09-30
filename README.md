# MAZEN — Cinematic Stories

A compact cinematic portfolio on an opaque dark background, with two main sections: a profile and video intro,
then five original social links and a portfolio card. No installation or build step.

## Preview

Run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory and open
http://127.0.0.1:8000/. Publish this directory to a static host.

## Structure

- `index.html` / `style.css`: profile/video introduction and a grid of social links.
- `portfolio.html` / `portfolio.css`: six-photo gallery and a separate section ready for videos.
- `shared.css`: palette, typography, navigation, buttons, accessibility, footer.
- `script.js`: homepage Riyadh clock and video controls.
- Original media remain intact. Pages use optimized image and video derivatives.
- `portfolio.js`: accessible native photo dialog, previous/next controls and keyboard navigation.
- `assets/images/portfolio/`: optimized thumbnails and larger viewing copies of the six supplied photos.

## Behavior

All content and navigation work without JavaScript. The video then displays its
poster. Reduced-motion preferences disable animation and initial video playback.
Videos pause when offscreen or in a hidden tab. A visible button controls playback.
The homepage is capped at 1020px with two columns, collapsing below 660px.
Social cards use three columns on desktop and two on mobile.
There is no loading screen blocking content.

## Analytics and release

The existing G-72DHX7QHQP measurement ID is included once on each page. Configure
local/developer traffic filtering and verify production delivery in Tag Assistant.
Add canonical and absolute social preview URLs once the production domain is known.

Before publishing, check both pages on Safari/iOS, Firefox and Chrome, narrow
320px screens, tablet and desktop, keyboard navigation, 200% zoom, disabled
JavaScript, reduced motion and blocked autoplay. Do not replace the social URLs
without the owner's approval.

The decorative fixed photo and overlay layers have been removed. Video is confined
to its card; content panels use opaque backgrounds to avoid visual layering.

## Portfolio gallery

Photos keep their full aspect ratio: three columns on desktop and two below 700px.
Thumbnails load lazily after the first image; larger versions load on demand.
Click a photo to open the viewer; use the arrows to navigate and Escape to close.
Without JavaScript, each thumbnail links directly to its larger image.
The video section is a placeholder until the owner supplies video work.

## Appearance

Both pages load `theme.js` before styles to restore the saved light/dark preference.
Dark is the default; the header button saves the choice when local storage is available.
SVG arrows keep their appearance consistent across mobile platforms.
The homepage name scales from 44px on small phones to 68px on desktop.

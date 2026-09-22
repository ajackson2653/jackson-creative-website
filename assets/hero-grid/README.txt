HERO MOSAIC — MOTION TILES
==========================

The homepage hero shows a 4×3 grid of 12 tiles. Four of them loop short video
clips; the rest are still images. Right now the video tiles use placeholder
posters (images already on the site), so they show a static frame until you add
real clips here.

TO ACTIVATE MOTION
------------------
Drop up to four muted clips into this folder, named exactly:

    clip1.mp4   clip2.mp4   clip3.mp4   clip4.mp4

(Optional, for smaller/faster files, add matching .webm versions:
    clip1.webm  clip2.webm  clip3.webm  clip4.webm)

They autoplay muted, loop, and are dimmed automatically by the hero scrim.
Until a file exists, its tile simply shows the poster still — nothing breaks.

CLIP GUIDELINES
---------------
- Short: 6–15 seconds, seamless loop if possible.
- Muted-friendly: no reliance on audio.
- Small: compress well (these play behind text). ~1–3 MB each is plenty.
- Square-ish framing survives best, since tiles are cropped to fill their cell.

CHANGING THE STILLS OR WHICH TILES ANIMATE
------------------------------------------
Edit the hero markup in /index.html (the .hero-grid block):
  - Still tiles are <div class="hero-tile" style="--img:url('...')">
  - Motion tiles are <video class="hero-tile" ... poster="...">
Tile positions are shuffled on each page load (see assets/script.js), so the
animating tiles move around the grid from visit to visit.

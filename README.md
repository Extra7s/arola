# Arola — Home Page Clone (React + GSAP)

A clone of the home page of https://arola.webxnepal.com built with **React (Vite) + GSAP/ScrollTrigger + Lenis + Tailwind CSS v4**.
Home page only. The background audio player and the preloader/intro screen of the original site are intentionally omitted.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

Requires Node 20.19+ / 22+.

## Structure

```
public/                     assets pulled from the original site (images, videos)
src/hooks/useSmoothScroll.js Lenis smooth scroll wired into the GSAP ticker + ScrollTrigger
src/hooks/useResponsive.js   matchMedia helpers used for breakpoint-specific animations
src/components/              one file per section of the page
src/data/products.js         product/nav/footer content
```

## Sections and their animations

| Component | Animation |
| --- | --- |
| `BottleIntro` | Pinned timeline (`scrub: 2`, `end: +=450%`): the cap lifts off the bottle, returns, then the whole bottle scales, floats and fades out |
| `Hero` | Pinned (`+=100%`): the ring scales to 1.3 and thickens, "Welcome to Arola" scales up from the bottom, "Please, scroll down" slides down and fades |
| `AboutSection` | Word-by-word opacity reveal (`ScrollRevealText`, stagger 0.1, scrubbed) over the looping video |
| `MountainSection` | Pinned parallax: three cloud layers travel at different speeds over the mountain |
| `CloudHeadline` | Infinite yoyo drift of the foreground clouds (`sine.inOut`, 12/18/14s) |
| `WaterfallSection` | Pinned (`+=1500`): bushes sweep up over the waterfall video, the bottle scene fades in, bushes sweep away |
| `PeakFlowSection` | Scrubbed parallax on the stream branch |
| `NatureSipSection` | Bottle pops up from the trunk on enter (`back.out(2)`, reverses on scroll back) |
| `ScrollDownIndicator` | Hides while scrolling, reappears 200ms after scrolling stops, hidden before `#about` and over `#footer` |
| `Footer` | Canvas sparkle particles under the WebX logo |

Assets in `public/` belong to Arola / WebX Nepal and are included only so the clone renders identically.

CHILD PLUS AFRICA - FINAL BUILD
===========================================
Halpes template structure, Child Plus Africa colors/info/images.

HOW TO RUN
1. Unzip this folder.
2. Terminal in that folder: npm install
3. Then: npm run dev
4. Open the printed local URL.

WHAT WAS FIXED IN THIS FINAL PASS
  - Sticky/duplicate header bug: the second nav bar (that overlapped
    your hero with a duplicated "Call Anytime"/"Donate") was hardcoded
    permanently visible. Now it only appears after scrolling down,
    like the real template intends.
  - Carousel/slider startup reliability: previously, if jQuery/Owl
    Carousel/Swiper hadn't finished loading from the CDN by the exact
    moment the page mounted, the sliders would silently never
    initialize. Now it retries for a few seconds instead of giving up
    once.
  - Verified every single image path in App.jsx points at a real file
    that actually exists in public/assets/images - zero broken images.
  - Verified no leftover Lorem Ipsum or original template branding
    (Layerdrops/Pixydrops) anywhere in the content.

WHAT'S INSIDE
  index.html            - CDN-based (jQuery, Swiper, Owl Carousel,
                           Bootstrap, Font Awesome), so it doesn't
                           depend on any local vendor folder
  package.json / vite.config.js
  src/main.jsx / src/App.jsx
  public/assets/css/halpes.css   - your real red theme (#fb1010)
  public/assets/images/           - your 21 real Child Plus Africa
                                     photos

WHAT THIS CANNOT INCLUDE (explained earlier, still true)
  - halpes-responsive.css / stylesheet.css content, since I never
    received those
  - The original Halpes template's own preview-only stock images
    (confirmed by ThemeForest listing: these are explicitly excluded
    from the real template download, so this was never a true loss)

# G-Plus Tech Solution — Reference Design Edition

This rebuild follows the supplied neon AI solutions homepage reference: dark Matrix-inspired background, official logo lockup, horizontal navigation, humanoid AI hero visual, lime-green CTA, benefit strip, and ten equal-size cyan/green service cards arranged in two rows of five on wide desktop screens.

## Files
- `index.html` — homepage and all sections
- `style.css` — responsive styling and visual design
- `script.js` — Matrix rain, navigation dropdown/mobile menu, overview modal, contact form
- `g-plus-official-logo.png` — official business logo
- `hero-humanoid-ai.jpg` — hero visual cropped from the supplied reference design

## Business details
- G-Plus Tech Solution
- Audience: all businesses and individuals
- Email: ask.an.it.now@gmail.com

## Functionality
- Home/About/Services/Portfolio/Process/Contact navigation
- Services dropdown menu and mobile navigation
- “Explore Our Services” scrolls to the service cards
- “Watch Overview” opens an accessible overview modal
- “Get a Quote” and service cards lead to the contact section
- Contact form prepares an email to ask.an.it.now@gmail.com using the visitor's email app
- Animated Matrix digital rain uses staggered independent streams
- Responsive layout for desktop, tablet, and mobile

The contact form uses `mailto:`; it does not send or store submissions on a server.

## Publish on GitHub Pages
1. Open your GitHub repository.
2. Replace the old website files with all files in this folder.
3. Keep `g-plus-official-logo.png` and `hero-humanoid-ai.jpg` beside `index.html`.
4. In repository Settings → Pages, choose Deploy from a branch → `main` → `/(root)` → Save.
5. Refresh the published site. If an older version appears, hard-refresh the browser.


## Matrix rain visibility across the whole website
The Matrix canvas is fixed to the viewport at a content-safe overlay layer, while all page sections use translucent dark backgrounds. This keeps the independently moving digital rain visible as visitors scroll through the hero, services, about, portfolio, process, contact, and footer sections. The canvas remains non-interactive and does not block links, buttons, or form controls.


## Seamless humanoid hero photo
The humanoid AI visual no longer has a visible rectangular frame. The hero image uses transparent styling, screen blending, and a soft radial edge mask so it fades naturally into the dark Matrix background. The holographic visual and humanoid remain visible while the image edges blend into the hero section.


## Seamless humanoid hero — transparent artwork
The hero no longer uses a rectangular JPG as its main visual. The humanoid has been separated into `android-transparent.png` with a transparent alpha channel, while the holographic Earth is a separate feathered transparent layer in `holographic-earth.png`. Both are layered directly over the hero background and Matrix rain, with no image frame or rectangular container.
Keep both PNG assets in the same directory as `index.html`.

The android cutout edge has been further refined: residual HUD fragments behind the neck are removed and the lower edge is feathered to avoid a visible straight crop.


## Full-hero video background
The humanoid photos have been removed. The uploaded `ai.mp4` is now installed as `ai-hero-video.mp4` and plays muted, automatically, inline, and in a continuous loop as a full-bleed background covering the entire hero section behind the headline, navigation, CTAs, and benefit row. A dark gradient overlay preserves text contrast. The About visual is now an abstract G+ technology graphic rather than a humanoid photo.

Keep `ai-hero-video.mp4` and `ai-hero-poster.jpg` in the same folder as `index.html` when publishing. The video is approximately 11.5 MB; autoplay requires muted playback in most browsers.


## Hero video overlay update
The dark cinematic gradient overlay has been removed. The hero video is displayed at full opacity without a CSS brightness or saturation filter, while the website content remains layered above it.


## Video extended behind navigation
The hero section now starts at the very top of the page and fills at least the viewport height. Its full-bleed video is positioned behind the transparent navigation/header, so the video is visible from the top edge behind the logo and menu and continues through the headline, buttons, benefits, and full hero. The dark cinematic overlay remains disabled.


## Centered hero content update
The hero headline, eyebrow, description, CTA buttons, and benefit strip are now centered horizontally and vertically as one balanced composition within the full-height video hero. The full-bleed video remains behind the transparent header and the complete hero content; the dark overlay remains disabled.


## Services section restored
The complete eight-card Services section is restored immediately after the hero and before About. Service IDs match the navigation dropdown and hero CTA anchors.


## Hero background photo
The hero video has been removed and replaced with the user-provided circuit-board image, saved as `hero-circuit-board.jpg`. The image fills the complete hero section behind the centered hero content and transparent navigation. The Matrix rain, service cards, and other website functionality remain. The MP4 video and its poster are no longer required or included.


## Hero copy alignment
The hero headline, description, call-to-action buttons and benefit labels are left-aligned, while the supplied circuit-board photo remains full-bleed and the rest of the website is unchanged.


## Hero photo updated
The hero background now uses the latest user-provided neon AI chip circuit-board image, saved as `hero-circuit-board.jpg`. The hero video remains removed. Keep this image in the same directory as `index.html`.


## Custom business systems carousel
The Portfolio section includes a compact interactive carousel featuring nine custom system screenshots. It displays one screenshot at a time with previous/next arrows, a slide counter, and navigation dots. Only the first screenshot is loaded initially; the other compressed WebP images load on demand as visitors browse. Images are stored in `showcase/`.


## About-section automatic systems showcase
The nine custom system screenshots are presented in a compact carousel inside the visual panel beside the WHO WE ARE copy. It automatically advances every 4.5 seconds, shows one screenshot at a time, and pauses while hovered, focused, or when the browser tab is hidden. It respects reduced-motion preferences. Screenshots are loaded on demand.


## Carousel image-loading fix
The carousel now resolves screenshot URLs relative to `script.js`, which avoids broken relative paths on GitHub Pages project sites. The first screenshot loads eagerly, automatic rotation runs every 5 seconds, and hovering over the carousel no longer pauses it. Rotation pauses only while the browser tab is hidden.


## Visitor AI support pop-outs
- **AI QUERY** opens a centered contact pop-out with the business email `ask.an.it.now@gmail.com`, a copy-email control, and an email link.
- **ASK G-PLUS AI** opens a separate centered company Q&A assistant with suggested questions and a message input.
- The Q&A helper responds using the company details and services published on this website. It is a lightweight browser-side knowledge assistant, not a live generative AI service and it does not transmit visitor questions to an AI provider. A secure server-side AI integration is needed for live generative answers.
- No phone number is displayed because one has not been supplied.


## Floating support button sizing update
The AI QUERY and ASK G-PLUS AI launcher buttons now share the same fixed responsive width and height, stretch to the same left/right edges, and use larger labels/icons for visibility.


## G-Plus zero-cost company assistant
The ASK G-PLUS AI interface runs entirely in the browser using a structured company knowledge base and intent matching. It uses no OpenAI API, no external AI service, no API key, and no paid backend. It can answer the company/service/system topics included in the knowledge base and handle limited contextual follow-up prompts. It is a guided knowledge assistant, not a generative AI model; it should not claim to know details that are not published.
The website remains a static GitHub Pages site. Upload the complete folder, including the `showcase/` images.

# Portfolio screenshots and design review

Captured from the local Next.js app at http://127.0.0.1:3000 on 20 October 2026.
The original three screenshot folders show the website before the continuous-scroll update.
`continuous-flow/desktop.png` and `continuous-flow/mobile.png` show the updated single-page layout, with all six sections in order.

## Screenshot folders

- `desktop-light/`: 1440 × 1000 viewport, full-page PNGs.
- `mobile-light/`: 390 × 844 viewport, full-page PNGs.
- `desktop-dark/`: 1440 × 1000 viewport, full-page PNGs.

Each folder contains `home.png`, `experience.png`, `research.png`, `achievements.png`, `projects.png`, and `contact.png`.
Experience corresponds to `/resume`. The other names match their routes; Home is `/`.
`capture-results.json` records HTTP status, dimensions, overflow, missing images, and browser errors.
All 18 captures returned HTTP 200, with no missing images or uncaught page errors. No document-level horizontal overflow was detected at the captured widths.
Full-page captures extend beyond the viewport height. Animations were disabled during screenshots and the Next.js development badge was hidden. External fonts were allowed up to 10 seconds to load.

## Recommended visual direction

Keep the teal identity and personal portrait. Use a quieter grid, a more restrained glow, crisp typography, and stronger emphasis on project imagery and concrete outcomes. Vary layouts so every page does not feel like another stack of large white cards.

### Home

- Shorten the introduction to a clear statement of what you build; move supporting biography below it.
- Add a prominent “View Projects” button and secondary “Contact Me” button. Keep the five destination links as secondary navigation.
- Bring a preview of two or three strongest projects onto the home page, followed by research and award highlights.
- On mobile, reduce the portrait's visual dominance and bring the headline and primary action closer to the top.

### Experience

- Keep the timeline, but give each role a compact summary and a few outcome-focused bullets where verified information is available.
- Use restrained institution/company marks and make the current role visually distinct.
- Add a real downloadable resume if a PDF is supplied. Consider collapsing older school entries to reduce page length on phones.

### Research

- Feature LaGPS with a framework illustration or actual result image, a publication badge, and the existing +19.4% mIoU result with its baseline context.
- Make paper access a clear button. Add code or citation actions only when the actual resources are available.
- Reduce long text lines on desktop and separate publications from research appointments.

### Achievements

- Turn the three awards into a more compact visual group on desktop, keeping a readable single column on phones.
- Use small rank labels, event marks or supplied event photos, and links to the associated projects.
- Preserve supporting context, such as the ISRO Top 28 selection, next to each result.

### Projects

- Standardize preview aspect ratios and presentation. Current images mix presentation slides, product interfaces, and collages with different margins.
- Prefer a large product screenshot or short user-initiated demo preview; keep technical diagrams available as secondary material.
- Give each project a short problem → approach → result summary. Make “Live Demo” primary where a working demo exists, then “Code” and “Presentation”.
- Reduce the number of visible technology pills per card and move the full list into details.

### Contact

- Give form controls a subtle background and visible border; they currently blend into the light card.
- Reduce card padding and heading size on phones. Keep the email address readable and wrapping within the card.
- Make the email a mailto link with an optional copy button. Associate labels with inputs and provide clear focus and status states.

## Motion plan

1. **Hero entrance:** fade and move the headline, biography, and actions up by 12–20px over 450–650ms, with short staggered delays. Play once.
2. **Scroll reveals:** reveal project cards and timeline items once as they enter view, using opacity and a 16px translation. Avoid hiding content when JavaScript fails.
3. **Hover and focus:** lift cards by 3–5px over 180–250ms; scale project imagery gently to about 1.03; use an animated underline for navigation.
4. **Portrait accent:** a very slow, small float on the greeting badge and a softly moving background glow. Keep body copy stationary.
5. **Mobile menu:** a short fade and slide with clear open/close states. Preserve keyboard access and focus visibility.
6. **Page changes:** a restrained 150–220ms content fade if navigation can support it without delaying interaction.

Use CSS transitions/keyframes for simple effects and IntersectionObserver for once-per-section reveals. Add a motion library only if coordinated route or layout transitions justify it. Animate transform and opacity, respect `prefers-reduced-motion`, and limit continuous effects on phones. Avoid scroll hijacking, constant typewriter text, and heavy particle scenes.

## Suggested implementation order

1. Correct mobile spacing, heading scale, and any clipping; improve form visibility and typography consistency.
2. Improve the home page hierarchy and add selected work.
3. Standardize project imagery and make research/award highlights more visual.
4. Add the motion plan, then verify keyboard use, reduced motion, both themes, and mobile layouts.

## Source observations

- `globals.css` imports Tailwind twice.
- `animate-float` is used for the greeting badge, but no matching keyframes or animation definition appear in the project styles.
- `BackgroundAnim` contains static decorative layers; it currently has no animation.
- The Inter font is loaded into `--font-inter`, while the declared display token uses a literal Inter family. Apply the loaded font variable consistently to make typography intentional.
- The layout loads Material Symbols twice. Consolidate the font request.

This review covers rendered appearance and basic page rendering. It does not validate external project links or submit the contact form.

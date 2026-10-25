# Integrate this robot into pragati-jain340/portfolio

Inspect the current homepage and AGENTS.md before editing. This bundle is a dependency-free React/Next.js client component and CSS. It approximates selected robot 3 with shaded SVG; it is not a rigged 3D model or video.

1. Copy RobotHero.tsx and RobotHero.css together into the existing components directory.
2. Replace only the current robot introduction/hero with RobotHero. Preserve the site's navigation, remaining sections, metadata, and contact functionality.
3. Pass the existing introduction text through name/title/subtitle. Defaults in this package are preview copy, not a request to change existing copy.
4. Preserve the current page background: the component is transparent. Adjust hero sizing to the current layout.
5. Desktop: centre wave, move right while turning, reveal text at 2.6 seconds. Mobile: robot above text. Intro runs once per mount, idle animation continues. Pause control and reduced-motion support included.
6. Run the repository lint/build and inspect desktop/mobile in a browser. Verify text doesn't overlap the hand at narrow widths. CSS uses a mirrored 2D turn, so refine that if a true 3D turn is required.

Open preview.html directly to preview without installing dependencies. No video asset or runtime download is needed. The repo package.json was verified as Next 16.1.6 / React 19.2.3; homepage integration has not been performed or tested in the repository.

# Pragati Jain | Portfolio

A modern, responsive, and dynamic portfolio built with Next.js, React, and Tailwind CSS. The portfolio is purely client-side static and reads its rich content directly from strongly typed TypeScript files.

## Project Structure (Data-Driven)
All text content for the portfolio has been extracted into easy-to-edit TypeScript arrays in the `src/data/` folder. This means you do not need to touch React components to update your resume!

- `src/data/profile.ts`: Edit the Hero section title, bio, and main name.
- `src/data/experience.ts`: Add or modify your work/internship experience.
- `src/data/education.ts`: Update degrees, timelines, and GPAs.
- `src/data/skills.ts`: Categorized skills and their icons.
- `src/data/projects.ts`: Your featured research papers, hacks, and open-source projects.
- `src/data/contact.ts`: Global contact links and phone/email info used in the Footer and Contact pages.

## How to Run Locally

First, ensure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Install dependencies**:
   Run this in your terminal from the `portfolio` folder:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **View the site**:
   Open [http://localhost:3000](http://localhost:3000) with your browser. The page will instantly hot-reload any edits you make to the files in `src/`.

4. **Stopping the Server**:
   To stop the running Next.js server, simply click inside the terminal window where it is running and press `Ctrl + C` (or `Cmd + C` on Mac) on your keyboard. It will ask `Terminate batch job (Y/N)?` Type `Y` and hit Enter to gracefully close it.

   *(If a server gets stuck and tells you the port is in use, restarting your computer or closing your terminal window entirely will shut down the hidden process).*

## How to Build (Static Export)

This project is configured to export as a static HTML site (perfect for GitHub Pages natively). 

1. **Run the build script**:
   ```bash
   npm run build
   ```

2. **Locate your files**:
   A new `out/` directory will be created in the project root containing your static `.html`, `.css`, and `.js` bundle, ready to be deployed to any static host!

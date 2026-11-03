@AGENTS.md

# Portfolio — Petr Boska Nylander

Personal site for a recent DTU MSc graduate (Mathematical Modelling and Computation,
ML & data science) who is job hunting in Denmark. Audience: recruiters and hiring
managers who skim for 30 seconds, then maybe open one project or the CV.

## Stack
- Next.js 16 (App Router), JavaScript (no TypeScript), Tailwind CSS v4
- Deployed on Vercel from `main`; every push redeploys. Branches get preview URLs.
- Read `node_modules/next/dist/docs/` before using any Next.js API (see AGENTS.md).

## Commands
- `npm run dev` — local server on http://localhost:3000
- `npm run build` — must pass before any commit
- `npm run lint` — must pass before any commit

## Where things live
- `data/site.js` — name, intro paragraphs, links, CV paths. All personal text lives here.
- `content/projects/<slug>.md` — one Markdown file per project/poster/report. The
  filename is the URL slug (`/projects/<slug>`). Pages are generated from these files.
- `lib/projects.js` — reads and validates the Markdown files at build time.
- `lib/markdown.js` — the remark/rehype pipeline; `lib/remark-callouts.js`,
  `lib/rehype-figures.js` and `lib/rehype-sidenotes.js` are the small custom plugins.
- `components/SiteChrome.js` — the left column (photo, name, role, bio, navigation, CV and
  contact links) and the main column; `components/WorkRow.js` — one figure-led project row.
- `scripts/shots.mjs` — `npm run shots` screenshots every page (375, 1024, 1280, 1440 px,
  light and dark) into `.shots/` and reports sideways scrolling, missing alt text, heading
  and contrast problems. Run it against `npx next start` after UI changes.
- `public/` — static files. Downloads go in `public/files/`, thumbnails in `public/thumbs/`,
  images used inside a project's text in `public/images/<slug>/`.
- Content stays in `data/` and `content/`; components never contain hard-coded personal text.

## Project Markdown files
Frontmatter (the build fails with the file name if a required field is wrong):

```yaml
---
title: Predicting water pipe failures   # required
year: 2026                              # required; projects are sorted newest first
type: project                           # required: project | poster | report | thesis
tags: [Survival analysis, DTU]
thumbnail: /thumbs/pipes.jpg            # required, must be in public/thumbs/
featured: true                          # also show on the front page
blurb: One sentence shown on the card.
links:                                  # external links, e.g. the code
  - { label: Code, href: "https://github.com/..." }
files:                                  # downloads, must be in public/files/
  - { label: Data (CSV), path: /files/example.csv }
course:                                 # optional, for DTU course projects
  code: "02456"                         # quoted, so YAML keeps the leading zero
  name: Deep Learning                   # from the course table below
  url: https://kurser.dtu.dk/course/02456
group: true                             # optional: shows "Group project"
github: https://github.com/...          # optional: shown as "Code on GitHub"
poster: /files/posters/x.pdf            # optional: must exist; redacted if needed
draft: true                             # optional: only visible in `npm run dev`
---
```

The body supports GitHub-flavoured Markdown (tables, footnotes, task lists),
`$inline$` and `$$display$$` maths (KaTeX), fenced code blocks with a language
(highlighted in monochrome), and:

- Figures: `![Alt text](/images/slug/fig.png "Caption")`. An image alone on its line with
  a title becomes a `<figure>` with that caption. Always write real alt text.
- Callouts: `> [!note]`, `> [!tip]`, `> [!warning]`, `> [!important]`, optionally followed
  by a custom title. `> [!note]-` is collapsed, `> [!note]+` is collapsible but open.
- Raw HTML in Markdown is ignored.

`content/projects/markdown-demo.md` (a draft) shows every feature; use it to check styling.
Footnotes (`[^id]`) become sidenotes in the right margin on wide screens (80rem and up)
and stay as numbered footnotes at the end of the page otherwise; a plain `> [!note]`
callout moves into the margin the same way. Use footnotes for references and asides only.
Styles for rendered Markdown live in the `.article` block in `app/globals.css` and use only
the colour tokens defined there.

## Source material rules
- `inbox/` is private source material and is never committed or published (it is in
  `.gitignore`).
- Files named `*_project_description.*` or `*_course_contents.*` are written by DTU. They
  describe the assignment and learning goals. Summarise them in Petr's own words; never
  copy their text or publish the files.
- Project reports (`*_project_*.pdf`, `*_report.pdf`) are what Petr's group did. Use them
  to understand the work, but NEVER copy these PDFs into `public/` or publish them.
- Figures for COURSE projects come from `inbox/images/<course code>/`. Claude may fill that
  folder by cropping figures from Petr's own course report PDFs in `inbox/`: render the
  page at 300 dpi, crop to the figure (with its axis labels, without the caption), and
  save it as a PNG in `inbox/images/<course code>/`. Then copy the figures a page uses to
  `public/images/<slug>/`. Only figures are cropped, never text pages.
- This does NOT apply to the MSc thesis: its figures come only from Petr, never cropped
  from the thesis.
- If a page needs a figure that isn't available, use a placeholder image and leave a TODO
  naming the figure Petr should export.
- Posters (`*_poster*.pdf`, any capitalisation) may be published, but NEVER with
  student numbers on them (`s` + six digits). For every poster:
  1. Check the text layer and an OCR of a 300 dpi render for student numbers.
  2. If there are any, make a redacted copy: render each page to a 300 dpi image, cover the
     numbers, and save the images as a new PDF in `public/files/posters/`.
  3. Confirm by extracting text from the new file (and OCR) that no number can be found,
     and look at the author line by eye: tiny subscript numbers can escape OCR.
  4. Tell Petr which posters were redacted, so he can re-export them from the source file
     if he has it.
  Posters without student numbers can be copied to `public/files/posters/` unchanged.
  Every published poster must be under 3 MB with text readable at 100% zoom: if needed,
  re-render at 150 dpi as JPEG (quality 0.6-0.8) and check the smallest text by eye.
  Credit groupmates by name only, never with student numbers.
- `*_github.md` files contain the repository link for that course.
- Never invent results, numbers or claims. Only use what is in the material.

## Thesis pages
Frontmatter `type: thesis` with a `thesis:` block (`degree: MSc | BSc`, `institution`,
`supervisors`). Theses appear in their own "Theses" section at the top of /projects.
Sections: one-sentence summary, the problem, data (or model) and approach, findings,
"My contribution" (TODO for Petr), figures.

MSc thesis (`content/projects/pipe-failure-prediction.md`):
- The thesis contains proprietary information. Use ONLY `inbox/MSC_thesis_Abstract.tex`,
  the uncommented text of `inbox/MSC_thesis_1_Introduction.tex`,
  `inbox/MSC_thesis_8_Conclusion.tex`, and figures Petr provides in
  `inbox/images/thesis-msc/`. Never use the acknowledgements file, commented-out (`%`)
  text, or details from anywhere else.
- Never publish the thesis PDF or any part of it beyond the above. Never crop figures from
  the thesis; figures come only from Petr.
- No network maps or anything that shows pipe locations.
- The abstract is Petr's own writing and may be shown in full; summarise the introduction
  and conclusion in Petr's voice.
- Individual work: no `group` flag, no co-author, no "My contribution" section, and
  written as "I", not "we". Credit DTU Sustain,
  supervisors Roland Löwe and Frederik Tinus Jeppesen, and the collaboration with Envidan,
  HOFOR, VandCenter Syd and Aarhus Vand, consistently with `data/site.js`.

BSc thesis (`content/projects/bsc-thesis-camp-oscillations.md`):
- Source: `inbox/Bachelor_Thesis.pdf` (Roskilde University, 2023, supervisor Johnny T.
  Ottesen). The PDF is NEVER published.
- Figures may be cropped from it like course reports (300 dpi, PNG in
  `inbox/images/thesis-bsc/`). Skip figures the thesis took from other authors.
- Group work: credit Rasmus W. Christiansen, Julien Hirsch, Marina Nocera and Ingvar
  Hjartarson by name, never with student numbers (the cover lists 5-digit RUC numbers).
- The thesis summary is group writing: summarise it in Petr's own words; don't quote it.

## Course project page template
One Markdown file in `content/projects/`.

- Frontmatter: title, year, tags, course (code, official name, and URL
  `https://kurser.dtu.dk/course/<code>`), group project yes/no, GitHub link, poster path
  if one exists, thumbnail.
- Official course names (confirmed by Petr; kurser.dtu.dk blocks automated fetching).
  Link each to `https://kurser.dtu.dk/course/<code>`:

  | Code  | Official name                                   |
  | ----- | ----------------------------------------------- |
  | 02456 | Deep Learning                                   |
  | 02460 | Advanced Machine Learning                       |
  | 02476 | Machine Learning Operations                     |
  | 02477 | Bayesian Machine Learning                       |
  | 02501 | Advanced Deep Learning in Computer Vision       |
  | 02506 | Advanced Image Analysis                         |
  | 02516 | Introduction to Deep Learning in Computer Vision |
  | 02807 | Computational Tools for Data Science            |

  For a course not in this table, ask Petr for the name. Don't guess it.
- Sections: a one-sentence summary; "The assignment" (the task only, short; no learning goals);
  "What we did" (approach); "Results"; "My contribution" (left as a TODO for Petr to
  write); figures.
- Use callouts sparingly: at most two per page, e.g. a `[!note]` for course context or a
  `[!tip]` for what Petr would do differently.
- Wherever a figure would help but none is available, put in a placeholder image plus a
  TODO naming the figure to export; Petr replaces it.

## Design rules (important)
The site should look like a careful person made it by hand, not like a template.
Reference for tone: lukasrasocha.com — quiet, typographic, content first.

Do:
- Typefaces: Source Serif 4 for all text, at 400 and 600 only (plus italic for captions
  and emphasis); the system sans (`.ui`) only for navigation, meta lines, labels and
  tables; KaTeX's own fonts for maths. No other webfonts.
- Type scale: 18px base, ratio 1.25 (`--step--1` to `--step-2` in `globals.css`), 17px on
  phones.
- Neutral palette (near-black on white, greys for secondary text) plus ONE accent,
  petrol `#1d5468` (`#7fb8c4` in dark mode), used for links and focus states only.
- Layout: a left column on desktop (64rem and up) that stays in place while the main
  column scrolls; one column on phones, with the work right after the short bio. Text
  pages keep a 34em reading column; work is shown as figure-led rows, not cards.
- Figures are numbered ("Figure 1.") with an italic caption; no rounded corners, borders
  or shadows on images.
- Real content over decoration: thumbnails are actual figures/posters from the work.
- Subtle interaction only: colour/underline change on hover, no movement.
- Keep pages fast and readable without JavaScript.

Don't:
- No gradients, glassmorphism, glowing shadows, blobs, particles, or animated backgrounds.
- No cards with rounded corners or shadows, no ALL-CAPS labels, no arrows on links, no
  icons in the left column, no cream/terracotta or neon-on-dark palettes.
- No emoji, no icon spam, no "Hi, I'm Petr 👋" hero, no typing-effect text.
- No skill bars or percentage ratings.
- No new UI/animation libraries without asking first.
- Don't invent facts about Petr. If text is missing, leave a clear TODO and tell me.

## Working style
- Before a non-trivial change, propose a short plan and wait for approval.
- Make small, reviewable changes; one feature per commit with a clear message.
- After UI changes, check the page at mobile width (375px) and desktop.
- Accessibility basics: alt text on every image, visible focus states, sufficient contrast,
  correct `lang` attributes (Danish CV link gets `hreflang="da"`).

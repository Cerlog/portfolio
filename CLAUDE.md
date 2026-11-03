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
- `lib/markdown.js` — the remark/rehype pipeline; `lib/remark-callouts.js` and
  `lib/rehype-figures.js` are the two small custom plugins.
- `public/` — static files. Downloads go in `public/files/`, thumbnails in `public/thumbs/`,
  images used inside a project's text in `public/images/<slug>/`.
- Content stays in `data/` and `content/`; components never contain hard-coded personal text.

## Project Markdown files
Frontmatter (the build fails with the file name if a required field is wrong):

```yaml
---
title: Predicting water pipe failures   # required
year: 2026                              # required; projects are sorted newest first
type: project                           # required: project | poster | report
tags: [Survival analysis, DTU]
thumbnail: /thumbs/pipes.jpg            # required, must be in public/thumbs/
featured: true                          # also show on the front page
blurb: One sentence shown on the card.
links:                                  # external links, e.g. the code
  - { label: Code, href: "https://github.com/..." }
files:                                  # downloads, must be in public/files/
  - { label: Report (PDF), path: /files/thesis.pdf }
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
Styles for rendered Markdown live in the `.prose` block in `app/globals.css` and use only
the colour tokens defined there.

## Design rules (important)
The site should look like a careful person made it by hand, not like a template.
Reference for tone: lukasrasocha.com — quiet, typographic, content first.

Do:
- One typeface family (currently Inter), at most two weights on a page.
- Neutral palette (near-black on white, greys for secondary text) plus ONE accent
  colour used sparingly, for links and focus states only.
- Generous whitespace, a single reading column for text pages, a simple grid for tiles.
- Real content over decoration: thumbnails are actual figures/posters from the work.
- Subtle interaction only: colour/underline change on hover, no movement.
- Keep pages fast and readable without JavaScript.

Don't:
- No gradients, glassmorphism, glowing shadows, blobs, particles, or animated backgrounds.
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

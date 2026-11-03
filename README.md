# Petr Boska Nylander: portfolio

Personal website of Petr Boska Nylander, MSc in Mathematical Modelling and
Computation (DTU), machine learning and data science. It has a short about page,
an MSc and a BSc thesis page, and one page per course project or poster.

Built with Next.js 16 (App Router, JavaScript), Tailwind CSS v4 and a
remark/rehype Markdown pipeline. Every page is static and readable without
JavaScript. Deployed on Vercel: every push to `main` goes live, and other
branches get preview URLs.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000, drafts visible
npm run build   # production build; must pass before every commit
npm run lint    # must pass before every commit
```

## Where things live

| Path | What it holds |
| --- | --- |
| `data/site.js` | Name, role line, site URL, about text, education, experience, coursework, links, CV paths |
| `content/projects/<slug>.md` | One Markdown file per project, poster or thesis; the filename is the URL |
| `lib/projects.js` | Reads and validates the Markdown files at build time |
| `lib/markdown.js` | The Markdown pipeline (GFM, KaTeX, highlighting, figures, callouts) |
| `app/globals.css` | Colour tokens (light and dark) and the styles for rendered Markdown |
| `app/opengraph-image.js`, `app/projects/[slug]/opengraph-image.js` | Generated link-preview images |
| `app/sitemap.js`, `app/robots.js` | Sitemap and robots.txt |
| `public/thumbs/` | Card and page thumbnails |
| `public/images/<slug>/` | Figures used inside a project's text |
| `public/files/` | Downloads: CVs, and posters in `public/files/posters/` |

`inbox/` holds private source material (reports, briefs, theses). It is in
`.gitignore` and is never committed or published.

## Adding a project

Create `content/projects/<slug>.md`:

```yaml
---
title: Short descriptive title
year: 2025
type: project            # project | poster | report | thesis
tags: [Computer vision, U-Net]
thumbnail: /thumbs/<slug>.png
featured: false          # true also shows it on the front page
blurb: One sentence for the card and the link preview.
course:                  # for DTU course work
  code: "02506"
  name: Advanced Image Analysis
  url: https://kurser.dtu.dk/course/02506
group: true
github: https://github.com/...
poster: /files/posters/<file>.pdf
---
```

The body is Markdown. On top of standard Markdown it supports tables and
footnotes, `$maths$`, fenced code blocks, captioned figures
(`![alt text](/images/slug/fig.png "Caption")`) and callouts (`> [!note]`,
`> [!tip]`, `> [!warning]`, `> [!important]`; add `-` or `+` to make them
collapsible). `content/projects/markdown-demo.md` is a draft that shows every
feature.

The build fails with a clear message if required frontmatter is missing or wrong.

## Rules for content

These are summarised here; `CLAUDE.md` has the full versions.

- Only facts from the source material. Missing text is a visible `TODO`.
- DTU's own assignment texts are summarised, never copied or published.
- Group reports are never published. Figures may be cropped from course reports,
  but not from the MSc thesis.
- Posters are published only without student numbers (redacted if needed) and
  under 3 MB.

## Design

Quiet and typographic: Source Serif 4 for text at two weights, the system sans
only for navigation and meta lines, a neutral palette and one petrol accent for
links and focus states. On desktop a left column holds the name, bio, navigation
and CV; work is shown as figure-led rows, and project pages put references in the
margin as sidenotes. All colours are tokens in `app/globals.css`, and dark mode
follows the system setting.

`npm run shots` (with `npx next start` running) screenshots every page at four
widths in light and dark mode into `.shots/` and reports layout, alt-text and
contrast problems.

The Source Serif 4 font files in `app/fonts/` are used for the preview images and are
licensed under the SIL Open Font License (`app/fonts/OFL.txt`).

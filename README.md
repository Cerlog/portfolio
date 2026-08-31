# Portfolio starter — where everything goes

## 1. Create the Next.js project first

```bash
npx create-next-app@latest portfolio
```

Answer: **JavaScript** (not TypeScript), **yes** to Tailwind CSS, **yes** to App Router,
**no** to a `src/` directory, **yes** to the `@/*` import alias.

## 2. Copy these files over the generated project

Unzip this folder and copy its contents into `portfolio/`, overwriting when asked.
The final tree should look like this:

```
portfolio/
├── app/
│   ├── globals.css              ← replaced
│   ├── layout.js                ← replaced
│   ├── page.js                  ← replaced (home / about)
│   └── projects/
│       ├── page.js              ← new (projects list)
│       └── [slug]/
│           └── page.js          ← new (one project)
├── components/
│   └── ProjectCard.js           ← new
├── data/
│   ├── site.js                  ← new (your name, links, intro text)
│   └── projects.js              ← new (your projects)
└── public/
    ├── me.jpg                   ← replace with your photo
    ├── cv.pdf                   ← add your CV here
    └── projects/                ← project screenshots
```

If `create-next-app` gave you `app/page.tsx` and `app/layout.tsx` (TypeScript),
delete those two files — the `.js` versions here replace them.

## 3. Run it

```bash
cd portfolio
npm run dev
```

Open http://localhost:3000. Every file save reloads the page instantly.

## 4. What to edit

- **`data/site.js`** — your name, intro paragraphs, GitHub/LinkedIn/email, CV path.
  Start here. The intro paragraphs accept HTML, so you can put links inside them.
- **`data/projects.js`** — one object per project. `featured: true` also shows it
  on the front page. `body` is an array of paragraphs for the project page.
- **`public/cv.pdf`** — export your CV to this exact filename and it appears
  behind the "Download CV" button and the CV link in the header.

You should not need to touch the page files unless you want to change the layout.

## 5. Design notes

The look is deliberately quiet: one typeface (Inter), a 672px reading column,
near-black text on white, and grey used for anything secondary. Colour is spent
only on your project images. Things you can change safely in `app/layout.js`:

- `max-w-2xl` → `max-w-3xl` for a wider column
- `Inter` → any other font from `next/font/google`
- `bg-white text-neutral-900` → `bg-neutral-950 text-neutral-100` for dark

## 6. Deploy

```bash
git init
git add .
git commit -m "initial portfolio"
git remote add origin git@github.com:yourname/portfolio.git
git push -u origin main
```

Then on vercel.com: **Add New → Project → import the repo → Deploy**. No settings
to change. Every later `git push` redeploys automatically.

## Tailwind version note

`app/globals.css` uses the Tailwind v4 syntax (`@import "tailwindcss";`), which is
what `create-next-app` installs today. If your project is on Tailwind v3, swap that
line for the three `@tailwind base/components/utilities` directives — the comment at
the top of the file explains it.

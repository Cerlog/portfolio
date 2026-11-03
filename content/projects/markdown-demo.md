---
title: Markdown demo
year: 2000
type: report
tags: [Demo]
thumbnail: /thumbs/placeholder.jpg
featured: false
blurb: Every Markdown feature in one place, for checking the styling. Hidden in production.
draft: true
links:
  - { label: Example link, href: "https://example.com" }
files:
  - { label: Example data (CSV), path: /files/demo/example.csv }
---

This page exists only to check the styling. It has `draft: true`, so it shows up
in `npm run dev` but is left out of the production build. Body text can contain
**strong text**, *emphasis*, ~~strikethrough~~, `inline code` and
[a link](https://example.com).

## Headings

Second-level headings split a page into sections.

### Third level

Use these for sub-sections.

#### Fourth level

Rarely needed.

## Lists

- An unordered item
- Another item
  - A nested item

1. First step
2. Second step

- [x] A finished task
- [ ] An open task

## Table

| Model               | Features | AUC  | Brier |
| :------------------ | -------: | ---: | ----: |
| Baseline            |        4 | 0.61 | 0.210 |
| Logistic regression |       12 | 0.68 | 0.194 |
| Gradient boosting   |       12 | 0.71 | 0.188 |

The numbers above are made up for the demo.

## Footnotes

A sentence with a footnote.[^first] And a second one.[^second]

[^first]: Footnotes are collected at the end of the page.
[^second]: Each one links back to where it was referenced.

## Maths

Inline maths sits in the text, like $h(t) = P(T = t \mid T \ge t)$.

Display maths gets its own line and scrolls sideways if it is too wide:

$$
S(t) = \prod_{k=1}^{t} \bigl(1 - h(k)\bigr),
\qquad
\operatorname{logit} h(t \mid \mathbf{x}) = \alpha_t + \boldsymbol\beta^\top \mathbf{x}.
$$

## Code

```python
import numpy as np

def survival(hazard):
    """Survival curve from discrete hazards."""
    # cumulative product of (1 - h)
    return np.cumprod(1 - np.asarray(hazard))
```

```js
export function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
```

```bash
npm run build && npm run lint
```

## Figure

An image on its own line, with a title in quotes, becomes a captioned figure.
The text in square brackets is the alt text for screen readers.

![Grey placeholder image](/thumbs/placeholder.jpg "Figure 1. The caption comes from the image title.")

## Callouts

> [!note]
> A note for side information the reader may skip.

> [!tip]
> A tip with practical advice.

> [!warning]
> A warning about a limitation or a pitfall.

> [!important]
> Something the reader should not miss.

> [!note] A custom title
> The text after the type replaces the default label.

> [!tip]- A collapsed callout
> Hidden until the reader opens it. It works without JavaScript.
>
> It can hold several paragraphs, lists or code:
>
> ```python
> print("hello")
> ```

> [!important]+ An expandable callout, open by default
> Add `+` instead of `-` to start it open.

> A plain blockquote, for comparison.

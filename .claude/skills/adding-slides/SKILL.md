---
name: adding-slides
description: Use when adding, editing, reordering or restyling slides in this keynote deck (slides.md, reveal.js with the IBM template layouts), or when a slide renders blank, overlaps, or ignores its layout.
---

# Adding slides to this deck

## Overview
The deck is reveal.js. Slides live in `slides.md`; `index.html` loads them through
the markdown plugin. The look comes from `ibm/ibm.css` (the IBM .potx template's 48
layouts as CSS classes). Talk-specific styles go in `talk.css`.

**Reference:** `ibm/README.md` has the layout table. `ibm/demo.html` has working HTML for
every layout; copy from it.

## Slide anatomy

```markdown
---

<!-- .slide: class="cols-4 dividers" -->

## Small title in column 1

<div class="col">

### Headline

Body text. **Markdown works** because of the blank lines inside the div.

</div>

<div class="col">

### Second headline

More text.

</div>

Note: Speaker notes start here. Put any HTML in backticks: `<img class="media">`.
```

- The separator is a line containing only `---`, with a blank line before and after it (`--` makes a vertical slide).
- `<!-- .slide: class="..." -->` picks the layout; `dark` / `light` can be added to it.
- `#` = cover title (h1), `##` = slide title (h2), `###` = column headline.

## Quick reference

| Want | Layout class | Structure |
|---|---|---|
| Title slide | `cover` | `#` title + `<div class="meta"><p>..</p><p>..</p></div>` |
| Section break | `section-divider` | `##` |
| One big statement | `large-text` / `callout-solo` | `##` / paragraph |
| Big numbers | see below | `<div class="stat"><div class="num">45%</div><p>..</p></div>` (one-line HTML is fine) |
| Columns of text | `cols-4`, `cols-2`, `halves` | `<div class="col">` per column; see the column rule below |
| Short text boxes | `boxes-4`, `boxes-6`… | `<div class="box">` per box |
| Picture + text | `media-half`, `media-3q` | text + `<img class="media" src="img/x.jpg">` |
| Default bullets | (no class) | `##` + list |
| Chat / agent conversation | any; on `chart` it fills column 1 | `<div class="chat">` + `<p class="msg user">..</p>` / `<p class="msg agent">..</p>` (styles in `talk.css`) |
| Agent context (code box) | any; on `media-half` it sits bottom-left | `<pre class="context"><code>...</code></pre>` (styles in `talk.css`) |
| Live embed (e.g. Bluesky post) | `chart` | `<div class="figure embed"><iframe src="https://embed.bsky.app/embed/<did>/app.bsky.feed.post/<rkey>"></iframe></div>`; needs internet |
| Point → implication rows | default (no layout class) | `<div class="implies">` + pairs of `<p class="point">..</p><p class="implication">..</p>`; CSS draws the arrow |
| Hand-drawn (imagined data) | any diagram | `<svg class="ibm-diagram sketch">` + a `<filter id="rough">` in `<defs>`; `text.hand` for handwriting (see `diagrams/context-growth.svg`) |
| Cited facts in column 1 | `chart` | `<div class="cites"><p>fact</p><p class="cite">source</p></div>` instead of one `p` |
| Title + 3 questions as a full-slide 2x2 | `boxes-4 questions quad` | `##` (top-left) + 3 `<div class="box">`; CSS draws the cross rules |
| Metrics 2x2 | `boxes-4 metrics` | per box: `p.q`, `p.metric`, `p.from` (low), `p.to` (elite); optional `p.aside` lower-left |
| Logo table | default | `<div class="landscape">` rows of `img` + `p.name` + `div.what` (`p`, `p.solves`) |
| A colleague's slide, whole | `media-full borrowed dark` + `style="--ibm-bg: #000000"` | `<img class="media">` (stack with `fragment` for builds) + `p.credit` |
| Highlight part of a diagram on click | any diagram | `<rect class="highlight fragment current-visible">`; blue text `text.accent`; mid emoji `text.agent` |
| Pull quote | `callout` (fills cols 3-4) or any | `<blockquote class="quote"><p>words</p><cite><strong>context</strong><br>source</cite></blockquote>` (no quote marks in the text; CSS adds them) |

Utilities: `.c1`–`.c4` (start column), `.w2`–`.w4` (span), `.t16`–`.t84` (size), `.muted`, `.blue`.

**Big numbers:** `data-3v` = title in col 1 and 3 stats side by side. `data-3h` = title in col 1 and 3 stats stacked. `data-2v` / `data-2h` = 2 stats, no title, **source line hidden**. Add `<p class="source">Source: ...</p>` for a citation (3v/3h only). A number fits ~6 characters ("$12.4B") in a column; it doesn't wrap. Order inside `.stat` doesn't matter; the layout positions `.num`. Keep the source to one line, or two at most.

**Column rule:** a `.col` whose first child is `###` (or `.picto`) is *headed*: it runs top to bottom, headline at the top. A plain `.col` starts at the body line (y=240), under the title. The slide title occupies the top of column 1, so:
- title + **3** headed cols, with `dividers` (template layout 18), or
- title + **4** plain cols, with `dividers-short` (layout 17). Lead each with a bold line (`**Instructions**`), not `###`.

Four headed columns plus a title pushes the 4th column off the slide.

## Diagrams (hand-written SVG)

One file per diagram in `diagrams/`, placed on a slide with
`<div class="diagram" data-src="diagrams/name.svg"></div>`. `ibm/diagrams.js` inlines it
so it picks up Plex and the colour tokens (light/dark). Copy `diagrams/four-elements.svg`.

**Canvas:** `viewBox` = the slide area it fills, 1 unit = 1 slide px. Lay out on the template
grid: columns 390 wide, 90 gutters (x = 0 / 480 / 960 / 1440 inside the canvas).

| Area | viewBox | Use with |
|---|---|---|
| Cols 2–4 (chart layout) | `0 0 1350 915` | `chart` slide: `##` + `p` + diagram |
| Cols 3–4 | `0 0 870 915` | `.diagram.c3.w2` |
| Full width under title | `0 0 1830 720` | default layout |

**Classes** (`ibm/diagram.css`). Never write `fill`/`stroke`/`font` attributes; use classes:
- Shapes: `rect.node` (outline), `.node.fill` (grey), `.node.accent` (blue), `.node.accent-outline`, `.group` (dashed boundary)
- Lines: `.edge` (arrow at end), `.edge.both`, `.edge.plain` (no arrow), plus `.accent` / `.muted` / `.dashed`. Use `line` or `path` (`d="M x y V y H x"` for right angles)
- Text: default 24px; `.title` 28, `.lg` 36, `.sm` 20 (the minimum), `.muted`, `.on-accent` (on blue), `.bold`, `.mid` (centred both ways), `.end`

**Geometry rules** (check these by hand if you can't render):
- Every coordinate is inside the viewBox. Arrows start and end exactly on box edges.
- Text sits ≥24px inside its box. Rough fit per line: 28px ≈ 14px/char, 24px ≈ 12px/char, 20px ≈ 10.5px/char.
  A 390 box (342 usable) fits ~24 chars at 28px. Shorten the text rather than shrinking it.
- Boxes may be narrower than a column. To group boxes, inset them 24px in their columns and draw
  the `.group` on the column edges. Label it with `text.muted` 24px in from its top-left corner.

Open the `.svg` directly to preview layout (arrowheads only show in the deck), then verify in
the deck in both modes.

## Common mistakes

| Symptom | Cause / fix |
|---|---|
| Deck is blank | Opened via `file://`. Run `npm start`, use http://localhost:8000 |
| Markdown shows as literal `**text**` | No blank line after `<div ...>` / before `</div>` |
| Columns/boxes in the wrong cells | Layouts place `.col`, `.box`, `.stat`, `.person` by order among sibling `div`s. Use `<p class="label">` / `<p class="intro">`, never extra `div`s, before them |
| Browser fetches an image named in notes | Raw HTML in `Note:` renders. Wrap it in backticks |
| Slides merge or get odd classes | A literal `.slide:` comment inside another HTML comment. Don't nest comments |
| Text runs into footer | Canvas is fixed 1920×1080; content must end by y=960. Cut text, don't shrink below 20px |
| Custom style ignored | Put it in `talk.css` and include the layout class in the selector (`.reveal .slides .media-half.bio > h2`), since template rules use `:is()` |
| Diagram shows "failed to load" or is blank | Wrong `data-src` path, or deck opened via `file://` |
| A diagram line renders as a filled shape | A text class on a `path`/`line`. Text classes only apply to `<text>` |
| Wrong colours in dark mode | Hard-coded colour. Use `var(--ibm-text)`, `var(--ibm-blue)`, `var(--ibm-gray-60)` etc. |

Don't edit `ibm/ibm.css` for one slide. Don't hand-number slides; `ibm/ibm.js` adds the footer and number.

## Verify every change
1. Make sure the server is running (`npm start`, port 8000).
2. Screenshot the slide at 1920×1080 in light and dark mode (Playwright: resize to
   1920×1080, navigate to `http://localhost:8000/#/N`, then `?dark#/N`; N is the 0-based index).
3. Check that nothing overlaps the footer or slide number, every column/box/stat is visible (count them), and dark text is readable.

If you can't screenshot, say so explicitly in your report and re-check the column rule and quick reference by hand. Never claim a slide works unseen.

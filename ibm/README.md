# IBM template for reveal.js

Built from `IBM_presentation_template_v_2_0_Plex_embed.potx`: the template's 48 slide
layouts, mapped to CSS classes. `demo.html` shows every layout; open it in a
browser from this folder.

## Setup

```html
<link rel="stylesheet" href="node_modules/reveal.js/dist/reset.css">
<link rel="stylesheet" href="node_modules/reveal.js/dist/reveal.css">
<link rel="stylesheet" href="ibm/ibm.css">
...
<script src="node_modules/reveal.js/dist/reveal.js"></script>
<script src="ibm/ibm.js"></script>
<script>
Reveal.initialize({
  width: 1920, height: 1080, margin: 0, center: false, display: 'grid',
  ibm: { footer: 'IBM / Event name' },   // footer text; per slide: data-footer="..."
  plugins: [ RevealIBM ],
});
</script>
```

`ibm.js` adds the footer and slide number to each slide. Hide them with
`class="no-footer"` or `class="no-chrome"` on a slide.

## Diagrams

Box-and-line diagrams are hand-written SVG files styled by `diagram.css` (classes like
`.node`, `.edge`, `.label` sizes, all drawn from the colour tokens). `diagrams.js`
(a plugin, listed after `RevealMarkdown`) inlines `<div class="diagram" data-src="...svg">`
and supplies the shared arrowhead. Conventions are in the project's adding-slides skill.

## Dark mode

`<html class="ibm-dark">` switches the whole deck to IBM Carbon's g100 colours
(#161616 background, #f4f4f4 text, #4589ff accent, lighter chart colours). A single
slide can use `class="dark"`, or `class="light"` inside a dark deck. The logo, divider
lines and placeholders all follow the text colour.

## Layouts (class on `<section>`)

| Class | Template layout | Markup |
|---|---|---|
| *(none)* | slide master | `h2` + body |
| `cover` (`cyan`, `imagery`, `half`) | 1–6 Cover | `[p.label] h1 [.media] [.meta > p, p]`; `.meta.label` for the single bottom label |
| `contents` | 7 Contents | `h2` + `ol/ul` (flows across cols 3–4) |
| `section-divider` | 8 | `h2` |
| `large-text` | 9 | `h2` (168px ExtraLight) |
| `callout` / `callout-solo` | 10 / 11 | `h2` + `p` / just `p` |
| `data-2v` `data-3v` `data-2h` `data-3h` | 12–15 Data | `[h2]` + `.stat > .num + p`; optional `p.source` |
| `cols-4` (`dividers`, `dividers-short`) | 16–19 | `h2` + `.col` ×4; `[p.intro]`; a `.col` starting with `h3`/`.head`/`.picto` begins at the top; `.col.lead` = 36px |
| `halves` | 21 | `h2` + `.col` ×2 (double width) |
| `cols-2` (`sm-title`, `dividers`) | 22–26 | `h2` + `.col` ×2 in cols 3–4; `[p.intro]` moves the cols to 2–4 |
| `boxes-4` `boxes-4h` `boxes-6` `boxes-6alt` `boxes-4wide` | 27–35 | `[p.label] h2` + `.box` ×N; `lg-title` for 68px title; `boxes-6.rules` for the icons variant |
| `media-half` `media-3q` (`inset`) `media-full` (`inset`) | 36–40 | `h2` + `p` … + `.media` (`img`, `video` or `div`) |
| `contacts` | 41 | `h2` + `.person > .media + div` ×≤6 |
| `table` | 42 | `h2` + `table` (cols 2–4) |
| `chart` | 43 | `h2` + `p` + `.diagram` (see Diagrams) or `.figure`/`svg`/`img` + `[p.source]` |
| `legal` (`two`) | 44–45 | `h2` + `div` of 16px text |
| `blank` | 46–47 | `h2` (small title) |
| `end` | 48 | empty; centred logo |

Utilities: `.c1`–`.c4` (start column), `.w2`–`.w4` (span), `.t16`…`.t84` (type size),
`.muted`, `.blue`, `ul.plain`.

## Notes

- Geometry comes straight from the layout XML (1pt = 1px): columns at x 45/525/1005/1485,
  390px wide; rows at y 45/240/480/525/960; divider lines are 1px at the gutter centres.
- Line spacing: PowerPoint 100% is 1.3em for Plex (its win ascent+descent), so the
  template's 90/100/110/120% become line-height 1.17/1.3/1.43/1.56.
- No PowerPoint render was available to compare against, so positions match the XML
  coordinates, not a pixel diff of real slides.
- Logos in `img/` were recoloured from the template's `ppt/media/image2.png`.

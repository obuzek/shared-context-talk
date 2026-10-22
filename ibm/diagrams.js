/* Inlines SVG diagram files into the slides so they inherit the deck's fonts and
 * colour tokens (an <img> could not). Usage in a slide:
 *
 *   <div class="diagram" data-src="diagrams/four-elements.svg"></div>
 *
 * Also adds the shared #ibm-arrow arrowhead used by .edge in ibm/diagram.css.
 * List it after RevealMarkdown so the generated slides exist when it runs.
 */
window.RevealDiagrams = {
  id: 'diagrams',
  init(deck) {
    document.body.insertAdjacentHTML('afterbegin',
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<marker id="ibm-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="14" markerHeight="14"' +
      ' markerUnits="userSpaceOnUse" orient="auto-start-reverse">' +
      '<path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs></svg>');

    const slots = deck.getRevealElement().querySelectorAll('.diagram[data-src]');
    return Promise.all([...slots].map(async slot => {
      const src = slot.dataset.src;
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
        const doc = new DOMParser().parseFromString(await res.text(), 'image/svg+xml');
        const svg = doc.documentElement;
        if (svg.nodeName !== 'svg') throw new Error('not an SVG file');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.classList.add('ibm-diagram');
        slot.replaceChildren(document.importNode(svg, true));
      } catch (err) {
        slot.textContent = `Diagram failed to load: ${src} (${err.message})`;
        console.error('RevealDiagrams:', src, err);
      }
    }));
  },
};

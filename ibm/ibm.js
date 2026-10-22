/* IBM template chrome for reveal.js: footer text + slide number on every slide.
 *
 *   Reveal.initialize({ ..., ibm: { footer: 'IBM / Event name' }, plugins: [ RevealIBM ] })
 *
 * The footer can also be set or overridden per slide with data-footer="...".
 * Layouts that have no chrome in the template (covers, end, full-bleed imagery)
 * hide it in ibm.css; add class "no-footer" or "no-chrome" to hide it elsewhere.
 */
window.RevealIBM = {
  id: 'ibm',
  init(deck) {
    const footer = (deck.getConfig().ibm || {}).footer || '';
    deck.getSlides().forEach((slide, i) => {
      const text = slide.dataset.footer ?? footer;
      if (text) {
        const el = document.createElement('div');
        el.className = 'ibm-footer';
        el.textContent = text;
        slide.appendChild(el);
      }
      const num = document.createElement('div');
      num.className = 'ibm-num';
      num.textContent = i + 1;
      slide.appendChild(num);
    });
  },
};

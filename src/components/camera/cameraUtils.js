/* ── Page size presets (points) ── */
export const PAGE_SIZES = {
  'Photo Size': null,
  'A4':         [595.28, 841.89],
  'A3':         [841.89, 1190.55],
  'Letter':     [612, 792],
};

/* ── Filter presets ── */
export const FILTERS = [
  { id: 'none',      label: 'Original',  css: 'none',                                          icon: 'bi-image'       },
  { id: 'enhance',   label: 'Enhance',   css: 'contrast(1.3) brightness(1.05) saturate(1.2)',  icon: 'bi-stars'       },
  { id: 'grayscale', label: 'Grayscale', css: 'grayscale(1)',                                   icon: 'bi-circle-half' },
  { id: 'document',  label: 'Document',  css: 'grayscale(1) contrast(2.2) brightness(1.15)',    icon: 'bi-file-text'   },
];

/** Reorder helper — immutably moves item from index `from` to `to` */
export const moveItem = (arr, from, to) => {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

/**
 * Bake a CSS filter string onto an image dataUrl via canvas.
 * Returns a new lossless PNG dataUrl with pixels already filtered.
 */
export const renderWithFilter = (dataUrl, filterCss) =>
  new Promise(resolve => {
    const img = new window.Image();
    img.onload = () => {
      const c   = document.createElement('canvas');
      c.width   = img.naturalWidth;
      c.height  = img.naturalHeight;
      const ctx = c.getContext('2d');
      if (filterCss && filterCss !== 'none') ctx.filter = filterCss;
      ctx.drawImage(img, 0, 0);
      resolve(c.toDataURL('image/png'));
    };
    img.src = dataUrl;
  });

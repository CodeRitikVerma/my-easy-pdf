/**
 * SEO body content for every tool + info page.
 *
 * Each entry is rendered by <SeoContent slug="..." /> and also
 * produces FAQPage / HowTo JSON-LD structured data.
 *
 * Writing guidelines:
 *  - Use the target keyword naturally in intro + first H2.
 *  - Every FAQ answer should be a complete sentence (Google favours them).
 *  - Keep paragraphs under 4 lines for readability.
 *  - Always mention "free", "no sign-up", "runs in browser" — our moat.
 */
const seoContent = {
  /* ═════════════════════════════════════════════════════════
     MERGE PDF
  ═════════════════════════════════════════════════════════ */
  'merge-pdf': {
    h1: 'Merge PDF files online — free, private, no upload',
    intro: [
      'Combine two or more PDF files into a single document right inside your browser. MyEasyPDF’s online PDF merger is completely free, requires no account, and never uploads your files to any server — every page stays on your device from start to finish.',
      'Drop multiple PDFs, drag the page thumbnails to reorder them exactly the way you need, remove any pages you don’t want, and download one clean merged PDF. There is no file-size limit and no watermark is ever added.',
    ],
    howTo: {
      title: 'How to merge PDF files',
      steps: [
        { title: 'Add your PDFs', text: 'Click the upload area or drag and drop your PDF files. You can add as many files as you like, and bring more in later using the “Add more” button.' },
        { title: 'Reorder and remove', text: 'Drag any page thumbnail to a new position, or hit the red × to exclude pages you do not want in the final document.' },
        { title: 'Download the merged PDF', text: 'Click “Merge & Download PDF”. The tool stitches everything together in-browser and saves one combined file to your computer.' },
      ],
    },
    features: [
      { icon: 'bi-shield-lock',       title: '100% private',           text: 'Nothing is uploaded. Your PDFs are processed entirely with client-side JavaScript in your browser.' },
      { icon: 'bi-infinity',          title: 'No file-size limits',    text: 'Merge large PDFs — we’re only limited by your device’s memory, not an artificial server cap.' },
      { icon: 'bi-arrows-move',       title: 'Drag-and-drop reorder',  text: 'Rearrange pages from different PDFs into a single continuous document in any order.' },
      { icon: 'bi-x-circle',          title: 'Remove pages on the fly',text: 'Drop pages you don’t want before merging — no need to pre-edit each source PDF.' },
      { icon: 'bi-patch-check',       title: 'No watermarks',          text: 'The output is a clean PDF. We never add branding, banners or any trace on your documents.' },
      { icon: 'bi-lightning-charge',  title: 'Fast merging',           text: 'Powered by pdf-lib and pdf.js — merging dozens of PDFs usually completes in seconds.' },
    ],
    whyUs: {
      title: 'Why merge PDFs with MyEasyPDF',
      paragraphs: [
        'Most online PDF mergers quietly upload your documents to shared servers in another country, keep a copy for “processing”, and add size limits or watermarks unless you pay. MyEasyPDF is different: we run entirely in your browser using WebAssembly-powered PDF libraries, so confidential contracts, medical reports and invoices never leave your machine.',
        'That makes this tool safe for businesses, lawyers, students and anyone handling personal data under GDPR, HIPAA or DPDP.',
      ],
    },
    faqs: [
      { q: 'Is it really free to merge PDFs here?',                    a: 'Yes — merging PDFs on MyEasyPDF is 100% free with no trial, no account and no hidden limits. You can merge as many PDFs as you want, as often as you want.' },
      { q: 'Are my PDFs uploaded to a server?',                        a: 'No. The entire merge happens in your browser using JavaScript. Your PDFs are never sent to us, making this one of the most private PDF mergers online.' },
      { q: 'Is there a limit on how many PDFs I can combine?',         a: 'There is no artificial limit. The only practical cap is your device’s available RAM — modern laptops handle hundreds of pages without problems.' },
      { q: 'Can I reorder pages from different PDFs?',                 a: 'Yes. After uploading, every page appears as a thumbnail that you can drag into any position, regardless of which source PDF it came from.' },
      { q: 'Will the merged PDF have a watermark?',                    a: 'Never. MyEasyPDF does not add watermarks, banners or any branding to your merged PDF. The output is a clean, distributable document.' },
      { q: 'Does it work on mobile phones?',                           a: 'Yes. The merger works in modern mobile browsers on iOS and Android, though very large PDFs may be slower on older phones due to memory limits.' },
    ],
    related: [
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'Compress PDF',  href: '/compress-pdf',  icon: 'bi-file-zip' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     SPLIT PDF
  ═════════════════════════════════════════════════════════ */
  'split-pdf': {
    h1: 'Split PDF online — free, fast, private',
    intro: [
      'Split a PDF into multiple smaller documents, extract a range of pages, or save every page as its own file — all from your browser. MyEasyPDF’s online PDF splitter is free, does not require a sign-up, and never uploads your PDF to any server.',
      'Upload one PDF, preview every page, mark the pages you want to keep (or drop), and download a new, smaller PDF. It is the quickest way to cut a long report, remove blank pages, or separate chapters of an e-book.',
    ],
    howTo: {
      title: 'How to split a PDF',
      steps: [
        { title: 'Upload your PDF',  text: 'Drag and drop the PDF, or click to browse. The tool renders a thumbnail of every page in the document.' },
        { title: 'Exclude unwanted pages', text: 'Click the red × on any page you want to drop from every output file — the remaining pages are what get split.' },
        { title: 'Choose a split mode', text: 'Pick “Extract each page as a separate PDF”, or enter custom page ranges like “1-3, 5, 7-9” to produce one PDF per range.' },
        { title: 'Download the ZIP', text: 'Click Split PDF — the tool builds every output in-browser and hands you a single split-pdfs.zip containing them all.' },
      ],
    },
    features: [
      { icon: 'bi-grid-3x3-gap', title: 'Visual page selection', text: 'Every page is rendered as a thumbnail so you can see exactly what you’re keeping or removing before the split.' },
      { icon: 'bi-input-cursor-text', title: 'Range input support', text: 'Enter ranges like “1-3, 5, 8-10” to create one PDF per range, or pick one-PDF-per-page mode with a single toggle.' },
      { icon: 'bi-file-zip',       title: 'ZIP with all outputs', text: 'No matter how many PDFs the split produces, they’re bundled into one tidy ZIP so you download everything in one go.' },
      { icon: 'bi-shield-lock',    title: 'Files stay on your device', text: 'No server uploads. All processing happens client-side in your browser.' },
      { icon: 'bi-patch-check',    title: 'No watermarks',         text: 'The split PDFs are clean — no banners, no branding, no post-processing.' },
    ],
    whyUs: {
      title: 'Safe and private PDF splitter',
      paragraphs: [
        'If you are splitting sensitive PDFs such as bank statements, contracts or medical records, uploading them to a cloud PDF service is a real privacy risk. MyEasyPDF performs every split locally in your browser, so nothing ever crosses the network.',
      ],
    },
    faqs: [
      { q: 'Can I split a PDF into multiple files at once?',          a: 'Yes — use comma-separated ranges (e.g. “1-5, 6-10, 11-20”) and the tool produces one PDF per range, bundled together in a ZIP.' },
      { q: 'Can I extract every page as its own PDF?',                a: 'Yes. Switch the split mode to “Extract each page as a separate PDF” and every page becomes its own file inside the output ZIP.' },
      { q: 'What file do I get when I split?',                        a: 'You get a single split-pdfs.zip containing every output PDF. Unzip it with any built-in tool on Windows, Mac, Linux, Android or iOS.' },
      { q: 'Is my PDF uploaded anywhere?',                            a: 'No. MyEasyPDF splits PDFs entirely inside your browser using pdf-lib, so your file never leaves your computer.' },
      { q: 'Is there a page-limit on free use?',                      a: 'There is no artificial page or size limit — only your device memory, which typically handles hundreds of pages effortlessly.' },
      { q: 'Does the output keep the original quality?',              a: 'Yes. Splitting copies pages byte-for-byte from the source PDF, so text stays sharp, images keep full resolution and fonts are preserved.' },
    ],
    related: [
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     COMPRESS PDF
  ═════════════════════════════════════════════════════════ */
  'compress-pdf': {
    h1: 'Compress PDF online — reduce file size for free',
    intro: [
      'Shrink big PDFs to a fraction of their original size without losing readable quality. MyEasyPDF’s free online PDF compressor downsizes images, strips redundant metadata and re-encodes the PDF entirely in your browser — ideal for email attachments, WhatsApp uploads, or meeting a file-size cap on a form.',
      'There is nothing to install and nothing to sign up for. Pick a compression level, run it, and download a smaller PDF in seconds.',
    ],
    howTo: {
      title: 'How to compress a PDF',
      steps: [
        { title: 'Upload your PDF',        text: 'Drop the PDF file you want to shrink into the upload area.' },
        { title: 'Choose a compression mode', text: 'Pick a Quality Preset (High / Medium / Low) for a one-click shrink, or switch to Target File Size and type the exact size you need in KB or MB — say 500 KB to fit an email cap.' },
        { title: 'Review the savings',     text: 'The result panel shows the before / after size and the percentage saved so you know exactly what you got.' },
        { title: 'Download the smaller PDF', text: 'Click Download — the compressed PDF is saved straight to your device. Your original file is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-arrow-down-circle', title: 'Up to 90% smaller',  text: 'Image-heavy PDFs routinely drop from 20 MB to under 2 MB with no visible quality loss.' },
      { icon: 'bi-sliders',           title: 'Quality presets',    text: 'High, Medium or Low compression for a one-click shrink when you just want a smaller file.' },
      { icon: 'bi-bullseye',          title: 'Target-size mode',   text: 'Enter an exact size (like 500 KB or 2 MB) and the tool binary-searches the best quality that still fits under your cap.' },
      { icon: 'bi-shield-lock',       title: 'Files never uploaded', text: 'Compression runs in your browser, so confidential documents stay on your device.' },
      { icon: 'bi-patch-check',       title: 'Format preserved',   text: 'Text stays selectable and links, bookmarks and form fields are kept intact — only embedded images are re-encoded.' },
    ],
    whyUs: {
      title: 'Why compress PDFs in the browser',
      paragraphs: [
        'Most web-based compressors upload your PDF, run it through a server, and e-mail you a link — which is not private, and often slow on big files. MyEasyPDF does everything locally. No upload delay, no privacy trade-off, and you can compress as many PDFs as you want in a row.',
      ],
    },
    faqs: [
      { q: 'Can I compress a PDF to a specific size, like 500 KB?',   a: 'Yes — switch to Target File Size mode, type the size you need in KB or MB, and the tool binary-searches the highest quality that still fits under your limit.' },
      { q: 'How much can a PDF be compressed?',                a: 'PDFs with large photos often shrink by 70–90%. Text-only PDFs are already efficient, so savings there are usually 5–20%.' },
      { q: 'Will compression affect text quality?',            a: 'No. Text and vector graphics are preserved exactly. Only embedded images are re-encoded at a lower resolution.' },
      { q: 'Is there a file-size limit?',                      a: 'No artificial limit — the only cap is the RAM your browser can allocate. Most modern laptops compress 100 MB+ files without issue.' },
      { q: 'Is this free?',                                    a: 'Yes, completely free. No account, no trial, no watermarks added to the compressed output.' },
      { q: 'Are my PDFs shared or stored?',                    a: 'No. MyEasyPDF compresses PDFs entirely in your browser — your files are never uploaded to a server.' },
    ],
    related: [
      { name: 'Merge PDF',    href: '/merge-pdf',    icon: 'bi-layers-fill' },
      { name: 'Split PDF',    href: '/split-pdf',    icon: 'bi-scissors' },
      { name: 'Organize PDF', href: '/organize-pdf', icon: 'bi-grid' },
      { name: 'All PDF Tools',href: '/all-pdf-tools',icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     IMAGE TO PDF
  ═════════════════════════════════════════════════════════ */
  'image-to-pdf': {
    h1: 'Convert images to PDF online — JPG, PNG, WEBP',
    intro: [
      'Turn one image or a whole batch of photos into a single neat PDF document. MyEasyPDF’s free image-to-PDF converter supports JPG, JPEG, PNG, WEBP and HEIC, and runs entirely in your browser with no uploads.',
      'It’s perfect for scanning receipts with your phone, combining product photos into a brochure, or bundling homework screenshots for teachers — no account, no limits, no watermark.',
    ],
    howTo: {
      title: 'How to convert images to PDF',
      steps: [
        { title: 'Add your images',           text: 'Drag in your photos or click to pick them from your device. You can add more images at any time before exporting.' },
        { title: 'Reorder the pages',         text: 'Use the ↑ and ↓ arrows on each thumbnail — or drag them — to set the order pages will appear in the PDF. Remove any image you don’t need.' },
        { title: 'Pick PDF settings',         text: 'Choose a page size (A4, A3, Letter, Legal, or Fit to Image), portrait or landscape orientation, and set a page margin with the slider.' },
        { title: 'Download the PDF',          text: 'Click Convert to PDF and save the combined document. Everything happens in-browser — nothing is uploaded.' },
      ],
    },
    features: [
      { icon: 'bi-images',        title: 'JPG, PNG, WEBP, HEIC', text: 'Convert any common image format to PDF, including iPhone HEIC photos.' },
      { icon: 'bi-file-earmark-ruled', title: 'A4, A3, Letter, Legal', text: 'Pick a standard page size or use “Fit to Image” so every page matches its source photo exactly.' },
      { icon: 'bi-arrows-angle-expand', title: 'Orientation + margins', text: 'Switch between portrait and landscape and dial in a custom margin with the slider for a polished look.' },
      { icon: 'bi-shield-lock',   title: 'Zero uploads',        text: 'Your photos never leave the browser. Ideal for ID cards, receipts and other sensitive scans.' },
      { icon: 'bi-infinity',      title: 'Unlimited images',    text: 'Convert dozens or hundreds of photos at once — the only limit is your device memory.' },
    ],
    faqs: [
      { q: 'Which image formats are supported?',       a: 'JPG, JPEG, PNG, WEBP, GIF, BMP and HEIC (iPhone photos). The tool automatically detects the format on upload.' },
      { q: 'Can I combine multiple images into one PDF?', a: 'Yes. Add as many images as you like, drag to reorder them, and the export creates one PDF with each image on its own page.' },
      { q: 'Are my images uploaded?',                  a: 'No. Everything happens in your browser with the Canvas API and pdf-lib — no server-side processing.' },
      { q: 'Does the converter add a watermark?',      a: 'Never. The PDF output is clean, with no branding, banners or added pages.' },
      { q: 'Can I choose the PDF page size?',          a: 'Yes — pick A4, A3, Letter, Legal, or “Fit to Image” (which sizes every page to its source photo). You can also toggle portrait / landscape and set a margin.' },
      { q: 'Can I reorder images before converting?',  a: 'Yes. Each thumbnail has ↑ and ↓ buttons to move it up or down, and you can drag thumbnails too, so the final PDF follows the exact order you set.' },
    ],
    related: [
      { name: 'PNG to PDF',    href: '/png-to-pdf',    icon: 'bi-filetype-png' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     PNG TO PDF
  ═════════════════════════════════════════════════════════ */
  'png-to-pdf': {
    h1: 'Convert PNG to PDF online — free, private, no watermark',
    intro: [
      'Turn one PNG or a batch of PNG images into a single polished PDF document. MyEasyPDF’s free PNG-to-PDF converter runs entirely in your browser — nothing is uploaded, nothing is stored, and the output never carries a watermark.',
      'It’s perfect for stitching together screenshots into a report, combining diagrams exported from Figma or Canva, or bundling design mockups to email to a client.',
    ],
    howTo: {
      title: 'How to convert PNG to PDF',
      steps: [
        { title: 'Drop your PNG files',     text: 'Drag one or more PNG images onto the uploader, or click to browse. You can keep adding more images before you export.' },
        { title: 'Arrange page order',      text: 'Reorder the PNGs with the ↑ and ↓ buttons, or drag the thumbnails into the sequence you want them to appear.' },
        { title: 'Pick page settings',      text: 'Choose A4, Letter, Legal, or “Fit to Image” (one page per PNG at its native size), set orientation, and adjust margins if needed.' },
        { title: 'Download the PDF',        text: 'Click Convert to PDF — the file downloads immediately from your browser. Nothing is sent to a server.' },
      ],
    },
    features: [
      { icon: 'bi-filetype-png',        title: 'Pure PNG support',    text: 'Purpose-built for PNG files — keep crisp line art, screenshots and logos without re-encoding artefacts.' },
      { icon: 'bi-shield-lock',         title: '100% private',        text: 'Every conversion happens on your device with pdf-lib. Your PNGs never travel over the network.' },
      { icon: 'bi-file-earmark-ruled',  title: 'A4, Letter, Legal…',  text: 'Choose a standard page size, or use Fit to Image to match each PDF page to its source PNG exactly.' },
      { icon: 'bi-arrows-angle-expand', title: 'Orientation + margin',text: 'Toggle portrait / landscape and dial in a margin — ideal for printable reports and documentation.' },
      { icon: 'bi-infinity',            title: 'No limits',           text: 'No page cap, no daily quota, no signup, no watermark. Convert as often as you like.' },
    ],
    faqs: [
      { q: 'How do I convert PNG to PDF for free?',           a: 'Drop your PNGs onto this page, pick a page size, and click Convert to PDF. The download starts instantly — no account, no watermark.' },
      { q: 'Are my PNG images uploaded anywhere?',            a: 'No. MyEasyPDF runs entirely in your browser using pdf-lib. Your PNGs never leave your device.' },
      { q: 'Can I combine multiple PNGs into one PDF?',       a: 'Yes — add as many PNGs as you like, reorder them by drag-and-drop, and the converter stitches them into a single PDF with one image per page.' },
      { q: 'Is there a limit on PNG file size?',              a: 'There is no server-side limit. The practical limit is your device’s memory — large batches work best on desktop browsers.' },
      { q: 'Does the PDF keep PNG transparency?',             a: 'PNGs are placed on an opaque page background, so transparent areas appear white in the exported PDF (PDF pages don’t themselves support transparency).' },
      { q: 'Will the PNG to PDF converter add a watermark?',  a: 'Never. The output PDF is clean, with no branding or extra pages.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     PDF TO IMAGE
  ═════════════════════════════════════════════════════════ */
  'pdf-to-image': {
    h1: 'Convert PDF to JPG or PNG — free online converter',
    intro: [
      'Export every page of a PDF as a high-quality JPG or PNG image. MyEasyPDF’s free PDF-to-image converter runs entirely in your browser — no watermarks, no sign-up, nothing uploaded.',
      'It’s ideal for creating social-media previews, turning a certificate into a shareable photo, or extracting pictures from a PDF report without fiddly screenshots.',
    ],
    howTo: {
      title: 'How to convert PDF to image',
      steps: [
        { title: 'Upload a PDF',       text: 'Drop your PDF into the upload area, or click to browse. Every page is rendered as a selectable thumbnail.' },
        { title: 'Pick format and scale', text: 'Choose PNG for lossless quality (with transparency) or JPG for smaller files, then drag the Resolution Scale slider between 1× and 4× — higher scale means sharper images and larger files.' },
        { title: 'Pick the pages you want', text: 'Click thumbnails to include them, or use Select All / Deselect All. Only selected pages are exported.' },
        { title: 'Download your images', text: 'Download a single page, Download Selected, or grab a ZIP with every selected page as its own image file.' },
      ],
    },
    features: [
      { icon: 'bi-card-image',    title: 'JPG and PNG output',   text: 'JPG for small files and fast sharing, PNG for lossless quality with transparency support.' },
      { icon: 'bi-aspect-ratio',  title: 'Resolution scale 1×–4×', text: 'Slide from 1× (screen-ready) up to 4× (print-ready). The preview shows the exact pixel dimensions of every page.' },
      { icon: 'bi-hdd-stack',     title: 'Batch download as ZIP',text: 'Export every selected page at once as a ZIP of sequentially named images.' },
      { icon: 'bi-check2-square', title: 'Select which pages',   text: 'Toggle pages on or off with a click, or use Select All / Deselect All to convert exactly what you need.' },
      { icon: 'bi-shield-lock',   title: 'Private conversion',   text: 'Rendering is done in-browser using pdf.js. Your PDF never touches a server.' },
    ],
    faqs: [
      { q: 'What resolution do exported images have?', a: 'The Resolution Scale slider goes from 1× (roughly screen-sized, great for web) to 4× (print-quality, sharp on paper). Higher scale means bigger files and longer render time.' },
      { q: 'Can I convert only specific pages?',       a: 'Yes — click any thumbnail to select it, or use Select All / Deselect All. Download Selected only exports the pages you ticked.' },
      { q: 'Is the conversion lossless?',              a: 'PNG output is lossless and keeps transparency. JPG uses high-quality encoding that looks identical to the PDF for most documents, at a fraction of the file size.' },
      { q: 'How do I convert every page at once?',     a: 'Hit Select All, then Download All as ZIP — you’ll get one archive with every page as a separate PNG or JPG, numbered in order.' },
      { q: 'How is this different from a screenshot?', a: 'Screenshots are capped at your screen resolution and include toolbars. This tool renders pages at full PDF resolution with no UI chrome.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     ROTATE PDF
  ═════════════════════════════════════════════════════════ */
  'rotate-pdf': {
    h1: 'Rotate PDF pages online — permanent, free, no upload',
    intro: [
      'Fix sideways pages in any PDF and save the rotation permanently. MyEasyPDF’s free online PDF rotator lets you rotate every page, selected pages, or individual pages — 90° left or 90° right — straight from your browser. Apply the rotation twice to flip a page 180°.',
      'Great for scanned documents that came in the wrong orientation, photos converted to PDF, or forms that display fine on screen but print sideways.',
    ],
    howTo: {
      title: 'How to rotate a PDF',
      steps: [
        { title: 'Upload the PDF',          text: 'Drop the file into the upload area. The tool renders every page as a thumbnail.' },
        { title: 'Rotate what you need',    text: 'Select pages then hit Rotate Selected, use Rotate All, or use the ↺ 90° / ↻ 90° buttons on any single thumbnail. Click again for 180°.' },
        { title: 'Download the fixed PDF',  text: 'Click “Download rotated PDF”. Rotations are baked into the file, so they persist in every PDF reader.' },
      ],
    },
    features: [
      { icon: 'bi-arrow-clockwise', title: 'Per-page control',   text: 'Rotate a single page, a range, or every page — with separate Reset buttons to undo any mistake.' },
      { icon: 'bi-fullscreen',      title: 'Rotate in 90° steps',text: 'Rotate 90° clockwise or 90° anti-clockwise per click — apply twice for a 180° flip.' },
      { icon: 'bi-shield-lock',     title: 'Nothing uploaded',   text: 'Your PDF stays on your device — rotation is applied client-side with pdf-lib.' },
      { icon: 'bi-patch-check',     title: 'Permanent rotation', text: 'Unlike a PDF reader’s “View rotated”, rotations saved here are permanent across every app.' },
    ],
    faqs: [
      { q: 'Does rotation reduce PDF quality?',   a: 'No. Rotation only changes page metadata — the underlying text and images are untouched, so there is zero quality loss.' },
      { q: 'Can I rotate just one page?',         a: 'Yes. Every thumbnail has its own ↺ and ↻ buttons, and a per-page Reset to revert that page only.' },
      { q: 'Is the rotation permanent?',          a: 'Yes — rotations are written into the PDF itself, so they persist no matter which PDF viewer opens the file afterwards.' },
      { q: 'Will my file get uploaded?',          a: 'No. The whole rotation happens in your browser. Your PDF never leaves your machine.' },
    ],
    related: [
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     SIGN PDF
  ═════════════════════════════════════════════════════════ */
  'sign-pdf': {
    h1: 'Sign PDF online — free e-signature, no account needed',
    intro: [
      'Add a real handwritten signature to any PDF — for free, without creating an account, and without uploading your document anywhere. MyEasyPDF’s PDF signature tool lets you draw or type a signature, choose its colour, and drop it on one or many pages of your PDF.',
      'Perfect for contracts, NDAs, rental agreements, offer letters or any document that needs a quick e-signature. The finished PDF looks exactly like a printed and signed copy — but faster, and fully private.',
    ],
    howTo: {
      title: 'How to sign a PDF',
      steps: [
        { title: 'Open the PDF',           text: 'Drag and drop your PDF or pick it from your device.' },
        { title: 'Create your signature',  text: 'Draw on the signature pad with your mouse or finger, or type your name in a cursive font. Pick any ink colour — the built-in swatches or a custom hex code.' },
        { title: 'Pick which pages to sign', text: 'Use the pages selector to tick one, several, or all pages. A handy “All pages” switch signs every page in one tap.' },
        { title: 'Place and resize',       text: 'Drag the signature into position on the page preview and drag its corners to resize. Use Previous / Next to move between pages.' },
        { title: 'Download signed PDF',    text: 'Hit “Download signed PDF” and save the final file — every signature is flattened into the document.' },
      ],
    },
    features: [
      { icon: 'bi-pen',            title: 'Draw or type',         text: 'Two fast ways to create a signature — sketch with your finger / mouse, or type your name in a handwriting font.' },
      { icon: 'bi-palette',        title: 'Any ink colour',       text: 'Pick from preset swatches or enter a custom hex code — great for matching blue ink on scanned forms.' },
      { icon: 'bi-files',          title: 'Sign multiple pages',  text: 'Tick individual pages or flip the All-pages switch to sign every page with one click — useful for initialling contracts.' },
      { icon: 'bi-shield-lock',    title: 'Sign without uploading', text: 'Your contract never touches our servers. The entire signing process runs in your browser.' },
      { icon: 'bi-aspect-ratio',   title: 'Drag and resize',      text: 'Position the signature anywhere on the page preview and scale it to the exact size you want.' },
      { icon: 'bi-patch-check',    title: 'No watermarks',        text: 'The signed PDF is indistinguishable from a printed and hand-signed original — clean and professional.' },
    ],
    whyUs: {
      title: 'Is an online PDF signature legal?',
      paragraphs: [
        'In most countries, including the United States (ESIGN Act), European Union (eIDAS) and India (IT Act), a simple electronic signature has the same legal weight as a handwritten one for ordinary business contracts. This tool produces a simple electronic signature — it is perfect for informal agreements, internal sign-offs and most business contracts, but not a qualified digital signature with a certificate.',
      ],
    },
    faqs: [
      { q: 'Is my signed contract sent to your server?', a: 'No. Signing happens 100% in your browser, so confidential contracts never leave your device.' },
      { q: 'Can I sign on mobile?',                      a: 'Yes — the signature pad works with touch input, so you can sign with a finger or stylus on any modern smartphone.' },
      { q: 'Can I sign multiple pages at once?',         a: 'Yes. The pages selector lets you tick several pages, and the All-pages switch applies your signature to every page in one click — perfect for initialling long contracts.' },
      { q: 'Can I change the signature colour?',         a: 'Yes. Use the built-in swatches (black, blue, red and more) or paste a custom hex code to match a specific ink colour on a scanned form.' },
      { q: 'Does the signature stay editable?',          a: 'After download the signature is flattened into the PDF so it cannot be moved or removed, making the signed document tamper-evident.' },
      { q: 'Is this legally binding?',                   a: 'A typed or drawn signature counts as a simple electronic signature, which is legally binding for most contracts in the US (ESIGN), EU (eIDAS) and India (IT Act).' },
    ],
    related: [
      { name: 'Add Watermark',    href: '/add-watermark', icon: 'bi-droplet' },
      { name: 'Add Page Numbers', href: '/add-page-numbers', icon: 'bi-123' },
      { name: 'Merge PDF',        href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'All PDF Tools',    href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     CAMERA TO PDF
  ═════════════════════════════════════════════════════════ */
  'camera-to-pdf': {
    h1: 'Scan documents to PDF with your phone camera',
    intro: [
      'Use your phone camera to scan documents, receipts, ID cards or whiteboards straight into a PDF. MyEasyPDF’s camera-to-PDF tool is a free, browser-based alternative to apps like CamScanner — with no installs, no ads and no uploads.',
      'The tool is built for mobile (open it on your phone) so you can snap one or more pages, clean them up with a one-tap filter, and export a tidy multi-page PDF in under a minute.',
    ],
    howTo: {
      title: 'How to scan to PDF',
      steps: [
        { title: 'Open on your phone',   text: 'The scanner is designed for mobile cameras, so open /camera-to-pdf on your phone. On desktop the page gracefully points you to the alternatives.' },
        { title: 'Allow camera access',  text: 'Tap to start the camera and grant permission. The tool automatically picks your rear-facing camera for the best focus on paper.' },
        { title: 'Capture your pages',   text: 'Frame each page and tap the shutter. Keep, or hit Retake if it’s blurry. Carry on until every page is scanned.' },
        { title: 'Apply a filter',       text: 'Pick a filter per photo — None, Enhance (auto-contrast), Grayscale, or Document (high-contrast black & white for printed text).' },
        { title: 'Export as PDF',        text: 'Reorder or delete captures, name the file, pick a page size and orientation, then tap Export to download a multi-page PDF.' },
      ],
    },
    features: [
      { icon: 'bi-phone',            title: 'Mobile-first scanner',  text: 'Opens your phone’s rear camera for quick, sharp captures — just like a dedicated scanner app, but in the browser.' },
      { icon: 'bi-magic',            title: 'One-tap filters',       text: 'Enhance, Grayscale or Document mode turn a phone photo into a clean, high-contrast page the way CamScanner does.' },
      { icon: 'bi-arrows-move',      title: 'Reorder and retake',    text: 'Drag captures to reorder, retake any that didn’t come out, and delete ones you don’t need before exporting.' },
      { icon: 'bi-file-earmark-pdf', title: 'Multi-page PDF',        text: 'Every capture becomes a page in one combined PDF, with your choice of page size and orientation.' },
      { icon: 'bi-shield-lock',      title: 'Stays on your device',  text: 'Captures are stored in your browser memory only — nothing is uploaded to a server.' },
    ],
    faqs: [
      { q: 'Does it work on desktop?',           a: 'The scanner is built for phone cameras (open the page on your phone). Desktop visitors see a friendly notice and links to Image to PDF for webcam-free scanning.' },
      { q: 'Can I clean up blurry phone photos?',a: 'Yes. Apply the Enhance filter for auto-contrast, Grayscale for monochrome, or Document mode for sharp high-contrast black & white that mimics a real scanner.' },
      { q: 'Does it need a camera app install?', a: 'No. It uses the browser’s native camera API (getUserMedia), so it works without installing anything.' },
      { q: 'Are the scans uploaded?',            a: 'No. Captures stay in browser memory and are converted to a PDF right there on your device.' },
      { q: 'Is it free?',                        a: 'Yes — unlike CamScanner’s paid tier, MyEasyPDF’s camera-to-PDF is free with no watermarks and no page limit.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Sign PDF',      href: '/sign-pdf',      icon: 'bi-pen' },
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     REMOVE PAGES
  ═════════════════════════════════════════════════════════ */
  'remove-pages': {
    h1: 'Remove pages from PDF — free online tool',
    intro: [
      'Delete unwanted pages from a PDF and download the cleaned-up document — free, fast and private. MyEasyPDF renders every page as a thumbnail so you can click to remove blank pages, duplicates or confidential sections before sharing.',
      'No sign-up, no uploads, no watermarks. Your PDF stays on your device the whole time.',
    ],
    howTo: {
      title: 'How to remove PDF pages',
      steps: [
        { title: 'Upload the PDF',         text: 'Drop your PDF into the upload area. The tool shows a thumbnail for every page.' },
        { title: 'Click pages to remove',  text: 'Tap any page to mark it for removal — a red overlay shows it’s out. Tap again to keep it. Repeat until only the pages you want to drop are marked.' },
        { title: 'Download the new PDF',   text: 'Click Download to save a new PDF that contains only the remaining pages.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-x', title: 'Visual page remover', text: 'See thumbnails of every page so you always know what you’re deleting.' },
      { icon: 'bi-shield-lock',    title: 'Stays on your device',text: 'Processing is done in your browser — your PDF is never uploaded.' },
      { icon: 'bi-arrow-counterclockwise', title: 'Reversible until download', text: 'Click any crossed-out page again to keep it. Nothing is finalised until you hit Download.' },
    ],
    faqs: [
      { q: 'Is the original PDF changed?',    a: 'No. A fresh PDF is generated with only the pages you kept. Your original file is untouched.' },
      { q: 'Is there a page limit?',          a: 'No artificial limit. Most devices handle hundreds of pages without slowdown.' },
      { q: 'Are my pages really not uploaded?', a: 'Correct — the tool uses pdf-lib in your browser, so nothing is sent to any server.' },
    ],
    related: [
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     EXTRACT PAGES
  ═════════════════════════════════════════════════════════ */
  'extract-pages': {
    h1: 'Extract pages from PDF online — free and private',
    intro: [
      'Pull specific pages out of a PDF into a new smaller document. MyEasyPDF’s online extractor lets you pick pages visually from a thumbnail grid and saves the selection as a fresh PDF — free, no sign-up, no uploads.',
      'Perfect for sharing a single chapter from a long report or isolating an invoice page from a bulk document.',
    ],
    howTo: {
      title: 'How to extract PDF pages',
      steps: [
        { title: 'Upload the PDF',           text: 'Drop the file in — every page appears as a clickable thumbnail.' },
        { title: 'Select pages to extract',  text: 'Click any page thumbnail to include it (selected pages get a green border). Use Select All / Deselect All for fast bulk selection.' },
        { title: 'Download the new PDF',     text: 'Hit Extract and download a brand-new PDF containing just the pages you chose, in their original order.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-plus', title: 'Visual selection', text: 'Click thumbnails to include them — ideal when page numbers aren’t obvious at a glance.' },
      { icon: 'bi-check2-all',        title: 'Select All / Deselect All', text: 'Flip every thumbnail on or off in a single click — handy when you need most of a PDF but want to deselect a few.' },
      { icon: 'bi-shield-lock',       title: 'Private by design',text: 'Files are processed in your browser and never sent to a server.' },
    ],
    faqs: [
      { q: 'How is this different from splitting a PDF?', a: 'Extract keeps specific pages into a single new PDF. Split can break a document into multiple PDFs at once. Use whichever matches your goal.' },
      { q: 'Does the extracted PDF keep quality?',        a: 'Yes — pages are copied byte-for-byte, so text, images and fonts are unchanged.' },
      { q: 'Is it free?',                                 a: 'Yes. MyEasyPDF has no paid tier and never adds a watermark.' },
    ],
    related: [
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     ORGANIZE PDF
  ═════════════════════════════════════════════════════════ */
  'organize-pdf': {
    h1: 'Organize PDF pages — reorder pages online',
    intro: [
      'Rearrange pages in a PDF into any order you need and save a freshly organised document — all from your browser, for free. Drag thumbnails around or nudge pages with arrow buttons until the flow is right, then hit Save.',
      'A complete PDF-organizer replacement that works offline-style: your PDF never leaves your device. Pair it with Rotate PDF or Remove Pages if you also need to rotate or delete pages.',
    ],
    howTo: {
      title: 'How to organize a PDF',
      steps: [
        { title: 'Upload the PDF',        text: 'Drop the file — you’ll see a thumbnail grid of every page.' },
        { title: 'Drag or nudge pages',   text: 'Drag a thumbnail to any new spot, or use the ← and → buttons under each page to move it one slot at a time. Each thumbnail shows its new position and what it used to be.' },
        { title: 'Save the organised PDF', text: 'Click Save PDF — a reordered copy downloads to your device and your original file is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-arrows-move',   title: 'Drag to reorder',      text: 'Grab any thumbnail and drop it wherever you want — the rest reflow automatically into the new order.' },
      { icon: 'bi-arrow-left-right', title: 'Arrow-button nudging', text: 'Prefer clicks to drags? Each page has ← and → buttons that move it one slot at a time — handy on a trackpad.' },
      { icon: 'bi-signpost-split', title: 'Position indicator',  text: 'Every thumbnail shows its new position and, if it moved, what the original position was — so you never lose track.' },
      { icon: 'bi-shield-lock',   title: 'Fully private',        text: 'All changes are applied in-browser with pdf-lib, so your PDF is never sent to a server.' },
    ],
    faqs: [
      { q: 'Can I also delete or rotate pages here?',           a: 'The Organize tool focuses on reordering. For deletions use Remove Pages, and for rotations use Rotate PDF — both are free and equally private.' },
      { q: 'Can I save changes without merging multiple PDFs?', a: 'Yes. This tool works on a single PDF. If you need to combine files, use Merge PDF first, then Organize the combined result.' },
      { q: 'Does the output keep bookmarks and links?',         a: 'Text, links and images inside each page are preserved. Document-level bookmarks may change if pages are reordered.' },
    ],
    related: [
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Rotate PDF',    href: '/rotate-pdf',    icon: 'bi-arrow-clockwise' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     ADD WATERMARK
  ═════════════════════════════════════════════════════════ */
  'add-watermark': {
    h1: 'Add watermark to PDF — free online watermark tool',
    intro: [
      'Stamp a text watermark like “Confidential”, “Draft” or your company name across every page of a PDF. MyEasyPDF’s watermark tool is free, 100% in-browser, and lets you preview the result on every page before export.',
      'Set text, opacity, colour, font size and position globally, or customise any individual page — useful for sample chapters, watermarked previews, or confidentiality marks.',
    ],
    howTo: {
      title: 'How to add a watermark to PDF',
      steps: [
        { title: 'Upload your PDF',      text: 'Drop the file into the upload area. Thumbnails render instantly and the live preview updates as you tweak the settings.' },
        { title: 'Configure the watermark', text: 'Type the watermark text, then pick opacity (5–80%), font size (16–90pt), colour (Gray / Red / Blue / Green / Black) and one of eight positions (diagonal, centre, top / bottom / left / right).' },
        { title: 'Override on specific pages', text: 'Click any page to open “Customize this page” and override its font size or position — perfect when one spread needs a bigger stamp or a different corner.' },
        { title: 'Download the watermarked PDF', text: 'Hit Download — the watermark is rendered into every page permanently and the file saves straight to your device.' },
      ],
    },
    features: [
      { icon: 'bi-droplet',         title: '8 preset positions', text: 'Diagonal, centre, top / bottom centre, and all four corners — one click sets the look across the whole document.' },
      { icon: 'bi-droplet-half',    title: 'Opacity control',    text: 'Slide opacity from 5% (a subtle background stamp) up to 80% (a loud CONFIDENTIAL flag) — whichever fits your use case.' },
      { icon: 'bi-palette',         title: 'Colour + font size', text: 'Choose from Gray, Red, Blue, Green or Black, and pick any font size between 16pt and 90pt for tiny footers or big diagonal stamps.' },
      { icon: 'bi-sliders',         title: 'Per-page overrides', text: 'Expand any page to override its font size or position — great for title pages, landscape spreads or sample-only chapters.' },
      { icon: 'bi-eye',             title: 'Live preview',       text: 'See exactly how the watermark will look on every page before you export — no guessing, no wasted renders.' },
      { icon: 'bi-shield-lock',     title: 'Private by default', text: 'Files are watermarked locally in your browser — they’re never uploaded.' },
    ],
    faqs: [
      { q: 'Can I change the watermark opacity?',  a: 'Yes — drag the opacity slider between 5% and 80% to go from a faint background stamp to a loud CONFIDENTIAL flag, with live preview on every page.' },
      { q: 'What colours can the watermark be?',   a: 'The picker offers Gray, Red, Blue, Green and Black — the colours that look right against typical PDF backgrounds without overpowering the content.' },
      { q: 'Can I watermark only some pages?',     a: 'Yes. Click any page to customise or skip it — great for keeping a cover page clean while watermarking everything else.' },
      { q: 'Is the watermark removable?',          a: 'The watermark is flattened into the PDF content stream, so it cannot be removed with a normal PDF reader.' },
      { q: 'Can I use a logo image?',              a: 'The current version supports text watermarks with opacity, colour and size. Image-watermark support is on the roadmap.' },
    ],
    related: [
      { name: 'Add Page Numbers', href: '/add-page-numbers', icon: 'bi-123' },
      { name: 'Sign PDF',         href: '/sign-pdf',         icon: 'bi-pen' },
      { name: 'Merge PDF',        href: '/merge-pdf',        icon: 'bi-layers-fill' },
      { name: 'All PDF Tools',    href: '/all-pdf-tools',    icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     ADD PAGE NUMBERS
  ═════════════════════════════════════════════════════════ */
  'add-page-numbers': {
    h1: 'Add page numbers to PDF — free online tool',
    intro: [
      'Insert page numbers into any PDF in one click. Pick a position, size and starting number, preview the result on every page, and download the new PDF — free, private and without any sign-up.',
      'Useful for theses, reports, e-books and legal documents where page numbering is mandatory.',
    ],
    howTo: {
      title: 'How to add page numbers',
      steps: [
        { title: 'Upload the PDF',      text: 'Drag and drop the file into the upload area. Every page renders as a thumbnail in seconds.' },
        { title: 'Pick position and format', text: 'Choose one of six positions (top / bottom × left / centre / right), set the start number, and slide font size (8–24pt) and edge margin (5–60pt) to taste.' },
        { title: 'Preview and download', text: 'Every thumbnail updates live as you tweak the settings. When the preview looks right, click Add Page Numbers & Download.' },
      ],
    },
    features: [
      { icon: 'bi-123',          title: '6 positions',      text: 'Top-left, top-centre, top-right, bottom-left, bottom-centre, bottom-right — pick the one your document style demands.' },
      { icon: 'bi-eye',          title: 'Live preview',     text: 'Every page thumbnail updates instantly so you know exactly what the output will look like before you download.' },
      { icon: 'bi-sort-numeric-down', title: 'Custom start number', text: 'Begin numbering from any value — handy when a chapter should start at 15 instead of 1.' },
      { icon: 'bi-aspect-ratio', title: 'Size and margin',  text: 'Dial the font size between 8pt and 24pt and set an edge margin between 5pt and 60pt so the numbers sit right where you want them.' },
      { icon: 'bi-shield-lock',  title: 'Nothing uploaded', text: 'Page numbers are drawn on the PDF in your browser — your file never leaves your device.' },
    ],
    faqs: [
      { q: 'Can I start the numbering from a value other than 1?', a: 'Yes — the Start From field accepts any number, so the first page can be labelled 15, 100 or anything else. Every page after that increments from there.' },
      { q: 'Do I need to skip a cover page?',      a: 'Currently the tool numbers every page in the PDF. If you don’t want a number on the cover, use Split PDF to separate it, number the rest, and merge the cover back in with Merge PDF.' },
      { q: 'Will existing page content be covered?', a: 'The margin slider keeps numbers inside the page margins by default, avoiding body text. Dial the margin up if your document has an unusually large text area.' },
      { q: 'Can I change the font?',              a: 'The current version uses a clean Helvetica-style font that matches most documents. Custom-font support is on the roadmap.' },
    ],
    related: [
      { name: 'Add Watermark', href: '/add-watermark', icon: 'bi-droplet' },
      { name: 'Sign PDF',      href: '/sign-pdf',      icon: 'bi-pen' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     JPG TO PDF
  ═════════════════════════════════════════════════════════ */
  'jpg-to-pdf': {
    h1: 'JPG to PDF converter — free, online, no upload',
    intro: [
      'Convert JPG photos into a polished PDF document in seconds. MyEasyPDF's free JPG-to-PDF tool runs entirely in your browser — no account needed, nothing uploaded, and no watermark ever added to the output.',
      'Upload one photo or a whole batch of JPEGs, drag thumbnails to arrange the page order, pick a page size and orientation, and download a clean PDF immediately. Perfect for scanning receipts, sharing product photos as a document, or bundling homework images for a teacher.',
    ],
    howTo: {
      title: 'How to convert JPG to PDF',
      steps: [
        { title: 'Upload your JPG files',   text: 'Drag and drop one or more JPEG images onto the tool, or click to browse. You can add more files at any time before converting.' },
        { title: 'Arrange the pages',       text: 'Use the ↑ and ↓ arrows — or drag thumbnails — to set the order pages will appear in the PDF. Remove any image you don\'t need.' },
        { title: 'Choose PDF settings',     text: 'Pick a page size (A4, A3, Letter, Legal, or Fit to Image), portrait or landscape orientation, and a custom page margin.' },
        { title: 'Download the PDF',        text: 'Click "Convert to PDF" — the file is built in your browser and downloads immediately. Your JPEGs are never uploaded anywhere.' },
      ],
    },
    features: [
      { icon: 'bi-image',                   title: 'JPEG & JPG accepted',  text: 'Upload standard .jpg or .jpeg files — the converter handles both extensions at any quality level.' },
      { icon: 'bi-file-earmark-ruled',      title: 'A4, A3, Letter & more',text: 'Choose a standard page size or use "Fit to Image" to match each PDF page exactly to the source photo.' },
      { icon: 'bi-shield-lock',             title: '100% private',         text: 'All conversion happens in your browser using pdf-lib. Your photos never leave your device.' },
      { icon: 'bi-infinity',                title: 'No limits',            text: 'No file size cap, no page limit, no daily quota, no sign-up required.' },
      { icon: 'bi-patch-check',             title: 'No watermarks',        text: 'The output PDF is clean — we never stamp a logo or watermark on your document.' },
      { icon: 'bi-arrows-angle-expand',     title: 'Custom margin',        text: 'Dial in a margin with the slider for a professional-looking PDF with breathing room around your photos.' },
    ],
    whyUs: {
      title: 'Why convert JPGs to PDF without uploading?',
      paragraphs: [
        'Most JPG-to-PDF services send your photos to a remote server, which raises real privacy concerns for ID cards, receipts and personal images. MyEasyPDF converts JPEG files to PDF entirely inside your browser — nothing is ever transmitted over the network.',
        'There are no limits on file count or size, no watermarks, and no premium tier. Just drop your photos in and get a PDF.',
      ],
    },
    faqs: [
      { q: 'How do I convert JPG to PDF for free?',                 a: 'Upload your JPG files, arrange them in order, pick a page size, and click "Convert to PDF". The download starts instantly — no account, no watermark, 100% free.' },
      { q: 'Can I combine multiple JPGs into one PDF?',              a: 'Yes. Drop as many JPEG images as you like, drag them into the order you want, and the converter stitches them into a single PDF — one image per page.' },
      { q: 'Are my JPG photos uploaded to a server?',               a: 'No. MyEasyPDF converts JPEG to PDF entirely in your browser with pdf-lib. Your photos never leave your device.' },
      { q: 'What page sizes are available?',                        a: 'A4, A3, Letter, Legal, and Fit to Image. "Fit to Image" sizes each PDF page to match the source JPEG exactly — great for photos of any aspect ratio.' },
      { q: 'Does converting JPG to PDF reduce image quality?',      a: 'No. The JPEG is embedded into the PDF at its original quality — no re-compression is applied.' },
      { q: 'Can I convert .jpeg files too?',                        a: 'Yes — JPEG and JPG are the same format. The converter accepts both .jpg and .jpeg file extensions.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'PNG to PDF',    href: '/png-to-pdf',    icon: 'bi-filetype-png' },
      { name: 'PDF to JPG',    href: '/pdf-to-jpg',    icon: 'bi-card-image' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     PDF TO JPG
  ═════════════════════════════════════════════════════════ */
  'pdf-to-jpg': {
    h1: 'PDF to JPG converter — free, online, no upload',
    intro: [
      'Convert PDF pages into high-quality JPEG images right in your browser. MyEasyPDF's free PDF-to-JPG converter requires no sign-up, uploads nothing to any server, and adds no watermark to your exported images.',
      'Perfect for turning presentation slides into shareable photos, creating social-media previews from a report, or extracting a specific image from a PDF without taking a screenshot.',
    ],
    howTo: {
      title: 'How to convert PDF to JPG',
      steps: [
        { title: 'Upload your PDF',           text: 'Drop the PDF into the upload area. Every page is rendered as a selectable thumbnail.' },
        { title: 'Set quality and resolution',text: 'The format defaults to JPEG. Drag the Resolution Scale slider from 1× (screen-ready) up to 4× (print-quality) for sharper images.' },
        { title: 'Select the pages to export',text: 'Click thumbnails to include them, or use "Select All" / "Deselect All" for quick bulk selection.' },
        { title: 'Download your JPEGs',       text: 'Hit "Download Selected" for one image, or download a ZIP archive for multiple pages. All files are exported as JPEG.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-image',  title: 'JPEG output',           text: 'Exports pages as compact JPEG files — ideal for email attachments, social media and web use.' },
      { icon: 'bi-aspect-ratio',        title: 'Resolution scale 1×–4×', text: 'From 96 DPI screen-ready to 384 DPI print-quality — one slider controls the sharpness of every exported page.' },
      { icon: 'bi-check2-square',       title: 'Choose which pages',    text: 'Select any combination of pages — only the ones you pick are converted and downloaded.' },
      { icon: 'bi-hdd-stack',           title: 'Batch ZIP download',    text: 'Download all selected JPEGs at once as a tidy, numbered ZIP archive.' },
      { icon: 'bi-shield-lock',         title: 'Nothing uploaded',      text: 'Pages are rendered in-browser with pdf.js. Your PDF never reaches any server.' },
      { icon: 'bi-patch-check',         title: 'No watermarks',         text: 'Clean JPEG output — no logos, no banners, no MyEasyPDF branding on your images.' },
    ],
    whyUs: {
      title: 'Convert PDF to JPEG without uploading',
      paragraphs: [
        'Cloud-based PDF-to-JPEG converters upload your file — often a confidential report or private document — to a third-party server before returning images. MyEasyPDF renders every page using pdf.js entirely within your browser, so nothing is ever transmitted.',
        'There is no file size limit, no trial tier, and no watermark on the output. Convert as many pages as you need, as often as you like, for free.',
      ],
    },
    faqs: [
      { q: 'How do I convert a PDF to JPG for free?',             a: 'Upload your PDF, keep the format set to JPEG, select the pages you want, and click Download. The JPEG files are generated in-browser and download instantly — no account required.' },
      { q: 'What resolution are the exported JPEGs?',             a: 'The Resolution Scale slider goes from 1× (roughly 96 DPI, great for screens and web) up to 4× (roughly 384 DPI, sharp enough for print). Higher scale means larger files.' },
      { q: 'Can I convert every page of a PDF to JPEG at once?',  a: 'Yes — click "Select All", then "Download All as ZIP" and you get every page as a separate numbered JPEG in one archive.' },
      { q: 'Is my PDF uploaded to a server?',                     a: 'No. The conversion runs entirely in your browser using pdf.js. Your PDF is never uploaded anywhere.' },
      { q: 'Is JPEG lower quality than PNG?',                     a: 'JPEG uses lossy compression so files are smaller. At 2× scale or higher the output looks excellent for most documents. Use "PNG" format if you need lossless quality or transparency.' },
      { q: 'Will the JPEGs have a watermark?',                    a: 'No. MyEasyPDF never adds watermarks, logos or banners to exported images.' },
    ],
    related: [
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Compress PDF',  href: '/compress-pdf',  icon: 'bi-file-zip' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═════════════════════════════════════════════════════════
     CROP PDF
  ═════════════════════════════════════════════════════════ */
  'crop-pdf': {
    h1: 'Crop PDF online — trim margins & whitespace for free',
    intro: [
      'Crop any PDF right in your browser. Drag an adjustable crop rectangle over a page preview, apply the same crop to every page (or just the current one), and download a cleaner PDF with margins, whitespace or scanner borders trimmed away.',
      'The tool is 100% free, requires no account, and never uploads your file — perfect for tidying up scanned pages, cropping the black borders from photocopies, or zooming a presentation into its key area.',
    ],
    howTo: {
      title: 'How to crop a PDF',
      steps: [
        { title: 'Upload your PDF',       text: 'Drag and drop the PDF, or click to browse. Each page is rendered as a thumbnail on the left.' },
        { title: 'Adjust the crop box',   text: 'On the big preview, drag the crop rectangle to move it, or grab any corner / edge handle to resize it. Everything outside the box gets cropped away.' },
        { title: 'Choose how to apply',   text: 'Pick “All pages” to crop every page the same way, or “Current page only” to crop just the page you’re viewing.' },
        { title: 'Download the cropped PDF', text: 'Click Crop & Download — the tool writes a new PDF in-browser with trimmed pages and your original file is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-crop',           title: 'Drag-and-resize crop box', text: 'Eight handles (four corners + four edges) let you dial in the exact crop area with pixel precision.' },
      { icon: 'bi-files',          title: 'Apply to all pages',       text: 'One click applies the same crop rectangle across every page — ideal for removing identical scanner margins.' },
      { icon: 'bi-file-earmark',   title: 'Or just one page',         text: 'Need to crop a single page differently? Switch to Current Page mode and crop it independently.' },
      { icon: 'bi-patch-check',    title: 'Quality preserved',        text: 'Cropping adjusts the PDF’s crop box metadata, so text stays selectable and images keep full resolution — no rasterisation.' },
      { icon: 'bi-shield-lock',    title: 'Runs in your browser',     text: 'Your PDF is processed locally using pdf-lib. Nothing is uploaded to any server.' },
    ],
    whyUs: {
      title: 'Why crop PDFs with MyEasyPDF',
      paragraphs: [
        'Most online PDF croppers upload your file to a remote server, process it there, and make you wait for a download link — risky if the PDF is confidential and slow if it’s large. MyEasyPDF crops PDFs entirely in your browser, so confidential contracts, bank statements and medical scans never leave your computer.',
        'Because we only update the PDF’s crop-box metadata, the text inside your document stays fully selectable and searchable after cropping — no loss of quality and no hidden conversion to images.',
      ],
    },
    faqs: [
      { q: 'What does cropping a PDF do?',            a: 'Cropping trims the visible area of each page, hiding margins, whitespace or unwanted borders. MyEasyPDF adjusts the PDF’s crop-box and media-box metadata, so text inside the kept area stays fully selectable.' },
      { q: 'Can I crop every page at once?',          a: 'Yes. Choose “All pages” and the crop rectangle you set on the preview is applied to every page in the document with a single click.' },
      { q: 'Does cropping reduce PDF file size?',     a: 'A little — cropping trims the viewable area but doesn’t re-encode images. If you also need a much smaller file, run the result through Compress PDF afterwards.' },
      { q: 'Is my PDF uploaded anywhere?',            a: 'No. The cropper uses pdf-lib and pdf.js entirely in your browser, so your file never touches a server.' },
      { q: 'Will cropping mess up selectable text?',  a: 'No. Unlike croppers that rasterise pages to an image, MyEasyPDF just updates the PDF’s crop metadata, so text remains selectable and searchable.' },
    ],
    related: [
      { name: 'Compress PDF',  href: '/compress-pdf',  icon: 'bi-file-zip' },
      { name: 'Rotate PDF',    href: '/rotate-pdf',    icon: 'bi-arrow-clockwise' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

};

export default seoContent;

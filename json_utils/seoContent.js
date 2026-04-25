/**
 * SEO body content for every tool + info page.
 *
 * Each entry is rendered by <SeoContent slug="..." /> and also
 * produces FAQPage / HowTo JSON-LD structured data.
 *
 * Writing guidelines:
 *  - Short sentences. Active voice. Plain English.
 *  - Use "you / your" to talk directly to the reader.
 *  - Lead every FAQ answer with the answer, not a preamble.
 *  - Mention "free", "no sign-up", "runs in browser" — our core advantage.
 */
const seoContent = {

  /* ═══════════════════════════════════════════════════════
     MERGE PDF
  ═══════════════════════════════════════════════════════ */
  'merge-pdf': {
    h1: 'Merge PDF files online — free, no sign-up required',
    intro: [
      'Combine two or more PDF files into one document — right in your browser, completely free. No account needed, no file size limit, and your files never leave your device.',
      'Add your PDFs, drag the pages into the order you want, remove any pages you don\'t need, then download one clean merged file. It takes less than a minute.',
    ],
    howTo: {
      title: 'How to merge PDF files — 3 simple steps',
      steps: [
        { title: 'Upload your PDFs', text: 'Click the upload area or drag your files in. You can add as many PDFs as you like. Use the "Add more" button to bring in extra files at any time.' },
        { title: 'Reorder and remove pages', text: 'Drag any page thumbnail to a new spot. Click the red × to remove pages you don\'t want. Everything is live — no waiting.' },
        { title: 'Download the merged PDF', text: 'Hit "Merge & Download". Your browser combines everything and saves one PDF to your device in seconds.' },
      ],
    },
    features: [
      { icon: 'bi-shield-lock',      title: 'Your files stay private',   text: 'Nothing is uploaded. Your PDFs are processed entirely inside your browser — not on any server.' },
      { icon: 'bi-infinity',         title: 'No file size limit',        text: 'Merge large PDFs without restrictions. The only limit is your device\'s memory.' },
      { icon: 'bi-arrows-move',      title: 'Drag to reorder pages',     text: 'Arrange pages from different PDFs in any order you need before merging.' },
      { icon: 'bi-x-circle',         title: 'Remove pages before merging', text: 'Click any page to exclude it — no need to edit each source PDF first.' },
      { icon: 'bi-patch-check',      title: 'No watermarks, ever',       text: 'The final PDF is completely clean. We never add logos or branding to your documents.' },
      { icon: 'bi-lightning-charge', title: 'Fast — seconds, not minutes', text: 'Merging dozens of PDFs usually takes just a few seconds thanks to pdf-lib running locally.' },
    ],
    whyUs: {
      title: 'Why merge PDFs with MyEasyPDF?',
      paragraphs: [
        'Most PDF mergers upload your files to a server, which is slow, risky for private documents, and often comes with size limits or watermarks unless you pay.',
        'MyEasyPDF works entirely in your browser. Contracts, medical records, financial documents — nothing is ever sent over the internet. It\'s safe for GDPR, HIPAA, and DPDP compliance.',
      ],
    },
    faqs: [
      { q: 'Is it really free to merge PDFs?',                          a: 'Yes, 100% free. No account, no trial, no hidden limits. Merge as many PDFs as you want, as often as you like.' },
      { q: 'Are my PDFs uploaded to a server?',                         a: 'No. Everything runs in your browser using JavaScript. Your files are never sent to any server.' },
      { q: 'How many PDFs can I merge at once?',                        a: 'There is no artificial limit. You can merge as many files as your device\'s memory allows — usually hundreds of pages without any issue.' },
      { q: 'Can I reorder pages from different PDFs?',                  a: 'Yes. After uploading, every page appears as a thumbnail. Drag any page to a new position, from any of the source files.' },
      { q: 'Will the merged PDF have a watermark?',                     a: 'Never. MyEasyPDF does not add any watermarks, banners, or branding to your merged file.' },
      { q: 'Does it work on iPhone and Android?',                       a: 'Yes. The tool works in any modern mobile browser. Very large PDFs may be slower on older phones due to limited memory.' },
    ],
    related: [
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'Compress PDF',  href: '/compress-pdf',  icon: 'bi-file-zip' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     SPLIT PDF
  ═══════════════════════════════════════════════════════ */
  'split-pdf': {
    h1: 'Split PDF online — free, fast, no upload needed',
    intro: [
      'Cut a PDF into smaller files, extract specific pages, or save every page as its own document — all in your browser, for free. No sign-up and nothing uploaded.',
      'Upload your PDF, select the pages to keep or remove, choose how you want to split, and download a ZIP with all your output files.',
    ],
    howTo: {
      title: 'How to split a PDF — step by step',
      steps: [
        { title: 'Upload your PDF',          text: 'Drag and drop your file or click to browse. The tool shows a thumbnail for every page.' },
        { title: 'Mark pages to remove',     text: 'Click the × on any page you want to drop from all output files. The remaining pages are what get split.' },
        { title: 'Choose your split mode',   text: 'Pick "one page per file" to get every page as a separate PDF, or enter custom ranges like "1-3, 5, 7-9" for custom splits.' },
        { title: 'Download the ZIP',         text: 'Click "Split PDF". All output files are bundled into a single ZIP so you download everything at once.' },
      ],
    },
    features: [
      { icon: 'bi-grid-3x3-gap',      title: 'Visual page selection',    text: 'Every page is shown as a thumbnail so you always know exactly what you\'re keeping.' },
      { icon: 'bi-input-cursor-text', title: 'Custom page ranges',       text: 'Type ranges like "1-3, 5, 8-10" to create one PDF per range. Great for splitting chapters.' },
      { icon: 'bi-file-zip',          title: 'One ZIP download',         text: 'All output PDFs are packed into a single ZIP file — one click to get everything.' },
      { icon: 'bi-shield-lock',       title: 'Files stay on your device', text: 'No server uploads. Splitting runs client-side in your browser.' },
      { icon: 'bi-patch-check',       title: 'No watermarks',            text: 'Split PDFs are clean — no banners, no branding added.' },
    ],
    whyUs: {
      title: 'Private PDF splitter — your files stay on your device',
      paragraphs: [
        'Splitting bank statements, contracts, or medical records on a cloud service is a real privacy risk. Your files get uploaded to a server you don\'t control.',
        'MyEasyPDF splits PDFs locally in your browser. Nothing travels over the network, so your sensitive documents stay completely private.',
      ],
    },
    faqs: [
      { q: 'How do I split a PDF into multiple files?',         a: 'Upload the PDF, enter your page ranges (e.g. "1-5, 6-10"), and click Split. You\'ll get a ZIP with one PDF per range.' },
      { q: 'Can I extract every page as a separate PDF?',       a: 'Yes. Switch the mode to "Extract each page as a separate PDF" and you\'ll get one file per page in the ZIP.' },
      { q: 'What do I get after splitting?',                    a: 'A ZIP file containing all your split PDFs. Unzip it with any built-in tool on Windows, Mac, or your phone.' },
      { q: 'Is my PDF uploaded to a server?',                   a: 'No. MyEasyPDF splits PDFs entirely in your browser using pdf-lib. Your file never leaves your computer.' },
      { q: 'Does splitting reduce PDF quality?',                a: 'No. Pages are copied exactly from the source PDF, so text, images, and fonts stay at full quality.' },
    ],
    related: [
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     COMPRESS PDF
  ═══════════════════════════════════════════════════════ */
  'compress-pdf': {
    h1: 'Compress PDF online — reduce file size for free',
    intro: [
      'Make your PDF smaller in seconds — no sign-up, nothing uploaded, and no watermark added. MyEasyPDF compresses PDFs directly in your browser, so large files stay private.',
      'Choose a quality preset or type an exact target size like "500 KB". You\'ll see the exact file size savings before you download.',
    ],
    howTo: {
      title: 'How to compress a PDF',
      steps: [
        { title: 'Upload your PDF',           text: 'Drop your PDF into the upload area.' },
        { title: 'Pick a compression level',  text: 'Choose High, Medium, or Low quality for a quick result — or switch to "Target File Size" and type the exact size you need (e.g. 500 KB).' },
        { title: 'See the savings',           text: 'The tool shows your original size, compressed size, and the percentage saved so you know exactly what you got.' },
        { title: 'Download the smaller PDF',  text: 'Click Download. The compressed file saves to your device. Your original file is not changed.' },
      ],
    },
    features: [
      { icon: 'bi-arrow-down-circle', title: 'Up to 90% smaller',    text: 'Image-heavy PDFs regularly shrink from 20 MB to under 2 MB with no visible quality difference.' },
      { icon: 'bi-sliders',           title: 'Three quality presets', text: 'High, Medium, or Low — pick the one that balances quality and size for your use case.' },
      { icon: 'bi-bullseye',          title: 'Hit an exact file size', text: 'Enter a target size like 2 MB and the tool finds the best quality that still fits under your limit.' },
      { icon: 'bi-shield-lock',       title: 'Files never uploaded',  text: 'Compression runs in your browser. Confidential documents never reach a server.' },
      { icon: 'bi-patch-check',       title: 'Text stays sharp',      text: 'Only embedded images are re-encoded. Text stays selectable and links still work.' },
    ],
    whyUs: {
      title: 'Compress PDFs without uploading them',
      paragraphs: [
        'Most online compressors upload your PDF to a cloud server, wait in a queue, then email you a download link. That\'s slow and not private.',
        'MyEasyPDF compresses entirely in your browser — no upload delay, no privacy trade-off, and no limit on how many files you compress.',
      ],
    },
    faqs: [
      { q: 'How do I compress a PDF to under 1 MB?',      a: 'Switch to "Target File Size" mode, type "1 MB" (or any size), and the tool automatically finds the best compression to hit your target.' },
      { q: 'How much smaller will my PDF get?',           a: 'PDFs with lots of photos often shrink 70–90%. Text-only PDFs are already efficient, so savings are usually 5–20%.' },
      { q: 'Will compressing affect text quality?',       a: 'No. Text and vector graphics are untouched. Only embedded images are compressed at a lower quality.' },
      { q: 'Is there a file size limit?',                 a: 'No artificial limit. The only constraint is your device\'s memory. Most laptops handle files over 100 MB without issues.' },
      { q: 'Is this free?',                               a: 'Yes, completely free. No account, no trial, no watermarks added to the compressed PDF.' },
      { q: 'Are my files kept private?',                  a: 'Yes. MyEasyPDF compresses in your browser — your files are never uploaded to any server.' },
    ],
    related: [
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     IMAGE TO PDF
  ═══════════════════════════════════════════════════════ */
  'image-to-pdf': {
    h1: 'Convert images to PDF — JPG, PNG, WebP, free online',
    intro: [
      'Turn one photo or a whole batch of images into a single PDF — instantly, for free, in your browser. Supports JPG, PNG, WebP, GIF, BMP, and HEIC (iPhone photos). Nothing is uploaded.',
      'Perfect for scanning receipts with your phone, combining screenshots into a report, or turning homework photos into a document to email to your teacher.',
    ],
    howTo: {
      title: 'How to convert images to PDF',
      steps: [
        { title: 'Add your images',     text: 'Drag your photos in or click to pick them from your device. You can add more images at any time.' },
        { title: 'Set the page order',  text: 'Drag thumbnails up or down to set the order they\'ll appear in the PDF. Remove any image you don\'t need.' },
        { title: 'Choose page settings', text: 'Pick a page size (A4, A3, Letter, Legal, or Fit to Image), portrait or landscape, and your preferred margin.' },
        { title: 'Download the PDF',    text: 'Click "Convert to PDF". The file builds in your browser and downloads straight to your device.' },
      ],
    },
    features: [
      { icon: 'bi-images',              title: 'All major formats',     text: 'JPG, PNG, WebP, GIF, BMP, and HEIC are all supported. The tool detects the format automatically.' },
      { icon: 'bi-file-earmark-ruled',  title: 'Flexible page sizes',   text: 'A4, A3, Letter, Legal, or "Fit to Image" — which sizes each page to match its source photo exactly.' },
      { icon: 'bi-arrows-angle-expand', title: 'Orientation + margins', text: 'Portrait or landscape, and a margin slider so your PDF looks professional and print-ready.' },
      { icon: 'bi-shield-lock',         title: 'Zero uploads',          text: 'Your photos never leave your browser. Safe for ID cards, receipts, and personal documents.' },
      { icon: 'bi-infinity',            title: 'No limits',             text: 'Convert as many images as you need. No daily quota, no page cap, no account required.' },
    ],
    faqs: [
      { q: 'Which image formats are supported?',             a: 'JPG, JPEG, PNG, WebP, GIF, BMP, and HEIC (iPhone photos) are all supported.' },
      { q: 'Can I put multiple images into one PDF?',        a: 'Yes. Add as many images as you like, drag them into order, and the tool puts each image on its own page in one PDF.' },
      { q: 'Are my images uploaded anywhere?',               a: 'No. Everything runs in your browser using pdf-lib — no server, no upload, no privacy risk.' },
      { q: 'Does it add a watermark?',                       a: 'Never. The PDF output is clean, with no branding or extra pages added.' },
      { q: 'Can I choose the PDF page size?',                a: 'Yes — A4, A3, Letter, Legal, or "Fit to Image". You can also switch between portrait and landscape and adjust the margin.' },
    ],
    related: [
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'PNG to PDF',    href: '/png-to-pdf',    icon: 'bi-filetype-png' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     JPG TO PDF
  ═══════════════════════════════════════════════════════ */
  'jpg-to-pdf': {
    h1: 'JPG to PDF converter — free, instant, no sign-up',
    intro: [
      'Convert JPEG photos to a PDF in seconds — completely free, with no account required and no watermark on the result. Your photos never leave your device.',
      'Add one photo or a whole batch of JPGs, drag them into the order you want, choose a page size, and download a clean PDF. Perfect for sharing photos as a document, submitting assignments, or archiving receipts.',
    ],
    howTo: {
      title: 'How to convert JPG to PDF — 4 easy steps',
      steps: [
        { title: 'Upload your JPG files',  text: 'Drag and drop your JPEG photos onto the tool, or click to browse. You can add more files at any point.' },
        { title: 'Set the page order',     text: 'Use the arrows or drag thumbnails to arrange the photos in the order they\'ll appear in the PDF. Remove any you don\'t need.' },
        { title: 'Choose page settings',   text: 'Pick a page size (A4, A3, Letter, Legal, or Fit to Image), portrait or landscape, and a margin that suits your document.' },
        { title: 'Download the PDF',       text: 'Click "Convert to PDF". The file is created in your browser and downloads straight to your device. Nothing is uploaded.' },
      ],
    },
    features: [
      { icon: 'bi-image',               title: 'JPG and JPEG accepted',   text: 'Upload .jpg or .jpeg files — both extensions work at any quality level.' },
      { icon: 'bi-file-earmark-ruled',  title: 'A4, Letter, Legal and more', text: 'Choose a standard page size or use "Fit to Image" to match each page to your photo\'s dimensions.' },
      { icon: 'bi-shield-lock',         title: '100% private',             text: 'Your photos are converted in your browser with pdf-lib. They never leave your device.' },
      { icon: 'bi-infinity',            title: 'No limits',                text: 'No file size cap, no page limit, no daily quota. Convert as many JPGs as you need.' },
      { icon: 'bi-patch-check',         title: 'No watermarks',            text: 'The output PDF is clean — no logo, no banner, nothing added by us.' },
      { icon: 'bi-arrows-angle-expand', title: 'Custom margin',            text: 'Adjust the page margin with a slider for a polished, print-ready look.' },
    ],
    whyUs: {
      title: 'Why convert JPG to PDF without uploading?',
      paragraphs: [
        'Most JPG-to-PDF tools send your photos to a remote server — risky for ID cards, invoices, and personal images. MyEasyPDF converts everything locally in your browser, so nothing is ever transmitted.',
        'There are no limits, no watermarks, and no premium plan needed. Just drop your photos in and get a PDF.',
      ],
    },
    faqs: [
      { q: 'How do I convert JPG to PDF for free?',               a: 'Upload your JPG files here, arrange them in order, pick a page size, and click "Convert to PDF". Instant download — no account, no watermark.' },
      { q: 'Can I combine multiple JPGs into one PDF?',            a: 'Yes. Add as many JPEGs as you like, drag them into order, and the tool creates a single PDF with one image per page.' },
      { q: 'Are my photos uploaded to a server?',                  a: 'No. Everything runs in your browser with pdf-lib. Your photos never leave your device.' },
      { q: 'Does converting JPG to PDF reduce image quality?',     a: 'No. Your JPEG is embedded into the PDF at its original quality — no re-compression is applied.' },
      { q: 'Can I convert .jpeg files too?',                       a: 'Yes — JPEG and JPG are the same format. Both .jpg and .jpeg file extensions work.' },
      { q: 'What page sizes are available?',                       a: 'A4, A3, Letter, Legal, and "Fit to Image". "Fit to Image" sizes each page to match the source photo exactly.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'PNG to PDF',    href: '/png-to-pdf',    icon: 'bi-filetype-png' },
      { name: 'PDF to JPG',    href: '/pdf-to-jpg',    icon: 'bi-file-earmark-image' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     PNG TO PDF
  ═══════════════════════════════════════════════════════ */
  'png-to-pdf': {
    h1: 'PNG to PDF converter — free, no watermark, no upload',
    intro: [
      'Convert one PNG or a batch of PNG images into a single PDF — free, instantly, in your browser. Nothing is uploaded. Nothing is stored. The output has no watermark.',
      'Great for turning screenshots into a report, combining Figma or Canva exports, or bundling design mockups to email to a client.',
    ],
    howTo: {
      title: 'How to convert PNG to PDF',
      steps: [
        { title: 'Drop your PNG files',  text: 'Drag one or more PNG images onto the tool, or click to browse. You can keep adding files before you export.' },
        { title: 'Set the page order',   text: 'Drag thumbnails to arrange the PNGs in the sequence you want them to appear in the PDF.' },
        { title: 'Choose page settings', text: 'Pick A4, Letter, Legal, or "Fit to Image". Set portrait or landscape and adjust the margin to taste.' },
        { title: 'Download the PDF',     text: 'Click "Convert to PDF". The download starts immediately from your browser — nothing is sent to a server.' },
      ],
    },
    features: [
      { icon: 'bi-filetype-png',        title: 'Purpose-built for PNG',   text: 'Designed for PNG files — keeps crisp line art, screenshots, and logos without re-encoding artefacts.' },
      { icon: 'bi-shield-lock',         title: '100% private',            text: 'Every conversion happens on your device with pdf-lib. Your PNGs never travel over the network.' },
      { icon: 'bi-file-earmark-ruled',  title: 'A4, Letter, Legal…',      text: 'Choose a standard page size, or use "Fit to Image" to match each page to its source PNG.' },
      { icon: 'bi-arrows-angle-expand', title: 'Orientation + margin',    text: 'Portrait or landscape and a margin slider — ideal for printable reports and documentation.' },
      { icon: 'bi-infinity',            title: 'No limits',               text: 'No page cap, no daily quota, no sign-up, no watermark. Convert as often as you like.' },
    ],
    faqs: [
      { q: 'How do I convert PNG to PDF for free?',          a: 'Drop your PNGs onto this page, pick a page size, and click "Convert to PDF". Instant download — no account, no watermark.' },
      { q: 'Are my PNG files uploaded anywhere?',            a: 'No. MyEasyPDF uses pdf-lib entirely in your browser. Your PNGs never leave your device.' },
      { q: 'Can I combine multiple PNGs into one PDF?',      a: 'Yes. Add as many PNGs as you like, reorder them by drag-and-drop, and the converter stitches them into a single PDF.' },
      { q: 'Is there a file size limit?',                    a: 'No server-side limit. Large batches work best on desktop — your device memory is the only constraint.' },
      { q: 'Does the PDF keep PNG transparency?',            a: 'PNGs are placed on a white page background, so transparent areas appear white in the PDF (PDF pages don\'t support transparency).' },
      { q: 'Will the PNG to PDF converter add a watermark?', a: 'Never. The output PDF is completely clean — no extra pages, branding, or banners.' },
    ],
    related: [
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Camera to PDF', href: '/camera-to-pdf', icon: 'bi-camera-fill' },
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     PDF TO IMAGE
  ═══════════════════════════════════════════════════════ */
  'pdf-to-image': {
    h1: 'Convert PDF to image — PNG or JPEG, free online',
    intro: [
      'Export any page of a PDF as a high-quality PNG or JPEG image — free, in your browser, with no watermark and nothing uploaded. Pick your resolution and download individual pages or a full ZIP.',
      'Ideal for creating social media previews from a presentation, turning a certificate into a shareable photo, or extracting images from a PDF without taking a screenshot.',
    ],
    howTo: {
      title: 'How to convert PDF pages to images',
      steps: [
        { title: 'Upload your PDF',             text: 'Drop the PDF into the upload area. Every page loads as a thumbnail you can click to select.' },
        { title: 'Choose format and resolution', text: 'Pick PNG (lossless, best quality) or JPEG (smaller file). Drag the Resolution slider from 1× (screen-ready) up to 4× (print-quality).' },
        { title: 'Select the pages you want',   text: 'Click thumbnails to pick them, or use "Select All". Only selected pages are exported.' },
        { title: 'Download your images',        text: 'Download one page, download all selected pages, or grab a ZIP of everything. Files are numbered in order.' },
      ],
    },
    features: [
      { icon: 'bi-card-image',   title: 'PNG and JPEG output',     text: 'JPEG for small files, PNG for lossless quality with full detail. You choose.' },
      { icon: 'bi-aspect-ratio', title: '1× to 4× resolution',     text: 'From 96 DPI (web-ready) up to 384 DPI (print-quality). The preview shows the exact pixel size.' },
      { icon: 'bi-hdd-stack',    title: 'Batch ZIP download',       text: 'Download all selected pages at once as a single, numbered ZIP file.' },
      { icon: 'bi-check2-square', title: 'Choose specific pages',  text: 'Select any combination of pages — only what you pick gets exported.' },
      { icon: 'bi-shield-lock',  title: 'Private conversion',      text: 'Pages are rendered in-browser using pdf.js. Your PDF never touches a server.' },
    ],
    faqs: [
      { q: 'What resolution will my images be?',          a: 'Drag the Resolution Scale slider from 1× (roughly 96 DPI, great for web) up to 4× (roughly 384 DPI, good for print). Higher means sharper but larger files.' },
      { q: 'Can I convert only specific pages?',          a: 'Yes. Click any thumbnail to select it. "Download Selected" exports only those pages.' },
      { q: 'How do I convert every page at once?',        a: 'Click "Select All", then "Download All as ZIP" — you\'ll get every page as a separate numbered image in one archive.' },
      { q: 'PNG or JPEG — which should I choose?',        a: 'Use PNG for the sharpest quality (great for text-heavy PDFs). Use JPEG for smaller files (great for photo PDFs and social media).' },
      { q: 'Is my PDF uploaded anywhere?',                a: 'No. pdf.js renders pages entirely in your browser. Your file never leaves your device.' },
    ],
    related: [
      { name: 'PDF to JPG',    href: '/pdf-to-jpg',    icon: 'bi-file-earmark-image' },
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     PDF TO JPG
  ═══════════════════════════════════════════════════════ */
  'pdf-to-jpg': {
    h1: 'PDF to JPG converter — free, no upload, no watermark',
    intro: [
      'Convert PDF pages to high-quality JPEG images — free, directly in your browser, with nothing uploaded to any server. Pick your resolution, choose which pages to export, and download.',
      'Use it to turn slides into shareable photos, create a social media preview from a report, or extract a specific image from a PDF without taking a screenshot.',
    ],
    howTo: {
      title: 'How to convert PDF to JPG — 4 simple steps',
      steps: [
        { title: 'Upload your PDF',             text: 'Drop the PDF into the upload area. Every page appears as a selectable thumbnail.' },
        { title: 'Set resolution',              text: 'The format is set to JPEG by default. Drag the Resolution slider from 1× (screen-ready) to 4× (print-quality) for sharper images.' },
        { title: 'Select pages to export',      text: 'Click thumbnails to include them, or hit "Select All" to grab everything.' },
        { title: 'Download your JPEGs',         text: 'Download a single page or all selected pages as a ZIP. Files are named in order for easy sorting.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-image', title: 'JPEG output',            text: 'Compact JPEG files — perfect for email, social media, and web publishing.' },
      { icon: 'bi-aspect-ratio',       title: '1× to 4× resolution',    text: '96 DPI for the web up to 384 DPI for print — one slider controls the quality of all exported pages.' },
      { icon: 'bi-check2-square',      title: 'Pick any pages',         text: 'Select specific pages or all pages. Only what you choose gets exported.' },
      { icon: 'bi-hdd-stack',          title: 'Batch ZIP download',      text: 'Get all selected JPEGs in one tidy ZIP archive — numbered and ready to use.' },
      { icon: 'bi-shield-lock',        title: 'Nothing uploaded',        text: 'pdf.js renders pages inside your browser. Your PDF never reaches any server.' },
      { icon: 'bi-patch-check',        title: 'No watermarks',          text: 'Clean JPEG output — no logos, banners, or MyEasyPDF branding on your images.' },
    ],
    whyUs: {
      title: 'Convert PDF to JPEG without uploading',
      paragraphs: [
        'Cloud-based converters upload your PDF — often a confidential report or private document — to a third-party server before they return images. MyEasyPDF renders every page using pdf.js in your browser, so nothing is ever transmitted.',
        'No file size limit, no trial, no watermark. Convert as many pages as you need, as often as you like, for free.',
      ],
    },
    faqs: [
      { q: 'How do I convert a PDF to JPG for free?',              a: 'Upload your PDF, select the pages you want, and click Download. JPEG files download instantly — no account needed.' },
      { q: 'What resolution are the exported JPEGs?',              a: '1× is roughly 96 DPI (good for screens and web). 4× is roughly 384 DPI (good for printing). Higher scale = sharper images but larger files.' },
      { q: 'Can I convert every page of a PDF to JPEG at once?',   a: 'Yes. Click "Select All", then "Download All as ZIP" and get every page as a separate numbered JPEG in one archive.' },
      { q: 'Is my PDF uploaded to a server?',                      a: 'No. The conversion runs entirely in your browser using pdf.js. Your PDF is never uploaded anywhere.' },
      { q: 'Is JPEG lower quality than PNG?',                      a: 'JPEG files are smaller because they use compression. At 2× scale or higher the output looks excellent for most documents. Use PNG if you need lossless quality.' },
      { q: 'Will the images have a watermark?',                    a: 'No. MyEasyPDF never adds watermarks, logos, or banners to your exported images.' },
    ],
    related: [
      { name: 'PDF to Image',  href: '/pdf-to-image',  icon: 'bi-card-image' },
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'Compress PDF',  href: '/compress-pdf',  icon: 'bi-file-zip' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     ROTATE PDF
  ═══════════════════════════════════════════════════════ */
  'rotate-pdf': {
    h1: 'Rotate PDF pages online — free, permanent fix',
    intro: [
      'Fix sideways or upside-down pages in any PDF and save the rotation permanently — free, in your browser, with no upload needed. Rotate every page, selected pages, or individual pages, 90° at a time.',
      'Great for scanned documents that came out the wrong way, photos that were taken in landscape, or forms that display correctly on screen but print sideways.',
    ],
    howTo: {
      title: 'How to rotate PDF pages',
      steps: [
        { title: 'Upload your PDF',         text: 'Drop the file in. Every page loads as a thumbnail so you can see exactly what needs fixing.' },
        { title: 'Rotate what you need',    text: 'Use "Rotate All" for every page, or click the ↺ and ↻ buttons on individual thumbnails. Each click rotates 90°. Click twice for 180°.' },
        { title: 'Download the fixed PDF',  text: 'Hit "Download rotated PDF". Rotations are saved permanently in the file, so they\'ll look correct in every PDF reader.' },
      ],
    },
    features: [
      { icon: 'bi-arrow-clockwise',  title: 'Per-page control',    text: 'Rotate individual pages, a selection, or all pages at once — each with its own reset button.' },
      { icon: 'bi-fullscreen',       title: '90° steps',           text: 'One click rotates 90° clockwise or anti-clockwise. Click again for 180°.' },
      { icon: 'bi-shield-lock',      title: 'Nothing uploaded',    text: 'Rotation is applied client-side with pdf-lib. Your file never leaves your device.' },
      { icon: 'bi-patch-check',      title: 'Permanent rotation',  text: 'Unlike "View rotated" in a PDF reader, these rotations are saved into the file permanently.' },
    ],
    faqs: [
      { q: 'Does rotating reduce PDF quality?',   a: 'No. Rotation only updates page metadata — text, images, and fonts are completely untouched.' },
      { q: 'Can I rotate just one page?',         a: 'Yes. Every thumbnail has its own ↺ and ↻ buttons, plus a per-page reset to undo that one page only.' },
      { q: 'Is the rotation permanent?',          a: 'Yes. The rotation is written into the PDF itself, so it stays correct no matter which app opens the file.' },
      { q: 'Is my file uploaded anywhere?',       a: 'No. Rotation runs in your browser with pdf-lib. Your PDF never leaves your machine.' },
    ],
    related: [
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     SIGN PDF
  ═══════════════════════════════════════════════════════ */
  'sign-pdf': {
    h1: 'Sign PDF online — free e-signature, no account needed',
    intro: [
      'Add your handwritten or typed signature to any PDF — free, no account, and your document never leaves your browser. Draw a signature with your mouse or finger, or type your name in a cursive font.',
      'Sign contracts, NDAs, rental agreements, and offer letters in minutes. The finished PDF looks exactly like a printed and hand-signed copy — clean, professional, and private.',
    ],
    howTo: {
      title: 'How to sign a PDF online',
      steps: [
        { title: 'Open your PDF',             text: 'Drag and drop your PDF or pick it from your device.' },
        { title: 'Create your signature',     text: 'Draw with your mouse or finger on the signature pad, or type your name and pick a cursive font. Choose any ink colour.' },
        { title: 'Choose pages to sign',      text: 'Tick individual pages or flip "All pages" to sign every page at once — useful for initialling long contracts.' },
        { title: 'Place and resize',          text: 'Drag the signature to the right spot on the page. Drag the corners to resize it. Use Previous / Next to move between pages.' },
        { title: 'Download the signed PDF',   text: 'Click "Download signed PDF". Your signature is permanently embedded — the document is ready to send.' },
      ],
    },
    features: [
      { icon: 'bi-pen',         title: 'Draw or type',          text: 'Sketch with your mouse or finger, or type your name in a handwriting font — two fast ways to sign.' },
      { icon: 'bi-palette',     title: 'Any ink colour',        text: 'Use preset swatches or enter a custom hex code to match blue ink on printed forms.' },
      { icon: 'bi-files',       title: 'Sign multiple pages',   text: 'Tick individual pages or use "All pages" to sign every page in one go — perfect for initialling contracts.' },
      { icon: 'bi-shield-lock', title: 'Sign without uploading', text: 'Your contract never touches any server. The entire process runs in your browser.' },
      { icon: 'bi-aspect-ratio', title: 'Drag, drop and resize', text: 'Position the signature anywhere on the page and scale it to the exact size you need.' },
      { icon: 'bi-patch-check', title: 'No watermarks',         text: 'The signed PDF is clean — no extra branding or pages added by us.' },
    ],
    whyUs: {
      title: 'Is an online PDF signature legally valid?',
      paragraphs: [
        'In most countries — including the United States (ESIGN Act), the European Union (eIDAS), and India (IT Act) — a simple electronic signature is legally binding for ordinary business contracts.',
        'This tool creates a simple electronic signature. It\'s perfect for everyday contracts, NDAs, and sign-offs. It is not a qualified digital signature with a certificate, which is required for a smaller set of high-stakes legal documents.',
      ],
    },
    faqs: [
      { q: 'Is my signed document sent to your server?',  a: 'No. Signing runs 100% in your browser, so confidential contracts never leave your device.' },
      { q: 'Can I sign on mobile?',                       a: 'Yes. The signature pad works with touch input, so you can sign with your finger on any smartphone.' },
      { q: 'Can I sign multiple pages at once?',          a: 'Yes. Tick multiple pages in the selector, or flip "All pages" to sign every page in one click.' },
      { q: 'Can I use blue ink?',                         a: 'Yes. The colour picker has a blue swatch, and you can also enter any custom hex code to match a specific ink colour.' },
      { q: 'Can I move the signature after signing?',     a: 'Once you download, the signature is permanently embedded into the PDF and cannot be moved or edited.' },
      { q: 'Is an e-signature legally binding?',          a: 'Yes, for most contracts. A typed or drawn signature is a simple e-signature, which is legally valid under ESIGN (US), eIDAS (EU), and the IT Act (India).' },
    ],
    related: [
      { name: 'Add Watermark',    href: '/add-watermark',    icon: 'bi-droplet' },
      { name: 'Add Page Numbers', href: '/add-page-numbers', icon: 'bi-123' },
      { name: 'Merge PDF',        href: '/merge-pdf',        icon: 'bi-layers-fill' },
      { name: 'All PDF Tools',    href: '/all-pdf-tools',    icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     CAMERA TO PDF
  ═══════════════════════════════════════════════════════ */
  'camera-to-pdf': {
    h1: 'Scan documents to PDF with your phone camera — free',
    intro: [
      'Turn your phone into a document scanner. Take photos of receipts, notes, ID cards, or whiteboards and instantly get a clean PDF — no app download, no uploads, no watermarks.',
      'Open this page on your phone, tap to capture each page, apply a cleanup filter, and export a multi-page PDF in under a minute. It\'s a free alternative to CamScanner.',
    ],
    howTo: {
      title: 'How to scan documents to PDF with your phone',
      steps: [
        { title: 'Open on your phone',    text: 'This tool is built for phone cameras. Open the page on your phone and tap to start the camera.' },
        { title: 'Allow camera access',   text: 'Grant camera permission. The tool automatically picks the rear-facing camera for the best focus on paper.' },
        { title: 'Capture your pages',    text: 'Frame each page and tap the shutter button. Keep the photo or hit Retake if it\'s blurry. Repeat for every page.' },
        { title: 'Apply a filter',        text: 'Pick "Enhance" for auto-contrast, "Grayscale" for monochrome, or "Document" for sharp black-and-white — the same result you\'d get from a real scanner.' },
        { title: 'Export as PDF',         text: 'Reorder or delete captures, name the file, choose a page size, and tap Export to download your multi-page PDF.' },
      ],
    },
    features: [
      { icon: 'bi-phone',            title: 'Built for mobile',       text: 'Opens your phone\'s rear camera for quick, sharp captures — just like a dedicated scanner app, but in your browser.' },
      { icon: 'bi-magic',            title: 'One-tap cleanup filters', text: 'Enhance, Grayscale, or Document mode turn a phone photo into a clean, high-contrast scan.' },
      { icon: 'bi-arrows-move',      title: 'Reorder and retake',     text: 'Rearrange captures, retake bad ones, and delete any you don\'t need before exporting.' },
      { icon: 'bi-file-earmark-pdf', title: 'Multi-page PDF output',  text: 'Every capture becomes a page in one combined PDF, with your choice of page size and orientation.' },
      { icon: 'bi-shield-lock',      title: 'Stays on your device',   text: 'Captures are held in your browser memory only — never uploaded to any server.' },
    ],
    faqs: [
      { q: 'Does it work on desktop?',            a: 'The scanner is designed for phone cameras. Open the page on your phone. Desktop visitors see a notice and links to Image to PDF for webcam-free scanning.' },
      { q: 'How do I get cleaner scans?',          a: 'Apply the "Document" filter for sharp, high-contrast black and white — ideal for text. "Enhance" works well for colour documents.' },
      { q: 'Do I need to install an app?',         a: 'No. It uses your browser\'s built-in camera API, so nothing needs to be installed.' },
      { q: 'Are my photos uploaded to a server?',  a: 'No. Captures stay in browser memory and the PDF is created on your device.' },
      { q: 'Is it free?',                          a: 'Yes — unlike CamScanner\'s paid tier, this is completely free with no watermarks and no page limit.' },
    ],
    related: [
      { name: 'Image to PDF',  href: '/image-to-pdf',  icon: 'bi-images' },
      { name: 'JPG to PDF',    href: '/jpg-to-pdf',    icon: 'bi-image' },
      { name: 'Sign PDF',      href: '/sign-pdf',      icon: 'bi-pen' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     REMOVE PAGES
  ═══════════════════════════════════════════════════════ */
  'remove-pages': {
    h1: 'Remove pages from PDF — free, fast, no upload',
    intro: [
      'Delete unwanted pages from any PDF and download a clean new file — free, instantly, in your browser. See every page as a thumbnail before you remove anything.',
      'No sign-up, nothing uploaded, no watermarks. Perfect for cutting blank pages, removing a confidential section, or trimming a report before you share it.',
    ],
    howTo: {
      title: 'How to remove pages from a PDF',
      steps: [
        { title: 'Upload your PDF',         text: 'Drop the file in. A thumbnail appears for every page so you can see exactly what you\'re deleting.' },
        { title: 'Mark pages to remove',    text: 'Click any page to mark it for deletion — a red overlay shows it\'s out. Click again to keep it. You can change your mind up until you download.' },
        { title: 'Download the new PDF',    text: 'Click Download to save a new PDF containing only the pages you kept. Your original file is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-x',          title: 'Visual page selector',     text: 'See thumbnails of every page so you always know which pages you\'re removing.' },
      { icon: 'bi-shield-lock',             title: 'Files stay on your device', text: 'Everything runs in your browser — your PDF is never uploaded.' },
      { icon: 'bi-arrow-counterclockwise',  title: 'Easy to undo',             text: 'Click a marked page again to keep it. Nothing is final until you hit Download.' },
    ],
    faqs: [
      { q: 'Is the original PDF changed?',          a: 'No. A new PDF is created with only the pages you kept. Your original file is completely untouched.' },
      { q: 'Is there a page limit?',                a: 'No artificial limit. Most devices handle hundreds of pages without any slowdown.' },
      { q: 'Is my file uploaded to a server?',      a: 'No. The tool uses pdf-lib in your browser — nothing is sent to any server.' },
    ],
    related: [
      { name: 'Extract Pages', href: '/extract-pages', icon: 'bi-file-earmark-plus' },
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     EXTRACT PAGES
  ═══════════════════════════════════════════════════════ */
  'extract-pages': {
    h1: 'Extract pages from PDF — free, no upload required',
    intro: [
      'Pull specific pages out of a PDF and save them as a new, smaller document — free, in your browser, with nothing uploaded. Just click the pages you want to keep and hit Extract.',
      'Perfect for sharing a single chapter from a long report, isolating an invoice from a batch document, or sending only the relevant pages to a client.',
    ],
    howTo: {
      title: 'How to extract PDF pages',
      steps: [
        { title: 'Upload your PDF',            text: 'Drop the file in. Every page appears as a clickable thumbnail.' },
        { title: 'Select the pages to keep',   text: 'Click thumbnails to select them — selected pages get a green border. Use "Select All" or "Deselect All" for quick bulk actions.' },
        { title: 'Download the new PDF',       text: 'Click "Extract" to download a new PDF containing just the pages you selected, in their original order.' },
      ],
    },
    features: [
      { icon: 'bi-file-earmark-plus',  title: 'Click to select',           text: 'Thumbnail previews make it easy to pick pages — especially when page numbers aren\'t obvious.' },
      { icon: 'bi-check2-all',         title: 'Select All / Deselect All', text: 'One click to toggle everything on or off — handy when you want most pages but need to drop a few.' },
      { icon: 'bi-shield-lock',        title: 'Private by design',         text: 'Pages are processed in your browser and never uploaded.' },
    ],
    faqs: [
      { q: 'What\'s the difference between Extract and Split?', a: 'Extract keeps your chosen pages in one new PDF. Split can break a document into multiple PDFs at once. Use whichever fits your goal.' },
      { q: 'Does the extracted PDF keep the original quality?',  a: 'Yes — pages are copied exactly, so text, images, and fonts are unchanged.' },
      { q: 'Is it free?',                                        a: 'Yes. MyEasyPDF is completely free with no watermarks or paid plans.' },
    ],
    related: [
      { name: 'Split PDF',     href: '/split-pdf',     icon: 'bi-scissors' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     ORGANIZE PDF
  ═══════════════════════════════════════════════════════ */
  'organize-pdf': {
    h1: 'Organize PDF pages — reorder pages online for free',
    intro: [
      'Rearrange the pages of a PDF into any order you need — free, in your browser, with no upload required. Drag thumbnails to new positions and download a freshly ordered PDF in seconds.',
      'Pair it with Rotate PDF or Remove Pages if you also need to fix orientation or delete pages.',
    ],
    howTo: {
      title: 'How to reorder PDF pages',
      steps: [
        { title: 'Upload your PDF',         text: 'Drop the file in. You\'ll see a thumbnail grid of every page.' },
        { title: 'Drag pages to reorder',   text: 'Grab any thumbnail and drag it to its new position. Or use the ← → arrow buttons under each page to move it one slot at a time.' },
        { title: 'Save the reordered PDF',  text: 'Click "Save PDF". A reordered copy downloads to your device and your original file is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-arrows-move',      title: 'Drag to reorder',      text: 'Grab any thumbnail and drop it anywhere — the rest reflow automatically.' },
      { icon: 'bi-arrow-left-right', title: 'Arrow buttons',        text: 'Each page has ← → buttons to nudge it one slot at a time — useful on a trackpad.' },
      { icon: 'bi-signpost-split',   title: 'Position indicator',   text: 'Each thumbnail shows its new position and original position so you don\'t lose track.' },
      { icon: 'bi-shield-lock',      title: 'Fully private',        text: 'All changes are made in your browser with pdf-lib. Nothing is uploaded.' },
    ],
    faqs: [
      { q: 'Can I also delete or rotate pages here?',           a: 'This tool focuses on reordering. Use Remove Pages to delete pages, and Rotate PDF to fix orientation — both free and equally private.' },
      { q: 'Can I reorder pages without merging multiple PDFs?', a: 'Yes. This tool works on one PDF at a time. Merge PDFs first if you want to combine, then use Organize to rearrange.' },
      { q: 'Does the output keep links and bookmarks?',         a: 'Text, links, and images inside each page are preserved. Document-level bookmarks may shift if pages are reordered.' },
    ],
    related: [
      { name: 'Merge PDF',     href: '/merge-pdf',     icon: 'bi-layers-fill' },
      { name: 'Rotate PDF',    href: '/rotate-pdf',    icon: 'bi-arrow-clockwise' },
      { name: 'Remove Pages',  href: '/remove-pages',  icon: 'bi-file-earmark-x' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     ADD WATERMARK
  ═══════════════════════════════════════════════════════ */
  'add-watermark': {
    h1: 'Add watermark to PDF — free online, instant preview',
    intro: [
      'Stamp a text watermark — "Confidential", "Draft", your company name, anything — across every page of a PDF. Free, in your browser, with a live preview on every page before you download.',
      'Set the text, opacity, colour, font size, and position once and it applies to the whole document. Or customise individual pages for different needs.',
    ],
    howTo: {
      title: 'How to add a watermark to a PDF',
      steps: [
        { title: 'Upload your PDF',          text: 'Drop the file in. Thumbnails load instantly and update live as you change the watermark settings.' },
        { title: 'Set up the watermark',     text: 'Type your text, pick opacity (5–80%), font size (16–90pt), colour, and one of eight positions (diagonal, centre, corners, or edges).' },
        { title: 'Customise individual pages', text: 'Click any page to override its font size or position — useful for cover pages, landscape spreads, or sample-only chapters.' },
        { title: 'Download the watermarked PDF', text: 'Click Download. The watermark is burned into every page permanently and saves to your device.' },
      ],
    },
    features: [
      { icon: 'bi-droplet',      title: '8 preset positions',  text: 'Diagonal, centre, top/bottom, and all four corners — one click sets the look across the whole document.' },
      { icon: 'bi-droplet-half', title: 'Opacity control',     text: 'Slide from 5% (subtle background stamp) up to 80% (bold CONFIDENTIAL mark).' },
      { icon: 'bi-palette',      title: 'Colour and font size', text: 'Gray, Red, Blue, Green, or Black — and any font size from 16pt to 90pt.' },
      { icon: 'bi-sliders',      title: 'Per-page overrides',  text: 'Expand any page to override its font size or position for a custom look.' },
      { icon: 'bi-eye',          title: 'Live preview',        text: 'See exactly how the watermark looks on every page before you export — no guesswork.' },
      { icon: 'bi-shield-lock',  title: 'Private by default',  text: 'Files are watermarked in your browser — never uploaded.' },
    ],
    faqs: [
      { q: 'Can I control how transparent the watermark is?', a: 'Yes. Drag the opacity slider between 5% (barely visible) and 80% (very prominent). The live preview updates instantly.' },
      { q: 'What colours can I use?',                         a: 'The picker has Gray, Red, Blue, Green, and Black presets. These colours work well against most PDF backgrounds.' },
      { q: 'Can I watermark only some pages?',                a: 'Yes. Click any page to customise or skip it — great for keeping a clean cover page while watermarking everything else.' },
      { q: 'Can the watermark be removed?',                   a: 'The watermark is embedded into the PDF content itself, so it cannot be removed with a standard PDF reader.' },
    ],
    related: [
      { name: 'Add Page Numbers', href: '/add-page-numbers', icon: 'bi-123' },
      { name: 'Sign PDF',         href: '/sign-pdf',         icon: 'bi-pen' },
      { name: 'Merge PDF',        href: '/merge-pdf',        icon: 'bi-layers-fill' },
      { name: 'All PDF Tools',    href: '/all-pdf-tools',    icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     ADD PAGE NUMBERS
  ═══════════════════════════════════════════════════════ */
  'add-page-numbers': {
    h1: 'Add page numbers to PDF — free, instant, no upload',
    intro: [
      'Insert page numbers into any PDF in a few clicks. Pick a position, start number, font size, and margin — then see a live preview on every page before you download. Free, in your browser.',
      'Great for theses, reports, e-books, and legal documents where numbered pages are required.',
    ],
    howTo: {
      title: 'How to add page numbers to a PDF',
      steps: [
        { title: 'Upload your PDF',           text: 'Drag and drop the file in. Every page renders as a thumbnail.' },
        { title: 'Set position and format',   text: 'Choose one of six positions (top/bottom × left/centre/right), set the starting number, and adjust font size (8–24pt) and edge margin (5–60pt).' },
        { title: 'Preview and download',      text: 'Every thumbnail updates live as you change settings. When it looks right, click "Add Page Numbers & Download".' },
      ],
    },
    features: [
      { icon: 'bi-123',               title: '6 placement options',  text: 'Top-left, top-centre, top-right, bottom-left, bottom-centre, bottom-right — wherever your document style needs.' },
      { icon: 'bi-eye',               title: 'Live preview',         text: 'Every page thumbnail updates instantly so you see exactly what the output will look like.' },
      { icon: 'bi-sort-numeric-down', title: 'Start from any number', text: 'Begin numbering from any value — handy when a chapter should start at page 15 instead of 1.' },
      { icon: 'bi-aspect-ratio',      title: 'Size and margin',      text: 'Set font size between 8pt and 24pt and an edge margin between 5pt and 60pt.' },
      { icon: 'bi-shield-lock',       title: 'Nothing uploaded',     text: 'Page numbers are added in your browser — your file never leaves your device.' },
    ],
    faqs: [
      { q: 'Can I start from a number other than 1?',    a: 'Yes. The "Start From" field accepts any number — the first page can be labelled 5, 15, or 100.' },
      { q: 'Can I skip the cover page?',                 a: 'The tool numbers every page. To skip a cover, split it off first with Split PDF, number the rest, then merge the cover back with Merge PDF.' },
      { q: 'Will the numbers cover existing content?',   a: 'The margin slider keeps numbers inside the page edges. Increase the margin if your document has a large content area.' },
    ],
    related: [
      { name: 'Add Watermark', href: '/add-watermark', icon: 'bi-droplet' },
      { name: 'Sign PDF',      href: '/sign-pdf',      icon: 'bi-pen' },
      { name: 'Organize PDF',  href: '/organize-pdf',  icon: 'bi-grid' },
      { name: 'All PDF Tools', href: '/all-pdf-tools', icon: 'bi-grid-fill' },
    ],
  },

  /* ═══════════════════════════════════════════════════════
     CROP PDF
  ═══════════════════════════════════════════════════════ */
  'crop-pdf': {
    h1: 'Crop PDF online — trim margins and whitespace for free',
    intro: [
      'Trim the margins, whitespace, or scanner borders from your PDF pages — free, in your browser, with no upload needed. Drag an adjustable crop box over the page preview, then apply it to one page or all pages.',
      'Perfect for cleaning up scanned documents, removing the black border from photocopies, or zooming a presentation into just its key area.',
    ],
    howTo: {
      title: 'How to crop a PDF',
      steps: [
        { title: 'Upload your PDF',           text: 'Drag and drop the PDF in. Every page loads as a thumbnail on the left.' },
        { title: 'Adjust the crop box',       text: 'On the big preview, drag the crop rectangle to move it. Grab any corner or edge handle to resize it. Everything outside the box gets cut away.' },
        { title: 'Choose how to apply it',    text: 'Pick "All pages" to crop every page identically, or "Current page only" for a single-page crop.' },
        { title: 'Download the cropped PDF',  text: 'Click "Crop & Download". The new PDF is built in your browser and saves to your device. Your original is untouched.' },
      ],
    },
    features: [
      { icon: 'bi-crop',         title: 'Precise crop handles', text: 'Eight handles (four corners + four edges) let you dial in the exact crop area with pixel precision.' },
      { icon: 'bi-files',        title: 'Apply to all pages',   text: 'One click applies the same crop to every page — ideal for removing identical scanner borders.' },
      { icon: 'bi-file-earmark', title: 'Or just one page',     text: 'Switch to "Current Page" mode to crop a single page differently from the rest.' },
      { icon: 'bi-patch-check',  title: 'Text stays selectable', text: 'Cropping adjusts the PDF\'s crop box metadata, so text remains selectable and searchable after cropping.' },
      { icon: 'bi-shield-lock',  title: 'Runs in your browser', text: 'Your PDF is processed with pdf-lib locally. Nothing is uploaded.' },
    ],
    whyUs: {
      title: 'Why crop PDFs with MyEasyPDF?',
      paragraphs: [
        'Most online PDF croppers upload your file to a server, process it there, and give you a download link — slow, and not great for confidential documents.',
        'MyEasyPDF crops in your browser. Contracts, bank statements, and medical scans never leave your computer. And because we only update the PDF\'s crop-box metadata, text stays fully selectable and searchable after cropping.',
      ],
    },
    faqs: [
      { q: 'What does cropping a PDF actually do?',      a: 'It trims the visible area of each page, hiding margins, whitespace, or unwanted borders. Text inside the kept area stays selectable.' },
      { q: 'Can I crop every page at once?',             a: 'Yes. Choose "All pages" and the crop rectangle you set is applied to every page with one click.' },
      { q: 'Does cropping make the PDF smaller?',        a: 'A little. Cropping reduces the viewable area but doesn\'t re-encode images. Run the result through Compress PDF for a much smaller file.' },
      { q: 'Is my PDF uploaded to a server?',            a: 'No. The cropper uses pdf-lib and pdf.js entirely in your browser.' },
      { q: 'Will cropping remove selectable text?',      a: 'No. We update the PDF\'s crop metadata only — text inside the kept area stays fully selectable and searchable.' },
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

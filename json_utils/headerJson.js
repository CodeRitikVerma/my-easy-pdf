const headerJson = {
  brand: { name: "MyEasyPDF", href: "/" },
  menu: [
    { name: "Image to PDF",  href: "/image-to-pdf",  icon: "bi-images"       },
    { name: "Camera to PDF", href: "/camera-to-pdf", icon: "bi-camera-fill", mobileOnly: true },
    { name: "PDF to Image",  href: "/pdf-to-image",  icon: "bi-card-image"   },
    { name: "Merge PDF",     href: "/merge-pdf",     icon: "bi-layers-fill"  },
    {
      name: "Your Needs",
      icon: "bi-grid-fill",
      megaMenu: [
        {
          title: "Organize PDF",
          icon: "bi-grid-3x3",
          color: "#8b5cf6",
          items: [
            { name: "Merge PDF",     href: "/merge-pdf",  icon: "bi-layers-fill"       },
            { name: "Split PDF",     href: "/split-pdf",  icon: "bi-scissors"          },
            { name: "Remove Pages",  href: "/remove-pages",  icon: "bi-file-earmark-x"    },
            { name: "Extract Pages", href: "/extract-pages", icon: "bi-file-earmark-plus" },
            { name: "Organize PDF",  href: "/organize-pdf",  icon: "bi-grid"              },
          ],
        },
        {
          title: "Optimize PDF",
          icon: "bi-speedometer2",
          color: "#10b981",
          items: [
            { name: "Compress PDF", href: "/compress-pdf", icon: "bi-file-zip"        },
            { name: "Repair PDF",   href: "#", icon: "bi-wrench"          },
            { name: "OCR PDF",      href: "#", icon: "bi-text-paragraph"  },
          ],
        },
        {
          title: "Convert to PDF",
          icon: "bi-file-earmark-arrow-down",
          color: "#f59e0b",
          items: [
            { name: "JPG to PDF",         href: "/image-to-pdf", icon: "bi-image"                    },
            { name: "Word to PDF",         href: "#",             icon: "bi-file-earmark-word"        },
            { name: "PowerPoint to PDF",   href: "#",             icon: "bi-file-earmark-slides"      },
            { name: "Excel to PDF",        href: "#",             icon: "bi-file-earmark-spreadsheet" },
            { name: "HTML to PDF",         href: "#",             icon: "bi-filetype-html"            },
          ],
        },
        {
          title: "Convert from PDF",
          icon: "bi-file-earmark-arrow-up",
          color: "#ec4899",
          items: [
            { name: "PDF to JPG",        href: "/pdf-to-image", icon: "bi-card-image"               },
            { name: "PDF to Word",        href: "#",             icon: "bi-file-earmark-word"        },
            { name: "PDF to PowerPoint",  href: "#",             icon: "bi-file-earmark-slides"      },
            { name: "PDF to Excel",       href: "#",             icon: "bi-file-earmark-spreadsheet" },
            { name: "PDF to PDF/A",       href: "#",             icon: "bi-file-earmark-check"       },
          ],
        },
        {
          title: "Edit & Customize",
          icon: "bi-pencil-square",
          color: "#6366f1",
          items: [
            { name: "Sign PDF",         href: "/sign-pdf",   icon: "bi-pen"             },
            { name: "Rotate PDF",       href: "/rotate-pdf", icon: "bi-arrow-clockwise" },
            { name: "Add Page Numbers", href: "/add-page-numbers", icon: "bi-123"             },
            { name: "Add Watermark",    href: "/add-watermark",    icon: "bi-droplet"         },
            { name: "Crop PDF",         href: "#",           icon: "bi-crop"            },
            { name: "Edit PDF",         href: "#",           icon: "bi-pencil"          },
          ],
        },
      ],
    },
  ],
};

export default headerJson;

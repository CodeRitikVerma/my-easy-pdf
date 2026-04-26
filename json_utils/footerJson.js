const footerJson = {
  brand: {
    name: 'MyEasyPDF',
    href: '/'
  },
  sections: [
    {
      title: 'Convert & Create',
      links: [
        { name: 'Image to PDF',  href: '/image-to-pdf'  },
        { name: 'JPG to PDF',    href: '/jpg-to-pdf'    },
        { name: 'PNG to PDF',    href: '/png-to-pdf'    },
        { name: 'Camera to PDF', href: '/camera-to-pdf' },
        { name: 'PDF to Image',  href: '/pdf-to-image'  },
        { name: 'PDF to JPG',    href: '/pdf-to-jpg'    },
      ]
    },
    {
      title: 'Organize PDF',
      links: [
        { name: 'Merge PDF',     href: '/merge-pdf'     },
        { name: 'Split PDF',     href: '/split-pdf'     },
        { name: 'Remove Pages',  href: '/remove-pages'  },
        { name: 'Extract Pages', href: '/extract-pages' },
        { name: 'Organize PDF',  href: '/organize-pdf'  },
        { name: 'Compress PDF',  href: '/compress-pdf'  },
      ]
    },
    {
      title: 'Edit & Customize',
      links: [
        { name: 'Sign PDF',         href: '/sign-pdf'         },
        { name: 'Rotate PDF',       href: '/rotate-pdf'       },
        { name: 'Add Watermark',    href: '/add-watermark'    },
        { name: 'Add Page Numbers', href: '/add-page-numbers' },
        { name: 'Crop PDF',         href: '/crop-pdf'         },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'All PDF Tools',  href: '/all-pdf-tools' },
        { name: 'About Us',       href: '/about'         },
        { name: 'Contact',        href: '/contact'       },
        { name: 'FAQ',            href: '/faq'           },
        { name: 'Terms of Service', href: '/terms'         },
        { name: 'Privacy Policy',   href: '/privacy'       },
        { name: 'Cookie Policy',    href: '/cookie-policy' },
      ]
    },
  ],
  social: [
    {
      name: 'ritikverma210@gmail.com',
      href: 'mailto:ritikverma210@gmail.com',
      icon: '✉️'
    }
  ],
  copyright: `© ${new Date().getFullYear()} MyEasyPDF by Ritik Verma. All rights reserved. Files are processed locally — nothing is uploaded to any server.`
};

export default footerJson;

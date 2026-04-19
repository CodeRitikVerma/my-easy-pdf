const footerJson = {
  brand: {
    name: 'MyEasyPDF',
    href: '/'
  },
  sections: [
    {
      title: 'Convert & Create',
      links: [
        { name: 'Image to PDF', href: '/image-to-pdf' },
        { name: 'Camera to PDF', href: '/camera-to-pdf' },
        { name: 'PDF to Image', href: '/pdf-to-image' },
      ]
    },
    {
      title: 'Edit & Customize',
      links: [
        { name: 'Merge PDF',  href: '/merge-pdf'  },
        { name: 'Split PDF',  href: '/split-pdf'  },
        { name: 'Rotate PDF', href: '/rotate-pdf' },
        { name: 'Sign PDF',   href: '/sign-pdf'   },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms'          },
        { name: 'Privacy Policy',   href: '/privacy'        },
        { name: 'Cookie Policy',    href: '/cookie-policy'  },
      ]
    }
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

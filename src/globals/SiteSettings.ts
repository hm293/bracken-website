import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            { name: 'siteName', type: 'text', defaultValue: 'Sacred Sound Sister' },
            { name: 'tagline', type: 'text', defaultValue: 'Rest is the medicine' },
            { name: 'contactEmail', type: 'email' },
            { name: 'contactPhone', type: 'text' },
            {
              name: 'instagramHandles',
              type: 'array',
              fields: [
                { name: 'handle', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            { name: 'footerText', type: 'text', defaultValue: '© 2026 Sacred Sound Sister. All rights reserved.' },
          ],
        },
        {
          label: 'Hero',
          fields: [
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'heroLogo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutHeading', type: 'text', defaultValue: 'Meet Bracken' },
            {
              name: 'aboutBody',
              type: 'richText',
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}

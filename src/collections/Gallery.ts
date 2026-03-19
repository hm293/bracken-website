import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'aspectRatio', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'aspectRatio',
      type: 'select',
      required: true,
      defaultValue: 'square',
      options: [
        { label: 'Square', value: 'square' },
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}

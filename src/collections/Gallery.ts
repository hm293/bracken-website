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
      name: 'focalX',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 50,
      admin: {
        description: 'Horizontal focal point (0 = left, 50 = centre, 100 = right)',
        step: 5,
      },
    },
    {
      name: 'focalY',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 50,
      admin: {
        description: 'Vertical focal point (0 = top, 50 = centre, 100 = bottom)',
        step: 5,
      },
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

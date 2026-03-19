import type { CollectionConfig } from 'payload'

export const Offerings: CollectionConfig = {
  slug: 'offerings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Group Experiences', value: 'group' },
        { label: 'Corporate Wellness', value: 'corporate' },
        { label: 'Individual Sessions', value: 'individual' },
        { label: 'Immersive Rituals & Retreats', value: 'immersive' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Crystal Bowl', value: 'crystal-bowl' },
        { label: 'Sound Wave', value: 'sound-wave' },
        { label: 'Circle', value: 'circle' },
        { label: 'Flame', value: 'flame' },
        { label: 'Brain', value: 'brain' },
        { label: 'Leaf', value: 'leaf' },
        { label: 'Bowl & Mallet', value: 'bowl-mallet' },
        { label: 'Sun', value: 'sun' },
        { label: 'Moon', value: 'moon' },
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

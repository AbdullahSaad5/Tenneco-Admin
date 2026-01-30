import type { CollectionConfig } from 'payload'

export const LoadingScreens: CollectionConfig = {
  slug: 'loading-screens',
  admin: {
    useAsTitle: 'title',
    description: 'Loading screen configuration',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Logo Configuration
    {
      name: 'logoType',
      type: 'select',
      label: 'Logo Type',
      required: true,
      defaultValue: 'svg',
      options: [
        { label: 'SVG Path', value: 'svg' },
        { label: 'Image Upload', value: 'image' },
      ],
      admin: {
        description: 'Use SVG path or upload an image',
      },
    },
    {
      name: 'svgPath',
      type: 'textarea',
      label: 'SVG Path',
      admin: {
        description: 'SVG path data (only used if Logo Type is SVG)',
        condition: (data) => data.logoType === 'svg',
      },
    },
    {
      name: 'logoMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image',
      admin: {
        description: 'Logo image (only used if Logo Type is Image)',
        condition: (data) => data.logoType === 'image',
      },
    },

    // Text Content
    {
      name: 'title',
      type: 'text',
      label: 'Title (Default)',
      required: true,
      defaultValue: 'Tenneco 3D Viewer',
      admin: {
        description: 'Default title (usually English)',
      },
    },
    {
      name: 'titleTranslations',
      type: 'array',
      label: 'Title Translations',
      fields: [
        {
          name: 'language',
          type: 'text',
          label: 'Language Code',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Translated Title',
          required: true,
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (Default)',
      defaultValue: 'Loading 3D models...',
      admin: {
        description: 'Default subtitle (usually English)',
      },
    },
    {
      name: 'subtitleTranslations',
      type: 'array',
      label: 'Subtitle Translations',
      fields: [
        {
          name: 'language',
          type: 'text',
          label: 'Language Code',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Translated Subtitle',
          required: true,
        },
      ],
    },

    // Animation Settings
    {
      name: 'animation',
      type: 'group',
      label: 'Animation Settings',
      fields: [
        {
          name: 'colors',
          type: 'group',
          label: 'Colors',
          fields: [
            {
              name: 'primary',
              type: 'text',
              label: 'Primary Color',
              defaultValue: '#2563eb',
              admin: {
                description: 'Hex color code',
              },
            },
            {
              name: 'secondary',
              type: 'text',
              label: 'Secondary Color',
              defaultValue: '#0ea5e9',
              admin: {
                description: 'Hex color code',
              },
            },
          ],
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (ms)',
          defaultValue: 2000,
          admin: {
            description: 'Animation duration in milliseconds',
          },
        },
      ],
    },
  ],
}

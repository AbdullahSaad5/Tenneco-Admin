import type { CollectionConfig } from 'payload'

export const AppSettings: CollectionConfig = {
  slug: 'app-settings',
  admin: {
    useAsTitle: 'id',
    description: 'Global application settings (Singleton)',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Branding Section
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'primaryLogo',
          type: 'group',
          label: 'Primary Logo',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo Image',
              required: true,
            },
            {
              name: 'alt',
              type: 'text',
              label: 'Alt Text (Default)',
              defaultValue: 'Tenneco Logo',
              admin: {
                description: 'Default alt text (usually English)',
              },
            },
            {
              name: 'altTranslations',
              type: 'array',
              label: 'Alt Text Translations',
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
                  label: 'Translated Alt Text',
                  required: true,
                },
              ],
            },
            {
              name: 'width',
              type: 'number',
              defaultValue: 180,
            },
            {
              name: 'height',
              type: 'number',
              defaultValue: 50,
            },
          ],
        },
        {
          name: 'favicon',
          type: 'group',
          label: 'Favicon',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon Image',
            },
          ],
        },
        {
          name: 'colorPalette',
          type: 'group',
          label: 'Color Palette',
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
            },
            {
              name: 'accent',
              type: 'text',
              label: 'Accent Color',
              defaultValue: '#8b5cf6',
            },
            {
              name: 'background',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#0f172a',
            },
            {
              name: 'text',
              type: 'text',
              label: 'Text Color',
              defaultValue: '#ffffff',
            },
          ],
        },
      ],
    },

    // Feature Flags
    {
      name: 'features',
      type: 'group',
      label: 'Feature Flags',
      fields: [
        {
          name: 'enableHomepage',
          type: 'checkbox',
          label: 'Enable Homepage',
          defaultValue: true,
        },
        {
          name: 'enableAnimations',
          type: 'checkbox',
          label: 'Enable Animations',
          defaultValue: true,
        },
        {
          name: 'enableModelInfo',
          type: 'checkbox',
          label: 'Enable Model Info',
          defaultValue: true,
        },
        {
          name: 'enableHotspots',
          type: 'checkbox',
          label: 'Enable Hotspots',
          defaultValue: true,
        },
        {
          name: 'enableVideoModal',
          type: 'checkbox',
          label: 'Enable Video Modal',
          defaultValue: true,
        },
        {
          name: 'enablePdfModal',
          type: 'checkbox',
          label: 'Enable PDF Modal',
          defaultValue: true,
        },
      ],
    },

    // Default Settings
    {
      name: 'defaults',
      type: 'group',
      label: 'Default Settings',
      fields: [
        {
          name: 'defaultModelType',
          type: 'select',
          label: 'Default Model Type',
          defaultValue: 'lv',
          options: [
            { label: 'LV (Light Vehicle)', value: 'lv' },
            { label: 'ASM', value: 'asm' },
            { label: 'J-4444', value: 'j4444' },
            { label: 'Pad', value: 'pad' },
          ],
        },
        {
          name: 'fallbackVideoUrl',
          type: 'text',
          label: 'Fallback Video URL',
          admin: {
            description: 'URL to use when video media is not available',
          },
        },
        {
          name: 'fallbackPdfPath',
          type: 'text',
          label: 'Fallback PDF Path',
          defaultValue: './assets/pdfs/Pads.pdf',
          admin: {
            description: 'Path to use when PDF media is not available',
          },
        },
      ],
    },

    // Environment Metadata
    {
      name: 'environment',
      type: 'group',
      label: 'Environment',
      admin: {
        description: 'Version and update tracking',
      },
      fields: [
        {
          name: 'version',
          type: 'text',
          label: 'Version',
          defaultValue: '1.0.0',
        },
        {
          name: 'lastUpdated',
          type: 'date',
          label: 'Last Updated',
          admin: {
            readOnly: true,
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          hooks: {
            beforeChange: [
              () => {
                return new Date().toISOString()
              },
            ],
          },
        },
      ],
    },
  ],
}

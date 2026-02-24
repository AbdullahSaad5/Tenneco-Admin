import type { CollectionConfig, FieldHook } from 'payload'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

// Converts legacy plain-string descriptions (from old textarea fields) to a valid
// Lexical SerializedEditorState so the rich text editor can open existing records.
const migrateStringToRichText: FieldHook = ({ value }) => {
  if (typeof value === 'string' && value.trim()) {
    return {
      root: {
        children: [
          {
            children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: value, type: 'text', version: 1 }],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    }
  }
  return value
}

export const HotspotConfigurations: CollectionConfig = {
  slug: 'hotspot-configurations',
  admin: {
    useAsTitle: 'vehicleType',
    defaultColumns: ['vehicleType', 'hotspots'],
    description: 'Hotspot configurations keyed by vehicle type',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Vehicle Type (Primary Key)
    {
      name: 'vehicleType',
      type: 'relationship',
      relationTo: 'vehicle-types',
      label: 'Vehicle Type',
      required: true,
      unique: true,
      admin: {
        description: 'Type of vehicle (must be unique - one hotspot config per vehicle type)',
      },
    },

    // Expanded Hotspots Array (visible when model is opened/exploded)
    {
      name: 'hotspots',
      type: 'array',
      label: 'Expanded Hotspots (visible when model is opened)',
      admin: {
        description: 'Interactive hotspots shown in 3D space when the brake model is in its exploded/expanded state. Clicking these highlights the related part.',
      },
      fields: [
        {
          name: 'hotspotId',
          type: 'text',
          label: 'Hotspot ID',
          required: true,
          admin: {
            description: 'Unique identifier for this hotspot (e.g., brake-caliper, brake-pad)',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (Default)',
          required: true,
          admin: {
            description: 'Default label text shown on hover (usually English)',
          },
        },
        {
          name: 'labelTranslations',
          type: 'array',
          label: 'Label Translations',
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
              label: 'Translated Label',
              required: true,
            },
          ],
        },
        {
          name: 'position',
          type: 'group',
          label: 'Position (Vector3)',
          admin: {
            description: 'Position of the hotspot in 3D space',
          },
          fields: [
            {
              name: 'x',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            {
              name: 'y',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            {
              name: 'z',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'color',
          type: 'text',
          label: 'Color',
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for the hotspot',
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
          admin: {
            description: 'Show/hide this hotspot',
          },
        },
        {
          name: 'infoSide',
          type: 'select',
          label: 'Info Panel Side',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          admin: {
            description: 'Which side of the screen the info panel appears on when this hotspot is clicked',
          },
        },

        // Hotspot Info Content
        {
          name: 'info',
          type: 'group',
          label: 'Information Panel',
          admin: {
            description: 'Content shown when hotspot is clicked/activated',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title (Default)',
              admin: {
                description: 'Default title for info panel (usually English)',
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
              name: 'description',
              type: 'richText',
              label: 'Description (Default)',
              hooks: { afterRead: [migrateStringToRichText] },
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  UploadFeature({ collections: { media: { fields: [] } } }),
                ],
              }),
            },
            {
              name: 'descriptionTranslations',
              type: 'array',
              label: 'Description Translations',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                  label: 'Language Code',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'richText',
                  label: 'Translated Description',
                  required: true,
                  hooks: { afterRead: [migrateStringToRichText] },
                  editor: lexicalEditor({
                    features: ({ defaultFeatures }) => [
                      ...defaultFeatures,
                      UploadFeature({ collections: { media: { fields: [] } } }),
                    ],
                  }),
                },
              ],
            },

            // PDF Resources (Optional - falls back to Brake Configuration)
            {
              name: 'pdf',
              type: 'text',
              label: 'PDF Path',
              admin: {
                description: 'PDF path for this hotspot. Leave empty to use the brake configuration PDF, or hide if neither exists.',
              },
            },
            {
              name: 'pdfMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF Upload',
              admin: {
                description: 'Upload PDF file (takes precedence over path). Falls back to brake config if empty.',
              },
            },

            // Video Resources (Optional - falls back to Brake Configuration)
            {
              name: 'video',
              type: 'text',
              label: 'Video URL',
              admin: {
                description: 'Video URL for this hotspot. Leave empty to use the brake configuration video, or hide if neither exists.',
              },
            },
            {
              name: 'videoMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'Video Upload',
              admin: {
                description: 'Upload video file (takes precedence over URL). Falls back to brake config if empty.',
              },
            },
          ],
        },
      ],
    },

    // Collapsed Hotspots Array (visible when model is closed/collapsed)
    {
      name: 'collapsedHotspots',
      type: 'array',
      label: 'Collapsed Hotspots (visible when model is closed)',
      admin: {
        description: 'Interactive hotspots shown on the closed brake model. Clicking these only opens the info panel — no part highlighting or opacity changes.',
      },
      fields: [
        {
          name: 'hotspotId',
          type: 'text',
          label: 'Hotspot ID',
          required: true,
          admin: {
            description: 'Unique identifier for this hotspot (e.g., brake-caliper, brake-pad)',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (Default)',
          required: true,
          admin: {
            description: 'Default label text shown on hover (usually English)',
          },
        },
        {
          name: 'labelTranslations',
          type: 'array',
          label: 'Label Translations',
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
              label: 'Translated Label',
              required: true,
            },
          ],
        },
        {
          name: 'position',
          type: 'group',
          label: 'Position (Vector3)',
          admin: {
            description: 'Position of the hotspot in 3D space',
          },
          fields: [
            {
              name: 'x',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            {
              name: 'y',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
            {
              name: 'z',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'color',
          type: 'text',
          label: 'Color',
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for the hotspot',
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
          admin: {
            description: 'Show/hide this hotspot',
          },
        },
        {
          name: 'infoSide',
          type: 'select',
          label: 'Info Panel Side',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          admin: {
            description: 'Which side of the screen the info panel appears on when this hotspot is clicked',
          },
        },

        // Hotspot Info Content
        {
          name: 'info',
          type: 'group',
          label: 'Information Panel',
          admin: {
            description: 'Content shown when hotspot is clicked/activated',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title (Default)',
              admin: {
                description: 'Default title for info panel (usually English)',
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
              name: 'description',
              type: 'richText',
              label: 'Description (Default)',
              hooks: { afterRead: [migrateStringToRichText] },
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  UploadFeature({ collections: { media: { fields: [] } } }),
                ],
              }),
            },
            {
              name: 'descriptionTranslations',
              type: 'array',
              label: 'Description Translations',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                  label: 'Language Code',
                  required: true,
                },
                {
                  name: 'value',
                  type: 'richText',
                  label: 'Translated Description',
                  required: true,
                  hooks: { afterRead: [migrateStringToRichText] },
                  editor: lexicalEditor({
                    features: ({ defaultFeatures }) => [
                      ...defaultFeatures,
                      UploadFeature({ collections: { media: { fields: [] } } }),
                    ],
                  }),
                },
              ],
            },

            // PDF Resources (Optional - falls back to Brake Configuration)
            {
              name: 'pdf',
              type: 'text',
              label: 'PDF Path',
              admin: {
                description: 'PDF path for this hotspot. Leave empty to use the brake configuration PDF, or hide if neither exists.',
              },
            },
            {
              name: 'pdfMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF Upload',
              admin: {
                description: 'Upload PDF file (takes precedence over path). Falls back to brake config if empty.',
              },
            },

            // Video Resources (Optional - falls back to Brake Configuration)
            {
              name: 'video',
              type: 'text',
              label: 'Video URL',
              admin: {
                description: 'Video URL for this hotspot. Leave empty to use the brake configuration video, or hide if neither exists.',
              },
            },
            {
              name: 'videoMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'Video Upload',
              admin: {
                description: 'Upload video file (takes precedence over URL). Falls back to brake config if empty.',
              },
            },
          ],
        },
      ],
    },
  ],
}

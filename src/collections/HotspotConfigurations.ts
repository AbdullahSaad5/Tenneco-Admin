import type { CollectionConfig } from 'payload'

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

    // Hotspots Array
    {
      name: 'hotspots',
      type: 'array',
      label: 'Hotspots',
      admin: {
        description: 'Interactive hotspots in 3D space for this vehicle type',
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
              type: 'textarea',
              label: 'Description (Default)',
              admin: {
                description: 'Default description text (usually English)',
              },
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
                  type: 'textarea',
                  label: 'Translated Description',
                  required: true,
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

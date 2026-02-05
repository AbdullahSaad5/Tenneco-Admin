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
      type: 'select',
      label: 'Vehicle Type',
      required: true,
      unique: true,
      options: [
        { label: 'Light Vehicles', value: 'light' },
        { label: 'Commercial Vehicles', value: 'commercial' },
        { label: 'Rail', value: 'rail' },
      ],
      admin: {
        description: 'Type of vehicle (must be unique - one hotspot config per vehicle type)',
      },
    },

    // Default Resources
    {
      name: 'defaults',
      type: 'group',
      label: 'Default Resources',
      admin: {
        description: 'Default PDF and video paths used when individual hotspots do not specify their own',
      },
      fields: [
        {
          name: 'pdf',
          type: 'text',
          label: 'Default PDF Path',
          admin: {
            description: 'Default PDF path for hotspots (e.g., /documents/brake-overview.pdf)',
          },
        },
        {
          name: 'video',
          type: 'text',
          label: 'Default Video URL',
          admin: {
            description: 'Default video URL for hotspots',
          },
        },
      ],
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
          name: 'targetModel',
          type: 'select',
          label: 'Target Model (Component)',
          options: [
            { label: 'ASM (Assembly)', value: 'asm' },
            { label: 'J-4444', value: 'j4444' },
            { label: 'Pad', value: 'pad' },
          ],
          admin: {
            description: 'Brake component model to navigate to when clicked',
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

            // PDF Resources
            {
              name: 'pdf',
              type: 'text',
              label: 'PDF Path (Override)',
              admin: {
                description: 'PDF path specific to this hotspot (overrides default)',
              },
            },
            {
              name: 'pdfMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF Upload',
              admin: {
                description: 'Upload PDF file (takes precedence over path)',
              },
            },

            // Video Resources
            {
              name: 'video',
              type: 'text',
              label: 'Video URL (Override)',
              admin: {
                description: 'Video URL specific to this hotspot (overrides default)',
              },
            },
            {
              name: 'videoMedia',
              type: 'upload',
              relationTo: 'media',
              label: 'Video Upload',
              admin: {
                description: 'Upload video file (takes precedence over URL)',
              },
            },
          ],
        },
      ],
    },
  ],
}

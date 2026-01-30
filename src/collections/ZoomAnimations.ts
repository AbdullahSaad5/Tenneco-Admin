import type { CollectionConfig } from 'payload'

export const ZoomAnimations: CollectionConfig = {
  slug: 'zoom-animations',
  admin: {
    useAsTitle: 'vehicleType',
    defaultColumns: ['vehicleType', 'stages'],
    description: 'Zoom animation sequences by vehicle type',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Vehicle Type
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
        description: 'Type of vehicle (must be unique)',
      },
    },

    // Animation Stages
    {
      name: 'stages',
      type: 'array',
      label: 'Animation Stages',
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Sequential animation stages (typically 4 stages)',
      },
      fields: [
        {
          name: 'order',
          type: 'number',
          label: 'Order',
          required: true,
          defaultValue: 1,
          admin: {
            description: 'Sequence order (1, 2, 3, etc.)',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Stage Name',
          required: true,
          admin: {
            description: 'Internal name (e.g., vehicle, wheel, brake, mechanism)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: true,
          admin: {
            description: 'Image for this animation stage',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title (Default)',
          required: true,
          admin: {
            description: 'Default title shown during this stage (usually English)',
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
          name: 'label',
          type: 'group',
          label: 'Label',
          admin: {
            description: 'Text label and styling',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Text (Default)',
              required: true,
              admin: {
                description: 'Default main label text (e.g., VEHICLE, WHEEL SYSTEM)',
              },
            },
            {
              name: 'textTranslations',
              type: 'array',
              label: 'Text Translations',
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
                  label: 'Translated Text',
                  required: true,
                },
              ],
            },
            {
              name: 'subtext',
              type: 'text',
              label: 'Subtext (Default)',
              admin: {
                description: 'Default secondary text (e.g., Initializing scan...)',
              },
            },
            {
              name: 'subtextTranslations',
              type: 'array',
              label: 'Subtext Translations',
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
                  label: 'Translated Subtext',
                  required: true,
                },
              ],
            },
            {
              name: 'color',
              type: 'group',
              label: 'Colors',
              fields: [
                {
                  name: 'primary',
                  type: 'text',
                  label: 'Primary Color',
                  defaultValue: '#3b82f6',
                  admin: {
                    description: 'Hex color code',
                  },
                },
                {
                  name: 'secondary',
                  type: 'text',
                  label: 'Secondary Color',
                  defaultValue: '#60a5fa',
                  admin: {
                    description: 'Hex color code',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (ms)',
          required: true,
          defaultValue: 2000,
          admin: {
            description: 'How long this stage displays (milliseconds)',
          },
        },
        {
          name: 'effects',
          type: 'group',
          label: 'Visual Effects',
          admin: {
            description: 'Animation effects for this stage',
          },
          fields: [
            {
              name: 'scale',
              type: 'group',
              label: 'Scale',
              fields: [
                {
                  name: 'from',
                  type: 'number',
                  label: 'From',
                  defaultValue: 1,
                  admin: {
                    description: 'Starting scale',
                  },
                },
                {
                  name: 'to',
                  type: 'number',
                  label: 'To',
                  defaultValue: 1,
                  admin: {
                    description: 'Ending scale',
                  },
                },
              ],
            },
            {
              name: 'blur',
              type: 'group',
              label: 'Blur',
              fields: [
                {
                  name: 'from',
                  type: 'number',
                  label: 'From',
                  defaultValue: 0,
                  admin: {
                    description: 'Starting blur (pixels)',
                  },
                },
                {
                  name: 'to',
                  type: 'number',
                  label: 'To',
                  defaultValue: 0,
                  admin: {
                    description: 'Ending blur (pixels)',
                  },
                },
              ],
            },
            {
              name: 'rotation',
              type: 'group',
              label: 'Rotation (Optional)',
              fields: [
                {
                  name: 'from',
                  type: 'number',
                  label: 'From',
                  defaultValue: 0,
                  admin: {
                    description: 'Starting rotation (degrees)',
                  },
                },
                {
                  name: 'to',
                  type: 'number',
                  label: 'To',
                  defaultValue: 0,
                  admin: {
                    description: 'Ending rotation (degrees)',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

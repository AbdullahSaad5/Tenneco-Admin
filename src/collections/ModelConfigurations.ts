import type { CollectionConfig } from 'payload'

export const ModelConfigurations: CollectionConfig = {
  slug: 'model-configurations',
  admin: {
    useAsTitle: 'modelType',
    defaultColumns: ['modelType', 'version', 'isActive'],
    description: '3D Model configurations with transforms, hotspots, and info',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Model Type
    {
      name: 'modelType',
      type: 'select',
      label: 'Model Type',
      required: true,
      unique: true,
      options: [
        { label: 'LV (Light Vehicle)', value: 'lv' },
        { label: 'ASM', value: 'asm' },
        { label: 'J-4444', value: 'j4444' },
        { label: 'Pad', value: 'pad' },
      ],
      admin: {
        description: 'Type of 3D model (must be unique)',
      },
    },

    // Model File
    {
      name: 'modelFile',
      type: 'group',
      label: 'Model File',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: '3D Model File',
          required: true,
          admin: {
            description: 'Upload GLB/GLTF 3D model file',
          },
        },
        {
          name: 'fallbackPath',
          type: 'text',
          label: 'Fallback Path',
          admin: {
            description: 'Local path to use if media upload fails (e.g., ./models/lv_file.glb)',
          },
        },
      ],
    },

    // Transform Settings
    {
      name: 'transform',
      type: 'group',
      label: 'Transform Settings',
      admin: {
        description: 'Position, rotation, and scale for the 3D model',
      },
      fields: [
        {
          name: 'scale',
          type: 'number',
          label: 'Scale',
          required: true,
          defaultValue: 1,
          admin: {
            description: 'Uniform scale factor',
          },
        },
        {
          name: 'position',
          type: 'group',
          label: 'Position (X, Y, Z)',
          fields: [
            {
              name: 'x',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'y',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'z',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'rotation',
          type: 'group',
          label: 'Rotation (X, Y, Z) in radians',
          fields: [
            {
              name: 'x',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'y',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'z',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
        {
          name: 'groundY',
          type: 'number',
          label: 'Ground Y Position',
          defaultValue: -2,
          admin: {
            description: 'Y position of the ground plane',
          },
        },
        {
          name: 'groundOffset',
          type: 'number',
          label: 'Ground Offset',
          defaultValue: 0.15,
          admin: {
            description: 'Offset from ground for model positioning',
          },
        },
      ],
    },

    // Hotspots
    {
      name: 'hotspots',
      type: 'array',
      label: 'Hotspots',
      admin: {
        description: 'Interactive hotspots in 3D space',
      },
      fields: [
        {
          name: 'order',
          type: 'number',
          label: 'Order',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'position',
          type: 'group',
          label: 'Position (X, Y, Z)',
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
          name: 'label',
          type: 'text',
          label: 'Label (Default)',
          required: true,
          admin: {
            description: 'Default text to display on hover (usually English)',
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
          name: 'color',
          type: 'text',
          label: 'Color',
          required: true,
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for hotspot',
          },
        },
        {
          name: 'targetModel',
          type: 'select',
          label: 'Target Model',
          options: [
            { label: 'LV', value: 'lv' },
            { label: 'ASM', value: 'asm' },
            { label: 'J-4444', value: 'j4444' },
            { label: 'Pad', value: 'pad' },
          ],
          admin: {
            description: 'Model to navigate to when clicked',
          },
        },
        {
          name: 'action',
          type: 'group',
          label: 'Action',
          fields: [
            {
              name: 'type',
              type: 'select',
              label: 'Action Type',
              defaultValue: 'navigate',
              options: [
                { label: 'Navigate', value: 'navigate' },
                { label: 'Modal', value: 'modal' },
                { label: 'Info', value: 'info' },
              ],
            },
            {
              name: 'payload',
              type: 'text',
              label: 'Payload',
              admin: {
                description: 'Data for the action (e.g., model ID, URL)',
              },
            },
          ],
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
        },
      ],
    },

    // Model Info
    {
      name: 'info',
      type: 'group',
      label: 'Model Information',
      admin: {
        description: 'Details shown in the info panel',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (Default)',
          required: true,
          admin: {
            description: 'Default model name (usually English)',
          },
        },
        {
          name: 'nameTranslations',
          type: 'array',
          label: 'Name Translations',
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
              label: 'Translated Name',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (Default)',
          required: true,
          admin: {
            description: 'Default description (usually English)',
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
        {
          name: 'specs',
          type: 'array',
          label: 'Specifications',
          admin: {
            description: 'Key features and specs',
          },
          fields: [
            {
              name: 'spec',
              type: 'text',
              label: 'Specification (Default)',
              required: true,
              admin: {
                description: 'Default specification text (usually English)',
              },
            },
            {
              name: 'specTranslations',
              type: 'array',
              label: 'Specification Translations',
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
                  label: 'Translated Specification',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'color',
          type: 'group',
          label: 'Color Theme',
          fields: [
            {
              name: 'gradient',
              type: 'group',
              label: 'Gradient Colors',
              fields: [
                {
                  name: 'from',
                  type: 'text',
                  label: 'From',
                  defaultValue: 'blue-500',
                  admin: {
                    description: 'Tailwind color class',
                  },
                },
                {
                  name: 'to',
                  type: 'text',
                  label: 'To',
                  defaultValue: 'blue-600',
                  admin: {
                    description: 'Tailwind color class',
                  },
                },
              ],
            },
            {
              name: 'solid',
              type: 'text',
              label: 'Solid Color',
              defaultValue: 'blue-600',
              admin: {
                description: 'Tailwind color class',
              },
            },
          ],
        },
      ],
    },

    // Associated Media
    {
      name: 'media',
      type: 'group',
      label: 'Associated Media',
      admin: {
        description: 'PDF documentation and videos',
      },
      fields: [
        {
          name: 'pdf',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF Documentation',
          admin: {
            description: 'Technical documentation PDF',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Video',
          admin: {
            description: 'Promotional or instructional video',
          },
        },
        {
          name: 'fallbackPdfPath',
          type: 'text',
          label: 'Fallback PDF Path',
          admin: {
            description: 'Local path to PDF if upload not available',
          },
        },
        {
          name: 'fallbackVideoUrl',
          type: 'text',
          label: 'Fallback Video URL',
          admin: {
            description: 'URL to video if upload not available',
          },
        },
      ],
    },

    // Metadata
    {
      name: 'version',
      type: 'text',
      label: 'Version',
      defaultValue: '1.0.0',
      admin: {
        description: 'Version number for this configuration',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this model',
      },
    },
  ],
}

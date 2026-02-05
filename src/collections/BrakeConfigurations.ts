import type { CollectionConfig } from 'payload'

export const BrakeConfigurations: CollectionConfig = {
  slug: 'brake-configurations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['vehicleType', 'name', 'isActive'],
    description: '3D Brake model configurations keyed by vehicle type',
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
        description: 'Type of vehicle (must be unique - one brake config per vehicle type)',
      },
    },

    // Display Name
    {
      name: 'name',
      type: 'text',
      label: 'Display Name',
      required: true,
      admin: {
        description: 'Human-readable name for this brake configuration',
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
          label: '3D Brake Model File',
          admin: {
            description: 'Upload GLB/GLTF 3D brake model file',
          },
        },
        {
          name: 'fallbackPath',
          type: 'text',
          label: 'Fallback Path',
          admin: {
            description: 'Local path to use if media upload not available (e.g., ./models/brake_asm.glb)',
          },
        },
      ],
    },

    // Transform Settings
    {
      name: 'scale',
      type: 'group',
      label: 'Scale (Vector3)',
      admin: {
        description: 'Scale factor for the brake model',
      },
      fields: [
        {
          name: 'x',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'y',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'z',
          type: 'number',
          defaultValue: 1,
        },
      ],
    },
    {
      name: 'rotation',
      type: 'group',
      label: 'Rotation (Vector3 in radians)',
      admin: {
        description: 'Rotation angles for the brake model',
      },
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
      name: 'position',
      type: 'group',
      label: 'Position (Vector3)',
      admin: {
        description: 'Initial position of the brake model',
      },
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

    // Center Model Setting
    {
      name: 'centerModel',
      type: 'checkbox',
      label: 'Center Model',
      defaultValue: true,
      admin: {
        description: 'Whether to automatically center the model in the viewer',
      },
    },

    // Scale Configuration
    {
      name: 'scaleConfig',
      type: 'group',
      label: 'Scale Configuration',
      admin: {
        description: 'Scale settings for different viewing modes',
      },
      fields: [
        {
          name: 'transitionScale',
          type: 'number',
          label: 'Transition Scale',
          defaultValue: 1,
          admin: {
            description: 'Scale during transition animations',
          },
        },
        {
          name: 'viewerScale',
          type: 'number',
          label: 'Viewer Scale',
          defaultValue: 1,
          admin: {
            description: 'Scale when displayed in the 3D viewer',
          },
        },
      ],
    },

    // Explosion Hotspot (for exploded view)
    {
      name: 'explosionHotspot',
      type: 'group',
      label: 'Explosion Hotspot',
      admin: {
        description: 'Hotspot position and label for triggering exploded view',
      },
      fields: [
        {
          name: 'position',
          type: 'group',
          label: 'Position (Vector3)',
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
          name: 'color',
          type: 'text',
          label: 'Color',
          defaultValue: '#3b82f6',
          admin: {
            description: 'Hex color code for the explosion hotspot',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (Default)',
          defaultValue: 'Explode View',
          admin: {
            description: 'Default label text (usually English)',
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
      ],
    },

    // Associated Media
    {
      name: 'media',
      type: 'group',
      label: 'Associated Media',
      admin: {
        description: 'PDF documentation and videos for this brake configuration',
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
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this brake configuration',
      },
    },
  ],
}

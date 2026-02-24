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
      type: 'relationship',
      relationTo: 'vehicle-types',
      label: 'Vehicle Type',
      required: true,
      unique: true,
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

    // Collapse Hotspot (for collapsing exploded view)
    {
      name: 'collapseHotspot',
      type: 'group',
      label: 'Collapse Hotspot',
      admin: {
        description: 'Hotspot position and label for collapsing the exploded view back to normal',
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
              defaultValue: 0.8,
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
          defaultValue: '#ef4444',
          admin: {
            description: 'Hex color code for the collapse hotspot',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label (Default)',
          defaultValue: 'Collapse View',
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

    // Associated Media (Fallback for Hotspots)
    {
      name: 'media',
      type: 'group',
      label: 'Default Media (Fallback)',
      admin: {
        description: 'PDF and video shown when a hotspot does not have its own media. If empty, the PDF/Video button will be hidden.',
      },
      fields: [
        {
          name: 'pdf',
          type: 'upload',
          relationTo: 'media',
          label: 'Default PDF Documentation',
          admin: {
            description: 'Fallback PDF shown when hotspot has no PDF. Leave empty to hide PDF button for hotspots without their own PDF.',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Default Video',
          admin: {
            description: 'Fallback video shown when hotspot has no video. Leave empty to hide Video button for hotspots without their own video.',
          },
        },
        {
          name: 'fallbackPdfPath',
          type: 'text',
          label: 'Fallback PDF Path',
          admin: {
            description: 'Local path to PDF if upload not available (e.g., /documents/brake.pdf)',
          },
        },
        {
          name: 'fallbackVideoUrl',
          type: 'text',
          label: 'Fallback Video URL',
          admin: {
            description: 'URL to video if upload not available (e.g., YouTube embed URL)',
          },
        },
      ],
    },

    // Overall Brake Info (shown in collapsed state)
    {
      name: 'overallInfo',
      type: 'group',
      label: 'Overall Brake Info',
      admin: {
        description: 'Optional info panel shown when the brake model is in its collapsed (default) state. Leave blank to hide.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title (Default)',
          admin: {
            description: 'Default title text (usually English)',
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
            description: 'Supports Markdown. Default description text (usually English)',
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
      ],
    },

    // Scene Colors (when brake model is shown)
    {
      name: 'gridColor',
      type: 'text',
      label: 'Grid Lines Color',
      admin: {
        description: 'Hex color the grid lines animate to when the brake model is shown (e.g. #93c5fd). Leave empty to keep the default grid line color.',
      },
    },
    {
      name: 'sceneBackgroundColor',
      type: 'text',
      label: 'Scene Background Color',
      admin: {
        description: 'Hex color the scene background animates to when the brake model is shown (e.g. #eff6ff). Leave empty to keep the default background color.',
      },
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

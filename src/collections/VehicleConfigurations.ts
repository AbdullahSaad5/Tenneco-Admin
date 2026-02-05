import type { CollectionConfig } from 'payload'

export const VehicleConfigurations: CollectionConfig = {
  slug: 'vehicle-configurations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['vehicleType', 'name', 'isActive'],
    description: '3D Vehicle model configurations keyed by vehicle type',
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
        description: 'Type of vehicle (must be unique - one config per vehicle type)',
      },
    },

    // Display Name
    {
      name: 'name',
      type: 'text',
      label: 'Display Name',
      required: true,
      admin: {
        description: 'Human-readable name for this vehicle configuration',
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
          admin: {
            description: 'Upload GLB/GLTF 3D model file',
          },
        },
        {
          name: 'fallbackPath',
          type: 'text',
          label: 'Fallback Path',
          admin: {
            description: 'Local path to use if media upload not available (e.g., ./models/light_vehicle.glb)',
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
        description: 'Scale factor for the model',
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
        description: 'Rotation angles for the model',
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
        description: 'Initial position of the model',
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

    // Tire Position (for wheel zoom)
    {
      name: 'tirePosition',
      type: 'group',
      label: 'Tire Position (Vector3)',
      admin: {
        description: 'Position of the tire/wheel for zoom animations',
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

    // Camera Start Position
    {
      name: 'cameraStart',
      type: 'group',
      label: 'Camera Start Position (Vector3)',
      admin: {
        description: 'Initial camera position when viewing this vehicle',
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
          defaultValue: 2,
        },
        {
          name: 'z',
          type: 'number',
          defaultValue: 5,
        },
      ],
    },

    // Camera Zoom Target
    {
      name: 'cameraZoomTarget',
      type: 'group',
      label: 'Camera Zoom Target (Vector3)',
      admin: {
        description: 'Camera position when zoomed in on brake',
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
          defaultValue: 2,
        },
      ],
    },

    // Zoom Configuration
    {
      name: 'zoomConfig',
      type: 'group',
      label: 'Zoom Configuration',
      admin: {
        description: 'Configuration for zoom animation behavior',
      },
      fields: [
        {
          name: 'initialScale',
          type: 'number',
          label: 'Initial Scale',
          defaultValue: 1,
          admin: {
            description: 'Scale when first loaded',
          },
        },
        {
          name: 'initialLookAtTarget',
          type: 'group',
          label: 'Initial Look-At Target (Vector3)',
          admin: {
            description: 'Point the camera looks at initially',
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
          name: 'zoomLookAtTarget',
          type: 'group',
          label: 'Zoom Look-At Target (Vector3)',
          admin: {
            description: 'Point the camera looks at when zoomed',
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
          name: 'zoomIntensity',
          type: 'number',
          label: 'Zoom Intensity',
          defaultValue: 1,
          admin: {
            description: 'Multiplier for zoom effect (higher = more zoom)',
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
        description: 'Enable/disable this vehicle configuration',
      },
    },
  ],
}

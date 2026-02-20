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
      type: 'relationship',
      relationTo: 'vehicle-types',
      label: 'Vehicle Type',
      required: true,
      unique: true,
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

    // Animation Settings
    {
      name: 'animationStartDelay',
      type: 'number',
      label: 'Animation Start Delay (seconds)',
      defaultValue: 0,
      admin: {
        description: 'Seconds to wait (camera held at start position) before the animation begins. Applies whether showcase is enabled or not.',
      },
    },
    {
      name: 'zoomDuration',
      type: 'number',
      label: 'Zoom Duration (seconds)',
      defaultValue: 2,
      admin: {
        description: 'How many seconds the camera takes to zoom in towards the brake after the vehicle turns blue.',
      },
    },

    // Showcase Animation
    {
      name: 'showcaseEnabled',
      type: 'checkbox',
      label: 'Enable Showcase Animation',
      defaultValue: true,
      admin: {
        description: 'When enabled, the camera orbits around the vehicle before the main animation',
      },
    },
    {
      name: 'showcaseWaypoints',
      type: 'array',
      label: 'Showcase Camera Waypoints',
      admin: {
        description: 'Camera positions the showcase orbit moves through (in order). Each has a 3D position, travel duration, and optional linger time.',
        condition: (data) => data.showcaseEnabled !== false,
      },
      fields: [
        {
          name: 'position',
          type: 'group',
          label: 'Camera Position (Vector3)',
          fields: [
            { name: 'x', type: 'number', defaultValue: 0 },
            { name: 'y', type: 'number', defaultValue: 3 },
            { name: 'z', type: 'number', defaultValue: 10 },
          ],
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Travel Duration (seconds)',
          defaultValue: 2,
          admin: {
            description: 'Seconds to travel from previous position to this one',
          },
        },
        {
          name: 'pause',
          type: 'number',
          label: 'Linger Duration (seconds)',
          defaultValue: 0,
          admin: {
            description: 'Extra time to slow down near this position (0 = no lingering)',
          },
        },
      ],
    },
    {
      name: 'showcaseReturnDuration',
      type: 'number',
      label: 'Showcase Return Duration (seconds)',
      defaultValue: 2,
      admin: {
        description: 'Seconds for the camera to return to the start position after the last waypoint',
        condition: (data) => data.showcaseEnabled !== false,
      },
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

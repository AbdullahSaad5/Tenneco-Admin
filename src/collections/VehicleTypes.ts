import type { CollectionConfig } from 'payload'

export const VehicleTypes: CollectionConfig = {
  slug: 'vehicle-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'isActive'],
    description: 'Vehicle type definitions - the single source of truth for all vehicle categories',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Display Name',
      required: true,
      admin: {
        description: 'Human-readable name (e.g., "Light Vehicles", "Commercial Vehicles")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "light", "commercial", "rail"). Must be unique.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      admin: {
        description: 'Short description of this vehicle type (e.g., "Passenger cars and light trucks")',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 1,
      admin: {
        description: 'Order in which this type appears in lists and navigation',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Enable/disable this vehicle type',
      },
    },
  ],
}

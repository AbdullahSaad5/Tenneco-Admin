import type { CollectionConfig } from 'payload'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  admin: {
    useAsTitle: 'id',
    description: 'Homepage content configuration (Singleton)',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Logo Section
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo Image',
          required: true,
          admin: {
            description: 'Upload the Tenneco logo',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text (Default)',
          defaultValue: 'Tenneco Logo',
          admin: {
            description: 'Default alt text (usually English)',
          },
        },
        {
          name: 'altTranslations',
          type: 'array',
          label: 'Alt Text Translations',
          admin: {
            description: 'Translations for the logo alt text',
          },
          fields: [
            {
              name: 'language',
              type: 'text',
              label: 'Language Code',
              required: true,
              admin: {
                description: 'ISO 639-1 language code (e.g., "it", "fr", "de")',
              },
            },
            {
              name: 'value',
              type: 'text',
              label: 'Translated Alt Text',
              required: true,
            },
          ],
        },
        {
          name: 'width',
          type: 'number',
          defaultValue: 180,
          admin: {
            description: 'Display width in pixels',
          },
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 50,
          admin: {
            description: 'Display height in pixels',
          },
        },
      ],
    },

    // Hero Section
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Main Title (Default)',
          required: true,
          defaultValue: 'Welcome to Tenneco Braking',
          admin: {
            description: 'Default title (usually English)',
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
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (Default)',
          required: true,
          defaultValue: 'Where advanced braking technology meets real world performance',
          admin: {
            description: 'Default subtitle (usually English)',
          },
        },
        {
          name: 'subtitleTranslations',
          type: 'array',
          label: 'Subtitle Translations',
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
              label: 'Translated Subtitle',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description (Default)',
          required: true,
          defaultValue:
            'We deliver one of the most comprehensive brake pad portfolios available, serving passenger cars, commercial vehicles and railway systems',
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
      ],
    },

    // Section Text (above vehicle categories)
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title (Default)',
      defaultValue: 'Select the mobility sector you want to explore',
      admin: {
        description: 'Title displayed above vehicle category cards',
      },
    },
    {
      name: 'sectionTitleTranslations',
      type: 'array',
      label: 'Section Title Translations',
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
          label: 'Translated Section Title',
          required: true,
        },
      ],
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Section Subtitle (Default)',
      admin: {
        description: 'Optional subtitle displayed below section title',
      },
    },
    {
      name: 'sectionSubtitleTranslations',
      type: 'array',
      label: 'Section Subtitle Translations',
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
          label: 'Translated Section Subtitle',
          required: true,
        },
      ],
    },

    // Vehicle Categories
    {
      name: 'vehicleCategories',
      type: 'array',
      label: 'Vehicle Categories',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Configure vehicle category cards',
      },
      fields: [
        {
          name: 'vehicleType',
          type: 'relationship',
          relationTo: 'vehicle-types',
          label: 'Vehicle Type',
          required: true,
          admin: {
            description: 'The vehicle type this category represents',
          },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Display Order',
          required: true,
          defaultValue: 1,
          admin: {
            description: 'Order in which this category appears (1, 2, 3, etc.)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title (Default)',
          required: true,
          admin: {
            description: 'Default title (usually English)',
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
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle (Default)',
          required: true,
          admin: {
            description: 'Default subtitle (usually English)',
          },
        },
        {
          name: 'subtitleTranslations',
          type: 'array',
          label: 'Subtitle Translations',
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
              label: 'Translated Subtitle',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Category Image',
          required: true,
          admin: {
            description: 'Image for this vehicle category',
          },
        },
        {
          name: 'gradient',
          type: 'group',
          label: 'Gradient Colors',
          fields: [
            {
              name: 'from',
              type: 'text',
              label: 'From Color',
              required: true,
              defaultValue: 'blue-600',
              admin: {
                description: 'Tailwind color class (e.g., blue-600)',
              },
            },
            {
              name: 'to',
              type: 'text',
              label: 'To Color',
              required: true,
              defaultValue: 'cyan-500',
              admin: {
                description: 'Tailwind color class (e.g., cyan-500)',
              },
            },
          ],
        },
        {
          name: 'targetRoute',
          type: 'text',
          label: 'Target Route (Optional Override)',
          admin: {
            description: 'Route to navigate to when card is clicked. If not set, auto-generates from vehicleType (e.g., /viewer?type=light)',
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          label: 'Enabled',
          defaultValue: true,
          admin: {
            description: 'Show/hide this category',
          },
        },
      ],
    },
  ],
}

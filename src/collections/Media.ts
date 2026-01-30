import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'category', 'product', 'section', 'url'],
  },

  fields: [
    {
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, data }) => {
            if (req.file) {
              const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${req.file.name}`
              return url
            }
            return data?.url
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'PDF', value: 'pdf' },
        { label: '3D Model', value: '3d-model' },
        { label: 'Icon', value: 'icon' },
        { label: 'Logo', value: 'logo' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Alternative text for accessibility and SEO',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Display title for the media item',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Detailed description of the media content',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: {
        description: 'Tags for better organization and searching',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'product',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'section',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    // cacheTags: false,
  },
}

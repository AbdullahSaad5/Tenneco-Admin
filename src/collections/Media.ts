import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'id', 'url'],
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
      name: 'product',
      type: 'text',
      required: true,
    },
    {
      name: 'section',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    // cacheTags: false,
  },
}

import type { CollectionConfig } from 'payload'

export const Configuration: CollectionConfig = {
  slug: 'configurations',
  admin: {
    useAsTitle: 'product',
    defaultColumns: ['id', 'product', 'page'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'product',
      type: 'text',
      required: true,
    },
    {
      name: 'page',
      type: 'text',
      required: true,
    },
    {
      name: 'config',
      type: 'code',
      required: true,

      admin: {
        language: 'json',
        editorOptions: {
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          lineHeight: 24,
          minimap: { enabled: true },
          wordWrap: 'on',
          fontSize: 14,
        },
        style: {
          height: '300px',
        },
      },
    },
  ],
}

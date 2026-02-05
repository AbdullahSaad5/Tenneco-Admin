import type { CollectionConfig } from 'payload'

export const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'isDefault', 'isEnabled'],
    description: 'Manage available languages for the application',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'ISO 639-1 language code (e.g., "en", "it", "fr", "de", "es")',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Language code is required'
        if (!/^[a-z]{2}$/.test(value)) {
          return 'Language code must be 2 lowercase letters (ISO 639-1 format)'
        }
        return true
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name of the language (e.g., "English", "Italian")',
      },
    },
    {
      name: 'nativeName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the language in its native script (e.g., "English", "Italiano")',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Set as the default language. Only one language should be default.',
      },
    },
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable this language in the application',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      admin: {
        description: 'Display order in language selector (lower numbers appear first)',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        // If this language is being set as default, unset all others
        if (data?.isDefault) {
          const payload = req.payload

          // Find all other default languages
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const otherDefaults = await (payload as any).find({
            collection: 'languages',
            where: {
              isDefault: { equals: true },
              id: { not_equals: data.id || '' },
            },
          })

          // Update them to not be default
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          for (const lang of otherDefaults.docs as any[]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (payload as any).update({
              collection: 'languages',
              id: lang.id,
              data: {
                isDefault: false,
              },
            })
          }
        }

        return data
      },
    ],
  },
}

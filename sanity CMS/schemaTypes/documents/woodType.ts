// schemas/documents/woodType.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'woodType',
  title: 'Wood Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})

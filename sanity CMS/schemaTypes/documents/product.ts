// schemas/documents/product.ts

import { defineField, defineType } from 'sanity'

import { ProductPreview } from '../components/ProductPreview'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),

        // Boolean fields to indicate if the product has size, weight, or height
        defineField({ name: 'hasSize', title: 'Has Size?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => !document?.hasSize  // Shows only if hasSize is true
        }),

        defineField({ name: 'hasWeight', title: 'Has Weight?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'weight',
            title: 'Weight (KG)',
            type: 'number',
            hidden: ({ document }) => !document?.hasWeight  // Shows only if hasWeight is true
        }),


        defineField({ name: 'hasHeight', title: 'Has Height?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'height',
            title: 'Height (Feet)',
            type: 'number',
            hidden: ({ document }) => !document?.hasHeight  // Shows only if hasHeight is true
        }),

        defineField({ name: 'category', title: 'Category', type: 'string' }),

        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
            validation: (Rule) => Rule.max(2)  // Limit to 2 images
        }),

        defineField({ name: 'onSale', title: 'On Sale', type: 'boolean' }),
        defineField({ name: 'price', title: 'Price', type: 'number' }),
        defineField({
            name: 'oldPrice',
            title: 'Old Price',
            type: 'number',
            hidden: ({ document }) => !document?.onSale  // Shows only if onSale is true
        }),


        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Gada', value: 'gada' },
                    { title: 'Dandpaat', value: 'dandpaat' },
                    { title: 'Barbell', value: 'barbell' },
                    { title: 'Combo', value: 'combo' },
                    { title: 'Mudgar', value: 'mudgar' }
                ]
            }
        })
    ],
})

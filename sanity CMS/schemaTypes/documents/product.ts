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
            hidden: ({ document }) => !document?.hasSize
        }),

        defineField({ name: 'hasWeight', title: 'Has Weight?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'weight',
            title: 'Weights (KG)',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => !document?.hasWeight,
            validation: (Rule) => Rule.min(0).error('Weight cannot be 0 KG')
        }),

        defineField({ name: 'hasHeight', title: 'Has Height?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'height',
            title: 'Heights (Feet)',
            type: 'array',
            of: [{ type: 'string' }],
            hidden: ({ document }) => !document?.hasHeight,
            validation: (Rule) => Rule.min(0.1).error('Height cannot be 0 feet')
        }),

        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),

        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
            validation: (Rule) => Rule.max(2).error('Only 2 images are allowed')
        }),

        // Pricing fields with custom validation
        defineField({ name: 'onSale', title: 'On Sale', type: 'boolean' }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.min(0).error('Price must be greater than zero')
        }),
        defineField({
            name: 'oldPrice',
            title: 'Old Price',
            type: 'number',
            hidden: ({ document }) => !document?.onSale,
            validation: (Rule) =>
                Rule.min(0).custom((oldPrice, context) => {
                    if (context.document?.onSale && oldPrice < context.document?.price) {
                        return 'Old price should be greater than or equal to the current price'
                    }
                    return true
                })
        }),

        defineField({
            name: 'type',
            title: 'Product Type',
            type: 'reference',
            to: [{ type: 'productType' }],
        }),
    ],
})

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

        defineField({ name: 'hasWoodType', title: 'Has Wood Type?', type: 'boolean', initialValue: false }),
        defineField({
            name: 'woodType',
            title: 'Wood Types',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'woodType' }],  // Array of accepted types for the reference
                }
            ],
            hidden: ({ document }) => !document?.hasWoodType,
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

       
    ],

    // preview: {
    //     select: {
    //         name: 'name',
    //         description: 'description',
    //         price: 'price',
    //         images: 'images',
    //         type: 'type', // Reference to Product Type
    //     },
    //     component: ProductPreview // Use custom preview component
    // },
    // preview: {
    //     select: {
    //         title: 'name',
    //         subtitle: 'category', // Show category as the subtitle
    //         media: 'images.0', // Display the first image in the preview
    //         price: 'price',
    //         onSale: 'onSale',
    //     },
    //     prepare(selection) {
    //         const { title, subtitle, media, price, onSale } = selection
    //         return {
    //             title: title,
    //             subtitle: `${subtitle} - ₹${price}`,
    //             media: media,
    //             description: onSale ? 'On Sale' : 'Regular Price'
    //         }
    //     }
    // },
})

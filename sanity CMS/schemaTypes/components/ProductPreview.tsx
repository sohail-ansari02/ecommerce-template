// schemas/components/ProductPreview.tsx

import { PortableText } from '@portabletext/react'
import React from 'react'
import { usePreview } from 'sanity'

export const ProductPreview = ({ value }: { value: any }) => {
    // Extract product fields from the value
    const { name, description, price, images, type } = value

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{name}</h2>
            <div style={{ maxWidth: 200, maxHeight: 200, overflow: 'hidden', marginBottom: 10 }}>
                {/* Display the first image */}
                {images?.[0]?.asset?._ref && (
                    <img
                        src={`https://cdn.sanity.io/images/{projectId}/{dataset}/{images[0].asset._ref}.jpg`}
                        alt={name}
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
            </div>
            <p><strong>Price:</strong> ₹{price}</p>
            <p><strong>Type:</strong> {type?.title}</p>
            <p><strong>Description:</strong></p>
            <PortableText value={description} />
        </div>
    )
}

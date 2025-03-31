// src/components/ProductColumns.tsx
import React from 'react';

// Rating template function
export const ratingBodyTemplate = (product: any) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        if (i <= product.rating) {
            stars.push(<span className="star-filled" key={i}>★</span>);
        } else {
            stars.push(<span className="star-empty" key={i}>☆</span>);
        }
    }
    return <div>{stars}</div>;
};

// Price template function
export const priceBodyTemplate = (product: any) => {
    return `$${product.price.toFixed(2)}`;
};

// Image template function
export const imageBodyTemplate = (product: any) => {
    return <img src={`https://example.com/images/${product.image}`} alt={product.name} className="w-6rem" />;
};

// Inventory Status template function
export const inventoryStatusBodyTemplate = (product: any) => {
    return <span className={`status ${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>;
};

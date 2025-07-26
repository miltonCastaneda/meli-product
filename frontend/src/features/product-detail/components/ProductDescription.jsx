import React from 'react';

export const ProductDescription = ({ description }) => (
    <div className="my-8">
        <h2 className="text-2xl font-light text-gray-700 mb-4">Descripción</h2>
        <p className="text-gray-600 whitespace-pre-line text-base">{description}</p>
    </div>
);
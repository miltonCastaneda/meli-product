import React from 'react';

export const Star = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-blue-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
);
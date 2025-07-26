import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from '../../../components/icons';

export const ProductCarousel = ({ title, products, type = 'related', onAction }) => {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    const Card = ({ product }) => {
        if (type === 'brand') {
            return (
                <div className="flex items-center space-x-4 border rounded-lg p-2 min-w-[300px] hover:shadow-md transition-shadow cursor-pointer" onClick={onAction}>
                    <img src={product.image} alt={product.title} className="w-20 h-20 object-contain"/>
                    <div className="text-sm">
                        <p>{product.title} {product.specs}</p>
                        <p className="font-semibold text-lg my-1">{product.price}</p>
                        <p className="text-green-600 text-xs">{product.installments}</p>
                        <p className="text-green-600 text-xs font-semibold">{product.shipping}</p>
                    </div>
                </div>
            )
        }
        
        return (
            <div className="border rounded-lg min-w-[220px] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={onAction}>
                <div className="relative">
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
                    {product.promo && <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">{product.promo}</div>}
                </div>
                <div className="p-4 border-t">
                    <p className="text-sm truncate">{product.title}</p>
                    {product.original_price && <p className="text-xs text-gray-500 line-through mt-2">{product.original_price}</p>}
                    <div className="flex items-center">
                        <p className="text-lg font-semibold">{product.price}</p>
                        {product.discount && <p className="text-green-600 text-sm ml-2">{product.discount}</p>}
                    </div>
                    <p className="text-xs text-green-600">{product.installments}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{product.shipping}</p>
                </div>
            </div>
        )
    };

    return (
        <div className="my-8">
            <h2 className="text-2xl font-light text-gray-700 mb-4">{title}</h2>
            <div className="relative">
                <button onClick={() => scroll('left')} className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-110 hidden lg:block">
                    <ChevronLeft className="w-6 h-6 text-blue-500" />
                </button>
                <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                    {products.map((p, i) => <Card key={i} product={p} />)}
                </div>
                 <button onClick={() => scroll('right')} className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-110 hidden lg:block">
                    <ChevronRight className="w-6 h-6 text-blue-500" />
                </button>
            </div>
            {type === 'brand' && <a href="#" className="text-blue-500 text-sm mt-4 block">Ver más productos de Samsung</a>}
        </div>
    );
};
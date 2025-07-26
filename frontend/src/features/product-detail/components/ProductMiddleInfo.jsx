import React from 'react';
import { Heart, Star, ChevronRight } from '../../../components/icons';

export const ProductMiddleInfo = ({ data }) => {
    const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <Star key={i} filled={i < rating} />);

    return (
        <div className="mt-4 lg:mt-0">
            <div className="hidden lg:flex items-center text-xs text-gray-500 mb-2">
                <a href="#" className="text-blue-500 hover:text-blue-700">Visita la Tienda oficial de Samsung</a>
                <ChevronRight className="w-3 h-3 text-gray-400 mx-1"/>
            </div>
            <div className="text-xs text-gray-500 mb-2 flex items-center">
                <span>{data.condition}</span>
                <span className="mx-2">|</span>
                <span>{data.sold_quantity.toLocaleString()} vendidos</span>
                <Heart className="w-5 h-5 text-blue-500 ml-auto cursor-pointer" />
            </div>
            
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 my-1">{data.title}</h1>
            
            <div className="bg-orange-500 text-white text-xs font-bold inline-block px-2 py-1 rounded-sm my-2">MÁS VENDIDO</div>
            <span className="text-xs text-gray-500 ml-1">en Celulares y Smartphones</span>
            
            <div className="flex items-center my-2">
                <span className="text-blue-500 font-semibold mr-2">{data.rating.average}</span>
                {renderStars(data.rating.average)}
                <span className="text-blue-500 text-sm ml-2 hover:text-blue-700 cursor-pointer">({data.rating.count})</span>
            </div>

            {data.original_price && (
                <div className="text-base text-gray-500 line-through">
                    {data.price.currency} {data.original_price.toLocaleString()}
                </div>
            )}
            <div className="flex items-baseline my-1">
                <span className="text-3xl lg:text-4xl text-gray-800">{data.price.currency} {data.price.amount.toLocaleString()}</span>
                {data.discount_percentage && (
                    <span className="text-green-600 text-lg lg:text-xl ml-2">{data.discount_percentage}% OFF</span>
                )}
            </div>
            <div className="text-base">en <span className="text-green-600">{data.price.installments.quantity}x de ${data.price.installments.amount.toFixed(2).replace('.',',')} sin interés</span></div>
            <div className="text-sm my-1 text-blue-500 font-semibold">10% OFF OCA Blue Visa</div>
            <a href="#" className="text-blue-500 text-sm my-1 block">Ver los medios de pago</a>

            <div className="my-6">
                <span className="font-semibold text-sm">Color: <strong>Azul oscuro</strong></span>
                <div className="w-10 h-10 border-2 border-blue-500 rounded-md cursor-pointer mt-2 flex items-center justify-center p-0.5">
                    <div className="w-full h-full bg-blue-900 rounded-sm"></div>
                </div>
            </div>

            <div className="hidden lg:block my-6 border-t border-b py-4">
                <h3 className="font-semibold mb-2">Lo que tienes que saber de este producto</h3>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-600">
                    {data.key_features.map((feature, i) => <li key={i}>{feature}</li>)}
                </ul>
                <a href="#" className="text-blue-500 text-sm mt-4 block">Ver características</a>
            </div>
             <div className="hidden lg:block text-sm">
                Opciones de compra: <br/>
                <a href="#" className="text-blue-500 font-semibold">3 productos nuevos desde US$ 439</a>
            </div>
        </div>
    );
}
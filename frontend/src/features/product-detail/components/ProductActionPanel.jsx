import React from 'react';
import { Truck, Undo2, ShieldCheck, ShieldQuestion } from '../../../components/icons';

export const ProductActionPanel = ({ data, onAction }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg h-full flex flex-col">
            <div className="flex items-start space-x-3 my-4">
                <Truck className="w-6 h-6 text-green-600 mt-1"/>
                <div>
                    <div className="text-green-600">Envío gratis a todo el país</div>
                    <div className="text-sm text-gray-500">Conocé los tiempos y las formas de envío.</div>
                    <a href="#" className="text-blue-500 text-sm">Calcular cuándo llega</a>
                </div>
            </div>

            <p className="font-semibold text-gray-800 mb-2">Stock disponible</p>
            <div className="flex items-center space-x-2 my-2">
                <label htmlFor="quantity" className="text-sm font-semibold">Cantidad:</label>
                <select id="quantity" className="border border-gray-300 rounded-md p-1 text-sm">
                    {[...Array(1).keys()].map(i => (
                        <option key={i+1} value={i+1}>{i+1} unidad</option>
                    ))}
                </select>
                <span className="text-sm text-gray-500">({data.stock} disponibles)</span>
            </div>
            
            <div className="flex flex-col space-y-2 my-4">
                <button onClick={onAction} className="bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors">Comprar ahora</button>
                <button onClick={onAction} className="bg-blue-100 text-blue-500 font-semibold py-3 rounded-md hover:bg-blue-200 transition-colors">Agregar al carrito</button>
            </div>
            
            <div className="space-y-4 text-sm mt-4 text-gray-600">
                <div className="flex items-start space-x-2">
                    <Undo2 className="w-5 h-5 mt-0.5"/>
                    <p><a href="#" className="text-blue-500">Devolución gratis.</a> Tienes 30 días desde que lo recibes.</p>
                </div>
                 <div className="flex items-start space-x-2">
                    <ShieldCheck className="w-5 h-5 mt-0.5 text-gray-400"/>
                    <p><a href="#" className="text-blue-500">Compra Protegida</a>, recibe el producto que esperabas o te devolvemos tu dinero.</p>
                </div>
                 <div className="flex items-start space-x-2">
                    <ShieldQuestion className="w-5 h-5 mt-0.5 text-gray-400"/>
                    <p>1 años de garantía de fábrica.</p>
                </div>
            </div>
        </div>
    );
};
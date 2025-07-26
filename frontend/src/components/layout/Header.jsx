import React from 'react';
import { Menu, Search, ShoppingCart, MapPin, ChevronRight } from '../icons';

export const Header = () => (
    <header className="bg-yellow-300 shadow-sm w-full sticky top-0 z-30">
        {/* Vista de Escritorio */}
        <div className="hidden lg:flex container mx-auto justify-between items-center text-sm text-gray-700 p-2">
            <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" alt="Mercado Libre" className="h-8" />
            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <input type="text" placeholder="Buscar productos, marcas y más..." className="w-full p-2 rounded-sm border-gray-300 shadow-sm text-base pr-10" />
                    <button className="absolute right-0 top-0 h-full px-3 text-gray-400">
                        <Search className="w-5 h-5"/>
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
                <span>Crea tu cuenta</span>
                <span>Ingresa</span>
                <span>Mis compras</span>
                <ShoppingCart className="w-6 h-6"/>
            </div>
        </div>
        {/* Vista Móvil */}
        <div className="lg:hidden p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__small.png" alt="Mercado Libre" className="h-7" />
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Estoy buscando..." className="w-full bg-white p-2 pl-8 rounded-full text-sm"/>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Menu className="w-6 h-6 text-gray-600"/>
                    <ShoppingCart className="w-6 h-6 text-gray-600"/>
                </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm mt-2">
                <MapPin className="w-5 h-5"/>
                <span>Enviar a Milton Carrera 94 #80-32</span>
                <ChevronRight className="w-4 h-4"/>
            </div>
        </div>
    </header>
);
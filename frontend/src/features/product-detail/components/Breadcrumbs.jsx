import React from 'react';
import { ChevronRight } from '../../../components/icons';

export const Breadcrumbs = ({ onAction }) => (
    <div className="text-sm text-gray-500 mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-hidden">
          <a href="#" className="hidden sm:inline text-blue-500 hover:text-blue-700">Volver al listado</a>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a href="#" className="text-blue-500 hover:text-blue-700 whitespace-nowrap">Celulares y...</a>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <a href="#" className="text-blue-500 hover:text-blue-700 whitespace-nowrap">Celulares y...</a>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600 whitespace-nowrap">Samsung</span>
      </div>
      <div className="hidden lg:flex items-center space-x-4">
          <a href="#" onClick={(e) => { e.preventDefault(); onAction(); }} className="text-blue-500 hover:text-blue-700">Vender uno igual</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onAction(); }} className="text-blue-500 hover:text-blue-700">Compartir</a>
      </div>
    </div>
);
import React, { useState } from 'react';

export const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-2">
        {/* Columna de miniaturas para escritorio */}
        <div className="hidden lg:flex flex-col space-y-2">
            {images.map((img, index) => (
            <div
                key={index}
                className={`w-12 h-12 border rounded-md cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-200 ${currentIndex === index ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
                onMouseEnter={() => setCurrentIndex(index)}
            >
                <img src={img} alt={`${title} - vista ${index + 1}`} className="object-contain h-full w-full" />
            </div>
            ))}
        </div>
        
        {/* Contenedor principal de imagen y navegación móvil */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
             <div className="flex-1 flex items-center justify-center min-h-[300px] lg:min-h-[450px]">
                <img src={images[currentIndex]} alt={title} className="max-h-[300px] lg:max-h-[450px] object-contain" />
            </div>
            {/* Paginación para móvil */}
            <div className="lg:hidden flex justify-center space-x-2 mt-4">
                {images.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}></button>
                ))}
            </div>
        </div>
    </div>
  );
};
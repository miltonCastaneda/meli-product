import React from 'react';
import { Smartphone, HardDrive, Camera, Nfc, ShieldCheck } from '../../../components/icons';

export const ProductCharacteristics = ({ characteristics }) => (
    <div className="my-8">
        <h2 className="text-2xl font-light text-gray-700 mb-6">Características del producto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {characteristics.map((char, index) => (
                <div key={index} className="flex items-start space-x-3">
                    <div className="text-gray-500 mt-1">{char.icon === '<Smartphone/>' ? <Smartphone/> : char.icon === '<HardDrive/>' ? <HardDrive/> : char.icon === '<Camera/>' ? <Camera/> : char.icon === '<Nfc/>' ? <Nfc/> : char.icon === '<ShieldCheck/>' ? <ShieldCheck/> : null}</div>
                    <div>
                        <p className="font-semibold text-sm">{char.name}:</p>
                        <p className="text-sm text-gray-600">{char.value}</p>
                        {char.name === 'Tamaño de la pantalla' && (
                           <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                               <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                               <div className="flex justify-between text-xs text-gray-500 mt-1">
                                   <span>PEQUEÑO</span>
                                   <span>GRANDE</span>
                               </div>
                           </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        <a href="#" className="text-blue-500 text-sm mt-6 block">Ver todas las características</a>
    </div>
);
import React from 'react';

export const SidebarRelatedProducts = ({ onAction }) => {
    const products = [
        { image: 'https://http2.mlstatic.com/D_Q_NP_864386-MLA75097451994_032024-AC.webp', title: 'Samsung Galaxy M55 5g 8/256gb Dual Sim...', price: 'U$S 421', discount: '13% OFF' },
        { image: 'https://http2.mlstatic.com/D_Q_NP_688824-MLA72023537233_092023-AC.webp', title: 'Motorola Edge 50 Fusion 5g...', price: 'U$S 419', discount: '11% OFF' },
        { image: 'https://http2.mlstatic.com/D_Q_NP_927375-MLU72756658061_112023-AC.webp', title: 'Samsung Galaxy A15 5g 8gb 256gb Negro...', price: 'U$S 326', discount: '3% OFF' },
        { image: 'https://http2.mlstatic.com/D_Q_NP_794553-MLA72023305481_092023-AC.webp', title: 'Motorola G85 5g 256Gb Gris Storm', price: 'U$S 329', discount: '10% OFF' },
    ];
    return (
        <div className="border border-gray-200 rounded-md p-4">
            <h4 className="font-semibold mb-4">Productos relacionados</h4>
            <div className="space-y-4">
                {products.map((p, i) => (
                    <div key={i} className={`flex space-x-3 items-center cursor-pointer ${i > 0 ? 'border-t pt-4' : ''}`} onClick={onAction}>
                        <img src={p.image} alt={p.title} className="w-16 h-16 object-contain border rounded-md"/>
                        <div>
                            <p className="text-sm">{p.title}</p>
                            <p className="text-gray-500 line-through text-xs">U$S {Math.floor(parseInt(p.price.replace('U$S ', '')) / (1 - parseInt(p.discount)/100))}</p>
                            <div className="flex items-center">
                                <p className="text-base">{p.price}</p>
                                <p className="text-green-600 text-xs ml-2">{p.discount}</p>
                            </div>
                            <p className="text-green-600 text-xs font-semibold">Envío gratis</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
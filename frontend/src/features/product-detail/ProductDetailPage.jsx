import React, { useState } from 'react';
import { useProductData } from '../../hooks/useProductData';
import { Header } from '../../components/layout';
import { Share2 } from '../../components/icons';
import { Breadcrumbs, ImageGallery, ProductMiddleInfo, ProductActionPanel, RightSidePanels, ProductCarousel, ProductCharacteristics, ProductDescription, SidebarRelatedProducts } from './components';

export const ProductDetailPage = () => {
  const { product, loading, error } = useProductData();
  const [showToast, setShowToast] = useState(false);

  const handleActionClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const relatedProductsData = [
    { promo: 'Promocionado', image: 'https://http2.mlstatic.com/D_Q_NP_799351-MLA75097148529_032024-AC.webp', title: 'Samsung Galaxy M55 5g 8/256gb Dual Sim Timbostore', original_price: 'U$S 421', price: 'U$S 421', discount: '13% OFF', installments: 'en 10 cuotas de $1.839 sin interés', shipping: 'Envío gratis' },
    { image: 'https://http2.mlstatic.com/D_Q_NP_895628-MLA72023537232_092023-AC.webp', title: 'Motorola Edge 50 Fusion 5g 256 GB Azul Ártico 8 GB Ram', original_price: 'U$S 419', price: 'U$S 419', discount: '11% OFF', installments: 'en 10 cuotas de $1.826 sin interés', shipping: 'Envío gratis' },
    { image: 'https://http2.mlstatic.com/D_Q_NP_786273-MLU72756658060_112023-AC.webp', title: 'Samsung Galaxy A15 5g 8gb 256gb Negro Tiraniza', price: 'U$S 326', discount: '3% OFF', installments: 'en 10 cuotas de $1.424 sin interés', shipping: 'Envío gratis' },
    { image: 'https://http2.mlstatic.com/D_Q_NP_821364-MLU73618139535_122023-AC.webp', title: 'Xiaomi Poco X6 Pro 5G 512 GB', price: 'U$S 559', installments: 'en 10 cuotas de $2.438 sin interés', shipping: 'Envío gratis' },
  ];
  
  const brandProductsData = [
    { image: 'https://http2.mlstatic.com/D_Q_NP_808160-MLU72756534217_112023-AC.webp', title: 'Samsung Galaxy S23 256 Go', specs: 'Garantía Oficial', price: 'U$S 959', discount: '26% OFF', installments: '10 cuotas de $4.181,24 sin interés', shipping: 'Envío gratis' },
    { image: 'https://http2.mlstatic.com/D_Q_NP_767566-MLU72756534220_112023-AC.webp', title: 'Samsung Galaxy S23 Plus 512 Go', specs: 'Garantía Oficial', price: 'U$S 1.379', discount: '18% OFF', installments: '10 cuotas de $6.012,44 sin interés', shipping: 'Envío gratis' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500 mt-10">No product data available.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4">
        {/* Botón flotante de compartir para móviles */}
        <button onClick={handleActionClick} className="lg:hidden fixed bottom-4 right-4 bg-white rounded-full p-3 shadow-lg z-20">
            <Share2 className="w-6 h-6 text-blue-500" />
        </button>

        <div className="pt-4">
            <Breadcrumbs onAction={handleActionClick} />
            <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
                {/* --- SECCIÓN SUPERIOR: DETALLES DEL PRODUCTO --- */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                    <div className="lg:col-span-4">
                        <ImageGallery images={product.images} title={product.title} />
                    </div>
                    <div className="lg:col-span-4">
                        <ProductMiddleInfo data={product} />
                    </div>
                    {/* El panel de acciones solo se muestra en escritorio en esta posición */}
                    <div className="hidden lg:block lg:col-span-2">
                        <ProductActionPanel data={product} onAction={handleActionClick} />
                    </div>
                </div>

                {/* El panel de acciones se muestra aquí en móvil */}
                <div className="lg:hidden mt-6">
                    <ProductActionPanel data={product} onAction={handleActionClick} />
                </div>


                {/* --- SECCIÓN INFERIOR: CAROUSELES, DESCRIPCIÓN Y PANELES DERECHOS --- */}
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-10 gap-8 border-t pt-8">
                    <div className="lg:col-span-8">
                        <ProductCarousel title="Productos relacionados" products={relatedProductsData} onAction={handleActionClick} />
                        <ProductCarousel title="Productos de Samsung" products={brandProductsData} type="brand" onAction={handleActionClick} />
                        <ProductCharacteristics characteristics={product.characteristics} />
                        <ProductDescription description={product.description} />
                    </div>
                    <div className="hidden lg:block lg:col-span-2">
                        <RightSidePanels seller={product.seller} onAction={handleActionClick} />
                        <div className="mt-4">
                            <SidebarRelatedProducts onAction={handleActionClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {showToast && (
        <div className="fixed bottom-20 lg:bottom-10 right-10 bg-gray-800 text-white py-3 px-6 rounded-lg shadow-xl animate-fade-in-out">
          Funcionalidad en construcción
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-out {
            0% { opacity: 0; transform: translateY(20px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fade-in-out { animation: fade-in-out 3s ease-in-out forwards; }
      `}</style>
    </div>
  );
};


// --- Simulación de API ---
const mockProductData = {
  id: 'MLA123456789',
  condition: 'Nuevo',
  sold_quantity: 1500,
  title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
  price: {
    amount: 439,
    currency: 'US$',
    installments: {
        quantity: 10,
        amount: 19.14,
    }
  },
  original_price: 499,
  discount_percentage: 12,
  images: [
    'https://http2.mlstatic.com/D_NQ_NP_684848-MLA75097451996_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_925697-MLA75097148532_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_653926-MLA75097452003_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_923985-MLA75097148533_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_931535-MLA75097452000_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_631583-MLA75097148536_032024-O.webp',
    'https://http2.mlstatic.com/D_NQ_NP_836696-MLA75097452002_032024-O.webp',
  ],
  seller: {
    name: 'Samsung',
    is_official: true,
    sales: "+5mil",
    products_count: 50
  },
  shipping: {
    free_shipping: true,
  },
  stock: 50,
  rating: {
    average: 4.5,
    count: 769,
  },
  key_features: [
      'Memoria RAM: 8 GB',
      'Dispositivo desbloqueado para que elijas la compañía telefónica preferida.',
      'Memoria interna de 256 GB.'
  ],
  characteristics: [
      { icon: '<Smartphone/>', name: 'Tamaño de la pantalla', value: '6.6" (16.11 cm x 7.74 cm x 8.2mm)' },
      { icon: '<HardDrive/>', name: 'Memoria interna', value: '256 GB' },
      { icon: '<Camera/>', name: 'Cámara trasera principal', value: '50 Mpx' },
      { icon: '<Nfc/>', name: 'Con NFC', value: 'Sí' },
      { icon: '<Camera/>', name: 'Cámara frontal principal', value: '32 Mpx' },
      { icon: '<ShieldCheck/>', name: 'Desbloqueo', value: 'Huella dactilar y reconocimiento facial' },
  ],
  description: "Capacidad y eficiencia\nCon su potente procesador y 8 GB de RAM, tu computadora logrará un alto rendimiento con gran velocidad de transmisión de contenidos y ejecutará varias aplicaciones al mismo tiempo, sin demoras.\n\nCapacidad de almacenamiento ilimitada\nOlvídate de borrar. Con su memoria interna de 256 GB puedes descargar todos los archivos y aplicaciones que necesites, guardar fotos y almacenar tus películas, series y videos favoritos para reproducirlos cuando quieras.",
};

export const fetchProductData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProductData);
    }, 1000); // Simula un delay de red
  });
};

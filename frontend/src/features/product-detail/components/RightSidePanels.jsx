import React from 'react';
import { MessageSquare, CheckCircle2 } from '../../../components/icons';

export const RightSidePanels = ({ seller, onAction }) => {
  return (
    <div className="space-y-4">
      {/* Panel Tienda Oficial */}
      <div className="border rounded-md p-4">
        <h4 className="font-semibold mb-2">Tienda Oficial</h4>
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xl">{seller.name.charAt(0)}</div>
          <div>
            <p className="font-semibold">{seller.name}</p>
            <p className="text-xs text-blue-500">Tienda oficial de Mercado Libre</p>
            <p className="text-xs text-gray-500">{seller.products_count} productos</p>
          </div>
        </div>
        <div className="flex text-center text-xs mt-4 text-gray-500 border-t pt-4">
          <div className="w-1/3">
            <p className="font-semibold text-lg">{seller.sales}</p>
            <p>ventas</p>
          </div>
          <div className="w-1/3 border-l border-r px-2">
            <MessageSquare className="mx-auto w-6 h-6 text-green-500" />
            <p>Brinda buena atención</p>
          </div>
          <div className="w-1/3">
            <CheckCircle2 className="mx-auto w-6 h-6 text-green-500" />
            <p>Entrega sus productos a tiempo</p>
          </div>
        </div>
        <button onClick={onAction} className="w-full mt-4 text-sm bg-gray-100 py-2 rounded-md hover:bg-gray-200">Ir a la Tienda oficial</button>
      </div>

      {/* Panel Otras Opciones */}
      <div className="border rounded-md p-4">
          <h4 className="font-semibold mb-2">Otras opciones de compra</h4>
          <a href="#" className="text-blue-500 text-sm">Ver 3 opciones desde US$ 439</a>
      </div>

      {/* Panel Medios de Pago */}
      <div className="border rounded-md p-4">
          <h4 className="font-semibold mb-2">Medios de pago</h4>
          <div className="bg-green-100 text-green-700 p-2 rounded-md text-sm font-semibold">¡Paga en hasta 12 cuotas sin interés!</div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Tarjetas de crédito</p>
            <p className="text-xs text-gray-500">¡Cuotas sin interés con bancos seleccionados!</p>
            <div className="flex space-x-4 my-2">
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368ebb-m.svg" alt="" className="h-6"/>
                <img src="https://http2.mlstatic.com/storage/logos-api-admin/ddf03a50-9be0-11ec-aad4-c3381f368ebb-m.svg" alt="" className="h-6"/>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Tarjetas de débito</p>
             <img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368ebb-m.svg" alt="" className="h-6 my-2"/>
          </div>
           <div className="mt-4">
            <p className="text-sm font-semibold">Efectivo</p>
             <img src="https://http2.mlstatic.com/storage/logos-api-admin/ce4534f0-9be0-11ec-aad4-c3381f368ebb-m.svg" alt="" className="h-6 my-2"/>
          </div>
          <a href="#" className="text-blue-500 text-sm mt-4 block">Conoce otros medios de pago</a>
      </div>
    </div>
  );
};
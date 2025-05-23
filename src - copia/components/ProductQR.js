import React, { useRef } from 'react';

const ProductQR = ({ product, onClose }) => {
  const qrRef = useRef(null);
  const qrData = `${window.location.origin}/view-product/${product.id}`;

  const downloadQR = () => {
    // En una implementación real usarías una librería para generar el QR
    alert(`Descargando QR para ${product.partNumber}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
      <h3 className="text-lg font-semibold mb-4 text-center">Código QR</h3>
      
      <div ref={qrRef} className="bg-white p-4 border border-gray-200 rounded mb-4">
        <div className="grid grid-cols-10 gap-0.5">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              className={`w-full aspect-square ${Math.random() > 0.3 ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
        <p className="text-xs mt-2 text-center">Escanea para ver en catálogo</p>
      </div>
      
      <div className="text-center">
        <p className="font-medium">{product.partNumber}</p>
        <p className="text-sm text-gray-600 mb-4">{product.name}</p>
        <div className="flex space-x-2">
          <button
            onClick={downloadQR}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Descargar
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductQR;
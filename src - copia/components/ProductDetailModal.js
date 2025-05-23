import React, { useState } from 'react';

const ProductDetailModal = ({ product, onClose, isCatalogView = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {product.images && product.images.length > 0 ? (
                <div className="relative">
                  <img 
                    src={product.images[currentImageIndex]} 
                    alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">Imagen no disponible</span>
                </div>
              )}
            </div>
            
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Número de Parte:</h3>
                  <p>{product.partNumber}</p>
                </div>
                {product.description && (
                  <div>
                    <h3 className="font-semibold text-lg">Descripción:</h3>
                    <p>{product.description}</p>
                  </div>
                )}
                {!isCatalogView && (
                  <>
                    <div>
                      <h3 className="font-semibold text-lg">Almacén:</h3>
                      <p>{product.warehouse}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ubicación:</h3>
                      <p>{product.location}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Cantidad en Inventario:</h3>
                      <p>{product.quantity}</p>
                    </div>
                    {/* Eliminamos la sección de abastecimiento */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
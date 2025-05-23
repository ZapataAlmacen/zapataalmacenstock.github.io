import React from 'react';
import CatalogHeader from './CatalogHeader';

const CatalogView = ({ products, onLoginClick, onViewProduct, advisorInfo }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <CatalogHeader advisorInfo={advisorInfo} onLoginClick={onLoginClick} />
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition transform hover:scale-105 relative" // Añadir relative para posicionar el letrero
              onClick={() => onViewProduct(product.id)}
            >
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-48 object-contain bg-gray-100 p-2"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-1">N° Parte: {product.partNumber}</p>
                {product.description && (
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
              {product.quantity <= 3 && product.quantity > 0 && ( // Mostrar letrero si cantidad es <= 3 y > 0
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  !ÚLTIMOS DISPONIBLES!
                </div>
              )}
               {product.quantity === 0 && ( // Mostrar letrero si cantidad es 0
                <div className="absolute top-2 left-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
                  AGOTADO
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CatalogView;

// DONE
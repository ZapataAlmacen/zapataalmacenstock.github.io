import React, { useState } from 'react';
// Eliminamos la importación de ProductSales
import ProductForm from './ProductForm';
import ProductDetailModal from './ProductDetailModal';

const ProductList = ({ products, onAdd, onUpdate, onDelete, isAdmin, onViewProduct }) => { // Eliminamos onRecordSale de las props
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Eliminamos el estado showSaleForm

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (productData) => {
    if (editingProduct) {
      onUpdate({ ...productData, id: editingProduct.id });
    } else {
      onAdd(productData);
    }
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos por nombre, número de parte, ubicación o almacén..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="mb-6">
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingProduct(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* Eliminamos el renderizado condicional de ProductSales */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} // Mostrar solo la primera imagen en la lista
                alt={product.name} 
                className="w-full h-48 object-contain bg-gray-100 cursor-pointer"
                onClick={() => onViewProduct(product.id)}
              />
            ) : (
              <div 
                className="w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => onViewProduct(product.id)}
              >
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
            <div className="p-4">
              <h2 
                className="text-xl font-semibold mb-2 cursor-pointer"
                onClick={() => onViewProduct(product.id)}
              >
                {product.name}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">N° Parte:</span> {product.partNumber}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Almacén:</span> {product.warehouse}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Ubicación:</span> {product.location}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Cantidad:</span> {product.quantity}
              </p>
              {/* Eliminamos la sección de abastecimiento */}
              <div className="flex flex-wrap gap-2 mt-3">
                {isAdmin && (
                  <>
                    {/* Eliminamos el botón de Registrar Venta */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(product.id);
                      }}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
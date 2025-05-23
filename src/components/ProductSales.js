import React, { useState } from 'react';

const ProductSales = ({ product, onRecordSale, onClose }) => {
  // Función para formatear fecha en formato YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [saleData, setSaleData] = useState({
    quantity: Math.min(1, product.quantity),
    date: formatDate(new Date()),
    customer: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData({
      ...saleData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantity = parseInt(saleData.quantity);
    
    if (isNaN(quantity) || quantity <= 0) {
      alert('La cantidad debe ser un número positivo');
      return;
    }
    
    if (quantity > product.quantity) {
      alert(`No hay suficiente stock. Disponible: ${product.quantity}`);
      return;
    }

    onRecordSale({
      productId: product.id,
      quantity: quantity,
      date: saleData.date,
      customer: saleData.customer.trim(),
      notes: saleData.notes.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Registrar Venta</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Producto</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                value={`${product.partNumber} - ${product.name}`}
                readOnly
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Cantidad*</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max={product.quantity}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={saleData.quantity}
                  onChange={handleChange}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Disponible: {product.quantity}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Fecha*</label>
                <input
                  type="date"
                  name="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={saleData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Cliente (Opcional)</label>
              <input
                type="text"
                name="customer"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saleData.customer}
                onChange={handleChange}
                placeholder="Nombre del cliente"
                maxLength="100"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Notas (Opcional)</label>
              <textarea
                name="notes"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saleData.notes}
                onChange={handleChange}
                placeholder="Detalles adicionales"
                rows="2"
                maxLength="255"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Confirmar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductSales;

// DONE
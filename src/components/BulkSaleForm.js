import React, { useState } from 'react';

const BulkSaleForm = ({ products, onRecordBulkSale, onClose }) => {
  // Función para formatear fecha en formato YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [saleData, setSaleData] = useState({
    date: formatDate(new Date()),
    customer: '',
    notes: '',
    items: products.map(p => ({
      productId: p.id,
      partNumber: p.partNumber,
      name: p.name,
      quantity: 0,
      maxQuantity: p.quantity
    }))
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleItemChange = (productId, field, value) => {
    const newItems = saleData.items.map(item => {
      if (item.productId === productId) {
        return {
          ...item,
          [field]: field === 'quantity' ? parseInt(value) || 0 : value
        };
      }
      return item;
    });
    setSaleData({...saleData, items: newItems});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemsToSell = saleData.items.filter(item => item.quantity > 0);

    if (itemsToSell.length === 0) {
      alert("Debe agregar al menos un producto a la venta.");
      return;
    }

    for (const item of itemsToSell) {
      if (item.quantity > item.maxQuantity) {
        alert(`No hay suficiente stock para ${item.name}. Disponible: ${item.maxQuantity}`);
        return;
      }
    }

    onRecordBulkSale({
      date: saleData.date,
      customer: saleData.customer.trim(),
      notes: saleData.notes.trim(),
      items: itemsToSell.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    });
    onClose();
  };

  const filteredItems = saleData.items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4">Registrar Venta Múltiple</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Fecha*</label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saleData.date}
                onChange={(e) => setSaleData({...saleData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Cliente (Opcional)</label>
              <input
                type="text"
                name="customer"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saleData.customer}
                onChange={(e) => setSaleData({...saleData, customer: e.target.value})}
                placeholder="Nombre del cliente"
                maxLength="100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Notas (Opcional)</label>
              <textarea
                name="notes"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saleData.notes}
                onChange={(e) => setSaleData({...saleData, notes: e.target.value})}
                placeholder="Detalles adicionales"
                rows="2"
                maxLength="255"
              />
            </div>
          </div>

          <h4 className="text-lg font-semibold mb-3">Productos a Vender</h4>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar producto por N° Parte o Nombre..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">N° Parte</th>
                  <th className="border p-2 text-left">Nombre</th>
                  <th className="border p-2 text-left">Stock</th>
                  <th className="border p-2 text-left">Cantidad a Vender*</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.productId} className="hover:bg-gray-50">
                    <td className="border p-2">{item.partNumber}</td>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.maxQuantity}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        min="0"
                        max={item.maxQuantity}
                        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.productId, 'quantity', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Registrar Venta Múltiple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkSaleForm;
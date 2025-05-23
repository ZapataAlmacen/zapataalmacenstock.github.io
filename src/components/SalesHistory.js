import React from 'react';

const SalesHistory = ({ sales, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Historial de Ventas</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {sales.length === 0 ? (
          <p>No hay ventas registradas aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Fecha</th>
                  <th className="border p-2 text-left">Producto (N° Parte)</th>
                  <th className="border p-2 text-left">Cantidad</th>
                  <th className="border p-2 text-left">Cliente</th>
                  <th className="border p-2 text-left">Notas</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{sale.date}</td>
                    <td className="border p-2">{sale.productPartNumber}</td>
                    <td className="border p-2">{sale.quantity}</td>
                    <td className="border p-2">{sale.customer || 'N/A'}</td>
                    <td className="border p-2">{sale.notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesHistory;
import React, { useState } from 'react';

const BulkImport = ({ onImport, onCancel }) => {
  const [csvData, setCsvData] = useState('');

  const handleImport = () => {
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const products = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        name: values[1]?.trim() || '',
        partNumber: values[0]?.trim() || '',
        location: values[2]?.trim() || '',
        quantity: parseInt(values[3]?.trim()) || 0,
        image: values[4]?.trim() || '',
        incoming: false,
        incomingQuantity: 0
      };
    });
    
    onImport(products);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Importación Masiva desde Excel</h2>
        <p className="mb-4">
          Copia y pega los datos desde Excel manteniendo este formato exacto:<br />
          <span className="font-semibold">N° Parte, Nombre, Ubicación, Cantidad, Imagen(URL)</span>
        </p>
        <textarea
          className="w-full h-64 p-4 border rounded-lg mb-4 font-mono text-sm"
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          placeholder="Ejemplo:
ZFD-2023,Zapata de Freno Delantera,Estante B1,50,https://ejemplo.com/imagen.jpg
DFT-2022,Disco de Freno Trasero,Estante A3,25,"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Importar Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
import React, { useState, useEffect } from 'react';

const ExcelLikeTable = ({ products, onImport, onCancel }) => {
  const [tableData, setTableData] = useState(
    products.length > 0 
      ? products.map(p => ({
          partNumber: p.partNumber,
          name: p.name,
          description: p.description,
          location: p.location,
          warehouse: p.warehouse || '',
          quantity: p.quantity,
          images: p.images ? p.images.join(',') : '',
          showInCatalog: p.showInCatalog
        }))
      : [createEmptyRow()]
  );

  const [selectedCells, setSelectedCells] = useState([]);

  function createEmptyRow() {
    return {
      partNumber: '',
      name: '',
      description: '',
      location: '',
      warehouse: '',
      quantity: '',
      images: '',
      showInCatalog: false
    };
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const rows = pasteData.split('\n').filter(row => row.trim() !== '');
    
    const newData = [...tableData];
    let currentRow = selectedCells[0]?.row || 0;
    let currentCol = selectedCells[0]?.col || 0;

    rows.forEach((row, rowIndex) => {
      const cols = row.split('\t');
      
      // Si necesitamos más filas, las añadimos
      if (currentRow + rowIndex >= newData.length) {
        newData.push(createEmptyRow());
      }

      cols.forEach((value, colIndex) => {
        // Ajustar los campos para incluir 'warehouse', 'images'
        const fields = ['partNumber', 'name', 'description', 'warehouse', 'location', 'quantity', 'images', 'showInCatalog'];
        const field = fields[currentCol + colIndex];
        if (field && newData[currentRow + rowIndex]) {
           if (field === 'showInCatalog') {
            // Convertir valor a booleano
            newData[currentRow + rowIndex][field] = value.toLowerCase() === 'true' || value === '1';
          } else if (field === 'quantity') {
             newData[currentRow + rowIndex][field] = parseInt(value) || 0;
          }
           else {
            newData[currentRow + rowIndex][field] = value;
          }
        }
      });
    });

    setTableData(newData);
  };

  const handleChange = (rowIndex, field, value) => {
    const newData = [...tableData];
    newData[rowIndex][field] = value;
    setTableData(newData);
  };

  const addRow = () => {
    setTableData([
      ...tableData,
      createEmptyRow()
    ]);
  };

  const removeRow = (rowIndex) => {
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
  };

  const handleSubmit = () => {
    const importedProducts = tableData
      .filter(row => row.partNumber && row.name)
      .map(row => ({
        partNumber: row.partNumber,
        name: row.name,
        description: row.description || '',
        location: row.location || 'Sin ubicación',
        warehouse: row.warehouse || '',
        quantity: parseInt(row.quantity) || 0,
        images: row.images ? row.images.split(',').map(url => url.trim()).filter(url => url) : [],
        showInCatalog: row.showInCatalog || false
      }));
    onImport(importedProducts);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto"
        onPaste={handlePaste}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Editor de Inventario</h2>
            <div className="flex space-x-2">
              <button
                onClick={addRow}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                + Fila
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Guardar
              </button>
              <button
                onClick={onCancel}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">N° Parte</th>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Descripción</th>
                  <th className="border p-2">Almacén</th>
                  <th className="border p-2">Ubicación</th>
                  <th className="border p-2">Cantidad</th>
                  <th className="border p-2">Imágenes (URLs, separadas por coma)</th>
                  <th className="border p-2">En Catálogo</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {['partNumber', 'name', 'description', 'warehouse', 'location', 'quantity', 'images'].map((field, colIndex) => (
                      <td 
                        key={field}
                        className={`border p-1 ${selectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex) ? 'bg-blue-100' : ''}`}
                        onFocus={() => setSelectedCells([{ row: rowIndex, col: colIndex }])}
                      >
                        <input
                          type={field === 'quantity' ? 'number' : 'text'}
                          className="w-full px-2 py-1 border-none focus:ring-2 focus:ring-blue-500"
                          value={row[field]}
                          onChange={(e) => handleChange(rowIndex, field, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="border p-1 text-center">
                      <input
                        type="checkbox"
                        checked={row.showInCatalog}
                        onChange={(e) => handleChange(rowIndex, 'showInCatalog', e.target.checked)}
                      />
                    </td>
                    <td className="border p-1 text-center">
                      <button
                        onClick={() => removeRow(rowIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelLikeTable;
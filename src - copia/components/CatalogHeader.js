import React from 'react';

const CatalogHeader = ({ advisorInfo, onLoginClick }) => {
  return (
    <header className="bg-blue-800 text-white p-6 mb-6 rounded-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Catálogo de Zapata</h1>
          <p className="text-lg">
            ¿Interesado en algún producto? Contacte a su asesor de ventas:
          </p>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold">Asesor:</p>
              <p>{advisorInfo.name}</p>
            </div>
            <div>
              <p className="font-semibold">Contacto:</p>
              <p>Email: {advisorInfo.email}</p>
              <p>Tel: {advisorInfo.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Horario:</p>
              <p>{advisorInfo.schedule}</p>
            </div>
          </div>
        </div>
        {onLoginClick && (
          <button
            onClick={onLoginClick}
            className="px-4 py-2 bg-white text-blue-800 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default CatalogHeader;
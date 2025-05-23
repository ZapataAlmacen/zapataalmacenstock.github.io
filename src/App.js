import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import ExcelLikeTable from './components/ExcelLikeTable';
import CatalogView from './components/CatalogView';
import ProductDetailModal from './components/ProductDetailModal';
import UserSettings from './components/UserSettings';
import AdvisorSettings from './components/AdvisorSettings';
import ProductForm from './components/ProductForm';
import initialProducts from './mock/products';
import initialAdvisorInfo from './mock/advisor';
import initialUsers from './mock/users';
import { getProducts, saveProducts, getCurrentUser, setCurrentUser, clearCurrentUser } from './utils/storage';

const App = () => {
  const [products, setProducts] = useState([]);
  const [advisorInfo, setAdvisorInfo] = useState(initialAdvisorInfo);
  const [users, setUsers] = useState(initialUsers);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showExcelTable, setShowExcelTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('catalog'); // Iniciar en la vista de catálogo
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentUser, setCurrentUserLocal] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const storedProducts = getProducts();
    if (storedProducts.length === 0) {
      saveProducts(initialProducts);
      setProducts(initialProducts);
    } else {
      setProducts(storedProducts);
    }

    // Cargar asesor (simulado con mock data)
    setAdvisorInfo(initialAdvisorInfo);
    setUsers(initialUsers);

    const user = getCurrentUser();
    if (user) {
      setIsAdmin(true);
      setCurrentUserLocal({ username: user });
      setCurrentView('inventory'); // Si hay usuario logueado, ir a inventario
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setIsAdmin(true);
    setCurrentUserLocal({ username });
    setCurrentView('inventory');
  };

  const handleLogout = () => {
    clearCurrentUser();
    setIsAdmin(false);
    setCurrentUserLocal(null);
    setCurrentView('catalog'); // Al cerrar sesión, regresar al catálogo
  };

  const handleViewAsGuest = () => {
    // Esta función ya no es necesaria ya que el catálogo es la vista inicial
    // Podría usarse para un botón "Ver Catálogo" si no fuera la vista por defecto
    setCurrentView('catalog');
  };

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    // No cambiamos la vista principal aquí, solo mostramos el modal
  };

  const handleBackToCatalog = () => {
    setSelectedProductId(null);
    setCurrentView('catalog');
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now()
    };
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    saveProducts(newProducts);
    setShowProductForm(false); // Cerrar formulario al agregar
  };

  const updateProduct = (updatedProduct) => {
    const newProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(newProducts);
    saveProducts(newProducts);
    setShowProductForm(false); // Cerrar formulario al actualizar
    setEditingProduct(null); // Limpiar producto a editar
  };

  const deleteProduct = (id) => {
    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    saveProducts(newProducts);
  };

  const handleBulkImport = (importedProducts) => {
    const newProducts = importedProducts.map(p => ({
      ...p,
      id: Date.now() + Math.floor(Math.random() * 1000)
    }));
    setProducts(newProducts);
    saveProducts(newProducts);
    setShowExcelTable(false);
  };

  const handleUpdateUser = ({ newUsername, newPassword }) => {
    // En una app real, esto interactuaría con un backend
    // Aquí simulamos la actualización del usuario mock
    const updatedUsers = users.map(user => {
      if (user.username === currentUser.username) {
        return {
          username: newUsername,
          password: newPassword
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setCurrentUser(newUsername); // Actualizar en localStorage
    setCurrentUserLocal({ username: newUsername }); // Actualizar estado local
    alert("Usuario actualizado con éxito (simulado)");
    setCurrentView('inventory');
  };

  const handleUpdateAdvisor = (updatedAdvisor) => {
    setAdvisorInfo(updatedAdvisor);
    alert("Datos del asesor actualizados (simulado)");
    setCurrentView('inventory');
  };


  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'login' && (
        <LoginForm onLogin={handleLogin} onViewAsGuest={handleViewAsGuest} />
      )}

      {currentView === 'inventory' && (
        <>
          <header className="bg-gray-900 text-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0V7nLbBJrFC0J7K5LhXEI2tlBemYwSTjsNOpD" 
                  alt="Logo" 
                  className="h-10 mr-3"
                />
                <h1 className="text-xl font-bold">Zapata Camiones Almacen</h1>
              </div>
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <>
                     <button
                      onClick={() => setCurrentView('advisorSettings')}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Asesor
                    </button>
                    <button
                      onClick={() => setCurrentView('userSettings')}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Usuario
                    </button>
                    <button
                      onClick={() => setShowExcelTable(true)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      Editor de Inventario
                    </button>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4">
             <div className="flex justify-end space-x-4 mb-6">
                {isAdmin && (
                   <>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setShowProductForm(true);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Agregar Producto
                      </button>
                   </>
                )}
             </div>
             {showProductForm && (
                <div className="mb-6">
                  <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? updateProduct : addProduct}
                    onCancel={() => {
                      setShowProductForm(false);
                      setEditingProduct(null);
                    }}
                  />
                </div>
              )}
            <ProductList
              products={products}
              onAdd={addProduct}
              onUpdate={updateProduct}
              onDelete={deleteProduct}
              isAdmin={isAdmin}
              onViewProduct={handleViewProduct}
            />
          </main>

          {showExcelTable && (
            <ExcelLikeTable
              products={products}
              onImport={handleBulkImport}
              onCancel={() => setShowExcelTable(false)}
            />
          )}
        </>
      )}

      {currentView === 'catalog' && (
        <CatalogView 
          products={products.filter(p => p.showInCatalog)} 
          onLoginClick={() => setCurrentView('login')} // Pasar la función para ir al login
          onViewProduct={handleViewProduct}
          advisorInfo={advisorInfo}
        />
      )}

      {/* Renderizar el modal de detalle de producto si hay un producto seleccionado */}
      {selectedProductId && (
        <ProductDetailModal
          product={products.find(p => p.id === selectedProductId)}
          onClose={() => setSelectedProductId(null)}
          isCatalogView={currentView === 'catalog'}
        />
      )}

      {currentView === 'userSettings' && currentUser && (
        <UserSettings
          currentUser={currentUser}
          onUpdate={handleUpdateUser}
          onCancel={() => setCurrentView('inventory')}
        />
      )}

      {currentView === 'advisorSettings' && isAdmin && (
        <AdvisorSettings
          advisor={advisorInfo}
          onUpdate={handleUpdateAdvisor}
          onCancel={() => setCurrentView('inventory')}
        />
      )}
    </div>
  );
};

export default App;

// DONE
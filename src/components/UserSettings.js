import React, { useState } from 'react';
import users from '../mock/users'; // Importar usuarios mock

const UserSettings = ({ currentUser, onUpdate, onCancel }) => {
  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    setError(''); // Limpiar errores al cambiar input
    setSuccess(''); // Limpiar éxito al cambiar input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validar contraseña actual (simulado con mock user)
    // En una app real, esta validación se haría en el backend
    const user = users.find(u => u.username === currentUser.username && u.password === credentials.currentPassword);
    if (!user) {
      setError("Contraseña actual incorrecta.");
      return;
    }

    if (credentials.newPassword && credentials.newPassword !== credentials.confirmPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    // Lógica de actualización (simulada)
    const updatedUsername = credentials.newUsername || currentUser.username;
    const updatedPassword = credentials.newPassword || credentials.currentPassword;

    // En una app real, aquí llamarías a una API para actualizar el usuario
    // Como estamos usando mock data, simulamos la actualización en el array mock
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex].username = updatedUsername;
        users[userIndex].password = updatedPassword;
        // En una app real, también actualizarías el token o sesión del usuario logueado
        // Aquí, simplemente llamamos a onUpdate para reflejar el cambio en App.js
        onUpdate({ newUsername: updatedUsername, newPassword: updatedPassword });
        setSuccess("Usuario actualizado con éxito.");
        // Opcional: cerrar el modal después de un tiempo
        // setTimeout(onCancel, 2000);
    } else {
        setError("Error al encontrar el usuario para actualizar.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Configuración de Usuario</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario Actual</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              value={currentUser.username}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña Actual*</label>
            <input
              type="password"
              name="currentPassword"
              value={credentials.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nuevo Usuario (Opcional)</label>
            <input
              type="text"
              name="newUsername"
              value={credentials.newUsername}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dejar vacío para no cambiar"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nueva Contraseña (Opcional)</label>
            <input
              type="password"
              name="newPassword"
              value={credentials.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dejar vacío para no cambiar"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirmar nueva contraseña"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;

// DONE
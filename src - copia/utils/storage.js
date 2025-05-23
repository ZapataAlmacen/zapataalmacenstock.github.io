export const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const saveProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};

export const setCurrentUser = (username) => {
  localStorage.setItem('currentUser', username);
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};
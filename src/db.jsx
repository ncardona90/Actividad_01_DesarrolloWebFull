const API_URL = 'http://localhost:5000/api';

// Obtener todos los productos
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return await response.json();
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
};

// Agregar un nuevo producto
export const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
};

// Actualizar un producto existente
export const updateProduct = async (product) => {
    const response = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
};

// Obtener todos los usuarios
export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
};

// Agregar un nuevo usuario
export const addUser = async (user) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};
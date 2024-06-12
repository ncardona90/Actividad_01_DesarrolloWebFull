import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
};

export const addProduct = async (product) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/products/${id}`);
};

export const getOrders = async (userId, status) => {
    const response = await axios.get(`${API_URL}/orders`, {
        params: { userId, status }
    });
    return response.data;
};

export const addOrder = async (order) => {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
};

export const deleteOrder = async (id) => {
    await axios.delete(`${API_URL}/orders/${id}`);
};

export const registerUser = async (user) => {
    const response = await axios.post(`${API_URL}/users/register`, user);
    return response.data;
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/api/users/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Error en la autenticación');
    }
};
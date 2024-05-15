import localforage from 'localforage';

localforage.config({
    name: 'TiendaOnline',
    storeName: 'data'
});

export const getProducts = async () => {
    const products = await localforage.getItem('productos');
    return products ? products : [];
};

export const getProductById = async (id) => {
    const products = await getProducts();
    return products.find(product => product.id === parseInt(id));
};

export const addProduct = async (product) => {
    const products = await getProducts();
    product.id = products.length + 1;
    products.push(product);
    await localforage.setItem('productos', products);
    return product;
};

export const updateProduct = async (updatedProduct) => {
    const products = await getProducts();
    const index = products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        await localforage.setItem('productos', products);
    }
};

export const deleteProduct = async (productId) => {
    const products = await getProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    await localforage.setItem('productos', updatedProducts);
};

export const getUsers = async () => {
    const users = await localforage.getItem('usuarios');
    return users ? users : [];
};

export const addUser = async (user) => {
    const users = await getUsers();
    users.push(user);
    await localforage.setItem('usuarios', users);
    return user;
};

export const initializeData = async () => {
    const products = await getProducts();
    const users = await getUsers();

    if (products.length === 0) {
        const initialProducts = [
            { id: 1, name: 'Parlante JBL', description: 'Descripción del producto 1', price: 100, rating: 4, category: 'categoria1', image: 'ruta_imagen_1' },
            { id: 2, name: 'Aro de Luz', description: 'Descripción del producto 2', price: 200, rating: 5, category: 'categoria2', image: 'ruta_imagen_2' },
        ];
        await localforage.setItem('productos', initialProducts);
    }

    if (users.length === 0) {
        const adminUser = { username: 'admin', password: 'admin', role: 'admin' };
        await addUser(adminUser);
    }
};

export const clearData = async () => {
    await localforage.removeItem('productos');
    await localforage.removeItem('usuarios');
};

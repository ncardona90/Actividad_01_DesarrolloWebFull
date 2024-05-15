import { useState, useEffect } from 'react';

function useProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simular fetch de productos
        setProducts([
            { id: 1, name: 'Producto 1', description: 'Descripción del producto 1' },
            { id: 2, name: 'Producto 2', description: 'Descripción del producto 2' }
        ]);
    }, []);

    return products;
}

export default useProducts;

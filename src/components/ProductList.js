import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import SearchBar from './SearchBar';
import Filters from './Filters';
import { deleteProduct } from '../db';

function ProductList({ products, addToCart }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        rating: '',
        sort: '',
    });

    const handleDelete = async (productId) => {
        await deleteProduct(productId);
        window.location.reload(); // Recargar la página después de eliminar el producto
    };

    const filteredProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filters.category === '' || product.category === filters.category) &&
            (filters.rating === '' || product.rating >= parseInt(filters.rating))
        )
        .sort((a, b) => {
            if (filters.sort === 'price-asc') {
                return a.price - b.price;
            } else if (filters.sort === 'price-desc') {
                return b.price - a.price;
            } else if (filters.sort === 'rating-desc') {
                return b.rating - a.rating;
            }
            return 0;
        });

    return (
        <div className="product-list-container">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Filters filters={filters} setFilters={setFilters} />
            <div className="product-list">
                {filteredProducts.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <div className="product-card">
                            <Link to={`/productos/${product.id}`}>
                                <img src={product.image} alt={product.name} className="product-card__img" />
                                <h3 className="product-card__title">{product.name}</h3>
                            </Link>
                            <p className="product-card__description">{product.shortDescription}</p>
                            <h4 className="product-card__price">${product.price}</h4>
                            <button
                                className="btn btn-success"
                                onClick={() => addToCart(product)}
                            >
                                Añadir al carrito
                            </button>
                            {localStorage.getItem('userRole') === 'admin' && (
                                <div className="admin-buttons">
                                    <Link to={`/admin-productos/editar/${product.id}`} className="btn btn-primary">Editar</Link>
                                    <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Eliminar</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;

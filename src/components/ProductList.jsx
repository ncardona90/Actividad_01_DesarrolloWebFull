import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { deleteProduct, getProducts } from '../db';
import Filters from './Filters';
import SearchBar from './SearchBar';
import '../styles/ProductList.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

function ProductList({ addToCart }) {
    const isAdmin = localStorage.getItem('role') === 'admin';
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        rating: '',
        sort: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category') || '';
        setFilters((prevFilters) => ({
            ...prevFilters,
            category
        }));

        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [location]);

    const handleDelete = async (productId) => {
        await deleteProduct(productId);
        window.location.reload();
    };

    const categories = [...new Set(products.map(product => product.category))];
    const ratings = [...new Set(products.map(product => Math.floor(product.rating)))];

    const filteredProducts = products
        .filter(product => (
            filters.category === '' || product.category === filters.category))
        .filter(product => (filters.rating === '' || Math.floor(product.rating) === Number(filters.rating)))
        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (filters.sort === 'price-asc') {
                return a.price - b.price;
            } else if (filters.sort === 'price-desc') {
                return b.price - a.price;
            } else if (filters.sort === 'rating-desc') {
                return b.rating - a.rating;
            } else {
                return 0;
            }
        });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-12">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <Filters filters={filters} setFilters={setFilters} categories={categories} ratings={ratings} />
                </div>
            </div>
            <div className="row product-gallery">
                {filteredProducts.map(product => {
                    const images = product.images.split(';');

                    return (
                        <div className="col-md-3 col-sm-6 mb-4" key={product.product_id}>
                            <div className="card product-card">
                                {images && images.length > 0 ? (
                                    <Carousel showThumbs={false} autoPlay infiniteLoop>
                                        {images.map((image, index) => (
                                            <div key={index}>
                                                <img src={image} alt={`${product.name} ${index + 1}`} className="card-img-top" />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <p>No hay imágenes disponibles para este producto.</p>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/productos/${product.product_id}`}>{product.name}</Link>
                                    </h5>
                                    <p className="card-text">{formatCurrency(product.price)}</p>
                                    <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>
                                        Añadir al carrito
                                    </button>
                                    {isAdmin && (
                                        <div className="admin-buttons mt-2">
                                            <button className="btn btn-secondary me-2" onClick={() => navigate(`/admin-productos/editar/${product.product_id}`)}>
                                                Editar
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(product.product_id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../db';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/ProductDetails.css';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

function ProductDetails({ addToCart }) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(productId);
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div className="container mt-4">Loading...</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/carrito');
    };

    return (
        <div className="container product-details-container mt-4">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="product-details-title">{product.name}</h2>
                            {product.images && product.images.length > 0 ? (
                                <Carousel className="product-details-carousel mb-4" showThumbs={false} autoPlay infiniteLoop>
                                    {product.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`${product.name} ${index + 1}`} className="img-fluid" />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <p>No hay imágenes disponibles para este producto.</p>
                            )}
                            <p className="product-details-description">{product.description}</p>
                            <p className="product-details-price"><strong>Precio:</strong> {formatCurrency(product.price)}</p>
                            <p className="product-details-rating"><strong>Calificación:</strong> {product.rating} estrellas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <button onClick={handleBuyNow} className="btn btn-primary w-100 mb-2">Comprar ahora</button>
                            <button onClick={handleAddToCart} className="btn btn-secondary w-100">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

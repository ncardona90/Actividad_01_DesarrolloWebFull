import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { deleteProduct } from '../db';

function ProductList({ products, addToCart }) {
    const isAdmin = localStorage.getItem('role') === 'admin';
    const navigate = useNavigate();

    const handleDelete = async (productId) => {
        await deleteProduct(productId);
        window.location.reload(); // Recargar la página para ver los cambios
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card mb-4">
                            {product.images && product.images.length > 0 ? (
                                <Carousel showThumbs={false} autoPlay infiniteLoop>
                                    {product.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={image} alt={`${product.name} ${index + 1}`} />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <p>No hay imágenes disponibles para este producto.</p>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/productos/${product.id}`}>{product.name}</Link>
                                </h5>
                                <p className="card-text">${product.price}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product)}
                                >
                                    Añadir al carrito
                                </button>
                                {isAdmin && (
                                    <>
                                        <button
                                            className="btn btn-secondary mt-2"
                                            onClick={() => navigate(`/admin-productos/editar/${product.id}`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger mt-2"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../db';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(productId);
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} className="img-fluid" />
                    {/* Aquí puedes agregar una galería de fotos si tienes más de una imagen */}
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <h3>Precio: ${product.price}</h3>
                    <p>Calificación: {product.rating} estrellas</p>
                    <button className="btn btn-primary">Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

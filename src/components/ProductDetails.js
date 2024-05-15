import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../db';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>
            {product.images && product.images.length > 0 ? (
                <Carousel>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`${product.name} ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <p>No hay imágenes disponibles para este producto.</p>
            )}
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Calificación: {product.rating} estrellas</p>
        </div>
    );
}

export default ProductDetails;

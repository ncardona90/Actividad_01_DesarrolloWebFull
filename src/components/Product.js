import React from 'react';

function Product({ product, addToCart }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Calificación: {product.rating} estrellas</p>
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
        </div>
    );
}

export default Product;

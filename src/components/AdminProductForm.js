import React, { useState } from 'react';

function AdminProductForm({ handleAddProduct }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, description, price: Number(price), rating: Number(rating), category, image };
        handleAddProduct(product);
        // Clear the form
        setName('');
        setDescription('');
        setPrice('');
        setRating('');
        setCategory('');
        setImage('');
    };

    return (
        <div>
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><br /><br />
                <label htmlFor="description">Descripción:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><br /><br />
                <label htmlFor="price">Precio:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                /><br /><br />
                <label htmlFor="rating">Calificación:</label>
                <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                /><br /><br />
                <label htmlFor="category">Categoría:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                /><br /><br />
                <label htmlFor="image">URL de la imagen:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                /><br /><br />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
}

export default AdminProductForm;

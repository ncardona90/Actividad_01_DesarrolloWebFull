import React, { useState } from 'react';
import { addProduct } from '../db';

function AdminProductForm({ handleAddProduct }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState(['']);

    const handleAddImageField = () => {
        setImages([...images, '']);
    };

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description, price, rating, category, images };
        await addProduct(newProduct);
        handleAddProduct(newProduct);
        setName('');
        setDescription('');
        setPrice('');
        setRating('');
        setCategory('');
        setImages(['']);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Descripción:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <label>Calificación:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <div>
                <label>Categoría:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Imágenes:</label>
                {images.map((image, index) => (
                    <input
                        key={index}
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="URL de la imagen"
                    />
                ))}
                <button type="button" onClick={handleAddImageField}>Agregar otra imagen</button>
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    );
}

export default AdminProductForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../db';

function EditProductForm() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(productId);
            setProduct(productData);
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setRating(productData.rating);
            setCategory(productData.category);
            setImage(productData.image);
        };
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = { id: product.id, name, description, price: Number(price), rating: Number(rating), category, image };
        await updateProduct(updatedProduct);
        navigate('/productos');
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>Editar Producto</h2>
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
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditProductForm;

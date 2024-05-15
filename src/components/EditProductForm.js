import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../db';

function EditProductForm() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(productId);
            setProduct(productData);
        };
        fetchProduct();
    }, [productId]);

    const handleAddImageField = () => {
        setProduct({
            ...product,
            images: [...product.images, '']
        });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct({
            ...product,
            images: newImages
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(product);
        navigate('/admin-productos');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </div>
            <div>
                <label>Descripción:</label>
                <input type="text" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            </div>
            <div>
                <label>Calificación:</label>
                <input type="number" value={product.rating} onChange={(e) => setProduct({ ...product, rating: e.target.value })} />
            </div>
            <div>
                <label>Categoría:</label>
                <input type="text" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
            </div>
            <div>
                <label>Imágenes:</label>
                {product.images.map((image, index) => (
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
            <button type="submit">Guardar Cambios</button>
        </form>
    );
}

export default EditProductForm;

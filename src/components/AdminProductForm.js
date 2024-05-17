import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, getProductById, updateProduct } from '../db';
import '../styles/AdminProductForm.css';

function AdminProductForm({ handleAddProduct }) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        rating: '',
        category: '',
        images: ['']
    });

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                const productData = await getProductById(productId);
                setProduct(productData);
            };
            fetchProduct();
        }
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...product.images];
        newImages[index] = value;
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: newImages,
        }));
    };

    const handleAddImageField = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, ''],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productId) {
            await updateProduct(productId, product);
        } else {
            await addProduct(product);
            handleAddProduct(product);
        }
        navigate('/productos');
    };

    return (
        <div className="container mt-4">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre del Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Calificación</label>
                    <input
                        type="number"
                        className="form-control"
                        name="rating"
                        value={product.rating}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Categoría</label>
                    <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Imágenes</label>
                    {product.images.map((image, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            placeholder={`URL de la imagen ${index + 1}`}
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                        />
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddImageField}>
                        Agregar Imagen
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">
                    {productId ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
            </form>
        </div>
    );
}

export default AdminProductForm;


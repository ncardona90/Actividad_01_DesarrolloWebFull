import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const categoryIcons = {
    Speakers: 'fas fa-volume-up',
    Smartphones: 'fas fa-mobile-alt',
    Laptops: 'fas fa-desktop',
    // Cada vez que necesite una categoría adicional, agregar iconos y su ref
};

function Categories({ categories }) {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/productos?category=${category}`);
    };

    return (
        <div className="container mt-4">
            <h2>Categorías</h2>
            <p>Explora nuestras categorías de productos.</p>
            <div className="row">
                {categories.map((category, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card category-card">
                            <div className="card-body">
                                <i className={`${categoryIcons[category]} category-icon`}></i>
                                <h5 className="card-title">{category}</h5>
                                <button onClick={() => handleCategoryClick(category)} className="btn btn-primary">
                                    Ver productos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;

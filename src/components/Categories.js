import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const categoryIcons = {
    Speakers: 'fas fa-volume-up',
    Smartphones: 'fas fa-mobile-alt',
    Laptops: 'fas fa-desktop',
    Cameras: 'fas fa-camera',
    Headphones: 'fas fa-headphones',
    Accessories: 'fas fa-cog',
    Gaming: 'fas fa-gamepad',
    Drones: 'fas fa-fighter-jet',
    Wearables: 'fas fa-clock',
    Printers: 'fas fa-print',
    Monitors: 'fas fa-tv',
    Tablets: 'fas fa-tablet-alt',
    TVs: 'fas fa-tv',
    Home: 'fas fa-home',
    Appliances: 'fas fa-blender',
    Audio: 'fas fa-music',
    Networking: 'fas fa-wifi',
    Storage: 'fas fa-hdd',
    Software: 'fas fa-file-code',
    Components: 'fas fa-microchip',
    Peripherals: 'fas fa-keyboard',
    Services: 'fas fa-tools',
    Other: 'fas fa-question',
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

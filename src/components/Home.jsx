// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getProducts } from '../db';
// import '../styles/Home.css';
//
// const categoryIcons = {
//     Speakers: 'fas fa-volume-up',
//     Smartphones: 'fas fa-mobile-alt',
//     Laptops: 'fas fa-desktop',
//     Cameras: 'fas fa-camera',
//     Headphones: 'fas fa-headphones',
//     Accessories: 'fas fa-cog',
//     Gaming: 'fas fa-gamepad',
//     Drones: 'fas fa-fighter-jet',
//     Wearables: 'fas fa-clock',
//     Printers: 'fas fa-print',
//     Monitors: 'fas fa-tv',
//     Tablets: 'fas fa-tablet-alt',
//     TVs: 'fas fa-tv',
//     Home: 'fas fa-home',
//     Appliances: 'fas fa-blender',
//     Audio: 'fas fa-music',
//     Networking: 'fas fa-wifi',
//     Storage: 'fas fa-hdd',
//     Software: 'fas fa-file-code',
//     Components: 'fas fa-microchip',
//     Peripherals: 'fas fa-keyboard',
//     Services: 'fas fa-tools',
//     Other: 'fas fa-question',
// };
//
// function Home() {
//     const navigate = useNavigate();
//     const [categories, setCategories] = useState([]);
//     const [featuredProducts, setFeaturedProducts] = useState([]);
//
//     const handleCategoryClick = (category) => {
//         navigate(`/productos?category=${category}`);
//     };
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const products = await getProducts();
//             const categories = [...new Set(products.map(product => product.category))];
//             const featuredProducts = products.filter(product => product.rating === 5);
//             setCategories(categories);
//             setFeaturedProducts(featuredProducts);
//         };
//         fetchData();
//     }, []);
//
//     return (
//         <div className="home-container">
//             {/* Banner de Bienvenida */}
//             <div className="banner">
//                 <h1>Bienvenido a Nuestra Tienda Online</h1>
//                 <p>Encuentra las mejores promociones y productos de alta calidad.</p>
//                 <Link to="/productos" className="btn btn-primary">Explorar Productos</Link>
//             </div>
//
//             {/* Productos Destacados */}
//             <div className="section">
//                 <h2>Productos Destacados</h2>
//                 <div className="products">
//                     {featuredProducts.map(product => (
//                         <div className="product-card" key={product.product_id}>
//                             <img src={product.images[0]} alt={product.name} />
//                             <h3>{product.name}</h3>
//                             <p>${product.price}</p>
//                             <Link to={`/productos/${product.product_id}`} className="btn btn-outline-primary">Ver Producto</Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Categorías Populares */}
//             <div className="section">
//                 <h2>Categorías Populares</h2>
//                 <div className="row">
//                     {categories.map((category, index) => (
//                         <div className="col-md-4 mb-4" key={index}>
//                             <div className="card category-card">
//                                 <div className="card-body">
//                                     <i className={`${categoryIcons[category]} category-icon`}></i>
//                                     <h5 className="card-title">{category}</h5>
//                                     <button onClick={() => handleCategoryClick(category)} className="btn btn-primary">
//                                         Ver productos
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Testimonios */}
//             <div className="section">
//                 <h2>Testimonios</h2>
//                 <div className="testimonials">
//                     <div className="testimonial-card">
//                         <p>"Excelente servicio y productos de calidad!" - Juan Pérez</p>
//                     </div>
//                     <div className="testimonial-card">
//                         <p>"Me encantó la rapidez de la entrega." - Ana Gómez</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Home;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../db';
import '../styles/Home.css';

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

function Home() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const handleCategoryClick = (category) => {
        navigate(`/productos?category=${category}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            const products = await getProducts();
            const categories = [...new Set(products.map(product => product.category))];
            const featuredProducts = products.filter(product => product.rating === 5);
            setCategories(categories);
            setFeaturedProducts(featuredProducts);
        };
        fetchData();
    }, []);

    return (
        <div className="home-container">
            {/* Banner de Bienvenida */}
            <div className="banner">
                <div className="banner-overlay">
                    <h1>Bienvenido a Nuestra Tienda Online</h1>
                    <p>Encuentra las mejores promociones y productos de alta calidad.</p>
                    <Link to="/productos" className="btn btn-primary">Explorar Productos</Link>
                </div>
            </div>

            {/* Productos Destacados */}
            <div className="section">
                <h2>Productos Destacados</h2>
                <div className="products">
                    {featuredProducts.map(product => (
                        <div className="product-card" key={product.product_id}>
                            <img src={product.images[0]} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                            <Link to={`/productos/${product.product_id}`} className="btn btn-outline-primary">Ver Producto</Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categorías Populares */}
            <div className="section">
                <h2>Categorías Populares</h2>
                <div className="row">
                    {categories.map((category, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card category-card" onClick={() => handleCategoryClick(category)}>
                                <div className="card-body">
                                    <i className={`${categoryIcons[category]} category-icon`}></i>
                                    <h5 className="card-title">{category}</h5>
                                    <button className="btn btn-primary">Ver productos</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonios */}
            <div className="section">
                <h2>Testimonios</h2>
                <div className="testimonials">
                    <div className="testimonial-card">
                        <p>"Excelente servicio y productos de calidad!" - Juan Pérez</p>
                    </div>
                    <div className="testimonial-card">
                        <p>"Me encantó la rapidez de la entrega." - Ana Gómez</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

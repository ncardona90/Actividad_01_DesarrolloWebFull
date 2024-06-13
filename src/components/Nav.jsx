import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({ cartItemCount }) {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Mi Tienda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categorias">Categorías</Link>
                        </li>
                        {isAuthenticated && role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-productos">Admin Productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-ordenes">Ver Todas las Órdenes</Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated && role === 'user' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/mis-ordenes">Mis Órdenes</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center">
                        {isAuthenticated ? (
                            <button className="btn btn-outline-secondary me-2" onClick={handleLogout}>Cerrar sesión</button>
                        ) : (
                            <Link className="btn btn-outline-secondary me-2" to="/login">Iniciar sesión</Link>
                        )}
                        <div className="cart-icon position-relative">
                            <Link to="/carrito" className="text-decoration-none">
                                <i className="fas fa-shopping-cart"></i>
                                {cartItemCount > 0 && (
                                    <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle badge-rounded-pill">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

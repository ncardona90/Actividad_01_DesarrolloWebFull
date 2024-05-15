import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin-productos">Admin Productos</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="d-flex">
                    {isAuthenticated ? (
                        <button className="btn btn-outline-secondary" onClick={handleLogout}>Cerrar sesión</button>
                    ) : (
                        <Link className="btn btn-outline-secondary" to="/login">Iniciar sesión</Link>
                    )}
                    <div className="cart-icon">
                        <Link to="/carrito">
                            <span className="badge bg-secondary">{cartItemCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

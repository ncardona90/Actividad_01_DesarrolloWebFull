import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav({ cartItemCount }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="nav">
            {isAuthenticated ? (
                <>
                    <Link to="/">Inicio</Link>
                    <Link to="/productos">Productos</Link>
                    <Link to="/categorias">Categorías</Link>
                    {userRole === 'admin' && <Link to="/admin-productos">Admin Productos</Link>}
                    <button onClick={handleLogout}>Cerrar sesión</button>
                    <div className="cart-icon">
                        <Link to="/carrito">
                            🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/login">Inicio de sesión</Link>
                    <Link to="/register">Registro</Link>
                </>
            )}
        </nav>
    );
}

export default Nav;

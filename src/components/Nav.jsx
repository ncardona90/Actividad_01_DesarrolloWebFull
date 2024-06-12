import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './src/AuthContext.jsx'; // Asegúrate de que la ruta sea correcta

const Nav = ({ cartItemCount }) => {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <span>{user.name}</span>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            ) : (
                <Link to="/login">Iniciar sesión</Link>
            )}
            <Link to="/carrito">Carrito ({cartItemCount})</Link>
        </nav>
    );
};

export default Nav;

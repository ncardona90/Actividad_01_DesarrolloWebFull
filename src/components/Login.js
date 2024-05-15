import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../db';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = await getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', user.role);
            navigate('/');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;

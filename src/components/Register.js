import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../db';
import '../styles/Login.css'; // Usa el mismo archivo CSS para estilos consistentes

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, password, role: 'user' };
        try {
            await addUser(user);
            navigate('/login');
        } catch (error) {
            setError('Error al registrar el usuario');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-center">Registro</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Register;

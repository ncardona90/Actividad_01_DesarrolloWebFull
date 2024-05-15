import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../db';

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
        <div>
            <h2>Registro</h2>
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;


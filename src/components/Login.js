// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUsers } from '../db';
//
// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const users = await getUsers();
//         const user = users.find(u => u.username === username && u.password === password);
//         if (user) {
//             localStorage.setItem('isAuthenticated', 'true');
//             localStorage.setItem('role', user.role); // Guardar el rol del usuario
//             navigate('/');
//         } else {
//             alert('Usuario o contraseña incorrectos');
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Nombre de usuario:</label>
//                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </div>
//             <div>
//                 <label>Contraseña:</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit">Iniciar sesión</button>
//         </form>
//     );
// }
//
// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../db';
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = await getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('role', user.role);
            navigate('/');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-center">Iniciar sesión</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de usuario:</label>
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
                <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { addOrder } from '../db';
import '../styles/Checkout.css';

function Checkout({ cartItems, totalPrice }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            // Si no hay usuario autenticado, redirigir al login
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            userId: user.id, // assuming user object has an id property
            products: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
            totalPrice,
            status: 'Pendiente',
        };
        await addOrder(order);
        navigate('/order-confirmation');
    };

    return (
        <div className="checkout-container">
            <h2>Procesa tu pago de manera segura</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary">Realizar Pedido</button>
            </form>
        </div>
    );
}

export default Checkout;

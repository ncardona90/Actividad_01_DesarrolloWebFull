import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import { addOrder } from '../db'; // Importar la función addOrder

function Checkout({ cartItems, totalPrice, clearCart }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const username = localStorage.getItem('username'); // Obtener el username del localStorage
    const navigate = useNavigate(); // Hook para redirección

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            name,
            address,
            email,
            phone,
            username, // Incluir el username en la orden
            cartItems,
            totalPrice,
        };

        try {
            const response = await addOrder(orderData);
            console.log('Order saved successfully', response);
            clearCart(); // Vaciar el carrito
            navigate(`/order-details/${response.id}`); // Redirigir a la página de detalles de la orden
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Pago</h2>
            <p>Procesa tu pago de manera segura.</p>

            <form onSubmit={handleSubmit} className="checkout-form">
                <h3>Información Personal</h3>
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <h3>Detalles del Pedido</h3>
                <ul className="order-details">
                    {cartItems.map((item) => (
                        <li key={item.id}>{item.name} - {item.quantity} x {formatCurrency(item.price)}</li>
                    ))}
                </ul>
                <h4>Total: {formatCurrency(totalPrice)}</h4>

                <button type="submit" className="btn btn-primary">Realizar Pedido</button>
            </form>
        </div>
    );
}

export default Checkout;

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

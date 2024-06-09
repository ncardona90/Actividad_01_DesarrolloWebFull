import React, { useState } from 'react';
import '../styles/Checkout.css';

function Checkout({ cartItems, totalPrice }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de pago.
        console.log('Payment processed');
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

                <h3>Método de Pago</h3>
                <div className="form-group payment-method">
                    <label>
                        <input type="radio" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <img src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Symbol.png" alt="Visa" className="payment-logo" />
                        <img src="https://logolook.net/wp-content/uploads/2021/07/Mastercard-Logo.png" alt="MasterCard" className="payment-logo" />
                    </label>
                    <label>
                        <input type="radio" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <img src="https://logolook.net/wp-content/uploads/2021/06/Paypal-Logo-2007.png" alt="PayPal" className="payment-logo" />
                    </label>
                </div>

                {paymentMethod === 'creditCard' && (
                    <div className="credit-card-info">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Número de Tarjeta:</label>
                            <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Fecha de Expiración:</label>
                            <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV:</label>
                            <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Confirmar y Pagar</button>
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

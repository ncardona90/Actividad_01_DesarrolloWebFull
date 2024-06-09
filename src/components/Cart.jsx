import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

function Cart({ cartItems, updateCartItemQuantity, removeFromCart, clearCart }) {
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="cart container mt-4">
            <h2 className="mb-4">Carrito de Compras</h2>
            <ul className="list-group">
                {cartItems.map(item => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                        <div className="cart-item-details d-flex align-items-center">
                            <img src={item.images[0]} alt={item.name} className="cart-item-thumbnail mr-3" />
                            <div>
                                <h5>{item.name}</h5>
                                <p>{formatCurrency(item.price)}</p>
                                <div className="quantity-control">
                                    <button className="btn btn-secondary btn-sm" onClick={() => updateCartItemQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button className="btn btn-secondary btn-sm" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <button className="btn btn-success mr-2" onClick={() => navigate('/checkout')}>Proceder al Pago</button>
                <button className="btn btn-warning" onClick={clearCart}>Vaciar Carrito</button>
            </div>
            <h4 className="mt-4">Total: {formatCurrency(totalPrice)}</h4>
        </div>
    );
}

export default Cart;

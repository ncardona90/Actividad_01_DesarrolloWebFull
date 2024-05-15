import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, clearCart }) {
    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalPrice}</h3>
                    <button onClick={() => navigate('/pago')}>Ir a Pagar</button>
                    <button onClick={clearCart}>Vaciar Carrito</button>
                </div>
            )}
        </div>
    );
}

export default Cart;


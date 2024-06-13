import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../db';

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const allOrders = await getOrders();
            setOrders(allOrders);
        };
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        await deleteOrder(id);
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        <div>
            <h2>Órdenes de Usuarios</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Email: {order.email}</p>
                        <p>Nombre: {order.name}</p>
                        <p>{order.cartItems.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                        <p>Total: {formatCurrency(order.totalPrice)}</p>
                        <button onClick={() => handleDelete(order.id)}>Eliminar Orden</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminOrders;

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

import React, { useEffect, useState } from 'react';
import { getOrders } from '../db';
import '../styles/AdminOrderList.css';

function AdminOrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    return (
        <div className="admin-order-list">
            <h2>Todos los Pedidos</h2>
            {orders.map((order) => (
                <div key={order.id} className="order-item">
                    <h3>Usuario: {order.userId}</h3>
                    <p>Fecha: {order.date}</p>
                    <p>Total: ${order.totalPrice}</p>
                    <p>Nombre: {order.name}</p>
                    <p>Dirección: {order.address}</p>
                    <p>Email: {order.email}</p>
                    <p>Teléfono: {order.phone}</p>
                    <p>Items: {order.cartItems.map(item => item.name).join(', ')}</p>
                </div>
            ))}
        </div>
    );
}

export default AdminOrderList;

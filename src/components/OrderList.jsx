import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { getOrders } from '../db';
import '../styles/OrderList.css';

function OrderList() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getOrders(user.id);
            setOrders(data);
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="order-list">
            <h2>Mis Pedidos</h2>
            {orders.map((order) => (
                <div key={order.id} className="order-item">
                    <h3>Fecha: {order.date}</h3>
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

export default OrderList;

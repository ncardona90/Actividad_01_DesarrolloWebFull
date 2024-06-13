import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByUser, deleteOrder } from '../db'; // Importa las funciones necesarias

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username'); // Obtener el username del localStorage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrdersByUser(username);
                setOrders(ordersData);
            } catch (err) {
                setError('Error fetching orders');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [username]);

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (orders.length === 0) {
        return <div>No tienes órdenes aún.</div>;
    }

    return (
        <div className="orders-container">
            <h2>Mis Órdenes</h2>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <h3>Orden ID: {order.id}</h3>
                    <p>Total: {formatCurrency(order.totalPrice)}</p>
                    <Link to={`/order-details/${order.id}`} className="btn btn-primary">Ver Detalles</Link>
                    <button onClick={() => handleDelete(order.id)} className="btn btn-danger">Eliminar Orden</button>
                </div>
            ))}
        </div>
    );
}

export default UserOrders;

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../db'; // Importar la función para obtener la orden por ID

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderData = await getOrderById(orderId);
                setOrder(orderData);
            } catch (err) {
                setError('Error fetching order data');
                console.error('Error fetching order:', err);
            } finally {
                setLoading(false); // Detener la carga
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>Order not found</div>;
    }

    return (
        <div>
            <h2>Detalles del Pedido</h2>
            <p>Nombre: {order.name}</p>
            <p>Dirección: {order.address}</p>
            <p>Email: {order.email}</p>
            <p>Teléfono: {order.phone}</p>
            <h3>Productos</h3>
            <ul>
                {order.cartItems && order.cartItems.map((item) => (
                    <li key={item.id}>{item.name} - {item.quantity} x {formatCurrency(item.price)}</li>
                ))}
            </ul>
            <h4>Total: {formatCurrency(order.totalPrice)}</h4>
        </div>
    );
}

export default OrderDetails;

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

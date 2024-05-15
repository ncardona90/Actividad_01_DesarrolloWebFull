import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import EditProductForm from './components/EditProductForm';
import Cart from './components/Cart';
import Categories from './components/Categories';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AdminProductForm from './components/AdminProductForm';
import { getProducts, initializeData, addProduct } from './db';

function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');
    return isAuthenticated && role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            await initializeData();
            const products = await getProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const handleAddProduct = async (product) => {
        const newProduct = await addProduct(product);
        setProducts([...products, newProduct]);
    };

    return (
        <div className="App">
            <Router>
                <Header />
                <Nav cartItemCount={cartItems.length} />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/productos" element={<PrivateRoute><ProductList products={products} addToCart={addToCart} /></PrivateRoute>} />
                        <Route path="/productos/:productId" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
                        <Route path="/carrito" element={<PrivateRoute><Cart cartItems={cartItems} clearCart={clearCart} /></PrivateRoute>} />
                        <Route path="/categorias" element={<PrivateRoute><Categories /></PrivateRoute>} />
                        <Route path="/pago" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                        <Route path="/admin-productos" element={<AdminRoute><AdminProductForm handleAddProduct={handleAddProduct} /></AdminRoute>} />
                        <Route path="/admin-productos/editar/:productId" element={<AdminRoute><EditProductForm /></AdminRoute>} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

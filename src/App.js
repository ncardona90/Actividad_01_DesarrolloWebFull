import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Categories from './components/Categories';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AdminProductForm from './components/AdminProductForm';
import ProductDetails from './components/ProductDetails';
import { getProducts, addUser } from './db';

function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const updateCartItemQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ));
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const handleAddProduct = async (product) => {
        const newProduct = await addUser(product);
        setProducts([...products, newProduct]);
    };

    // Obtener categorías únicas
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <div className="App">
            <Router>
                <Header />
                <Nav cartItemCount={cartItems.length} />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/productos" element={<PrivateRoute><ProductList products={products} addToCart={addToCart} /></PrivateRoute>} />
                    <Route path="/productos/:productId" element={<PrivateRoute><ProductDetails addToCart={addToCart} /></PrivateRoute>} />
                    <Route path="/carrito" element={<PrivateRoute><Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart} clearCart={clearCart} /></PrivateRoute>} />
                    <Route path="/categorias" element={<PrivateRoute><Categories categories={categories} /></PrivateRoute>} />
                    <Route path="/checkout" element={<PrivateRoute><Checkout cartItems={cartItems} totalPrice={totalPrice} /></PrivateRoute>} />
                    <Route path="/admin-productos" element={<PrivateRoute><AdminProductForm handleAddProduct={handleAddProduct} /></PrivateRoute>} />
                    <Route path="/admin-productos/editar/:productId" element={<PrivateRoute><AdminProductForm handleAddProduct={handleAddProduct} /></PrivateRoute>} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;

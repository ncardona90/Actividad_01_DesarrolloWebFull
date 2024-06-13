import fs from "fs";

const express = require('express');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');
const productsFilePath = path.join(__dirname, 'products.json');
const ordersFilePath = path.join(__dirname, 'orders.json');

// Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(JSON.parse(data));
    });
});

// Agregar un nuevo usuario
app.post('/api/users', (req, res) => {
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const users = JSON.parse(data);
        users.push(req.body);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(req.body);
        });
    });
});

// Obtener todos los productos
app.get('/api/products', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(JSON.parse(data));
    });
});

// Obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const products = JSON.parse(data);
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).send('Producto no encontrado');
        res.send(product);
    });
});

// Agregar un nuevo producto
app.post('/api/products', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const products = JSON.parse(data);
        const newProduct = { ...req.body, id: products.length ? products[products.length - 1].id + 1 : 1 };
        products.push(newProduct);
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(newProduct);
        });
    });
});

// Actualizar un producto existente
app.put('/api/products/:id', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const products = JSON.parse(data);
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).send('Producto no encontrado');
        products[index] = { ...products[index], ...req.body };
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.send(products[index]);
        });
    });
});

// Eliminar un producto
app.delete('/api/products/:id', (req, res) => {
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        let products = JSON.parse(data);
        products = products.filter(p => p.id !== parseInt(req.params.id));
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.status(204).send();
        });
    });
});

// Nueva ruta para guardar pedidos
app.post('/api/orders', (req, res) => {
    const { name, address, email, phone, cartItems, totalPrice, username } = req.body;

    fs.readFile(ordersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);

        const orders = JSON.parse(data);
        const newOrder = { id: uuidv4(), name, address, email, phone, username, cartItems, totalPrice }; // Agregar el username a la orden
        orders.push(newOrder);

        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send(newOrder);
        });
    });
});

// Obtener todas las órdenes
app.get('/api/orders', (req, res) => {
    fs.readFile(ordersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        res.send(JSON.parse(data));
    });
});

// Obtener órdenes por usuario
app.get('/api/orders/user/:username', (req, res) => { // Cambiar la ruta para que no entre en conflicto con la ruta de obtener por ID
    fs.readFile(ordersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const orders = JSON.parse(data);
        const userOrders = orders.filter(order => order.username === req.params.username);
        res.send(userOrders);
    });
});

// Obtener una orden por ID
app.get('/api/orders/:id', (req, res) => {
    fs.readFile(ordersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        const orders = JSON.parse(data);
        const order = orders.find(o => o.id === req.params.id);
        if (!order) return res.status(404).send('Orden no encontrada');
        res.send(order);
    });
});

// Eliminar una orden
app.delete('/api/orders/:id', (req, res) => {
    fs.readFile(ordersFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send(err);
        let orders = JSON.parse(data);
        orders = orders.filter(order => order.id !== req.params.id);
        fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8', (err) => {
            if (err) return res.status(500).send(err);
            res.status(204).send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

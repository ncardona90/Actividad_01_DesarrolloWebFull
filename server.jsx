const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

const pool = mysql.createPool({
    host: 'database-2.cv6yw88iuljb.us-east-1.rds.amazonaws.com',
    user: 'adm',
    password: 'root1234',
    database: 'store',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(cors());
app.use(express.json());

// Endpoints para Productos
app.get('/api/products', async (req, res) => {
    const { category, priceRange } = req.query;
    let query = 'SELECT * FROM product';
    const params = [];

    if (category) {
        query += ' WHERE category_id = ?';
        params.push(category);
    }

    if (priceRange) {
        if (params.length) {
            query += ' AND';
        } else {
            query += ' WHERE';
        }
        query += ' price BETWEEN ? AND ?';
        const [minPrice, maxPrice] = priceRange.split('-');
        params.push(minPrice, maxPrice);
    }

    try {
        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM product WHERE product_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/api/products', async (req, res) => {
    const { name, description, price, rating, category_id, images, state } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO product (name, description, price, rating, category_id, images, state) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, rating, category_id, images, state]
        );
        res.status(201).json({ id: result.insertId, name, description, price, rating, category_id, images, state });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, rating, category_id, images, state } = req.body;
    try {
        await pool.query(
            'UPDATE product SET name = ?, description = ?, price = ?, rating = ?, category_id = ?, images = ?, state = ? WHERE product_id = ?',
            [name, description, price, rating, category_id, images, state, id]
        );
        res.status(200).json({ id, name, description, price, rating, category_id, images, state });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM product WHERE product_id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(404).send(err);
    }
});

// Endpoints para Ordenes
app.get('/api/orders', async (req, res) => {
    const { userId, status } = req.query;
    let query = 'SELECT * FROM product_order';
    const params = [];

    if (userId) {
        query += ' WHERE user_id = ?';
        params.push(userId);
    }

    if (status) {
        if (params.length) {
            query += ' AND';
        } else {
            query += ' WHERE';
        }
        query += ' state = ?';
        params.push(status);
    }

    try {
        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/api/orders', async (req, res) => {
    const { user_id, name, date, address, email, phone, total, state, products } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO product_order (user_id, name, date, address, email, phone, total, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, name, date, address, email, phone, total, state]
        );

        const orderId = result.insertId;
        for (const product of products) {
            await pool.query(
                'INSERT INTO product_order_detail (product_order_id, product_id, state) VALUES (?, ?, ?)',
                [orderId, product.product_id, 1]
            );
        }
        res.status(201).json({ orderId, user_id, name, date, address, email, phone, total, state, products });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM product_order WHERE product_order_id = ?', [id]);
        await pool.query('DELETE FROM product_order_detail WHERE product_order_id = ?', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(404).send(err);
    }
});

// Endpoints para Usuarios
app.post('/api/users/register', async (req, res) => {
    const { rol_id, password, user_name, state } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO platform_user (rol_id, password, user_name, state) VALUES (?, ?, ?, ?)',
            [rol_id, password, user_name, state]
        );
        res.status(201).json({ id: result.insertId, rol_id, password, user_name, state });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM platform_user WHERE user_name = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            return res.status(401).send('Credenciales incorrectas');
        }
        const user = rows[0];
        res.status(200).json({ id: user.user_id, role: user.role, name: user.user_name });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Endpoints para Roles
app.get('/api/roles', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM role');
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/api/roles', async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO role (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

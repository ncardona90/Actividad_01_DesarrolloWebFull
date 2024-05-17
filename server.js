// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors'); // Importa cors
//
// const app = express();
// const PORT = 5000;
//
// app.use(bodyParser.json());
// app.use(cors()); // Utiliza cors
//
// const PRODUCTS_FILE = path.join(__dirname, 'products.json');
// const USERS_FILE = path.join(__dirname, 'users.json');
//
// // Endpoint para obtener productos
// app.get('/api/products', (req, res) => {
//     fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(JSON.parse(data));
//         }
//     });
// });
//
// // Endpoint para obtener un producto por ID
// app.get('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             const products = JSON.parse(data);
//             const product = products.find(p => p.id === id);
//             if (product) {
//                 res.json(product);
//             } else {
//                 res.status(404).send('Product not found');
//             }
//         }
//     });
// });
//
// // Endpoint para agregar un producto
// app.post('/api/products', (req, res) => {
//     const newProduct = req.body;
//     fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             const products = JSON.parse(data);
//             newProduct.id = products.length + 1;
//             products.push(newProduct);
//             fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8', err => {
//                 if (err) {
//                     res.status(500).send(err);
//                 } else {
//                     res.status(201).json(newProduct);
//                 }
//             });
//         }
//     });
// });
//
// // Endpoint para actualizar un producto
// app.put('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedProduct = req.body;
//     fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             let products = JSON.parse(data);
//             products = products.map(p => (p.id === id ? updatedProduct : p));
//             fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8', err => {
//                 if (err) {
//                     res.status(500).send(err);
//                 } else {
//                     res.json(updatedProduct);
//                 }
//             });
//         }
//     });
// });
//
// // Endpoint para eliminar un producto
// app.delete('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     fs.readFile(PRODUCTS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             let products = JSON.parse(data);
//             products = products.filter(p => p.id !== id);
//             fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8', err => {
//                 if (err) {
//                     res.status(500).send(err);
//                 } else {
//                     res.status(204).send();
//                 }
//             });
//         }
//     });
// });
//
// // Endpoint para obtener usuarios
// app.get('/api/users', (req, res) => {
//     fs.readFile(USERS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(JSON.parse(data));
//         }
//     });
// });
//
// // Endpoint para agregar un usuario
// app.post('/api/users', (req, res) => {
//     const newUser = req.body;
//     fs.readFile(USERS_FILE, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             const users = JSON.parse(data);
//             users.push(newUser);
//             fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8', err => {
//                 if (err) {
//                     res.status(500).send(err);
//                 } else {
//                     res.status(201).json(newUser);
//                 }
//             });
//         }
//     });
// });
//
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFilePath = path.join(__dirname, 'users.json');
const productsFilePath = path.join(__dirname, 'products.json');

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

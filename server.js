const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // allow cross-origin requests
app.use(express.json());

// ======== PRODUCTS DATA ========
const products = [
    {
        id: 1,
        name: "Cocoa Short V-neck Kurti",
        price: 200,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/4AD5EDD0-574C-478D-93AD-A05A524C6A50.jpg?v=1763480496&width=1100",
        image_2: "https://www.pehrin.com/cdn/shop/files/B8192212-6EEB-44D0-963A-53CDEB09F067.jpg?v=1763480481&width=1100",
        description: "Soft cotton T-shirt."
    },
    {
        id: 2,
        name: "The Matcha Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/EB5E8CC7-C078-46CA-9AC8-C0F4C50465EC.jpg?v=1763479905&width=533",
        image_1: "https://www.pehrin.com/cdn/shop/files/4AD5EDD0-574C-478D-93AD-A05A524C6A50.jpg?v=1763480496&width=1100",
        image_2: "https://www.pehrin.com/cdn/shop/files/B8192212-6EEB-44D0-963A-53CDEB09F067.jpg?v=1763480481&width=1100"
    },
    {
        id: 3,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/AC31D87A-38E4-49A7-89AD-247552F00F8A.jpg?v=1763479762&width=1100",
    },
    {
        id: 4,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/C9CC466F-0E7F-4EA0-990E-81E9D297FB65.jpg?v=1763479267&width=1100"
    },
    {
        id: 5,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/AC31D87A-38E4-49A7-89AD-247552F00F8A.jpg?v=1763479762&width=1100"
    },
    {
        id: 6,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/7129DE10-6FE7-48C8-B649-3794C5299158.jpg?v=1757178919&width=1100"
    },
    {
        id: 7,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/23829340-C2FC-4713-8B3F-62EEFA82C844.jpg?v=1757178775&width=1100"
    },
    {
        id: 8,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/DDACB487-46F0-4067-98FF-ADFC02888CB0.jpg?v=1757178480&width=1100"
    },
    {
        id: 9,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/D5C47F8B-BC3B-4BDB-83B2-07A02636E03B.jpg?v=1757179137&width=1100"
    },
    {
        id: 10,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/AC31D87A-38E4-49A7-89AD-247552F00F8A.jpg?v=1763479762&width=1100"
    }
];

const LatestMen = [
    { id: 1, name: "Cocoa Short V-neck Kurti", price: 779, imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100" },
    { id: 2, name: "Pizza", price: 779, imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100" },
    { id: 3, name: "Cocoa Short V-neck Kurti", price: 779, imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100" }
];

// ======== USERS (TEMPORARY IN-MEMORY DB) ========
let users = [];

// ======== PRODUCT ROUTES ========
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products_men', (req, res) => res.json(LatestMen));

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

// ======== SIGNUP ROUTE (email-based) ========
app.post('/api/signup', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    users.push({ email, username, password });

    res.status(201).json({ message: 'Account created successfully' });
});

// ======== LOGIN ROUTE (email + password) ========
app.post('/api/login', (req, res) => {

    app.use(express.json());  // REQUIRED

    app.post('/api/login', (req, res) => {
        console.log(req.body); // check what you're receiving
        const { email, password } = req.body;

        if (email === 'admin@gmail.com' && password === '123456') {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    });

    app.listen(5000, () => console.log("Server running"));

});

// ======== START SERVER ========
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


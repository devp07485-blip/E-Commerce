const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // allow cross-origin requests
app.use(express.json());

const products = [
    {
        id: 1,
        name: "Burger",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 2,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 3,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 4,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 5,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 6,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 7,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 8,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 9,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    },
    {
        id: 10,
        name: "Pizza",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100"
    }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


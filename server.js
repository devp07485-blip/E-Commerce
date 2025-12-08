const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const USERS_FILE = './users.json';

app.use(cors());
app.use(express.json());

// Helper to load users
let users = [];
if (fs.existsSync(USERS_FILE)) {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        console.error("Error reading users file:", err);
        users = [];
    }
}

// Helper to save users
function saveUsers() {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error("Error saving users file:", err);
    }
}

// MASTER PRODUCT LIST
const products = [
    {
        id: 1,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/4AD5EDD0-574C-478D-93AD-A05A524C6A50.jpg?v=1763480496&width=1100",
        image_2: "https://www.pehrin.com/cdn/shop/files/B8192212-6EEB-44D0-963A-53CDEB09F067.jpg?v=1763480481&width=1100",
        image_3: "https://www.pehrin.com/cdn/shop/files/84539791-B561-4437-A804-196BE395C8CA.jpg?v=1763480513&width=1100",
        image_4: "https://www.pehrin.com/cdn/shop/files/30432F6A-C5B3-4DD5-A8B8-B17B4B5E1D2F.jpg?v=1763561930&width=1100",
        description: "Soft cotton T-shirt."
    },
    {
        id: 2,
        name: "The Matcha Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/EB5E8CC7-C078-46CA-9AC8-C0F4C50465EC.jpg?v=1763479905&width=533",
        image_1: "https://www.pehrin.com/cdn/shop/files/B115F1DA-EEC2-4157-93DE-6DA77B381D62.jpg?v=1763479905&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/A4D022C7-49FD-4FBB-8FC4-EF80BFC2BC47.jpg?v=1763479905&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/620E511E-EFA1-4F0D-A799-3347BD9147DA.jpg?v=1763562034&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/5C57B44D-ECFB-4B38-8E6C-0535CAFE1326.jpg?v=1763478029&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 3,
        name: "Pebble Curve Short V-neckline Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/ED4F6E76-734F-4956-B23A-D85002AC80EE.jpg?v=1763480097&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/1632492F-5D0D-44D6-8E85-93F4A801B8FD.jpg?v=1763480097&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/5BACF555-CA27-4FDE-83FF-089E4B514EDE.jpg?v=1763480097&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/38447723-2AFA-4A5D-9259-32367A509F10.jpg?v=1763480097&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/1DA47BD4-4DA0-4C90-B363-A4B7DEF7AC92.jpg?v=1763561987&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 4,
        name: "Sunblush Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/AC31D87A-38E4-49A7-89AD-247552F00F8A.jpg?v=1763479762&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/1A8A7C98-590E-4F8E-BA41-13AEC17BB333.jpg?v=1763478395&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/7A0BCD35-03D9-4624-A983-E4DECA544216.jpg?v=1763479762&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/010FA4D9-56DB-410B-A292-0E89FB48870D.jpg?v=1763479762&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/A2E7C8D1-4232-4C27-9E5B-1BF8CEBD7865.jpg?v=1763479762&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 5,
        name: "Berry -Blush Short V-Neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6561B687-2598-4DBB-9528-4C5E729DEDCD.jpg?v=1763479530&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/91CB3682-D208-4CB7-BC16-07387F098047.jpg?v=1763479529&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/1F3C9325-3C68-4C89-A279-9873EED19A6D.jpg?v=1763479530&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/18261D4B-E887-4D0D-AF39-76BAB178D219.jpg?v=1763479529&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/517B5AB8-4234-465D-997C-8C12707CC0B0.jpg?v=1763479529&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 6,
        name: "Mulberry V-neck Short Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/C9CC466F-0E7F-4EA0-990E-81E9D297FB65.jpg?v=1763479267&width=713",
        image_1: "https://www.pehrin.com/cdn/shop/files/3445D118-37B7-4974-B7E3-2FE6AC8E4F7F.jpg?v=1763479265&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/90DFB65E-0CC3-4D8E-8EC3-60D7B9EFA8AD.jpg?v=1763479265&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/E7275997-34EB-4557-8023-DA701056CAA6.jpg?v=1763476783&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/8A111EE0-70D9-44CF-979E-FBEB89C163BE.jpg?v=1763479265&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 7,
        name: "Pebble Curve Straight Fit Collar Neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/22FB545A-0325-4EEE-9BA6-35CA8D1AEE29.jpg?v=1763478972&width=713",
        image_1: "https://www.pehrin.com/cdn/shop/files/E9DEFB50-1141-45D7-B680-A4015A615E87.jpg?v=1763478989&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/759915BA-FBAD-4BED-A6D3-B7802937BDE6.jpg?v=1763479005&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/C8D11959-EDFF-4140-B410-A9105FE51391.jpg?v=1763479019&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/2DEFDA0C-E17A-4E11-8283-47BB6DA5B2C4.jpg?v=1763479036&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 8,
        name: "Cocoa Straight Fit Collar- neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/6DC72FF2-5DBD-423D-9C27-00650F472F51.jpg?v=1763480464&width=1100",
        image_1: "https://www.pehrin.com/cdn/shop/files/92BD4744-1EBF-4F21-826D-9133E42D5E13.jpg?v=1763478714&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/E9BF9807-7E5A-4614-9899-BB01ED7A8A33.jpg?v=1763478731&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/F6016C07-1E51-4991-969E-764FEC09A1CE.jpg?v=1763478746&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/256730BF-0093-4760-987B-47175AC217B3.jpg?v=1763478778&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 9,
        name: "Sunblush Straight-Fit Collar -neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/FCDBFC94-84C0-437C-8ACF-90DA57123422.jpg?v=1763478358&width=713",
        image_1: "https://www.pehrin.com/cdn/shop/files/C2B37526-3F0F-450E-B7EC-2D2D29F04FD3.jpg?v=1763478372&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/1A8A7C98-590E-4F8E-BA41-13AEC17BB333.jpg?v=1763478395&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/7B5A7A24-29FB-48A4-A1FD-C2306A08B872.jpg?v=1763478302&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/C2B37526-3F0F-450E-B7EC-2D2D29F04FD3.jpg?v=1763478372&width=713",
        description: "Soft cotton T-shirt."
    },
    {
        id: 10,
        name: "The Matcha Straight Fit Collar-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/5C57B44D-ECFB-4B38-8E6C-0535CAFE1326.jpg?v=1763478029&width=713",
        image_1: "https://www.pehrin.com/cdn/shop/files/0AD63B3F-9624-45E7-B216-656D4560C823.jpg?v=1763478047&width=713",
        image_2: "https://www.pehrin.com/cdn/shop/files/599CECD6-1F88-41C6-B129-27F60BB5E350.jpg?v=1763478069&width=713",
        image_3: "https://www.pehrin.com/cdn/shop/files/CCD57B0F-7D20-42E6-9775-728F411D585A.jpg?v=1763478097&width=713",
        image_4: "https://www.pehrin.com/cdn/shop/files/620E511E-EFA1-4F0D-A799-3347BD9147DA.jpg?v=1763562034&width=713",
        description: "Soft cotton T-shirt."
    }
];

// MEN ARRAY YOU WANT TO SERVE
const products_men = [
    {
        id: 1,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100"
    },
    {
        id: 2,
        name: "Pizza_1",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100"
    },
    {
        id: 3,
        name: "Cocoa Short V-neck Kurti",
        price: 779,
        imageUrl: "https://www.pehrin.com/cdn/shop/files/652B85DB-A797-4BF2-8B87-6CDE0516F68C.jpg?v=1749617280&width=1100"
    }
];

// GET all women products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET all men products
app.get('/api/products_men', (req, res) => {
    res.json(products_men);
});

// PRODUCT DETAIL (women)
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

// PRODUCT DETAIL (men)
// Get men product by ID
app.get('/api/products_men/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products_men.find(p => p.id === id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
});


// SIGNUP
app.post('/api/signup', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
        return res.status(400).json({ message: "All fields are required" });

    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ message: "Email already exists" });

    users.push({ email, username, password });
    saveUsers(); // PERSIST TO FILE

    res.json({ message: "Account created successfully" });
});

// LOGIN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check against registered users
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.json({ message: "Login successful", username: user.username, email: user.email });
    }

    if (email === "admin@gmail.com" && password === "123456") {
        return res.json({ message: "Login successful", username: "Admin", email: "admin@gmail.com" });
    }

    res.status(401).json({ message: "Please Valid Username & Password Enter It" });
});

// START SERVER
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

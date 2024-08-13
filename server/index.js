// server/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory user store (for demo purposes)
const users = [];
const posts = [];

// Image upload setup
const upload = multer({ dest: 'uploads/' });

// User registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User registered');
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Create post
app.post('/posts', upload.single('image'), (req, res) => {
    const { content } = req.body;
    const image = req.file ? req.file.path : null;
    posts.push({ content, image });
    res.status(201).send('Post created');
});

// Get posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

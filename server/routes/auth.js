const express = require('express');
const router = express.Router();
const User = require('../models/User');

const Circle = require('../models/Circle'); // 确保模型存在

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 创建新圈子
router.post('/create', async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCircle = new Circle({ name, description });
        await newCircle.save();
        res.status(201).json(newCircle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

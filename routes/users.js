const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({message: err})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {s
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;
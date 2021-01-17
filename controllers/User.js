const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    authenticate: async (req, res, next) => {
        await User.findOne({email: req.body.email}, (err, userInfo) => {
            try {
                if (bcrypt.compareSync(req.body.password, userInfo.passwordHash)) {
                    const token = jwt.sign({id: userInfo._id, address: userInfo.email}, process.env.JWT_KEY, {expiresIn: '2h'});
                    res.json({token:token});
                } else res.status(404).json({status:"error", message: "Invalid email/password!"});
            } catch (err) {
                res.status(404).json({status:"error", message: "Invalid email/password!"});
            }
        })
    },

    getAll: async (req, res, next) => {
        const users = await User.find({}).select('-passwordHash');
        res.status(200).json(users);
    },

    createUser: async (req, res, next) => {
        console.log(req.body)
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    },

    updateUser: async (req, res, next) => {
        const { id } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(id, newUser);
        res.status(200).json(result);
    },

    deleteUser: async (req, res, next) => {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        res.status(200).json(result);
    }
}
const express = require("express");
const User = require("../models/User");
const router = require('express-promise-router')();

const UserController = require('../controllers/User')

//ALL
router.route('/')
    .get(UserController.getAll)
    .post(UserController.createUser);

//INDIVIDUAL
router.route('/:id')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser)

//AUTH
router.route('/login')
    .post(UserController.authenticate)


module.exports = router;

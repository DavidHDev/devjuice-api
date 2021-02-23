const express = require("express");
const User = require("../models/User");
const router = require("express-promise-router")();
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/User");
const Job = require("../controllers/Job");

const checkToken = function (req, res, next) {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (token) {
    token = token.replace(/^Bearer\s+/, "");
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ error: "Invalid Token/Expired" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      error: "Token not found!",
    });
  }
};

//ALL
router.route("/users").get(checkToken, UserController.getAll);

//INDIVIDUAL
router
  .route("/users/:id")
  .get(checkToken, UserController.getUser)
  .put(checkToken, UserController.updateUser)
  .patch(checkToken, UserController.updateUser)
  .delete(checkToken, UserController.deleteUser);

//AUTH
router.route("/login").post(UserController.authenticate);
router.route("/register").post(UserController.createUser);

//JOBS
router.route("/jobs")
  .get(Job.getAll);

module.exports = router;

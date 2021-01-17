const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv/config");

//TODO - ADD CORS PROTECTION
app.use(cors());
app.use(bodyParser.json());


//USERS
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

//Connect to DB
mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected");
  }
);

//START SERVER
app.listen(process.env.PORT || 3000);

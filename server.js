require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

let corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
  }
  

app.use(cors())
app.use(bodyParser.json());

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);


//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true , useNewUrlParser: true},
  () => {
    console.log("Connected");
  }
);

//EXPOSE
app.listen(3000);

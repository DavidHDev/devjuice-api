const express = require("express");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv/config");

//TODO - ADD CORS PROTECTION
app.use(cors());
app.use(bodyParser.json());

//USERS
const routes = require("./routes");
app.use("/api", routes); //Main entry point

//Connect to DB
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected");
  }
);

//START SERVER
app.listen(process.env.PORT || 3000);

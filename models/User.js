const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  userDetails: {
    _id: false,
    type: {
        name: String,
        jobTitle: String,
    },
  },
});

UserSchema.pre('save', async function(next){
    console.log(this.passwordHash)
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    next();
});

module.exports = mongoose.model("User", UserSchema);
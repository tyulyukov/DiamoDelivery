const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    email: String,
    phoneNumber: String,
    fullName: String,
    passwordHash: String,
    isEmailVerified: Boolean,
});

module.exports = mongoose.model("User", user)
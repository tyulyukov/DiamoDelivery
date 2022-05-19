const mongoose = require("mongoose")
const Schema = mongoose.Schema

const company = new Schema({
    name: String,
    imageUrl: String,
    foodMenu: [{name: String, imageUrl: String, price: Number}],
})

module.exports = mongoose.model("Company", company)
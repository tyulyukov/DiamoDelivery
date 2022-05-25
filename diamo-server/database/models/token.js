const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const token = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});

module.exports = mongoose.model("Token", token)
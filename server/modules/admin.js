var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema(
    {
    "username":String,
    "realname":String,
    "password":String,
    "status":String
    }
    );

module.exports = mongoose.model("Admins",adminSchema);


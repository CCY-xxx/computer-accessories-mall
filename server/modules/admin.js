var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema(
    {
    "username":String,
    "realname":String,
    "password":String,
    "phone":String,
    "sex":String,
    "createTime":String,
    "age":String,
    "status":String
    }
    );

module.exports = mongoose.model("Admins",adminSchema);


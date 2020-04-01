var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var noticeSchema = new Schema({
    "createPerson":String,
    "updatePerson":String,
    "noticeId":String,
    "info":String,
    "createTime":String,
    "updateTime":String,
    "other":String,
    "isShow":Boolean
});

module.exports = mongoose.model('Notices',noticeSchema);

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "brand" : {type:String},
  "brandd" : String,
  "brandId" :String,
  "productId" :String,
  "title" : String,
  "price" : Number,
  "from":String,
  "productImage" : String,
  "checked":String,
  "productNum":Number,
  "isPush":Boolean,
  "createTime":String,
  "updateTime":String,
  "saleNum":Number
});

module.exports = mongoose.model('Products',produtSchema);

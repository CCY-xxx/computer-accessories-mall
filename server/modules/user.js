var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":[
    {
      "orderId" : String,
      "orderTotal" : Number,
      "addressInfo" : Object,
      "goodsList" : [ 
          {
              "brand" : String,
              "brandd" : String,
              "brandId" : String,
              "productId" : String,
              "title" : String,
              "price" : Number,
              "from" : String,
              "productImage" : String,
              "productNum" : Number,
              "checked" : String,
              "isPush":Boolean,
              "createTime":String,
              "updateTime":String,
              "saleNum":Number
          } 
      ],
      "orderStatus" : String,
      "createDate" : String
  }],
  "cartList":[
    {   
    "brand" : String,
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
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "province":String,
      "city":String,
      "area":String,
      "streetName": String,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
});

module.exports = mongoose.model("Users",userSchema);

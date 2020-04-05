var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "nickName":String,
  "phone":String,
  "remark":String,
  "age":String,
  "sex":String,
  "birth":String,
  "headUrl":String,
  "orderList":[
    {
      "orderId" : String,
      "orderTotal" : Number,
      "addressInfo" : Object,
      "isEvaluate":Boolean,
      "goodsList" : [ 
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
            "isUpStage":Boolean,
            "isPush":Boolean,
            "createTime":String,
            "updateTime":String,
            "saleNum":Number,
            "overstock":Number,
            "isDelete":Boolean,
              "evaluate":[
                {
                  "userName": String,
                  "createTime":String,
                  "infoStr":String,
                  "orther":String,
                  "phone":String
                }
              ],
              "goodEvaluate":Number,
              "badEvaluate":Number,
              "isEvaluate":Boolean

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
    "isUpStage":Boolean,
    "checked":String,
    "productNum":Number,
    "saleNum":Number,
    "evaluate":[
      {
        "userName": String,
        "createTime":String,
        "infoStr":String,
        "orther":String,
        "phone":String
      }
    ],
    "goodEvaluate":Number,
    "badEvaluate":Number,
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

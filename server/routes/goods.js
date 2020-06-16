var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../modules/goods');
var User = require('../modules/user');
mongoose.Promise = global.Promise;
//连接MongoDB数据库
// mongoose.connect('mongodb://127.0.0.1:27017/dumall');
mongoose.connect("mongodb://127.0.0.1:27017/peijians",{useNewUrlParser: true});
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

//查询商品列表数据
router.get("/list", function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let saleSort = req.param("saleSort");
  let dateSort = req.param("dateSort");
  let sortType = req.param("sortType");
  let skip = (page-1)*pageSize;
  var priceGt = '',priceLte = '';
  let params = {
    isUpStage:true,
  };
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
     price:{
          $gt:priceGt,
          $lte:priceLte
      },
       isUpStage:true,

    }
    console.log(params)
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  if(sortType=='3'){
    goodsModel.sort({'createTime':dateSort})
  }else{
    sortType==1?goodsModel.sort({'price':sort}):goodsModel.sort({'saleNum':saleSort});
  }
  
  goodsModel.exec(function (err,doc) {
      if(err){
          res.json({
            status:'1',
            msg:err.message
          });
      }else{
          res.json({
              status:'0',
              msg:'',
              result:{
                  count:doc.length,
                  list:doc
              }
          });
      }
  })
});

//模糊查询
router.get('/search', function (req, res) {
  let keyword=req.param("keyword")
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let saleSort = req.param("saleSort");
  let dateSort = req.param("dateSort");
  let sortType = req.param("sortType");
  // let skip = (page-1)*pageSize;
  var priceGt = '',priceLte = '';
  // let params = {
  //   isUpStage:true,

  // };
  console.log(keyword)
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
     price:{
          $gt:priceGt,
          $lte:priceLte
      },
    isUpStage:true,

    }
    console.log(params)
  }
  console.log(keyword)
  var reg = new RegExp(keyword,'i')//利用正则处理搜索字符串
  var limit = pageSize
  let goodsModel =Goods.find( { $or: [
      { title: { $regex: reg } },
      { brand: { $regex: reg } },
      // {isUpStage:true }
  ]}).limit(limit)
  if(sortType=='3'){
    goodsModel.sort({'createTime':dateSort})
  }else{
    sortType=='1'?goodsModel.sort({'price':sort}):goodsModel.sort({'saleNum':saleSort});
  }

  goodsModel.exec(function (err,doc) {
    if(err){
        res.json({
          status:'1',
          msg:err.message
        });
    }else{
      console.log(doc)
      console.log('doc')
      if(doc.length!=0){
        res.json({
          status:'0',
          msg:'',
          result:{
              count:doc.length,
              list:doc.filter(item=>{
               return item.isUpStage
              })
          }
      });
      }else{
        res.json({
          status:'1',
          msg:'无数据',
          result:{
            count:doc.length
        }
        });
      }
       
    }
})
})

//加入到购物车
router.post("/addCart", function (req,res,next) {
  var userId =req.cookies.userId,_id = req.body._id;
 
  console.log(userId)
  User.findOne({userId:userId},(err,userDoc)=> {
      console.log(err)
    if(err||null){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        console.log("userDoc:"+userDoc);
        if(userDoc){
          var goodsItem = '';
          userDoc.cartList.forEach(function (item) {
              if(item._id == _id){
                goodsItem = item;
                item.productNum ++;
              }
          });
          if(goodsItem){
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"13434",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }else{
            console.log(_id)
            Goods.findOne({_id:_id}, function (err1,doc) {
              // console.log(doc)
              console.log('_________________________')
              if(err1){
                res.json({
                  status:"1",
                  msg:err1.message
                })
              }else{
                if(doc){
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2,doc2) {
                    if(err2){
                      res.json({
                        status:"1",
                        msg:err2.message
                      })
                    }else{
                      res.json({
                        status:'0',
                        msg:'',
                        result:'suc'
                      })
                    }
                  })
                }
              }
            });
          }
        }
    }
  })
});

module.exports = router;

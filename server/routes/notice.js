var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ObjectID = mongoose.Types.ObjectId;
var Notices = require('./../modules/notices');

//查询公告列表数据
router.get("/noticeList", function (req,res,next) {
  Notices.find((err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
      return
    }
    //过滤需要显示的公告
    let docArr=[]
    doc.map(item=>{
      if(item.isShow){
        docArr.push(item)
      }
    })
    res.json({
      status: "0",
      msg: "",
      result: docArr
    });
  })
  });
  
  module.exports = router;
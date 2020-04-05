var express = require('express');
var router = express.Router();
require('./../util/util')
const fs = require('fs')
const path = require('path')
const request = require('request')
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default
var mongoose = require('mongoose');
var ObjectID = mongoose.Types.ObjectId;
var User = require('./../modules/user');
var Goods = require('./../modules/goods');

router.use(function (req, res, next) {
  if (req.cookies.userId) {
    next();
  } else {
    // console.log("url:"+req.url);  req.url和req.originalUrl是一样的
    console.log("url:" + req.originalUrl);
    if (
      req.originalUrl == '/users/login' 
      || req.originalUrl == '/users/logout' 
      || req.originalUrl == '/users/userCheck' 
      || req.originalUrl == '/users/register' 
      || req.originalUrl.indexOf('/goods/list') > -1
      ) {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function (req, res, next) {
  res.send('test');
});

//检测用户名是否重复
router.post('/userCheck', (req, res) => {
  let userName = req.body.userName
  console.log(userName)
  User.findOne({ userName }, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: '用户名已存在'
        })
      }
    }

  })
})
//注册
router.post("/register", function (req, res) {
  let { userId, userName, userPwd } = req.body
  let newUser = new User({
    userId,
    userName,
    userPwd,
    phone:'',
    remark:'',
    age:'',
    sex:'',
    birth:'',
    headUrl:'',
    nickName:''
  })

  newUser.save(function (err, doc) {

    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
    
        // req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      }
    }
  })
})
//登录
router.post("/login", function (req, res, next) {
  //邮箱登录
  // console.log(req.body.userId)
  // console.log(req.body.userName)
  if (req.body.userId !== undefined) {
    var param = {
      userId: req.body.userId,
      userPwd: req.body.userPwd
    }
  } else {
    //用户名登录
    var param = {
      userName: req.body.userName,
      userPwd: req.body.userPwd
    }
  }
  // console.log(param)

  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      });
    } else {
      if (doc) {
        console.log(ObjectID(doc._id))
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("nickName", doc.nickName||'', {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //req.session.user = doc;
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      }
    }
  });
});
//修改密码
router.post('/updatePwd', (req, res) => {

  var oldPwd = req.body.oldPwd
  var newPwd = req.body.newPwd
  console.log(oldPwd)
  var param = {
    userPwd: oldPwd
  }
  User.findOne(param, (err, data) => {
    console.log(err)
    console.log(data)
    if (data == null) {
      res.json({
        status: "1",
        msg: 'error'
      });
    } else {
      User.updateOne(param, { userPwd: newPwd }, (err2, doc) => {
        console.log('uuuu')
        if (err2) {
          res.json({
            status: "1",
            msg: err2
          });
        } else {
          res.json({
            status: '0',
            result: 'suc'
          })
        }
      });
    }
  })


})
//查看个人资料
router.get('/findUserInfo', (req, res) => {

  // var oldPwd = req.body.oldPwd
  // var newPwd = req.body.newPwd
  var param = {
    userId: req.cookies.userId
  }
  User.findOne(param, (err, data) => {
    // console.log(err)
    console.log(data)
    if (data == null) {
      res.json({
        status: "1",
        msg: 'error'
      });
    } else {
      res.json({
        status: "0",
        result:data
      });
    }
  })


})
//修改个人资料
router.post('/updateUserInfo', (req, res) => {

  var userId = req.cookies.userId,
  phone = req.body.phone,
  age = req.body.age,
  sex = req.body.sex,
  birth = req.body.birth,
  headUrl = req.body.headUrl,
  birth = req.body.birth,
  remark = req.body.remark;
  nickName = req.body.nickName;

  var param = {
    userId: req.cookies.userId
  }
  User.findOne(param, (err, data) => {
    // console.log(err)
    console.log(data)
    if (data == null) {
      res.json({
        status: "1",
        msg: 'error'
      });
    } else {
     let setData={
      phone,
      age,
      sex,
      birth,
      headUrl,
      remark,
      nickName
     }
      User.updateOne(param, setData, (err2, doc) => {
        console.log('uuuu')
        if (err2) {
          res.json({
            status: "1",
            msg: err2
          });
        } else {
          res.cookie("nickName", nickName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          });
          res.json({
            status: '0',
            result: 'suc'
          })
        }
      });
    }
  })


})

//登出接口
router.post("/logout", function (req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: -1
  });
  res.cookie("nickName", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: '',
    result: ''
  })
});

//检测是否已登录
router.get("/checkLogin", function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    });
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
});

//获取购物车商品数量
router.get("/getCartCount", function (req, res, next) {
  if (req.cookies && req.cookies.userId) {
    console.log("userId:" + req.cookies.userId);
    var userId = req.cookies.userId;
    User.findOne({ "userId": userId }, function (err, doc) {
      if (err) {
        res.json({
          status: "1",
          msg: err.message
        });
      } else {
        // console.log('doc.cartList')
        // console.log(doc.cartList!='null')
        // console.log(doc)

        if (doc.cartList != 'null') {
          let cartList = doc.cartList;
          let cartCount = 0;
          cartList.map(function (item) {
            cartCount += parseFloat(item.productNum);
          });
          res.json({
            status: "0",
            msg: "",
            result: cartCount
          });
        } else {
          res.json({
            status: "0",
            msg: "当前用户不存在"
          });
        }

      }
    });
  }
});

//获取订单数量
// router.get("/getOrderCount", function (req, res, next) {
//   if (req.cookies && req.cookies.userId) {
//     console.log("userId:" + req.cookies.userId);
//     var userId = req.cookies.userId;
//     User.findOne({ "userId": userId }, function (err, doc) {
//       if (err) {
//         res.json({  
//           status: "1",
//           msg: err.message
//         });
//       } else {
//         // console.log('doc.cartList')
//         // console.log(doc.cartList!='null')
//         // console.log(doc)
//         // console.log(doc.orderList[0])
//         if(doc.orderList){
//           let orderList = doc.orderList;
//           var goodCount = 0;
//           orderList.map((item)=> {
//             item.goodsList.map((good)=>{

//                 goodCount += parseFloat(good.productNum);

//             })

//           });
//           res.json({
//             status: "0",
//             msg: "",
//             result: goodCount
//           });
//         }else{
//           res.json({
//             status: "0",
//             msg: "当前用户不存在"
//           });
//         }

//       }
//     });
//   } 
// });
//查询当前用户的购物车数据
router.get("/cartList", function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        });
      }
    }
  });
});

//购物车删除
router.post("/cartDel", function (req, res, next) {
  var userId = req.cookies.userId, _id = req.body._id;
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        '_id': _id
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

//修改商品数量
router.post("/cartEdit", function (req, res, next) {
  var userId = req.cookies.userId,
    _id = req.body._id,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({ "userId": userId, "cartList._id": _id }, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
router.post("/editCheckAll", function (req, res, next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll ? '1' : '0';
  User.findOne({ userId: userId }, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll;
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            });
          }
        })
      }
    }
  });
});
//添加用户地址接口
router.post('/addAddress', function (req, res) {
  var userId = req.cookies.userId
  let {
    addressId,
    userName,
    streetName,
    province,
    city,
    area,
    tel,
    isDefault
  } = req.body
  User.findOne({ userId: userId }, function (err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      console.log("userDoc:" + userDoc);
      if (userDoc) {
        let doc = {
          "addressId": addressId,
          "userName": userName,
          "streetName": streetName,
          "province": province,
          "city": city,
          "area": area,
          "tel": tel,
          "isDefault": isDefault
        }
        userDoc.addressList.push(doc)
        userDoc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: "1",
              msg: err2.message
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: doc2
            })
          }
        })
      }
    }
  })
})
//查询用户地址接口
router.get("/addressList", function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList
      });
    }
  })
});
//设置默认地址接口
router.post("/setDefault", function (req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    });
  } else {
    User.findOne({ userId: userId }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        });
      } else {
        var addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });

        doc.save(function (err1, doc1) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            });
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            });
          }
        })
      }
    });
  }
});

//删除地址接口
router.post("/delAddress", function (req, res, next) {
  var userId = req.cookies.userId, addressId = req.body.addressId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      });
    }
  });
});

//支付宝支付接口并创建订单保存到数据库
//未使用
router.post('/alipay', (req, res) => {
  //构造订单号
  var platform = '622';//订单号前缀
  var r1 = Math.floor(Math.random() * 10);
  var r2 = Math.floor(Math.random() * 10);

  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var orderId = platform + r1 + sysDate + r2;//生成订单号
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
  User.findOne({ userId: userId }, async (err, doc) => {

    if (err) {
      res.json({
        status: "1",
        msg: err.message,
        result: ''
      });
    } else {
      var address = '', goodsList = [];
      //获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (addressId == item.addressId) {
          address = item;
        }
      })
      //获取用户购物车的购买商品
      doc.cartList.filter((item) => {
        if (item.checked == '1') {
          goodsList.push(item);
        }
      });

      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')//获取创建订单时间
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      };
      //将新订单导入订单列表
      doc.orderList.push(order);

      //支付宝测试环境--沙箱环境
      const alipaySdk = new AlipaySdk({
        appId: '2016101300679883',//需要对应的沙箱环境的app_id，正式环境是自己的支付宝app_id  (此处属性名都改成了驼峰命名)
        //注意要引入fs,fs.readFileSync(路径，指定编码格式，callback)
        privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
        signType: 'RSA2',//注意签名类型RSA2还是RSA
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
        gateway: 'https://openapi.alipaydev.com/gateway.do',//沙箱环境提供的测试网关，正式网关与之不同
        timeout: 5000,//过期时间
        camelcase: true
      });


      //返回支付链接（pc接口）
      const formData = new AlipayFormData();
      //调用setMethod,并传入get ,会返回可以跳转到支付页面的url
      formData.setMethod('get')
      //支付宝服务器主动通知商户服务器里指定的页面http/https路径
      //formData.addField('notifyUrl', 'http://www.com/notify')
      formData.addField('appId', '2016101300679883')//此时的appId是沙箱环境的app_id

      formData.addField('charset', 'utf-8')
      formData.addField('signType', 'RSA2')
      formData.addField('bizContent', {
        outTradeNo: orderId,//必选，商户订单号，64个字符以内，可包含字母、数字、下划线；需保证在商户端不重复
        productCode: 'FAST_INSTANT_TRADE_PAY',//必选，销售产品码，与支付宝签约的产品码名称，注：目前只支持FAST_INSTANT_TRADE_PAY
        totalAmount: orderTotal,//必选，订单总金额，单位为元，精确到小数点后两位
        subject: '商品名称',//必选，订单标题
        body: '商品详情'//可选，订单描述  
      });
      // formData.addField('returnUrl', 'http://127.0.0.1:8989');
      formData.addField('returnUrl', 'http://127.0.0.1:8989/#/orderSuccess?orderId=' + orderId);
      //exec对应参数:methods (调用的支付宝Api),params (Api的请求参数(包含 "公共请求参数"和 "业务参数")，options (validateSign、formData、log))
      var result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData }
      )

      //result为可以跳转到支付链接的url
      console.log(result)


      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: err.message,
            result: ''
          });
        } else {
          res.json({
            status: "0",
            msg: '',
            result
          });
        }
      });
    }
  })
})

//支付宝订单查询接口
router.get('/tradeNo/:tradeNo', async (req, res) => {
  let outTradeNo = req.params.tradeNo//前台传过来的trdeNo是订单号
  var userId = req.cookies.userId

  console.log(outTradeNo)
  if (!outTradeNo) {
    return res.json({
      status: '-1',
      info: '支付查询需要订单号'
    })
  }
  const alipaySdk = new AlipaySdk({
    appId: '2016101300679883',
    privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
    signType: 'RSA2',
    alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    timeout: 5000,
    camelcase: true
  });

  const formData = new AlipayFormData();
  formData.setMethod('get')
  formData.addField('appId', '2016101300679883')
  formData.addField('charset', 'utf-8')
  formData.addField('signType', 'RSA2')
  formData.addField('bizContent', {
    outTradeNo: outTradeNo
  });
  await alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData }
  ).then(result => {
    // console.log(result)
    if (result) {
      request(result, function (error, response, body) {
        console.log(body)
        let obj = JSON.parse(body)
        // let msg=getResponseMsg(obj)
        // console.log('[alipay.trade.query--msg]===>',msg)
        console.log('[alipay.trade.query]===>', obj)
        if (!error && response.statusCode == 200) {

          var code = obj.alipay_trade_query_response.code
          if (code == '10000') {
            User.update({ "userId": userId, "orderList.orderId": outTradeNo }, {
              "orderList.$.orderStatus": '1'

            }, (err, doc) => {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message,
                  result: ''
                });
              } else {

                res.json({
                  status: '0',
                  msg: '',
                  code
                });
              }
            })
          } else {
            return res.json({
              status: -1,
              info: '支付查询失败',
              code: code
            })
          }


        } else {
          return res.json({
            status: -1,
            info: `支付查询失败_2：${error}`
          })
        }
      })
    } else {
      return res.json({
        status: -1,
        info: `支付查询失败_1:${result}`
      })
    }
  }).catch(err => {
    return res.json({
      status: -1,
      info: `支付查询失败:${err} `
    })
  })

})

//保存订单接口
router.post("/saveOrder", function (req, res, next) {
  var userId = req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      console.log("21211111111")

      res.json({
        status: "1",
        msg: err.message,
        result: ''
      });

      return
    } 
      var address = '', goodsList = [];
      //获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (addressId == item.addressId) {
          address = item;
        }
      })
      //获取用户购物车的购买商品
      doc.cartList.filter((item) => {
        if (item.checked == '1') {
          goodsList.push(item);
        }
      });

      var platform = '622';
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);

      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var orderId = platform + r1 + sysDate + r2;
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '0',
        createDate: createDate
      };

      doc.orderList.push(order);

      doc.save(function (err1, doc1) {
        if (err1) {
          console.log("555555555555")

          res.json({
            status: "1",
            msg: err1.message,
            result: ''
          });
          return
        } 
        //处理销量问题
          goodsList.map((item)=>{
            Goods.findOne({ "productId": item.productId },(errMsg,goodDoc)=>{
              console.log(goodDoc)
              Goods.update({ "productId": item.productId }, {
                "saleNum": item.productNum+goodDoc.saleNum,
                "overstock": goodDoc.overstock-item.productNum,
              },(err,doc2)=>{
                if(err){
                console.log("8888888888888")

                  res.json({
                    status: "1",
                    msg:err.message,
                    result: ''
                  });
                  return
                }
                console.log("342343")
                 
              })
            },
            
            )
         
          })
          res.json({
            status: "0",
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          });
      
      });
    
  })

});
//支付宝付款
router.post("/pay", async (req, res, next) => {
  var userId = req.cookies.userId,
    orderId = req.body.orderId;
  orderTotal = req.body.orderTotal;

  const alipaySdk = new AlipaySdk({
    appId: '2016101300679883',
    privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
    signType: 'RSA2',
    alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    timeout: 5000,
    camelcase: true
  });

  const formData = new AlipayFormData();
  formData.setMethod('get')
  formData.addField('appId', '2016101300679883')
  formData.addField('charset', 'utf-8')
  formData.addField('signType', 'RSA2')
  formData.addField('bizContent', {
    outTradeNo: orderId,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: orderTotal,
    subject: '商品名称',
    body: '商品详情'
  });

  // formData.addField('returnUrl', 'http://127.0.0.1:8989');
  formData.addField('returnUrl', 'http://127.0.0.1:8989/#/orderSuccess?orderId=' + orderId);
  var result = await alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData }
  )


  console.log(formData)
  console.log(result)

  res.json({
    status: '0',
    msg: '',
    result: result
  });
})

//支付宝支付接口并创建订单保存到数据库
// router.post("/payMent", function (req, res, next) {
//   var userId = req.cookies.userId,
//     addressId = req.body.addressId,
//     orderTotal = req.body.orderTotal;
//   User.findOne({ userId: userId }, function (err, doc) {
//     if (err) {
//       res.json({
//         status: "1",
//         msg: err.message,
//         result: ''
//       });
//     } else {
//       var address = '', goodsList = [];
//       //获取当前用户的地址信息
//       doc.addressList.forEach((item) => {
//         if (addressId == item.addressId) {
//           address = item;
//         }
//       })
//       //获取用户购物车的购买商品
//       doc.cartList.filter((item) => {
//         if (item.checked == '1') {
//           goodsList.push(item);
//         }
//       });

//       var platform = '622';
//       var r1 = Math.floor(Math.random() * 10);
//       var r2 = Math.floor(Math.random() * 10);

//       var sysDate = new Date().Format('yyyyMMddhhmmss');
//       var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
//       var orderId = platform + r1 + sysDate + r2;
//       var order = {
//         orderId: orderId,
//         orderTotal: orderTotal,
//         addressInfo: address,
//         goodsList: goodsList,
//         orderStatus: '1',
//         createDate: createDate
//       };

//       doc.orderList.push(order);

//       doc.save(function (err1, doc1) {
//         if (err1) {
//           res.json({
//             status: "1",
//             msg: err.message,
//             result: ''
//           });
//         } else {
//           res.json({
//             status: "0",
//             msg: '',
//             result: {
//               orderId: order.orderId,
//               orderTotal: order.orderTotal
//             }
//           });
//         }
//       });
//     }
//   })
// });

//查询历史订单
router.get("/orderList", function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({ userId: userId }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      // console.log(doc.orderList)
      // console.log("-------")

      doc.orderList.reverse()//将订单顺序用reverse()方法翻转--既是按最近时间排序
      // console.log(doc.orderList)
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.orderList
        });
      }
    }
  });
});

//删除订单
router.post("/orderDel", function (req, res, next) {
  var userId = req.cookies.userId, orderId = req.body.orderId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'orderList': {
        'orderId': orderId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  });
});

//根据订单Id查询订单信息
router.get("/orderDetail", function (req, res, next) {
  var userId = req.cookies.userId, orderId = req.param("orderId");
  User.findOne({ userId: userId }, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      var orderList = userInfo.orderList;
      if (orderList.length > 0) {
        var order
        orderList.forEach((item) => {
          if (item.orderId == orderId) {
            order = item
          }
        });
        if (order) {
          res.json({
            status: '0',
            msg: '',
            result: order
          })
        } else {
          res.json({
            status: '120002',
            msg: '无此订单',
            result: ''
          });
        }
      } else {
        res.json({
          status: '120001',
          msg: '当前用户未创建订单',
          result: ''
        });
      }
    }
  })
});

//修改订单商品数量
router.post("/orderEdit", function (req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,

    orderId = req.body.orderId,
    productNum = req.body.productNum;

  User.find({ "userId": userId }, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      doc[0].orderList.forEach((doc2) => {
        if (doc2.orderId == orderId) {
      
          doc2.goodsList.forEach((good) => {

            if (good.productId == productId) {
              // console.log(good)
              good.productNum = productNum
            }
          })
        }
      })
      doc[0].save((err, doc3) => {
        if (err) {
          res.json({
            status: '1',
            msg: err
          })

        } else {
          res.json({
            status: '0',
            result: doc3
          })
        }
      })
    }


  })


});
//订单评价功能
router.post("/evaluate", function (req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,

    orderId = req.body.orderId,
    evaluate = req.body.evaluate,
    goodEvaluate = req.body.goodEvaluate,
    userName = req.body.userName;
// console.log(evaluate)
// console.log(goodEvaluate)
// console.log(productId)
        var good=0
        var bad=0
  User.find({ "userId": userId }, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      doc[0].orderList.forEach((doc2) => {
        if (doc2.orderId == orderId) {
      
          doc2.goodsList.forEach((good) => {
         
            if (good.productId == productId) {
              console.log(good)
              // good.evaluate.infoStr = evaluate//这样做有问题，无法将数据存档
              good.isEvaluate=true
              if(goodEvaluate=='true'){
                good.goodEvaluate = 1
              }else{
                good.badEvaluate = 1
              }
            
            }
          })
        }
      })
      doc[0].save((err, doc3) => {
        if (err) {
          res.json({
            status: '1',
            msg: err
          })

        } else {

          Goods.findOne({ "productId": productId },(errMsg,goodDoc)=>{
            if (errMsg) {
              res.json({
                status: "1000",
                msg: errMsg.message
              })
            } else {
              console.log("goodDoc:" + goodDoc);
              if (goodDoc) {
                let doc = {
                  "userName":userName,
                  "createTime":new Date().Format("yyyy-MM-dd hh:mm:ss"),
                  "infoStr":evaluate,
                  "orther":goodEvaluate=='true'?'1':'2',
                  "phone":''
                }
                goodDoc.evaluate.push(doc)
                goodDoc.save(function (err5, doc5) {
                  if (err5) {
                    res.json({
                      status: "16666",
                      msg: err5.message
                    })
                    return
                  }
                  console.log(goodEvaluate)

                  if(goodEvaluate=='true'){
                    // good.goodEvaluate = 1
                    good=1
                  }else{
                    // good.badEvaluate = 1
                     bad=1
                  }
                  Goods.update({ "productId": productId }, {
                    "goodEvaluate": parseInt(goodDoc.goodEvaluate+good),
                    "badEvaluate": parseInt(goodDoc.badEvaluate+bad),
                  },(err,doc2)=>{
                    if(err){
                      res.json({
                        status: "1",
                        msg:err.message,
                        result: ''
                      });
                      return
                    }
                    console.log("342343")
                    res.json({
                      status: '0',
                      result: doc3
                    })
                
                
                  })
                })
              }
            }
 
       
          })

          // res.json({
          //   status: '0',
          //   result: doc3
          // })
        }
      })
    }


  })


});

//删除订单商品
router.post("/delProduct", function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId, orderId = req.body.orderId;
  User.find({ "userId": userId }, (err, doc) => {
    if (err) {
      res.json({
        status: '1'
      })
    } else {
      doc[0].orderList.forEach((doc2) => {
        if (doc2.orderId == orderId) {
          // console.log(doc2)
          // console.log('_______________')
          // console.log(doc2.goodsList)
          // console.log(doc2.goodsList.length)
          doc2.goodsList.forEach((good, index) => {

            if (doc2.goodsList[index].productId == productId) {
              // console.log(doc2.goodsList[index])
              doc2.goodsList.splice(index, 1)
            }
          })
        }
      })
      doc[0].save((err, doc3) => {
        if (err) {
          res.json({
            status: '1',
            msg: err
          })

        } else {
          res.json({
            status: '0',
            result: doc3
          })
        }
      })
    }


  })
});

//更新订单总价
router.post("/uptateTotal", function (req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.body.orderId;
  orderTotal = req.body.orderTotal;
  User.update({ "userId": userId, "orderList.orderId": orderId }, {
    "orderList.$.orderTotal": orderTotal
    // "cartList.$.checked": checked,
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
//用户更新订单状态(已收货)
router.post("/uptateStatus", function (req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.body.orderId;
  User.update({ "userId": userId, "orderList.orderId": orderId }, {
    "orderList.$.orderStatus": '3' //已收货
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
//2019-10-17 20:04:41搞定此功能，费尽九牛二虎之力将此功能实现
///aginOrder1 完善前的
//再来一单接口：开发中：订单号以及订单创建时间改变并覆盖原订单（原本想实现增加新订单而不会覆盖原订单，原订单还在）
router.post("/aginOrder1", function (req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.body.orderId;
  orderTotal = req.body.orderTotal;
  var platform = '622';
  var r1 = Math.floor(Math.random() * 10);
  var r2 = Math.floor(Math.random() * 10);

  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var newOrderId = platform + r1 + sysDate + r2;
  var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

  User.update({ "userId": userId, "orderList.orderId": orderId }, {
    "orderList.$.orderId": newOrderId,
    "orderList.$.createDate": createDate,

  }, async (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      console.log(doc)
      const alipaySdk = new AlipaySdk({
        appId: '2016101300679883',
        privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
        signType: 'RSA2',
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
        gateway: 'https://openapi.alipaydev.com/gateway.do',
        timeout: 5000,
        camelcase: true
      });

      const formData = new AlipayFormData();
      formData.setMethod('get')
      formData.addField('appId', '2016101300679883')
      formData.addField('charset', 'utf-8')
      formData.addField('signType', 'RSA2')
      formData.addField('bizContent', {
        outTradeNo: newOrderId,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: orderTotal,
        subject: '商品名称',
        body: '商品详情'
      });

      // formData.addField('returnUrl', 'http://127.0.0.1:8989');
      formData.addField('returnUrl', 'http://127.0.0.1:8989/#/orderSuccess?orderId=' + newOrderId);
      var result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData }
      )
      // console.log(formData)
      console.log(result)

      res.json({
        status: '0',
        msg: '',
        result: result
      });

    }
  })

})

//再来一单接口（完善后的）
router.post("/aginOrder", function (req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.body.orderId;
  orderTotal = req.body.orderTotal;
  var platform = '622';
  var r1 = Math.floor(Math.random() * 10);
  var r2 = Math.floor(Math.random() * 10);

  var sysDate = new Date().Format('yyyyMMddhhmmss');
  var newOrderId = platform + r1 + sysDate + r2;
  var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
  User.find({ "userId": userId }, async(err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err
      })
    } else {

      const alipaySdk = new AlipaySdk({
        appId: '2016101300679883',
        privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
        signType: 'RSA2',
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
        gateway: 'https://openapi.alipaydev.com/gateway.do',
        timeout: 5000,
        camelcase: true
      });

      const formData = new AlipayFormData();
      formData.setMethod('get')
      formData.addField('appId', '2016101300679883')
      formData.addField('charset', 'utf-8')
      formData.addField('signType', 'RSA2')
      formData.addField('bizContent', {
        outTradeNo: newOrderId,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: orderTotal,
        subject: '商品名称',
        body: '商品详情'
      });

      // formData.addField('returnUrl', 'http://127.0.0.1:8989');
      formData.addField('returnUrl', 'http://127.0.0.1:8989/#/orderSuccess?orderId=' + newOrderId);
      var result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData }
      )

      var address = '', goodsList = [];
    
      doc[0].orderList.forEach((order) => {
        if (order.orderId == orderId) {
           //获取当前用户订单的地址信息
          address = order.addressInfo

            //获取当前用户订单中购买的商品
          order.goodsList.filter((item) => {

            goodsList.push(item);

          });
         
        }
      })
      //重新构造一个order，注意字段要与model一致
      var order = {
        orderId: newOrderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '0',
        createDate: createDate
      };
      //将新订单导入当前用户订单列表
      doc[0].orderList.push(order)
      //保存到数据库
      doc[0].save((err, doc2) => {
        if (err) {
          res.json({
            status: '1',
            msg: err
            
          });
        } else {
          res.json({
            status: '1',
            msg: err,
            result
          });
        }

      })

    }
  })

})
module.exports = router;

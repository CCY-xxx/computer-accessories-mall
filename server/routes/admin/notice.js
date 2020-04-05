
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var multiparty = require('multiparty'); 
var DB=require('../../modules/db.js');  /*引入DB数据库*/
//查询所有公告
router.get('/',function(req,res){
    //res.send('显示公告首页');
    var pager = {};//构造一个分页对象用来存关于分页的一些数据
    pager.pagePath = '/admin/notice?';//分页路径
    pager.pageSize = 3;//一页所展示的数据量
    pager.pageCurrent = 1;//当前页数
    console.log(req.query)
    var current = req.query.current//从url中获取当前的页数参数（current）
    console.log(current)
    if (current == undefined) {
        pager.pageCurrent = 1;
    } else {
        pager.pageCurrent = current;
    }
    var limit = pager.pageSize//将一页所展示数量赋给数据库参数limit
    var skip = (pager.pageCurrent - 1) *  pager.pageSize;//计算跳过的数据条数（商品数量）
    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
    DB.findPageNoSort('notices', {}, skip, limit,(err,len)=>{
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            pager.maxNum = len;//商品总数量
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
        }
    }, (err, data) => {
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            res.render('admin/notice/index', {
                list: data,
                pager
            });
        }
    })



})
//模糊查询
router.post('/search', function (req, res) {
    var title = req.body.title
    console.log(title)
    var reg = new RegExp(title)//利用正则处理搜索字符串
    var pager = {}
    pager.pagePath = '/admin/notice?'
    pager.pageSize = 3;
    pager.pageCurrent = 1;
    console.log(req.query)
    var current = req.query.current
    console.log(current)
    if (current == undefined) {
        pager.pageCurrent = 1;
    } else {
        pager.pageCurrent = current;
    }
    var limit = pager.pageSize
    let skip = (pager.pageCurrent - 1) *  pager.pageSize;
    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
    DB.findPageNoSort('notices', { $or: [
        { info: { $regex: reg } },
        // { brand: { $regex: reg } }
    ]}, skip, limit,(err,len)=>{
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            pager.maxNum = len;
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
        }
    }, (err, data) => {
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            res.render('admin/notice/index', {
                list: data,
                pager
            });
        }
    })
   
})
//查询回收站公告
router.get('/notice',function(req,res){
    //res.send('显示公告首页');
    var pager = {};//构造一个分页对象用来存关于分页的一些数据
    pager.pagePath = '/admin/notice/notice?';//分页路径
    pager.pageSize = 3;//一页所展示的数据量
    pager.pageCurrent = 1;//当前页数
    console.log(req.query)
    var current = req.query.current//从url中获取当前的页数参数（current）
    console.log(current)
    if (current == undefined) {
        pager.pageCurrent = 1;
    } else {
        pager.pageCurrent = current;
    }
    var limit = pager.pageSize//将一页所展示数量赋给数据库参数limit
    var skip = (pager.pageCurrent - 1) *  pager.pageSize;//计算跳过的数据条数（商品数量）
    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
    DB.findPageNoSort('notices', {isDelete:true}, skip, limit,(err,len)=>{
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            pager.maxNum = len;//商品总数量
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
        }
    }, (err, data) => {
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            res.render('admin/notice/notice', {
                list: data,
                pager
            });
        }
    })



})
//模糊查询
router.post('/noticeSearch', function (req, res) {
    var title = req.body.title
    console.log(title)
    var reg = new RegExp(title)//利用正则处理搜索字符串
    var pager = {}
    pager.pagePath = '/admin/notice/notice?'
    pager.pageSize = 3;
    pager.pageCurrent = 1;
    console.log(req.query)
    var current = req.query.current
    console.log(current)
    if (current == undefined) {
        pager.pageCurrent = 1;
    } else {
        pager.pageCurrent = current;
    }
    var limit = pager.pageSize
    let skip = (pager.pageCurrent - 1) *  pager.pageSize;
    pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
    DB.findPageNoSort('notices',{$and:[
        {
           info: { $regex: reg }
        },
        {isDelete:true}
    ] }, skip, limit,(err,len)=>{
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            pager.maxNum = len;
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));  //计算总页数
        }
    }, (err, data) => {
        if (err) {
            res.json({
                stutas: '1'
            })
        } else {
            res.render('admin/notice/notice', {
                list: data,
                pager
            });
        }
    })
   
})
router.post('/editNotice', function (req, res) {

    //获取get传值 id

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
    //     console.log(files);
    //     console.log(fields);
    //    console.log(req.session.userinfo)
        var info = fields.info[0];
        // var userId = fields.userId[0];
        // var userPwd = fields.userPwd[0];
        var _id = fields._id[0]; 
        // var noticeId = fields.noticeId[0]; 
            var setData = {
            info,
            updatePerson:req.session.userinfo.username,
            updateTime:new Date().Format("yyyy-MM-dd hh:mm:ss")
            };
         
        
            DB.update('notices', { "_id": new DB.ObjectID(_id) }, setData, function (err, data) {

                if (!err) {
                    res.send("<script>alert('修改公告成功,点击确定跳转到公告列表');location.href='/admin/notice'</script>");
                    // res.redirect('/admin/product');
                }
            })
    });
})

//查看某一公告信息
router.get('/findNotice',(req,res)=>{
    var id=req.query.id;
    DB.find('notices',{"_id": new DB.ObjectID(id)},(err,data)=>{
        console.log(data)
        res.render('admin/notice/editNotice', {
           
            noticeDoc: data[0]
        });
    })
})

//删除某一公告信息
router.get('/delNotice',(req,res)=>{
    var id = req.query.id;
    DB.deleteOne('notices',{"_id": new DB.ObjectID(id) },(err)=>{
        if (!err) {
            // res.send("<script>alert('删除公告成功,点击确定跳转到公告列表');location.href='/admin/notice'</script>");
            // res.redirect('/admin/product');
        }
    })
})
//清空公告回收站
router.get('/clearNoticeReturnSta', function (req, res) {
    //获取id

    var id = req.query.id;

    DB.remove('notices', {  isDelete: true }, function (err) {

        if (!err) {
            res.send("<script>location.href='/admin/notice/notice'</script>");
            // res.redirect('/admin/product');
            // res.end()
        }

    })

})
//撤回
router.get('/returnNotice', function (req, res) {
    //获取id
    var id = req.query.id;
    var setData={}
    DB.find('notices',{"_id": new DB.ObjectID(id)},(err,data)=>{
        console.log(data)
        setData =  {
        isDelete:false
      }
      DB.update('notices', { "_id": new DB.ObjectID(id) }, setData, function (err, data) {

        if (!err) {
            // res.send("<script>location.href='/admin/product'</script>");

            // res.send("<script>location.href='/admin/notice'</script>");
            // res.redirect('/admin/product');alert('修改公告成功,点击确定跳转到公告列表');
        }
    })
    })

})
//假删除
router.get('/falseNoticeDelete', function (req, res) {
    //获取id
    var id = req.query.id;
    var setData={}
    DB.find('notices',{"_id": new DB.ObjectID(id)},(err,data)=>{
        console.log(data)
        setData =  {
        isDelete:true,
        isShow:false
      }
      DB.update('notices', { "_id": new DB.ObjectID(id) }, setData, function (err, data) {

        if (!err) {
            // res.send("<script>location.href='/admin/product'</script>");

            // res.send("<script>location.href='/admin/notice'</script>");
            // res.redirect('/admin/product');alert('修改公告成功,点击确定跳转到公告列表');
        }
    })
    })

})
//是否显示
router.get('/isShow',(req,res)=>{
    var id = req.query.id;
    var setData={}
    DB.find('notices',{"_id": new DB.ObjectID(id)},(err,data)=>{
        console.log(data)
        setData = data[0].isShow? {
        isShow:false
      }:{
        isShow:true
      }
      DB.update('notices', { "_id": new DB.ObjectID(id) }, setData, function (err, data) {

        if (!err) {
            // res.send("<script>location.href='/admin/notice'</script>");
            // res.redirect('/admin/product');alert('修改公告成功,点击确定跳转到公告列表');
        }
    })
    })
    
   
  
})

//处理登录的业务逻辑
router.get('/add',function(req,res){
  
    DB.find('notices',{},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err
            })
        }else{
            res.render('admin/notice/addNotice',{noticeId:parseInt(doc.length+Math.random()*1000000+1)});
        }
    })

})
router.post("/addNotice", function (req, res) {

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);
        console.log(fields);
        var info = fields.info[0];
        var noticeId = fields.noticeId[0];
       
        
       
            var setData = {
                info,
                noticeId,
                isShow:true,
                isDelete:false,
                createTime:new Date().Format("yyyy-MM-dd hh:mm:ss"),
                createPerson:req.session.userinfo.username
            };
           
            // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            // if(!reg.test(userId)){
              
            //     res.render('admin/user/addUser',{
            //         msg:'邮箱格式错误,请重新输入'
            //     });
            //     return
            //     // res.send("<script>alert('邮箱格式错误,请重新输入');location.href='/admin/user/add'</script>");
            // }
            // if(userPwd!=userPwdAgin){
            //     res.send("<script>alert('两次密码不一致,请重新输入');location.href='/admin/user/add'</script>");
            //     return
            // }
            DB.insert('notices',setData,(err,data)=>{
                if (!err) {
                    res.send("<script>alert('增加公告信息成功,点击确定跳转到公告列表');location.href='/admin/notice'</script>");
                    // res.redirect('/admin/product');
                }
            })
    });
  
  })

module.exports = router;   /*暴露这个 router模块*/

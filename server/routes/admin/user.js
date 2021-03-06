
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var multiparty = require('multiparty'); 
var DB=require('../../modules/db.js');  /*引入DB数据库*/

router.get('/',function(req,res){
    //res.send('显示用户首页');
    DB.find('users',{},function(err,data){

        res.render('admin/user/index',{
            list:data
        });
    })



})

router.post('/editUser', function (req, res) {

    //获取get传值 id

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);
        console.log(fields);
        var userName = fields.userName[0];
        var userId = fields.userId[0];
        var userPwd = fields.userPwd[0];
        var _id = fields._id[0]; 
            var setData = {
                userName,
                userId,
                userPwd
            };
         
        
            DB.update('users', { "_id": new DB.ObjectID(_id) }, setData, function (err, data) {

                if (!err) {
                    res.send("<script>alert('修改用户信息成功,点击确定跳转到用户列表');location.href='/admin/user'</script>");
                    // res.redirect('/admin/product');
                }
            })
    });
})

//查看某一用户信息
router.get('/findUser',(req,res)=>{
    var id=req.query.id;
    DB.find('users',{"_id": new DB.ObjectID(id)},(err,data)=>{
        res.render('admin/user/userInfo', {
           
            userDoc: data[0]
        });
    })
})
router.get('/findUserOrder',(req,res)=>{
    var orderId=req.query.orderId;
    var id=req.query._id;
    console.log(orderId)
    console.log(id)
    DB.find('users',{"_id": new DB.ObjectID(id)},(err,data)=>{
        for(var i=0;i<data[0].orderList.length;i++){
            if(data[0].orderList[i].orderId==orderId){
                res.render('admin/user/userOrder', {
                    id:id,
                    order:data[0].orderList[i]
                });
            }
        }
      
        
    })
})
//删除某一用户信息
router.get('/delUser',(req,res)=>{
    var id = req.query.id;
    DB.deleteOne('users',{"_id": new DB.ObjectID(id) },(err)=>{
        if (!err) {
            res.send("<script>location.href='/admin/user'</script>");
            // res.redirect('/admin/product');
        }
    })
})

//处理登录的业务逻辑
router.get('/add',function(req,res){
    res.render('admin/user/addUser',{
        msg:''
    });

})
router.post("/addUser", function (req, res) {

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);
        console.log(fields);
        var userName = fields.userName[0];
        var userId = fields.userId[0];
       
        var userPwd = fields.userPwd[0];
        var userPwdAgin= fields.userPwdAgin[0];
       
            var setData = {
                userName,
                userId,
                userPwd,
                orderList:[],
                cartList:[],
                addressList:[]
            };
           
            var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            if(!reg.test(userId)){
              
                res.render('admin/user/addUser',{
                    msg:'邮箱格式错误,请重新输入'
                });
                return
                // res.send("<script>alert('邮箱格式错误,请重新输入');location.href='/admin/user/add'</script>");
            }
            if(userPwd!=userPwdAgin){
                res.send("<script>alert('两次密码不一致,请重新输入');location.href='/admin/user/add'</script>");
                return
            }
            DB.insert('users',setData,(err,data)=>{
                if (!err) {
                    res.send("<script>location.href='/admin/user'</script>");
                    // res.redirect('/admin/product');
                }
            })
    });
  
  })

module.exports = router;   /*暴露这个 router模块*/

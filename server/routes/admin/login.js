/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var bodyParser = require('body-parser');

var multiparty = require('multiparty'); 
var md5=require('md5-node'); /*md5加密*/
console.log(md5(666));
var DB=require('../../modules/db.js');  /*引入DB数据库*/

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    // res.send('登录页面');
   
    res.render('admin/login');
    

})
//处理登录的业务逻辑
router.post('/doLogin',function(req,res){


    var username=req.body.username;//账号：admin
    var password=md5(req.body.password);  /*要对用户输入的密码加密*/
    //密码：123
    //1.获取数据
    //2.连接数据库查询数据
    DB.find('admins',{
        username:username,
        password:password
    },function(err,data){
        console.log(data);
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            console.log(req.session)
            req.session.userinfo=data[0];
            console.log(req.session)
            // res.send(data)
            res.redirect('/admin/product');  /*登录成功跳转到商品列表*/
        }else{
            console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }
    })



})

router.get('/update',(req,res)=>{
    res.render('admin/updatePwd');
    // res.render('/admin/updatePwd')
})

router.post('/updatePwd',(req,res)=>{
    
    var oldPwd=md5(req.body.oldPwd)
    var newPwd=md5(req.body.newPwd)
    DB.find('admins',{password:oldPwd},(err,data)=>{
    //     console.log(err)
    //    console.log(data)
        if(data.length==0){
            res.send("<script>alert('原密码输入错误，请重新输入');location.href='/admin/login/update'</script>");
          
        }else{
           
                DB.update('admins',{password:oldPwd},{password:newPwd},(err2,doc)=>{
                    res.send("<script>alert('修改密码成功,请重新登录');location.href='/admin/login'</script>");
                })
            
           
        }
    })
   
})

router.get('/addAdmin',(req,res)=>{
    res.render('admin/addAdmin')
})
router.post('/toAddAdmin',(req,res)=>{
    var form = new multiparty.Form();
  
    form.parse(req, function (err, fields, files) {

       
        //
        //console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        var username = fields.username[0];
        var realname=fields.realname[0];
      
        var password = md5(fields.password[0]);
       
        console.log(fields);
        console.log(files);

      
        DB.insert('admins', {
            username,
            realname,
            password

        }, function (err, data) {
            if (!err) {
                res.send("<script>location.href='/admin/login/adminList'</script>");
                // res.redirect('/admin/product'); /*上传成功跳转到首页*/
            }

        })
    });

})
router.get('/adminList',(req,res)=>{
    DB.find('admins',{},function(err,data){
        console.log(data)
        res.render('admin/adminList',{
            list:data
        });
    })
  
})
//删除某一用户信息
router.get('/delAdmin',(req,res)=>{
    var id = req.query.id;
    DB.deleteOne('admins',{"_id": new DB.ObjectID(id) },(err)=>{
        if (!err) {
            res.send("<script>location.href='/admin/login/adminList'</script>");
            // res.redirect('/admin/product');
        }
    })
})
router.get('/loginOut',function(req,res){


    //销毁session

    req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    })
})


module.exports = router;   /*暴露这个 router模块*/

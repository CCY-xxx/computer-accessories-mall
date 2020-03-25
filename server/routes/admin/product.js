/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express = require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB = require('../../modules/db.js');  /*引入DB数据库*/

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var fs = require('fs');

router.get('/', function (req, res) {
    var pager = {};//构造一个分页对象用来存关于分页的一些数据
    pager.pagePath = '/admin/product?';//分页路径
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
    DB.findPage('products', {}, skip, limit,(err,len)=>{
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
            res.render('admin/product/index', {
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
    pager.pagePath = '/admin/product?'
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
    DB.findPage('products', { $or: [
        { title: { $regex: reg } },
        { brand: { $regex: reg } }
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
            res.render('admin/product/index', {
                list: data,
                pager
            });
        }
    })
   
})

//处理登录的业务逻辑
router.get('/add', function (req, res) {
    DB.find('products',{},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err
            })
        }else{
            res.render('admin/product/add',{productId:doc.length+50});
        }
    })
   

})
//doAdd
router.post('/doAdd', function (req, res) {
    //获取表单的数据 以及post过来的图片

    var form = new multiparty.Form();
    // form.uploadDir='F:\\新建文件夹 (2)\\v18dyy\\static\\upload'  或者 form.uploadDir='/新建文件夹 (2)/v18dyy/static/upload'
    //!!!注意图片路径
    form.uploadDir = '/毕设/client-server/static/upload'   //上传图片保存的地址     目录必须存在

    form.parse(req, function (err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息
        //
        //console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        var title = fields.title[0];
        var productId=fields.productId[0];
        var price = parseInt(fields.price[0]);
        var brand = fields.brand[0];
        var from = fields.from[0];
        var productDec = fields.productDec[0];
        var productImg = files.productImage[0].path;
        console.log(fields);
        console.log(files);

        var productImage1 = productImg.split('\\')[4]
        var productImage2 = productImg.split('\\')[5]
        var productImage = `${productImage1}\\${productImage2}`
        console.log(productImage);
        DB.insert('products', {
            title,
            productId,
            price,
            brand,
            productImage,
            productDec,
            from

        }, function (err, data) {
            if (!err) {
                res.send("<script>location.href='/admin/product'</script>");
                // res.redirect('/admin/product'); /*上传成功跳转到首页*/
            }

        })
    });

})


router.get('/edit', function (req, res) {

    //获取get传值 id

    var id = req.query.id;

    console.log(id);

    //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

    DB.find('products', { "_id": new DB.ObjectID(id) }, function (err, data) {

        //console.log(data);

        res.render('admin/product/edit', {
            list: data[0]
        });
    });

})
router.post('/doEdit', function (req, res) {

    var form = new multiparty.Form();
    form.uploadDir = '/毕设/client-server/static/upload'  // 上传图片保存的地址
    form.parse(req, function (err, fields, files) {
        console.log(err)
        //获取提交的数据以及图片上传成功返回的图片信息
       if(files!==undefined&&files!=={}&&fields!==undefined){
        console.log(files);
        console.log(fields);
        var title = fields.title[0];
        var price = parseInt(fields.price[0]);
        var productId = fields.productId[0];
        var brand = fields.brand[0];
        var _id = fields._id[0]; 
        // var description=fields.description[0];
        // var productImage=files.productImage[0].path;
        // console.log(fields);
        // console.log(files);
        // console.log(productImage);
         /*修改的条件*/
        // var title=fields.title[0];
        // var price=fields.price[0];
        // var fee=fields.fee[0];
        var from = fields.from[0];
        var productDec = fields.productDec[0];

        var originalFilename = files.productImage[0].originalFilename;
        var productImage = files.productImage[0].path;
        var productImage1 = productImage.split('\\')[4]
        var productImage2 = productImage.split('\\')[5]
        productImage = `${productImage1}\\${productImage2}`
        if (originalFilename) {  /*修改了图片*/
            var setData = {
                title,
                price,
                brand,
                productId,
                productImage,
                productDec,
                from
            };
        } else { /*没有修改图片*/
            var setData = {
                title,
                price,
                brand,
                productId,
                productDec,
                from
            };
            //删除生成的临时文件
            // console.log(productImage)
            // console.log(files.productImage[0].path)

            fs.unlink(files.productImage[0].path,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                }
            });

        }
        DB.update('products', { "_id": new DB.ObjectID(_id) }, setData, function (err, data) {

            if (!err) {
                res.send("<script>alert('修改商品成功,点击确定跳转到首页');location.href='/admin/product'</script>");
                // res.redirect('/admin/product');
            }
        })
       }
    //    res.send("<script>alert('修改商品失败,点击确定跳转到首页');location.href='/admin/product'</script>");

    });

})

router.get('/delete', function (req, res) {
    //获取id

    var id = req.query.id;

    DB.deleteOne('products', { "_id": new DB.ObjectID(id) }, function (err) {

        if (!err) {
            res.send("<script>location.href='/admin/product'</script>");
            // res.redirect('/admin/product');
            // res.end()
        }

    })

})
router.get('/load', function (req, res) {
    //获取id

    var id = req.query.id;

    DB.find('products', { "_id": new DB.ObjectID(id) }, function (err, data) {

        if (!err) {
            console.log('static\\'+data[0].productImage)
            res.download('static\\'+data[0].productImage);
        }


    })

})
module.exports = router;   /*暴露这个 router模块*/

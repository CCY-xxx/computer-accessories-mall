/**
 * Created by Administrator on 2017/8/18 0018.
 */
var MongoClient = require("mongodb").MongoClient;

var DbUrl = "mongodb://localhost:27017/peijians"; /*�������ݿ�*/

var ObjectID = require("mongodb").ObjectID;

function __connectDb(callback) {
  MongoClient.connect(DbUrl, function(err, db) {
    if (err) {
      console.log("数据库连接失败");
      return;
    }
    console.log("数据库连接成功");
    callback(db);
  });
}

//id转化方法

exports.ObjectID = ObjectID;

exports.find = function(collectionname, json, callback) {
  __connectDb(function(db) {
    var result = db.collection(collectionname).find(json);

    result.toArray(function(error, data) {
// 断开数据库连接
      db.close();
//  查询数据库之后的回调
      callback(error, data); 
    });
  });
};

//多条件查询数据库(有排序)
exports.findPage = function(
  collectionname,
  json,
  sort,
  skip,
  limit,
  callback1,
  callback2
) {
  __connectDb(function(db) {
   
      console.log("33"+sort.productId)
  
       var result = db
        .collection(collectionname)
        .find(json)
        .sort(sort)
        .skip(skip)
        .limit(limit);
   
    var len = db.collection(collectionname).find(json);

    len.toArray(function(error, data) {
      db.close(); /*�ر����ݿ�����*/
      callback1(error, data.length); /*�õ�����ִ�лص�����*/
    });
    result.toArray(function(error, data) {
      db.close(); /*�ر����ݿ�����*/
      callback2(error, data); /*�õ�����ִ�лص�����*/
    });
  });
};
//多条件查询数据库(无排序)

exports.findPageNoSort = function(
  collectionname,
  json,
  skip,
  limit,
  callback1,
  callback2
) {
  __connectDb(function(db) {
   
       var result = db
        .collection(collectionname)
        .find(json)
        .skip(skip)
        .limit(limit);
   
    var len = db.collection(collectionname).find(json);

    len.toArray(function(error, data) {
      db.close(); /*�ر����ݿ�����*/
      callback1(error, data.length); /*�õ�����ִ�лص�����*/
    });
    result.toArray(function(error, data) {
      db.close(); /*�ر����ݿ�����*/
      callback2(error, data); /*�õ�����ִ�лص�����*/
    });
  });
};

//插入数据库数据
exports.insert = function(collectionname, json, callback) {
  __connectDb(function(db) {
    db.collection(collectionname).insertOne(json, function(error, data) {
      db.close();
      callback(error, data);
    });
  });
};

//更新数据库数据
exports.update = function(collectionname, json1, json2, callback) {
  __connectDb(function(db) {
    db.collection(collectionname).updateOne(json1, { $set: json2 }, function(
      error,
      data
    ) {
      db.close();
      callback(error, data);
    });
  });
};

//删除数据库数据
exports.remove = function(collectionname, json, callback) {
  __connectDb(function(db) {
    db.collection(collectionname).remove(json, function(error, data) {
      callback(error, data);
    });
  });
};
//删除数据库数据
exports.deleteOne = function(collectionname, json, callback) {
  __connectDb(function(db) {
    db.collection(collectionname).deleteOne(json, function(error, data) {
      callback(error, data);
    });
  });
};



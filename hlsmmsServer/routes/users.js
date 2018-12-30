var express = require('express');
var router = express.Router();

//引入mysql模块
const mysql=require('mysql');

//数据库连接配置（创建数据库连接）
const conn=mysql.createConnection({
  host:'localhost',//数据库主机名
  user:'root',     //数据库账号
  password:'root', //密码
  database:'hlsmms' //使用哪个数据库
});
 //打开数据库连接
 conn.connect(err=>{
   if(err){
     console.log('数据库连接失败',err.message);    
   }else{
     console.log('数据库连接成功');    
   }
 });

 //通用的跨域路由
 router.all('*',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  next();//放行执行下面的路由
 });

 //添加用户的路由
 router.post("/useradd",(req,res)=>{

   let {username,pass,usergroup}=req.body;
   //添加用户的路由中构造sql语句和参数数组
   let sqlStr='insert into userinfo(username,userpwd,usergroup)values(?,?,?)';
   let sqlParmas=[username,pass,usergroup];
    
   //执行sql语句
   conn.query(sqlStr,sqlParmas,(err,result)=>{
     //错误处理
     if(err){
       throw err;
     }else{
       //执行的结果
      // res.send('执行的结果'+result); //根据执行的结果返回数据给前端
        if(result.affectedRows>0){
          res.json({'isok':true,'code':1,'msg':'用户添加成功'})
        }else{
          res.json({'isok':false,'code':0,'msg':'用户添加失败'})
        }
     }
   });
  
 })

 //获取用户列表的路由
 router.get("/getusers",(req,res)=>{
      //1.构造sql语句
      let sqlStr="select * from userinfo order by userid DESC";//按用户id降序排列
      //2.执行sql语句
      conn.query(sqlStr,(err,users)=>{
        if(err){
          throw err;
        }
        else{
          //3.返回查询的用户数据给前端
          res.send(users);
        }
      })     
  })
 
module.exports = router;

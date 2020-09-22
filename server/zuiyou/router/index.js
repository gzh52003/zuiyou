const express = require("express");
const { Router,urlencoded,json } = require("express");
const session = require('express-session')
var cookie = require('cookie-parser');

const cors = require("../utils/cors")
// const token = require('../utils/token');
const user = require("./user");
const order = require("./order");
const goods = require("./goods");
const reg = require("./reg")
const login = require("./login")
const upload = require('./upload');
const vcodeRouter = require('./vcode');
// 必须调用Router方法，不能直接使用！！！
const router = Router();

// 格式化请求参数中间件（不写body没有值）
router.use(urlencoded({extended:false}),json())

// 跨域请求
router.use(cors)

// 调用session
router.use(cookie());
router.use(session({
  secret: 'yiliang',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      // 设置cookie有效期
      maxAge: 1000*60*60*2,
	//sameSite:'none',
	//secure:true
  }
}))

// 不同板块
router.use("/user",user);
router.use("/order",order);
router.use("/goods",goods);

// 上传
router.use('/upload', upload);
// 注册
router.use("/reg",reg);
// 登录
router.use("/login",login);

//验证码
router.use('/vcode', vcodeRouter);


module.exports = router;
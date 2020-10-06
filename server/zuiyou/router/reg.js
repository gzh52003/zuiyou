const express = require("express");
const router = express.Router();

const {
  formatData,
  md5
} = require("../utils/tools");

const mongo = require("../utils/mongo");


router.post("/", async (req, res) => {
  let {
    phone,
    username,
    password,
    imageUrl,
    select,
    vcode,
    vnum,
    cartInfo
  } = req.body;
  console.log('88888',req.session,vnum);
  // app用户注册
  if (vnum) {
    if (vnum == req.session.vnum) {
      password = password?password = md5(password):'';
      await mongo.insert("userInfo", {
        phone:phone,
        username: phone,
        password: password,
        desc: '这个人很懒，啥都没写',
        iconUrl: "",
        gender: "",
        follow: "0",
        followed: '',
        like: "",
        favor: {},
        invitate: [],
        comment: [],
        prefer: []
      })
      res.send(formatData())
    } else {
      res.send(formatData({
        code: 10,
        data: "验证码错误",
        msg:'fail'
      }));
    }
  }else{
    password = md5(password);
    let result;
    try {
      // 默认头像
      // !imageUrl ? "C:Users/Administrator/Desktop/fa.jpg" : imageUrl;
      if (imageUrl) {
        result = await mongo.insert("user", {
          username: username,
          password: password,
          imageUrl: imageUrl,
          cartInfo,
        });
        res.send(formatData());
      } else {
        // 判断验证码是否正确
        // console.log(req.session.vcode);
        if (vcode !== req.session.vcode) {
          console.log(req.session.vcode);
          res.send(formatData({
            code: 10
          }));
          return;
        }
        if (select) {
          result = await mongo.insert("adminInfo", {
            manageName: username,
            managePsw: password,
            manageType: select,
          });
          // console.log("来打哦这里");
          res.send(formatData());
          return;
        }
        result = await mongo.insert("user", {
          username,
          password,
          cartInfo
        });
  
        res.send(formatData());
      }
    } catch (err) {
      res.send(formatData({
        code: 0
      }));
    }
  }
});

router.get("/check", async (req, res) => {
  const {
    phone
  } = req.query;
  // app用户注册去重
  const appres = await mongo.find("userInfo", {
    phone
  });
  if (appres.length > 0) {
    res.send(formatData({
      code: 0
    }));
  } else {
    res.send(formatData());
  }
});

module.exports = router;
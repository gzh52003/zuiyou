const express = require("express");
const router = express.Router();

const { formatData, md5 } = require("../utils/tools");
const sendCode = require('../utils/phoneNum');
const mongo = require("../utils/mongo");

router.get("/",async(req,res)=>{
  const {phone} = req.query;
  console.log("发送了验证码");
  console.log(phone);


  
  sendCode(phone)
  res.send(formatData())
})

router.post("/", async (req, res) => {
  let { username, password, imageUrl, select, vcode, cartInfo } = req.body;
  password = md5(password);
  console.log({ ...req.body });
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
      // 判断验证码时候正确

      console.log(req.session.vcode);
      if (vcode !== req.session.vcode) {
        console.log(req.session.vcode);
        res.send(formatData({ code: 10 }));
        return;
      }
      if (select) {
        result = await mongo.insert("adminInfo", {
          manageName: username,
          managePsw: password,
          manageType: select,
        });
        console.log("来打哦这里");
        res.send(formatData());
        return;
      }
      result = await mongo.insert("user", { username, password, cartInfo });

      res.send(formatData());
    }
  } catch (err) {
    res.send(formatData({ code: 0 }));
  }
});

router.get("/check", async (req, res) => {
  const { username, manageName } = req.query;
  if (!username) {
    const result = await mongo.find("adminInfo", { manageName });
    if (result.length > 0) {
      res.send(formatData({ code: 0 }));
    } else {
      res.send(formatData());
    }
  }
  const result = await mongo.find("user", { username });
  if (result.length > 0) {
    res.send(formatData({ code: 0 }));
  } else {
    res.send(formatData());
  }
});

module.exports = router;

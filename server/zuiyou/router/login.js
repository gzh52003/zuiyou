const express = require("express");
const router = express.Router();
const token = require("../utils/token");

const { formatData, md5 } = require("../utils/tools");
const mongo = require("../utils/mongo");

// 正常的账号密码登陆
router.get("/", async (req, res) => {
  let { password, phone } = req.query;
  // 加密后查询用户
  password = md5(password);
  let result = await mongo.find("userInfo", {
    phone,
    password,
  });
  if (result.length > 0) {
    // 生成token
    let authorization = token.create({ phone });
    result = result[0];
    result.authorization = authorization;
    result.password = '';

    res.send(formatData({ data: result }));
  } else {
    res.send(formatData({ code: 0, msg: false }));
  }
});

// 验证码登陆
router.get("/vnum", async (req, res) => {
  let { vnum, phone } = req.query;
  if (vnum === req.session.vnum) {
    let result = await mongo.find("userInfo", {
      phone
    });
    let authorization = token.create({ phone });
    result = result[0];
    result.authorization = authorization;
    result.password = '';
    res.send(formatData({ data: result }));
  } else {
    res.send(formatData({ code: 10, msg: '验证码错误' }));
  }
});
router.get("/check", (req, res) => {
  let { authorization, phone } = req.query;
  //console.log("authorization",authorization);
  let result = token.verify(authorization);
  //console.log("authorization",result)
  if (result) {
    authorization = token.create({ phone });
    res.send(formatData({ code: 200, data: authorization ,msg:'吃屎啦'}));
  } else {
    res.send(formatData({ code: 0 }));
  }
});
module.exports = router;

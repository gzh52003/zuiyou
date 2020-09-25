const express = require("express");
const router = express.Router();
const token = require("../utils/token");

const { formatData, md5 } = require("../utils/tools");
const mongo = require("../utils/mongo");
// 解构query
router.post("/", async (req, res) => {
  let { username, password, vcode, remember } = req.body;

  // 判断验证码时候正确
  if (vcode !== req.session.vcode) {
    // console.log("session->", req.session);
    // console.log("vcode->", vcode);
    // console.log("session.vcode->", req.session.vcode);
    res.send(formatData({ code: 10 }));
    return;
  }
  // 加密后查询用户
  password = md5(password);
  let result = await mongo.find("adminInfo", {
    manageName: username,
    managePsw: password,
  });
  if (result.length > 0) {
    // 生成token
    let authorization;
    if (remember == "true") {
      authorization = token.create(
        { username, manageType: result.manageType },
        "7d"
      );
    } else {
      authorization = token.create({ username, manageType: result.manageType });
    }

    console.log("我是检验result", result);
    result = result[0];
    req.session.manageType = md5(result.manageType);
    console.log(req.session.manageType);
    result.authorization = authorization;
    result.manageType = req.session.manageType;
    res.send(formatData({ data: result }));
  } else {
    res.send(formatData({ code: 0, msg: false }));
  }
});
router.get("/check", (req, res) => {
  let { authorization, manageType } = req.query;
  //console.log("authorization",authorization);
  let result = token.verify(authorization);
  console.log("result", result);
  let type = req.session.manageType == manageType;
  //console.log("authorization",result)
  console.log("type", type);
  if (result) {
    res.send(formatData({ code: 200 }));
  } else {
    res.send(formatData({ code: 0 }));
  }
});
router.get("/angincheck", async (req, res) => {
  let { manageType, manageName, authorization } = req.query;
  console.log(manageType, manageName, authorization);
  let result = token.verify(authorization);
  if (!result) {
    res.send(formatData({ code: 0 }));
  }
  if ((manageType = md5("admin"))) {
    res.send(formatData({ code: 2000 }));
  } else if ((manageType = md5("vip"))) {
    res.send(formatData({ code: 3000 }));
  }

  console.log(resultmanageuser);
});
module.exports = router;

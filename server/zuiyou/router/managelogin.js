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

  console.log("result", result);
  console.log("我进来了");
  if (result[0].isStop) {
    res.send({ code: 304 });
  }
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
  let resultmanageuser;
  try {
    resultmanageuser = await mongo.find("adminInfo", {
      manageName,
    });
  } catch (error) {
    res.send("死鬼，服务器错了！！");
  }
  if (!result) {
    res.send(formatData({ code: 0 }));
  }
  console.log(md5(resultmanageuser[0].manageType));
  console.log(manageType);
  if (manageType == md5(resultmanageuser[0].manageType)) {
    res.send(formatData({ code: 2000 }));
  } else {
    res.send(formatData({ code: 3000 }));
  }
  console.log(resultmanageuser);
});
module.exports = router;

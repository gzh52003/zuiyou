const express = require("express");
const router = express.Router();
const token = require("../utils/token");

const { formatData, md5 } = require("../utils/tools");
const mongo = require("../utils/mongo");
// 解构query
router.get("/", async (req, res) => {
  let { username, password,phone } = req.query;
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
router.get("/check", (req, res) => {
  let { authorization } = req.query;
  //console.log("authorization",authorization);
  let result = token.verify(authorization);
  //console.log("authorization",result)
  if (result) {
    res.send(formatData({ code: 200 }));
  } else {
    res.send(formatData({ code: 0 }));
  }
});
module.exports = router;

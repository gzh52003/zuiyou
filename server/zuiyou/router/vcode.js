const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");

const { formatData } = require("../utils/tools");

// 生成验证码
router.get("/", async (req, res) => {
  // 生成图像验证码：svg-captcha
  const options = {
    // size: 8,
    noise: 3,
    ignoreChars: "0o1il",
    background: "#56ac67",
    color: true,
    fontSize: 32,
    height: 32,
    width: 80,
  };

  // 验证码在这里生成
  const captcha = svgCaptcha.create(options);
  // 把验证码存入会话Session
  req.session.vcode = captcha.text.toLowerCase();
  console.log("vcode.session=>", req.session);
  res.send(formatData({ data: captcha.data }));
});

module.exports = router;

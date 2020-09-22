const express = require("express");
const router = express.Router();

const { formatData, md5 } = require("../utils/tools");
const mongo = require("../utils/mongo");

router.post("/", async (req, res) => {
  let { username, password, imageUrl ,vcode,cartInfo} = req.body;
  password = md5(password);

  let result;
  try {
    if (imageUrl) {
      result = await mongo.insert("user", {
        username: username,
        password: password,
        imageUrl: imageUrl,
        cartInfo
      });
      res.send(formatData());
    } else {
       // 判断验证码时候正确
      
      if (vcode !== req.session.vcode) {
        //console.log(vcode !== req.session.vcode)
        res.send(formatData({ code: 10 }));
        return;
      }
      result = await mongo.insert("user", { username, password ,cartInfo});
      res.send(formatData());
    }
  } catch (err) {
    res.send(formatData({ code: 0 }));
  }
});

router.get("/check", async (req, res) => {
  const { username } = req.query;

  const result = await mongo.find("user", { username });
  if (result.length > 0) {
    res.send(formatData({ code: 0 }));
  } else {
    res.send(formatData());
  }
});

module.exports = router;

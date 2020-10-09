const express = require("express");
const mongo = require("../utils/mongo");
const { formatData, md5 } = require("../utils/tools");
const { code } = require("statuses");
const router = express.Router();
router.use(express.urlencoded({ extended: false }), express.json());
// 一进来页面查询到所有的数据
router.get("/", async (req, res) => {
  let { page, size, type, msg } = req.query;
  // console.log(page, size, type, msg);
  page = page * 1;
  size = size * 1;
  let skip = (page - 1) * size;
  //判断用户是否传入搜索类型和搜索内容，如果没有就查询所有{}
  //如果有，就查询数据库的type属性，并值为msg
  let search;
  if (!type && !msg) {
    search = {};
  } else {
    search = { [type]: msg };
  }
  // console.log(search);
  msg = await mongo.find("changemanageType", search, {
    skip: skip,
    limit: size,
  });
  res.send(msg);
  // console.log(msg);
});
// 模糊查询
router.get("/find", async (req, res) => {
  const { manageName } = req.query;

  const result = await mongo.find("changemanageType", { manageName });
  console.log("result", result);

  if (result.length > 0) {
    console.log("进来大于0中");
    if (result[0]._id) {
      let _id = result[0]._id;
      res.send({ code: 0, _id });
    } else {
      res.send({ code: 0 });
    }
  } else {
    res.send(formatData());
  }
});
//更改
router.put("/", async (req, res) => {
  console.log("进来修改中");
  let { _id, manageName, changeType, reason, tags, runtype, ispass } = req.body;
  if (ispass == "待审核") {
    ispass = "";
  }
  // console.log("第一次", _id, description, imageUrl);
  console.log("查看修改的值是否拿到", _id, manageName, changeType, reason);
  let result;
  try {
    result = await mongo.update(
      "changemanageType",
      { _id: _id },
      {
        changeType: changeType,
        manageName: manageName,
        reason: reason,
        tags: tags,
        runtype: runtype,
        ispass,
      }
    );
    // console.log("result", result);
    // console.log(result);
    if (result != null) {
      res.send({ code: 200 });
      return;
    } else {
      res.send("else", { code: 0 });
      return;
    }
  } catch {
    res.send("catch", { code: 0 });
    return;
  }
});
// 增加
router.post("/", async (req, res) => {
  console.log("进来增加中");
  let { manageName, changeType, tags, runtype, reason, ispass } = req.body;
  if (ispass == "待审核") {
    ispass = "";
  }
  try {
    result = await mongo.insert("changemanageType", {
      changeType: changeType,
      manageName: manageName,
      reason: reason,
      tags: tags,
      runtype: runtype,
      ispass,
    });
    res.send(formatData({ code: 200 }));
  } catch (err) {
    res.send(formatData({ code: 0 }));
  }
});
//删除
router.delete("/", async (req, res) => {
  let { manageName } = req.query;
  const result = await mongo.remove("changemanageType", { manageName });
  // console.log(result);
  res.send(result);
});
module.exports = router;

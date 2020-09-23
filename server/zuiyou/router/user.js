const express = require("express");
const mongo = require("../utils/mongo");
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
  msg = await mongo.find("user", search, {
    skip: skip,
    limit: size,
  });
  res.send(msg);
  // console.log(msg);
});
// 模糊查询
router.get("/mohu", async (req, res) => {
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
  msg = await mongo.fuzzyFind("user", search, {
    skip: skip,
    limit: size,
  });
  res.send(msg);
  // console.log(msg);
});
//更改
router.put("/", async (req, res) => {
  let { _id, description, imageUrl } = req.body;
  // console.log("第一次", _id, description, imageUrl);
  try {
    const result = await mongo.update(
      "user",
      { _id: _id },
      { description: description, imageUrl: imageUrl }
    );
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
//删除
router.delete("/", async (req, res) => {
  let { _id } = req.query;
  const result = await mongo.remove("user", { _id });
  // console.log(result);
  res.send(result);
});
module.exports = router;

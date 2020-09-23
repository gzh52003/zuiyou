const express = require("express");
const router = express.Router();

// 导入自定义的mongo模块
const mongo = require("../utils/mongo");
const { formatData } = require('../utils/tools');

router.get("/", async (req, res) => {
  let { page = 1, size = 9, sort = "add_time", goodsID ,isbn} = req.query;
  if (goodsID) {
    let result = await mongo.find('goods', { 'isbn': { "$in": goodsID.split(",") } }, {});
    //console.log("Goods res=>" + result);
    res.send(JSON.stringify(formatData({ data: result })))
    return;
  }
  //console.log('bookName',bookName);
  if (isbn) {
    //console.log("进入");
    let result = await mongo.find('goods_classify', {'isbn':isbn},{page:1,size:1});
    // console.log("Goods res=>" + result);
    res.send(JSON.stringify(formatData({ data: result })))
    return;
  }
  const skip = (page - 1) * size;
  const limit = size * 1;
  sort = sort.split(',');
  const result = await mongo.find('goods', {}, { skip, limit, sort });
  res.send(JSON.stringify(formatData({ data: result })))
})


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await mongo.remove('goods', { _id: id })
    res.send(JSON.stringify(formatData()))
  } catch (err) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })));
  }
})
router.put("/", async (req, res) => {
  const {
    _id:id,
    bookName,
    desc,
    author,
    public,
    isbn,
    time,
    price,
    line_price,
    num,
    img,
    on_line
  } = req.body;
  const book = {
    id,
    bookName,
    desc,
    author,
    public,
    isbn,
    time,
    price,
    line_price,
    num,
    img,
    on_line
  }
  //console.log(book);
  try {
    const result = await mongo.update('goods', { _id:book.id}, book)
    res.send(JSON.stringify(formatData()))
  } catch (err) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })));
  }
})
router.patch("/", async (req, res) => {
  // console.log(req.body.username,req.body.cartInfo)
  try {
    const result = await mongo.update('user', { username:req.body.username}, {cartInfo:req.body.cartInfo})
    res.send(formatData())
  } catch (err) {
    res.send(formatData({ code: "0", msg: false }));
  }
})

router.post("/", async (req, res) => {
  const {
    bookName,
    desc,
    author,
    public,
    isbn,
    time,
    price,
    line_price,
    num,
    img,
    on_line
  } = req.body;
  const book = {
    bookName,
    desc,
    author,
    public,
    isbn,
    time,
    price,
    line_price,
    num,
    img,
    on_line
  }
  // console.log(book);
  try {
    const result = await mongo.insert('goods', book)
    res.send(JSON.stringify(formatData({ data: result })))
  } catch (err) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })))
  }
})








module.exports = router;
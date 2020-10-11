const express = require("express");
const router = express.Router();

// 导入自定义的mongo模块
const mongo = require("../utils/mongo");
const { formatData } = require('../utils/tools');
//获取帖子
router.get("/", async (req, res) => {
  let { page = 1, size = 20, sort = "publicTime",user_id,category} = req.query;
  //如果传了user_id字段过来，就查询该用户的帖子返回，默认按时间排序,每次返回20条数据
  if(user_id){
      try{
        const result = await mongo.find('invitate', {user_id}, { skip, limit, sort });
        res.send(JSON.stringify(formatData({ data: result })))
        return
      }
      catch(error){
        res.send(JSON.stringify(formatData({ code: "0", msg: false })));
      }

  }
  //如果传了category字段过来，就查询该话题类型的帖子返回，默认按时间排序,每次返回20条数据
  if(category){
    try{
      const result = await mongo.find('invitate', {category}, { skip, limit, sort });
      res.send(JSON.stringify(formatData({ data: result })))
      return
    }
    catch(error){
      res.send(JSON.stringify(formatData({ code: "0", msg: false })));
    }
   }
   //如果没有传任何字段过来,默认按时间排序,每次返回20条数据

    try{
      const skip = (page - 1) * size;
      const limit = size * 1;
      sort = sort.split(',');
      const result = await mongo.find('invitate', {}, { skip, limit, sort });
      res.send(JSON.stringify(formatData({ data: result })))
    }
    catch(error){
      res.send(JSON.stringify(formatData({ code: "0", msg: false })));
    }

})

//删除某个帖子
router.delete("/:id", async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await mongo.remove('invitate', { _id })
    res.send(JSON.stringify(formatData()))
  } catch (error) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })));
  }
})
//修改某个帖子_id为invitateId的信息
router.put("/", async (req, res) => {
  const {
    _id:invitateId,
    commentId,
    category
  } = req.body;
  const newData = {
    commentId,
    category
  }
  try {
    const result = await mongo.update('invitate', {"_id":invitateId}, newData)
    res.send(JSON.stringify(formatData()))
  } catch (err) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })));
  }
})

//增加
router.post("/", async (req, res) => {
  const {
    user_id,
    publicTime,
    content,
    commentId,
    category
  } = req.body;
  const newData = {
    user_id,
    publicTime,
    content,
    commentId,
    category
  }

  try {
    const result = await mongo.insert('invitate', newData)
    res.send(JSON.stringify(formatData({ data: result })))
  } catch (err) {
    res.send(JSON.stringify(formatData({ code: "0", msg: false })))
  }
})








module.exports = router;
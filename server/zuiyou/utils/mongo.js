// 导入mongodb模块
const { MongoClient, ObjectId, Logger } = require("mongodb");
const { query } = require("express");

// 封装数据库连接方法--------------------
async function connect() {
  // 找到数据库路径
  const client = await MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // 找到数据库名，完成数据库连接
  const db = client.db("ZUIYOU");
  return { client, db };
}

async function insert(colName, data) {
  const { db, client } = await connect();
  const collection = db.collection(colName);
  //console.log("Orderdata",data)
  const result = await collection[
    Array.isArray(data) ? "insertMany" : "insertOne"
  ](data);
  client.close();
  // 返回结果
  return result;
}

// 删
async function remove(colName, query) {
  const { db, client } = await connect();
  // 传入的是_id,给_id加一个objecctId包裹(_id这个key值比较特殊)
  if (query._id && typeof query._id === "string") {
    query._id = ObjectId(query._id);
  }
  const collection = db.collection(colName);
  const result = await collection.deleteMany(query);
  client.close();
  return result;
}

// 改
async function update(colName, query, newData) {
  const { db, client } = await connect();
  // console.log("111");
  // console.log(query._id, typeof query._id);
  const collection = db.collection(colName);
  if (query._id && typeof query._id === "string") {
    query._id = ObjectId(query._id);
  }
   
  const result = await collection.updateMany(query, { $set: newData });
  client.close();
  return result;
}
// 模糊查询
async function fuzzyFind(colName, query = {}, option = {}) {
  const { client, db } = await connect();
  const collection = db.collection(colName);
// console.log(query,888)
 	
  // 查询到的所有集合
  let key = Object.keys(query)[0];
  let value = Object.values(query)[0];
  // console.log(key, 45544);
  // console.log(value, 45544);
  let result = collection.find({ [key]: { $regex: value } });
  // 判断排序的方式-----
  if (option.sort) {
    let key, val;
    key = option.sort[0];
    if (option.sort.length > 1) {
      val = option.sort[1] * 1;
    } else {
      val = -1;
    }
    result = result.sort({
      [key]: val,
    });
  }
  // 判断是否跳过-----
  if (option.skip) {
    result = result.skip(option.skip);
  }
  // 判断需要的数量
  if (option.limit) {
    result = result.limit(option.limit);
  }
  // 转为数组返回
  result = await result.toArray();

  client.close();
  return result;
}
// 查
async function find(colName, query = {}, option = {}) {
  
  const { client, db } = await connect();
  const collection = db.collection(colName);
  // 查询到的所有集合
  let result = collection.find(query);
  // 判断排序的方式-----
  if (option.sort) {
    let key, val;
    key = option.sort[0];
    if (option.sort.length > 1) {
      val = option.sort[1] * 1;
    } else {
      val = -1;
    }
    result = result.sort({
      [key]: val,
    });
  }
  // 判断是否跳过-----
  if (option.skip) {
    result = result.skip(option.skip);
  }
  // 判断需要的数量
  if (option.limit) {
    result = result.limit(option.limit);
  }
  // 转为数组返回
  result = await result.toArray();

  client.close();
  return result;
}

// 导出模块
module.exports = {
  insert,
  remove,
  update,
  find,
  fuzzyFind,
};

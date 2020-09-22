const http = require('http');
const express = require('express');
const fs = require("fs");

// 本地模块
const szbookRouter = require("./szbook/router"); 
const zuiyouRouter = require("./zuiyou/router"); 
// 引入需要依赖的第三方模块 --ws--
const ws = require('ws');

const app = express();
// 启动静态资源服务器
app.use(express.static("./"));


// 本地路由
  // szbookAPI接口
  app.use("/api",szbookRouter);
  // zuiyouAPI接口
  app.use("/zyapi",zuiyouRouter);

// 解决vue路由跳转mode为history的服务器配置问题
app.use((req,res)=>{
  const content = fs.readFileSync("./szbook/app/index.html");
  res.set("Content-Type","text/html");
  res.send(content);
})
// 利用http模块连接express服务器和socket服务器
const server = http.createServer(app);

// 启动一个webSocket服务器
let wss = new ws.Server({
  server//  等价于 server:server
})

// 注意：必须使用createServer返回的服务器监听端口
server.listen(80,()=>{
  console.log('server is running');
})

// 监听连接事件==>客户端连接socket服务器时，触发connection事件，传递客户端对象，并把所有客户端对象保存再wss.clients属性中
wss.on('connection',(client)=>{
  // client：客户端对象
  // 客户端发送信息到服务端时，触发message事件
  client.on('message',(msg)=>{
    // 收到的信息，服务端转发到所有连接的客户端上
    msg = JSON.parse(msg);
    msg.users = wss.clients.size;
    msg = JSON.stringify(msg);
    
    wss.clients.forEach(item=>{
      item.send(msg);
    })
  })
})
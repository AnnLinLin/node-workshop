const express = require("express");
// const connection = require("./utils/db");

// 利用express 建立了一個express application
// express(由中間件組成的事件)由上往下,遇到response就結束
let app = express();

// app.use (handler)使用中間件
// 中間件由上往下
// next()告知往下執行
// 若沒有next() -> pedding -> timeout (若無此機制,占用server端資源)
app.use((req, res, next) => {
  let current = new Date()
  console.log(`有人來訪問囉 at ${current.toISOString()}`);
  next();
});

app.use((req, res, next) => {
  console.log("我是第二個中間件");
  next();
});

// Http method: get, post, put, patch, delete......
// 第一個參數: 網址的長相 ; 第二個參數:處理式
// router 路由為特殊中間件 , 比對request網址
// response.send: 回覆
app.get("/", function (request, response, next) {
  response.send("Hello,我是首頁");
});

app.get("/about", function (request, response, next) {
  response.send("Hello,關於我們A");
});

app.get("/about", function (request, response, next) {
  response.send("Hello,關於我們B");
});

// app.get("/stock", async (request, response, next) => {
//   let result = await connection.queryAsync("SELECT * FROM stock");
//   res.json(result);
// });

// 啟動使用listen
app.listen(3000, async function () {
  // await connection.connectAsync();
  console.log(" web server 啟動了");
});

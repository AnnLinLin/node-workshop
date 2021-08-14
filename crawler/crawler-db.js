const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

async function doWork() {
  let stockCode = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        //trim 移除前後空白,包括換行
        resolve(stockCode.trim());
      }
    });
  });

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上");
    }
  });

  // 不關閉連線，認為程式一直在執行
  connection.end();

//   try {
//     let response = await axios.get(
//       "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//       {
//         params: {
//           response: "json",
//           date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//       }
//     );
//     console.log(response.data.title);
//   } catch (e) {
//     console.error(e);
//   }
 }

 doWork();

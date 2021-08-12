const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();


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

// 1.讀 stock.txt 把股票代碼讀進來
// 2.去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
// 3.如果是，才去證交所抓資料
// 4.抓回來的資料存到資料庫的 stock_price 表格裡去

// 讀 stock.txt 把股票代碼讀進來
function readStockcodePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        // trim 移除前後的空白字元，包括換行
        resolve(stockCode.trim());
      }
    });
  });
}

// 去證交所抓資料
function catchTwseStockDataPromise(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  });
}

// 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
function checkDbStockCodePromise(stockCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode],
      function (error, results, fields) {
        if (error) {
          //錯誤
          reject(error);
        }
        //正確
        resolve(results);
      }
    );
  });
}

// 抓回來的資料存到資料庫的 stock_price 表格裡去
function insertStockPricePromise(parseData) {
  return new Promise((resolve, reject) => {
    // INSERT IGNORE INTO避免重複插入記錄,當有重複記錄會忽略
    connection.query(
      "INSERT  IGNORE into stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) values ? ",
      [parseData],
      function (error, results, fields) {
        if (error) {
          //錯誤
          reject(error);
        }
        //正確
        resolve(results);
      }
    );
  });
}
async function doWork() {
  try {
    // 1.讀 stock.txt 把股票代碼讀進來
    let stockCode = await readStockcodePromise();
    // 2.去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
    let dbResults = await checkDbStockCodePromise(stockCode);
    //console.log(dbResults);
    if (dbResults.lengths === 0) {
      console.warn("此股票號碼不在資料庫內");
      return;
    }
    console.info("有查到資料");
    //3.如果是，才去證交所抓資料
    let response = await catchTwseStockDataPromise(stockCode);
    //4.抓回來的資料存到資料庫的 stock_price 表格裡去
    const twseData = response.data;
    //確認證交所查到的資料是否有問題
    if (twseData.stat !== "OK") {
      throw "從證交所查到的資料有問題";
    }
    //console.log(twseData);
    //處理千分號
    //處理日期
    let parseData = twseData.data.map((item) => {
      item = item.map((value) => {
        return value.replace(/,/g, "");
      });
      item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
      item.unshift(stockCode);
      return item;
    });
    console.log(parseData);

    let stockPriceResults = await insertStockPricePromise(parseData);
    console.log(stockPriceResults);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

doWork();

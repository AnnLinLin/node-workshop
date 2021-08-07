const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

new Promise((resolve, reject) => {
  fs.readFile("stock1.txt", "utf8", (err, stockCode) => {
    if (err) {
      reject("錯誤", err);
    } else {
      resolve(stockCode);
    }
  });
})
  .then((stockCode) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: "2330",
      },
    });
  })
  .then((response) => {
    console.log(response.data.title);
  })
  .catch((error) => {
    console.error(error);
  });

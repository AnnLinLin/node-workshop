let doWork = function (job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    //callback 慣用設計
    //第一個參數: error ,若沒有錯誤放null
    //第二個參數: 要回覆的資料
    cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
  }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

doWork("刷牙", 3000, function (err, data) {
  if (err) {
    console.log("發生錯誤:", err);
    return;
  }
  console.log(data);

  doWork("洗臉", 3000, function (err, data) {
    if (err) {
      console.log("發生錯誤:", err);
      return;
    }
    console.log(data);

    doWork("吃早餐", 5000, function (err, data) {
      if (err) {
        console.log("發生錯誤:", err);
        return;
      }
      console.log(data);
    });
  });
});

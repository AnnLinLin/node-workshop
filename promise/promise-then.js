let doWork = function (job, timer, isOK) {
  // 物件： new Promise();
  // 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數
  // resolve, reject
  return new Promise((resolve, reject) => {
    console.log("in promise");
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        resolve(`完成工作:${job} at${dt.toISOString()}`);
      } else {
        reject(`${job}失敗了`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

let job1 = doWork("刷牙", 3000, true);
job1
  .then((result) => {
    console.log("first", result);
    return doWork("吃早餐", 3000, true);
  })
  .then((result) => {
    console.log("second", result);
    return doWork("寫作業", 5000, true);
  })
  .then((result) => {
    console.log("third", result);
  })
  .catch((error) => {
    // 捕捉catch前面所有錯誤
    console.log(error);
  })
  .finally(() => {
    // 無論成功或失敗都會在這裡
    console.log("finally");
  });

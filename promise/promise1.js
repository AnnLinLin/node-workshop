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

let job1 = doWork("刷牙", 3000, false);
console.log(job1);
job1.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
  }
);

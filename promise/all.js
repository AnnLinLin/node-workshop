let doWorkPromise = function (job,isOK) {
  return new Promise((resolve, reject) => {
    let timer = Math.floor(Math.random() * 5000);
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

// let dt = new Date();
// console.log(`開始工作 at ${dt.toISOString()}`);

// await 一定要在 async 的函式裡面用

let job1Promise = doWorkPromise("刷牙", true);
let job2Promise = doWorkPromise("吃早餐", true);
let job3Promise = doWorkPromise("寫作業", true);
//同時做,三個都完成才會同時通知(才會到 then)
// Promise.all([job1Promise, job2Promise, job3Promise]).then((response) => {
//   console.log(response);
// });
// 最早執行
Promise.race([job1Promise, job2Promise, job3Promise]).then((response) => {
    console.log(response);
  })

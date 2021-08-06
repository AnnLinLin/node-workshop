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

//await 一定要在 async 的函式裡面用
async function doAllWorks() {
  let job1 = await doWork("刷牙", 3000, true);
  console.log(job1);
  let job2 = await doWork("吃早餐", 4000, true);
  console.log(job2);
  let job3 = await doWork("寫作業", 5000, true);
  console.log(job3);
}

doAllWorks();

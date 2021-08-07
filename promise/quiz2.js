async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);

// 4 ->1 ->5 ->2 ->3
//->執行 L12 (印出4)
//->執行 L13 呼叫asyncF()
//->執行 L2  (印出1)
// setTimeout丟給暗樁 (setTimeout執行完會丟到queue中等待stack清空)
//->執行 L14 (印出5)
//stack已清空 將queue等待中的東西搬進stack
//->執行 L5  (印出2) 
//->執行 L9  (印出3)  async await 會依序執行


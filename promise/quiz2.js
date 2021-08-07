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
//執行 L12 (印出4)
//->執行 L13 (印出1)
// setTimeout丟給暗樁
//->執行L14
//Queueu已清空
//->(印出2跟3) async await 會依序執行 
// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

//4 ->1 ->3 ->5 ->2
//->執行 L12 (印出4)
//->執行 L13 (印出1)
// setTimeout丟給暗樁(印出3)
//->執行L14 (印出5)
//Queue已清空
//(印出2)

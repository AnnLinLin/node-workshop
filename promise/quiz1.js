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
//->執行 L13 呼叫syncF()
//->執行 L4 (印出1)
// setTimeout丟給暗樁 (setTimeout執行完會丟到queue中等待stack清空)
//->執行 L9 (印出3)
//->執行 L14(印出5)
//stack已清空
//evenloop 將queue等待中的東西搬進stack
//->執行 L7 (印出2)

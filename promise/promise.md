## 什麼是 Promise?

### 用途

Promise 用來改善 JavaScript **非同步**的語法結構。  
JavaScript 是屬於同步的程式語言，因此一次僅能做一件事情，但遇到非同步的事件時，就會將非同步的事件移動到程式碼的最後方，等到所有的原始碼運行完以後才會執行非同步的事件。

Promise 本身是一個**建構**函式，函式也是屬於**物件**的一種，因此可以附加其它屬性方法在上。
Promise 是一個表示**非同步**運算的**最終完成**或**失敗**的**物件**。

- 非同步
- 物件 --> new Promise()
- 最終完成
- 最終失敗

Promise 建構函式建立同時，必須傳入一個函式作為參數（executor function），此函式的參數包含 **resolve**, **reject** （resolve 及 reject 的名稱可以自定義），這兩個方法分別代表成功與失敗的回傳結果，特別注意這兩個僅能回傳其中之一，回傳後表示此 Promise 事件結束。

```javascript=
new Promise(function(resolve, reject) {
	resolve(); // 正確完成的回傳方法
	reject();  // 失敗的回傳方法
});
```

## Promise 狀態

Promise 的關鍵在處理**非同步**的事件，而非同步的過程中也包含著不同的進度狀態，在 Promise 的執行過程中，可以看到以下狀態。

- pending：事件已經運行中，尚未取得結果。（交出工作，還未拿到最終結果）  
  若沒有被調用，Promise 的結果則會停留在 pending。
- resolved：事件已經執行完畢且成功操作，回傳 resolve 的結果（該承諾已經被實現 fulfilled）。
- rejected：事件已經執行完畢但操作失敗，回傳 rejected 的結果。

![](https://firebasestorage.googleapis.com/v0/b/casper-de5d5.appspot.com/o/images%2Fblog%2F202002%2Fimg-promise-pending.png?alt=media&token=f5a5607b-4436-44e6-ab1f-0d8dd4bf59b3)

Promise 建構函式 new 出的物件，則可以使用其中的原型方法（在 prototype 內），其中就包含 then、catch、finally，這些方法則必須在新產生的物件下才能呼叫。

透過 new Promise() 的方式建立 p 物件，此時 p 就能使用 Promise 的原型方法：

```javascript=
const p = new Promise();

p.then();    // Promise 回傳正確
p.catch();   // Promise 回傳失敗
p.finally(); // 非同步執行完畢（無論是否正確完成）
```

## chain

Promise 另一個特點在於 **then、catch** 都可以使用鏈接的方式不斷的進行下一個任務，在此範例中我們修改 Promise 的結果，改成傳入 0 則會調用 reject，其它數值則會調用 resolve。

```javascript=
function promise(num) {
  return new Promise((resolve, reject) => {
    num ? resolve(`${num}, 成功`) : reject('失敗');
  });
}
```

當我們要進行確保 Promise 任務結束後在進行下一個任務時，就可以使用 **return** 的方式進入下一個 then，此 return 也有以下特點：

- 方法不限於 promise 函式，任何表達式（expression）都可進行回傳
- 如果是 promise 函式，則會繼續遵循 then 及 catch 的運作
- 如果不是 promise 函式，在下一個 then 則可以取得結果

```javascript=
promise(1)
  .then(success => {
    console.log(success);
    return promise(2);
  })
  .then(success => {
    console.log(success);
    return promise(0); // 這個階段會進入 catch
  })
  .then(success => {   // 由於上一個階段結果是 reject，所以此段不執行
    console.log(success);
    return promise(3);
  })
  .catch(fail => {
    console.log(fail);
  })
```

資料來源 : https://wcc723.github.io/development/2020/02/16/all-new-promise/

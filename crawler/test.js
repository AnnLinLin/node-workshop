//測試1: for loop
function double(i) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(i*2)
        },0);
    });
}

(async ()=> {
    let data1 = [1, 3, 5, 7];
    for (let i=0; i<data1.length; i++) {
        data1[i] = await double(data1[i])
    }
    console.log("test 1:", data1)
})();

//for迴圈將data1逐一撈出 將取出的值代入function double()
//function double()將帶入的值做resolve(i * 2)後回傳結果給for迴圈;
//for迴圈將回傳的結果傳入 data1陣列，迴圈繼續
//console.log("test 1: ",data1)因為for有使用到await所以會等到for迴圈結束，才顯示data1



//測試2: map
function double(i){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(i*2)
        },0);
    });
}

let data2 = [1, 3, 5, 7];
data2 = data2.map(async (d) => {
    let result = await double(d);
    return result;
})
console.log("test 2:", data2)

//由結果可知 map 並不會等 async(d) 這個非同步的工作做完才回傳
//async 被執行後，會回傳一個 Promise，這代表我們可以藉由 Promise 物件來得知工作什麼時候完成。
//pending最後狀態會變成fulfilled或者rejected，
//不管最終狀態如何一旦變成fulfilled或者rejected，這個Promise就結束了。

//測試3
function double(i) {
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            resolve(i*2)
        },0)
    })
}

let data3 = [1,3,5,7];
data3.forEach(async (d,i) => {
    data3[i] = await double(d);
});

console.log("test3:", data3)

//forEach並不會在乎 callback function是不是 async functrion(也就是他的 return是不是一個promise)、也不會等到 promise被 resolve或 reject才執行下一次迴圈。
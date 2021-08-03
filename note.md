# Node.js

## 什麼是 Node.js?

Node.js 是能夠在伺服器端運行 JavaScript 的開放原始碼、跨平台 JavaScript 執行環境。Node.js 採用 Google 開發的 V8 執行程式碼，使用事件驅動、非阻塞和非同步輸入輸出模型等技術來提高效能，可最佳化應用程式的傳輸量和規模。這些技術通常用於資料密集的即時應用程式。

## 什麼是 (I/O)？

I/O 為 input / output 的簡稱，是程式跟系統記憶體或網路的互動，如讀取、寫入檔案、發送 HTTP 請求、對資料庫 CRUD 操作等等。

## 事件堆疊 (Call Stack)

Javascript 是一種單執行緒 (Single Thread)，意思是 Javascript 一次只能做一件事情，同一時間一次只能執行一段程式碼，程式碼是一行一行執行的。

Call Stack 則會紀錄我們目前程式跑到什麼位置，如果執行了一個函式，我們會把這個函式丟進 (pop in) Stack 的頂端，函式執行結束之後，這個函式就會跳出 (pop out) Stack 中。

## 阻塞 (Blocking)

阻塞沒有一種明確的定義，如果有一段程式碼跑得太久了，網頁不管怎麼點都沒有作用，因為在 Call Stack 最上面的任務還沒結束之前，瀏覽器沒辦法做任何其他的事情，好像卡死了，就可以稱為阻塞。

## 事件循環 (Event Loop)、事件佇列 (Event Queue)、事件堆疊 (Call Stack)

![](https://miro.medium.com/max/2000/1*zTt9eHCCktSbKLo9HQd1dw.gif)

- **Stack：**
  程式中要執行的函式堆進來 (pop in) 的地方，一次執行一個，完成後便跳出 (pop out)，為後進先出(LIFO)。
- **WebAPIs：**
  當你要執行的程式為非同步 WebAPIs，瀏覽器即會和你的程式一起開始執行，當他執行完了，也不會把結果隨便丟回你的程式中，他會去排隊，排進 Callback Queue 裡面。
- **Callback Queue / Task Queue：**
  這裡就是儲放 callback function 的地方，利用先進先出法(FIFO)，callback function 等著被丟進 Stack 被執行。
- **Event Loop：**
  Event Loop 會持續查看 Stack 空下來了沒有，如果已經空了，就把 Callback Queue 裡面的任務丟進 Stack 讓他去執行。

JS 為 Single Thread

1.  希望非阻塞，事實上透過暗樁(Node.js、 WebApis、Ajax)協助
2.  暗樁使用 callback 溝通
3.  callback 到 Queue
4.  even-loop 看 Call Stack 無工作時(清空)，將 Queue 內等待中的 callback 放至 Call Stack 執行

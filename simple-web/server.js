const http = require("http");

//web server  類似apache
//client ---> HTTP request ---> server
//       <--- HTTP response <---server
//若改程式 sever要重新啟動 不然新的程式碼不會被載入新的記憶體裡面
//傳送兩個物件 req->request res->response
const server = http.createServer((req, res) => {
  //印出網址
  //console.log(req.url)
  let url = req.url;
  switch(url) {
    case "/":
      res.end("Hello");
      break;
    case "/about":
      res.end("About us");
      break;

  }


  
});

server.listen(3000, () => {
  console.log("我們的 web server 啟動了～");
});
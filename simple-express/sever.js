const express = require("express");

// 利用express 建立了一個express application
let app = express();

// http method: get, post, put, patch, delete......
app.get("/",function(request, response,next){
    response.send("Hello");
});

app.get("/about",function(request, response,next){
    response.send("Hello,關於我們");
});

app.listen(3000, function(){
    console.log(" web server 啟動了");
});


// 获取http公开的接口，即获取http的exports对象。
// 如果http公开的是模块，那么获取的不是exports对象，而是Module
var http = require("http");
var url = require("url");

// 启动服务器
function start(route,handle){
    // 写一个处理请求的函数。
    function onRequest(request,response){
        // 获取访问路径
        var pathName = url.parse(request.url).pathname;
        console.log("Request for"+pathName+" received");
        console.log("Request content is ",request.body);
        route(handle,pathName,request,response);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Success Start Server!")
    console.log("--Runing at port:8888");
    console.log("--Listening....")
}

// 公开模块作为接口
module.exports.start = start;
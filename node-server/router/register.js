const url = require("url");
const mysql = require("mysql");
const querystring = require("querystring");

// 注册程序
function register(request,response){
    var data = "";
    request.on('data', function (chunk) {
        data += chunk;

        var username = data;
        console.log(data);
    })
}

exports.register = register;
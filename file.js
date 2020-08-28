var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');
var fs = require("fs");


// 启动服务器，监听请求
var server = app.listen(7777, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
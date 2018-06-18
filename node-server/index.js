var server = require("./server.js");
var router = require("./router.js");

var register = require("./router/register.js")
// var calculatePhi = require("./router/calculatePhi.js");
// var randomED = require("./router/randomED.js");

var handle = {};
handle["/register"] = register.register;
// handle["/phi"] = calculatePhi.phi;
// handle["/random-ed"] = randomED.randomED;

// 启动服务器
server.start(router.route,handle);
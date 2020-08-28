"use strict"
var express = require('express');
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mysql = require("mysql");


var app = express();

var register = require("./router/register.js")
var countVisit = require("./router/count")


// 设置默认静态文件
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置session
app.use(cookieParser());
app.use(session({
	secret: 'Himory',
	name: 'sid',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false
	},  //设置maxAge是1s*60*60，即一小时后session和相应的cookie失效过期
	resave: false,
	saveUninitialized: true,
}));

// 连接数据库
function connectDB() {
	let conn = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'pc8Aeubu',
		database: 'xupt_go',
		port: 3306,
		multipleStatements: true
	});

	conn.connect();
	return conn;
}

// 全局使用这一个connection
var connection = connectDB();

// 检查当前用户是否有session记录
app.get('/checkStatus', function (req, res) {
	console.log("/checkStatus开始执行................................")
	console.log("/checkStatus req.session.name ="+req.session.name);
	// 如果session不存在
	console.log("dir session");
	console.dir(req.session);
	var msg;
	if (!req.session.name || req.session.name == "undefined") {
		msg = {
			"status": "failed"
		}
		var msgString = JSON.stringify(msg);
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
		res.setHeader("Content-Type", "application/json");
		res.write(msgString)
		res.end();
		return;
	} else {
		var name = req.session.name;
		var id = req.session.xuptId;

		console.log("从session中获取name为:" + name);
		console.log("从session中获取id为:" + id);
		// connection = connectDB();
		var querySql = "SELECT * FROM user where id = " + req.session.xuptId;
		connection.query(querySql, function (error, results, field) {
			// sql查询出错错误处理
			if (error) {
				console.log("查询发生错误！");
				console.log(error);
			}

			// results为空，查无此人
			if (results == "") {
				var msg = {
					"status": "faild",
					"error": "none_exist_user"
				}
				var msgString = JSON.stringify(msg);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
				res.setHeader("Content-Type", "application/json");
				res.send(msgString)

				// connection.end();

				return;
				// 验证成功
			} else {
				var msg = {
					"status": "success",
					"name": results[0].name
				}
				var msgString = JSON.stringify(msg);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
				res.setHeader("Content-Type", "application/json");
				res.write(msgString)
				res.end();

				// connection.end();

				return;
			}
		})
	}
});


// 登录的设置
app.post('/login', function (req, res) {
	// 获取post数据
	var data = [];
	for (var i in req.body) {
		data.push(i);
	}
	var dataObj = JSON.parse(data[0]);
	console.log("dataObj数据ID数据为：" + dataObj.loginId);
	// 查询该用户是否存在

	// connection = connectDB();

	var querySql = "SELECT * FROM user where id = " + "\"" + dataObj.loginId + "\"";
	connection.query(querySql, function (error, results, field) {
		// sql查询出错错误处理
		if (error) {
			console.log("查询发生错误！");
			console.log(error);
		}

		// 检查results中内容
		console.log("results中内容：");
		console.log("results是否等于空" + (results == ""));
		console.log("typeof results = " + typeof (results))

		// results为空，查无此人
		if (results == "") {
			var msg = {
				"status": "faild",
				"error": "none_exist_user"
			}
			var msgString = JSON.stringify(msg);
			res.setHeader("Access-Control-Allow-Credentials", true);
			res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
			res.setHeader("Content-Type", "application/json");
			res.send(msgString)

			// connection.end();
			// 密码输入不正确
		} else if (results[0].password != dataObj.loginPassword) {
			console.log("dataObj.inputPassword = " + dataObj.loginPassword);
			var msg = {
				"status": "faild",
				"error": "wrong_password"
			}
			var msgString = JSON.stringify(msg);
			res.setHeader("Access-Control-Allow-Credentials", true);
			res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
			res.setHeader("Content-Type", "application/json");
			res.send(msgString)

			// connection.end();
			return;
			// 验证成功
		} else {
			var msg = {
				"status": "success",
			}
			// 设置session
			req.session.name = results[0].name;
			req.session.xuptId = results[0].id;

			var msgString = JSON.stringify(msg);
			res.setHeader("Access-Control-Allow-Credentials", true);
			res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
			res.setHeader("Content-Type", "application/json");
			res.send(msgString)

			// connection.end();

			return;
		}
	})
})

// 登出操作
app.get("/logout", function (req, res) {
	delete req.session.name;
	delete req.session.xuptId;
	// console.log(req.session.name);
	// console.log(req.session.xuptId);
	console.dir("session.name还存在吗？" + req.session.name);

	var msg = {
		"status": "success"
	}

	var msgString = JSON.stringify(msg);
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
	res.setHeader("Content-Type", "application/json");
	res.send(msgString);
	return;
})

// 注册的设置
app.post('/register', function (req, res) {
	register.register(req, res,connection);
	console.log("register执行结束")
})

app.post('/updateInformation', function (req, res) {
	console.log("/getInformation req.session =");
	console.log(req.session)
	console.log("开始获取更新信息。。。。。。。。。。。")
	var msg;
	console.log("req.session.name = " + req.session.name);
	// 如果该用户不带有session，直接返回，不可更新数据
	if (!req.session.name || req.session.name == "undefined") {
		msg = {
			"status": "failed"
		}
		var msgString = JSON.stringify(msg);
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
		res.setHeader("Content-Type", "application/json");
		res.write(msgString);
		res.end();
		return;
		// 用户存在
	} else {
		var name = req.session.name;
		var id = req.session.xuptId;

		console.log("从session中获取name为:" + name);
		console.log("从session中获取id为:" + id);
		// connection = connectDB();
		var querySql = "SELECT * FROM user where id = " + req.session.xuptId;
		connection.query(querySql, function (error, results, field) {
			// sql查询出错错误处理
			if (error) {
				console.log("查询发生错误！");
				console.log(error);
			}

			// results为空，查无此人
			if (results == "") {
				var msg = {
					"status": "faild",
					"error": "none_exist_user"
				}
				var msgString = JSON.stringify(msg);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
				res.setHeader("Content-Type", "application/json");
				res.write(msgString);
				res.end()

				return;
				// 查询到该用户，进行数据更新
			} else {
				// 获取post数据
				var data = [];
				for (var i in req.body) {
					data.push(i);
				}
				var dataObj = JSON.parse(data[0]);
				console.log("dataObj数据ID数据为：" + dataObj.loginId);

				// 组成查询字符串
				var updateSql = "UPDATE user SET ";
				var whereis = " where id = " + id;
				if(dataObj.resume){
					console.log("dataObj.resume为真");
				}else{
					console.log("dataObj.resume为假");
				}
				console.log("dataObj.resume =? "+(dataObj.resume))
				console.log("dataObj.resume ==\"\"? "+(dataObj.sex == ""))
				console.log("dataObj.resume ==\"undefined\"? "+(dataObj.sex == "undefined"))


				if (dataObj.sex) {
					updateSql = updateSql + "`sex` = \"" + dataObj.sex + "\", ";
				}
				if (dataObj.resume) {
					updateSql = updateSql + "`resume` = \"" + dataObj.resume + "\", ";
				}
				if (dataObj.phone) {
					updateSql = updateSql + "`phone` = \"" + dataObj.phone + "\", ";
				}
				if (dataObj.qq) {
					updateSql = updateSql + "`qq` = \"" + dataObj.qq + "\", ";
				}
				if (dataObj.wx) {
					updateSql = updateSql + "`wx` = \"" + dataObj.wx + "\", ";
				}
				if (dataObj.address) {
					updateSql = updateSql + "`address` = \"" + dataObj.address + "\", ";
				}

				updateSql = updateSql.substr(0,updateSql.length-2) + whereis;
				var querySql = ";SELECT * FROM user where id = "+id;
				updateSql = updateSql+querySql;
				
				console.log("updateSql = "+updateSql);

				connection.query(updateSql, function (error, results, field) {
					// sql查询出错错误处理
					if (error) {
						console.log("查询发生错误！");
						console.log(error);
					}

					// 直接返回数据然后渲染，少几次请求
					console.log("results");
					console.dir(results);
					console.log("results[0].dir:");
					console.dir(results[0]);
					console.log("results[1]");
					console.dir(results[1]);

					console.log("results[1].name = "+results[1][0].name);
					var msg = {
						"status": "success",
						"name": results[1][0].name,
						"id": results[1][0].id,
						"sex": results[1][0].sex,
						"phone": results[1][0].phone,
						"qq": results[1][0].qq,
						"wx": results[1][0].wx,
						"address": results[1][0].address,
						"resume": results[1][0].resume
					}
					var msgString = JSON.stringify(msg);
					res.setHeader("Access-Control-Allow-Credentials", true);
					res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
					res.setHeader("Content-Type", "application/json");
					res.write(msgString);
					res.end()
					return;
				})
			}
		})
	}
});

// 获取个人信息
app.get('/getInformation', function (req, res) {
	console.log("/getInformation开始执行................................")
	console.log("/getInformation req.session =");
	console.log(req.session)
	var msg;
	console.log("/getInformation req.session.name = " + req.session.name);
	// 如果该用户不带有session，直接返回
	var msg;
	if (!req.session.name || req.session.name == "undefined") {
		msg = {
			"status": "failed"
		}
		var msgString = JSON.stringify(msg);
		res.setHeader("Access-Control-Allow-Credentials", true);
		res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
		res.setHeader("Content-Type", "application/json");
		res.write(msgString)
		res.end();
		return;
	} else {
		var name = req.session.name;
		var id = req.session.xuptId;

		console.log("从session中获取name为:" + name);
		console.log("从session中获取id为:" + id);
		// connection = connectDB();
		var querySql = "SELECT * FROM user where id = " + req.session.xuptId;
		connection.query(querySql, function (error, results, field) {
			// sql查询出错错误处理
			if (error) {
				console.log("查询发生错误！");
				console.log(error);
			}

			// results为空，查无此人
			if (results == "") {
				var msg = {
					"status": "faild",
					"error": "none_exist_user"
				}
				var msgString = JSON.stringify(msg);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
				res.setHeader("Content-Type", "application/json");
				res.write(msgString);
				res.end()

				return;
				// 验证成功
			} else {
				var msg = {
					"status": "success",
					"name": results[0].name,
					"id": results[0].id,
					"sex": results[0].sex,
					"phone": results[0].phone,
					"qq": results[0].qq,
					"wx": results[0].wx,
					"address": results[0].address,
					"resume": results[0].resume
				}
				var msgString = JSON.stringify(msg);
				res.setHeader("Access-Control-Allow-Credentials", true);
				res.setHeader("Access-Control-Allow-Origin", "http://www.ewinds.pw:8888");
				res.setHeader("Content-Type", "application/json");
				res.write(msgString)
				res.end();
				return;
			}
		})
	}
})

// 进行计数
app.get("/count", function (req, res) {
	countVisit.countVisit(req, res);
})

// 更改个人信息


// 启动服务器，监听请求
var server = app.listen(8888, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
const mysql = require("mysql");


// 注册程序
function register(request, response) {

    var msg;
    // 查看session
    console.log("request.session.id = " + request.session.id);

    var data = [];
	for (var i in request.body) {
		data.push(i);
	}

    var dataString = data[0];
    dataObject = JSON.parse(dataString);

    // 检测接收数据内容
    console.log("dataString = " + dataString);
    console.log("typeof dataString = " + typeof (dataString));
    console.log("dataObject = " + dataObject);
    console.log("typeof dataObject = " + typeof (dataObject));

    // 获取json数据
    var user = dataObject.inputName;
    var pw = dataObject.inputPassword;
    var phoneNumber = dataObject.inputPhoneNumber;
    var xuptId = dataObject.inputXuptId;
    var sex = dataObject.inputSex;

    // 建立数据库连接对象
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'xupt_go',
        port: 3308
    })

    // 连接数据库
    connection.connect(function (err) {
        if (err) {
            console.log("连接数据库失败！")
            console.log(err);
        } else {
            console.log("成功连接数据库！");
        }
    })

    // 检查用户是否已存在
    var querySql = "SELECT * FROM user where id = " + xuptId + " or name = \"" + user + "\"";
    connection.query(querySql, function (error, results, field) {

        // sql查询出错错误处理
        if (error) {
            console.log("查询发生错误！");
            console.log(error);
        }

        // results中内容
        console.log("results中内容：");
        console.log("results是否等于空" + (results == ""));
        console.log("typeof results = " + typeof (results))

        // 用户不存在     
        if (results == "") {
            console.log("用户不存在，可以注册！准备开始注册....");
            var insertSql = "INSERT INTO `user` (`name`, `password`, `sex`, `phone`, `id`) VALUES ('" + user + "', '" + pw + "', '" + sex + "', '" + phoneNumber + "', '" + xuptId + "')"

            connection.query(insertSql, function (error, results, field) {
                // sql查询出错错误处理
                console.log("执行插入结束！");
                if (error) {
                    console.log("插入发生错误！");
                    console.log(error);
                } else {
                    console.log("插入成功！");
                    msg = {
                        "status": "success",
                        "user": user
                    }

                    // 响应数据
                    console.log("准备响应数据")

                    // 设置session
                    request.session.name = user;
                    request.session.xuptId = xuptId;

                    console.log("req.session.id = "+request.session.xuptId);

                    msgString = JSON.stringify(msg);
                    response.writeHead(200, {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    })

                    response.write(msgString);
                    response.end();
                    
                    // 响应结束，关闭数据库
                    console.log("响应结束，关闭数据库");
                    connection.end();
                    return;
                }
            })
            // 用户已存在
        } else {
            console.log("用户/学号已存在！");
            console.log("results[0] : " + results[0].name);
            if (results[0].name == user) {
                msg = {
                    "status": "faild",
                    "error": "user_exist"
                }
            } else {
                msg = {
                    "status": "faild",
                    "error": "id_exist"
                }
            }

            // 响应数据
            console.log("准备响应数据")
            msgString = JSON.stringify(msg);
            response.writeHead(200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            })

            response.write(msgString);
            response.end();

            connection.end();
            return;
        }
    });
}

exports.register = register;
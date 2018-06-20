$(document).ready(function () {
    // 自动执行count函数
    checkStatus();
    count();
});

isindex = 0;
visitor = "";

// ----------------------------------------------------------
// 页面计数
// ----------------------------------------------------------

function count() {
    var htmlObj = $.ajax({
        url: "http://127.0.0.1:8888/count",
        contentType: "application/x-www-form-urlencoded",
        type: "get",
        datatype: "jsonp",
        jsonp: "callback",
        success: function (msg) {
            console.log(msg.status);
            if (msg.status == "success") {
                console.log(msg);
                $("#visit-count").text(msg.count);
            }
            console.log("请求成功！");
        },
        error: function (msg) {
            console.log("请求失败！");
        }
    })
}


// ----------------------------------------------------------
// 检测当前用户是否已登录
// ----------------------------------------------------------

function checkStatus() {
    var htmlObj = $.ajax({
        url: "http://localhost:8888/checkStatus",
        contentType: "application/x-www-form-urlencoded",
        type: "get",
        datatype: "jsonp",
        jsonp: "callback",
        success: function (msg) {
            if (msg.status == "success") {
                // 如果状态为已登录
                // 更改登录/注册按钮
                $("#userSign").children().remove();
                $("#userSign").append(`<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">欢迎回来<b class="caret"></b>
                </a><ul class="dropdown-menu" aria-labelledby="dropdownMenu5"><li><a href="./information.html" >个人信息</a>
                    </li><li><a href="javascript:void(0);" onclick="return userLogout()" id="userLogout">注销登录</a></li></ul>`);
                // $("#userLogout").click(userLogout);

                // 当前用户名注册
                visitor = msg.name;
            } else {
                $("#userSign").append(`<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">登录/注册<b class="caret"></b>
            </a><ul class="dropdown-menu" aria-labelledby="dropdownMenu5"><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Login">登录</a>
                </li><li><a href="javascript:void(0);" data-toggle="modal" data-target="#Register">注册</a></li></ul>`)
                $("#toRegist").click(clickRegist);
                $("#toLogin").click(clickLogin);
                // do something?添加登录/注册 按钮
            }
            console.log("请求成功！");
        },
        error: function (msg) {
            console.log("请求失败！");
        }
    });
}


// ----------------------------------------------------------
// 注册
// ----------------------------------------------------------

// 获取注册信息
function registInformation() {
    var elements = new Object();
    elements["inputName"] = $("#inputName").val();
    elements["inputPassword"] = $("#inputPassword").val();
    elements["inputPhoneNumber"] = $("#inputPhoneNumber").val();
    elements["inputXuptId"] = $("#inputXuptId").val();
    if ($("#sexMan").is(':checked')) {
        elements["inputSex"] = "m";
    } else {
        elements["inputSex"] = "wm";
    }
    return elements;
}

// 注册信息检测
function checkRegist() {
    // 如果存在错误框，先把错误关掉
    if ($("#registError").length > 0) {
        $("#registError").alert("close");
    }

    // 检测信息的正则表达式
    var regPhone = /^[\d]{11}$/;
    var regXuptId = /^[\d]{8}$/;

    // 信息是否存在检测
    if ($("#inputName").val() == "") {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>请把你的姓名告诉我</div>")
        return 0;
    } else if ($("#inputPassword").val() == "") {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>你需要一个密码来登录你的账号</div>")
        return 0;
    } else if ($("#inputConfirmPassword").val() == "") {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>你需要重新输入密码，以确保没有输入错误</div>")
        return 0;
    } else if ($("#inputPassword").val() != $("#inputConfirmPassword").val()) {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>两次输入的密码不一致，请重新输入</div>")
    }
    else if ($("#inputPhoneNumber").val() == "") {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>请输入您的电话号码，方便购物时对方联系您~</div>")
        return 0;
    } else if ($("#inputXuptId").val() == "") {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>请输入西邮学号，确保您是西邮的学生~</div>");
        return 0;
    } else if (!regPhone.test($("#inputPhoneNumber").val())) {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>电话格式有误，请检查电话号码是否输入正确~</div>");
        return 0;
    } else if (!regXuptId.test($("#inputXuptId").val())) {
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>学号格式有误，请检查学号是否输入正确~</div>");
        return 0;
    }
    return 1;
}

// "注册"点击事件
function clickRegist() {
    // 获取注册信息
    var reginfObj = registInformation();
    var reginfStr = JSON.stringify(reginfObj);

    // 进行检测
    var check = checkRegist();

    console.log(reginfStr);
    // 进行ajax请求
    if (check == 1) {
        var htmlObj = $.ajax({
            url: "http://localhost:8888/register",
            data: reginfStr,
            contentType: "application/x-www-form-urlencoded",
            type: "post",
            datatype: "jsonp",
            jsonp: "callback",
            success: function (msg) {
                if (msg.status == "success") {
                    // 关闭错误框
                    if ($("#registError").length > 0) {
                        $("#registError").alert("close");
                    }

                    // 提示注册成功信息
                    $("#registModalContent .modal-footer").after("<div id=\"regisError\" class=\" alert alert-warning alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册成功！</strong>将于<span id=\"refresh-page-time\">3</span>s后跳转至当前页面！(ง •_•)ง </div>");
                    // 页面跳转
                    skip();
                } else {
                    if (msg.error == "id_exist") {
                        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>该学号已存在！</div>");
                    } else {
                        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>该姓名已存在！</div>");
                    }
                    // 执行dom操作
                }
                console.log("请求成功！");
            },
            error: function (msg) {
                console.log("请求失败！");
            }
        })
        console.log("成功请求，内容为：" + htmlObj)
    } else {
        return;
    }
}

// ----------------------------------------------------------
// 登录
// ----------------------------------------------------------

// 获得登录信息 
function loginInformation() {
    var elements = {
        "loginId": $("#loginId").val(),
        "loginPassword": $("#loginPassword").val(),
    };

    return elements;
}

// 登录检测
function checkLogin() {
    console.log("执行登录检测")

    // 关闭已存在错误框
    if ($("#loginError").length > 0) {
        $("#loginError").alert("close");
    }

    // 检测当前错误
    if ($("#loginId").val() == "") {
        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>请把你的学号告诉我(,,•́ . •̀,,)</div>")
        return 0;
    } else if ($("#loginPassword").val() == "") {
        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>我需要你的密码才能验证你的身份(,,•́ . •̀,,)</div>")
        return 0;
    }

    return 1;
}

// "登录"点击事件
function clickLogin() {
    // 获取登录信息
    var loginfObj = loginInformation();
    var loginfStr = JSON.stringify(loginfObj);
    console.log(loginfStr);

    var check = checkLogin();

    // 进行ajax请求
    if (check == 1) {
        var htmlObj = $.ajax({
            url: "http://localhost:8888/login",
            data: loginfStr,
            contentType: "application/x-www-form-urlencoded",
            type: "post",
            datatype: "jsonp",
            jsonp: "callback",
            success: function (msg) {
                if (msg.status == "success") {
                    // 关闭错误提示框
                    if ($("#loginError").length > 0) {
                        $("#loginError").alert("close");
                    }

                    // 显示登录成功信息
                    $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\" alert alert-warning alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录成功！</strong>将于<span id=\"refresh-page-time\">3</span>s后跳转至当前页面！(ง •_•)ง </div>");
                    // 页面跳转
                    skip();
                } else {
                    if (msg.error == "none_exist_user") {
                        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>该用户不存在！(,,•́ . •̀,,)</div>");
                    } else {
                        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>密码错误！(,,•́ . •̀,,)</div>");
                    }
                }
                console.log("请求成功！");
            },
            error: function (msg) {
                console.log("请求失败！");
            }
        })
        console.log("成功请求，内容为：" + htmlObj)
    } else {
        return;
    }
}

function skip() {
    var time = 2;
    var timer = setInterval(function () {
        if (time != 0) {
            $("#refresh-page-time").text(time);
            console.log(time)
            time--;
        } else {
            window.location.href = window.location.href;
            window.event.returnValue=false; 
            clearInterval(timer);
            console.log("已执行清除")
            return true;
        }
        console.log("仍在执行");
    }, 1000);
}


// ----------------------------------------------------------
// 登出操作
// ----------------------------------------------------------

function userLogout() {
    var htmlObj = $.ajax({
        url: "http://localhost:8888/logout",
        contentType: "application/x-www-form-urlencoded",
        type: "get",
        datatype: "jsonp",
        jsonp: "callback",
        
        success: function (msg) {
            window.location.href = window.location.href;
            window.event.returnValue=false; 
            return true;
        },
        error: function (msg) {
            console.log("请求失败！");
        }
    })
    console.log("成功请求，内容为：" + htmlObj)
    return false;
}
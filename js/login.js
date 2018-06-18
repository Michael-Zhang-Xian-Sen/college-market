$(document).ready(function () {
    $("#toRegist").click(clickRegist);
    $("#toLogin").click(clickLogin);
});

isindex = 1;
visitor = "";

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
    }else if(!regPhone.test($("#inputPhoneNumber").val())){
        $("#registModalContent .modal-footer").after("<div id=\"registError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>注册失败！</strong>电话格式有误，请检查电话号码是否输入正确~</div>");
        return 0;
    }else if(!regXuptId.test($("#inputXuptId").val())){
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
        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>请把你的学号告诉我</div>")
        return 0;
    } else if ($("#loginPassword").val() == "") {
        $("#loginModalContent .modal-footer").after("<div id=\"loginError\" class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>登录失败！</strong>我需要你的密码才能验证你的身份</div>")
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
            url: "http://127.0.0.1:8888/login",
            data: loginfStr,
            contentType: "application/x-www-form-urlencoded",
            type: "post",
            datatype: "jsonp",
            jsonp: "callback",
            success: function (msg) {
                console.log(msg.status);
                if (msg.status == "success") {
                    $.cookie('id', );
                }
                console.log("请求成功！");
            },
            error: function (msg) {
                console.log("请求失败！");
            }
        })
        console.log("成功请求，内容为：" + htmlObj)
    }
}
$(document).ready(function(){
    $("#toRegist").click(function(){
        var reginfObj = registInformation();
        var reginfStr = JSON.stringify(reginfObj);
        var htmlObj = $.ajax({
            url:"http://192.168.43.90:8080/CD1/user/userRegister.do",
            data: reginfStr,
            contentType:"application/x-www-form-urlencoded",
            type:"post",
            datatype:"jsonp",
            jsonp:"callback",
            success:function(msg){
                console.log("请求成功！");
            },
            error:function(msg){
                console.log("请求失败！");
            }
        })
        console.log("成功请求，内容为："+htmlObj)
    })
    $("#toLogin").click(function(){
        var loginfObj = loginInformation();
        var loginfStr = JSON.stringify(loginfObj);
        console.log(loginfStr);
        var htmlObj = $.ajax({
            url:"http://192.168.43.90:8080/CD1/user/userRegister.do",
            data: loginfStr,
            contentType:"application/x-www-form-urlencoded",
            type:"post",
            datatype:"jsonp",
            jsonp:"callback",
            success:function(msg){
                console.log("请求成功！");
            },
            error:function(msg){
                console.log("请求失败！");
            }
        })
        console.log("成功请求，内容为："+htmlObj)
    })
});

// 获取注册信息
function registInformation(){
    var elements = new Object();
    elements["inputName"] = $("#inputName").val();
    elements["inputPassword"] = $("#inputPassword").val();
    elements["inputPhoneNumber"] = $("#inputPhoneNumber").val();
    elements["inputXuptId"] = $("#inputXuptId").val();

    return elements;
}

// 获得登录信息 
function loginInformation(){
    var elements = {
        "loginName": $("#loginName").val(),
        "loginPassword": $("#loginPassword").val(),
    };

    return elements;
}
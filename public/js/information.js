$(document).ready(function () {
    // 向后台获取信息
    getInformation();
    $("#update-information-button").click(updateInformation);
})

// 获取个人信息
function getInformation() {
    var htmlObj = $.ajax({
        url: "http://182.254.134.194:8888/getInformation",
        contentType: "application/x-www-form-urlencoded",
        type: "get",
        xhrFields:{
            withCredentials:true
        }, 
        datatype: "jsonp",
        jsonp: "callback",
        success: function (msg) {
            console.log(msg.status);
            if (msg.status == "success") {
                console.log("获取个人信息成功");
                // 如果成功，通过dom操作则显示个人信息
                $("#user-profile-name").text(msg.name);
                $("#user-profile-id").text(msg.id);
                $("#user-resume").text(msg.resume);
                if (msg.sex == "m") {
                    $("#user-sex-box").append(`<i class="fa fa-mars fa-2x" aria-hidden="true"></i> <span class="user-sex">Mars</span>`);
                } else {
                    $("#user-sex-box").append(`<i class="fa fa-venus fa-2x" aria-hidden="true"></i> <span class="user-sex">Venus</span>`);
                }
                $("#user-profile-mobile").text(msg.phone);
                $("#user-profile-qq").text(msg.qq);
                $("#user-profile-wx").text(msg.wx);
                $("#user-profile-address").text(msg.address);
                $("#user-profile-deal").text("暂无");
                console.log(msg);
            } else {
                console.log("获取个人信息失败");
                // 如果失败，通过dom操作则显示个人信息
                $("#user-profile-name").text("请登录");
                $("#user-profile-id").text("请登录");
                $("#user-resume").text("请登录");
                $("#user-sex-box").append(`<i class="fa fa-neuter fa-2x" aria-hidden="true"></i> <span class="user-sex">Neuter</span>`);
                $("#user-profile-mobile").text("请登录");
                $("#user-profile-qq").text("请登录");
                $("#user-profile-wx").text("请登录");
                $("#user-profile-address").text("请登录");
                $("#user-profile-deal").text("暂无");
                console.log(msg);
                // 如果失败，则默认填充：请先登录
            }
            return true;
        },
        error: function (msg) {
            console.log("请求失败！");
        }
    })
    console.log("成功请求，内容为：" + htmlObj)
    return false;
}

// 判断性别
function pendingSex() {
    if ($("#sexManUpdate").is(':checked')) {
        return "m";
    } else {
        return "wm";
    }
}

// 更新个人信息
function updateInformation() {
    // 后台通过id确认用户，若id不正确则返回没登录
    var dataObject = {
        "resume": $("#personal-resume").val(),
        "sex": pendingSex(),
        "phone": $("#phoneNumberUpdate").val(),
        "qq": $("#qqNumberUpdate").val(),
        "wx": $("#wxNumberUpdate").val(),
        "address": $("#addressUpdate").val()
    }
    dataString = JSON.stringify(dataObject);

    var htmlObj = $.ajax({
        url: "http://182.254.134.194:8888/updateInformation",
        contentType: "application/x-www-form-urlencoded",
        type: "post",
        xhrFields:{
            withCredentials:true
        }, 
        data: dataString,
        datatype: "jsonp",
        jsonp: "callback",
        success: function (msg) {
            console.log(msg.status);
            if (msg.status == "success") {
                console.log("更改个人信息成功");
                $("#updateModalContent .modal-footer").after("<div id=\"upadteError\" class=\" alert alert-warning alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>更改成功！</strong>将于<span id=\"refresh-page-time\">3</span>s后关闭当前模态框！(ง •_•)ง </div>");
                // 更改个人信息
                console.log("msg内容为：")
                console.dir(msg);
                $("#user-profile-name").text(msg.name);
                $("#user-profile-id").text(msg.id);
                $("#user-resume").text(msg.resume);
                $("#user-sex-box").children().remove();
                if (msg.sex == "m") {
                    $("#user-sex-box").append(`<i class="fa fa-mars fa-2x" aria-hidden="true"></i> <span class="user-sex">Mars</span>`);
                } else {
                    $("#user-sex-box").append(`<i class="fa fa-venus fa-2x" aria-hidden="true"></i> <span class="user-sex">Venus</span>`);
                }
                $("#user-profile-mobile").text(msg.phone);
                $("#user-profile-qq").text(msg.qq);
                $("#user-profile-wx").text(msg.wx);
                $("#user-profile-address").text(msg.address);
                $("#user-profile-deal").text("暂无");
                // 关闭模态框
                closeModal("update-information");
            } else {
                console.log("更改个人信息失败");
                $("#updateModalContent .modal-footer").after("<div id=\"updateError\" class=\" alert alert-error alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button><strong>更改失败！</strong>请先登录(,,•́ . •̀,,)</div>");
            }
            return true;
        },
        error: function (msg) {
            console.log("请求失败！");
        }
    })
    console.log("成功请求，内容为：" + htmlObj)
    return false;
}

function closeModal(name){
    var time = 2;
    var timer = setInterval(function () {
        if (time != 0) {
            $("#refresh-page-time").text(time);
            console.log(time)
            time--;
        } else {
            $("#"+name).modal("hide");
            clearInterval(timer);
            console.log("已执行清除")
            return true;
        }
        console.log("仍在执行");
    }, 1000);
}
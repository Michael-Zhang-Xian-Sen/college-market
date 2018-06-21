$(document).ready(function () {
    // 向后台获取信息
    getInformation();
})

function getInformation() {
    var htmlObj = $.ajax({
        url: "http://localhost:8888/getInformation",
        contentType: "application/x-www-form-urlencoded",
        type: "get",
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
                    $("#user-sex-box").append(`<i class="fa fa-neuter fa-2x" aria-hidden="true"></i> <span class="user-sex">Neuter</span>`);
                }
                $("#user-profile-mobile").text(msg.phone);
                $("#uesr-profile-qq").text(msg.qq);
                $("#uesr-profile-wx").text(msg.wx);
                $("#uesr-profile-address").text(msg.address);
                $("#uesr-profile-deal").text("暂无");
                console.log(msg);
            } else {
                console.log("获取个人信息失败");
                // 如果失败，通过dom操作则显示个人信息
                $("#user-profile-name").text("请登录");
                $("#user-profile-id").text("请登录");
                $("#user-resume").text("请登录");
                if (msg.sex == "m") {
                    $("#user-sex-box").apppend(`<i class="fa fa-mars fa-2x" aria-hidden="true"></i> <span class="user-sex">Mars</span>`);
                } else {
                    $("#user-sex-girl").apppend(`<i class="fa fa-neuter fa-2x" aria-hidden="true"></i> <span class="user-sex">Neuter</span>`);
                }
                $("#user-profile-mobile").text("请登录");
                $("#uesr-profile-qq").text("请登录");
                $("#uesr-profile-wx").text("请登录");
                $("#uesr-profile-address").text("请登录");
                $("#uesr-profile-deal").text("暂无");
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


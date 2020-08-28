var start_time = new Date(); 
var end_time = "";          
var t = setInterval(function () {           
    if (document.readyState == "complete") { complete(); }
}, 10)

function complete() {
    end_time = new Date();
    $("#visit-time").text((end_time.getTime() - start_time.getTime())+"ms");
    clearInterval(t);
}

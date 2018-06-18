function route(handle,pathName,request,response){
    console.log("请求path为： "+pathName);
    
    // 如果针对该请求的处理函数存在
    if(typeof handle[pathName] === 'function'){
        return handle[pathName](request,response,pathName);
    // 缺少处理函数
    }else{
        console.log("No request handler found for "+pathName);
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 NOT FOUND!");
        response.end();
    }
}

exports.route = route;
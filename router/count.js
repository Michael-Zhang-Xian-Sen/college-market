var count = 0;

function countVisit(req, res) {
    var msg = {
        "status": "success",
        "count": ++count
    }
    res.writeHead(200, {
        "Access-Control-Allow-Credentials":true,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://www.ewinds.pw:8888"
    })

    msgString = JSON.stringify(msg);
    res.write(msgString);
    res.end();
}

exports.countVisit = countVisit;
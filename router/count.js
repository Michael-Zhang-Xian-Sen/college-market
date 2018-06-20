var count = 0;

function countVisit(req, res) {
    var msg = {
        "status": "success",
        "count": ++count
    }
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    })

    msgString = JSON.stringify(msg);
    res.write(msgString);
    res.end();
}

exports.countVisit = countVisit;
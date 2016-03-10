var http = require('http');

exports = module.exports = {};

exports.doHttpRequest = function (options, data, callback, action) {
    var req = http.request(options, function(res) {
        var buffer = [];

        res.on('data', function(chunk) {
            buffer.push(chunk);
        });
        res.on('end', function() {
            var msg = Buffer.concat(buffer);
            //console.log("Message:" + msg);
            callback(msg, action);
        });
    });
    req.write(data);
    req.end();
};



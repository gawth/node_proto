var ProtoBuf = require('protocol-buffers');
var httpUtil = require('./httpUtil.js');
var fs = require('fs');

var messages = ProtoBuf(fs.readFileSync("/Users/alan/dev/go/src/github.com/gawth/proto_test/hotel.proto"));

var data = JSON.stringify({});
var options = {
    host: 'provider-data-dev',
    port: '80',
    path: '/v3/retrievePBByHotelId',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-protobuf'
    }
};


var handleResults = function(results, action) {
    var tmp = messages.HotelDetailsResponseModel.decode(results);
    if (action) { action(tmp); }
    return tmp;
};

var action = function(data) {
    console.log(data);
};

var getHotelData = function() {
    return httpUtil.doHttpRequest(options, data, handleResults, action);
};

module.exports = {
    getHotelData: getHotelData,
    handleResults: handleResults
};



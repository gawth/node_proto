var ProtoBuf = require('protocol-buffers');
var httpUtil = require('./httpUtil.js');
var fs = require('fs');

var messages = ProtoBuf(fs.readFileSync("./hotel-proto/hotel.proto"));

var data = JSON.stringify({});
var options = {
    host: '10.211.55.3',
    port: '8888',
    path: '/testprotobuf',
    method: 'GET',
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



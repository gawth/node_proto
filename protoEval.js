var ProtoBuf = require('protobufjs');
var httpUtil = require('./httpUtil.js');

var builder = ProtoBuf.loadProtoFile("/Users/alan/dev/go/src/github.com/gawth/proto_test/hotel.proto");
var Hotels = builder.build("proto.hotel");
var HotelDetailsResponseModel = Hotels.HotelDetailsResponseModel;
var Hotel = Hotels.Hotel;

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
    var tmp = HotelDetailsResponseModel.decode(results);
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



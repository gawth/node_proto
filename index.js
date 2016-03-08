var ProtoBuf = require('protobufjs');
var http = require('http');

var builder = ProtoBuf.loadProtoFile("/Users/alan/dev/go/src/github.com/gawth/proto_test/hotel.proto");
var Hotels = builder.build("proto.hotel");
var HotelDetailsResponseModel = Hotels.HotelDetailsResponseModel;
var Hotel = Hotels.Hotel;

//var tmp = new Hotel({"Hotel":{"id":"1"}});

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

var req = http.request(options, function(res) {
    var msg = '';

    res.on('data', function(chunk) {
        msg += chunk;
    });
    res.on('end', function() {
        console.log(msg);
        var decodedMsg = HotelDetailsResponseModel.decode(msg);
        console.log(decodedMsg);
    });
});

req.write(data);
req.end();



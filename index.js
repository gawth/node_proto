var pbHotel = require('./protoEval.js');
var jsHotel = require('./jsonEval.js');
var mq = require('./mq.js');



//pbHotel.getHotelData();

//jsHotel.getHotelData();

mq.sendzmq("protobuf");

var httpUtil = require('./httpUtil.js');

var data = JSON.stringify({});
var options = {
    host: 'provider-data-dev',
    port: '80',
    path: '/v3/retrieveByHotelId',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};


var handleResults = function(results, action) {
    var tmp = results.toString('utf8');
    if (action) { action(tmp);}
    return JSON.parse(tmp);
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

var benchmark = require("benchmark");
var proto_target = require("./protoEval.js");
var json_target = require("./jsonEval.js");
var pb2_target = require("./protoV2Eval.js");
var httpUtil = require("./httpUtil.js");

var suite = new benchmark.Suite();

var testdata = JSON.stringify({});
var testPBOptions = {
    host: '10.211.55.3',
    port: '8888',
    path: '/testprotobuf',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-protobuf'
    }
};
var testJsonOptions = {
    host: '10.211.55.3',
    port: '8888',
    path: '/testjson',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

var pbdata = [];
var jsdata = [];
httpUtil.doHttpRequest(testPBOptions, testdata, function(res) {
    pbdata = res;
});
httpUtil.doHttpRequest(testJsonOptions, testdata, function(res) {
    jsdata = res;
});

suite
.add('EndPointProtoBufTest', {
    'defer': true,
    'fn': function(deferred) {
        suite.name;
        httpUtil.doHttpRequest(testPBOptions, testdata, function(res) {
            deferred.resolve();
        });
    }
})
.add('EndPointJsonTest', {
    'defer': true,
    'fn': function(deferred) {
        suite.name;
        httpUtil.doHttpRequest(testJsonOptions, testdata, function(res) {
            deferred.resolve();
        });
    }
})
.add('SerilizationJsonTest', {
    'defer': true,
    'setup': function() {
    },
    'fn': function(deferred) {
        suite.name;
        var converted = json_target.handleResults(jsdata);
        if (typeof converted.Hotels[0].HotelCode != "string") { throw "Return type of serialization test not recognised";}
        deferred.resolve();
    }
})
.add('SerilizationProtoBufTest', {
    'defer': true,
    'setup': function() {
    },
    'fn': function(deferred) {
        suite.name;
        proto_target.handleResults(pbdata);
        deferred.resolve();
    }
})
.add('SerilizationProtoBufV2Test', {
    'defer': true,
    'setup': function() {
    },
    'fn': function(deferred) {
        suite.name;
        pb2_target.handleResults(pbdata);
        deferred.resolve();
    }
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
})
.run({'async': true});



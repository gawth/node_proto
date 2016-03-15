# node_proto
Noddy app that consumes and benchmarks some hard coded endpoints for JSON and Protocol Buffers

This is part of an exercise to trial performance of alternatives to JSON over the wire.  The predominant success criteria is speed.

There are a number of Github repositories:

[Golang benchmark tests and primary write up of results](https://github.com/gawth/go-proto)

[Node.js server implementation](https://github.com/gawth/protosrv)

[.Net server implementation](https://github.com/gawth/proto-service)

[Protocol Buffer schema](https://github.com/gawth/hotel-proto)

[Node.js consumer plus benchmarking](https://github.com/gawth/node_proto)

##Setup
This app's job in life is to hit an end point using a number of different protocols, deserialize the data and then report metrics.

Its all a bit hard coded.  The target server was running on my local VM with an IP address of 10.211.55.3 and is a windows app.

To get up and running you will need to have a server running the app from [.Net server implementation](https://github.com/gawth/proto-service) and then you will need to change the hard coded IP (probably).

Once you have a server somewhere you can run this app using:

1. npm install
2. cd hotel-proto; git submodule init; git submodule update; cd ..
3. node test.js

##What's Going On

This app uses benchmark.js to benchmark various endpoints and protocol deserialization.

Benchmark.js takes care of repeatedly running the test until it is happy that performance is sufficiently settled to get meaningful metrics.

There are a number of tests.  Those that just hit the end point (hence testing the perf of the server and any over the wire time) and then those that actually unpack the message into something useful (hence testing node.js perf when dealing with that type of message).

The following metrics were what the tests reported with my setup:

    EndPointProtoBufTest x 4.52 ops/sec ±5.44% (26 runs sampled)
    EndPointJsonTest x 4.49 ops/sec ±4.59% (26 runs sampled)
    SerilizationJsonTest x 1,771 ops/sec ±8.68% (37 runs sampled)
    SerilizationProtoBufTest x 271 ops/sec ±2.18% (43 runs sampled)
    SerilizationProtoBufV2Test x 1,824 ops/sec ±2.75% (41 runs sampled)

The first two show that the server in this case (a .Net app) was pretty similar in its perf.

The last three show that node.js is marginally faster at unpacking protocol buffers than json...if you pick the right implementation.

[Protocol buffers](https://developers.google.com/protocol-buffers/docs/overview) comes with a number of out of the box implementations but unfortunately none of them are for node.

The two strongest contenders for node.js appear to be [protobuf.js](https://www.npmjs.com/package/protobufjs) and [protocol-buffers](https://www.npmjs.com/package/protocol-buffers).

Both seem to work along similar lines but the second of these (the v2 from the above benchmark) is much faster.

Its entirely possible that protobuf.js is fast and that I've implemented it poorly (certainly tripped over similar issues in the .net world) but on the face of it protocol-buffers looks to be the faster of the two.


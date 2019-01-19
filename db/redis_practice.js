var redis = require("redis"),
    redisClient = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
redisClient.on("error", function (err) {
    console.log("Error " + err);
});
 
redisClient.set(123, JSON.stringify({id: 123}), redis.print);

redisClient.get("missingkey", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});

redisClient.get(123, function(err, result) {console.log(JSON.parse(result))});
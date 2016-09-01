'use strict'

var http = require("https");
var options = require("../config/options.json");

module.exports = {
  send: function(parsedStr, senderID){

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.write(JSON.stringify({ to: [ senderID ],
      toChannel: 1383378250,
      eventType: '138311608800106203',
      content: { contentType: 1, toType: 1, text: parsedStr } }));
    req.end();
  }


};

/*
*** Line API user send msg spec ***

{
  "result":[
    {
      "from": “u2ddf2eb3c959e561f6c9fa2ea732e7eb8”,     // Fixed value
      "fromChannel": “1341301815”,                      // Fixed value
      "to":["string"],                                * // My Bot API server (BAs) Channel MID
      "toChannel": "string",                          * // My BAs Channel ID
      "eventType": “138311609000106303”,                // Received message event data type
      "id": "string",                                   // event unique ID
      "content":{
        "location": null,
        "id": "string",                                 // Identifier of the message
        "contentType":1,                                // msg content type, 1 for text msg
        "from":"userID string",                       * // user MID who send this msg
        "createdTime":"time data",
        "to":["userID string"],                       * // array of users who received the msg
        "toType":1,                                     // 1 for normal user to rcv msg
        "contentMetadata":null,                         // null for none special
        "text":"Hello, BOT API Server!"               * // content text sent to BAs
      }
    }
  ]
}


*/
'use strict';

var jp = require('jsonpath');
var brm = require('./BotRequestMsg.js');
var gcisGet = require('./BotGcisMsg.js');

var parseContent = function(bodyObject) {
  var recieveData = bodyObject.result;
  var senderID = recieveData[0].content.from;
  if( typeof(recieveData[0].content.text) === "string" ){
    if( recieveData[0].content.text.length == 8 && isNaN(parseInt(recieveData[0].content.text)) == false ) {

      var Vatnum = recieveData[0].content.text;
      var rtnObj = {
        "title": "VatDate Return",
        "value": "Data Obj string"
      };

      gcisGet.send(Vatnum, senderID);

    } else {

      var rtnObj = {
        "title": "TruthReturn",
        "value": "String"
      };
      var dataString = recieveData[0].content.text + " > < ";

      brm.send(dataString, senderID);

    }
  } else {
    var rtnObj = {
      "title": "FalseReturn",
      "value": "NaN"
    };
    brm.send('對不起我只能回覆文字訊息 > < ', senderID);
  }
  return rtnObj;
}


module.exports = {
    post: function (con_objId) {
      //console.log(con_objId);
      var r = parseContent(con_objId);
      return r;
    }
};

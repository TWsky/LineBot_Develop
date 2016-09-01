'use strict'

var http = require("http");
var rp = require("request-promise");
var brm  = require("./BotRequestMsg.js");


var parseGcisObg = function(GcisObj) {
    var rtn = JSON.parse(GcisObj);
    console.log(rtn[0]);
    return rtn[0].Company_Name;
};

module.exports = {
  send: function(parsedStr, senderID){
    var vatFilter = "Business_Accounting_NO eq " + parsedStr;
    var vatObjStr = "";

    var option1 = {
      uri: "http://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6",
      qs: {
        $format: "json",
        $filter: vatFilter
      },
      json: true
    };
    var option2 = {
      uri: "http://data.gcis.nat.gov.tw/od/data/api/236EE382-4942-41A9-BD03-CA0709025E7C",
      qs: {
        $format: "json",
        $filter: vatFilter
      },
      json: true
    };


    rp(option1)
      .then(function (repos) {
        vatObjStr = "公司統編：" + repos[0].Business_Accounting_NO + "\n" +
                    "公司名稱：" + repos[0].Company_Name + "\n" +
                    "負責人名稱：" + repos[0].Responsible_Name + "\n" +
                    "公司所在地：" + repos[0].Company_Location + "\n" +
                    "核准設立日期：" + repos[0].Company_Setup_Date + "\n" +
                    "所屬行業別： \n";
        return rp(option2);
      })
      .then(function (repos2) {
        for(var i = 0;i < repos2[0].Cmp_Business.length-1;i++){
          vatObjStr = vatObjStr + "\t\t" + repos2[0].Cmp_Business[i].Business_Item_Desc + "\n";
        }
      })
      .then(response => {
        console.log(vatObjStr);
        brm.send(vatObjStr, senderID);

      })
      .catch(err => console.log(err));

  }

};

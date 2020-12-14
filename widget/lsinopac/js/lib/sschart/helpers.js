/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var defaultPeriods = new Array();
defaultPeriods[0] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1","MINUTE_15":"DAY_2",
    "HOURLY":"DAY_5","DAILY":"MONTH_6","WEEKLY":"YEAR_1",
    "MONTHLY":"YEAR_3","QUARTERLY":"YEAR_10"};
defaultPeriods[1] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1",
    "HOURLY":"DAY_2","DAILY":"MONTH_6","WEEKLY":"YEAR_1",
    "MONTHLY":"YEAR_2"};
defaultPeriods[2] = {"MINUTE_1":"DAY_1","MINUTE_5":"DAY_1","MINUTE_15":"DAY_2",
    "HOURLY":"DAY_5","DAILY":"MONTH_6","WEEKLY":"YEAR_1"};
function updateDefaultPeriod(e)
{
    var it = $("#InstrumentType").val();
    var p = $(e.target).val();
    var m;
    if (it=="JP_STOCK"||it=="ASIA_STOCK"||it=="JP_INDEX"||it=="ASIA_INDEX"||it=="OTHER_INDEX"){
      m = defaultPeriods[0];
    }else if (it=="JP_FOREX"||it=="ASIA_FOREX"){
      m = defaultPeriods[1];
    }else if (it=="FUTURE2"||it=="N225OPTION"||it=="COMMODITY"){
      m = defaultPeriods[2];
    }
    if (m !== undefined){
      $("#"+p).val(m[p]);
    }
}
function searchFocus(id){
    var obj = $("#"+id+" input");
    if (obj.value=="")
        obj.value = "";
    else{
        obj.select();
    }
}
    
function isKeyInAttributes(key){
    var isKeyIn = false;
            try{
                $.each(data, function(i, v){
                    $.each(v["at"], function(k, l){
                        $.each(l, function(o, j){
                            if (key in j){
                                isKeyIn=true;
                                     return false;
                            } 
                        });
                        if (isKeyIn==true) return false;
                    });
                    if (isKeyIn==true) return false;
                });
            }catch(e){
                isKeyIn = false;
            }
    return isKeyIn;
}
function convertKMB(v){
     var value = v;
     if (value >= 1000000000 || value <= -1000000000){
         value = (value/1000000000).toFixed(2) + "B";
     }
     else if (value >= 1000000 || value <= -1000000){
         value = (value/1000000).toFixed(2) + "M";
     }
     else if (value >= 100000 || value <= -100000){
         value = Math.floor(value/1000) + "K";
     }
     return value;
}
function getUrlVarsSpecial()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        //"good_luck_buddy".split(/_(.+)?/)[1]
        var s = hashes[i];
        hash = s.split('=');
        vars.push(hash[0]);
        vars[hash[0]] = s.substring(s.indexOf("=")+1);
    }
    return vars;
}

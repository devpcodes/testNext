//util functions to map value for TA: VAP
function getVAPxyMap(VAPxyMap,data){
    if (VAPxyMap == null){
        VAPxyMap = new Array();
        $.each(data,function(x, y){
            if (x < 71){
                VAPxyMap[ data[x]["y"] ] = x;
            }
        });
    }
    return VAPxyMap;
}
function getVAPSortedys(VAPSortedys,data){
    if (VAPSortedys == null){
        VAPSortedys = new Array();
        $.each(data,function(x, y){
            if (x < 71){
                VAPSortedys.push(data[x]["y"]);
            }
        });
        VAPSortedys = VAPSortedys.sort(function(a,b){
            return a-b;
        });
    }
    return VAPSortedys;    
}
function getVAPValue(nearX, vapI, VAPxyMap,VAPSortedys,data){
    var vapValue = "-";
    try{
        var thisVAPxyMap = getVAPxyMap(VAPxyMap,data);
        var thisVAPSortedys = getVAPSortedys(VAPSortedys,data);
        var nearestY = near(thisVAPSortedys,data[nearX]["y"] );
        for (var i in thisVAPxyMap){
            if (i == nearestY){
                vapValue = data[ thisVAPxyMap[i] ]["at"][1][0][vapI] ;
                break;
            }
        }
    }catch(e){
        //somehow VAP value is not retrievable
        vapValue = "-";
    }
    return vapValue;
}
//util functions for common crosshair movement
function near(array, x){
//    var min = 0;
//    var max = array.length - 1;
//    do{
//        var mid = min + Math.ceil( (max - min) / 2);
//        if(x > array[mid+1]){
//            min = mid + 1;
//        }else if(x < array[mid]){
//            max = mid - 1;
//        }else{
//            return array[mid];
//        }
//    } while( max >= min );
//
//    return array[0];
 
    var left;
    var right;
    for (var i=0; i<array.length; i++){
        if (i == 0){
            left = -1;
            right = (array[1] - array[0])/2 + array[0];
        }else if (i == array.length - 1){
            left = (array[i] - array[i-1]) / 2 + array[i-1];
            right = -1;
        }else{
            left = (array[i] - array[i-1]) / 2 + array[i-1];
            right = (array[i+1] - array[i]) / 2 + array[i];
        }
        if (left < 0){
            if (x <= right)
                return array[i];
        }else if (right < 0){
            if (x > left)
                return array[i];
        }else {
            if (x > left && x <= right)
                return array[i];
        }
    }
}     
function next(array, x){
    var min = 0;
    var max = array.length - 1;
    do{
        var mid = min + Math.ceil( (max - min) / 2);
        if(x > array[mid+1]){
            min = mid + 1;
        }else if(x < array[mid]){
            max = mid - 1;
        }else{
            return array[mid+1];
        }
    } while( max >= min );
    return array[0];
}
//function findNearX(mouseX, data){
//    var nearX = 999999999;
//    var diff =  999999999;
//    $.each(data,function(x,item){
//        if(Math.abs(mouseX - x) < diff){
//            diff = Math.abs(mouseX - x);
//            nearX = x;
//        }
//    });
//    return nearX;
//}
//function setTimerUpdateChart(){
//    if (span=="MINUTE_1"||span=="MINUTE_5"||span=="MINUTE_15"||span=="HOURLY"){
//        if (timerUpdateChart === undefined){
//            timerUpdateChart = setInterval("updateChart()", 60000);
//        }
//    }else{
//        if (timerUpdateChart !== undefined){
//            clearInterval(timerUpdateChart);
//            timerUpdateChart = undefined;
//        }
//    }
//}
// export const websocketService = function () {
//     var solaceLogin, webSocketInit;
//     solaceLogin = function () {
//         var accounts = cookieController.getCookie("accounts");
//         let sendData = btoa(encodeURI(JSON.stringify({
//             'accounts': decodeURIComponent(accounts)
//         })));

//         var loginWsObject = {
//             wsUri: "/Disco/" + sendData,
//             isClose: false,
//             callBack: function (response) {
//                 if (response.data.split(":")[0] === "uuid") { return };
//                 var exp = new Date();    //new Date("December 31, 9998");
//                 exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
//                 console.log(response);
//                 if (response && response.data) {
//                     if (typeof response.data == "object") ReportMsg["info"](response.data);
//                     else ReportMsg["info"]($.parseJSON(response.data));
//                     if ($(".reportRefresh").length >= 1) { $(".reportRefresh").trigger("click") }
//                 }
//             },
//             webSocket: ""
//         };
//         webSocketInit(loginWsObject);
//     };
//     webSocketInit = function (wsObject) {
//         var websocket = new WebSocket(Utility.Solace_Service);
//         websocket.onopen = function (evt) {
//             if (!wsObject.isClose) websocket.send(wsObject.wsUri);
//         }.bind(this);
//         websocket.onclose = function (evt) {
//             console.log("webSocket close");
//             setTimeout(function () {
//                 webSocketInit(wsObject)
//             }, 5000);
//         };
//         websocket.onmessage = function (response) {
//             if (wsObject.isClose) {
//                 websocket.close();
//             } else {
//                 try {
//                     console.log('websocket.onmessage');
//                     wsObject.callBack ?
//                         wsObject.callBack(response) :
//                         console.log("Do not find callBack");
//                 } catch (e) {
//                     console.log('catch', e);
//                     console.warn(response.data);
//                 }
//             }
//         }.bind(this);
//         websocket.onerror = function (response) {
//             console.warn(response);
//         };
//         return websocket
//     };
//     return {
//         solaceLogin
//     };
// };

//TODO 抓TFT
export const webSocketLogin = function (accounts) {
    // var response = {data: '123'}
    // var event = new CustomEvent("webSocketEvent", {
    //     response
    // });
    // window.dispatchEvent(event);
    // var accounts = cookieController.getCookie("accounts");
    let sendData = btoa(
        encodeURI(
            JSON.stringify({
                accounts: decodeURIComponent(accounts),
            }),
        ),
    );

    var loginWsObject = {
        wsUri: '/Disco/' + sendData,
        isClose: false,
        callBack: function (response) {
            if (response.data.split(':')[0] === 'uuid') {
                return;
            }
            var exp = new Date(); //new Date("December 31, 9998");
            exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000);
            console.log('service event============', response);
            // if (response && response.data) {
            //     var event = new CustomEvent('webSocketEvent', {
            //         detail: response.data,
            //     });
            //     window.dispatchEvent(event);
            //     // if (typeof response.data == "object") ReportMsg["info"](response.data);
            //     // else ReportMsg["info"]($.parseJSON(response.data));
            //     // if ($(".reportRefresh").length >= 1) { $(".reportRefresh").trigger("click") }
            // }
        },
        webSocket: '',
    };
    return webSocketInit(loginWsObject);
};

const webSocketInit = function (wsObject) {
    var websocket = new WebSocket(process.env.NEXT_PUBLIC_MQTT_SERVICE);
    websocket.onopen = function (evt) {
        if (!wsObject.isClose) websocket.send(wsObject.wsUri);
    }.bind(this);
    websocket.onclose = function (evt) {
        console.log('webSocket close');
        setTimeout(function () {
            webSocketInit(wsObject);
        }, 5000);
    };
    websocket.onmessage = function (response) {
        if (wsObject.isClose) {
            websocket.close();
        } else {
            try {
                console.log('websocket.onmessage');
                wsObject.callBack ? wsObject.callBack(response) : console.log('Do not find callBack');
            } catch (e) {
                console.log('catch', e);
                console.warn(response.data);
            }
        }
    }.bind(this);
    websocket.onerror = function (response) {
        console.warn(response);
    };
    return websocket;
};

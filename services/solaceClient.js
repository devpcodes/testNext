import MD5 from 'crypto-js/md5';

export const solaceClient = function (solaceName, userId) {
    var subscriber = {};
    var timer;
    var messageEvent = {};
    var factoryProps = new solace.SolclientFactoryProperties();
    var idNo = userId;
    var token = MD5(+new Date() + '').toString();
    var hasSolaceName = solaceName != undefined && solaceName != '';
    var clientName = hasSolaceName ? 'NW' + idNo + '/' + solaceName + '/' + token : 'NW' + idNo + '/' + token;
    var createCacheSession;
    var connectSetting = {
        url: process.env.NEXT_PUBLIC_SOLACE_URL,
        vpnName: process.env.NEXT_PUBLIC_SOLACE_VPN_NAME,
        userName: process.env.NEXT_PUBLIC_SOLACE_USER_NAME,
        password: process.env.NEXT_PUBLIC_SOLACE_PASSWORD,
        reconnectRetries: Number(process.env.NEXT_PUBLIC_SOLACE_RECONNECT_RETRIES),
        reconnectRetryWaitInMsecs: Number(process.env.NEXT_PUBLIC_SOLACE_RECONNECT_RETRY_WAIT_IN_MSECS),
        reapplySubscriptions: !!process.env.NEXT_PUBLIC_SOLACE_REAPPLY_SUBSCRIPTIONS,
        clientName: clientName,
        applicationDescription: process.env.SOLACE_APPLICATION_DESCRIPTION,
    };
    // connectSetting.clientName = clientName;
    console.log('clientName...', clientName, connectSetting);

    const parseSdtMap = function (container_p) {
        var map = {};
        var keys = container_p.getKeys();
        for (var k = 0; k < keys.length; k++) {
            var v = container_p.getField(keys[k]);
            if (v.getType() == solace.SDTFieldType.STREAM) {
                var arr = v.getValue();
                map[keys[k]] = [];
                while (arr.hasNext()) {
                    var elem = arr.getNext();
                    map[keys[k]].push(elem.getValue());
                }
                arr = null;
            } else if (v.getType() == solace.SDTFieldType.MAP) {
                map[keys[k]] = parseSdtMap(v.getValue());
            } else {
                map[keys[k]] = v.getValue();
            }
            v = null;
        }
        return map;
    };

    factoryProps.profile = solace.SolclientFactoryProfiles.version10;
    //solace.SolclientFactory.setLogLevel(solace.LogLevel.DEBUG);
    solace.SolclientFactory.init(factoryProps);

    subscriber.session = null;
    subscriber.subscribeTopicCount = {};
    subscriber.isConnected = false;
    subscriber.isConnecting = false;

    // Logger
    subscriber.log = function (line) {
        console.log(line);
    };

    // Set Message Callback events
    subscriber.setMessageEvent = function (market, callback) {
        !messageEvent[market] ? (messageEvent[market] = []) : false;
        messageEvent[market].push(callback);
    };

    // Callback for message events
    subscriber.messageEventCb = function (session, message) {
        // console.log('topic-msg', message.getDestination().getName(), message.getSdtContainer());
        //message.getDestination()  -> getTopic
        try {
            if (Object.keys(messageEvent).length != 0) {
                var container_p = message.getSdtContainer().getValue();
                var topic = message.getDestination().getName();
                var type = topic.split('/')[0];
                var market = topic.split('/')[1];
                // console.log('solace', container_p, topic, type, market);
                var data = parseSdtMap(container_p);
                var result = {
                    topic: topic,
                    data: data,
                };
                if ((market == 'TSE' && (type == 'L' || type == 'Q')) || market == 'OTC' || market == 'OES')
                    market = 'ST';
                if (
                    topic.split('/')[0] === 'MST' ||
                    topic.split('/')[0] === 'MKT' ||
                    topic.split('/')[0] === 'QUT' ||
                    topic.split('/')[0] === 'SNP'
                )
                    market = 'ST';
                if (topic.split('/')[0] === 'MPK' || topic.split('/')[0] === 'MPQ') market = 'ST';
                if (!!messageEvent[market])
                    messageEvent[market].forEach(event => {
                        event(result);
                    });
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Callback for session events
    subscriber.sessionEventCb = function (session, event) {
        // console.log('solace', event.sessionEventCode);
        switch (event.sessionEventCode) {
            case solace.SessionEventCode.UP_NOTICE:
                subscriber.log('=== Successfully connected ===');
                this.isConnected = true;
                break;
            case solace.SessionEventCode.CONNECTING:
                subscriber.log('=== Connecting... ===');
                break;
            case solace.SessionEventCode.DISCONNECTED:
                subscriber.log('=== Disconnected. ===');
                if (subscriber.session !== null) {
                    subscriber.session.dispose();
                    subscriber.session = null;
                }
                break;
            case solace.SessionEventCode.SUBSCRIPTION_ERROR:
                subscriber.log('=== Cannot subscribe: ' + event.correlationKey + ' ===');
                break;
            case solace.SessionEventCode.SUBSCRIPTION_OK:
                subscriber.log('=== Successfully subscribed to topic: ' + event.correlationKey + ' ===');
                break;
            default:
                //subscriber.log("************ ERROR CONSOLE START ************");
                //subscriber.log("*** UNKNOWN time:" + moment().format('YYYY/MM/DD HH:mm:ss') + " ***");
                subscriber.log('*** UNKNOWN sessionEventCode:' + event.sessionEventCode + ' ***');
            //subscriber.log("*** UNKNOWN errorSubcode:" + event.errorSubcode + " ***");
            //subscriber.log("*** UNKNOWN infoStr:" + event.infoStr + " ***");
            //subscriber.log("*** UNKNOWN reason:" + event.reason + " ***");
            //subscriber.log("************ ERROR CONSOLE END ************");
        }
    };

    //Establish connection to Solace
    subscriber.connect = function () {
        if (subscriber.session !== null) {
            subscriber.log('=== Already connected. ===');
        } else {
            subscriber.session = solace.SolclientFactory.createSession(
                connectSetting,
                new solace.MessageRxCBInfo(function (session, message) {
                    subscriber.messageEventCb(session, message);
                }, subscriber),
                new solace.SessionEventCBInfo(function (session, event) {
                    subscriber.sessionEventCb(session, event);
                }, subscriber),
            );

            try {
                subscriber.session.connect();
                this.isConnecting = true;
            } catch (error) {
                subscriber.log('*** Connect ERROR: ' + error.toString() + '***');
            }
        }
    };

    subscriber.disconnect = function () {
        subscriber.log('=== Disconnecting ===');
        if (subscriber.session !== null) {
            try {
                subscriber.session.disconnect();
                subscriber.session.dispose();
                subscriber.session = null;
                this.isConnected = false;
                this.isConnecting = false;
            } catch (error) {
                subscriber.log(error.toString);
            }
        } else {
            this.log('*** Not Connect ***');
        }
    };

    // Subscribe to topic on Solace
    subscriber.subscribe = function (topicName) {
        if (subscriber.isConnecting) {
            if (subscriber.isConnected) {
                if (subscriber.session !== null) {
                    subscriber.log('Subscribing to :' + topicName);
                    try {
                        var subscribeTopicCount = this.subscribeTopicCount[topicName];
                        this.subscribeTopicCount[topicName] = !!subscribeTopicCount ? subscribeTopicCount + 1 : 1;
                        subscriber.session.subscribe(
                            solace.SolclientFactory.createTopic(topicName),
                            false,
                            topicName,
                            10000,
                        );
                    } catch (error) {
                        subscriber.log('*** Subscribe ERROR: ' + error.toString() + '***');
                    }
                }
            } else {
                subscriber.log('=== Wait Connect and Resubscribe ===');
                setTimeout(function () {
                    subscriber.subscribeTopicCount[topicName] -= 1;
                    subscriber.subscribe(topicName);
                }, 5000);
            }
        } else {
            subscriber.log('=== Not Connect ===');
        }
    };

    subscriber.unsubscribe = function (topicName) {
        if (subscriber.session !== null) {
            try {
                if (this.subscribeTopicCount[topicName] == 1) {
                    this.session.unsubscribe(solace.SolclientFactory.createTopic(topicName), true, topicName, 10000);
                    subscriber.log('=== Unsubscribing from topic: ' + topicName + '===');
                } else subscriber.log('=== private Topic: ' + topicName + '===');
                if (this.subscribeTopicCount[topicName] > 0) this.subscribeTopicCount[topicName] -= 1;
            } catch (error) {
                subscriber.log('*** Unsubscribe ERROR: ' + error.toString() + '***');
            }
        }
    };
    //sinopac-dc01 dc01
    subscriber.createCacheSession = function (topicName, cb) {
        let cacheName = process.env.NEXT_PUBLIC_SOLACE_CACHE_NAME;
        if (subscriber.isConnected) {
            clearInterval(timer);
            timer = null;
            createCacheSession = subscriber.session.createCacheSession({
                cacheName,
                maxAgeSec: 0,
                maxMessages: 1,
                timeoutMsec: 5000,
            });
            var topic = solace.SolclientFactory.createTopic(topicName);
            createCacheSession.sendCacheRequest(
                123,
                topic,
                false,
                solace.CacheLiveDataAction.FLOW_THRU,
                new solace.CacheCBInfo(function (id, result, obj) {
                    cb(id, result, obj);
                }, null),
            );
        } else {
            if (timer == null) {
                timer = setInterval(function () {
                    subscriber.createCacheSession(topicName, cb);
                }, 500);
            }
        }
    };
    return subscriber;
};

//防止 solace 被 iframe 重複調用
// var solaceClient = solaceClient || null;
// if (location.href.indexOf('#isIframe') > -1) {
//     try {
//         if (parent.solaceClient != undefined)
//             solaceClient = parent.solaceClient    //iframe
//     } catch (e) { }
// }
// else if (!!window.opener && window.opener != null) {
//     try {
//         if (window.opener.solaceClient != undefined)
//             solaceClient = window.opener.solaceClient   //open window
//     } catch (e) { }
// }
//若上述方法都抓不到原 solaceClient 物件的話則新建一個
if (solaceClient == undefined || solaceClient == null) {
    solaceClient = new SolaceClient();
}

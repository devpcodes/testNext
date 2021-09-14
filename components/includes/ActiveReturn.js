import { useEffect, useCallback, useState, useRef } from 'react';
import moment from 'moment';
import { notification } from 'antd';
import { getCookie } from '../../services/components/layouts/cookieController';
import { webSocketLogin } from '../../services/components/goOrder/websocketService';
import { themeColor } from './goOrder/panel/PanelTabs';
import { useDispatch, useSelector } from 'react-redux';
import { setWebSocketInfo } from '../../store/activeReturn/action';
import { fetchOneContracts } from '../../services/stock/fetchOneContracts';
import { postSbcoCode } from '../../services/components/goOrder/sb/postSbcoCode';
import { throttle, debounce } from '../../services/throttle';
import { postStmbCode } from '../../services/future/postStmbCode';

// import { fetchOneContracts } from '../../services/stock/fetchOneContracts';

var myWebsocket;

// 配合我們的solace過多的呼叫次數及原newweb 改寫...
const ActiveReturn = () => {
    const dispatch = useDispatch();
    const websocketInfo = useSelector(store => store.activeReturn?.websocketInfo);

    const stmbCodeList_future = useRef([]);
    const currResult = useRef('');
    // const currSocket = useRef({});
    useEffect(() => {
        if (getCookie('accounts')) {
            myWebsocket = webSocketLogin(getCookie('accounts'));
            myWebsocket.onmessage = sockeHandler;
        }

        return () => {
            try {
                if (myWebsocket != null) {
                    myWebsocket.close();
                }
            } catch (error) {
                console.log(error);
            }
        };
    }, []);

    const sockeHandler = useCallback(e => {
        try {
            const socketData = JSON.parse(e.data);
            const topicArgs = socketData.topic.split('/');

            console.log('-------', socketData, topicArgs);
            if (socketData.topic.indexOf('TFT') >= 0) {
                openNotification('topRight', socketData);
            }
            if (socketData.topic.indexOf('R/F/S') >= 0) {
                // 一樣的結果1秒彈出一次，不同就直接彈出；因為複委回報會跳很多次一樣的event回來....
                if (getTradeType(socketData)?.result) {
                    // console.log('-------', getTradeType(socketData).result, currResult.current)
                    if (getTradeType(socketData).result === currResult.current || !currResult.current) {
                        throttle(openNotificationSB.bind(null, 'topRight', socketData), 1000);
                    } else {
                        currResult.current = getTradeType(socketData).result;
                        openNotificationSB('topRight', socketData);
                    }
                }
            }
            if (topicArgs[2] === 'F') {
                // 一段時間內只執行最後一次的呼叫
                debounce(futureOptionsHandler.bind(null, socketData, topicArgs[3]), 1000);
                // if(currSocket.current == JSON.stringify(socketData)) {
                //     throttle(futureOptionsHandler.bind(null, socketData, topicArgs[3]), 1000)
                // }else{
                //     futureOptionsHandler(socketData, topicArgs[3]);
                //     currSocket.current = socketData;
                // }
            }
            dispatch(setWebSocketInfo(socketData));
        } catch (err) {
            console.log('websocket data error:', err);
        }
    });

    const futureOptionsHandler = (socketData, Oore) => {
        console.log('ffff', socketData);
        switch (socketData.COMTYPE) {
            case '0':
            case '2':
                openNotificationF('topRight', socketData, Oore);
                break;

            case '1':
            case '3':
                console.log('ooooo', socketData);
                break;
        }
    };

    const getProductType = message => {
        if (message.SYS_ID == '03' || message.SYS_ID == '05') {
            switch (message.ORD_TYPE2) {
                case '0':
                    return { name: '現股' };
                case '1':
                    return { name: '現股' };
                case '2':
                    return { name: '逐筆交割' };
                case '3':
                    return { name: '推薦券商選擇' };
                case '4':
                    return { name: '融券' };
                case '5':
                    return { name: '策借' };
                case '6':
                    return { name: '特借' };
            }
        } else {
            switch (message.ORD_TYPE2) {
                case '0':
                    return { name: '現股' };
                case '1':
                    return { name: '代資' };
                case '2':
                    return { name: '代券' };
                case '3':
                    return { name: '融資' };
                case '4':
                    return { name: '融券' };
                case '5':
                    return { name: '策借' };
                case '6':
                    return { name: '特借' };
            }
        }
        return { name: '' };
    };

    const getTradeType = message => {
        switch (message.TRADE_TYPE) {
            case '01':
            case '02':
                if (message.PRICE_TYPE == '1') {
                    self.price = '市價';
                } else {
                    switch (message.PRICE_FLAG) {
                        case '1': //平盤
                            self.price = '平盤';
                            break;
                        case '2': //漲停
                            self.price = '漲停';
                            break;
                        case '3': //跌停
                            self.price = '跌停';
                            break;
                        default:
                            self.price = message.PRICE + '元';
                    }
                }

                return {
                    trade: '委',
                    type: message.BS == 'S' ? '賣出' : '買進',
                    amount: parseInt(message.QTY),
                    price,
                    result: '委託成功',
                };

            case '03':
                return {
                    trade: '量',
                    type: '改量',
                    amount: parseInt(message.QTY),
                    price: message.PRICE_TYPE == '1' ? '市價' : message.PRICE + '元', // 市價註記 1:市價  2:限價
                    result: '成功',
                };

            case '04':
                return {
                    trade: '刪',
                    type: '取消',
                    amount: parseInt(message.QTY),
                    price: message.PRICE_TYPE == '1' ? '市價' : message.PRICE + '元', // 市價註記 1:市價  2:限價
                    result: '成功',
                };

            case '06':
                return {
                    trade: '價',
                    type: '改價',
                    amount: parseInt(message.QTY),
                    price: message.PRICE,
                    result: '成功',
                };

            case '10':
                return {
                    trade: '成',
                    type: message.BS == 'S' ? '賣出' : '買進',
                    amount: parseInt(message.MATCH_QTY),
                    price: message.MATCH_PRICE,
                    result: '成交',
                };
            // case "20":
            //     return {
            //         trade: "成",
            //         type: "結束成交回報",
            //         amount: parseInt(message.MATCH_QTY),
            //         price: message.MATCH_PRICE,
            //         result: "成交"
            //     };
            // case "50":
            //     return {
            //         trade: "成",
            //         type: message.BS == "B" ? "買進" : (message.BS == "S" ? "賣出" : "成交"),
            //         amount: parseInt(message.MATCH_QTY),
            //         price: message.MATCH_PRICE,
            //         result: "成交"
            //     };
        }
    };

    const getOrderType = message => {
        switch (message.ORD_TYPE) {
            case '0':
                return 'ROD';
            case '3':
                return 'IOC';
            case '4':
                return 'FOK';
            default:
                return ' ';
        }
    };

    const getUnit = message => {
        switch (message.ORD_TYPE1) {
            case '2':
                return '股';
            default:
                return '張';
        }
    };

    const getIcon = (msg, socketData) => {
        if (msg.indexOf('失敗') >= 0) {
            return <span>!</span>;
        }
        if (msg.indexOf('改價') >= 0 || msg.indexOf('改量') >= 0) {
            return <span>改</span>;
        }
        if (msg.indexOf('成交') >= 0) {
            return <span>成</span>;
        }
        if (msg.indexOf('成功') >= 0) {
            return <span>{socketData.BS === 'B' ? '買' : '賣'}</span>;
        }
    };

    const getBS = BS => {
        switch (BS) {
            case 'B':
                return { name: '買進' };
            case 'S':
                return { name: '賣出' };
        }
    };

    const getOorE = OroE => {
        switch (OroE) {
            case 'O':
                return '委';
            case 'E':
                return '成';
        }
    };

    const getFutureCategory = message => {
        message.COMNO = message.COMNO?.trim();
        message.category = message.COMNO?.trim();
        message.COMYM = message.COMYM?.trim();
        switch (message.COMNO.trim()) {
            case 'FITE':
                message.category = 'EXF';
                break;
            case 'FITF':
                message.category = 'FXF';
                break;
            case 'FIMTX':
                message.category = 'MXF'; //小台
                break;
            case 'FIMTX1':
                message.COMYM = message.COMYM + 'W1'; //周小台
                message.category = 'MXF';
                break;
            case 'FIMTX2':
                message.COMYM = message.COMYM + 'W2'; //周小台
                message.category = 'MXF';
                break;
            case 'FIMTX4':
                message.COMYM = message.COMYM + 'W4'; //周小台
                message.category = 'MXF';
                break;
            case 'FIMTX5':
                message.COMYM = message.COMYM + 'W5'; //周小台
                message.category = 'MXF';
                break;
            default:
                switch (message.COMNO.length) {
                    case 4:
                        message.category = message.COMNO.substring(2) + 'F';
                        break;
                    case 5:
                        message.category = message.COMNO.substring(2);
                        break;
                    default:
                        message.category = message.COMNO;
                }
        }
        console.log('why............', message.category, message.COMNO);
        return message.category;
    };
    //message就是socketdata
    const getFuturesInfo = async message => {
        const category = getFutureCategory(message);
        let cateObj = {};
        try {
            const res = await postStmbCode();
            console.log('res', res);
            stmbCodeList_future.current = res.content;
            console.log('========', stmbCodeList_future.current[category], stmbCodeList_future.current, category);
            if (stmbCodeList_future.current.hasOwnProperty(message.category)) {
                cateObj = stmbCodeList_future.current[message.category].find(function (d) {
                    return d.deliverymonth == message.COMYM.trim();
                });
                if (message.category == 'MXF') {
                    message.category = !!cateObj.ename ? cateObj.ename : message.category;
                }
            }

            return {
                category: message.category,
                name: (!!cateObj ? cateObj.csname + ' ' : '') + message.category + ' ' + message.COMYM + ' 月 ',
                msg: message,
            };
        } catch (error) {
            throw error?.message;
        }
    };

    const getFuturesResult = (code, OorE) => {
        if (OorE == 'O') {
            switch (code) {
                case '0000':
                    return '委託成功';
                case '8014':
                    return '委託成功';
                default:
                    return '委託失敗';
            }
        } else {
            return '成交';
        }
    };

    const getOPOF = OPOF => {
        switch (OPOF) {
            case '0':
                return '新倉';
            case '1':
                return '平倉';
            case '7':
                return '代沖銷';
            default:
                return '自動';
        }
    };

    const getFuturesOrderType = message => {
        switch (message.ORDTYPE) {
            case 'CXL':
                return '刪單';
            case 'UPD':
                return '改量';
            case 'UPL':
                return '改限價';
            case 'UPM':
                return '改市價';
            case 'UPP':
                return '改一定範圍市價';
            case 'CXP':
                return '退單';
            case 'CXQ':
                return '退單基準價';
            default:
                return '';
        }
    };

    const openNotification = async (placement, socketData) => {
        if (socketData?.topic) {
            const res = await fetchOneContracts([socketData.STOCK_ID]);

            let message =
                getTradeType(socketData)?.result +
                ' ' +
                getProductType(socketData).name +
                getTradeType(socketData).type +
                ' ' +
                getOrderType(socketData);
            if (socketData?.ERR_MSG) message = '委託失敗' + ' ' + socketData.STOCK_ID + res[0]?.Name;
            const icon = getIcon(message, socketData);
            notification.info({
                className: 'activeReturn',
                message: message,
                description: socketData?.ERR_MSG
                    ? socketData.ERR_MSG
                    : socketData.STOCK_ID +
                      res[0]?.Name +
                      ' / ' +
                      getTradeType(socketData).price +
                      ' / ' +
                      getTradeType(socketData).amount +
                      getUnit(socketData),
                placement,
                // duration: null,
                style: {
                    background: socketData.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                    width: '300px',
                },
                top: '59px',
                icon: (
                    <div
                        style={{
                            background: 'white',
                            width: '45px',
                            height: '45px',
                            textAlign: 'center',
                            paddingTop: '11px',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            borderRadius: '2px',
                            marginLeft: '-12px',
                            color: `${socketData.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}`,
                            boxShadow: 'rgb(123 123 123 / 18%) 4px 4px 3px 0px',
                        }}
                    >
                        {icon}
                    </div>
                ),
                onClose: () => {
                    dispatch(setWebSocketInfo({}));
                },
            });
        }
    };

    const openNotificationSB = async (placement, socketData) => {
        if (socketData?.topic) {
            let stockName = '';
            if (socketData?.EXCHANGE && socketData?.STOCK_ID) {
                const res = await postSbcoCode([{ exchange: socketData.EXCHANGE, code: socketData.STOCK_ID }]);
                stockName = res[0]?.name;
            }

            let message =
                getTradeType(socketData)?.result +
                ' ' +
                getProductType(socketData)?.name +
                getTradeType(socketData)?.type;
            if (socketData?.ERR_MSG) message = '委託失敗' + ' ' + socketData.STOCK_ID + ' ' + stockName;
            const icon = getIcon(message, socketData);

            notification.info({
                className: 'activeReturn',
                message: message,
                description: socketData?.ERR_MSG
                    ? decodeURIComponent(escape(socketData.ERR_MSG))
                    : socketData.STOCK_ID +
                      ' ' +
                      stockName +
                      ' / ' +
                      getTradeType(socketData)?.price +
                      ' / ' +
                      getTradeType(socketData)?.amount +
                      '股',
                placement,
                style: {
                    background: socketData.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                    width: '300px',
                },
                top: '59px',
                icon: (
                    <div
                        style={{
                            background: 'white',
                            width: '45px',
                            height: '45px',
                            textAlign: 'center',
                            paddingTop: '11px',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            borderRadius: '2px',
                            marginLeft: '-12px',
                            color: `${socketData.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}`,
                            boxShadow: 'rgb(123 123 123 / 18%) 4px 4px 3px 0px',
                        }}
                    >
                        {icon}
                    </div>
                ),
                onClose: () => {
                    dispatch(setWebSocketInfo({}));
                },
            });
        }
    };

    const openNotificationF = async (placement, socketData, Oore) => {
        const info = await getFuturesInfo(socketData);
        socketData.startText = '';
        if (getFuturesOrderType(socketData) == '刪單') socketData.startText = '取消';
        console.log('info', info, socketData, getFuturesResult(socketData.CODE, getOorE(Oore)), Oore);
        const message =
            getFuturesResult(socketData.CODE, Oore) +
            ' ' +
            getOPOF(socketData.OPOF) +
            getFuturesOrderType(socketData) +
            ' ' +
            socketData.startText +
            getBS(socketData.PS).name;
        socketData.BS = socketData.PS;
        const icon = getIcon(message, socketData);
        console.log('oore', Oore);
        if (getOorE(Oore) == '成') {
            socketData.PRICE1 = parseFloat(socketData.TRDPRC1); //價格
            socketData.ORDQTY = parseInt(socketData.TRDQTY); //數量
        }
        notification.info({
            className: 'activeReturn',
            message: message,
            description: socketData?.ERRMSG?.trim()
                ? decodeURIComponent(escape(socketData.ERRMSG))
                : info.name + ' / ' + parseFloat(socketData?.PRICE1) + ' / ' + parseInt(socketData?.ORDQTY) + '口',

            placement,
            style: {
                background: socketData.PS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                width: '300px',
            },
            top: '59px',
            icon: (
                <div
                    style={{
                        background: 'white',
                        width: '45px',
                        height: '45px',
                        textAlign: 'center',
                        paddingTop: '11px',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        borderRadius: '2px',
                        marginLeft: '-12px',
                        color: `${socketData.PS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}`,
                        boxShadow: 'rgb(123 123 123 / 18%) 4px 4px 3px 0px',
                    }}
                >
                    {icon}
                </div>
            ),
            onClose: () => {
                dispatch(setWebSocketInfo({}));
            },
        });
    };

    return (
        <>
            <style global jsx>{`
                .activeReturn .ant-notification-notice-message {
                    color: white;
                    font-weight: bold;
                }
                .activeReturn .ant-notification-notice-description {
                    color: white;
                }
                .activeReturn .ant-notification-close-x {
                    color: white;
                }
            `}</style>
        </>
    );
};

export default ActiveReturn;

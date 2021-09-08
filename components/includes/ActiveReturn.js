import { useEffect, useCallback, useState } from 'react';
import { notification } from 'antd';
import { getCookie } from '../../services/components/layouts/cookieController';
import { webSocketLogin } from '../../services/components/goOrder/websocketService';
import { themeColor } from './goOrder/panel/PanelTabs';
import { useDispatch, useSelector } from 'react-redux';
import { setWebSocketInfo } from '../../store/activeReturn/action';
import { fetchOneContracts } from '../../services/stock/fetchOneContracts';
// import { fetchOneContracts } from '../../services/stock/fetchOneContracts';

const ActiveReturn = () => {
    const dispatch = useDispatch();
    const websocketInfo = useSelector(store => store.activeReturn?.websocketInfo);
    useEffect(() => {
        if (getCookie('accounts')) {
            const myWebsocket = webSocketLogin(getCookie('accounts'));
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
            if (socketData.topic.indexOf('TFT') >= 0) {
            }
            if (socketData.topic.indexOf('R/F/S') >= 0) {
            }

            openNotification('topRight', socketData);
            dispatch(setWebSocketInfo(socketData));
        } catch (err) {
            console.log('websocket data error:', err);
        }
    });

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

    const openNotification = async (placement, socketData) => {
        if (socketData?.topic) {
            const res = await fetchOneContracts([socketData.STOCK_ID]);

            let message =
                getTradeType(socketData).result +
                ' ' +
                getProductType(socketData).name +
                getTradeType(socketData).type +
                ' ' +
                getOrderType(socketData);
            if (socketData?.ERR_MSG) message = '委託失敗' + ' ' + socketData.STOCK_ID + res[0]?.Name;
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
                        <span>{socketData.BS === 'B' ? '買' : '賣'}</span>
                    </div>
                ),
                onClose: () => {
                    dispatch(setWebSocketInfo({}));
                },
            });
        }
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

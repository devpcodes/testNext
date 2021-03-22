import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import TradingContainer from './TradingContainer';
import { setBs, setWebsocketEvent } from '../../../../store/goOrder/action';
import SearchList from '../searchList/SearchList';
import { webSocketLogin } from '../../../../services/components/goOrder/websocketService';
import { getCookie } from '../../../../services/components/layouts/cookieController';

const { TabPane } = Tabs;

export const themeColor = {
    buyTabColor: '#f45a4c',
    buyGradient: '#fff6f5',
    sellTabColor: '#22a16f',
    sellGradient: '#e9fff6',
    tradingAccColor: '#254a91',
    tradingGradient: '#eaf1ff',
};

let currentTabKey = '1';
const PanelTabs = () => {
    const bs = useSelector(store => store.goOrder.bs);
    const websocketEvent = useSelector(store => store.goOrder.websocketEvent);
    const [tabColor, setTabColor] = useState(themeColor.buyTabColor);
    const [gradient, setGradient] = useState(themeColor.buyGradient);
    const [tabKey, setTabKey] = useState('1');
    const dispatch = useDispatch();
    useEffect(() => {
        //TODO cookie accounts 之後會廢掉
        if (getCookie('accounts')) {
            const myWebsocket = webSocketLogin(getCookie('accounts'));
            myWebsocket.onmessage = sockeHandler;
        }
        //TODO test
        window.setInterval(() => {
            console.log('tabKey', currentTabKey);
            dispatch(setWebsocketEvent(true));
        }, 5000);
        // setTimeout(() => {
        //     dispatch(setWebsocketEvent(true));
        // }, 5000);
        return () => {
            if (myWebsocket != null) {
                myWebsocket.close();
            }
        };
        // console.log('mock', JSON.parse('{"TRACE_ID":"000147","TRACE_CHANNEL":"dev","CH_FG":"N","FORMAT":"ITOLOT","SYS_ID":"30","TRADE_TYPE":"02","MSG_TYPE":"01","MSG_STIME":"132835","ORD_STATUS":"00","BROKER_ID":"9A95","PVC_ID":"@@","ORD_NO":"WA058","ACCOUNT":"0475599","ACCOUNT_TYPE":"I","STOCK_ID":"2330","PRICE":307,"QTY":1,"BS":"S","ORD_TYPE1":"0","ORD_TYPE2":"0","ORD_DATE":"20210322","ORD_TIME":"132909955","ORD_QTY_O":0,"ORD_QTY_N":1,"PRICE_TYPE":"2","ORD_TYPE":"0","MARKET_ID":"S","AGENT_ID":"297","ORD_SEQ1":"049232","ORD_SEQ2":"049232","RTN_FORM":"1","TIMEOUT":" ","ERR_MSG":"","WEB_ID":"129","ORD_SEQ_UD":"000000","MSG_ID":"       ","MSG_FG1":"","MSG_FG2":"","TRF_FLD":"","ORD_SEQ_O":"      ","WEB_ID_N":"   ","WEB_ID_O":"","QTY_O":1,"EXH_MARK":" ","PRICE_FLAG":"1","SUBCOL":"","ADD_DATE":"20210322","ADD_TIME":"132835","ADD_USER":"HCSLSO","PROCESS_FG":" ","topic":"R/N/TFT/O/9A95/0475599"}'))
    }, []);
    useEffect(() => {
        if (bs === 'B') {
            setTabKey('1');
            setTabColor(themeColor.buyTabColor);
            setGradient(themeColor.buyGradient);
        } else {
            setTabKey('2');
            setTabColor(themeColor.sellTabColor);
            setGradient(themeColor.sellGradient);
        }
    }, [bs]);
    const sockeHandler = e => {
        try {
            const socketData = JSON.parse(e.data);
            if (socketData.topic.indexOf('TFT') >= 0) {
                dispatch(setWebsocketEvent(true));
            }
        } catch (err) {
            console.log('websocket data error:', err);
        }
    };
    const tabChangeHandler = activeKey => {
        currentTabKey = activeKey;
        switch (activeKey) {
            case '1':
                dispatch(setBs('B'));
                setTabColor(themeColor.buyTabColor);
                setGradient(themeColor.buyGradient);
                setTabKey(activeKey);
                break;
            case '2':
                dispatch(setBs('S'));
                setTabColor(themeColor.sellTabColor);
                setGradient(themeColor.sellGradient);
                setTabKey(activeKey);
                break;
            case '3':
                setTabColor(themeColor.tradingAccColor);
                setGradient(themeColor.tradingGradient);
                setTabKey(activeKey);
                dispatch(setWebsocketEvent(false));
                break;
            default:
                setTabColor(themeColor.buyTabColor);
                setGradient(themeColor.buyGradient);
                break;
        }
    };

    return (
        <div className="tabs__container">
            {websocketEvent && currentTabKey !== '3' && <span className="socket__icon"></span>}
            <Tabs activeKey={tabKey} onChange={tabChangeHandler}>
                <TabPane tab="買進" key="1">
                    <TradingContainer />
                </TabPane>
                <TabPane tab="賣出" key="2">
                    <TradingContainer />
                </TabPane>
                <TabPane tab="成委回" key="3">
                    <SearchList active={tabKey === '3' ? true : false} />
                </TabPane>
            </Tabs>
            <style jsx>{`
                .socket__icon {
                    border-radius: 50%;
                    background: #de1c1c;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    right: 17%;
                }
            `}</style>
            <style global jsx>{`
                .tabs__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    font-weight: bold;
                    color: ${tabColor};
                }
                .tabs__container .ant-tabs-tab-btn {
                    font-size: 20px;
                    width: calc((100vw - 52px) / 3);
                    margin: 0;
                    text-align: center;
                    margin-bottom: 12px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .tabs__container .ant-tabs-tab {
                    padding: 0;
                    margin: 0;
                }
                .tabs__container .ant-tabs-bottom > .ant-tabs-nav:before,
                .ant-tabs-bottom > div > .ant-tabs-nav:before,
                .ant-tabs-top > .ant-tabs-nav:before,
                .ant-tabs-top > div > .ant-tabs-nav:before {
                    border: none;
                    height: 1px;
                    background: ${tabColor};
                }
                .tabs__container .ant-tabs-ink-bar {
                    background: ${tabColor};
                }
                .tabs__container .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
                    height: 4px;
                }
                .tabs__container .ant-tabs-tab-active {
                    background-image: linear-gradient(to bottom, rgba(244, 90, 76, 0) 5%, ${gradient});
                }
            `}</style>
        </div>
    );
};

export default PanelTabs;

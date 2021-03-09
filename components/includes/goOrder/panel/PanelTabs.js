import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import TradingContainer from './TradingContainer';
import { setBs } from '../../../../store/goOrder/action';
import SearchList from '../searchList/SearchList';

const { TabPane } = Tabs;

export const themeColor = {
    buyTabColor: '#f45a4c',
    buyGradient: '#fff6f5',
    sellTabColor: '#22a16f',
    sellGradient: '#e9fff6',
    tradingAccColor: '#254a91',
    tradingGradient: '#eaf1ff',
};

const PanelTabs = () => {
    const bs = useSelector(store => store.goOrder.bs);
    const [tabColor, setTabColor] = useState(themeColor.buyTabColor);
    const [gradient, setGradient] = useState(themeColor.buyGradient);
    const [tabKey, setTabKey] = useState('1');
    const dispatch = useDispatch();
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
    const tabChangeHandler = activeKey => {
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
                break;
            default:
                setTabColor(themeColor.buyTabColor);
                setGradient(themeColor.buyGradient);
                break;
        }
    };
    return (
        <div className="tabs__container">
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

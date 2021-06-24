import { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { themeColor } from '../../panel/PanelTabs';
import { setSBActiveTabKey, setSBBs } from '../../../../../store/goOrderSB/action';
import TradingContainer from './TradingContainer';
import SearchList from '../searchList/SearchList';
const { TabPane } = Tabs;

const OrderTab = () => {
    // const [tabKey, setTabKey] = useState('1');
    const [tabColor, setTabColor] = useState(themeColor.buyTabColor);
    const [gradient, setGradient] = useState(themeColor.buyGradient);
    const activeTabKey = useSelector(store => store.goOrderSB.activeTabKey);
    const bs = useSelector(store => store.goOrderSB.bs);
    const dispatch = useDispatch();
    const tabChangeHandler = useCallback(activeKey => {
        switch (activeKey) {
            case '1':
                dispatch(setSBBs('B'));
                setTabColor(themeColor.buyTabColor);
                setGradient(themeColor.buyGradient);
                dispatch(setSBActiveTabKey(activeKey));
                break;
            case '2':
                dispatch(setSBBs('S'));
                setTabColor(themeColor.sellTabColor);
                setGradient(themeColor.sellGradient);
                dispatch(setSBActiveTabKey(activeKey));
                break;
            case '3':
                setTabColor(themeColor.tradingAccColor);
                setGradient(themeColor.tradingGradient);
                dispatch(setSBActiveTabKey(activeKey));
                break;
            default:
                setTabColor(themeColor.buyTabColor);
                setGradient(themeColor.buyGradient);
                break;
        }
    }, []);
    useEffect(() => {
        if (bs === 'B') {
            dispatch(setSBActiveTabKey('1'));
            setTabColor(themeColor.buyTabColor);
            setGradient(themeColor.buyGradient);
        } else {
            dispatch(setSBActiveTabKey('2'));
            setTabColor(themeColor.sellTabColor);
            setGradient(themeColor.sellGradient);
        }
    }, [bs]);
    const tabChildren = useMemo(() => {
        return (
            <Tabs activeKey={activeTabKey} onChange={tabChangeHandler}>
                <TabPane tab="買進" key="1">
                    {activeTabKey === '1' && <TradingContainer />}
                </TabPane>
                <TabPane tab="賣出" key="2">
                    {activeTabKey === '2' && <TradingContainer />}
                </TabPane>
                <TabPane tab="成委回" key="3">
                    {activeTabKey === '3' && <SearchList />}
                </TabPane>
            </Tabs>
        );
    }, [activeTabKey]);
    return (
        <>
            <div className="tabs__container">{tabChildren}</div>
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
                    /* background-image: linear-gradient(to bottom, rgba(244, 90, 76, 0) 5%, ${gradient});
                    background-image: -webkit-linear-gradient(to bottom, rgba(244, 90, 76, 0) 5%, ${gradient});
                    background-image: -moz-linear-gradient(to bottom, rgba(244, 90, 76, 0) 5%, ${gradient}); */

                    background: linear-gradient(90deg, ${gradient} 0%, #ffffff 74%);
                    background: -moz-linear-gradient(90deg, ${gradient} 0%, #ffffff 74%);
                    background: -webkit-linear-gradient(90deg, ${gradient} 0%, #ffffff 74%);
                    background: -o-linear-gradient(90deg, ${gradient} 0%, #ffffff 74%);
                }
            `}</style>
        </>
    );
};
export default OrderTab;

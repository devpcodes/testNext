import { useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { themeColor } from '../../panel/PanelTabs';
const { TabPane } = Tabs;

const OrderTab = () => {
    const [tabKey, setTabKey] = useState('1');
    const [tabColor, setTabColor] = useState(themeColor.buyTabColor);
    const [gradient, setGradient] = useState(themeColor.buyGradient);
    const tabChangeHandler = useCallback(() => {});
    const tabChildren = useMemo(() => {
        return (
            <Tabs activeKey={tabKey} onChange={tabChangeHandler}>
                <TabPane tab="買進" key="1">
                    {tabKey === '1' && '123'}
                </TabPane>
                <TabPane tab="賣出" key="2">
                    {tabKey === '2' && '222'}
                </TabPane>
                <TabPane tab="成委回" key="3">
                    {tabKey === '3' && '333'}
                </TabPane>
            </Tabs>
        );
    }, [tabKey]);
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

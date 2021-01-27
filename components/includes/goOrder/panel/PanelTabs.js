import { useState } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const PanelTabs = () => {
    const [tabColor, setTabColor] = useState('#f45a4c');
    const [gradient, setGradient] = useState('#fff6f5');
    const tabChangeHandler = activeKey => {
        switch (activeKey) {
            case '1':
                setTabColor('#f45a4c');
                setGradient('#fff6f5');
                break;
            case '2':
                setTabColor('#22a16f');
                setGradient('#e9fff6');
                break;
            case '3':
                setTabColor('#254a91');
                setGradient('#eaf1ff');
                break;
            default:
                setTabColor('#f45a4c');
                setGradient('#fff6f5');
                break;
        }
    };
    return (
        <div className="tabs__container">
            <Tabs defaultActiveKey="1" onChange={tabChangeHandler}>
                <TabPane tab="買進" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="賣出" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="成委回" key="3">
                    Content of Tab Pane 3
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

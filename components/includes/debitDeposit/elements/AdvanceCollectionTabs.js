import { Tabs } from 'antd';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const AdvanceCollectionTabs = ({ data, ...props }) => {
    const changleHandler = () => {};
    return (
        <>
            <Tabs
                // defaultActiveKey={stockActiveTabKey.current}
                animated={{ inkBar: true, tabPane: true }}
                onChange={changleHandler}
                className="tabs__container"
                {...props}
            >
                {data.map((item, index) => {
                    return (
                        <TabPane tab={item.name} key={index}>
                            {item.render()}
                        </TabPane>
                    );
                })}
                {/* <TabPane tab="預收股票申請" key="1"></TabPane>
                <TabPane tab="預收股票查詢" key="2"></TabPane> */}
            </Tabs>
            <style jsx global>{`
                .tabs__container .ant-tabs-nav-list {
                    width: 100%;
                }
                .tabs__container .ant-tabs-tab {
                    width: 50%;
                    margin: 0;
                    text-align: center;
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: bold;
                }
                @media (max-width: 580px) {
                    .tabs__container .ant-tabs-tab {
                        font-size: 16px;
                    }
                }
                .tabs__container .ant-tabs-tab div {
                    margin: 0 auto;
                }
                .tabs__container .ant-tabs-ink-bar {
                    background: #d23749;
                    height: 4px !important;
                }
                .tabs__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #d23749;
                    font-weight: bold;
                }
                .tabs__container .ant-tabs-tab:hover {
                    color: #d23749;
                }

                .tabs__container .ant-tabs-tab-btn:active,
                .ant-tabs-tab-btn:focus,
                .ant-tabs-tab-remove:active,
                .ant-tabs-tab-remove:focus {
                    color: #d23749;
                }
            `}</style>
        </>
    );
};

AdvanceCollectionTabs.prototype = {
    data: PropTypes.array,
};

export default AdvanceCollectionTabs;

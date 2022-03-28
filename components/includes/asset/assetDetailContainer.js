import { useCallback, useState, memo } from 'react';
import { Tabs, Collapse } from 'antd';
import AssetCards from '../asset/assetCards';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const assetDetailContainer = memo(({}) => {
    const [activeTab, setActiveTab] = useState('1');
    const isMobile = useSelector(store => store.layout.isMobile);
    const changeChartOverviewGroup = key => {
        setActiveTab(key);
    };

    const CustomMobileTitle = () => {
        return (
            <>
                <div className="panel__header">
                    <div>
                        <div>
                            <span className="point__circle sXXXX"></span>
                            <span className="panel__header__title">國內證券</span>
                        </div>
                        <div className="panel__header__rate">12.58%</div>
                    </div>
                    <div className="total__amount">$16,957,147</div>
                </div>
            </>
        );
    };

    return (
        <>
            {isMobile ? (
                <Collapse>
                    <Panel header={<CustomMobileTitle />} key="1">
                        <AssetCards />
                    </Panel>
                    <Panel header={<CustomMobileTitle />} key="2">
                        <AssetCards />
                    </Panel>
                    <Panel header={<CustomMobileTitle />} key="3">
                        <AssetCards />
                    </Panel>
                </Collapse>
            ) : (
                <div className="asset__detail__overview__tab">
                    <Tabs onChange={changeChartOverviewGroup}>
                        <TabPane tab={<span>國內證券</span>} key="1">
                            <AssetCards />
                        </TabPane>

                        <TabPane tab={<span>海外證券</span>} key="2">
                            <AssetCards />
                        </TabPane>
                    </Tabs>
                </div>
            )}

            <style jsx>{`
                .asset__detail__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin: 30px 0;
                }
            `}</style>

            <style jsx global>{`
                .panel__header {
                    display: flex;
                    justify-content: space-between;
                }
                .panel__header__title {
                    color: #0d1623;
                    font-size: 16px;
                    font-weight: bold;
                }
                .panel__header__rate {
                    font-size: 14px;
                    color: #3f5372;
                    margin-left: 18px;
                }
                .point__circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 10px;
                    margin-bottom: 2px;
                }
                .sXXXX {
                    background-color: #c43826;
                }
                .total__amount {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    color: #0d1623;
                }
                .ant-collapse > .ant-collapse-item > .ant-collapse-header {
                    padding: 12px 45px 12px 16px;
                }
                .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
                    right: 16px;
                    left: unset;
                }
            `}</style>
        </>
    );
});

export default assetDetailContainer;

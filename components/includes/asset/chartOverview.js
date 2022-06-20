import { useCallback, useState, memo } from 'react';
import { Tabs } from 'antd';
import doughnut from '../../../resources/images/pages/asset/chart-doughnut-chart@2x.png';
import doughnutActive from '../../../resources/images/pages/asset/chart-doughnut-chart-active@2x.png';
import DountChartContainer from './dountChartContainer';

const { TabPane } = Tabs;

const AssetChartOverview = memo(({}) => {
    const [activeTab, setActiveTab] = useState('1');
    const changeChartOverviewGroup = key => {
        setActiveTab(key);
    };

    return (
        <>
            <div className="asset__chart__overview__tab">
                <Tabs onChange={changeChartOverviewGroup}>
                    <TabPane
                        tab={
                            <span>
                                <img className="tab__pic" src={activeTab === '1' ? doughnutActive : doughnut} />
                                資產分佈
                            </span>
                        }
                        key="1"
                    >
                        <DountChartContainer />
                    </TabPane>
                </Tabs>
            </div>

            {/* <div className="total__pl">
                <h6>總未實現損益</h6>
                <p>$980,000 (+1.24%)</p>
            </div> */}

            <style jsx>{`
                .asset__chart__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin-top: 30px;
                }

                .tab__pic {
                    width: 24px;
                    height: 24px;
                    margin-right: 7px;
                }

                .total__pl {
                    display: none;
                    padding: 19px 16px;
                    margin-bottom: 20px;
                    border-bottom: solid 1px #d7e0ef;
                }

                .total__pl > h6 {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #0d1623;
                    margin: 0;
                }

                .total__pl > p {
                    font-size: 1.6rem;
                    color: #f45a4c;
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .total__pl {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            `}</style>
            <style jsx global>{`
                .ant-tabs-tab-btn > span {
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn > span {
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #daa360;
                }
                .ant-tabs > .ant-tabs-nav {
                    margin: 0;
                }
                .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
                .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
                    padding: 0 30px;
                }
                .ant-tabs-tabpane {
                    padding: 15px 30px;
                    display: flex;
                    justify-content: space-between;
                    flex-flow: wrap;
                }

                .ant-tabs-tab-btn:hover,
                .ant-tabs-tab:hover {
                    color: #daa360;
                }
                .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #daa360;
                }
                .ant-tabs-bottom > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
                .ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
                    background: #daa360;
                    height: 3px;
                }
                .ant-tabs-content {
                    padding: 40px 0;
                }
            `}</style>
        </>
    );
});

export default AssetChartOverview;

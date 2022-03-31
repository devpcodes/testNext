import { useCallback, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Modal } from 'antd';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import noData from '../../../resources/images/pages/Self_select/img-default.svg';

const { TabPane } = Tabs;

const AssetDetailTable = memo(({}) => {
    const [tableData, setTableData] = useState([]);

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
        },
        {
            title: '成交價',
            dataIndex: 'close',
        },
        {
            title: '測試1',
            dataIndex: '111',
        },
        {
            title: '測試2',
            dataIndex: '222',
        },
    ];

    const locale = {
        emptyText: (
            <span>
                <img src={noData} />
                <p className="noData__desc">
                    目前還沒加入個股
                    <br />
                    請使用上方搜尋列新增個股
                </p>
            </span>
        ),
    };

    return (
        <>
            <div className="asset__detail__overview__tab">
                <Tabs>
                    <TabPane tab={<span>現股/信用明細</span>} key="1">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                            // loading={{
                            //     indicator: (
                            //         <div
                            //             style={{
                            //                 marginTop: '20px',
                            //                 color: 'black',
                            //                 fontSize: '1.6rem',
                            //                 width: '100%',
                            //                 transform: 'translateX(-49%) translateY(-54px)',
                            //             }}
                            //         >
                            //             資料加載中...
                            //         </div>
                            //     ),
                            //     // spinning: isDataLoading,
                            // }}
                        />
                    </TabPane>
                </Tabs>
            </div>

            <style jsx>{`
                .asset__detail__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin-top: 30px;
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
                    padding: 0;
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
                    padding: 0 0;
                }
            `}</style>
        </>
    );
});

export default AssetDetailTable;

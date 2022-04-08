import { useCallback, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Modal, Table } from 'antd';
import AccountTable from '../tradingAccount/vipInventory/AccountTable';
import noData from '../../../resources/images/pages/Self_select/img-default.svg';
import AssetDetailModal from './assetDetailModal';
const { TabPane } = Tabs;

const AssetDetailTable = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const [isAssetDetailModalVisitable, setAssetDetailModalVisitable] = useState(false);
    const closeModal = useCallback(() => {
        setAssetDetailModalVisitable(false);
    }, []);

    const openModal = useCallback(() => {
        setAssetDetailModalVisitable(true);
    }, []);

    const [modalData, setModalData] = useState([]);
    const [tableData, setTableData] = useState([
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
        {
            name: '台積電',
            close: '111',
            aaa: 'aaa',
            bbb: 'bbb',
            ccc: 'ccc',
            eee: 'eee',
            fff: 'ffff',
            ggg: 'gggggg',
            hhh: 'hhhhh',
            iii: 'iiiii',
            jjj: 'jjjjjj',
        },
    ]);

    const columns = [
        {
            title: '商品(手機)',
            dataIndex: 'name',
        },
        {
            title: '成交價(手機)',
            dataIndex: 'close',
        },
        {
            title: '測試1(手機)',
            dataIndex: 'aaa',
        },
        {
            title: '測試2(手機)',
            dataIndex: 'bbb',
        },
        {
            title: '測試3',
            dataIndex: 'ccc',
            responsive: ['md'],
        },
        {
            title: '測試4',
            dataIndex: 'ddd',
            responsive: ['md'],
        },
        {
            title: '測試5',
            dataIndex: 'eee',
            responsive: ['md'],
        },
        {
            title: '測試6',
            dataIndex: 'fff',
            responsive: ['md'],
        },
        {
            title: '測試7',
            dataIndex: 'ggg',
            responsive: ['md'],
        },
        {
            title: '測試8',
            dataIndex: 'hhh',
            responsive: ['md'],
        },
        {
            title: '測試7',
            dataIndex: 'iii',
            responsive: ['md'],
        },
        {
            title: '測試8',
            dataIndex: 'jjj',
            responsive: ['md'],
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
                            scroll={{ x: isMobile ? 360 : 1300, y: 500 }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: event => {
                                        if (isMobile) {
                                            setModalData(tableData[rowIndex]);
                                            openModal();
                                        }
                                    },
                                };
                            }}
                        />
                    </TabPane>
                    <TabPane tab={<span>測試測試222</span>} key="2">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                        />
                    </TabPane>
                    <TabPane tab={<span>測試測試333</span>} key="3">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                        />
                    </TabPane>
                    <TabPane tab={<span>測試測試4444</span>} key="4">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                        />
                    </TabPane>
                    <TabPane tab={<span>測試測試555</span>} key="5">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                        />
                    </TabPane>
                    <TabPane tab={<span>測試測試6666</span>} key="6">
                        <AccountTable
                            className="drag__Table"
                            columns={columns}
                            pagination={false}
                            dataSource={tableData}
                            locale={locale}
                        />
                    </TabPane>
                </Tabs>

                <AssetDetailModal
                    isVisible={isMobile ? isAssetDetailModalVisitable : false}
                    data={modalData}
                    closeHandler={closeModal}
                />
            </div>

            <style jsx>{`
                .asset__detail__overview__tab {
                    position: relative;
                    border: solid 1px #e6ebf5;
                    background: #fff;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }
                @media (max-width: 768px) {
                    .asset__detail__overview__tab {
                        margin-bottom: 0;
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

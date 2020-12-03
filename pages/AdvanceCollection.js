import { useReducer, createContext, useEffect, useContext } from 'react';
import { Tabs, Button, Input } from 'antd';

import AdvanceCollectionLayout from '../components/layouts/AdvanceCollectionLayout';
import Accounts from '../components/includes/advanceCollection/Accounts';
import { reducers } from '../store/advanceCollection/combineReducer';
import ApplyContent from '../components/includes/advanceCollection/ApplyContent';
export const ReducerContext = createContext();

const initState = reducers();
const { TabPane } = Tabs;

const dataSource = [
    {
        key: '1',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: 1000,
        action: '申請',
    },
    {
        key: '2',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: 1000,
        action: '申請',
    },
    {
        key: '3',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: 500,
        action: '申請',
    },
];

const columns = [
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        index: 6,
        render: (text, record, index) => {
            return (
                <Button
                    onClick={() => {
                        console.log(text, record);
                    }}
                >
                    {text}
                </Button>
            );
        },
    },
    {
        title: '股票代號',
        dataIndex: 'stockCode',
        key: 'stockCode',
        index: 1,
    },
    {
        title: '股票名稱',
        dataIndex: 'stockName',
        key: 'stockName',
        index: 2,
    },
    {
        title: '昨日庫存(股數)',
        dataIndex: 'invetory',
        key: 'invetory',
        index: 3,
    },
    {
        title: '已圈存股數',
        dataIndex: 'alreadyNum',
        key: 'alreadyNum',
        index: 4,
    },
    {
        title: '申請預收股數',
        dataIndex: 'applyNum',
        key: 'applyNum',
        index: 5,
        render: (text, record, index) => {
            return <Input value={text} />;
        },
    },
];
const AdvanceCollection = function () {
    const [state, dispatch] = useContext(ReducerContext);
    useEffect(() => {
        console.log('selected', state.accountsReducer.selected);
    }, [state.accountsReducer.selected]);

    const changleHandler = activeKey => {
        console.log('selected', state.accountsReducer.selected);
    };
    return (
        <div className="reservation__container">
            <h1 className="title">預收股票</h1>
            <Tabs defaultActiveKey="1" animated={{ inkBar: true, tabPane: true }} onChange={changleHandler}>
                <TabPane tab="預收股票申請" key="1">
                    <Accounts key="1" style={{ marginTop: '35px' }} />
                    <ApplyContent
                        scroll={{ x: 860 }}
                        contenterTitle={'預收股票申請'}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </TabPane>
                <TabPane tab="預收股票查詢" key="2">
                    <Accounts key="2" style={{ marginTop: '35px' }} />
                </TabPane>
            </Tabs>
            <style jsx>{`
                .reservation__container {
                    margin: 20px auto 0 auto;
                    max-width: 900px;
                    font-size: 0px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .title {
                    text-align: center;
                    color: #333;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    margin-bottom: 0;
                }
                @media (max-width: 580px) {
                    .title {
                        font-size: 20px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .reservation__container .ant-btn {
                    font-size: 16px;
                    border: none;
                    color: #ffffff;
                    background: #d23749;
                    line-height: 26px;
                    font-weight: bold;
                    transition: 0.3s;
                    border-radius: 3px;
                }
                @media (max-width: 580px) {
                    .reservation__container .ant-btn {
                        width: 100%;
                    }
                }
                .reservation__container .ant-btn:not([disabled]):hover {
                    background: #bb1428;
                }
                .reservation__container .ant-input {
                    text-align: center;
                    font-size: 18px;
                }
                @media (max-width: 580px) {
                    .reservation__container .ant-input {
                        height: 28px;
                        font-size: 14px;
                        text-align: left;
                    }
                }
                .reservation__container .ant-tabs-nav-list {
                    width: 100%;
                }
                .reservation__container .ant-tabs-tab {
                    width: 50%;
                    margin: 0;
                    text-align: center;
                    padding: 10px 20px;
                    font-size: 24px;
                    font-weight: bold;
                }
                @media (max-width: 580px) {
                    .reservation__container .ant-tabs-tab {
                        font-size: 16px;
                    }
                }
                .reservation__container .ant-tabs-tab div {
                    margin: 0 auto;
                }
                .reservation__container .ant-tabs-ink-bar {
                    background: #d23749;
                    height: 4px !important;
                }
                .reservation__container .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #d23749;
                    font-weight: bold;
                }
                .reservation__container .ant-tabs-tab:hover {
                    color: #d23749;
                }

                .reservation__container .ant-tabs-tab-btn:active,
                .ant-tabs-tab-btn:focus,
                .ant-tabs-tab-remove:active,
                .ant-tabs-tab-remove:focus {
                    color: #d23749;
                }
            `}</style>
        </div>
    );
};

AdvanceCollection.getLayout = page => {
    const reducer = useReducer(reducers, initState);
    return (
        <ReducerContext.Provider value={reducer}>
            <AdvanceCollectionLayout children={page} startTime={'08:00'} endTime={'14:30'} />
        </ReducerContext.Provider>
    );
};

export default AdvanceCollection;

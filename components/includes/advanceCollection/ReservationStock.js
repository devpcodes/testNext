import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import MyTransition from '../myTransition';

import { Progress } from 'antd';
import { Tabs, Button, Input } from 'antd';
import jwt_decode from 'jwt-decode';
import Accounts from './Accounts';
import ApplyContent from './ApplyContent';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import { CAHandler, sign, checkSignCA } from '../../../services/webCa';
import CaHead from '../CaHead';
import { getToken } from '../../../services/user/accessToken';

const { TabPane } = Tabs;
const dataSource = [
    {
        key: '1',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: '',
        action: '申請',
    },
    {
        key: '2',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: '',
        action: '申請',
    },
    {
        key: '3',
        stockCode: '2330',
        stockName: '台積電',
        invetory: 1000,
        alreadyNum: 1000,
        applyNum: '',
        action: '申請',
    },
];

const dataSource2 = [
    {
        key: '1',
        symbol: '2330',
        stockName: '台積電',
        invetory: 5000,
        time: '10:00',
    },
    {
        key: '2',
        symbol: '2890',
        stockName: '永豐金',
        invetory: 1000,
        time: '08:00',
    },
];

const ReservationStock = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [columnsData, setColumnsData] = useState([]);
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);

    const stockColumns = useRef([]);
    const nowPercent = useRef(0);
    const timer = useRef(null);
    const stockColumns2 = useRef([]);
    const stockActiveTabKey = useRef('1');
    const init = useRef(false);
    const selectedAccount = useRef({});
    const [defaultValue, setDefaultValue] = useState('');

    useEffect(() => {
        console.log('state', state);

        selectedAccount.current = state.accountsReducer.selected;
        stockColumns.current = [
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                index: 6,
                render: (text, record, index) => {
                    return (
                        <Button
                            disabled={state.accountsReducer.disabled}
                            onClick={clickHandler.bind(null, text, record)}
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
                    return <Input defaultValue={text} onChange={inpChangeHandler.bind(null, record)} />;
                },
            },
        ];
        stockColumns2.current = [
            {
                title: '委託時間',
                dataIndex: 'time',
                key: 'time',
                index: 1,
            },
            {
                title: '股票代號',
                dataIndex: 'symbol',
                key: 'symbol',
                index: 2,
            },
            {
                title: '股票名稱',
                dataIndex: 'stockName',
                key: 'stockName',
                index: 3,
            },
            {
                title: '已預收股數',
                dataIndex: 'invetory',
                key: 'invetory',
                index: 4,
            },
        ];

        if (!init.current) {
            setColumnsData(stockColumns.current);
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
            init.current = true;
        }
        return () => {
            if (timer.current != null) {
                window.clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, [state.accountsReducer.selected]);

    const changleHandler = activeKey => {
        stockActiveTabKey.current = activeKey;
        if (activeKey == 1) {
            setColumnsData(stockColumns.current);
        } else {
            setColumnsData(stockColumns2.current);
        }
        if (state.accountsReducer.selected) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
        }
    };

    const clickHandler = useCallback((text, record) => {
        console.log('selected', selectedAccount.current, record);
        setLoading(true);
        percentHandler();
        console.log(text, record);
        // console.log(jwt_decode(getToken()));

        //驗憑證
        let data = getAccountSDetail(getToken());
        console.log('token', data);

        let caContent = sign(
            {
                idno: data.idno,
                broker_id: data.broker_id,
                account: data.account,
            },
            true,
            getToken(),
        );
        if (checkSignCA(caContent)) {
            alert('submit data');
        }
    }, []);

    //取得選擇帳號的詳細資料，驗憑證
    const getAccountSDetail = token => {
        let data = jwt_decode(token);
        data = data.acts_detail.filter(item => {
            if (item.account === selectedAccount.current.account) {
                return true;
            }
        });
        return data[0] || {};
    };

    const percentHandler = () => {
        //TODO 測試
        setTimeout(() => {
            submitSuccess();
        }, 1000);

        nowPercent.current = 0;
        setPercent(nowPercent.current);
        timer.current = window.setInterval(() => {
            if (nowPercent.current >= 99 || nowPercent.current + 4 >= 99) {
                window.clearInterval(timer.current);
                timer.current = null;
                return;
            }
            nowPercent.current += Math.floor(Math.random() * 5);
            setPercent(nowPercent.current);
        }, Math.floor(Math.random() * 50));
    };

    const submitSuccess = () => {
        window.clearInterval(timer.current);
        timer.current = null;
        setPercent(100);
        setTimeout(() => {
            setLoading(false);
        }, 50);
    };

    const inpChangeHandler = useCallback((record, e) => {
        const { value } = e.target;
        record.applyNum = Number(value);
        console.log('record', value, record);
    }, []);

    console.log('render PAGE=============');
    return (
        <div className="reservation__container">
            <CaHead />
            <h1 className="title">預收股票</h1>
            <Tabs
                defaultActiveKey={stockActiveTabKey.current}
                animated={{ inkBar: true, tabPane: true }}
                onChange={changleHandler}
            >
                <TabPane tab="預收股票申請" key="1">
                    <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
                    <ApplyContent
                        key="table1"
                        scroll={{ x: 860 }}
                        contenterTitle={'預收股票申請'}
                        dataSource={dataSource}
                        columns={columnsData}
                        pagination={false}
                    />
                </TabPane>
                <TabPane tab="預收股票查詢" key="2">
                    <Accounts key="2" style={{ marginTop: '35px' }} value={defaultValue} />
                    <ApplyContent
                        key="table2"
                        scroll={{ x: 860 }}
                        contenterTitle={'預收股票查詢'}
                        dataSource={dataSource2}
                        columns={columnsData}
                        pagination={false}
                    />
                </TabPane>
            </Tabs>
            <MyTransition isVisible={loading} classNames={'opacity'}>
                <>
                    <Progress
                        type="circle"
                        percent={percent}
                        width={100}
                        showInfo={true}
                        // format={(percent)=>{
                        //     if(percent < 100){
                        //         return(
                        //             <>
                        //                 <div style={{fontSize: '1.5rem'}}>傳送中...</div>
                        //                 <span style={{fontSize: '1.5rem'}}>{`${percent}%`}</span>
                        //             </>
                        //         )
                        //     }else{
                        //         return(
                        //             <>
                        //                 <div style={{fontSize: '1.5rem', color: '#73ab58'}}>傳送完成</div>
                        //                 <span style={{fontSize: '1.5rem', color: '#73ab58'}}>{`${percent}%`}</span>
                        //             </>
                        //         )
                        //     }
                        // }}
                    />
                    <div className="page__mask"></div>
                </>
            </MyTransition>

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
                .page__mask {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 400;
                    height: 100%;
                    background-color: rgb(249 249 249 / 70%);
                }
                @media (max-width: 580px) {
                    .title {
                        font-size: 26px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .reservation__container .ant-progress.ant-progress-circle {
                    position: fixed;
                    z-index: 999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .reservation__container
                    .ant-progress.ant-progress-circle.ant-progress-status-success.ant-progress-show-info.ant-progress-default.opacity-appear-done.opacity-enter-done {
                    position: fixed;
                    z-index: 999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
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
                .reservation__container .ant-btn:disabled {
                    background: #b7b7b7;
                    color: #dadada;
                }
                .reservation__container .ant-btn:disabled:hover {
                    background: #b7b7b7;
                    color: #dadada;
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

export default ReservationStock;

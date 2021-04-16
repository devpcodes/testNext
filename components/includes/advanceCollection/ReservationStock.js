import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import MyTransition from '../myTransition';

import { Tabs, Button, Input, Progress, Modal, notification } from 'antd';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import Accounts from './Accounts';
import ApplyContent from './ApplyContent';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import { sign, checkSignCA, CAHandler, signCert } from '../../../services/webCa';
// import CaHead from '../CaHead';
import { getToken } from '../../../services/user/accessToken';
import { fetchStockInventory } from '../../../services/components/reservationStock/fetchStockInventory';
import { postApplyEarmark } from '../../../services/components/reservationStock/postApplyEarmark';
import { fetchEarmarkStatus } from '../../../services/components/reservationStock/fetchEarmarkStatus';
import Msg from './Msg';

const { TabPane } = Tabs;

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
    const [stockInventory, setStockInventory] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const stockColumns = useRef([]);
    const nowPercent = useRef(0);
    const timer = useRef(null);
    const stockColumns2 = useRef([]);
    const stockActiveTabKey = useRef('1');
    const init = useRef(false);
    const selectedAccount = useRef({});
    const [defaultValue, setDefaultValue] = useState('');

    useEffect(() => {
        if (state.accountsReducer.disabled) {
            notification.warning({
                message: state.accountsReducer.disabled,
                top: '100px',
            });
        }
    }, [state.accountsReducer.disabled]);

    useEffect(() => {
        selectedAccount.current = state.accountsReducer.selected;
        dataHandler(stockActiveTabKey.current);
        if (!init.current) {
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

    useEffect(() => {
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
                title: '股票類別',
                dataIndex: 'load_type',
                key: 'load_type',
                index: 2,
                render: (text, record, index) => {
                    switch (text) {
                        case '':
                            return '一般';
                        case '1':
                            return '全額管理';
                        case '2':
                            return '收足款券';
                        case '3':
                            return '處置一二';
                        default:
                            break;
                    }
                },
            },
            {
                title: '股票代號',
                dataIndex: 'code',
                key: 'code',
                index: 1,
            },
            {
                title: '股票名稱',
                dataIndex: 'code_name',
                key: 'code_name',
                index: 2,
            },
            {
                title: '昨日庫存(股數)',
                dataIndex: 'stock_amount_t1',
                key: 'stock_amount_t1',
                index: 3,
            },
            {
                title: '已圈存股數',
                dataIndex: 'load_qty',
                key: 'load_qty',
                index: 4,
            },
            {
                title: '申請預收股數',
                dataIndex: 'qty',
                key: 'qty',
                index: 5,
                render: (text, record, index) => {
                    return <Input value={text} onChange={inpChangeHandler.bind(null, record, stockInventory)} />;
                },
            },
        ];
        stockColumns2.current = [
            {
                title: '委託時間',
                dataIndex: 'order_datetime',
                key: 'order_datetime',
                index: 1,
                render: (text, record, index) => {
                    return moment(text).format('HH:mm');
                },
            },
            {
                title: '股票代號',
                dataIndex: 'code',
                key: 'code',
                index: 3,
            },
            {
                title: '股票名稱',
                dataIndex: 'code_name',
                key: 'code_name',
                index: 4,
            },
            {
                title: '預收股數',
                dataIndex: 'apply_amount',
                key: 'apply_amount',
                index: 5,
            },
            {
                title: '狀態',
                dataIndex: 'order_status_msg',
                key: 'order_status_msg',
                index: 6,
            },
            {
                title: '狀態說明',
                dataIndex: 'order_status_description',
                key: 'order_status_description',
                index: 7,
            },
        ];
        setColumnsData(stockColumns.current);
    }, [stockInventory]);

    const dataHandler = async activeKey => {
        if (getToken()) {
            let data = getAccountsDetail(getToken());
            if (data.broker_id && data.account) {
                setDataLoading(true);
                if (activeKey == 1) {
                    await fetchInventory(getToken(), data.broker_id, data.account);
                } else {
                    await fetchStatus(getToken(), data.broker_id, data.account);
                }

                setDataLoading(false);
            }
        }
    };

    const fetchInventory = async (token, brokerId, account) => {
        let resData = await fetchStockInventory(token, brokerId, account);
        resData = resData.map((item, index) => {
            item.key = String(index);
            item.action = '申請';
            item.qty = '';
            return item;
        });
        setStockInventory(resData);
    };

    const fetchStatus = async (token, brokerId, account) => {
        let resData = await fetchEarmarkStatus(token, brokerId, account);
        resData = resData.map((item, index) => {
            item.key = String(index);
            return item;
        });
        setStatusData(resData);
    };

    const changleHandler = activeKey => {
        stockActiveTabKey.current = activeKey;
        if (activeKey == 1) {
            dataHandler(activeKey);
            setColumnsData(stockColumns.current);
        } else {
            dataHandler(activeKey);
            setColumnsData(stockColumns2.current);
        }
        if (state.accountsReducer.selected) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
        }
    };

    const clickHandler = (text, record) => {
        if (validateQty(record.qty, record.load_qty, record.stock_amount)) {
            console.log(text, record);
            // console.log(jwt_decode(getToken()));
            submitData(record);
        }
    };

    const validateQty = (value, loadQty, stockAmount) => {
        const regex = /^[0-9]{1,20}$/;
        if (!isNaN(value) && regex.test(value)) {
            if (Number(value) + Number(loadQty) <= Number(stockAmount)) {
                return true;
            } else {
                Modal.error({
                    content: '超過可申請股數',
                });
                return false;
            }
        }
        if (value === '') {
            Modal.error({
                content: '請輸入申請股數',
            });
        } else {
            Modal.error({
                content: '只能輸入數字',
            });
        }

        return false;
    };

    // const resetDataHandler = () => {
    //     const stockInventoryData = stockInventory.map((item, i) => {
    //         item.qty = '';
    //         return item;
    //     });
    //     setStockInventory(stockInventoryData);
    // }

    const submitData = async record => {
        //token, branch, account, symbol, qty, category
        const token = getToken();
        let data = getAccountsDetail(token);

        //未驗憑證
        // const resData = await postApplyEarmark(
        //     token,
        //     data.broker_id,
        //     data.account,
        //     record.code,
        //     String(record.qty),
        //     '0',
        // );
        // submitSuccess();
        // if(resData){
        //     Modal.success({
        //         content: resData,
        //         onOk() {
        //             dataHandler(1);
        //             // resetDataHandler();
        //         },
        //     });
        // }

        //驗憑證(1)
        // let caContent = await signCert(
        //     {
        //         idno: data.idno,
        //         broker_id: data.broker_id,
        //         account: data.account,
        //     },
        //     true,
        //     token,
        // );

        //驗憑證(2)
        let caContent = sign(
            {
                idno: data.idno,
                broker_id: data.broker_id,
                account: data.account,
            },
            true,
            token,
        );

        console.log('newCaContent', caContent);
        if (checkSignCA(caContent)) {
            setLoading(true);
            percentHandler();
            const resData = await postApplyEarmark(
                token,
                data.broker_id,
                data.account,
                record.code,
                String(record.qty),
                '0',
                caContent,
            );
            submitSuccess();
            if (resData) {
                Modal.success({
                    content: resData,
                    onOk() {
                        dataHandler(1);
                        // resetDataHandler();
                    },
                });
            }
        }

        // CAHandler(token, async () => {
        //     setLoading(true);
        //     percentHandler();
        //     const resData = await postApplyEarmark(
        //         token,
        //         data.broker_id,
        //         data.account,
        //         record.code,
        //         String(record.qty),
        //         '0',
        //     );
        //     submitSuccess();
        //     if (resData) {
        //         Modal.success({
        //             content: resData,
        //             onOk() {
        //                 dataHandler(1);
        //                 // resetDataHandler();
        //             },
        //         });
        //     }
        // });
    };

    //取得選擇帳號的詳細資料，驗憑證
    const getAccountsDetail = token => {
        let data = jwt_decode(token);
        data = data.acts_detail.filter(item => {
            if (item.account === selectedAccount.current.account) {
                return true;
            }
        });
        return data[0] || {};
    };

    const percentHandler = () => {
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
        }, Math.floor(Math.random() * 20));
    };

    const submitSuccess = () => {
        window.clearInterval(timer.current);
        timer.current = null;
        setPercent(100);
        setTimeout(() => {
            setLoading(false);
        }, 50);
    };

    const inpChangeHandler = (record, stockInventory, e) => {
        const { value } = e.target;
        const stockInventoryData = stockInventory.map((item, i) => {
            if (item.key == record.key) {
                item.qty = value;
            }
            return item;
        });
        setStockInventory(stockInventoryData);
    };

    return (
        <div className="reservation__container">
            {/* <CaHead /> */}
            <h1 className="title">預收股票</h1>
            <Tabs
                defaultActiveKey={stockActiveTabKey.current}
                animated={{ inkBar: true, tabPane: true }}
                onChange={changleHandler}
            >
                <TabPane tab="預收股票申請" key="1" disabled={dataLoading}>
                    <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
                    <ApplyContent
                        key="table1"
                        scroll={{ x: 860 }}
                        contenterTitle={'預收股票申請'}
                        dataSource={stockInventory}
                        columns={columnsData}
                        pagination={false}
                        loading={{
                            indicator: (
                                <div
                                    style={{
                                        marginTop: '20px',
                                        color: 'black',
                                        fontSize: '1.6rem',
                                        width: '100%',
                                        transform: 'translateX(-49%) translateY(-54px)',
                                    }}
                                >
                                    資料加載中...
                                </div>
                            ),
                            spinning: dataLoading,
                        }}
                    />
                    <Msg
                        style={{ marginTop: '30px' }}
                        list={[
                            { txt: '「注意事項」' },
                            { txt: '1. 預收股票時間為台股交易日8:00~14:30' },
                            { txt: '2. 必須簽署「保管劃撥帳戶契約書」後，才能申請', color: '#e46262' },
                            {
                                txt:
                                    '3. 逐筆申請：點選[申請]後，請至[預收股票查詢]點選[查詢]確認已完成此筆股票預收後，再進行下一筆申請',
                                color: '#e46262',
                            },
                            { txt: '4. 即時庫存股數：昨日庫存股數+今日匯撥股數+今日成交股數' },
                            { html: '<p>&nbsp;&nbsp;&nbsp;&nbsp;可圈存股數：昨日庫存股數+今日匯撥股數</p>' },
                            { txt: '5. 如需解除圈存股票(例如欲進行存券匯撥/公開收購)，請與所屬分公司/營業員聯繫' },
                            {
                                txt:
                                    '6. 當日圈存之委託未成交，當日晚上自動將未成交股數解除(依集保公司解除圈存作業時間為主)',
                            },
                        ]}
                    />
                </TabPane>
                <TabPane tab="預收股票查詢" key="2" disabled={dataLoading}>
                    <Accounts key="2" style={{ marginTop: '35px' }} value={defaultValue} />
                    <ApplyContent
                        key="table2"
                        scroll={{ x: 860 }}
                        contenterTitle={'預收股票查詢'}
                        dataSource={statusData}
                        columns={columnsData}
                        pagination={false}
                        loading={{
                            indicator: (
                                <div
                                    style={{
                                        marginTop: '20px',
                                        color: 'black',
                                        fontSize: '1.6rem',
                                        width: '100%',
                                        transform: 'translateX(-49%) translateY(-54px)',
                                    }}
                                >
                                    資料加載中...
                                </div>
                            ),
                            spinning: dataLoading,
                        }}
                    />
                    <Msg
                        style={{ marginTop: '30px' }}
                        list={[
                            { txt: '「注意事項」' },
                            { txt: '1. 預收股票時間為台股交易日8:00~14:30' },
                            {
                                txt:
                                    '2. 於[預收股票申請]點選[申請]後，請至[預收股票查詢]點選[查詢]確認已完成此筆股票預收後，再進行下一筆申請',
                                color: '#e46262',
                            },
                            { txt: '3. 申請預收股票後，需於集保圈存成功後，方可委託賣出', color: '#e46262' },
                            { txt: '4. 如需解除圈存股票(例如欲進行存券匯撥/公開收購)，請與所屬分公司/營業員聯繫' },
                            {
                                txt:
                                    '5. 當日圈存之委託未成交，當日晚上自動將未成交股數解除圈存(依集保公司解除圈存作業時間為主)',
                            },
                        ]}
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
                    max-width: 1000px;
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
                .ant-notification-notice-with-icon .ant-notification-notice-message {
                    font-size: 1.5rem !important;
                }
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

import { useContext, useState, useEffect, useRef } from 'react';
import { Button, Input, notification, Modal } from 'antd';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { SELECTED } from '../../../../store/advanceCollection/actionType';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import SearchBox from '../../debitDeposit/elements/SearchBox';
import Msg from '../../advanceCollection/Msg';
// import { fetchStockInventory } from '../../../../services/components/reservationStock/fetchStockInventory';
import { getToken } from '../../../../services/user/accessToken';
import { sign, signCert, checkSignCA } from '../../../../services/webCa';
import { postApplyEarmark } from '../../../../services/components/reservationStock/postApplyEarmark';
import Loading from '../../debitDeposit/elements/Loading';
import { fetchShortSellingInventory } from '../../../../services/components/cashRepayment/fetchStockInventory';
import { formatNum } from '../../../../services/formatNum';
import { postSecuritiesRedemptions } from '../../../../services/components/cashRepayment/postSecuritiesRedemptions';
const Apply = ({ active, showSearchBox = true }) => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [columns, setColumns] = useState([]);
    const [stockInventory, setStockInventory] = useState([]);
    // const [activeType, setActiveType] = useState('1');
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(null);
    const stockInventoryData = useRef([]);
    const isWebView = useRef(true);
    useEffect(() => {
        if (state.accountsReducer.disabled) {
            notification.warning({
                message: state.accountsReducer.disabled,
                top: '100px',
            });
        }
    }, [state.accountsReducer.disabled]);

    useEffect(() => {
        if (state.accountsReducer.accounts.length > 0) {
            dispatch({ type: SELECTED, payload: state.accountsReducer.accounts[0] });
        }
    }, [state.accountsReducer.accounts]);

    useEffect(() => {
        if (active && state.accountsReducer.selected.broker_id) {
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
            getInventory(state.accountsReducer.activeType);
        }
    }, [state.accountsReducer.selected.account, state.accountsReducer.activeType, active]);

    const getInventory = activeType => {
        if (getToken()) {
            let data = getAccountsDetail(getToken());
            fetchInventory(getToken(), data.broker_id, data.account, activeType);
        }
    };

    //取得選擇帳號的詳細資料，驗憑證
    const getAccountsDetail = token => {
        let data = jwt_decode(token);
        data = data.acts_detail.filter(item => {
            if (item.account === state.accountsReducer.selected.account) {
                return true;
            }
        });
        return data[0] || {};
    };

    const fetchInventory = async (token, brokerId, account, activeType) => {
        setDataLoading(true);
        try {
            let resData = await fetchShortSellingInventory(token, brokerId, account, activeType, '1');
            if (Array.isArray(resData)) {
                resData = resData.map((item, index) => {
                    item.key = String(index);
                    item.action = '申請';
                    item.qty = '';
                    return item;
                });
                resData = resData.filter(item => {
                    return item.stock_amount_t1 != 0;
                });
                console.log('res data', resData);
                setStockInventory(resData);
                stockInventoryData.current = resData;
            } else {
                if (resData === '尚未簽署保管劃撥契約書') {
                    Modal.confirm({
                        content:
                            '抱歉，您必須簽署「保管劃撥帳戶契約書」後，才能繼續申請，是否前往線上簽署中心進行簽署？',
                        onOk() {
                            window.location = `${
                                process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN
                            }/sign3382/?TOKEN=${getToken()}`;
                        },
                        okText: '確認',
                        cancelText: '取消',
                    });
                } else {
                    Modal.error({
                        title: resData,
                    });
                }
                setStockInventory([]);
            }
            setDataLoading(false);
        } catch (error) {
            Modal.error({
                title: '伺服器錯誤',
            });
            setDataLoading(false);
        }
    };

    const submitHandler = (text, record) => {
        if (validateQty(record.qty, record.open_position_qty)) {
            console.log(text, record);
            // console.log(jwt_decode(getToken()));
            submitData(record);
        }
    };

    const submitData = async record => {
        //token, branch, account, symbol, qty, category
        const token = getToken();
        let data = getAccountsDetail(token);
        //驗憑證(2)
        let caContent = sign(
            {
                idno: data.idno,
                broker_id: data.broker_id,
                account: data.account,
            },
            true,
            token,
            isWebView.current,
        );
        // console.log('newCaContent', caContent); //checkSignCA(caContent)
        if (checkSignCA(caContent)) {
            setLoading(true);
            // percentHandler();
            const resData = await postSecuritiesRedemptions({
                branch: data.broker_id,
                account: data.account,
                symbol: record.code,
                qty: String(record.qty),
                match_date: record.match_date,
                order_no: record.order_no,
                match_price: record.match_price,
                token,
                caContent,
            });
            setLoading(false);
            if (resData) {
                Modal.success({
                    content: resData,
                    onOk() {
                        getInventory(state.accountsReducer.activeType);
                    },
                });
            }
        }
    };

    const validateQty = (value, loadQty) => {
        const regex = /^[0-9]{1,20}$/;
        console.log(value, loadQty);
        if (!isNaN(value) && regex.test(value)) {
            if (Number(value) <= Number(loadQty)) {
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

    useEffect(() => {
        setColumns([
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                index: 10,
                width: '30px',
                render: (text, record, index) => {
                    return (
                        <Button
                            className="applyBtn"
                            disabled={state.accountsReducer.disabled}
                            onClick={submitHandler.bind(null, text, record)}
                        >
                            {text}
                        </Button>
                    );
                },
            },
            {
                title: '股票代號',
                dataIndex: 'code',
                key: 'code',
                width: '50px',
                // sorter: (a, b) => {
                //     if (String(a.code).trim().length < String(b.code).trim().length) {
                //         return -1;
                //     } else if (String(a.code).trim().length > String(b.code).trim().length) {
                //         return 1;
                //     } else {
                //         return Number(a.code) - Number(b.code);
                //     }
                // },
                index: 1,
            },
            {
                title: '股票名稱',
                dataIndex: 'code_name',
                key: 'code_name',
                width: '100px',
                // sorter: (a, b) => {
                //     return sortString(a.code_name.replace(/ /g, ''), b.code_name.replace(/ /g, ''));
                // },
                index: 2,
            },
            {
                title: '成交日',
                dataIndex: 'match_date',
                key: 'match_date',
                width: '70px',
                index: 3,
                render: text => {
                    return moment(text).format('yyyy/MM/DD');
                },
            },
            {
                title: '成交單價',
                dataIndex: 'match_price',
                key: 'match_price',
                width: '70px',
                index: 4,
            },
            {
                title: '未沖擔保品',
                dataIndex: 'open_collateral_price',
                key: 'open_collateral_price',
                width: '70px',
                index: 5,
                render: text => {
                    return formatNum(text);
                },
            },
            {
                title: '未沖保證金',
                dataIndex: 'open_selling_margin_price',
                key: 'open_selling_margin_price',
                width: '70px',
                index: 6,
                render: text => {
                    return formatNum(text);
                },
            },
            {
                title: '維持率',
                dataIndex: 'margin_ratio',
                key: 'margin_ratio',
                width: '50px',
                index: 7,
                render: (text, record, index) => {
                    return `${text}%`;
                },
            },
            {
                title: '可申請股數',
                dataIndex: 'open_position_qty',
                key: 'open_position_qty',
                width: '70px',
                index: 8,
            },
            {
                title: '申請股數',
                dataIndex: 'qty',
                key: 'qty',
                width: '120px',
                index: 9,
                render: (text, record, index) => {
                    return <Input value={text} onChange={inpChangeHandler.bind(null, record, stockInventory)} />;
                },
            },
        ]);
    }, [stockInventory]);

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

    const typeString = type => {
        switch (type) {
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
    };

    const sortString = (a, b) => {
        if (a.trim().length < b.trim().length) {
            return -1;
        } else if (a.trim().length > b.trim().length) {
            return 1;
        } else {
            const stringA = a.toUpperCase();
            const stringB = b.toUpperCase();
            if (stringA < stringB) {
                return -1;
            }
            if (stringA > stringB) {
                return 1;
            }
            return 0;
        }
    };

    const searchClickHandler = searchVal => {
        if (searchVal === '') {
            setStockInventory(stockInventoryData.current);
            return;
        }

        let newInventory = stockInventoryData.current.filter(val => {
            if (val.code.indexOf(searchVal) >= 0) {
                return true;
            }
            if (val.code_name.indexOf(searchVal) >= 0) {
                return true;
            }
        });
        setStockInventory(newInventory);
    };

    return (
        <>
            <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
            {showSearchBox && <SearchBox showFilter={true} searchClickHandler={searchClickHandler} />}
            <ApplyContent
                scroll={{ x: 860 }}
                contenterTitle={'現券償還申請'}
                columns={columns}
                dataSource={stockInventory}
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
                    { txt: '1. 線上申請時間為(股票交易日)營業日9:00~14:00，不提供預約' },
                    {
                        txt: '2. 申請送出後，請至查詢頁面確認是否成功',
                    },
                    {
                        txt: '3. 申請成功，如欲取消，請洽所屬分公司',
                    },
                    {
                        html: '<span style="margin-top: -10px">4.	申請標的說明</span>',
                    },
                    {
                        html: '<span>&nbsp;&nbsp;&nbsp;(1) 股票須完成交割才可進行線上申請</span>',
                    },
                    { html: '<span>&nbsp;&nbsp;&nbsp;(2) 借券庫存優先扣帳</span>' },
                ]}
            />
            <Loading loading={loading} step={20} />
            <style global jsx>{`
                .applyTable__container .ant-table-cell {
                    font-size: 16px;
                    white-space: nowrap;
                }
                .applyBtn.ant-btn {
                    font-size: 14px;
                    border: none;
                    color: #ffffff;
                    background: #d23749;
                    line-height: 24px;
                    font-weight: bold;
                    transition: 0.3s;
                    border-radius: 3px;
                }
                @media (max-width: 580px) {
                    .applyBtn.ant-btn {
                        width: 100%;
                    }
                }
                .applyBtn.ant-btn:not([disabled]):hover {
                    background: #bb1428;
                }
                .applyBtn.ant-btn:disabled {
                    background: #b7b7b7;
                    color: #dadada;
                }
                .applyBtn.ant-btn:disabled:hover {
                    background: #b7b7b7;
                    color: #dadada;
                }
            `}</style>
        </>
    );
};

export default Apply;

import { useContext, useState, useEffect, useRef } from 'react';
import { Button, Input, notification, Modal } from 'antd';
import jwt_decode from 'jwt-decode';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import SearchBox from './SearchBox';
import Msg from '../../advanceCollection/Msg';
import { fetchStockInventory } from '../../../../services/components/reservationStock/fetchStockInventory';
import { getToken } from '../../../../services/user/accessToken';
import { sign, signCert, checkSignCA } from '../../../../services/webCa';
import { postApplyEarmark } from '../../../../services/components/reservationStock/postApplyEarmark';
import Loading from './Loading';
const Apply = () => {
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
        setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
        getInventory(state.accountsReducer.activeType);
    }, [state.accountsReducer.selected.account, state.accountsReducer.activeType]);

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
            let resData = await fetchStockInventory(token, brokerId, account, activeType, '1');
            if (Array.isArray(resData)) {
                resData = resData.map((item, index) => {
                    item.key = String(index);
                    item.action = '申請';
                    item.qty = '';
                    return item;
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
        if (validateQty(record.qty, record.load_qty, record.stock_amount_t1)) {
            console.log(text, record);
            // console.log(jwt_decode(getToken()));
            submitData(record);
        }
    };

    const submitData = async record => {
        //token, branch, account, symbol, qty, category
        const token = getToken();
        let data = getAccountsDetail(token);
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
            isWebView.current,
        );
        // console.log('newCaContent', caContent);
        if (checkSignCA(caContent)) {
            //checkSignCA(caContent)
            setLoading(true);
            // percentHandler();
            const resData = await postApplyEarmark(
                token,
                data.broker_id,
                data.account,
                record.code,
                String(record.qty),
                '1',
                caContent,
            );
            setLoading(false);
            // submitSuccess();
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

    const validateQty = (value, loadQty, stockAmount) => {
        const regex = /^[0-9]{1,20}$/;
        if (!isNaN(value) && regex.test(value)) {
            if (Number(value) <= Number(stockAmount)) {
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
                index: 6,
                render: (text, record, index) => {
                    return (
                        <Button
                            className="applyBtn"
                            //disabled={state.accountsReducer.disabled}
                            onClick={submitHandler.bind(null, text, record)}
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
                sorter: (a, b) => {
                    const aTypeStr = typeString(a.load_type);
                    const bTypeStr = typeString(b.load_type);
                    return sortString(aTypeStr, bTypeStr);
                },
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
                sorter: (a, b) => {
                    return Number(a.code) - Number(b.code);
                },
                index: 1,
            },
            {
                title: '股票名稱',
                dataIndex: 'code_name',
                key: 'code_name',
                sorter: (a, b) => {
                    return sortString(a.code_name.replace(/ /g, ''), b.code_name.replace(/ /g, ''));
                },
                index: 2,
            },
            {
                title: '可圈存股數',
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
                title: '申請圈存股數',
                dataIndex: 'qty',
                key: 'qty',
                index: 5,
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
            <SearchBox showFilter={true} searchClickHandler={searchClickHandler} />
            <ApplyContent
                scroll={{ x: 860 }}
                contenterTitle={'借券圈存申請'}
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
                    { txt: '1. 借券圈存時間為台股交易日8:00~14:30' },
                    {
                        txt: '2. 必須簽署「保管劃撥帳戶契約書」後，才可顯示庫存與進行申請',
                        color: '#e46262',
                    },
                    {
                        txt:
                            '3. 逐筆申請：點選[申請]後，請至[借券圈存查詢]點選[查詢]確認已完成此筆股票圈存後，再進行下一筆申請',
                        color: '#e46262',
                    },
                    {
                        html:
                            '<span>4. 可圈存股數：昨日<span style="color: #e46262; margin-bottom: 12px; display: inline-block">借券</span>庫存股數 + 今日匯撥/<span style="color: #e46262; margin-bottom: 12px; display: inline-block">借券</span>股數 - 已圈存股數</span>',
                    },
                    {
                        txt: '5. 網路不提供解圈服務與人工解圈之查詢資訊，請洽所屬分公司辦理及查詢',
                    },
                    { txt: '6. 當日圈存之委託未成交，當日晚上自動將未成交股數解除(依集保公司解除圈存作業時間為主)' },
                ]}
            />
            <Loading loading={loading} step={20} />
            <style global jsx>{`
                .applyBtn.ant-btn {
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

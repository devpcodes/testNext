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
import { SELECTED } from '../../../../store/advanceCollection/actionType';
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
        if (state.accountsReducer.selected === '') {
            dispatch({ type: SELECTED, payload: state.accountsReducer.accounts[0] });
        }
    }, [state.accountsReducer.accounts]);

    useEffect(() => {
        if (active) {
            console.log('test', state.accountsReducer.selected.broker_id, state.accountsReducer.selected.account);
            setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
            getInventory(state.accountsReducer.activeType);
        }
    }, [state.accountsReducer.selected.account, state.accountsReducer.activeType, active]);

    const getInventory = activeType => {
        let data = getAccountsDetail(getToken());
        if (getToken() && data.broker_id != null) {
            fetchInventory(getToken(), data.broker_id, data.account, activeType);
        }
    };

    //?????????????????????????????????????????????
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
                    item.action = '??????';
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
                if (resData === '?????????????????????????????????') {
                    Modal.confirm({
                        content:
                            '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
                        onOk() {
                            window.location = `${
                                process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN
                            }/sign3382/?TOKEN=${getToken()}`;
                        },
                        okText: '??????',
                        cancelText: '??????',
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
                title: '???????????????',
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
        //?????????(1)
        // let caContent = await signCert(
        //     {
        //         idno: data.idno,
        //         broker_id: data.broker_id,
        //         account: data.account,
        //     },
        //     true,
        //     token,
        // );

        //?????????(2)
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
            // if (value % 1000 !== 0) {
            //     Modal.error({
            //         content: '?????????1000?????????',
            //     });
            //     return false;
            // }

            if (Number(value) <= Number(stockAmount)) {
                return true;
            } else {
                Modal.error({
                    content: '?????????????????????',
                });
                return false;
            }
        }
        if (value === '') {
            Modal.error({
                content: '?????????????????????',
            });
        } else {
            Modal.error({
                content: '??????????????????',
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
                            disabled={state.accountsReducer.disabled}
                            onClick={submitHandler.bind(null, text, record)}
                        >
                            {text}
                        </Button>
                    );
                },
            },
            {
                title: '????????????',
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
                            return '??????';
                        case '1':
                            return '????????????';
                        case '2':
                            return '????????????';
                        case '3':
                            return '????????????';
                        default:
                            break;
                    }
                },
            },
            {
                title: '????????????',
                dataIndex: 'code',
                key: 'code',
                sorter: (a, b) => {
                    if (String(a.code).trim().length < String(b.code).trim().length) {
                        return -1;
                    } else if (String(a.code).trim().length > String(b.code).trim().length) {
                        return 1;
                    } else {
                        return Number(a.code) - Number(b.code);
                    }
                },
                index: 1,
            },
            {
                title: '????????????',
                dataIndex: 'code_name',
                key: 'code_name',
                sorter: (a, b) => {
                    return sortString(a.code_name.replace(/ /g, ''), b.code_name.replace(/ /g, ''));
                },
                index: 2,
            },
            {
                title: '???????????????',
                dataIndex: 'stock_amount_t1',
                key: 'stock_amount_t1',
                index: 3,
            },
            {
                title: '???????????????',
                dataIndex: 'load_qty',
                key: 'load_qty',
                index: 4,
            },
            {
                title: '??????????????????',
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
                return '??????';
            case '1':
                return '????????????';
            case '2':
                return '????????????';
            case '3':
                return '????????????';
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
                contenterTitle={'??????????????????'}
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
                            ???????????????...
                        </div>
                    ),
                    spinning: dataLoading,
                }}
            />
            <Msg
                style={{ marginTop: '30px' }}
                list={[
                    { txt: '??????????????????' },
                    { txt: '1. ????????????????????????????????????8:00~14:30' },
                    {
                        txt: '2. ????????????????????????????????????????????????????????????????????????????????????',
                        color: '#e46262',
                    },
                    {
                        txt:
                            '3. ?????????????????????[??????]????????????[??????????????????]??????[??????]???????????????????????????????????????????????????????????????',
                        color: '#e46262',
                    },
                    {
                        html:
                            '<span>4. ????????????????????????<span style="color: #e46262; margin-bottom: 12px; display: inline-block">??????</span>???????????? + ????????????/<span style="color: #e46262; margin-bottom: 12px; display: inline-block">??????</span>?????? - ???????????????</span>',
                    },
                    {
                        txt: '5. ????????????????????????????????????????????????????????????????????????????????????????????????',
                    },
                    { txt: '6. ???????????????????????????????????????????????????????????????????????????(?????????????????????????????????????????????)' },
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

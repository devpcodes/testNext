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
const Apply = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [columns, setColumns] = useState([]);
    // const [activeType, setActiveType] = useState('1');
    const [dataLoading, setDataLoading] = useState(false);

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
                // setStockInventory(resData);
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
                // setStockInventory([]);
            }
            setDataLoading(false);
        } catch (error) {
            Modal.error({
                title: '伺服器錯誤',
            });
            setDataLoading(false);
        }
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
                        //disabled={state.accountsReducer.disabled}
                        //onClick={clickHandler.bind(null, text, record)}
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
                    // const aTypeStr = typeString(a.load_type);
                    // const bTypeStr = typeString(b.load_type);
                    // return sortString(aTypeStr, bTypeStr);
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
                    // return Number(a.code) - Number(b.code);
                },
                index: 1,
            },
            {
                title: '股票名稱',
                dataIndex: 'code_name',
                key: 'code_name',
                sorter: (a, b) => {
                    // return sortString(a.code_name.replace(/ /g, ''), b.code_name.replace(/ /g, ''));
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
    }, []);

    return (
        <>
            <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
            <SearchBox showFilter={true} />
            <ApplyContent
                scroll={{ x: 860 }}
                contenterTitle={'借券圈存申請'}
                columns={columns}
                dataSource={[]}
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
        </>
    );
};

export default Apply;

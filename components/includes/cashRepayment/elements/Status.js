import { useContext, useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { Modal } from 'antd';
import moment from 'moment';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import Msg from '../../advanceCollection/Msg';
import { getToken } from '../../../../services/user/accessToken';
import { fetchEarmarkStatus } from '../../../../services/components/reservationStock/fetchEarmarkStatus';
import { fetchQuerySecuritiesRedemptionsStatus } from '../../../../services/components/cashRepayment/fetchQuerySecuritiesRedemptionsStatus';
const Status = ({ active }) => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [columns, setColumns] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const statusResData = useRef([]);
    const [dataLoading, setDataLoading] = useState(false);
    useEffect(() => {
        if (active) {
            getStatus();
        }
    }, [active, state.accountsReducer.selected.account]);

    const getStatus = async () => {
        const token = getToken();
        if (token) {
            let data = getAccountsDetail(token);
            setDataLoading(true);
            let resData = await fetchQuerySecuritiesRedemptionsStatus(token, data.broker_id, data.account, '1');
            if (Array.isArray(resData)) {
                resData = resData.map((item, index) => {
                    item.key = String(index);
                    return item;
                });
                setStatusData(resData);
                setDataLoading(false);
                statusResData.current = resData;
                // setFilterData(resData);
            } else {
                Modal.error({
                    title: '伺服器錯誤',
                });
                setDataLoading(false);
                statusResData.current = [];
            }
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

    useEffect(() => {
        setColumns([
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
                title: '成交日',
                dataIndex: 'match_date',
                key: 'match_date',
                index: 5,
                render: (text, record, index) => {
                    return moment(text).format('yyyy/MM/DD');
                },
            },
            {
                title: '成交單價',
                dataIndex: 'match_price',
                key: 'match_price',
                index: 6,
            },
            {
                title: '申請股數',
                dataIndex: 'apply_amount',
                key: 'apply_amount',
                index: 7,
            },
            // {
            //     title: '退還金額',
            //     dataIndex: 'order_status_description',
            //     key: 'order_status_description',
            //     index: 8,
            // },
            {
                title: '狀態',
                dataIndex: 'order_status_msg',
                key: 'order_status_msg',
                index: 9,
            },
            {
                title: '狀態說明',
                dataIndex: 'order_status_description',
                key: 'order_status_description',
                index: 10,
            },
        ]);
    }, [statusData]);

    useEffect(() => {
        setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
    }, [state.accountsReducer.selected.account]);

    const searchClickHandler = searchVal => {
        if (searchVal === '') {
            setStatusData(statusResData.current);
            return;
        }

        let newInventory = statusResData.current.filter(val => {
            if (val.code.indexOf(searchVal) >= 0) {
                return true;
            }
            if (val.code_name.indexOf(searchVal) >= 0) {
                return true;
            }
        });
        setStatusData(newInventory);
    };

    return (
        <>
            <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
            <ApplyContent
                scroll={{ x: 860 }}
                contenterTitle={'現券償還查詢'}
                columns={columns}
                dataSource={statusData}
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
                    { txt: '3. 申請成功，如欲取消，請洽所屬分公司' },
                    { txt: '4. 永豐金證券不負擔匯費' },
                    {
                        txt: '5. 次一營業日退還款項',
                    },
                ]}
            />
        </>
    );
};

export default Status;

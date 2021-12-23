import { useContext, useState, useEffect, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import SearchBox from './SearchBox';
import Msg from '../../advanceCollection/Msg';
import { getToken } from '../../../../services/user/accessToken';
import { fetchEarmarkStatus } from '../../../../services/components/reservationStock/fetchEarmarkStatus';
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
            let resData = await fetchEarmarkStatus(token, data.broker_id, data.account, '1');
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
                title: '圈存股數',
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
            <SearchBox showFilter={false} searchClickHandler={searchClickHandler} />
            <ApplyContent
                scroll={{ x: 860 }}
                contenterTitle={'借券圈存查詢'}
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
                    { txt: '1. 借券圈存時間為台股交易日8:00~14:30' },
                    {
                        txt:
                            '2. 於[借券圈存申請]點選[申請]後，請至[借券圈存查詢]點選[查詢]確認已完成此筆股票圈存後，再進行下一筆申請',
                        color: '#e46262',
                    },
                    { txt: '3. 申請借券圈存後，需於集保圈存成功後，方可委託賣出', color: '#e46262' },
                    { txt: '4. 網路不提供解圈服務與人工解圈之查詢資訊，請洽所屬分公司辦理及查詢' },
                    {
                        txt: '5. 當日圈存之委託未成交，當日晚上自動將未成交股數解除(依集保公司解除圈存作業時間為主)',
                    },
                ]}
            />
        </>
    );
};

export default Status;

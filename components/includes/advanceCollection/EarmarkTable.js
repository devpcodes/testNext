import { useEffect, useContext, useRef, useState, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import { fetchQueryEarmarkReserveStatus } from '../../../services/components/reservationStock/fetchQueryEarmarkReserveStatus';
import ApplyContent from './ApplyContent';
import { ReducerContext } from '../../../pages/AdvanceCollection';
import { getToken } from '../../../services/user/accessToken';

const EarmarkTable = () => {
    const [columnsData, setColumnsData] = useState([]);
    const [state, dispatch] = useContext(ReducerContext);
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [state.accountsReducer.selected]);
    useEffect(() => {
        const columns = [
            {
                title: '委託時間',
                dataIndex: 'order_datetime',
                key: 'order_datetime',
                index: 1,
                render: (text, record, index) => {
                    // return moment(text).format('HH:mm');
                    return text;
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
                title: '委託價',
                dataIndex: 'order_price',
                key: 'order_price',
                index: 5,
            },
            {
                title: '股數',
                dataIndex: 'order_qty',
                key: 'order_qty',
                index: 6,
            },
            {
                title: '扣款金額',
                dataIndex: 'deduction_amount',
                key: 'deduction_amount',
                index: 7,
            },
            {
                title: '狀態',
                dataIndex: 'order_status_msg',
                key: 'order_status_msg',
                index: 7,
            },
        ];
        setColumnsData(columns);
    }, [data]);
    const fetchData = async () => {
        const token = getToken();
        let data = getAccountsDetail(token);
        try {
            setDataLoading(true);
            let resData = await fetchQueryEarmarkReserveStatus({
                account: data.account,
                branch: data.broker_id,
                token,
            });
            setDataLoading(false);
            if (Array.isArray(resData)) {
                resData = resData.map((item, index) => {
                    item.key = String(index);
                    return item;
                });
                setData(resData);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getAccountsDetail = token => {
        let data = jwt_decode(token);
        data = data.acts_detail.filter(item => {
            if (item.account === state.accountsReducer.selected.account) {
                return true;
            }
        });
        return data[0] || {};
    };
    return (
        <>
            <ApplyContent
                contenterTitle={'預收款項查詢'}
                columns={columnsData}
                dataSource={data}
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
        </>
    );
};

export default EarmarkTable;

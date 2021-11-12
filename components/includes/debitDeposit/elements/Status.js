import { useContext, useState, useEffect } from 'react';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import SearchBox from './SearchBox';
import Msg from '../../advanceCollection/Msg';
const Status = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [columns, setColumns] = useState([]);

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
    }, []);

    useEffect(() => {
        setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
    }, [state.accountsReducer.selected.account]);

    return (
        <>
            <Accounts key="1" style={{ marginTop: '35px' }} value={defaultValue} />
            <SearchBox showFilter={false} />
            <ApplyContent scroll={{ x: 860 }} contenterTitle={'借券圈存查詢'} columns={columns} dataSource={[]} />
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
                    {
                        html:
                            '<span>6. 送出的圈存申請，為<span style="color: #e46262; margin-bottom: 12px; display: inline-block">借券庫存之圈存申請</span></span>',
                    },
                    { txt: '7. 因一位客戶僅能擁有一個借券戶，在[申請帳號]請直接寫死客戶有借券資格的帳號。' },
                ]}
            />
        </>
    );
};

export default Status;

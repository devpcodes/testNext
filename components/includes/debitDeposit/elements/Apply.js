import { useContext, useState, useEffect } from 'react';
import { Button, Input } from 'antd';
// import { ReducerContext } from '../../../../pages/AdvanceCollection';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import Accounts from '../../advanceCollection/Accounts';
import ApplyContent from '../../advanceCollection/ApplyContent';
import SearchBox from './SearchBox';
import Msg from '../../advanceCollection/Msg';
const Apply = () => {
    const [state, dispatch] = useContext(ReducerContext);
    const [defaultValue, setDefaultValue] = useState('');
    const [columns, setColumns] = useState([]);

    // useEffect(() => {
    //     setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
    // }, []);
    useEffect(() => {
        setDefaultValue(state.accountsReducer.selected.broker_id + state.accountsReducer.selected.account);
    }, [state.accountsReducer.selected.account]);

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
            <ApplyContent scroll={{ x: 860 }} contenterTitle={'借券圈存申請'} columns={columns} dataSource={[]} />
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

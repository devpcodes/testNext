import { useEffect, useMemo, useState, useCallback } from 'react';
import { Modal, Select, Tag, Button } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postUnrealizedWithSwr } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
import { secretToggle } from '../../../../../../services/components/tradingAccount/subBrokerage/secretToggle';
import BuyButton from '../../../vipInventory/buttons/BuyButton';
import SellButton from '../../../vipInventory/buttons/SellButton';
import ItemCard from '../elements/ItemCard';
const Unrealized = ({ toOrderBox }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState({ data: [], sum_data: [] });
    const [columns, setColumns] = useState([]);
    const [sum_columns, setColumnsSum] = useState([]);
    const [refreshTime, setRefreshTime] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('ALL');
    const [hidden, setHidden] = useState(false);

    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                account: currentAccount.account,
                broker_id: currentAccount.broker_id,
                token: getToken(),
                market: marketFilterValue,
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount, refresh]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postUnrealizedWithSwr, {
        onError: (error, key) => {
            Modal.error({
                title: error,
            });
        },
        errorRetryCount: 3,
        focusThrottleInterval: 10000,
        errorRetryInterval: 10000,
    });

    useEffect(() => {
        let time = moment(new Date).format('YYYY.MM.DD HH:mm:SS') 
        setRefreshTime(time)
        const newData = { data: [], sum_data: [] };
        if (fetchData && Array.isArray(fetchData.data)) {
            const d_ = fetchData.data.map((item, index) => {
                item.key = index;
                return item;
            });
            newData.data = d_;
        }
        if (fetchData && Array.isArray(fetchData.sum_data)) {
            const sd_ = fetchData.sum_data.map((item, index) => {
                item.key = index;
                return item;
            });
            newData.sum_data = sd_;
        }
        console.log(newData);
        setData(newData);
        setFilterData(newData.data);
    }, [fetchData]);

    useEffect(() => {
        const newColumns = [
            {
                title: '市場',
                dataIndex: 'market',
                key: 'market',
                align: 'center',
                fixed: true,
                width: '130px',
                sorter: (a, b) => a.market.localeCompare(b.market),
                ...getColumnSearchProps('market'),
            },
            {
                title: '代碼',
                dataIndex: 'symbol',
                key: 'symbol',
                align: 'center',
                fixed: true,
                width: '100px',
                sorter: (a, b) => a.symbol - b.symbol,
            },
            {
                title: '商品',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: '250px',
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: '庫存',
                dataIndex: 'last_inv',
                key: 'last_inv',
                align: 'center',
                width: '120px',
                sorter: (a, b) => a.last_inv - b.last_inv,
            },
            {
                title: '成本',
                dataIndex: 'cost',
                key: 'cost',
                align: 'center',
                width: '150px',
                sorter: (a, b) => a.cost - b.cost,
            },
            {
                title: '成本均價',
                dataIndex: 'ave_cost',
                key: 'ave_cost',
                align: 'center',
                width: '150px',
                sorter: (a, b) => a.ave_cost - b.ave_cost,
            },
            {
                title: '市值',
                dataIndex: 'amount',
                key: 'amount',
                align: 'center',
                width: '150px',
                sorter: (a, b) => a.amount - b.amount,
            },
            {
                title: '損益',
                dataIndex: 'pl',
                key: 'pl',
                align: 'center',
                width: '150px',
                sorter: (a, b) => a.pl - b.pl,
            },
            {
                title: '報酬率',
                dataIndex: 'roi',
                key: 'roi',
                align: 'center',
                width: '150px',
                sorter: (a, b) => a.roi - b.roi,
                render: content => {
                    return <Tag color="#d9534f">{(content * 1).toFixed(2)}%</Tag>;
                },
            },
            {
                title: '幣別',
                dataIndex: 'curr',
                key: 'Currency',
                align: 'center',
                width: '100px',
                sorter: (a, b) => a.curr - b.curr,
            },
            {
                title: '動作',
                dataIndex: 'symbol',
                key: 'active',
                align: 'center',
                fixed: true,
                width: '150px',
                render: content => {
                    return (
                        <div style={{ marginLeft: '12px' }}>
                            <BuyButton
                                text={'買進'}
                                onClick={
                                    e => toOrderBox_unr(e, content, 'B')
                                    // let qty;
                                    // let marketType = '';
                                    // if (record.rqty % 1000 == 0) {
                                    //     qty = record.rqty / 1000;
                                    // } else {
                                    //     qty = record.rqty;
                                    //     marketType = 'Z';
                                    // }
                                    // openGoOrder(
                                    //     {
                                    //         stockid: record.stock,
                                    //         bs: 'B',
                                    //         qty: qty,
                                    //         marketType,
                                    //         // qty: parseInt(
                                    //         //     Number(record.preqty + record.tranqty + record.bqty - record.sqty) /
                                    //         //         1000,
                                    //         // ),
                                    //     },
                                    //     isMobile,
                                    //     router,
                                    // );
                                }
                            />
                            <SellButton
                                text={'賣出'}
                                onClick={
                                    e => toOrderBox_unr(e, content, 'S')
                                    //toOrderBox(orderData)
                                    // {
                                    //     Market: 'US',
                                    //     Code: 'AMD',
                                    //     Product: 'AMD',
                                    //     Amount: 80,
                                    //     Cost: 6865.82
                                    // }
                                    // let qty;
                                    // let marketType = '';
                                    // if (record.rqty % 1000 == 0) {
                                    //     qty = record.rqty / 1000;
                                    // } else {
                                    //     qty = record.rqty;
                                    //     marketType = 'Z';
                                    // }
                                    // openGoOrder(
                                    //     {
                                    //         stockid: record.stock,
                                    //         bs: 'S',
                                    //         qty: qty,
                                    //         marketType,
                                    //     },
                                    //     isMobile,
                                    //     router,
                                    // );
                                }
                            />
                        </div>
                        // <button onClick={e=>consumeClick(e,content)}>下單</button>
                    );
                },
            },
        ];
        setColumns(newColumns);
        const newColumnsSum = [
            {
                title: '幣別',
                dataIndex: 'curr',
                key: 'curr',
                align: 'center',
                sorter: (a, b) => a.curr - b.curr,
            },
            {
                title: '總成本',
                dataIndex: 'sum_cost',
                key: 'sum_cost',
                align: 'center',
                sorter: (a, b) => a.sum_cost - b.sum_cost,
            },
            {
                title: '總市值',
                dataIndex: 'sum_amt',
                key: 'sum_amt',
                align: 'center',
                sorter: (a, b) => a.sum_amt - b.sum_amt,
            },
            {
                title: '總損益',
                dataIndex: 'sum_pl',
                key: 'sum_pl',
                align: 'center',
                sorter: (a, b) => a.sum_pl - b.sum_pl,
            },
            {
                title: '總報酬率',
                dataIndex: 'sum_roi',
                key: 'sum_roi',
                align: 'center',
                sorter: (a, b) => a.sum_roi - b.sum_roi,
                render: content => {
                    return <Tag color="#d9534f">{(content * 1).toFixed(2)}%</Tag>;
                },
            },
        ];
        setColumnsSum(newColumnsSum);
    }, [data, searchColumns, marketFilterValue]);

    const ItemCardDemoData = [
        {
            key: 'a',
            title: '總成本',
            content: 1111,
        },
        {
            key: 'b',
            title: '總市值',
            content: 2222,
        },
        {
            key: 'c',
            title: '總損益',
            content: 33373,
        },
        {
            key: 'd',
            title: '總報酬率',
            content: 44484,
        },
    ];
    // const handleChange = v =>{
    //     let d = data
    //     let d_ = v =='全部'? d : d.filter(x => x.TT==v)
    //     setDefaultMarket(v)
    //     setFilterData(d_)
    // }

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'market') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onMarketFilterSubmit.bind(null, confirm)}
                        onReset={onMarketFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '全部', value: 'ALL' },
                            { text: '美股', value: 'US' },
                            { text: '港股', value: 'SEHK' },
                        ]}
                    />
                ),
                filteredValue: [marketFilterValue] || null,
                onFilter: (value, record) => {
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return record.market === value;
                    }
                },
            };
        }
    };
    const toOrderBox_unr = (e, id, bs) => {
        e.preventDefault();
        console.log('toOrderBox_unr', data);
        let data_ = data.data.filter(x => x.symbol === id);
        let data__ = data_[0];
        let newData = {
            symbol: data__.symbol,
            name: data__.name,
            market: data__.market,
            qty: data__.last_inv,
            bs: bs,
            stemp: new Date().getTime(),
        };
        console.log('data__ ', newData);
        toOrderBox(newData);
    };

    const consumeClick = (e, id) => {
        e.preventDefault();
        let ds_ = data.data.filter(x => x.symbol == id)[0];
        console.log('[ds]', ds_);
        window.open(
            `
        ${url_base}?bs=B&type=H&stockid=${id}&price=${ds_.ave_cost}&qty=1&account=${
                currentAccount.broker_id + '-' + currentAccount.account
            }&nav=0#tabs-1`,
            '_blank',
            'toolbar=0,location=0,menubar=0,width=450px,height=716px',
        );
    };

    const onRefresh = (e) => {
        e.preventDefault();
        let r = refresh;
        let time = moment(new Date).format('YYYY.MM.DD HH:mm:ss') 
        setRefreshTime(time)
        setRefresh(r + 1);
    };

    const onMarketFilterSubmit = useCallback((confirm, val) => {
        confirm();
        console.log(val);
        setSearchColumns(columns => {
            if (!columns.includes('market')) {
                columns.push('market');
            }
            return columns;
        });
        setMarketFilterValue(val[0]);
    });

    const onMarketFilterReset = useCallback((confirm, val) => {
        confirm();
        if (searchColumns.indexOf('market') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('market');
                columns.splice(index, 1);
                return columns;
            });
            setMarketFilterValue('');
        }
    });

    const defaultFunc = () => {
        console.log('default');
    };
    const defaultFunc2 = e => {
        e.preventDefault();
        console.log('D2');
        //   toOrderBox(orderData)
    };
    return (
        <div className="brokerage unrealized_content">
            <div className="action_box">
                <div className="currencyT">{/*幣別 USD*/}</div>
                <div>
                    <span className="updateTime">更新時間：{refreshTime}</span>
                    {/* <IconBtn type={hidden ? 'eyeClose' : 'eyeOpen'} onClick={defaultFunc}></IconBtn> */}
                    {/* <IconBtn type={'info'} onClick={e => showModal(e, 1)}></IconBtn> */}
                    <IconBtn type={'refresh'} onClick={e => onRefresh(e) /*onRefresh*/}></IconBtn>
                </div>
                <Modal
                    title='INFO'
                    // visible={isModalVisible}
                    closable={false}
                    footer={[<Button onClick={defaultFunc /*handleCancel_info*/}>關閉</Button>]}
                >
                    {/* <div dangerouslySetInnerHTML={{ __html: modalText.content }}></div> */}
                </Modal>
            </div>

            {/* <div className="itemCard_box">
                <ItemCard dataSource={ItemCardDemoData} lineNum={4} />
            </div> */}
            <div className="table_box">
                <AccountTable
                    filterColumns={searchColumns}
                    dataSource={data.data}
                    scroll={{ x: 780 }}
                    pagination={{
                        total: data.data.length,
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                    }}
                    columns={columns}
                />
                <AccountTable
                    dataSource={data.sum_data}
                    pagination={{
                        total: data.sum_data.length,
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                    }}
                    columns={sum_columns}
                />
            </div>

            <style jsx>
                {`
                    AccountTable {
                        margin-top: 15px;
                    }
                    .updateTime {
                        color: #3f5372;
                        font-size: 16px;
                        vertical-align: middle;
                    }
                    .active_box {
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .unrealized_content .currencyT {
                        font-size: 16px;
                        color: #3f5372;
                    }
                    .unrealized_content {
                        position: relative;
                    }
                    .action_box {
                        position: absolute;
                        top: -110px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    .table_box {
                        margin: 0 0 10px;
                    }
                    .itemCard_box {
                        position: absolute;
                        top: -140px;
                        width: 100%;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .subBrokerage .action_box button {
                        margin-left: 10px;
                        vertical-align: middle;
                    }
                    .subBrokerage .ant-table-thead > tr > th:hover {
                        background-color: #f2f5fa;
                    }
                    .subBrokerage .ant-table-thead tr th.ant-table-column-has-sorters .ant-table-filter-column-title {
                        padding: 0;
                    }
                `}
            </style>
        </div>
    );
};

export default Unrealized;

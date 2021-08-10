import { useEffect, useMemo, useState, useCallback } from 'react';
import { Modal, Select, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postUnrealizedWithSwr } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import AccountTable from '../../../vipInventory/AccountTable';
const Unrealized = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState({data:[],sum_data:[]});
    const [columns, setColumns] = useState([]);
    const [sum_columns, setColumnsSum] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('ALL');
    const url_base = 'https://webrd.sinotrade.com.tw/newweb/goOrder/'
    
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                account: currentAccount.account,
                broker_id: currentAccount.broker_id,
                token: getToken(),
                market: marketFilterValue
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount,refresh]);

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
        console.log('[fetchData]',fetchData)
        const newData = {data:[],sum_data:[]}
        if (fetchData && Array.isArray(fetchData.data)) {
            const d_ = fetchData.data.map((item, index) => {
                item.key = index;
                return item;
            });
            newData.data = d_
        }
        if(fetchData && Array.isArray(fetchData.sum_data)){
            const sd_ = fetchData.sum_data.map((item, index) => {
                item.key = index;
                return item;
                });
            newData.sum_data = sd_
        }
        console.log(newData)
        setData(newData);
        setFilterData(newData.data);
    }, [fetchData]);

    useEffect(() => {
    const newColumns = [
        {
            title: '動作',
            dataIndex: 'symbol',
            key: 'active',
            align: 'center',
            fixed: true,
            width:'100px',
            render: (content) => {
                return (
                    <button onClick={e=>consumeClick(e,content)}>下單</button>
                );
            },
        },{
            title: '市場',
            dataIndex: 'market',
            key: 'market',
            align: 'center',
            fixed: true,
            width:'110px',
            sorter:(a,b)=> a.market.localeCompare(b.market),
            ...getColumnSearchProps('market'),
        },{
            title: '代碼',
            dataIndex: 'symbol',
            key: 'symbol',
            align: 'center',
            fixed: true,
            width:'100px',
            sorter: (a, b) => a.symbol - b.symbol,
        },{
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width:'250px',
            sorter:(a,b)=> a.name.localeCompare(b.name),
        },{
            title: '庫存',
            dataIndex: 'last_inv',
            key: 'last_inv',
            align: 'center',
            width:'120px',
            sorter: (a, b) => a.last_inv - b.last_inv,
        },{
            title: '成本',
            dataIndex: 'cost',
            key: 'cost',
            align: 'center',
            width:'150px',
            sorter: (a, b) => a.cost - b.cost,
        },{
            title: '成本均價',
            dataIndex: 'ave_cost',
            key: 'ave_cost',
            align: 'center',
            width:'150px',
            sorter: (a, b) => a.ave_cost - b.ave_cost,
        },{
            title: '市值',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            width:'150px',
            sorter: (a, b) => a.amount - b.amount,
        },{
            title: '損益',
            dataIndex: 'pl',
            key: 'pl',
            align: 'center',
            width:'150px',
            sorter: (a, b) => a.pl - b.pl,
        },{
            title: '報酬率',
            dataIndex: 'roi',
            key: 'roi',
            align: 'center',
            width:'150px',
            sorter: (a, b) => a.roi - b.roi,
            render: (content) => {
                return (
                    <Tag color="#d9534f">{(content*1).toFixed(2)}%</Tag>
                );
            },
        },{
            title: '幣別',
            dataIndex: 'curr',
            key: 'Currency',
            align: 'center',
            width:'100px',
            sorter: (a, b) => a.curr - b.curr,
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
        },{
            title: '總成本',
            dataIndex: 'sum_cost',
            key: 'sum_cost',
            align: 'center',
            sorter: (a, b) => a.sum_cost - b.sum_cost,
        },{
            title: '總市值',
            dataIndex: 'sum_amt',
            key: 'sum_amt',
            align: 'center',
            sorter: (a, b) => a.sum_amt - b.sum_amt,
        },{
            title: '總損益',
            dataIndex: 'sum_pl',
            key: 'sum_pl',
            align: 'center',
            sorter: (a, b) => a.sum_pl - b.sum_pl,
        },{
            title: '總報酬率',
            dataIndex: 'sum_roi',
            key: 'sum_roi',
            align: 'center',
            sorter: (a, b) => a.sum_roi - b.sum_roi,
            render: (content) => {
                return (
                    <Tag color="#d9534f">{(content*1).toFixed(2)}%</Tag>
                );
            },
        },
        
    ];
    setColumnsSum(newColumnsSum);
    }, [data, searchColumns, marketFilterValue]);


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

    const consumeClick = (e,id) =>{
        e.preventDefault();
        let ds_=data.data.filter(x=> x.symbol == id)[0]
        console.log('[ds]',ds_)
        window.open(`
        ${url_base}?bs=B&type=H&stockid=${id}&price=${ds_.ave_cost}&qty=1&account=${currentAccount.broker_id+'-'+currentAccount.account}&nav=0#tabs-1`,'_blank', 'toolbar=0,location=0,menubar=0,width=450px,height=716px')
    }

    const onRefresh = () =>{
        let r = refresh
        setRefresh(r+1)
    }

    const onMarketFilterSubmit = useCallback((confirm, val) => {
        confirm();
        console.log(val)
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

    return (
        <>
        {/* <div className="active_box">
            <Select defaultValue={defaultMarket} style={{ width: 120 }} onChange={handleChange}>
            {
                selectType.map(x=>{
                  return <Option value={x} key={x}>{x}</Option>
                })
            }
            </Select>
            <button onClick={onRefresh}>
                更新
            </button>
        </div> */}
            <AccountTable 
            filterColumns={searchColumns}
            dataSource={data.data} 
            scroll={{ x: 780 }}
            pagination={{
                total:data.data.length,
                defaultPageSize:10,
                defaultCurrent:1
            } }
            columns={columns}
            />
             <AccountTable 
            dataSource={data.sum_data} 
            pagination={{
                total:data.sum_data.length,
                defaultPageSize:10,
                defaultCurrent:1
            } }
            columns={sum_columns}
            />           
        <style jsx>
            {`
            AccountTable{margin-top:15px}
            .active_box {margin-bottom:15px;display:flex;justify-content:space-between;}
            `}
        </style>
        <style jsx global>
            {`
            .subBrokerage .ant-table-thead>tr>th:hover{background-color: #f2f5fa;}
            .subBrokerage .ant-table-thead tr th.ant-table-column-has-sorters .ant-table-filter-column-title{padding:0}
            `}
        </style>
        </>
    );
};

export default Unrealized;

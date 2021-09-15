import { useEffect, useMemo, useState, useCallback } from 'react';
import { Modal, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postInventoryWithSwr } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
const Invetory = ({toOrderBox}) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('');
    const url_base = 'https://webrd.sinotrade.com.tw/newweb/goOrder/'
    
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
                seq: refresh
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount,refresh]);

    const { data: fetchData } = useSWR([JSON.stringify(postData)], postInventoryWithSwr, {
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
        if (Array.isArray(fetchData)) {
            const newData = fetchData.map((item, index) => {
                item.key = index;
                return item;
            });
            setData(newData);
            setFilterData(newData);
        }
    }, [fetchData]);
// <button onClick={e=>consumeClick(e,content)}>下單</button>
    useEffect(() => {
    const newColumns = [
        {
            title: '動作',
            dataIndex: 'Symbol',
            key: 'active',
            align: 'center',
            render: (content) => {
                return (
                    <button onClick={e=>toOrderBox_inv(e,content)}>下單</button>
                );
            },
        },{
            title: '市場',
            dataIndex: 'Market',
            key: 'Market',
            align: 'center',
            ...getColumnSearchProps('Market'),
        },{
            title: '代碼',
            dataIndex: 'Symbol',
            key: 'Symbol',
            align: 'center',
        },{
            title: '商品',
            dataIndex: 'StockName',
            key: 'StockName',
            align: 'center',
        },{
            title: '昨庫存',
            dataIndex: 'QtyInfo1',
            key: 'QtyInfo1',
            align: 'center',
        },{
            title: '今委買',
            dataIndex: 'QtyInfo2',
            key: 'QtyInfo2',
            align: 'center',
        },{
            title: '今委賣',
            dataIndex: 'QtyInfo3',
            key: 'QtyInfo3',
            align: 'center',
        },{
            title: '今買成',
            dataIndex: 'QtyInfo4',
            key: 'QtyInfo4',
            align: 'center',
        },{
            title: '今賣成',
            dataIndex: 'QtyInfo5',
            key: 'QtyInfo5',
            align: 'center',
        },{
            title: '目前庫存',
            dataIndex: 'UseQty',
            key: 'UseQty',
            align: 'center',
        },{
            title: '幣別',
            dataIndex: 'Currency',
            key: 'Currency',
            align: 'center',
        },
        
    ];
    setColumns(newColumns);
    }, [data, searchColumns, marketFilterValue]);


    // const handleChange = v =>{
    //     let d = data
    //     let d_ = v =='全部'? d : d.filter(x => x.TT==v)
    //     setDefaultMarket(v)
    //     setFilterData(d_)
    // }

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'Market') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropfilterCheckBox
                        type={'radio'}
                        onSubmit={onMarketFilterSubmit.bind(null, confirm)}
                        onReset={onMarketFilterReset.bind(null, confirm)}
                        // value={searchStatus}
                        data={[
                            { text: '全部', value: 'ALL' },
                            { text: '香港', value: '香港' },
                            { text: '美國', value: '美國' },
                            { text: '滬股通', value: '滬股通' },
                            { text: '深股通', value: '深股通' },
                            { text: '日本', value: '日本' },
                        ]}
                    />
                ),
                filteredValue: [marketFilterValue] || null,
                onFilter: (value, record) => {
                    if (value === 'ALL' || value === '') {
                        return true;
                    } else {
                        return record.Market === value;
                    }
                },
            };
        }
    };

    const toOrderBox_inv = (e,id) =>{
        e.preventDefault();
        toOrderBox(id)
    }

    const consumeClick = (e,id) =>{
        e.preventDefault();
        let ds_=data.filter(x=> x.Symbol == id)[0]
        console.log(ds_)
        window.open(`
        ${url_base}?bs=S&stockid=${id}&price=${ds_.AvgPrice}&qty=1&account=${currentAccount.broker_id+'-'+currentAccount.account}
        &nav=0`,'_blank', 'toolbar=0,location=0,menubar=0,width=450px,height=716px')
    }

    const onRefresh = () =>{
        let r = refresh
        setRefresh(r+1)
    }

    const onMarketFilterSubmit = useCallback((confirm, val) => {
        confirm();
        setSearchColumns(columns => {
            if (!columns.includes('Market')) {
                columns.push('Market');
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
        <div className="posi_relative">
         <div className="active_box">
            {/* <Select defaultValue={defaultMarket} style={{ width: 120 }} onChange={handleChange}>
            {
                selectType.map(x=>{
                  return <Option value={x} key={x}>{x}</Option>
                })
            }
            </Select> */}
            <IconBtn type={'refresh'} onClick={onRefresh}> </IconBtn>
        </div> 
            <AccountTable 
            filterColumns={searchColumns}
            dataSource={data} 
            pagination={false} 
            columns={columns}
            //noDataSetting={{text:'text',tStyle:{color:"green"}}}
            />
            
        <style jsx>
            {`
            .posi_relative{position:relative;}
            AccountTable{margin-top:15px}
            .active_box {margin-bottom:15px;display:flex; justify-content: flex-end;position:absolute; top:-110px;}
            `}
        </style>
        </div>
    );
};

export default Invetory;

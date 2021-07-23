import { useEffect, useMemo, useState } from 'react';
import { Modal, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postInventoryWithSwr } from '../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../services/user/accessToken';
import AccountTable from '../../vipInventory/AccountTable';
const Invetory = () => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [defaultMarket, setDefaultMarket] = useState('全部');
    const selectType = ['全部','香港','美國','滬股通','深股通','日本']
    const url_base = 'https://webrd.sinotrade.com.tw/newweb/goOrder/'
    const columns = [
        {
            title: '動作',
            dataIndex: 'Symbol',
            key: 'active',
            align: 'center',
            render: content => {
                return (<button
                onClick={e=>consumeClick(e,content)}
                >下單</button>)
            },
        },{
            title: '市場',
            dataIndex: 'TT',
            key: 'TT',
            align: 'center',
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

    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
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

    const handleChange = v =>{
        let d = data
        let d_ = v =='全部'? d : d.filter(x => x.TT==v)
        setDefaultMarket(v)
        setFilterData(d_)
    }

    const consumeClick = (e,id) =>{
        e.preventDefault();
        let ds_=data.filter(x=> x.Symbol == id)[0]
        console.log(ds_)
        window.open(`
        ${url_base}?bs=S&stockid=${id}&price=${ds_.AvgPrice}&qty=1&account=${currentAccount.broker_id+'-'+currentAccount.account}
        &nav=0`,'_blank', 'toolbar=0,location=0,menubar=0,width=450px,height=716px')
    }//resizable=1,

    const onRefresh = () =>{
        let r = refresh
        setRefresh(r+1)
    }
    return (
        <>
        <div className="active_box">
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
        </div>
            <AccountTable 
            dataSource={filterData} 
            pagination={false} 
            columns={columns}
            />
            
        <style jsx>
            {`
            .active_box {margin-bottom:15px;display:flex;justify-content:space-between;}
            `}
        </style>
        </>
    );
};

export default Invetory;

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Modal, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { postInventoryWithSwr } from '../../../../../../services/components/goOrder/sb/postInventory';
import { getToken } from '../../../../../../services/user/accessToken';
import DropfilterCheckBox from '../../../vipInventory/DropfilterCheckBox';
import AccountTable from '../../../vipInventory/AccountTable';
import IconBtn from '../../../vipInventory/IconBtn';
import { DEFAULT_MAX_DEPTH } from '@msgpack/msgpack/dist/Encoder';
const Invetory = ({ toOrderBox }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [filterData, setFilterData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [marketFilterValue, setMarketFilterValue] = useState('');
    const postData = useMemo(() => {
        if (currentAccount.account != null) {
            const postData = {
                AID: currentAccount.broker_id + currentAccount.account,
                token: getToken(),
                seq: refresh,
            };
            return postData;
        } else {
            return {};
        }
    }, [currentAccount, refresh]);

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
    // <button onClick={e=>consumeClick(e,content)}>??????</button>
    useEffect(() => {
        const newColumns = [
            {
                title: '??????',
                dataIndex: 'Symbol',
                key: 'active',
                align: 'center',
                render: content => {
                    return <button onClick={e => toOrderBox_inv(e, content)}>??????</button>;
                },
            },
            {
                title: '??????',
                dataIndex: 'Market',
                key: 'Market',
                align: 'center',
                ...getColumnSearchProps('Market'),
            },
            {
                title: '??????',
                dataIndex: 'Symbol',
                key: 'Symbol',
                align: 'center',
            },
            {
                title: '??????',
                dataIndex: 'StockName',
                key: 'StockName',
                align: 'center',
            },
            {
                title: '?????????',
                dataIndex: 'QtyInfo1',
                key: 'QtyInfo1',
                align: 'center',
            },
            {
                title: '?????????',
                dataIndex: 'QtyInfo2',
                key: 'QtyInfo2',
                align: 'center',
            },
            {
                title: '?????????',
                dataIndex: 'QtyInfo3',
                key: 'QtyInfo3',
                align: 'center',
            },
            {
                title: '?????????',
                dataIndex: 'QtyInfo4',
                key: 'QtyInfo4',
                align: 'center',
            },
            {
                title: '?????????',
                dataIndex: 'QtyInfo5',
                key: 'QtyInfo5',
                align: 'center',
            },
            {
                title: '????????????',
                dataIndex: 'UseQty',
                key: 'UseQty',
                align: 'center',
            },
            {
                title: '??????',
                dataIndex: 'Currency',
                key: 'Currency',
                align: 'center',
            },
        ];
        setColumns(newColumns);
    }, [data, searchColumns, marketFilterValue]);

    // const handleChange = v =>{
    //     let d = data
    //     let d_ = v =='??????'? d : d.filter(x => x.TT==v)
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
                            { text: '??????', value: 'ALL' },
                            { text: '??????', value: '??????' },
                            { text: '??????', value: '??????' },
                            { text: '?????????', value: '?????????' },
                            { text: '?????????', value: '?????????' },
                            { text: '??????', value: '??????' },
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

    const toOrderBox_inv = (e, id) => {
        e.preventDefault();
        let data_ = data.filter(x => x.Symbol === id);
        let data__ = data_[0];
        console.log('data__ ', data__);
        let marketArr = data__.StockID.split('.');
        let newData = {
            symbol: data__.Symbol,
            name: data__.StockName,
            market: marketArr[1],
            qty: data__.UseQty,
            bs:'S',
            stemp: new Date().getTime(),
        };
        toOrderBox(newData);
    };

    // const consumeClick = (e,id) =>{
    //     e.preventDefault();
    //     let ds_=data.filter(x=> x.Symbol == id)[0]
    //     console.log(ds_)
    //     window.open(`
    //     ${url_base}?bs=S&stockid=${id}&price=${ds_.AvgPrice}&qty=1&account=${currentAccount.broker_id+'-'+currentAccount.account}
    //     &nav=0`,'_blank', 'toolbar=0,location=0,menubar=0,width=450px,height=716px')
    // }

    const onRefresh = () => {
        let r = refresh;
        setRefresh(r + 1);
    };

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
                <IconBtn type={'refresh'} onClick={onRefresh}>
                    {' '}
                </IconBtn>
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
                    .posi_relative {
                        position: relative;
                    }
                    AccountTable {
                        margin-top: 15px;
                    }
                    .active_box {
                        width: 100%;
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: flex-end;
                        position: absolute;
                        top: -110px;
                        text-align: right;
                    }
                `}
            </style>
        </div>
    );
};

export default Invetory;

import { useState, useEffect, useCallback } from 'react';
import { Button, InputNumber, Select, Checkbox, Input } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import AccountTable from '../../../vipInventory/AccountTable';
import Btn from './Btn';
import OrderSelect from '../../../../goOrder/SB/sbPanel/OrderSelect';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';

const { Option } = Select;
const BatchTable = () => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const orderList = useSelector(store => store.subBrokerage.orderList);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        console.log('orderList', orderList);
        if (orderList.length > 0) {
            let newOrderList = orderList.map((item, index) => {
                item.key = index;
                return item;
            });
            setData(newOrderList);
        }
    }, [orderList]);

    useEffect(() => {
        const newColumns = [
            {
                title: '項次',
                dataIndex: 'index',
                key: 'index',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return <span>{record.key + 1}</span>;
                },
            },
            {
                title: '動作',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <Btn text={'刪'} BS={record.BS} />
                            <Btn text={'送'} BS={record.BS} />
                        </div>
                    );
                },
            },
            {
                title: '商品',
                dataIndex: 'StockID',
                key: 'StockID',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return <div>{text}</div>;
                },
            },
            {
                title: '買賣',
                dataIndex: 'BS',
                key: 'BS',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <OrderSelect
                                width="80px"
                                height="32px"
                                data={[
                                    { txt: '買進', val: 'B' },
                                    { txt: '賣出', val: 'S' },
                                ]}
                                color={record.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                                value={record.BS}
                            />
                        </div>
                    );
                },
            },
            {
                title: '股數',
                dataIndex: 'Qty',
                key: 'Qty',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <InputNumber defaultValue={parseInt(text)} step={record.lotSize} />
                        </div>
                    );
                },
            },
            {
                title: '價格',
                dataIndex: 'Price',
                key: 'Price',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <InputNumber defaultValue={parseFloat(text)} step={record.priceJumpPoint} />
                        </div>
                    );
                },
            },
            {
                title: '類別',
                dataIndex: 'aon',
                key: 'aon',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <Select defaultValue={record.aon}>
                            <Option value="ANY">ANY</Option>
                            <Option value="AON">AON</Option>
                        </Select>
                    );
                },
            },
            {
                title: '長效單',
                dataIndex: 'GTCDate',
                key: 'GTCDate',
                width: 100,
                align: 'left',
                render: (text, record) => {
                    return (
                        <div>
                            <Checkbox></Checkbox>
                            <Input
                                type="date"
                                style={{
                                    border: '1px solid #d9d9d9',
                                    height: '33px',
                                    paddingLeft: '8px',
                                    width: '150px',
                                    marginLeft: '8px',
                                }}
                                value={
                                    moment(text).format('YYYY-MM-DD') || moment().add(6, 'months').format('YYYY-MM-DD')
                                }
                                max={moment().add(6, 'months').format('YYYY-MM-DD')}
                            />
                        </div>
                    );
                },
            },
            {
                title: '送單後保留',
                dataIndex: 'reserve',
                key: 'reserve',
                width: 100,
                align: 'center',
                render: (text, record) => {
                    return (
                        <div>
                            <Checkbox></Checkbox>
                        </div>
                    );
                },
            },
        ];
        setColumns(newColumns);
    }, []);

    const changeSelectedHandler = useCallback((selectedRowKeys, selectedRows) => {
        console.log('sssss', selectedRowKeys, selectedRows);
        setSelectedRowKeys(selectedRowKeys);
        // if (showDelBtn != null) {
        //     showDelBtn(selectedRows);
        // }
    });
    return (
        <div>
            <AccountTable
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={{
                    type: 'checkbox',
                    // getCheckboxProps,
                    onChange: changeSelectedHandler,
                    selectedRowKeys,
                }}
            />
        </div>
    );
};

export default BatchTable;

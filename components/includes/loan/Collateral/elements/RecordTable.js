import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
const RecordTable = ({ refresh, payableHandler }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [data, setData] = useState([]);
    const [IsOpen, setIsOpen] = useState({});
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setData([
            {
                detail: 'AAAA',
                date: '2022-05-11 12:30:33:221',
                price: '2000',
                left: '214',
                method: 'BBBB',
                pid: '14add56w7f',
            },
        ]);
        setTotal(2);
    }, []);
    useEffect(() => {
        const myColumns = [
            {
                title: '明細',
                width: '100px',
                dataIndex: 'detail',
                key: 'detail',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '還款日',
                width: '100px',
                dataIndex: 'date',
                key: 'date',
                align: 'right',
                sorter: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '還款金額',
                width: '100px',
                dataIndex: 'price',
                key: 'price',
                align: 'right',
                render(text, record, idx) {
                    return text; //formatNum(text);
                },
            },
            {
                title: '剩餘還款金額',
                width: '100px',
                dataIndex: 'left',
                key: 'left',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '還款方式',
                width: '100px',
                dataIndex: 'method',
                key: 'method',
                sorter: true,
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '案號',
                width: '120px',
                dataIndex: 'pid',
                key: 'pid',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
        ];
        setColumns(myColumns);

        let IsOpen_ = {};
        data.map(x => {
            IsOpen_[x.pid] = false;
        });
        setIsOpen(IsOpen_);
    }, [data]);

    const pageChangeHandler = val => {
        console.log('vvv', val);
        setCurrentPage(val);
    };

    const openDetail = (e, id) => {
        e.preventDefault();
        console.log(id, ' ', IsOpen[id], 'to', !IsOpen[id]);
        let IsOpen_ = IsOpen;
        IsOpen_[id] = !IsOpen_[id];
        setIsOpen(IsOpen_);
    };
    const expandRender = record => {
        return (
            <div className="RecordTable__Content flexBox">
                <div className="sumItem">
                    <p>還款明細</p>
                    <div>
                        <table className="detail">
                            <tr>
                                <td>本金</td>
                                <td>35000</td>
                            </tr>
                            <tr>
                                <td>利息</td>
                                <td>3540</td>
                            </tr>
                            <tr>
                                <td>手續費</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>撥券費</td>
                                <td>21</td>
                            </tr>
                            <tr>
                                <td>設質費</td>
                                <td>50</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="sumItem">
                    <p>贖回擔保品明細</p>
                    <div>
                        <table className="detail">
                            <tr>
                                <td>2603 長榮</td>
                                <td>35000</td>
                            </tr>
                            <tr>
                                <td>2890 永豐金</td>
                                <td>3540</td>
                            </tr>
                            <tr>
                                <td>2412 中華電</td>
                                <td>100</td>
                            </tr>
                            <tr>
                                <td>2884 玉山金</td>
                                <td>21</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <a className="more">查看更多</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    };
    const handleTableChange = (pagination, filters, sorter) => {
        // console.log('------------.-', pagination, statusFilterValue, sorter);
        // if (sorter.columnKey === 'orderAmount') {
        //     setLotDateSorter('');
        //     if (sorter.order == null) {
        //         setOrderAmountSorter('');
        //         return;
        //     }
        //     setOrderAmountSorter(sorter.order === 'ascend' ? '1' : '2');
        // }
        // if (sorter.columnKey === 'lotDate') {
        //     setOrderAmountSorter('');
        //     if (sorter.order == null) {
        //         setLotDateSorter('');
        //         return;
        //     }
        //     setLotDateSorter(sorter.order === 'ascend' ? '1' : '2');
        // }
    };
    return (
        <AccountTable
            filterColumns={searchColumns}
            pagination={{
                onChange: pageChangeHandler,
                responsive: true,
                defaultPageSize: pageSize,
                current: currentPage,
                total,
            }}
            columns={columns}
            dataSource={data}
            expandable={{
                expandedRowRender: expandRender,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}
            scroll={{ x: 780 }}
            onChange={handleTableChange}
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
                spinning: loading,
            }}
        />
    );
};

export default RecordTable;

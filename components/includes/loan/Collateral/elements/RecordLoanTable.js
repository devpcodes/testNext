import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import SubscriptionBtn from '../../../mySubscription/elements/SubscriptionBtn';
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
                detail: '審查中',
                applyDate: '2022-05-11 12:30:33:221',
                payDate: '2022-05-11 12:30:33:221',
                loanPrice: '2000',
                left: '214',
                useful: '2145',
                interestRate: '52',
                method: '線上',
                pid: '14add56w7f',
            },
            {
                detail: '',
                applyDate: '2022-05-11 12:30:33:221',
                payDate: '2022-05-11 12:30:33:221',
                loanPrice: '2000',
                left: '214',
                useful: '2145',
                interestRate: '52',
                method: '線上',
                pid: '14add56w7f',
                canReturn: true,
            },
        ]);
        setTotal(2);
    }, []);
    useEffect(() => {
        const myColumns = [
            {
                title: '明細/動作',
                width: '100px',
                dataIndex: 'detail',
                key: 'detail',
                render(text, record, idx) {
                    if (text == '審查中' || text == '已還款') {
                        return text;
                    } else {
                        const btnsArr = activeHandler(record);
                        console.log('btnsArr', btnsArr);
                        return (
                            <>
                                {btnsArr.map((element, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {element === 'canCancel' && (
                                                <SubscriptionBtn
                                                    text="取消"
                                                    colorType="blue"
                                                    width={100 / btnsArr.length - 1 + '%'}
                                                    style={{ marginRight: 10 }}
                                                    // onClick={clickHandler.bind(null, record, 'canCancelOrder')}
                                                    // loading={cancelLoading}
                                                />
                                            )}
                                            {element === 'canChange' && (
                                                <SubscriptionBtn
                                                    text="變更"
                                                    colorType="blue"
                                                    width={100 / btnsArr.length - 1 + '%'}
                                                    style={{ marginRight: 10 }}
                                                    // onClick={clickHandler.bind(null, record, 'canSellStock')}
                                                />
                                            )}
                                            {element === 'canReturn' && (
                                                <SubscriptionBtn
                                                    text="我要還款"
                                                    colorType="red"
                                                    width={100 / btnsArr.length - 1 + '%'}

                                                    // onClick={clickHandler.bind(null, record, 'canMortgage')}
                                                />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </>
                        );
                    }
                },
            },
            {
                title: '申請日',
                width: '100px',
                dataIndex: 'applyDate',
                key: 'applyDate',
                align: 'right',
                sorter: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '借款金額',
                width: '100px',
                dataIndex: 'loanPrice',
                key: 'loanPrice',
                align: 'right',
                render(text, record, idx) {
                    return text; //formatNum(text);
                },
            },
            {
                title: '應還款金額',
                width: '100px',
                dataIndex: 'left',
                key: 'left',
                align: 'right',
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '剩餘可動用金額',
                width: '100px',
                dataIndex: 'useful',
                key: 'useful',
                sorter: true,
                render(text, record, idx) {
                    return text;
                },
            },
            {
                title: '撥款日',
                width: '100px',
                dataIndex: 'payDate',
                key: 'payDate',
                align: 'right',
                sorter: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '借貸利率',
                width: '100px',
                dataIndex: 'interestRate',
                key: 'interestRate',
                align: 'right',
                render(text, record, idx) {
                    return text; //Number(text) / 100;
                },
            },
            {
                title: '申請方式',
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
            <div className="RecordTable__Content Loan flexBox">
                <div className="sumItem">
                    <p>擔保明細</p>
                    <div>
                        <table className="detail">
                            <tr>
                                <td>2603 長榮</td>
                                <td>1 張</td>
                            </tr>
                            <tr>
                                <td>2890 永豐金</td>
                                <td>20 張</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="sumItem">
                    <p>費用明細</p>
                    <div>
                        <table className="detail">
                            <tr>
                                <td>應付利息</td>
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
                                <td>0</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="sumItem">
                    <p>還款紀錄</p>
                    <div>
                        <div className="noData">尚無還款紀錄</div>
                        {/* <table className="detail">
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
                        </table> */}
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

    const activeHandler = record => {
        const btnsArr = [];
        if (record.canCancel) {
            btnsArr.push('canCancel');
        }
        if (record.canChange) {
            btnsArr.push('canChange');
        }
        if (record.canReturn) {
            btnsArr.push('canReturn');
        }
        console.log('btnsArr', btnsArr);
        return btnsArr;
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

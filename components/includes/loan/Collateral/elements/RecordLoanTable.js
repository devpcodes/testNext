import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import SubscriptionBtn from '../../../mySubscription/elements/SubscriptionBtn';
import { getToken } from '../../../../../services/user/accessToken';
import {
    repaymentDetail,
    collateralDeatil,
    fetchApplyRecord,
} from '../../../../../services/components/loznZone/calculation/getApplyRecord';
const RecordLoanTable = ({ refresh, payableHandler, rowData, rowDataOther, stockList }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [data, setData] = useState([]);
    const [dataOther, setDataOther] = useState([]);
    const [detail, setDetail] = useState({});
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let d_ = rowData.concat(rowDataOther);
        setData(rowData);
        setDataOther(rowDataOther);
        setDataAll(d_);
        setTotal(d_.length);
    }, [rowData]);

    useEffect(() => {
        const myColumns = [
            {
                title: '明細/動作',
                width: '100px',
                dataIndex: 'status',
                key: 'status',
                render(text, record, idx) {
                    if (record.name == 'Not Expandable') {
                        if (text == '1') {
                            return (
                                <React.Fragment key={idx}>
                                    <SubscriptionBtn
                                        text="取消"
                                        colorType="blue"
                                        width={100 / 2 - 1 + '%'}
                                        style={{ marginRight: 10 }}
                                        // onClick={clickHandler.bind(null, record, 'canCancelOrder')}
                                        // loading={cancelLoading}
                                    />
                                    <SubscriptionBtn
                                        text="變更"
                                        colorType="blue"
                                        width={100 / 2 - 1 + '%'}
                                        style={{ marginRight: 10 }}
                                        // onClick={clickHandler.bind(null, record, 'canSellStock')}
                                    />
                                </React.Fragment>
                            );
                        } else {
                            let nt = '';
                            switch (text) {
                                case '2':
                                    nt = '預約已刪除';
                                    break;
                                case '4':
                                    nt = '申請成功';
                                    break;
                                case '7':
                                    nt = '無法刪除';
                                    break;
                                case '8':
                                    nt = '轉檔中';
                                    break;
                                case '3':
                                    nt = '測試';
                                    break;
                            }
                            return nt;
                        }
                    } else {
                        if (text == '1') {
                            return '已還款';
                        } else {
                            return (
                                <React.Fragment key={idx}>
                                    <SubscriptionBtn
                                        text="我要還款"
                                        colorType="red"
                                        width={99 + '%'}
                                        // onClick={clickHandler.bind(null, record, 'canMortgage')}
                                    />
                                </React.Fragment>
                            );
                        }
                    }
                },
            },
            {
                title: '申請日',
                width: '100px',
                dataIndex: 'applyDate',
                key: 'applyDate',
                align: 'right',
                // sorter: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '已動用金額',
                width: '100px',
                dataIndex: 'applyFinancing',
                key: 'applyFinancing',
                align: 'right',
                render(text, record, idx) {
                    return text; //formatNum(text);
                },
            },
            {
                title: '應還款金額',
                width: '100px',
                dataIndex: 'outstanding',
                key: 'outstanding',
                align: 'right',
                render(text, record, idx) {
                    let n =
                        Number(text) +
                        Number(record.payable) +
                        Number(record.outstandingFee) +
                        Number(record.outstandingStkFee) +
                        Number(record.unpaidPledgeFee);
                    if (n) {
                        return n;
                    } else {
                        return '-';
                    }
                },
            },
            // {
            //     title: '剩餘可動用金額',
            //     width: '100px',
            //     dataIndex: 'applyFinancing',
            //     key: 'applyFinancing',
            //     // sorter: true,
            //     align: 'right',
            //     render(text, record, idx) {
            //         return text;
            //     },
            // },
            {
                title: '撥款日',
                width: '100px',
                dataIndex: 'moneyDate',
                key: 'moneyDate',
                align: 'right',
                // sorter: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '借貸利率',
                width: '100px',
                dataIndex: 'loanRate',
                key: 'loanRate',
                align: 'right',
                render(text, record, idx) {
                    if (text) {
                        return text;
                    } else {
                        return '-';
                    }
                },
            },
            {
                title: '申請方式',
                width: '100px',
                dataIndex: 'source',
                key: 'source',
                align: 'right',
                render(text, record, idx) {
                    let t = '';
                    switch (text) {
                        case '1':
                            t = '臨櫃';
                            break;
                        case '2':
                            t = '電子';
                            break;
                        case '3':
                            t = 'EMS';
                            break;
                    }
                    return t;
                },
            },
        ];
        setColumns(myColumns);
    }, [data]);

    const pageChangeHandler = val => {
        setCurrentPage(val);
    };

    const expandRender = record => {
        return (
            <div className="RecordTable__Content Loan flexBox">
                <div className="sumItem">
                    <p>擔保明細</p>
                    <div>
                        <table className="detail">
                            <tbody>
                                {record.collateral ? (
                                    record.collateral.map((x, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    {x.stockId} {x.stockName}
                                                </td>
                                                <td>{x.collateralQty} 張</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <div className="noData">尚無符合資料</div>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="sumItem">
                    <p>費用明細</p>
                    <div>
                        {record.detail.length > 0 ? (
                            <table className="detail">
                                <tbody>
                                    <tr>
                                        <td>應付利息</td>
                                        <td>{record.detail[record.detail.length - 1].paid}</td>
                                    </tr>
                                    <tr>
                                        <td>手續費</td>
                                        <td>{record.detail[record.detail.length - 1].writeOffFee}</td>
                                    </tr>
                                    <tr>
                                        <td>撥券費</td>
                                        <td>{record.detail[record.detail.length - 1].writeOffTransFee}</td>
                                    </tr>
                                    <tr>
                                        <td>設質費</td>
                                        <td>{record.detail[record.detail.length - 1].unpaidPledgeFee}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <div className="noData">尚無符合資料</div>
                        )}
                    </div>
                </div>
                <div className="sumItem">
                    <p>還款紀錄</p>
                    <div>
                        {record.detail.length > 0 ? (
                            <table className="detail">
                                <tbody>
                                    {record.detail.map((x, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{x.repaymentDate}</td>
                                                <td>{x.repayment}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="noData">尚無還款紀錄</div>
                        )}

                        {/*  */}
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
            dataSource={dataAll}
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

export default RecordLoanTable;

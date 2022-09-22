import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import QRcodeModal from './QRcodeModal';
import SubscriptionBtn from '../../../mySubscription/elements/SubscriptionBtn';
import VerticalTable from '../../overview/elements/VerticalTable';
import { setModal } from '../../../../../store/components/layouts/action';
import qrCode from '../../../../../resources/images/components/loanZone/demo.jpg';

const RecordLoanTable = ({ rowData, rowDataOther, allData, showMore, deleteApplyFunc }) => {
    const [columns, setColumns] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [data, setData] = useState([]);
    const [dataOther, setDataOther] = useState([]);
    const [show, setShow] = useState(false);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setData(rowData);
        setDataOther(rowDataOther);
    }, [rowData, rowDataOther]);
    useEffect(() => {
        setDataAll(allData);
        setTotal(allData.length);
    }, [allData]);

    useEffect(() => {
        let state = {
            sortedInfo: {
                columnKey: 'applyDate',
                order: 'descend',
            }, //默认排序
        };
        const myColumns = [
            {
                title: '明細/動作',
                width: '100px',
                dataIndex: 'status',
                key: 'status',
                render(text, record, idx) {
                    if (record.from == 'applyStatus') {
                        if (record.canCancel == 'Y') {
                            return (
                                <React.Fragment key={idx}>
                                    <SubscriptionBtn
                                        text="取消"
                                        colorType="blue"
                                        width={100 / 2 - 1 + '%'}
                                        style={{ marginRight: 10 }}
                                        onClick={clickModifyBtn.bind(null, record, 'delete')}
                                        // loading={cancelLoading}
                                    />
                                    <SubscriptionBtn
                                        text="變更"
                                        colorType="blue"
                                        width={100 / 2 - 1 + '%'}
                                        style={{ marginRight: 10 }}
                                        onClick={clickModifyBtn.bind(null, record, 'change')}
                                    />
                                </React.Fragment>
                            );
                        } else {
                            let nt = '';
                            if (text == '1') {
                                switch (record.flowStatus) {
                                    case '1':
                                        nt = '待簽核';
                                        break;
                                    case '2':
                                        nt = '審核中';
                                        break;
                                    case '3':
                                        nt = '審核失敗';
                                        break;
                                    case '4':
                                        nt = '已取消';
                                        break;
                                    case '5':
                                        nt = '申請無效';
                                        break;
                                    case '6':
                                        nt = '申請無效';
                                        break;
                                    case '7':
                                        nt = '其他';
                                        break;
                                }
                            } else {
                                switch (text) {
                                    case '2':
                                        nt = '已取消';
                                        break;
                                    case '4':
                                        nt = '申請失敗';
                                        break;
                                    case '7':
                                        nt = '已取消';
                                        break;
                                    case '8':
                                        nt = '轉檔中';
                                        break;
                                }
                            }
                            return nt;
                        }
                    } else {
                        if (text == '1') {
                            return '已還款';
                        } else {
                            return (
                                <React.Fragment key={idx}>
                                    <QRcodeModal btnText={'我要還款'} className={'RecordQrcode'} />
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
                sorter: (a, b) => {
                    return a.applyDate - b.applyDate;
                },
                sortDirections: ['descend', 'descend'],
                sortOrder: true,
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '申請動用金額',
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
            {
                title: '撥款日',
                width: '100px',
                dataIndex: 'moneyDate',
                key: 'moneyDate',
                align: 'right',
                render(text, record, idx) {
                    if (text) {
                        return moment(text).format('YYYY/MM/DD');
                    } else {
                        return '-';
                    }
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
                        return Number(text) * 100 + '%';
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

    const deleteApplyHandler = val => {
        deleteApplyFunc(val);
    };

    const clickModifyBtn = (d, a) => {
        if (a == 'change') {
            window.location.href = `/newweb/loan-zone/Collateral?applyDate=${d.applyDate}`;
        } else if (a == 'delete') {
            deleteApplyHandler(d.applyDate);
        }
    };

    const openMoreModal = a => {
        showMore(a);
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
                                        if (i < 3) {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {x.stockId} {x.stockName}
                                                    </td>
                                                    <td>{x.collateralQty} 張</td>
                                                </tr>
                                            );
                                        }
                                    })
                                ) : (
                                    <div className="noData">尚無符合資料</div>
                                )}
                            </tbody>
                        </table>
                        {record.collateral.length > 3 ? (
                            <a className="checkMore_b" onClick={openMoreModal.bind(null, record.key)}>
                                查看更多
                            </a>
                        ) : (
                            ''
                        )}
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
                                        <td>{record.detail[0].paid}</td>
                                    </tr>
                                    <tr>
                                        <td>手續費</td>
                                        <td>{record.detail[0].writeOffFee}</td>
                                    </tr>
                                    <tr>
                                        <td>撥券費</td>
                                        <td>{record.detail[0].writeOffTransFee}</td>
                                    </tr>
                                    <tr>
                                        <td>設質費</td>
                                        <td>{record.detail[0].unpaidPledgeFee}</td>
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

    const showQRcode = val => {
        setShow(val);
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

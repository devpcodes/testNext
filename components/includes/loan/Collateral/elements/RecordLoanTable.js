import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import SubscriptionBtn from '../../../mySubscription/elements/SubscriptionBtn';
import VerticalTable from '../../overview/elements/VerticalTable';
import { setModal } from '../../../../../store/components/layouts/action';
import qrCode from '../../../../../resources/images/components/loanZone/demo.jpg';
const RecordLoanTable = ({ refresh, payableHandler, rowData, rowDataOther, showMore, stockList, deleteApplyFunc }) => {
    const [columns, setColumns] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [data, setData] = useState([]);
    const [dataOther, setDataOther] = useState([]);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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
                                        // onClick={clickModifyBtn.bind(null, record, 'canCancelOrder')}
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
                                        onClick={clickModifyBtn.bind(null, record, 'delete')}
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

    const clickHandler = () => {
        const data = [
            {
                label: '銀行帳戶',
                value: (
                    <>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            永豐銀807
                        </p>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            123456789123
                        </p>
                    </>
                ),
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '戶名',
                value: '永豐證償還帳戶',
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '分公司電話',
                value: '02-22222222',
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
        ];
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '如何申請動用',
                type: 'info',
                bodyStyle: {
                    height: 350,
                    overflow: 'auto',
                },
                content: (
                    <>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>
                            1. 每筆借款期限為6個月，到期可向分公司申請展延，或於借貸期間隨時申請還款。
                        </p>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>2. 還款方式：</p>
                        <div style={{ marginLeft: '30px', color: '#0d1623' }}>
                            <p style={{ marginBottom: '5px' }}>
                                • <span style={{ fontWeight: 'bold' }}>賣股還款：</span>
                                透過線上或臨櫃交易賣出擔保品以償還該筆借款，扣除利息與相關費用並償還本金後，餘額將返還至您的交割帳戶。
                            </p>
                            <p>
                                • <span style={{ fontWeight: 'bold' }}>現金還款：</span>
                                請將還款金額轉帳或匯款至各分公司之償還帳戶，並去電至分公司進行還款指示，或以現金至臨櫃完成還款，還款費用以扣除利息與相關費用後再償還本金。
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <VerticalTable
                                data={data}
                                style={{
                                    marginRight: isMobile ? '0' : '18px',
                                    flex: '3 0 0',
                                }}
                            />
                            <img
                                src={qrCode}
                                style={{
                                    width: '145px',
                                    height: '135px',
                                    display: isMobile ? 'none' : 'inline-block',
                                    flex: '1 0 0',
                                }}
                            />
                        </div>
                        <p
                            style={{
                                marginTop: '16px',
                                color: '#6c7b94',
                                marginBottom: 0,
                                display: isMobile ? 'none' : 'block',
                            }}
                        >
                            此條碼支援銀行轉帳，掃描後即可轉帳。
                        </p>
                    </>
                ),
                okText: '確認',
                width: '600px',
            }),
        );
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
                        {record.collateral ? (
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

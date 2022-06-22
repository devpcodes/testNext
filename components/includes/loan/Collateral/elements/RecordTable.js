import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import {
    repaymentDetail,
    collateralDeatil,
    fetchApplyRecord,
    applyStatus,
} from '../../../../../services/components/loznZone/calculation/getApplyRecord';
const RecordTable = ({ refresh, payableHandler, rowData, rowDataOther, stockList, detailList }) => {
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
        console.log('[22detailList]', detailList);
        setData(detailList);
        setTotal(detailList.length);
    }, [detailList]);
    useEffect(() => {
        const myColumns = [
            {
                title: '還款日',
                width: '100px',
                dataIndex: 'repaymentDate',
                key: 'repaymentDate',
                align: 'right',
                render(text, record, idx) {
                    return moment(text).format('YYYY/MM/DD');
                },
            },
            {
                title: '還款金額',
                width: '100px',
                dataIndex: 'repayment',
                key: 'repayment',
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
                dataIndex: 'group',
                key: 'method',
                align: 'right',
                render(text, record, idx) {
                    let d_ = rowData.filter(x => x.key == text);
                    return d_.source;
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

    const getData = () => {
        repaymentDetail, collateralDeatil, val;
    };

    const pageChangeHandler = val => {
        setCurrentPage(val);
    };

    const openDetail = (e, id) => {
        e.preventDefault();
        let IsOpen_ = IsOpen;
        IsOpen_[id] = !IsOpen_[id];
        setIsOpen(IsOpen_);
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

    const stockModal = active => {
        let st = stockList;
        if (active !== 'all') {
            st = st.filter(x => {
                x.group === active;
            });
            console.log(active, st);
        }
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '贖回擔保品明細',
                type: 'info',
                bodyStyle: {
                    height: 230,
                    overflow: 'auto',
                },
                content: (
                    <div className="item_list">
                        {st.length > 0 ? (
                            st.map((x, i) => {
                                return (
                                    <p key={i} className="item_list_row">
                                        <span>
                                            {x.stockId} {x.stockName}
                                        </span>
                                        <span>{x.notReturnedQty} 張</span>
                                    </p>
                                );
                            })
                        ) : (
                            <p>無資料</p>
                        )}
                    </div>
                ),
                okText: '確認',
                width: '320px',
            }),
        );
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
                            <tbody>
                                {record.collateral ? (
                                    record.collateral.map((x, i) => {
                                        if (i < 3) {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {x.stockId} {x.stockName}
                                                    </td>
                                                    <td>{x.notReturnedQty} 張</td>
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
                            <a className="checkMore_b" onClick={stockModal.bind(null, record.key)}>
                                查看更多
                            </a>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        );
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

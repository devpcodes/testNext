import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Table } from 'antd';
import { mappingCommissionedCode } from '../../../../services/components/goOrder/dataMapping';
import { fetchMatchDetailToday } from '../../../../services/components/goOrder/fetchMatchDetailToday';
import { timeFormatter } from '../../../../services/timeFormatter';
import { themeColor } from '../panel/PanelTabs';
import arrow from '../../../../resources/images/components/goOrder/searchList-arrow-caret-up.svg';
import { getToken } from '../../../../services/user/accessToken';
import { formatNum } from '../../../../services/formatNum';

// const data = [{ ord_time: '120101', price: 1000, qty: 2, key: 1 }];

const DealInfoBox = () => {
    const info = useSelector(store => store.goOrder.confirmBoxChanValInfo);
    const userInfo = useSelector(store => store.user.currentAccount);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [sortKey, setSortKey] = useState('match_time');
    const [sortOrder, setSortOrder] = useState('descend');
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const newColumns = [
            {
                title: '成交時間',
                dataIndex: 'match_time',
                key: 'match_time',
                sorter: (a, b) => {
                    let newA;
                    let newB;
                    newA = a.match_time.split(':');
                    newB = b.match_time.split(':');
                    newA = newA.join('');
                    newB = newB.join('');
                    return Number(newA) - Number(newB);
                },
                sortOrder: sortKey === 'match_time' && sortOrder,
                render: (text, record) => {
                    const decima = text.split('.')[1];
                    const num = text.split('.')[0];
                    return (
                        <div>
                            <p className="item" style={{ display: 'inline' }}>
                                {num}
                            </p>
                            <span style={{ color: '#a9b6cb' }}>.{decima}</span>
                        </div>
                    );
                },
            },
            {
                title: '成交價',
                dataIndex: 'match_price',
                key: 'match_price',
                render: (text, record) => {
                    return (
                        <div>
                            <p className="item">{text}</p>
                        </div>
                    );
                },
            },
            {
                title: '成交量',
                dataIndex: 'match_chqty',
                key: 'match_chqty',
                render: (text, record) => {
                    return (
                        <div>
                            <p className="item">{formatNum(text)}</p>
                        </div>
                    );
                },
            },
        ];
        setColumns(newColumns);
    }, [sortKey, sortOrder, data]);
    const fetchData = async () => {
        const account = userInfo.account;
        const broker_id = userInfo.broker_id;
        const token = getToken();
        const ord_no = info.ord_no;
        const stock_id = info.stock_id.trim();
        let res = await fetchMatchDetailToday({
            account,
            broker_id,
            token,
            ord_no,
            stock_id,
        });
        if (res.length > 0) {
            res = res.map((item, index) => {
                item.key = index;
                return item;
            });
        }
        setData(res);
    };
    const sortTimeHandler = key => {
        if (sortKey === key) {
            if (sortOrder === 'ascend') {
                setSortOrder('descend');
            } else {
                setSortOrder('ascend');
            }
        } else {
            setSortKey(key);
            setSortOrder('descend');
        }
    };
    const sortIconHandler = key => {
        if (sortKey === key) {
            if (sortOrder === 'ascend') {
                return 180;
            } else {
                return 0;
            }
        }
    };
    return (
        <>
            <div className="deal__container">
                <div className="title__box">
                    <span className="ord__char">
                        {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1)}
                    </span>
                    <div className="name__zh">
                        <span className="bs">{info.ord_bs === 'B' ? '買進' : '賣出'}</span>
                        {info.name_zh.trim()}
                    </div>
                </div>
            </div>
            <div className="table__container">
                <img
                    className="icon__arrow--1"
                    onClick={sortTimeHandler.bind(null, 'match_time')}
                    src={arrow}
                    style={{
                        position: 'absolute',
                        top: '101px',
                        left: '69px',
                        // left: '12%',
                        zIndex: 1,
                        transform: `rotate(${sortIconHandler('match_time')}deg)`,
                        opacity: sortKey === 'match_time' ? 1 : 0.3,
                    }}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ y: 190 }}
                    showSorterTooltip={false}
                    // onRow={record => {
                    //     return {
                    //         onClick: e => {
                    //             rowClickHandler(e, record);
                    //         },
                    //     };
                    // }}
                />
                <p className="item__info">一 已經到底了 一</p>
            </div>
            <style jsx>{`
                .info__icon {
                    margin-left: 6px;
                    margin-top: -4px;
                }
                .deal__container {
                    padding: 16px 16px 0 16px;
                }
                .ord__char {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    font-size: 1.69rem;
                    color: white;
                    background-color: ${info.ord_bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    text-align: center;
                    border-radius: 2.8px;
                    margin-right: 8px;
                    vertical-align: middle;
                }
                .name__zh {
                    display: inline-block;
                    font-size: 24px;
                    line-height: 1px;
                    vertical-align: middle;
                    margin-top: -1px;
                    font-weight: bold;
                    color: black;
                }
                .bs {
                    color: ${info.ord_bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                }

                .info__box {
                    margin-top: 13px;
                }
                .info__box--left {
                    display: inline-block;
                    width: 50%;
                }
                .info__box--right {
                    display: inline-block;
                    width: 50%;
                }
                .item__label {
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .item__val {
                    color: #0d1623;
                    font-size: 1.6rem;
                    padding-left: 8px;
                    font-weight: bold;
                }
                .item {
                    margin-top: 8px;
                }

                .btn__container {
                    font-size: 0;
                    width: 100%;
                    /* margin-top: 35px; */
                    position: absolute;
                    padding-right: 32px;
                    top: 275px;
                }
            `}</style>
            <style global jsx>{`
                .table__container {
                    margin-top: 16px;
                }
                .deal__container .item--down {
                    margin: 0;
                }
                .table__container .item__info {
                    font-size: 1.2rem;
                    color: #a9b6cb;
                    text-align: center;
                    margin-top: 8px;
                }
                .table__container .item {
                    margin: 0;
                    padding: 6px 0;
                }
                /* .deal__container .item {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #0d1623;
                }
                .deal__container .item--down {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #a9b6cb;
                    white-space: nowrap;
                }
                .deal__container .timeInForce {
                    color: #a9b6cb;
                    display: inline-block;
                } */

                .flag {
                    /* font-size: 10px;
                    color: white;
                    padding: 2px;
                    border-radius: 2px;
                    height: 16px;
                    margin-right: 5px; */
                    display: inline-block;
                    font-size: 1rem;
                    color: white;
                    padding: 1px;
                    border-radius: 2px;
                    margin-right: 5px;
                    line-height: 16px;
                    width: 18px;
                    text-align: center;
                    vertical-align: baseline;
                }
                .table__container .time__str--down {
                    color: #a9b6cb;
                }

                .table__container .ant-table-tbody > tr > td {
                    padding: 0;
                    color: #0d1623;
                    font-size: 1.6rem;
                    font-weight: bold;
                }
                .table__container .ant-table-tbody > tr > td:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                    white-space: nowrap;
                }
                .table__container .ant-table-tbody > tr > td:nth-child(2) {
                    text-align: right;
                    padding: 0 10px;
                }
                .table__container .ant-table-tbody > tr > td:nth-child(3) {
                    text-align: right;
                    padding-right: 10px;
                }
                /* .table__container .ant-table-tbody > tr > td:nth-child(3) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .table__container .ant-table-tbody > tr > td:nth-child(4) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .table__container .ant-table-tbody > tr > td:nth-child(5) {
                    text-align: center;
                    padding-top: 11px;
                    vertical-align: middle;
                } */

                .table__container .ant-table-thead > tr > th {
                    white-space: nowrap;
                    font-size: 11px;
                    padding: 0;
                    height: 24px;
                    line-height: 24px;
                    background-color: #e6ebf5;
                    color: #0d1623;
                    padding: 0 10px;
                }
                .table__container .ant-table-thead > tr > th:nth-child(2) {
                    text-align: right;
                }
                .table__container .ant-table-thead > tr > th:nth-child(3) {
                    text-align: right;
                }
                /* .table__container .ant-table-thead > tr > th:nth-child(2) {
                    padding-left: 0;
                }
                .table__container .ant-table-thead > tr > th:nth-child(3) {
                    text-align: right;
                }
                .table__container .ant-table-thead > tr > th:nth-child(4) {
                    text-align: right;
                }
                .table__container .ant-table-thead > tr > th:nth-child(5) {
                    text-align: center;
                } */
                .table__container .ant-table-thead > tr > th:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                }

                .table__container .ant-table-column-sorters {
                    padding: 0;
                }
                .table__container .ant-table-column-sorter-full {
                    display: none;
                    margin-top: -7px;
                }
                .table__container .ant-table-column-sorter-down.active {
                    color: black;
                }
                .table__container .ant-table-column-sorter-up.active {
                    color: black;
                }
                .table__container .ant-table-cell-scrollbar {
                    position: absolute;
                    right: -25px;
                }
                .table__container .ant-table-thead tr {
                    background: #e6ebf5;
                }
                .table__container .ant-skeleton {
                    position: absolute;
                    top: 78px;
                    left: 16px;
                    z-index: 10;
                }
                .table__container .ant-table-column-has-sorters {
                    background: #e6ebf5 !important;
                }
                .table__container .icon__arrow--1 {
                    left: 43px;
                }
                /* @media (max-width: 325px) {
                    .table__container .icon__arrow--2 {
                        left: 22px;
                    }
                }
                @media (max-width: 400px) {
                    .table__container .icon__arrow--2 {
                        left: 10%;
                    }
                } */
                .table__container td.ant-table-column-sort {
                    background: white;
                }
                .sum__box {
                    text-align: center;
                    margin-top: 10px;
                    font-size: 1.2rem;
                    color: #a9b6cb;
                    letter-spacing: 1px;
                }
            `}</style>
        </>
    );
};

export default DealInfoBox;

import { useEffect, useState, useRef } from 'react';
import { Table, Space, Skeleton, Button, Tooltip, Modal } from 'antd';
import arrow from '../../../../../resources/images/components/goOrder/searchList-arrow-caret-up.svg';
const SearchListTable = ({ data, columns, sortKeys, sortKeyHandler, rowClickHandler, left }) => {
    const [sortKey, setSortKey] = useState(sortKeys[0]);
    const [sortOrder, setSortOrder] = useState('descend');
    const [showMask, setShowMask] = useState(false);
    const [myData, setMyData] = useState([]);
    const [myColumns, setMyColumns] = useState([]);

    // useEffect(() => {
    //     console.log('ddd', data);
    //     setMyData(data);
    //     setMyColumns(columns);
    // }, [data, columns, sortKeys]);

    const maskClickHandler = () => {
        if (data.length > 0) {
            const newData = data.map((item, index) => {
                item.showControlBtn = false;
                return item;
            });
            setShowMask(false);
            setData(newData);
        }
    };
    const sortTimeHandler = key => {
        sortKeyHandler(key);
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
        <div className="searchList__container">
            {sortKeys.map((item, index) => {
                return (
                    <img
                        key={index}
                        className="icon__arrow--1"
                        onClick={sortTimeHandler.bind(null, item)}
                        src={arrow}
                        style={{
                            position: 'absolute',
                            top: '61px',
                            left: left[index],
                            zIndex: 1,
                            transform: `rotate(${sortIconHandler(item)}deg)`,
                            opacity: sortKey === item ? 1 : 0.3,
                        }}
                    />
                );
            })}
            {/* <img
                className="icon__arrow--1"
                onClick={sortTimeHandler.bind(null, 'CreateTime')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    // left: '12%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('CreateTime')}deg)`,
                    opacity: sortKey === 'CreateTime' ? 1 : 0.3,
                }}
            />
            <img
                className="icon__arrow--2"
                onClick={sortTimeHandler.bind(null, 'StockID')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    left: '27%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('StockID')}deg)`,
                    opacity: sortKey === 'StockID' ? 1 : 0.3,
                }}
            />
            <img
                onClick={sortTimeHandler.bind(null, 'StateMsg')}
                src={arrow}
                style={{
                    position: 'absolute',
                    top: '61px',
                    left: '92%',
                    zIndex: 1,
                    transform: `rotate(${sortIconHandler('StateMsg')}deg)`,
                    opacity: sortKey === 'StateMsg' ? 1 : 0.3,
                }}
            /> */}
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 300 }}
                showSorterTooltip={false}
                onRow={record => {
                    return {
                        onClick: e => {
                            rowClickHandler(e, record);
                        },
                    };
                }}
            />
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    position: 'fixed',
                    top: '-340px',
                    background: 'white',
                    opacity: 0,
                    display: showMask ? 'block' : 'none',
                    zIndex: 999,
                }}
                onClick={maskClickHandler}
            ></div>
            {/* <div className="sum__box">- 1筆委託中，2筆成交 -</div> */}
            <style global jsx>{`
                .searchList__container {
                    margin-top: -16px;
                }
                .searchList__container .item {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #0d1623;
                }
                .searchList__container .item--down {
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: #a9b6cb;
                    white-space: nowrap;
                }
                .searchList__container .timeInForce {
                    color: #a9b6cb;
                    display: inline-block;
                }

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
                .searchList__container .time__str--down {
                    color: #a9b6cb;
                }

                .searchList__container .ant-table-tbody > tr > td {
                    padding: 0;
                    padding-top: 11px;
                    padding-bottom: 11px;
                }
                .searchList__container .ant-table-tbody > tr > td:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(3) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(4) {
                    text-align: right;
                    padding: 0 10px;
                    padding-top: 11px;
                    vertical-align: top;
                }
                .searchList__container .ant-table-tbody > tr > td:nth-child(5) {
                    text-align: center;
                    padding-top: 11px;
                    vertical-align: middle;
                }

                .searchList__container .ant-table-thead > tr > th {
                    white-space: nowrap;
                    font-size: 11px;
                    padding: 0;
                    height: 24px;
                    line-height: 24px;
                    background-color: #e6ebf5;
                    color: #0d1623;
                    padding: 0 10px;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(2) {
                    padding-left: 0;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(3) {
                    text-align: right;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(4) {
                    text-align: right;
                }
                .searchList__container .ant-table-thead > tr > th:nth-child(5) {
                    text-align: center;
                }
                .searchList__container .ant-table-thead > tr > th:first-child {
                    padding-left: 16px;
                    padding-right: 5px;
                }

                .searchList__container .ant-table-column-sorters {
                    padding: 0;
                }
                .searchList__container .ant-table-column-sorter-full {
                    display: none;
                    margin-top: -7px;
                }
                .searchList__container .ant-table-column-sorter-down.active {
                    color: black;
                }
                .searchList__container .ant-table-column-sorter-up.active {
                    color: black;
                }
                .searchList__container .ant-table-cell-scrollbar {
                    position: absolute;
                    right: -25px;
                }
                .searchList__container .ant-table-thead tr {
                    background: #e6ebf5;
                }
                .searchList__container .ant-skeleton {
                    position: absolute;
                    top: 78px;
                    left: 16px;
                    z-index: 10;
                }
                .searchList__container .ant-table-column-has-sorters {
                    background: #e6ebf5 !important;
                }
                .searchList__container .icon__arrow--1 {
                    left: 43px;
                }
                @media (max-width: 325px) {
                    .searchList__container .icon__arrow--2 {
                        left: 22px;
                    }
                }
                @media (max-width: 400px) {
                    .searchList__container .icon__arrow--2 {
                        left: 10%;
                    }
                }
                .searchList__container td.ant-table-column-sort {
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
            <style jsx global>{`
                .searchList__container .ant-tooltip-inner {
                    color: white;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    margin-right: -4px;
                    z-index: 3;
                }
                .searchList__container .ant-btn-primary {
                    background: #c43826;
                    border-color: #c43826;
                    height: 32px;
                    font-size: 1.6rem;
                    width: 63px;
                    vertical-align: top;
                }
            `}</style>
        </div>
    );
};

export default SearchListTable;

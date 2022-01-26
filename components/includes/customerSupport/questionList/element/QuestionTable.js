import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Link from 'next/link';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import PropTypes from 'prop-types';

const QuestionTable = function ({ dataSource, sub2ndCategories, sub3rdCategories, onPageChange, totalCounts }) {
    useEffect(() => {}, [sub3rdCategories]);

    const columns = [
        {
            title: '項目',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: '主類別',
            dataIndex: ['category2nd', 'categoryName'],
            width: '15%',
            filters: sub2ndCategories || false,
            onFilter: (value, record) => record.category2nd.categoryName.includes(value),
        },
        {
            title: '子類別',
            dataIndex: ['category3rd', 'categoryName'],
            width: '15%',
            filters: sub3rdCategories || false,
            onFilter: (value, record) => record.category3rd.categoryName.includes(value),
        },
        {
            title: '標題',
            dataIndex: 'title',
            width: '55%',
            ellipsis: true,
            render(text, record, idx) {
                const s = dataSource.dataList.filter((d, index) => index === idx);
                return (
                    <Link href={`/customer-support/question/${s[0].uuid}`}>
                        <div style={{ cursor: 'pointer' }}>{text}</div>
                    </Link>
                );
            },
        },
    ];

    return (
        <div className="question-table">
            <AccountTable
                dataSource={dataSource?.dataList}
                columns={columns}
                pagination={{
                    total: totalCounts,
                    showTotal: (total, range) => `${range[0]}-${range[1]}則問題 (共${totalCounts}則問題)`,
                    defaultPageSize: 15,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: page => onPageChange(page),
                    responsive: true,
                    // current: currentPage,
                }}
            />
            <style jsx>{`
                .countsNPage {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-end;
                    margin-top: 20px;
                }

                .countsNPage > span {
                    margin-right: 20px;
                    font-family: PingFangTC;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: 0.35px;
                    text-align: right;
                    color: #3f5372;
                }
            `}</style>

            <style jsx global>
                {`
                    .ant-pagination-item-active {
                        border: solid 1px #c43826;
                        background: #c43826;
                    }

                    .ant-pagination-item-active:hover {
                        border: none;
                        color: white;
                    }

                    .ant-pagination-item-active > a {
                        color: white;
                    }

                    .ant-pagination-item-active:hover > a {
                        color: white;
                    }

                    .SearchInput_question-table-input-search__3QSct
                        > .ant-input-wrapper
                        > .ant-input-search
                        > .ant-input::placeholder {
                        font-family: PingFangSC !important;
                        font-size: 16px !important;
                        letter-spacing: 0.4px !important;
                        color: #3f5372 !important;
                    }

                    .question-table-input-search .ant-input-group-addon {
                        width: 80px !important;
                    }

                    .question-table-input-search .ant-input-search-button {
                        width: inherit;
                        background-color: #c43826 !important;
                        border-color: #c43826 !important;
                        font-size: 16px !important;
                        font-weight: normal !important;
                        font-stretch: normal !important;
                        font-style: normal !important;
                        letter-spacing: 0.4px !important;
                        text-align: center !important;
                        color: #fff !important;
                    }

                    .question-table-input-search .ant-input-search-button:hover {
                        background-color: #ea6554 !important;
                        border-color: #ea6554 !important;
                    }

                    .ant-table-filter-column {
                        justify-content: flex-start;
                    }

                    .question-table .ant-table-filter-trigger-container,
                    .question-table .ant-table-filter-trigger {
                        position: relative;
                    }

                    .question-table .sino__table .ant-table-filter-column-title,
                    .question-table .sino__table .ant-table-column-title {
                        flex: unset;
                        padding-right: 0em;
                    }

                    .ant-table-filter-dropdown-btns > .ant-btn-link {
                        border-color: #d7e0ea !important;
                    }

                    .ant-table-filter-dropdown-btns > .ant-btn-primary {
                        background-color: #c43826 !important;
                        border-color: #c43826 !important;
                    }

                    @media screen and (max-width: 450px) {
                        .ant-tabs-mobile {
                            width: 100vw;
                        }

                        .ant-tabs-nav {
                            padding: 0 45px 0 0;
                        }

                        .ant-tabs-tab {
                            margin: 0s 16px;
                        }

                        .ant-tabs-ink-bar {
                            margin-left: -1px;
                        }
                    }

                    .countsNPage .ant-table-pagination > li > button {
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                    }

                    .countsNPage .ant-table-pagination > .ant-pagination-item {
                        font-size: 16px !important;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: 0.4px;
                        text-align: center;
                        color: #0d1623 !important;
                    }

                    .countsNPage .ant-table-pagination > .ant-pagination-item > a {
                        position: relative;
                        top: 1px;
                    }

                    .countsNPage .ant-table-pagination > .ant-pagination-item-active {
                        background-color: #c43826 !important;
                        border: 0 !important;
                        color: #fff !important;
                        height: 30px !important;
                        width: 30px !important;
                    }

                    .countsNPage .ant-table-pagination > .ant-pagination-item-active > a {
                        color: #fff !important;
                        height: 30px !important;
                    }

                    .ant-table-container,
                    .ant-table-container table > thead > tr:first-child th:first-child {
                        text-align: center;
                    }

                    .question-table .ant-table-cell-ellipsis > div {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }
                `}
            </style>
        </div>
    );
};

export default QuestionTable;

QuestionTable.propTypes = {
    sub2ndCategories: PropTypes.array,
    dataSource: PropTypes.object,
    onPageChange: PropTypes.func,
    totalCounts: PropTypes.number,
};

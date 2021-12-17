import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Link from 'next/link';
import AccountTable from '../../../tradingAccount/vipInventory/AccountTable';
import PropTypes from 'prop-types';

const QuestionTable = function ({ dataSource, sub2ndCategories, fromCount, toCount, onPageChange }) {
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
        },
        {
            title: '標題',
            dataIndex: 'title',
            width: '55%',
            render(text, record, idx) {
                const s = dataSource.dataList.filter((d, index) => index === idx);

                return (
                    <Link href={`/customer-support/${s[0].uuid}`}>
                        <div style={{ cursor: 'pointer' }}>{text}</div>
                    </Link>
                );
            },
        },
    ];

    return (
        <>
            <AccountTable
                dataSource={dataSource?.dataList}
                columns={columns}
                key={dataSource?.dataList?.uuid}
                pagination={false}
            />
            {dataSource?.counts === 0 ? null : (
                <div className="countsNPage">
                    <span>
                        {fromCount}-{toCount} 則問題 ( 共 {dataSource?.counts} 則問題 )
                    </span>
                    <Pagination total={dataSource?.counts} onChange={page => onPageChange(page)} pageSize={15} />
                </div>
            )}
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
                        @media screen and (max-width: 450px) {
                            .question-list-pagination .ant-pagination-item-active {
                                border: solid 1px #c43826;
                                background: #c43826;
                            }

                            .question-list-pagination .ant-pagination-item-active:hover {
                                border: none;
                                color: white;
                            }

                            .question-list-pagination .ant-pagination-item-active > a {
                                color: white;
                            }

                            .question-list-pagination .ant-pagination-item-active:hover > a {
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

                            @media screen and (max-width: 450px) {
                                .ant-tabs-mobile {
                                    width: 100vw;
                                }

                                .ant-tabs-nav {
                                    padding: 0 45px 0 0 !important;
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
                    `}
            </style>
        </>
    );
};

export default QuestionTable;

QuestionTable.propTypes = {
    sub2ndCategories: PropTypes.array,
    dataSource: PropTypes.object,
    fromCount: PropTypes.number,
    toCount: PropTypes.number,
    onPageChange: PropTypes.func,
};

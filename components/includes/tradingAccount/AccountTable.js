import { useEffect, useState, useCallback } from 'react';
import { Table } from 'antd';
import theme from '../../../resources/styles/theme';
const AccountTable = ({ ...props }) => {
    return (
        <div>
            <div className="sino__table">
                <Table {...props} />
            </div>

            <style jsx global>{`
                .filterBtn {
                    cursor: pointer;
                }
                .sino__table {
                    margin-bottom: 20px;
                }
                .sino__table .ant-table table {
                    border: solid 1px #d7e0ef;
                }
                .sino__table .ant-tooltip-inner {
                    color: white;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    margin-right: -4px;
                    margin-top: -3px;
                    z-index: 3;
                }
                .sino__table .ant-tooltip-arrow {
                    width: 25px;
                    height: 25px;
                    margin-top: -10px;
                }
                .sino__table .ant-table-thead > tr > th {
                    background-color: #f2f5fa;
                    color: #6c7b94;
                }
                .sino__table .ant-table-thead > tr > th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    border-bottom: solid 1px #d7e0ef;
                    white-space: nowrap;
                }
                .sino__table .ant-table-thead > tr > th:first-child {
                    padding-left: 3%;
                }
                .sino__table .ant-table-thead > tr > th:last-child {
                    padding-right: 3%;
                }
                .sino__table .ant-table-tbody > tr > td {
                    border-bottom: solid 1px #e6ebf5;
                    font-size: 1.6rem;
                    color: #0d1623;
                    white-space: nowrap;
                }
                .sino__table .ant-table-tbody > tr > td:first-child {
                    padding-left: 3%;
                }
                .sino__table .ant-table-tbody > tr > td:last-child {
                    padding-right: 3%;
                }
                .sino__table .ant-pagination-disabled .ant-pagination-item-link {
                    border-color: #d7e0ef;
                }
                .sino__table .ant-pagination-item-active a {
                    color: white;
                }
                .sino__table .ant-pagination-item-active {
                    background-color: #c43826;
                    border: none;
                }
                .sino__table .ant-pagination-item {
                    border-color: #d7e0ef;
                    transition: all 0.3s;
                }
                .sino__table .ant-pagination-next .ant-pagination-item-link {
                    border-color: #d7e0ef;
                }
                .sino__table .ant-pagination-item:hover a {
                    color: #c43826;
                }
                .sino__table .ant-pagination-item:hover {
                    border-color: #c43826;
                }
                .sino__table .ant-pagination-item-active a {
                    color: white !important;
                }
                .sino__table .ant-pagination-prev:hover .ant-pagination-item-link {
                    color: #c43826;
                    border-color: #c43826;
                }
                .sino__table .ant-pagination-next:hover .ant-pagination-item-link {
                    color: #c43826;
                    border-color: #c43826;
                }
                .sino__table .ant-table-pagination.ant-pagination {
                    margin-top: 20px;
                }
                .sino__table .ant-pagination-total-text {
                    color: #6c7b94;
                    margin-right: 16px;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .sino__table .ant-table table {
                        border: none;
                        border-top: solid 1px #d7e0ef;
                    }
                    .sino__table .ant-table-thead > tr > th {
                        padding-top: 2px;
                        padding-bottom: 2px;
                    }
                    .sino__table .ant-table-pagination.ant-pagination {
                        width: 100%;
                        text-align: center;
                    }
                    .sino__table .ant-pagination-total-text {
                        display: block;
                        margin-top: -15px;
                    }
                }
                .sino__table .normalWhiteSpace {
                    white-space: normal !important;
                }
            `}</style>
        </div>
    );
};

export default AccountTable;

import { useEffect, useState, useCallback } from 'react';
import { Table, ConfigProvider } from 'antd';
import theme from '../../../../resources/styles/theme';
import { SmileOutlined } from '@ant-design/icons';
import filterIcon from '../../../../resources/images/components/tradingAccount/ic-sort.svg';
import noDataImg from '../../../../resources/images/components/oauthCancel/img-no-data.svg';
import filterIconActive from '../../../../resources/images/components/tradingAccount/ic-sort-active.svg';

// columns設定filterDropdown 會有自訂的icon產生
// filterColumns 為現在 active的 filter key，icon會自動產生變化
const AccountTable = ({ filterColumns, noDataSetting, ...props }) => {
    const [columns, setColumns] = useState([]);
    const [noData, setNoDataSetting] = useState({ imgSrc: '', text: '', tStyle: '' });
    useEffect(() => {
        if (noDataSetting != undefined) {
            setNoDataSetting(noDataSetting);
        }
    }, [noDataSetting]);
    useEffect(() => {
        let newColumns = [];
        if (props.columns?.length > 0) {
            newColumns = props.columns.map(item => {
                if (item.filterDropdown != null) {
                    const checkActive = checkActiveHandler(item.dataIndex, filterColumns);
                    item.filterIcon = (
                        <img
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            src={checkActive ? filterIconActive : filterIcon}
                        />
                    );
                }
                return item;
            });
        }

        setColumns(newColumns);
    }, [props.columns, filterColumns]);

    //no Data customize
    const customizeRenderEmpty = () => {
        console.log('empty', noData.text);
        return (
            <div style={{ textAlign: 'center' }}>
                <img src={noData.imgSrc || noDataImg}></img>
                <p style={noData.tStyle || { color: '#3f5372', marginTop: '12px' }}>{noData.text || '目前暫無資料'}</p>
            </div>
        );
    };

    const checkActiveHandler = (dataIndex, filterColumns) => {
        let active = false;
        filterColumns.forEach(item => {
            if (item === dataIndex) {
                active = true;
            }
        });
        console.log('active', filterColumns);
        return active;
    };

    return (
        <div>
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <div className="sino__table">
                    <Table columns={columns} {...props} />
                </div>
            </ConfigProvider>
            <style jsx global>{`
                .sino__table .ant-table-row-expand-icon {
                    background: #254a91;
                    color: white;
                    border-radius: 2px;
                    width: 20px;
                    height: 20px;
                    border-radius: 3px;
                }
                .sino__table .ant-table-row-expand-icon:after {
                    left: 8px;
                }

                .sino__table .ant-table-row-expand-icon:before {
                    top: 8px;
                }

                .ant-table-column-sorters {
                    padding: 0;
                }

                .filterBtn {
                    cursor: pointer;
                }
                .sino__table {
                    margin-bottom: 20px;
                }
                .sino__table .ant-table table {
                    // border: solid 1px #d7e0ef;
                }
                .sino__table .ant-table-container {
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
                    padding-left: 12px;
                    padding-right: 12px;
                }
                .sino__table .ant-table-thead > tr > th:first-child {
                    padding-left: ${props.dataSource?.length > 0 ? '3%' : '1%'};
                }
                .sino__table .ant-table-filter-column {
                    padding-left: ${props.dataSource?.length > 0 ? 0 : '22px'};
                }
                .sino__table .ant-table-thead > tr > th:last-child {
                    padding-right: ${props.dataSource?.length > 0 ? '3%' : 0};
                }
                .sino__table .ant-table-tbody > tr > td {
                    border-bottom: solid 1px #e6ebf5;
                    font-size: 1.6rem;
                    color: #0d1623;
                    white-space: nowrap;
                }

                .sino__table .ant-table-tbody > tr > td:first-child {
                    // padding-left: ${props.dataSource?.length > 0 ? '3%' : 0};
                    padding-left: 28px;
                }
                .sino__table .ant-table-tbody > tr > td:last-child {
                    padding-right: ${props.dataSource?.length > 0 ? '3%' : 0};
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
                .sino__table .ant-table-column-sorters {
                    padding: 0;
                }
                .sino__table .ant-table-column-sorter-down.active {
                    color: black;
                }
                .sino__table .ant-table-column-sorter-up.active {
                    color: black;
                }
                .ant-table-column-sorter-down.active,
                .ant-table-column-sorter-up.active {
                    color: #343434;
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .sino__table .ant-table-thead > tr > th:first-child {
                        // padding-left: ${props.dataSource?.length > 0 ? '3%' : '5px'};
                        padding-left: 0;
                    }
                    .sino__table .ant-table table {
                        border: none;
                        // border-top: solid 1px #d7e0ef;
                    }
                    .sino__table .ant-table-container {
                        border-left: none;
                        border-right: none;
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
                        margin-top: -10px;
                        margin-right: 0;
                    }
                    .sino__table .ant-table-thead > tr > th:first-child {
                        padding-left: 18px !important;
                    }
                    .sino__table .ant-table-tbody > tr > td:first-child {
                        padding-left: 20px !important;
                    }
                    .sino__table .ant-table-cell:first-child .ant-table-filter-column-title {
                        padding-left: 17px !important;
                    }
                    .sino__table .ant-table-cell {
                        padding-left: 12px;
                        padding-right: 12px;
                    }
                }
                .sino__table .normalWhiteSpace {
                    white-space: normal !important;
                }

                .sino__table .ant-table-tbody > tr:last-child > td {
                    border-bottom: none !important;
                }
                .sino__table .ant-table-tbody > tr:last-child > td {
                    border-bottom: none !important;
                }
                .ant-table-tbody > tr:last-child > td {
                    border-bottom: none !important;
                }
                .sino__table .ant-checkbox-input:focus + .ant-checkbox-inner,
                .ant-checkbox-wrapper:hover .ant-checkbox-inner,
                .ant-checkbox:hover .ant-checkbox-inner {
                    border-color: #c43826;
                }
                .sino__table .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #c43826;
                    border-color: #c43826;
                }
                .sino__table .ant-checkbox.ant-checkbox-checked:hover {
                    border-color: #c43826 !important;
                }
                .sino__table .ant-checkbox-checked:after {
                    border: none;
                }
                .sino__table .ant-checkbox-indeterminate .ant-checkbox-inner:after {
                    background-color: #c43826;
                }
                .sino__table .ant-table-tbody > tr.ant-table-row-selected > td {
                    background: #f7f8fb;
                }

                .sino__table .ant-checkbox-disabled .ant-checkbox-inner {
                    // display: none;
                }
                .sino__table .ant-table-tbody > tr > td {
                    padding: 12px;
                }

                .sino__table .ant-table-filter-column-title {
                    padding: 12px 2.3em 12px 17px;
                }
                .sino__table .ant-table-thead > tr > th:first-child {
                    padding-left: 25px;
                }
            `}</style>
        </div>
    );
};

export default AccountTable;

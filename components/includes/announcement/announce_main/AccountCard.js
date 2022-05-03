import { useEffect, useState, useCallback } from 'react';
import { Table, Pagination } from 'antd';
import theme from '../../../../resources/styles/theme';
import filterIcon from '../../../../resources/images/components/tradingAccount/ic-sort.svg';
import filterIconActive from '../../../../resources/images/components/tradingAccount/ic-sort-active.svg';
import topTag from '../../../../resources/images/components/announcement/top-tag.svg';

const AccountTable = ({ filterColumns,getData, ...props }) => {
const [columns, setColumns] = useState([]);

    const checkActiveHandler = (dataIndex, filterColumns) => {
        let active = false;
        filterColumns.forEach(item => {
            if (item === dataIndex) {
                active = true;
            }
        });
        return active;
    };
  
    return (
        <div>
            <div className="sino__table">
                <ul className="list_card">
                {
                    props.dataSource.map( data => {
                       return (
                       <li key={data.articleGUID}>
                            <a href={`${process.env.NEXT_PUBLIC_SUBPATH}/AnnouncementPage?GUID=${data.articleGUID}`}><div className="title_box">
                                {(data.isTop==1)?(<img className="topTag" src={topTag}></img>):''}
                                {data.title}</div></a>
                            <div className="sub_box">
                                <div>{data.postTime.replace(/[/]/g,'.')}</div>
                                <div>{data.category1}</div>
                                <div>{data.category2}</div>
                            </div>
                        </li>
                        )
                    })
                }  
                </ul>
                <div className="pagination">
                    <Pagination {...props.pagination}/>
                </div>
                
            </div>
            <style jsx>{`
                .list_card {list-style: none;padding: 0;margin: 0;background-color: #FFF;margin-bottom:16px;}
                .list_card li {padding: 12px 16px;}
                .list_card li {border-bottom:1px solid #e6ebf5;}
                .list_card li .title_box{width:100%;font: 16px PingFangTC;color: #0d1623;text-align:justify;font-weight:700;
                   overflow:hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
                .list_card li .sub_box{display: flex;align-items:flex-end;margin-top:1em;}
                .list_card li .sub_box>div{font-size: 14px;color: #3f5372;margin-left:0.8em;}
                .list_card li .sub_box>div:first-child{min-width: 5em;margin-left:0;}
                .pagination{text-align:center;padding:0 16px;}
            `}</style>
            <style jsx global>{`
                .filterBtn {
                    cursor: pointer;
                }
                .sino__table {
                    margin-bottom: 20px; max-width:100%;
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
                .sino__table .ant-table-thead > tr > th:nth-child(2) { width:7.5em;}
                .sino__table .ant-table-thead > tr > th:nth-child(3) { width:5.5em;}
                .sino__table .ant-table-thead > tr > th:last-child {  width:10em;   }
                .sino__table .ant-table-tbody > tr > td {
                    border-bottom: solid 1px #e6ebf5;
                    font-size: 1.6rem;
                    color: #0d1623;
                    white-space: nowrap;
                }
                .sino__table .ant-table-thead > tr > th:nth-child(4),
                .sino__table .ant-table-tbody > tr > td:nth-child(4){
                    width: 60%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width:0px;
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
                    .sino__table .ant-table-thead > tr > th:first-child {
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

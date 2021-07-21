import { useEffect, useState } from 'react';
import { Table } from 'antd';
import theme from '../../../../resources/styles/theme';
import filterIcon from '../../../../resources/images/components/tradingAccount/ic-sort.svg';
import filterIconActive from '../../../../resources/images/components/tradingAccount/ic-sort-active.svg';

const AccountTable = ({ filterColumns, ...props }) => {
const [columns, setColumns] = useState([]);
    useEffect(() => {
        let newColumns = [];
        if (props.columns.length > 0) {
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
            <div className="sino__table announce">
                <Table columns={columns} {...props}  />
            </div>

            <style jsx global>{`
                .filterBtn {cursor:pointer;}
                .sino__table.announce {padding-bottom:20px;}
                .sino__table.announce .ant-table-container{border:solid 1px #d7e0ef;border-radius:0;}
                .sino__table.announce .ant-tooltip-inner{color:white;box-shadow:0 2px 15px 0 rgba(169,182,203,0.7);padding:16px;line-height:25px;margin-right:-4px;margin-top:-3px;z-index:3;}
                .sino__table.announce .ant-tooltip-arrow{width:25px;height:25px;margin-top:-10px;}
                .sino__table.announce .title_a{display: block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
                .sino__table.announce .title_a:hover{color:#daa360;}
                .sino__table.announce .ant-table-thead > tr > th{background-color:#f2f5fa;color:#6c7b94;white-space:nowrap;}
                .sino__table.announce .ant-table-tbody > tr > td{border-bottom:solid 1px #e6ebf5;font-size:1.6rem;color:#0d1623;white-space:nowrap;}
                .sino__table.announce .ant-table-thead > tr > th:first-child {  padding-left:45px; }
                .sino__table.announce .ant-table-tbody > tr > td:first-child {  padding-left:45px;text-align:center;color:#daa360; }
                .sino__table.announce .ant-table-thead > tr > th:nth-child(2) { width:7.5em;}
                .sino__table.announce .ant-table-thead > tr > th:nth-child(3) { width:5.5em;}
                .sino__table.announce .ant-table-thead > tr > th:last-child,
                .sino__table.announce .ant-table-tbody > tr > td:last-child {  width:10em;  padding-right:45px; }
                .sino__table.announce .ant-table-thead > tr > th:nth-child(4){width:60%;overflow:hidden;}
                .sino__table.announce .ant-table-tbody > tr > td:nth-child(4){max-width:0px;}
                .sino__table.announce .ant-table-thead > tr > th:nth-child(5),
                .sino__table.announce .ant-table-tbody > tr > td:nth-child(5){text-align:right;padding-right:15px}
                .sino__table.announce .ant-pagination-disabled .ant-pagination-item-link{border-color:#d7e0ef;}
                .sino__table.announce .ant-pagination-item-active a{color:white;}
                .sino__table.announce .ant-pagination-item-active{background-color:#c43826;border:none;}
                .sino__table.announce .ant-pagination-item{border-color:#d7e0ef;transition:all 0.3s;}
                .sino__table.announce .ant-pagination-next .ant-pagination-item-link{border-color:#d7e0ef;}
                .sino__table.announce .ant-pagination-item:hover a{color:#c43826;}
                .sino__table.announce .ant-pagination-item:hover{border-color:#c43826;}
                .sino__table.announce .ant-pagination-item-active a{color:white !important;}
                .sino__table.announce .ant-pagination-prev:hover .ant-pagination-item-link{color:#c43826;border-color:#c43826;}
                .sino__table.announce .ant-pagination-next:hover .ant-pagination-item-link{color:#c43826;border-color:#c43826;}
                .sino__table.announce .ant-table-pagination.ant-pagination{margin-top:20px;}
                .sino__table.announce .ant-pagination-total-text{color:#6c7b94;margin-right:16px;}
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .sino__table.announce .ant-table-thead > tr > th:first-child{padding-left:0;}
                    .sino__table.announce .ant-table table{border:none;}
                    .sino__table.announce .ant-table-container{border-left:none;border-right:none;}
                    .sino__table.announce .ant-table-thead > tr > th{padding-top:2px;padding-bottom:2px;}
                    .sino__table.announce .ant-table-pagination.ant-pagination{width:100%;text-align:center;}
                    .sino__table.announce .ant-pagination-total-text{display:block;margin-top:-10px;margin-right:0;}
                    .sino__table.announce .ant-table-thead > tr > th:first-child{padding-left:18px !important;}
                    .sino__table.announce .ant-table-tbody > tr > td:first-child{padding-left:20px !important;}
                    .sino__table.announce .ant-table-cell:first-child .ant-table-filter-column-title{padding-left:17px !important;}
                    .sino__table.announce .ant-table-cell{padding-left:12px;padding-right:12px;}
                }
                .sino__table.announce .normalWhiteSpace{white-space:normal !important;}
                .sino__table.announce .ant-table-tbody > tr:last-child > td{border-bottom:none !important;}
                .sino__table.announce .ant-table-tbody > tr:last-child > td{border-bottom:none !important;}
                .sino__table.announce .ant-table-tbody > tr:last-child > td{border-bottom:none !important;}
                .sino__table.announce .ant-checkbox-input:focus + .ant-checkbox-inner,
                .sino__table.announce .ant-checkbox-wrapper:hover .ant-checkbox-inner,
                .sino__table.announce .ant-checkbox:hover .ant-checkbox-inner{border-color:#c43826;}
                .sino__table.announce .ant-checkbox-checked .ant-checkbox-inner{background-color:#c43826;border-color:#c43826;}
                .sino__table.announce .ant-checkbox.ant-checkbox-checked:hover{border-color:#c43826 !important;}
                .sino__table.announce .ant-checkbox-checked:after{border:none;}
                .sino__table.announce .ant-checkbox-indeterminate .ant-checkbox-inner:after{background-color:#c43826;}
                .sino__table.announce .ant-table-tbody > tr.ant-table-row-selected > td{background:#f7f8fb;}
                .sino__table.announce .ant-table-tbody > tr > td{padding:12px;}
                .sino__table.announce .ant-table-filter-column-title{padding:12px 2.3em 12px 17px;}

            `}</style>
        </div>
    );
};

export default AccountTable;

import { useEffect, useState, useCallback } from 'react';
import { Table, Tooltip } from 'antd';

let titleText = {};
let init = false;
const AccountTable = ({ ...props }) => {
    const [columns, setColumns] = useState([]);
    const [sinoFilterRenKey, setSinoFilterRenKey] = useState('');

    useEffect(() => {
        document.addEventListener('click', bodyClickHandler);
        return () => {
            document.removeEventListener('click', bodyClickHandler);
        };
    }, []);

    useEffect(() => {
        if (props.columns.length > 0 && !init) {
            props.columns.forEach(item => {
                if (item.title != null && item.title) {
                    let newKey = item.key;
                    titleText[newKey] = item.title;
                }
            });
            console.log('titleText', titleText, props.columns);
            init = true;
        }
    }, [props.columns]);

    const bodyClickHandler = e => {
        if (e.target.className !== 'ant-tooltip-content' && e.target.className !== 'filterBtn') {
            setSinoFilterRenKey('');
        }
    };

    useEffect(() => {
        setColumns(mapColumnsHandler(props.columns, sinoFilterRenKey));
    }, [props.columns, sinoFilterRenKey]);

    const filterClick = useCallback(
        key => {
            let newKey = key;
            setSinoFilterRenKey(oldKey => {
                if (!oldKey || oldKey == null) {
                    return newKey;
                } else {
                    return '';
                }
            });
        },
        [sinoFilterRenKey],
    );

    const mapColumnsHandler = (columns, filterKey) => {
        return columns.map(item => {
            if (item.sinoFilter != null && item.sinoFilter) {
                item.title = (
                    <div>
                        <div className="filterBtn" onClick={filterClick.bind(null, item.key)}>
                            {titleText[item.key]}
                        </div>
                        <Tooltip
                            visible={item.key === filterKey}
                            title={item.sinoFilterRender}
                            color="white"
                            placement="bottomLeft"
                            getPopupContainer={trigger => trigger.parentElement}
                        />
                    </div>
                );
            }
            return item;
        });
    };

    return (
        <>
            <div className="sino__table">
                <Table columns={columns} {...props} />
            </div>

            <style jsx global>{`
                .filterBtn {
                    cursor: pointer;
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
                }
                .sino__table .ant-table-thead > tr > th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    border-bottom: solid 1px #d7e0ef;
                }
                .sino__table .ant-table-tbody > tr > td {
                    border-bottom: solid 1px #e6ebf5;
                }
            `}</style>
        </>
    );
};

export default AccountTable;

import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview';
import { useCallback, useState, useEffect } from 'react';

import drag from '../../../resources/images/pages/Self_select/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';

const DragTable = ({ tableData }) => {
    console.log(tableData);
    const [selfSelectList, setSelfSelectList] = useState([]);

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            setSelfSelectList(tableData);
        } else {
            setSelfSelectList([]);
        }
    }, [tableData]);

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
        },
        {
            title: '成交價',
            dataIndex: 'close',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌',
            dataIndex: 'changePrice',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '漲跌幅',
            dataIndex: 'changeRate',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '成交量',
            dataIndex: 'totalVolume',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '昨收',
            dataIndex: 'reference',
            render: data => <span className={data.class}>{data.text}</span>,
        },
        {
            title: '交易',
            dataIndex: 'action',
            render: (text, record, index) => (
                <>
                    <button className="btn buy">買進</button>
                    <button className="btn sell">賣出</button>
                </>
            ),
        },
        {
            title: '刪除',
            dataIndex: '刪除',
            render: (text, record, index) => (
                <span className="cancel">
                    <img src={cancel} />
                </span>
            ),
        },
        {
            title: '移動',
            key: '移動',
            render: (text, record, index) => (
                <span className="drag">
                    <img src={drag} />
                </span>
            ),
        },
    ];

    const dragProps = {
        onDragEnd(fromIndex, toIndex) {
            const data = JSON.parse(JSON.stringify(selfSelectList));
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setSelfSelectList(data);
        },
        handleSelector: '.drag',
    };

    return (
        <>
            <ReactDragListView {...dragProps}>
                <Table className="drag__Table" columns={columns} pagination={false} dataSource={selfSelectList} />
            </ReactDragListView>

            <style jsx>{``}</style>
            <style jsx global>{`
                .drag__Table .upper {
                    color: #f45a4c;
                }
                .drag__Table .upper__icon:before {
                    content: '▲ ';
                }
                .drag__Table .lower {
                    color: #22a16f;
                }
                .drag__Table .lower__icon:before {
                    content: '▼ ';
                }
                .drag__Table .ant-table-cell {
                    color: #0d1623;
                }
                .drag__Table .btn {
                    height: 24px;
                    width: 44px;
                    font-size: 1.2rem;
                    border: 0;
                    color: #fff;
                    border-radius: 2px;
                    margin: 0 2px;
                }
                .drag__Table .btn.buy {
                    background: #f45a4c;
                }
                .drag__Table .btn.sell {
                    background: #22a16f;
                }
                .drag__Table .cancel {
                    cursor: pointer;
                }
                .drag__Table .drag {
                    cursor: move;
                }
            `}</style>
        </>
    );
};

export default DragTable;

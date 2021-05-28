import { Table } from 'antd';
import ReactDragListView from 'react-drag-listview';
import { useCallback, useState, useEffect } from 'react';

import drag from '../../../resources/images/pages/Self_select/menu-hamburger.svg';
import cancel from '../../../resources/images/pages/Self_select/menu-close-small.svg';

const DragTable = () => {
    const [data1, setData1] = useState([
        {
            key: 1,
            商品: '00881 國泰台灣1G+',
            成交價: { text: 613, class: 'upper' },
            漲跌: { text: 9.99, class: 'upper upper__icon' },
            漲跌幅: { text: 0.35, class: 'upper upper__icon' },
            成交量: { text: '36895' },
            昨收: { text: 611 },
        },
        {
            key: 2,
            商品: '00881 國泰台灣2G+',
            成交價: { text: 613, class: 'lower' },
            漲跌: { text: 9.99, class: 'lower lower__icon' },
            漲跌幅: { text: 0.35, class: 'lower lower__icon' },
            成交量: { text: '36895' },
            昨收: { text: 611 },
        },
        {
            key: 3,
            商品: '00881 國泰台灣3G+',
            成交價: { text: 613, class: '' },
            漲跌: { text: '--', class: '' },
            漲跌幅: { text: '--', class: '' },
            成交量: { text: '36895' },
            昨收: { text: 611 },
        },
        {
            key: 4,
            商品: '00881 國泰台灣4G+',
            成交價: { text: 613, class: 'lower' },
            漲跌: { text: 9.99, class: 'lower lower__icon' },
            漲跌幅: { text: 0.35, class: 'lower lower__icon' },
            成交量: { text: '36895' },
            昨收: { text: 611 },
        },
        {
            key: 5,
            商品: '00881 國泰台灣5G+',
            成交價: { text: 613, class: 'upper' },
            漲跌: { text: 9.99, class: 'upper upper__icon' },
            漲跌幅: { text: 0.35, class: 'upper upper__icon' },
            成交量: { text: '36895' },
            昨收: { text: 611 },
        },
        {
            key: 6,
            商品: '00881 國泰台灣6G+',
            成交價: { text: 613, class: 'upper' },
            漲跌: { text: 9.99, class: 'upper upper__icon' },
            漲跌幅: { text: 0.35, class: 'upper upper__icon' },
            成交量: { text: 36895 },
            昨收: { text: 611 },
        },
    ]);

    const columns = [
        {
            title: '商品',
            dataIndex: '商品',
        },
        {
            title: '成交價',
            dataIndex: '成交價',
            render: text => <span className={text.class}>{text.text}</span>,
        },
        {
            title: '漲跌',
            dataIndex: '漲跌',
            render: text => <span className={text.class}>{text.text}</span>,
        },
        {
            title: '漲跌幅',
            dataIndex: '漲跌幅',
            render: text => <span className={text.class}>{text.text}</span>,
        },
        {
            title: '成交量',
            dataIndex: '成交量',
            render: text => <span className={text.class}>{text.text}</span>,
        },
        {
            title: '昨收',
            dataIndex: '昨收',
            render: text => <span className={text.class}>{text.text}</span>,
        },
        {
            title: '交易',
            dataIndex: '交易',
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
            const data = JSON.parse(JSON.stringify(data1));
            const item = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            setData1(data);
        },
        handleSelector: '.drag',
    };

    return (
        <>
            <ReactDragListView {...dragProps}>
                <Table className="drag__Table" columns={columns} pagination={false} dataSource={data1} />
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

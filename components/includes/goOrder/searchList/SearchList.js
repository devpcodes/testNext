import { Table, Space } from 'antd';
import { timeFormatter } from '../../../../services/timeFormatter';
const columns = [
    {
        title: '時間',
        dataIndex: 'tran_time',
        key: 'tran_time',
        render: text => {
            const timeStr = timeFormatter(text);
            const timeArr = timeStr.split(':');
            return (
                <>
                    <p className="item">{timeArr[0] + ':' + timeArr[1]}</p>
                    <p className="item time__str--down">{':' + timeArr[2]}</p>
                </>
            );
        },
    },
    {
        title: '商品',
        dataIndex: 'name_zh',
        key: 'name_zh',
        render: text => {
            return (
                <>
                    <p className="item">{text}</p>
                    <p className="item">
                        <span className="flag" style={{ background: '#f45a4c' }}>
                            現
                        </span>
                        <span className="timeInForce">ROD</span>
                    </p>
                </>
            );
        },
    },
    {
        title: '委託價/量',
        dataIndex: 'price',
        key: 'price',
        render: text => {
            return (
                <>
                    <p className="item">{text}</p>
                    <p className="item--down">{1000}</p>
                </>
            );
        },
    },
    {
        title: '成交價/量',
        dataIndex: 'match_price',
        key: 'match_price',
        render: text => {
            return (
                <>
                    <p className="item">{text}</p>
                    <p className="item--down">{1000}</p>
                </>
            );
        },
    },
    {
        title: '狀態',
        key: 'status',
        render: (text, record) => (
            <>
                <p className="item">完全</p>
                <p className="item">成交</p>
            </>
        ),
    },
];

const data = [
    {
        key: '1',
        name_zh: '台積電',
        tran_time: '090425',
        price: 435.5,
        qty: 1000,
        match_price: 435.5,
        match_qty: 1000,
    },
    {
        key: '2',
        name_zh: '台積電',
        tran_time: '090425',
        price: 435.5,
        qty: 1000,
        match_price: 435.5,
        match_qty: 1000,
    },
];
const SearchList = () => {
    return (
        <div className="searchList__container">
            <Table columns={columns} dataSource={data} pagination={false} />
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
                    padding-right: 10px;
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
                    vertical-align: top;
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
                    margin-top: -7px;
                }
                .searchList__container .ant-table-column-sorter-down.active {
                    color: black;
                }
                .searchList__container .ant-table-column-sorter-up.active {
                    color: black;
                }
            `}</style>
        </div>
    );
};

export default SearchList;

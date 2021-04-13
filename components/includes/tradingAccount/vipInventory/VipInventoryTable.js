import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import useSWR from 'swr';
import Highlighter from 'react-highlight-words';
import AccountTable from './AccountTable';
import DropfilterCheckBox from './DropfilterCheckBox';
import DropFilterSearch from './DropFilterSearch';
// import theme from '../../../resources/styles/theme';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import BuyButton from './buttons/BuyButton';
import SellButton from './buttons/SellButton';
import { fetchInventory } from '../../../../services/stock/fetchInventory';
import { formatNum } from '../../../../services/formatNum';

const VipInventoryTable = ({ getColumns, getData }) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [searchColumns, setSearchColumns] = useState([]);
    const [searchWords, setSearchWords] = useState('');
    const currentAccount = useSelector(store => store.user.currentAccount);
    const isMobile = useCheckMobile();
    const { data: fetchData } = useSWR([currentAccount, searchWords, currentPage, pageSize], fetchInventory);

    useEffect(() => {
        // fetchData
        if (fetchData?.totalCount != null) {
            setTotal(fetchData.totalCount);
        }
        if (Array.isArray(fetchData?.data) && fetchData?.data?.length > 0) {
            const tableData = fetchData.data.map((item, key) => {
                item.product = item.stock + ' ' + item.Name;
                item.key = key;
                return item;
            });
            getData(tableData);
            setData(tableData);
        }
    }, [fetchData]);

    useEffect(() => {
        const newColumns = [
            {
                title: '類別',
                dataIndex: 'ttype',
                key: 'ttype',
                width: isMobile ? '80px' : '12%',
                fixed: 'left',
                ...getColumnSearchProps('ttype'),
                render: (text, record) => {
                    switch (text) {
                        case '0':
                            return '現股';
                        case '1':
                            return '融資';
                        case '2':
                            return '融券';
                    }
                },
            },
            {
                title: '商品',
                dataIndex: 'product',
                key: 'product',
                width: isMobile ? '120px' : '20%',
                fixed: 'left',
                className: 'vipInventoryStock',
                ...getColumnSearchProps('product'),
            },
            {
                title: '現價',
                dataIndex: 'lastprice',
                key: 'lastprice',
                align: 'right',
            },
            {
                title: '昨餘',
                dataIndex: 'preqty',
                key: 'preqty',
                align: 'right',
                render: text => {
                    return formatNum(text, 0);
                },
            },
            {
                title: '今買成',
                dataIndex: 'bqty',
                key: 'bqty',
                align: 'right',
                render: text => {
                    return formatNum(text, 0);
                },
            },
            {
                title: '今賣成',
                dataIndex: 'sqty',
                key: 'sqty',
                align: 'right',
                render: text => {
                    return formatNum(text, 0);
                },
            },
            {
                title: '交易',
                dataIndex: 'trade',
                key: 'trade',
                align: 'center',
                width: '150px',
                render: (text, record, index) => {
                    return (
                        <div>
                            <BuyButton text={'買進'} />
                            <SellButton text={'賣出'} />
                        </div>
                    );
                },
            },
        ];
        getColumns(newColumns);
        setColumns(newColumns);
    }, [isMobile, currentAccount, searchColumns, searchWords]);

    const submitHandler = useCallback(
        (confirm, val) => {
            confirm();
            // getUnRealPrtlos(currentAccount, { stock: val });
            setSearchColumns(columns => {
                if (!columns.includes('product')) {
                    columns.push('product');
                }
                return columns;
            });
            setSearchWords(val);
        },
        [currentAccount],
    );

    const searchResetHandler = confirm => {
        confirm();
        if (searchColumns.indexOf('product') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('product');
                columns.splice(index, 1);
                return columns;
            });
            setSearchWords('');
        }
    };

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'product') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropFilterSearch
                        onSubmit={submitHandler.bind(null, confirm)}
                        onReset={searchResetHandler.bind(null, confirm)}
                        value={searchWords}
                    />
                ),
                render: text =>
                    searchColumns.includes(dataIndex) ? (
                        <Highlighter
                            highlightStyle={{ padding: 0, color: '#daa360', backgroundColor: 'rgba(255,255,255,0)' }}
                            searchWords={[searchWords]}
                            autoEscape
                            textToHighlight={text ? text.toString() : ''}
                        />
                    ) : (
                        text
                    ),
            };
        } else {
            return {
                filterDropdown: () => <DropfilterCheckBox />,
            };
        }
    };

    const getScrollX = data => {
        if (data?.length == 0) {
            return {};
        } else {
            return { x: 780 };
        }
    };

    const pageChangeHandler = (page, pageSize) => {
        setCurrentPage(page);
    };

    return (
        <>
            <AccountTable
                scroll={getScrollX(data)}
                columns={columns}
                dataSource={data}
                pagination={{
                    total: total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`,
                    defaultPageSize: pageSize,
                    defaultCurrent: 1,
                    showSizeChanger: false,
                    onChange: pageChangeHandler,
                    responsive: true,
                }}
                filterColumns={searchColumns}
            />
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                }
                .ant-input {
                    border: 1px solid #e6ebf5;
                }
                .vipInventoryStock {
                    font-weight: bold;
                }
                @media (max-width: 768px) {
                    .vipInventoryStock {
                        white-space: normal !important;
                    }
                }
                /* .ant-table-filter-dropdown {
                    width: 148px;
                    height: 217px;
                    padding-top: 15px;
                } */
            `}</style>
        </>
    );
};

export default VipInventoryTable;

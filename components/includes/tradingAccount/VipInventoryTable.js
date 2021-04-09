import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import Highlighter from 'react-highlight-words';
import AccountTable from './AccountTable';
import DropfilterCheckBox from './DropfilterCheckBox';
import DropFilterSearch from './DropFilterSearch';
import theme from '../../../resources/styles/theme';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import filterIcon from '../../../resources/images/components/tradingAccount/ic-sort.svg';
import { fetchStockUnRealPrtlos } from '../../../services/stock/stockUnRealPrtlosFetcher';
import { getCookie } from '../../../services/components/layouts/cookieController';
import { getToken } from '../../../services/user/accessToken';
import { getStockUnRealPrtlos } from '../../../store/stock/action';

const VipInventoryTable = ({ getColumns, getData }) => {
    const dispatch = useDispatch();

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [searchColumns, setSearchColumns] = useState([]);
    const [searchWords, setSearchWords] = useState('');

    const currentAccount = useSelector(store => store.user.currentAccount);
    const unRealPrtlos = useSelector(store => store.stock.UnRealPrtlos);
    const isMobile = useCheckMobile();

    useEffect(() => {
        if (currentAccount.broker_id != null) {
            getUnRealPrtlos(currentAccount);
        }
    }, [currentAccount]);

    useEffect(() => {
        if (Array.isArray(unRealPrtlos)) {
            const tableData = unRealPrtlos.map((item, key) => {
                item.stock = item.stock + ' ' + item.stocknm;
                item.key = key;
                return item;
            });
            getData(tableData);
            setData(tableData);
        }
    }, [unRealPrtlos]);

    useEffect(() => {
        const newColumns = [
            {
                title: '類別',
                dataIndex: 'ttypename',
                key: 'ttypename',
                width: isMobile ? '80px' : '12%',
                fixed: 'left',
                ...getColumnSearchProps('ttypename'),
            },
            {
                title: '商品',
                dataIndex: 'stock',
                key: 'stock',
                width: isMobile ? '120px' : '20%',
                fixed: 'left',
                className: 'vipInventoryStock',
                ...getColumnSearchProps('stock'),
            },
            {
                title: '現價',
                dataIndex: 'lastprice',
                key: 'lastprice',
                align: 'right',
            },
            {
                title: '昨餘',
                dataIndex: 'qty',
                key: 'qty',
                align: 'right',
            },
            {
                title: '今買成',
                dataIndex: 'bqty',
                key: 'bqty',
                align: 'right',
            },
            {
                title: '今賣成',
                dataIndex: 'sqty',
                key: 'sqty',
                align: 'right',
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
                            <Button
                                style={{
                                    width: '44px',
                                    height: '24px',
                                    padding: 0,
                                    backgroundColor: '#f45a4c',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    border: 'none',
                                    marginRight: '5px',
                                }}
                            >
                                買進
                            </Button>
                            <Button
                                style={{
                                    width: '44px',
                                    height: '24px',
                                    padding: 0,
                                    backgroundColor: '#22a16f',
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    border: 'none',
                                    marginLeft: '5px',
                                }}
                            >
                                賣出
                            </Button>
                        </div>
                    );
                },
            },
        ];
        getColumns(newColumns);
        setColumns(newColumns);
    }, [isMobile, currentAccount, searchColumns, searchWords]);

    const getUnRealPrtlos = async (currentAccount, { stock } = { stock: ' ' }) => {
        const data = {
            action: '',
            bhno: currentAccount.broker_id,
            cseq: currentAccount.account,
            ctype: 'A', // 全部
            sip: getCookie('client_ip'),
            stock: stock,
            ttype: 'A',
            token: getToken(),
        };
        const modal = false;
        dispatch(getStockUnRealPrtlos(fetchStockUnRealPrtlos(data, modal)));
    };

    const submitHandler = useCallback(
        (confirm, val) => {
            getUnRealPrtlos(currentAccount, { stock: val });
            setSearchColumns(columns => {
                if (!columns.includes('stock')) {
                    columns.push('stock');
                }
                return columns;
            });
            setSearchWords(val);
            confirm();
        },
        [currentAccount],
    );

    const searchResetHandler = confirm => {
        if (searchColumns.indexOf('stock') !== -1) {
            setSearchColumns(columns => {
                const index = searchColumns.indexOf('stock');
                columns.splice(index, 1);
                return columns;
            });
            setSearchWords('');
            getUnRealPrtlos(currentAccount);
        }
        confirm();
    };

    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'stock') {
            return {
                filterDropdown: ({ confirm }) => (
                    <DropFilterSearch
                        onSubmit={submitHandler.bind(null, confirm)}
                        onReset={searchResetHandler.bind(null, confirm)}
                    />
                ),
                filterIcon: (
                    <img
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        src={filterIcon}
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
                filterIcon: (
                    <img
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        src={filterIcon}
                    />
                ),
            };
        }
    };

    return (
        <>
            <AccountTable
                scroll={{ x: 780 }}
                columns={columns}
                dataSource={data}
                pagination={{
                    total: 21,
                    showTotal: (total, range) => `${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`,
                    defaultPageSize: 10,
                    defaultCurrent: 1,
                    pageSize: 10,
                }}
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

import { useEffect, useState } from 'react';
import { Button } from 'antd';
import AccountTable from './AccountTable';
import DropfilterCheckBox from './DropfilterCheckBox';
import DropFilterSearch from './DropFilterSearch';
import theme from '../../../resources/styles/theme';
// import { AccountDropdown } from '../personalArea/accountDropdown/AccountDropdown';
// import Download from './Download';
import Control from './Control';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import filterIcon from '../../../resources/images/components/tradingAccount/ic-sort.svg';
const VipInventoryComp = () => {
    const [columns, setColumns] = useState([]);
    const isMobile = useCheckMobile();
    const [data, setData] = useState([
        {
            category: '現股',
            product: '台積電台積電台電',
            close: 6303,
            yes: 10,
            todayBuy: 5,
            todaySell: 2,
            key: 0,
        },
        {
            category: '現股',
            product: '永豐金',
            close: 12.5,
            yes: 2,
            todayBuy: 1,
            todaySell: 1,
            key: 1,
        },
        {
            category: '現股',
            product: '力積電',
            close: 110,
            yes: 2,
            todayBuy: 1,
            todaySell: 1,
            key: 2,
        },
    ]);
    const getColumnSearchProps = dataIndex => {
        if (dataIndex === 'product') {
            return {
                // sinoFilter: true,
                filterDropdown: () => <DropFilterSearch />,
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
    useEffect(() => {
        const newColumns = [
            {
                title: '類別',
                dataIndex: 'category',
                key: 'category',
                width: isMobile ? '80px' : '12%',
                fixed: 'left',
                ...getColumnSearchProps('category'),
            },
            {
                title: '商品',
                dataIndex: 'product',
                key: 'product',
                width: isMobile ? '120px' : '20%',
                fixed: 'left',
                className: isMobile ? 'normalWhiteSpace' : '',
                ...getColumnSearchProps('product'),
            },
            {
                title: '現價',
                dataIndex: 'close',
                key: 'close',
                align: 'right',
            },
            {
                title: '昨餘',
                dataIndex: 'yes',
                key: 'yes',
                align: 'right',
            },
            {
                title: '今買成',
                dataIndex: 'todayBuy',
                key: 'todayBuy',
                align: 'right',
            },
            {
                title: '今賣成',
                dataIndex: 'todaySell',
                key: 'todaySell',
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

        setColumns(newColumns);
    }, [isMobile]);
    console.log('parent render');
    return (
        <div className="vipInventory__container">
            <div className="control__container">
                <h2 className="title">庫存查詢</h2>
                <Control text={'1-15檔個股 (共49檔個股)'} />
            </div>
            <AccountTable
                scroll={{ x: 780 }}
                columns={columns}
                dataSource={data}
                pagination={{
                    total: 49,
                    showTotal: (total, range) => `${range[0]}-${range[1]} 檔個股 (共${total}檔個股)`,
                    defaultPageSize: 15,
                    defaultCurrent: 1,
                    pageSize: 15,
                }}
            />
            <style jsx>
                {`
                    .vipInventory__container {
                        padding-left: 10%;
                        padding-right: 10%;
                        padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipInventory__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipInventory__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                    }

                    .title {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                    .control__container {
                        position: relative;
                    }
                    @media (max-width: ${theme.mobileBreakPoint}px) {
                        .vipInventory__container {
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .control__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        .title {
                            font-size: 2rem;
                            font-weight: bold;
                            margin-top: -36px;
                            margin-bottom: 10px;
                        }
                    }
                `}
            </style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                }
                .ant-input {
                    border: 1px solid #e6ebf5;
                }
                /* .ant-table-filter-dropdown {
                    width: 148px;
                    height: 217px;
                    padding-top: 15px;
                } */
            `}</style>
        </div>
    );
};

export default VipInventoryComp;

import React from 'react';
import { useCheckMobile } from '../../../../../hooks/useCheckMobile';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import CustomerButton from '../../../customerSupport/CustomerButton';

const ProductFileTable = function ({ dataSource }) {
    const isMobile = useCheckMobile();

    const download = file => {
        window.open(`https://webrd.sinotrade.com.tw/files/${file}`, '_blank');
    };

    const scrollTop = () => {
        if (isMobile) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const columns = [
        {
            title: '項目',
            key: 'index',
            width: '10%',
            render(text, row, index) {
                return <p style={{ color: '#DAA360', textAlign: 'center', marginBottom: 0 }}>{index + 1}</p>;
            },
        },
        {
            title: '檔案名稱',
            dataIndex: 'displayName',
            key: 'displayName',
            width: '75%',
            // ellipsis: 'true',
        },
        {
            title: '下載',
            dataIndex: 'filename',
            key: 'title',
            width: '15%',
            render(text) {
                return (
                    <CustomerButton
                        type="primary"
                        style={{ textAlign: 'center' }}
                        onClick={() => {
                            download(text);
                        }}
                    >
                        下載
                    </CustomerButton>
                );
            },
        },
    ];

    return (
        <>
            <Table
                className="product-file-table"
                columns={columns}
                dataSource={dataSource}
                rowKey="index"
                total={dataSource?.length}
                pagination={
                    isMobile
                        ? {
                              position: ['bottomRight'],
                              defaultPageSize: 15,
                              defaultCurrent: 1,
                              pageSize: 15,
                              total: dataSource?.length,
                              showTotal: (total, range) => `${range[0]}-${range[1]}則問題（共${total}則問題）`,
                              onChange: scrollTop,
                          }
                        : false
                }
            />
            <style jsx global>
                {`
                    .product-file-table .ant-table-tbody > tr > td {
                        padding: 13px;
                        color: #0d1623;
                    }

                    .product-file-table .ant-table-cell {
                        color: #3f5372;
                        font-size: 14px;
                    }

                    .product-file-table .ant-table-cell:first-of-type {
                        text-align: center;
                    }

                    .ant-pagination-item-active {
                        border: solid 1px #c43826;
                        background: #c43826;
                    }

                    .ant-pagination-item-active:hover {
                        border: none;
                        color: white;
                    }

                    .ant-pagination-item-active > a {
                        color: white;
                    }

                    .ant-pagination-item-active:hover > a {
                        color: white;
                    }

                    .product-file-table .ant-table-pagination {
                        margin: 16px;
                    }

                    .product-file-table .ant-btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 44px;
                        height: 24px;
                    }

                    .product-file-table .ant-btn span {
                        font-size: 12px;
                    }

                    @media screen and (max-width: 450px) {
                        .product-file-table .ant-table-thead {
                            display: none;
                        }

                        .product-file-table .ant-table-cell:first-of-type {
                            visible: hidden;
                        }

                        .product-file-table .ant-pagination {
                            display: none;
                        }

                        .product-file-table .ant-table-row {
                            height: 76px;
                        }

                        .financial-product-article-tab .ant-table-cell:first-of-type {
                            opacity: 0;
                        }

                        .financial-product-article-tab .ant-table-cell {
                            left: -7vw;
                        }

                        .financial-product-article-tab .ant-table-cell {
                            left: -7vw;
                        }

                        .product-file-table > .ant-btn {
                            width: 60px !important;
                            height: 44px !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ProductFileTable;

ProductFileTable.propTypes = {
    dataSource: PropTypes.array,
};

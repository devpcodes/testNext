import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import CustomerButton from '../../../customerSupport/CustomerButton';

const ProductFileTable = function ({ dataSource }) {
    const clientWidth = useSelector(store => store.layout.winWidth);

    const download = file => {
        window.open(`https://webrd.sinotrade.com.tw/files/${file}`, '_blank');
    };

    const scrollTop = () => {
        if (clientWidth <= 450) {
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
                    clientWidth <= 450
                        ? false
                        : {
                              position: ['bottomRight'],
                              defaultPageSize: 15,
                              defaultCurrent: 1,
                              pageSize: 15,
                              total: dataSource?.length,
                              showTotal: (total, range) => `${range[0]}-${range[1]}則檔案（共${total}則檔案）`,
                              onChange: scrollTop,
                          }
                }
            />
            <div className="file-table-mobile">
                {dataSource?.length &&
                    dataSource?.map((file, idx) => (
                        <div key={idx}>
                            <p>{file.displayName}</p>
                            <CustomerButton
                                type="primary"
                                style={{ textAlign: 'center' }}
                                onClick={() => {
                                    download(file.filename);
                                }}
                            >
                                下載
                            </CustomerButton>
                        </div>
                    ))}
            </div>
            <style jsx global>
                {`
                    .file-table-mobile {
                        display: none;
                    }

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

                    .product-file-table .ant-table-thead > tr > th {
                        background-color: #f2f5fa;
                    }

                    @media screen and (max-width: 450px) {
                        .product-file-table {
                            display: none;
                        }

                        .product-file-table > .ant-btn {
                            width: 60px !important;
                            height: 44px !important;
                        }

                        .file-table-mobile {
                            display: block;
                            width: 100%;
                        }

                        .file-table-mobile > div {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            min-height: 50px;
                            padding: 12px 16px;
                            border-bottom: solid 1px #d7e0ef;
                        }

                        .file-table-mobile > div > p {
                            margin: 0;
                            font-size: 16px;
                            font-weight: normal;
                            line-height: 1.63;
                            color: #0d1623;
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

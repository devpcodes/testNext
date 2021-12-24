import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { Link } from 'next/link';
import { useSelector } from 'react-redux';
import { getCommonQuestion } from '../../../../../services/components/customerSupport/commonQuestion';
import { useRouter } from 'next/router';

const ProductQuestionTable = function ({ keywords }) {
    const router = useRouter();
    const [questionList, setQuestionList] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [totalQuestion, setTotalQuestion] = useState(null);
    const clientWidth = useSelector(store => store.layout.winWidth);

    const scrollTop = () => {
        if (clientWidth > 768) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(async () => {
        const res = await getCommonQuestion(1, 1000, null, keywords);
        setTotalQuestion(res.counts);
        if (res.dataList.length) {
            setQuestionList(res.dataList);
        }
    }, [keywords]);

    const toQuestion = questionUUID => {
        router.push(`/customer-support/question/${questionUUID}`);
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
            title: '標題',
            dataIndex: 'title',
            key: 'title',
            width: '90%',
            // mobile in no need ellipsis
            // ellipsis: 'true',
            render(text, record) {
                return (
                    <p
                        style={{ margin: '0', cursor: 'pointer' }}
                        onClick={() => {
                            toQuestion(record.uuid);
                        }}
                    >
                        {text}
                    </p>
                    // the code down below will lead a crush.
                    // <Link href={`/newweb/customer-support/question/${record.uuid}`}>
                    //     <a>{text}</a>
                    // </Link>
                );
            },
        },
    ];

    return (
        <>
            <Table
                className="product-question-table"
                columns={columns}
                dataSource={questionList}
                rowKey="id"
                total={totalQuestion}
                pagination={
                    clientWidth > 450
                        ? {
                              position: ['bottomRight'],
                              defaultPageSize: 15,
                              defaultCurrent: 1,
                              pageSize: 15,
                              total: questionList.length,
                              showTotal: (total, range) => `${range[0]}-${range[1]}則問題（共${total}則問題）`,
                              onChange: scrollTop,
                          }
                        : false
                }
            />
            <style jsx global>
                {`
                    .product-question-table .ant-table-tbody > tr > td {
                        padding: 13px;
                        color: #0d1623;
                    }

                    .product-question-table .ant-table-cell {
                        color: #3f5372;
                        font-size: 14px;
                    }

                    .product-question-table .ant-table-cell:first-of-type {
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

                    .product-question-table .ant-table-pagination {
                        margin: 16px;
                    }

                    @media screen and (max-width: 450px) {
                        .product-question-table .ant-table-thead {
                            display: none;
                        }

                        .product-question-table .ant-table-cell:first-of-type {
                            visible: hidden;
                        }

                        .product-question-table .ant-pagination {
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ProductQuestionTable;

ProductQuestionTable.propTypes = {
    keywords: PropTypes.string,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider } from 'antd';
import { Link } from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { getCommonQuestion } from '../../../../../services/components/customerSupport/commonQuestion';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import noDataImg from '../../../../../resources/images/components/productQuestion/empty.png';
import { setGoBackPath } from '../../../../../store/general/action';

const ProductQuestionTable = function ({ keywords }) {
    const router = useRouter();
    const [questionList, setQuestionList] = useState([]);
    const [totalQuestion, setTotalQuestion] = useState(null);
    const [mobileCurrentPage, setMobileCurrentPage] = useState(1);
    const [mobileQuestionList, setMobileQuestionList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const clientWidth = useSelector(store => store.layout.winWidth);
    const dispatch = useDispatch();
    const scrollTop = () => {
        if (clientWidth <= 450) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    useEffect(async () => {
        console.log('-------keywords', keywords);
        if (keywords) {
            const res = await getCommonQuestion(null, keywords, 1, 1000, null);
            setTotalQuestion(res.counts);
            setTotalPages(res.counts / 2);
            if (res.dataList.length) {
                setQuestionList(res.dataList);
            }
        }
    }, [keywords]);

    useEffect(async () => {
        // for mobile
        const res = await getCommonQuestion(null, keywords, mobileCurrentPage, 2, null);
        if (res.dataList.length) {
            setMobileQuestionList(res.dataList);
        }
    }, []);

    const mobileNextPage = async () => {
        setIsLoading(true);
        setMobileCurrentPage(mobileCurrentPage + 1);
        const res = await getCommonQuestion(null, keywords, mobileCurrentPage + 1, 2, null);
        if (res.dataList.length) {
            setMobileQuestionList(oldData => [...oldData, ...res.dataList]);
            setIsLoading(false);
        }
    };

    const toQuestion = questionUUID => {
        let dynmaicPath = '';
        dynmaicPath = router.pathname.split('[');
        if (dynmaicPath.length > 1) {
            dynmaicPath = dynmaicPath[1].substring(0, dynmaicPath[1].length - 1);
        } else {
            dynmaicPath = '';
        }
        if (router.query[dynmaicPath]) {
            dispatch(setGoBackPath(`${router.asPath}`));
        } else {
            dispatch(setGoBackPath(`${router.pathname}${window.location.search}`));
        }
        router.push(`/customer-support/question/${questionUUID}`);
    };

    const columns = [
        {
            title: '??????',
            key: 'index',
            width: '10%',
            render(text, row, index) {
                return <p style={{ color: '#DAA360', textAlign: 'center', marginBottom: 0 }}>{index + 1}</p>;
            },
        },
        {
            title: '??????',
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
                );
            },
        },
    ];

    const customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <img src={noDataImg}></img>
            <p style={{ color: '#6c7b94', marginTop: '12px', fontSize: '16px', fontWeight: 'bold' }}>{'????????????'}</p>
        </div>
    );

    return (
        <>
            <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <Table
                    className="product-question-table"
                    columns={columns}
                    dataSource={questionList}
                    rowKey="id"
                    total={totalQuestion}
                    pagination={
                        clientWidth <= 450
                            ? null
                            : {
                                  position: ['bottomRight'],
                                  defaultPageSize: 15,
                                  defaultCurrent: 1,
                                  pageSize: 15,
                                  showSizeChanger: false,
                                  total: questionList.length,
                                  showTotal: (total, range) => `${range[0]}-${range[1]}???????????????${total}????????????`,
                                  onChange: scrollTop,
                              }
                    }
                />
            </ConfigProvider>
            <InfiniteScroll dataLength={totalQuestion} next={mobileNextPage} hasMore={mobileCurrentPage < totalPages}>
                <div className="question-table-mobile">
                    {mobileQuestionList.length
                        ? mobileQuestionList.map((question, idx) => (
                              <div key={idx} onClick={() => toQuestion(question.uuid)}>
                                  <p>{question.title}</p>
                              </div>
                          ))
                        : null}
                </div>
            </InfiniteScroll>
            {isLoading ? (
                <div className="loading">
                    <LoadingOutlined className="loading_icon" />
                    ???????????????
                </div>
            ) : null}
            <style jsx>
                {`
                    @media screen and (max-width: 450px) {
                        .question-table-mobile {
                            display: block;
                            // width: 100%;
                        }

                        .question-table-mobile > div {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            min-height: 50px;
                            padding: 12px 16px;
                            border-bottom: solid 1px #d7e0ef;
                        }

                        .question-table-mobile > div > p {
                            margin: 0;
                            font-size: 16px;
                            font-weight: normal;
                            line-height: 1.63;
                            color: #0d1623;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .product-question-table .ant-table-tbody > tr > td {
                        padding: 13px;
                        color: #0d1623;
                    }

                    .product-question-table .ant-table-thead > tr > th {
                        background: #f2f5fa;
                    }

                    .product-question-table .ant-table-cell {
                        color: #3f5372;
                        font-size: 14px;
                    }

                    .ant-table-container table > thead > tr:first-child th:first-child {
                        white-space: nowrap;
                    }

                    .product-question-table .ant-table-tbody .ant-table-cell p:hover {
                        color: #daa360;
                    }

                    .product-question-table .ant-table-tbody > tr.ant-table-row:hover > td {
                        background: rgba(230, 235, 245, 0.3);
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

                    .loading {
                        display: none;
                    }

                    .question-table-mobile {
                        display: none;
                    }
                    .product-question-table .ant-table-cell:first-of-type {
                        text-align: center;
                    }

                    @media screen and (max-width: 450px) {
                        .product-question-table {
                            display: none;
                        }

                        .loading_icon {
                            color: red;
                            font-size: 20px;
                            margin-right: 8px;
                        }

                        .loading {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            // font-family: PingFangTC;
                            font-size: 14px;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: normal;
                            letter-spacing: normal;
                            color: #3f5372;
                            padding: 20px 0 20px;
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

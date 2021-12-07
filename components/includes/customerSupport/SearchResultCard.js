import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Layout, Card } from 'antd';
import { Pagination } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import noDataImg from '../../../resources/images/pages/customer_support/img-default.svg';

const CustomerSupport = ({ keyword, searchResultData, fromCount, toCount, totalQuestion, page, changePage }) => {
    const { Content } = Layout;
    const router = useRouter();
    const [data, setData] = useState(searchResultData);
    // const [questionAmount, setQuestionAmount] = useState(totalQuestion)

    const toQuestionPage = questionUUID => {
        router.push({
            pathname: `/question/${questionUUID}`,
        });
    };

    useEffect(() => {
        setData(searchResultData);
    }, [searchResultData]);

    const onPageChange = page => {
        changePage(page);
    };

    return (
        <Content className="layoutContent">
            {data.length ? (
                data.map(item => (
                    <Card className="card" key={item.uuid} onClick={() => toQuestionPage(item.uuid)}>
                        <Highlighter
                            unhighlightClassName="questionTitleUnhighlight"
                            highlightClassName="questionTitleHighlight"
                            searchWords={[keyword]}
                            autoEscape={true}
                            textToHighlight={item.title}
                        />
                        <span className="questionContent">{parse(`${item.contentPreview}`)}</span>
                        <div className="secondThirdCategories">
                            <span>{item.category2nd?.categoryName ? item.category2nd?.categoryName : ''}</span>
                            {item.category3rd?.categoryName ? (
                                <div>
                                    <RightOutlined className="rightIcon" />{' '}
                                    <span>{item.category3rd?.categoryName}</span>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </Card>
                ))
            ) : (
                <div className="noResult">
                    <img src={noDataImg} alt="搜尋無結果" />
                    搜尋無結果
                </div>
            )}
            <div className="countsAndPager">
                <span>
                    {fromCount}-{toCount} 則問題 ( 共 {totalQuestion} 則問題 )
                </span>
                <Pagination
                    className="pager"
                    defaultCurrent={1}
                    current={page}
                    pageSize={15}
                    total={totalQuestion}
                    onChange={onPageChange}
                />
            </div>
            <style jsx>{`
                .questionContent {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    font-size: 16px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .secondThirdCategories {
                    color: #3f5372;
                    font-size: 14px;
                }

                .secondThirdCategories > div {
                    display: inline-block;
                }
            `}</style>
            <style jsx global>{`
                .layoutContent {
                    width: 71vw;
                    margin: auto;
                }

                @media screen and (max-width: 768px) {
                    .layoutContent {
                        width: 98vw;
                        margin-top: 0px;
                    }

                    .breadcrumb {
                        display: none;
                    }
                }

                .scrollDiv {
                    overflow: auto;
                    height: fit-content;
                }

                .card {
                    margin-top: -1px;
                    border: 1px solid #d7e0ef;
                    cursor: pointer;
                }

                @media screen and (max-width: 768px) {
                    .card {
                        width: 100%;
                        margin-top: 0;
                    }
                }

                .questionTitleUnhighlight {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    /* display: -webkit-box; */
                    font-size: 20px;
                    font-weight: 500;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }

                .questionTitleHighlight {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 0;
                    color: #daa360;
                    background-color: transparent;
                    /* display: -webkit-box; */
                    font-size: 20px;
                    font-weight: 500;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }

                .rightIcon {
                    margin-left: 3px;
                    font-size: 12px;
                }

                .countsAndPager {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: 100%;
                    margin-top: 24px;
                    margin-bottom: 24px;
                }

                @media screen and (max-width: 768px) {
                    .countsAndPager {
                        display: none;
                    }
                }

                .countsAndPager > span {
                    margin-right: 20px;
                    color: #3f5372;
                    font-size: 14px;
                    font-weight: normal;
                }

                @media screen and (max-width: 768px) {
                    .card {
                        width: 100%;
                        margin-top: 0;
                    }
                }

                .loadingArea {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .loadingIcon {
                    font-size: 30px;
                    margin-right: 15px;
                }

                .loadingArea > span {
                    color: #3f5372;
                }

                .noMore {
                    display: flex;
                    justify-content: center;
                    margin: 16px 0;
                }

                .noResult {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 30vh;
                    background-color: #fff;
                    border: 1px solid #d7e0ef;
                }

                .noResult > img {
                    width: 140px;
                    height: ;
                    :140px ;
                    margin-bottom: 16px;
                }
            `}</style>
        </Content>
    );
};

export default CustomerSupport;

CustomerSupport.propTypes = {
    keyword: PropTypes.string,
    searchResultData: PropTypes.array,
    fromCount: PropTypes.number,
    toCount: PropTypes.number,
    totalQuestion: PropTypes.number,
    totalPage: PropTypes.number,
    page: PropTypes.number,
    changePage: PropTypes.func,
};

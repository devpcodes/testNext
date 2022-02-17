import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Layout, Card } from 'antd';
import { Pagination } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import noDataImg from '../../../../../resources/images/pages/customer_support/img-default.svg';

const SearchResultCard = ({ keyword, searchResultData, totalQuestion, currentPage, changePage }) => {
    const { Content } = Layout;
    const router = useRouter();
    const [data, setData] = useState(searchResultData);
    const toQuestionPage = questionUUID => {
        router.push({
            pathname: `/customer-support/question/${questionUUID}`,
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
                            className="ellipsis"
                            unhighlightClassName="questionTitleUnhighlight"
                            highlightClassName="questionTitleHighlight"
                            searchWords={[keyword]}
                            autoEscape={true}
                            textToHighlight={item.title}
                        />
                        <Highlighter
                            className="searchResultContent"
                            unhighlightClassName="questionContentUnhighlight"
                            highlightClassName="questionContentHighlight"
                            searchWords={[keyword]}
                            autoEscape={false}
                            textToHighlight={parse(`${item.keywordContent}`)}
                        />
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
                    <p>搜尋無結果</p>
                </div>
            )}
            {data.length ? (
                <div className="countsAndPager">
                    <Pagination
                        className="pager"
                        current={currentPage}
                        pageSize={15}
                        total={totalQuestion}
                        onChange={onPageChange}
                        showTotal={(total, range) => `${range[0]}-${range[1]}則問題 (共${totalQuestion}則問題)`}
                    />
                </div>
            ) : null}
            <style jsx>{`
                /* .questionContent {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    font-size: 16px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    color: #0d1623;
                } */

                .secondThirdCategories {
                    color: #3f5372;
                    font-size: 14px;
                }

                .secondThirdCategories > div {
                    display: inline-block;
                }

                @media screen and (max-width: 450px) {
                    .noResult {
                        border: none;
                        min-height: 0;
                        height: 500px;
                    }

                    .noResult > img {
                        width: 84px;
                        height: 84px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .layoutContent {
                    width: 71vw;
                    margin: 0 auto;
                }

                @media screen and (max-width: 768px) {
                    .layoutContent {
                        width: 91vw;
                        margin: 0 auto;
                        margin-bottom: 68px;
                    }
                }

                @media screen and (max-width: 450px) {
                    .layoutContent {
                        min-width: 98vw;
                        width: 100%;
                        margin-top: -1px;
                        margin-bottom: 0;
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
                    .card:first-of-type {
                        margin-top: 0px;
                    }
                }

                @media screen and (max-width: 450px) {
                    .card .ant-card-body {
                        margin-top: -1px;
                        padding: 12px 16px;
                    }
                }

                .ellipsis {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    /* display: -webkit-box; */
                    font-size: 20px;
                    font-weight: 500;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    display: block;
                }

                .questionTitleUnhighlight {
                    margin-bottom: 8px;
                }

                .questionContentUnhighlight {
                    font-size: 16px;
                    color: #0d1623;
                }

                .questionTitleHighlight {
                    padding: 0;
                    color: #daa360;
                    background-color: transparent;
                }

                .searchResultContent {
                    margin-top: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #0d1623;
                    display: -webkit-box;
                    font-size: 16px;
                    font-weight: 500;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .questionContentHighlight {
                    display: inline-block;
                    padding: 0;
                    color: #daa360;
                    font-size: 16px;
                    font-weight: 500;
                    background-color: transparent;
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

                @media screen and (max-width: 450px) {
                    .card {
                        width: 100%;
                        margin-top: -1px;
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
                    min-height: 30vh;
                    height: auto;
                    margin-bottom: 50px;
                    background-color: #fff;
                    border: 0.5px solid #d7e0ef;
                }

                .noResult p {
                    font-family: PingFangTC;
                    font-size: 16px;
                    font-weight: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }

                @media screen and (max-width: 450px) {
                    .noResult {
                        height: 100%;
                        border: none;
                        margin-bottom: 0;
                    }

                    .ellipsis {
                        height: auto;
                        max-height: 65px;
                    }
                }

                .noResult > img {
                    width: 140px;
                    height: 140px;
                    margin-bottom: 16px;
                }

                .noResult > p {
                    font-size: 16px;
                    margin-bottom: 30px;
                }
            `}</style>
        </Content>
    );
};

export default SearchResultCard;

SearchResultCard.propTypes = {
    keyword: PropTypes.string,
    searchResultData: PropTypes.array,
    fromCount: PropTypes.number,
    toCount: PropTypes.number,
    totalQuestion: PropTypes.number,
    totalPage: PropTypes.number,
    page: PropTypes.number,
    changePage: PropTypes.func,
};

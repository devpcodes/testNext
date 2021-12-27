import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'antd';
import { wrapper } from '../../../../../store/store';
import { setNavItems } from '../../../../../store/components/layouts/action';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import QuestionSearchHeader from '../../index/element/QuestionSearchHeader';
import SearchResultCard from '../element/SearchResultCard';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import { getCommonQuestions } from '../../../../../services/components/customerSupport/customerSupportService';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const SearchResultComponent = () => {
    const router = useRouter();
    const keyword = router.query.keyword;
    const clientWidth = useSelector(store => store.layout.winWidth);
    const [page, setPage] = useState(1);
    const [newSearchKeyword, setNewSearchKeyword] = useState(keyword);
    const [searchResultData, setSearchResultData] = useState([]);
    const [fromCount, setFromCount] = useState(0);
    const [toCount, setToCount] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [totalQuestion, setTotalQuestion] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(null);

    const onInput = e => {
        setNewSearchKeyword(e.target.value);
    };

    const searchNewKeyword = () => {
        // 若輸入空值回常見問題首頁
        if (!newSearchKeyword) {
            router.push({
                pathname: '/customer-support',
            });
        } else if (newSearchKeyword) {
            setSearchResultData([]);
            setPage(1);
            router.push({
                pathname: '/customer-support/search-result',
                query: { keyword: newSearchKeyword },
            });
        }
    };

    const onPageChange = async page => {
        if (clientWidth > 768) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
        setPage(page);
        const params = {
            keywords: keyword,
            page,
            pageSize: 15,
        };
        const data = await getCommonQuestions(params);
        setSearchResultData(data.dataList);
        if (totalQuestion.counts <= 15) {
            setFromCount(1);
            setToCount(totalQuestion);
            // 有2頁以上 第2頁 = 16~30
        } else if (totalQuestion >= 15) {
            setFromCount(15 * (page - 1) + 1);
            setToCount(page * 15);
        }
    };

    const loadMoreData = async () => {
        // setIsLoading(true);
        setPage(page + 1);
        // setIsLoading(false);
    };

    useEffect(async () => {
        const params = {
            keywords: keyword,
            page,
            pageSize: 15,
        };
        const data = await getCommonQuestions(params);
        if (totalPage && page >= totalPage) {
            setHasMore(false);
            console.log('no more.');
        } else if (data.dataList && data.dataList.length) {
            setTotalQuestion(data.counts);
            setTotalPage(Math.round(data.counts / 15));
            // 把type === editor的content獨立出來
            data.dataList.forEach(ele => {
                try {
                    ele.content = JSON.parse(ele.content);
                    if (typeof ele.content === 'object') {
                        let index = ele.content.findIndex(e => e.type === 'editor');
                        if (index >= 0) {
                            ele.contentPreview = ele.content[index].content.content;
                        }
                    }
                    ele.content = JSON.stringify(ele.content);
                } catch (error) {
                    // console.log('no editor content');
                }
            });
            if (clientWidth > 768 && !searchResultData.length) {
                setSearchResultData(data.dataList);
            } else if (clientWidth <= 768) {
                if (searchResultData.length) {
                    setSearchResultData([...searchResultData, ...data.dataList]);
                } else {
                    setSearchResultData(data.dataList);
                }
            }
            // only第一頁 1~總問題數
            if (data.counts <= 15) {
                setFromCount(1);
                setToCount(data.counts);
                // 有2頁以上 第2頁 = 16~30
            } else if (data.counts >= 15) {
                setFromCount(15 * (page - 1) + 1);
                setToCount(page * 15);
            }
            // no data
        } else {
            setHasMore(false);
            setPage(1);
            setTotalQuestion(0);
            setFromCount(0);
            setToCount(0);
        }
    }, [keyword, page]);

    return (
        <Layout>
            <QuestionSearchHeader defaultValue={keyword} onInput={onInput} onPressEnter={searchNewKeyword} />
            <div className="breadcrumbWrapper">
                <Breadcrumb />
            </div>
            {clientWidth > 768 && (
                <SearchResultCard
                    keyword={keyword}
                    searchResultData={searchResultData}
                    fromCount={fromCount}
                    toCount={toCount}
                    totalQuestion={totalQuestion}
                    page={page}
                    changePage={onPageChange}
                />
            )}
            {clientWidth <= 768 && searchResultData && (
                <InfiniteScroll
                    dataLength={searchResultData.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className="loadingArea">
                            <LoadingOutlined className="loadingIcon" />
                            載入更多中
                        </div>
                    }
                >
                    <SearchResultCard keyword={keyword} searchResultData={searchResultData} />
                </InfiniteScroll>
            )}
            <style jsx>{`
                .breadcrumbWrapper {
                    width: 71vw;
                    margin: auto;
                }
            `}</style>
            <style jsx global>
                {`
                    @media screen and (max-width: 768px) {
                        .layoutContent {
                            width: 98vw;
                            margin-top: 0px;
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
                        color: #0d1623;
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
                `}
            </style>
        </Layout>
    );
};

export default SearchResultComponent;

SearchResultComponent.propTypes = {
    searchKeyword: PropTypes.string,
};

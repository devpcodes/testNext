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
    const [currentPageWeb, setCurrentPageWeb] = useState(1);
    const [currentPageMobile, setCurrentPageMobile] = useState(1);
    const [newSearchKeyword, setNewSearchKeyword] = useState(keyword);
    const [searchResultDataWeb, setSearchResultDataWeb] = useState([]);
    const [searchResultDataMobile, setSearchResultDataMobile] = useState([]);
    const [totalQuestion, setTotalQuestion] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onInput = e => {
        setNewSearchKeyword(e.target.value);
    };

    const searchNewKeyword = () => {
        if (!newSearchKeyword) {
            router.push({
                pathname: '/customer-support',
            });
        } else if (newSearchKeyword) {
            setSearchResultDataWeb([]);
            setSearchResultDataMobile([]);
            setCurrentPageWeb(1);
            setCurrentPageMobile(1);
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
        setCurrentPageWeb(page);
        const params = {
            keywords: keyword,
            page,
            pageSize: 15,
        };
        const data = await getCommonQuestions(params);
        if (data?.dataList?.length) {
            setSearchResultDataWeb(data.dataList);
        }
    };

    const loadMoreData = async () => {
        setIsLoading(true);
        const params = {
            keywords: keyword,
            page: currentPageMobile + 1,
            pageSize: 15,
        };
        setCurrentPageMobile(old => old + 1);
        const data = await getCommonQuestions(params);
        if (data?.dataList?.length) {
            setSearchResultDataMobile(oldData => [...oldData, ...data.dataList]);
            setIsLoading(false);
        }
    };

    useEffect(async () => {
        if (keyword) {
            const params = {
                keywords: keyword,
                page: 1,
                pageSize: 15,
            };
            const data = await getCommonQuestions(params);
            if (data.dataList?.length) {
                setCurrentPageWeb(1);
                setCurrentPageMobile(1);
                setTotalQuestion(data.counts);
                const allPage = Math.ceil(data.counts / 15);
                setTotalPage(allPage);
                setSearchResultDataWeb(data.dataList);
                setSearchResultDataMobile(data.dataList);
            }
        }
    }, [keyword]);

    return (
        <Layout>
            <QuestionSearchHeader defaultValue={keyword} onInput={onInput} onPressEnter={searchNewKeyword} />
            <div className="breadcrumbWrapper">
                <Breadcrumb />
            </div>
            {clientWidth > 768 && (
                <SearchResultCard
                    keyword={keyword}
                    searchResultData={searchResultDataWeb}
                    currentPage={currentPageWeb}
                    totalQuestion={totalQuestion}
                    changePage={onPageChange}
                />
            )}
            {clientWidth <= 768 && searchResultDataMobile && (
                <InfiniteScroll dataLength={totalQuestion} next={loadMoreData} hasMore={currentPageMobile < totalPage}>
                    <SearchResultCard
                        keyword={keyword}
                        searchResultData={searchResultDataMobile}
                        currentPage={currentPageMobile}
                    />
                </InfiniteScroll>
            )}

            {isLoading ? (
                <div className="loadingArea">
                    <LoadingOutlined className="loadingIcon" />
                    載入更多中
                </div>
            ) : null}

            <style jsx global>
                {`
                    .breadcrumbWrapper {
                        width: 71vw;
                        margin: 14px auto 0 auto;
                    }

                    @media screen and (max-width: 768px) {
                        .breadcrumbWrapper {
                            width: 91vw;
                            margin: auto;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .breadcrumbWrapper {
                            display: none;
                        }

                        .layoutContent {
                            width: 100vw;
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

                    .questionTitleUnhighlight {
                        color: #0d1623;
                        font-weight: 700;
                    }

                    .questionTitleHighlight {
                        padding: 0;
                        color: #daa360;
                        background-color: transparent;
                    }

                    .questionContent {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        font-size: 16px;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    @media screen and (max-width: 450px) {
                        .questionContent {
                            margin-bottom: 5px;
                        }
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

                    @media screen and (max-width: 450px) {
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
                        margin-bottom: 16px;
                    }

                    .ant-pagination-item a {
                        color: #0d1623;
                    }

                    .ant-pagination-item-active:focus,
                    .ant-pagination-item-active {
                        border: solid 1px #c43826;
                        background: #c43826;
                    }

                    .ant-pagination-item-active:focus a {
                        color: white;
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

                    .ant-pagination-prev:hover .ant-pagination-item-link,
                    .ant-pagination-next:hover .ant-pagination-item-link,
                    .ant-pagination-item:hover {
                        border-color: #d9d9d9;
                    }

                    .ant-pagination-prev:hover .ant-pagination-item-link,
                    .ant-pagination-next:hover .ant-pagination-item-link,
                    .ant-pagination-item a:hover {
                        color: rgba(0, 0, 0, 0.65);
                    }

                    .infinite-scroll-component__outerdiv .infinite-scroll-component {
                        overflow: hidden !important;
                    }

                    @media screen and (max-width: 450px) {
                        .secondThirdCategories {
                            margin-top: 4px;
                        }
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

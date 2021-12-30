import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PageHead } from '../../../PageHead';
import { Layout } from 'antd';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import {
    getCommonQuestion,
    getCommonQuestionSubcategories,
} from '../../../../../services/components/customerSupport/commonQuestion';
import { getCommonQuestionCategories } from '../../../../../services/components/customerSupport/customerSupportService';

import SearchInput from '../../SearchInput';
import QuestionTab from '../element/QuestionTab';
import QuestionTable from '../element/QuestionTable';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const QuestionListComponent = function () {
    const router = useRouter();
    const key = router.query.key;
    const clientWidth = useSelector(store => store.layout.winWidth);

    const [categories, setCategories] = useState();
    const [dataSource, setDataSource] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [activeKey, setActiveKey] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalCounts, setTotalCounts] = useState();
    const [hasMore, setHasMore] = useState();
    const [sub2ndCategories, setSub2ndCategories] = useState();

    useEffect(async () => {
        const data = await getCommonQuestionCategories();
        setCategories(data);
        await setActiveKey(key || data[0].id.toString());
        getQuestionList(key || data[0].id.toString());
    }, []);

    const getQuestionList = async (newKey, newPage) => {
        const data = await getCommonQuestion(newPage || currentPage, 15, newKey || activeKey);
        setDataSource(data);
        setDataList(data.dataList);
        setTotalCounts(data.counts);
        if (data?.dataList?.length < 15) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    };

    useEffect(async () => {
        const data = await getCommonQuestionSubcategories(activeKey);

        if (data !== null) {
            const sub2nd = data.category2nd.map(t => ({ text: t.categoryName, value: t.categoryName }));
            setSub2ndCategories(sub2nd);
        } else {
            setSub2ndCategories(null);
        }
    }, [activeKey]);

    const onSearch = searchKeyword => {
        router.push({
            pathname: '/customer-support/search-result',
            query: { keyword: searchKeyword },
        });
    };

    const onPageChange = page => {
        setPage(page);
        getQuestionList(null, page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const onTabsChange = newKey => {
        setDataSource({});
        setActiveKey(newKey);
        getQuestionList(newKey);
        setPage(1);
    };

    const toQuestion = uuid => {
        router.push(`/customer-support/question/${uuid}`);
    };

    const loadMoreFn = async () => {
        if (clientWidth <= 450) {
            console.log('isMobile');
            setIsLoading(true);
            setPage(currentPage + 1);
            const data = await getCommonQuestion(currentPage + 1, 15, activeKey);
            setDataSource(data);
            setDataList(oldData => [...oldData, ...data.dataList]);
            setIsLoading(false);
        }
    };

    return (
        <>
            <PageHead title={'永豐金理財網'} />
            <Layout className="antLayout">
                <div className="questionIndexWrapper">
                    <Breadcrumb />
                    <div className="title_group">
                        <h1>常見問題</h1>
                        <div className="question-table-input-search">
                            <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                        </div>
                    </div>

                    {activeKey && (
                        <QuestionTab
                            className="question-tab-web"
                            categories={categories}
                            defaultActiveKey={categories && categories[0].id.toString()}
                            activeKey={activeKey}
                            onChange={onTabsChange}
                        >
                            <QuestionTable
                                className="question-list-web"
                                dataSource={dataSource}
                                sub2ndCategories={sub2ndCategories}
                                onPageChange={onPageChange}
                                totalCounts={totalCounts}
                            />
                        </QuestionTab>
                    )}

                    <QuestionTab
                        className="question-tab-mobile"
                        categories={categories}
                        defaultActiveKey={categories && categories[0].id}
                        activeKey={activeKey}
                        onChange={onTabsChange}
                    >
                        {totalCounts && (
                            <InfiniteScroll dataLength={totalCounts} next={loadMoreFn} hasMore={hasMore}>
                                {dataList?.map(data => {
                                    return (
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                                        <div
                                            key={data?.uuid}
                                            className="questionIndexCard"
                                            onClick={() => {
                                                toQuestion(data?.uuid);
                                            }}
                                        >
                                            <h3>{data?.title}</h3>
                                            <div className="breadcrumb_group">
                                                {data?.category2nd?.categoryName}
                                                {'>'} {data?.category3rd?.categoryName}
                                            </div>
                                        </div>
                                    );
                                })}
                            </InfiniteScroll>
                        )}
                        {isLoading ? (
                            <div className="loading">
                                <LoadingOutlined className="loading_icon" />
                                載入更多中
                            </div>
                        ) : null}
                    </QuestionTab>
                </div>

                {/* <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}`}
                    title="永豐金證券"
                    iHeight={isMobile ? 7680 : 1900}
                /> */}
                <style jsx>{`
                    .questionIndexWrapper > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list {
                        background-color: blueviolet !important;
                    }

                    .countsNPage {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        margin-top: 20px;
                    }

                    .countsNPage > span {
                        margin-right: 20px;
                        font-family: PingFangTC;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: 0.35px;
                        text-align: right;
                        color: #3f5372;
                    }
                `}</style>

                <style jsx global>
                    {`
                        .antLayout {
                            display: flex;
                            align-items: center;
                            min-height: 100vh;
                            padding: 31px 0;
                            background-color: #f9fbff;
                        }

                        .questionIndexWrapper {
                            width: 73vw;
                            max-width: 1172px;
                        }

                        .questionIndexWrapper .title_group > .question-table-input-search {
                            width: 348px;
                        }

                        .questionIndexWrapper .title_group {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 23px;
                            height: initial;
                        }

                        .questionIndexWrapper .title_group > h1 {
                            text-align: left;
                            margin-bottom: 0;
                            font-size: 23px;
                            font-weight: 600;
                        }

                        .question-tab-mobile {
                            display: none;
                        }

                        .loading {
                            display: none;
                        }

                        .question-tab-web .ant-table-content .ant-table-tbody .ant-table-cell:first-of-type {
                            color: #daa360;
                            text-align: center;
                        }

                        .ant-table-content .ant-table-tbody .ant-table-cell div {
                            font-weight: 500;
                        }

                        @media screen and (max-width: 768px) {
                            .questionIndexWrapper {
                                width: 90vw;
                            }

                            .questionIndexWrapper .question-tab {
                                margin-top: 17px;
                            }

                            .antLayout {
                                padding: 20px 0 0;
                            }

                            .questionIndexWrapper .title_group > .question-table-input-search {
                                width: auto;
                            }

                            .question-tab-web .ant-table-thead {
                                height: 47px;
                            }

                            .ant-table .ant-table {
                                margin-top: -1px;
                            }

                            .question-tab-web .ant-table-content {
                                border: 1px solid #d7e0ef;
                            }

                            .questionIndexCard {
                                width: 100%;
                                max-height: 100px;
                                padding: 12px;
                                background-color: #fff;
                                border-bottom: solid 1px #d7e0ef;
                            }

                            .questionIndexCard > h3 {
                                font-size: 16px;
                                font-weight: normal;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: 1.63;
                                letter-spacing: normal;
                                color: #0d1623;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                            }

                            .breadcrumb_group {
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: normal;
                                letter-spacing: 0.35px;
                                color: #3f5372;
                            }

                            .loading_icon {
                                color: red;
                                font-size: 20px;
                                margin-right: 8px;
                            }

                            .loading {
                                display: unset;
                                text-align: center;
                                font-family: PingFangTC;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                font-style: normal;
                                line-height: normal;
                                letter-spacing: normal;
                                color: #3f5372;
                                padding: 20px 0 20px;
                            }

                            .question-tab-web .ant-pagination {
                                display: flex;
                                justify-content: flex-end;
                            }

                            .question-tab-web .sino__table .ant-pagination-total-text {
                                margin-top: 0;
                                margin-right: 10px;
                            }
                        }

                        // ******** pagination

                        .question-list-pagination .ant-pagination-item-active {
                            border: solid 1px #c43826;
                            background: #c43826;
                        }

                        .question-list-pagination .ant-pagination-item-active:hover {
                            border: none;
                            color: white;
                        }

                        .question-list-pagination .ant-pagination-item-active > a {
                            color: white;
                        }

                        .question-list-pagination .ant-pagination-item-active:hover > a {
                            color: white;
                        }

                        // ******** search

                        .SearchInput_question-table-input-search__3QSct
                            > .ant-input-wrapper
                            > .ant-input-search
                            > .ant-input::placeholder {
                            font-family: PingFangSC !important;
                            font-size: 16px !important;
                            letter-spacing: 0.4px !important;
                            color: #3f5372 !important;
                        }

                        .question-table-input-search .ant-input-group-addon {
                            width: 80px !important;
                        }

                        .question-table-input-search .ant-input-search-button {
                            width: inherit;
                            background-color: #c43826 !important;
                            border-color: #c43826 !important;
                            font-size: 16px !important;
                            font-weight: normal !important;
                            font-stretch: normal !important;
                            font-style: normal !important;
                            letter-spacing: 0.4px !important;
                            text-align: center !important;
                            color: #fff !important;
                        }

                        .question-table-input-search .ant-input-search-button:hover {
                            background-color: #ea6554 !important;
                            border-color: #ea6554 !important;
                        }

                        // search-input hover border color

                        .question-table-input-search .ant-input-search:hover,
                        .question-table-input-search .ant-input-search:focus {
                            border-color: #d7e0ef !important;
                        }

                        // ******** tabs

                        .ant-tabs-top .ant-tabs-nav {
                            margin: 0;
                            padding: 2px 45px 0;
                            border: 1px solid #d7e0ef;
                            background-color: #fff;
                        }

                        .ant-tabs-tab {
                            font-family: PingFangTC;
                            font-size: 16px !important;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: 0.4px;
                            text-align: center;
                            color: #0d1623 !important;
                        }

                        .ant-tabs-tab-active > .ant-tabs-tab-btn {
                            color: #daa360 !important;
                        }

                        .ant-tabs-tab-btn:active,
                        .ant-tabs-tab-btn:focus,
                        .ant-tabs-tab-remove:active,
                        .ant-tabs-tab-remove:focus {
                            color: #daa360 !important;
                        }

                        .ant-tabs-ink-bar {
                            background: #daa360 !important;
                            height: 5px !important;
                        }

                        @media screen and (max-width: 1024) {
                            .questionIndexWrapper .site-breadcrumb {
                                width: 100%;
                            }
                        }

                        @media screen and (max-width: 768px) {
                            .questionIndexWrapper .site-breadcrumb {
                                width: 100%;
                            }

                            .ant-tabs-mobile {
                                width: 100vw;
                            }

                            .ant-tabs-tab {
                                margin: 0 16px;
                            }

                            .ant-tabs-ink-bar {
                                margin-left: -1px;
                            }

                            .ant-tabs-top .ant-tabs-nav {
                                padding: 0 0 0 20px;
                            }
                        }
                        @media screen and (max-width: 450px) {
                            .ant-tabs-top .ant-tabs-nav {
                                padding: 0;
                            }
                        }

                        @media screen and (max-width: 450px) {
                            .breadcrumb {
                                display: none;
                            }

                            .questionIndexWrapper {
                                width: 100%;
                            }

                            .questionIndexWrapper .title_group {
                                flex-direction: column;
                                align-items: flex-start;
                            }

                            .questionIndexWrapper .title_group > h1 {
                                text-align: left;
                                margin-left: 13px;
                                margin-bottom: 12px;
                                font-size: 20px;
                            }

                            .questionIndexWrapper .title_group > .question-table-input-search {
                                width: 90vw;
                                margin: auto;
                            }

                            .question-tab-web {
                                display: none;
                            }

                            .question-tab-mobile {
                                display: flex;
                                width: 100vw;
                            }

                            .questionIndexWrapper .title_group {
                                flex-direction: column;
                                align-items: flex-start;
                            }

                            .questionIndexWrapper .title_group > h1 {
                                text-align: left;
                                margin-left: 13px;
                                margin-bottom: 12px;
                                font-size: 20px;
                            }

                            .questionIndexWrapper .title_group > .question-table-input-search {
                                width: 90vw;
                                margin: auto;
                            }

                            .question-tab-web {
                                display: none;
                            }

                            .question-tab-mobile {
                                display: flex;
                                width: 100vw;
                            }
                        }

                        .countsNPage .ant-table-pagination > li > button {
                            display: flex !important;
                            justify-content: center !important;
                            align-items: center !important;
                        }

                        .countsNPage .ant-table-pagination > .ant-pagination-item {
                            font-size: 16px !important;
                            font-weight: normal;
                            font-stretch: normal;
                            font-style: normal;
                            letter-spacing: 0.4px;
                            text-align: center;
                            color: #0d1623 !important;
                        }

                        .countsNPage .ant-table-pagination > .ant-pagination-item > a {
                            position: relative;
                            top: 1px;
                        }

                        .countsNPage .ant-table-pagination > .ant-pagination-item-active {
                            background-color: #c43826 !important;
                            border: 0 !important;
                            color: #fff !important;
                            height: 30px !important;
                            width: 30px !important;
                        }

                        .countsNPage .ant-table-pagination > .ant-pagination-item-active > a {
                            color: #fff !important;
                            height: 30px !important;
                        }
                    `}
                </style>
            </Layout>
        </>
    );
};

export default QuestionListComponent;

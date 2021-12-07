import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { wrapper } from '../../../store/store';
import { setNavItems } from '../../../store/components/layouts/action';
import NewWebIframe from '../../../components/includes/NewWebIframe';
import { useSelector } from 'react-redux';
import { PageHead } from '../../../components/includes/PageHead';
import { Layout, Pagination } from 'antd';
import Breadcrumb from '../../../components/includes/breadcrumb/breadcrumb';
import {
    getCommonQuestion,
    getCommonQuestionSubcategories,
} from '../../../services/components/customerSupport/commonQuestion';
import { getCommonQuestionCategories } from '../../../services/components/customerSupport/customerSupportService';

import SearchInput from '../../../components/includes/customerSupport/SearchInput';
import CustomerTab from '../../../components/includes/customerSupport/CustomerTab';
import AccountTable from '../../../components/includes/tradingAccount/vipInventory/AccountTable';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Question = function () {
    const router = useRouter();
    const key = router.query.key;

    const isMobile = useSelector(store => store.layout.isMobile);
    const clientWidth = useSelector(store => store.layout.winWidth);
    const [categories, setCategories] = useState();
    const [dataSource, setDataSource] = useState();
    const [page, setPage] = useState(1);
    const [activeKey, setActiveKey] = useState(key);
    const [isLoading, setIsLoading] = useState(false);
    const [fromCount, setFromCount] = useState();
    const [toCount, setToCount] = useState();
    const [sub2ndCategories, setSub2ndCategories] = useState();

    useEffect(async () => {
        const data = await getCommonQuestionCategories();
        setCategories(data);
    }, []);

    useEffect(async () => {
        const data = await getCommonQuestion(page, 15, activeKey);
        setDataSource(data);

        if (data.counts <= 15) {
            setFromCount(1);
            setToCount(data.counts);
        } else if (data.counts >= 15) {
            setFromCount(15 * (page - 1) + 1);
            setToCount(page * 15);
        }
    }, [activeKey, page]);

    useEffect(async () => {
        const data = await getCommonQuestionSubcategories(activeKey);

        if (data !== null) {
            const sub2nd = data.category2nd.map((t, idx) => ({ text: t.categoryName, value: t.categoryName }));
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const onTabsChange = Key => {
        setDataSource([]);
        setActiveKey(Key);
        setPage(1);
    };

    const loadMoreFn = async () => {
        setIsLoading(true);
        setPage(page + 1);

        const data = await getCommonQuestion(page + 1, 15, activeKey);
        data.dataList.forEach(data => {
            setDataSource(oldData => [...oldData, data]);
        });
        setIsLoading(false);
    };

    const columns = [
        {
            title: '項目',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: '主類別',
            dataIndex: ['category2nd', 'categoryName'],
            width: '15%',
            filters: sub2ndCategories || false,
            onFilter: (value, record) => record.category2nd.categoryName.includes(value),
        },
        {
            title: '子類別',
            dataIndex: ['category3rd', 'categoryName'],
            width: '15%',
        },
        {
            title: '標題',
            dataIndex: 'title',
            width: '55%',
            render(text, record, idx) {
                const s = dataSource.dataList.filter((d, index) => index === idx);

                return (
                    <Link href={`${s[0].uuid}`}>
                        <div style={{ cursor: 'pointer' }}>{text}</div>
                    </Link>
                );
            },
        },
    ];

    return (
        <>
            <PageHead title={'永豐金理財網'} />
            <Layout className="antLayout">
                <div className="questionIndexWrapper">
                    <Breadcrumb />
                    <div className="title_group">
                        <h1>常見問題</h1>
                        <div className="input_search">
                            <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                        </div>
                    </div>
                    <CustomerTab
                        categories={categories}
                        defaultActiveKey={categories && categories[0].id}
                        activeKey={activeKey}
                        className="tabs"
                        onChange={onTabsChange}
                    >
                        {clientWidth > 450 && (
                            <>
                                <AccountTable
                                    dataSource={dataSource?.dataList}
                                    columns={columns}
                                    key={dataSource?.dataList?.uuid}
                                    pagination={false}
                                />
                                {dataSource?.counts === 0 ? null : (
                                    <div className="countsNPage">
                                        <span>
                                            {fromCount}-{toCount} 則問題 ( 共 {dataSource?.counts} 則問題 )
                                        </span>
                                        <Pagination
                                            total={dataSource?.counts}
                                            onChange={page => onPageChange(page)}
                                            pageSize={15}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        {clientWidth <= 450 && dataSource && (
                            <div>
                                <InfiniteScroll dataLength={dataSource.length} next={loadMoreFn} hasMore={true}>
                                    {clientWidth <= 450 &&
                                        dataSource?.dataList &&
                                        dataSource?.dataList.map((data, index) => {
                                            return (
                                                <div key={data.uuid} className="questionIndexCard">
                                                    <h3>{data.title}</h3>
                                                    <div className="breadcrumb_group">
                                                        {data.category2nd.categoryName}
                                                        {'>'} {data.category3rd.categoryName}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </InfiniteScroll>
                            </div>
                        )}
                        {clientWidth <= 450 && isLoading ? (
                            <div className="loading">
                                <LoadingOutlined className="loading_icon" />
                                載入更多中
                            </div>
                        ) : null}
                    </CustomerTab>
                </div>

                {/* <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}`}
                    title="永豐金證券"
                    iHeight={isMobile ? 4500 : 1900}
                /> */}
                <style jsx>{`
                    .wrapper {
                        width: 1172px;
                    }

                    .title_group {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 23px;
                        height: 40px;
                    }

                    .title_group > h1 {
                        font-size: 28px;
                        font-weight: 600;
                        font-stretch: normal;
                        font-style: normal;
                        letter-spacing: 0.7px;
                        color: #0d1623;
                        margin: 0;
                    }

                    .title_group > .input_search {
                        width: 348px;
                    }

                    .questionIndexWrapper > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list {
                        background-color: blueviolet !important;
                    }
                `}</style>

                <style jsx global>{`
                    .antLayout {
                        display: flex;
                        align-items: center;
                        min-height: 100vh;
                        padding: 31px 0;
                        background-color: #f9fbff;
                    }

                    @media screen and (max-width: 768px) {
                        .antLayout {
                            padding: 31px 33px;
                        }

                        .questionIndexWrapper {
                            width: 100%;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .antLayout {
                            padding: 20px 0 0;
                        }

                        .breadcrumb {
                            display: none;
                        }

                        .title_group {
                            padding: 0 16px;
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: initial;
                            align-items: initial;
                            margin-bottom: 23px;
                            height: initial;
                        }

                        .title_group > h1 {
                            margin-bottom: 12px;
                            font-size: 20px;
                        }

                        .title_group > .input_search {
                            width: 100%;
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
                    }
                `}</style>
            </Layout>
        </>
    );
};

export default Question;

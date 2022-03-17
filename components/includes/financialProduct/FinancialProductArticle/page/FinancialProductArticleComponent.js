import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { RightOutlined } from '@ant-design/icons';
import Breadcrumb from '../../../../includes/breadcrumb/breadcrumb';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { PageHead } from '../../../PageHead';
import { Layout, Collapse } from 'antd';
import { PlusSquareFilled, CloseSquareFilled } from '@ant-design/icons';
import CustomerButton from '../../../customerSupport/CustomerButton';
import QuestionTab from '../../../customerSupport/questionList/element/QuestionTab';
import {
    getFinancialProductDetail,
    getAnnouncement,
} from '../../../../../services/components/financialProduct/financialProductServices';
import { getTradingAppDetail } from '../../../../../services/components/tradingPlatform/tradingPlatformService';
import OpenAccountButtons from '../element/OpenAccountButtons';
import Announcement from '../element/Announcement';
import { checkServer } from '../../../../../services/checkServer';

const FinancialProductArticleComponent = ({
    isTradingPlatform,
    serverProducts,
    serverTabsArray,
    announcementServerRes,
}) => {
    // const clientWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();
    const { Panel } = Collapse;

    const [productCode, setProductCode] = useState(router.query.code);
    const [categoryName] = useState(router.query.category);
    const [articleData, setArticleData] = useState([]);
    const [articleTabs, setArticleTabs] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('0');
    const [announcement, setAnnouncement] = useState([]);
    const clientWidth = useSelector(store => store.layout.winWidth);
    // useEffect(() => {
    //     if(router.query.categoryCode){
    //         setProductCode(router.query.categoryCode)
    //     }
    // }, [router.query.categoryCode])
    const onTabsChange = key => {
        setActiveTabKey(key);
    };

    const toProduct = code => {
        router.push(`/financial-product/${code}`);
        // router.push(`/financial-product/${productCode}?category=${categoryName}`)
    };

    const backToList = () => {
        if (isTradingPlatform) {
            router.push('/trading-platform');
        } else {
            router.push('/financial-product');
        }
    };

    const toAnnouncement = () => {
        window.open('https://www.sinotrade.com.tw/CSCenter/CSCenter_13_5', '_blank');
    };

    const renderProducts = () => {
        return isTradingPlatform ? (
            <div className="trading-available-product">
                <div>
                    <p>可交易商品</p>
                </div>
                <div className="available-product-tags">
                    {articleData?.products?.map(product => (
                        <CustomerButton
                            key={product.productCode}
                            onClick={() => {
                                toProduct(product.productCode);
                            }}
                        >
                            {product.productName}
                        </CustomerButton>
                    ))}
                </div>
            </div>
        ) : null;
    };

    const serverRender = () => {
        return (
            <QuestionTab
                className="financial-product-article-tab"
                isFinancialProduct={true}
                categories={serverTabsArray}
                activeKey={activeTabKey}
                keywords={serverProducts.commonQuestionKeywords}
                attachments={serverProducts.attachments}
                onTabsChange={onTabsChange}
            >
                {serverTabsArray[activeTabKey]?.articleContent?.map((item, idx) =>
                    item.type === 'toggle' ? (
                        <div className="toggle-section" key={idx}>
                            <Collapse
                                expandIconPosition="right"
                                expandIcon={({ isActive }) =>
                                    isActive ? (
                                        <CloseSquareFilled style={{ fontSize: '150%' }} />
                                    ) : (
                                        <PlusSquareFilled style={{ fontSize: '150%' }} />
                                    )
                                }
                            >
                                <Panel header={item.content.title} key="1">
                                    <p>{item.content.content}</p>
                                </Panel>
                            </Collapse>
                        </div>
                    ) : (
                        <article key={idx}>{parse(item.content.content)}</article>
                    ),
                )}
            </QuestionTab>
        );
    };

    const clientRender = () => {
        return (
            <QuestionTab
                className="financial-product-article-tab"
                isFinancialProduct={true}
                categories={articleTabs}
                activeKey={activeTabKey}
                keywords={articleData.commonQuestionKeywords}
                attachments={articleData.attachments}
                onTabsChange={onTabsChange}
            >
                {articleTabs[activeTabKey]?.articleContent?.map((item, idx) =>
                    item.type === 'toggle' ? (
                        <div className="toggle-section" key={idx}>
                            <Collapse
                                expandIconPosition="right"
                                expandIcon={({ isActive }) =>
                                    isActive ? (
                                        <CloseSquareFilled style={{ fontSize: '150%' }} />
                                    ) : (
                                        <PlusSquareFilled style={{ fontSize: '150%' }} />
                                    )
                                }
                            >
                                <Panel header={item.content.title} key="1">
                                    <p>{item.content.content}</p>
                                </Panel>
                            </Collapse>
                        </div>
                    ) : (
                        <article style={{ padding: styleObjectHandler() }} key={idx}>
                            {parse(item.content.content)}
                        </article>
                    ),
                )}
            </QuestionTab>
        );
    };

    const styleObjectHandler = () => {
        if (clientWidth > 768) {
            return '32px';
        }
        if (clientWidth <= 768 && clientWidth > 450) {
            return '24px';
        }
        if (clientWidth <= 450) {
            return '16px';
        }
    };

    const openAccountButtonSsr = () => {
        return isTradingPlatform || serverProducts?.enableOpenBlock ? (
            <OpenAccountButtons
                title={serverProducts?.openTitle || serverProducts?.appName}
                categoryName={isTradingPlatform ? categoryName : null}
                description={serverProducts?.openDescription || serverProducts?.description}
                image={serverProducts?.openImagePath || serverProducts?.imagePath}
                button1Title={serverProducts?.openButton1Name || serverProducts?.button1Name}
                button1Link={serverProducts?.openButton1Url || serverProducts?.button1Url}
                button2Title={serverProducts?.openButton2Name || serverProducts?.button2Name}
                button2Link={serverProducts?.openButton2Url || serverProducts?.button2Url}
            />
        ) : null;
    };

    const openAccountButtonClir = () => {
        return isTradingPlatform || articleData?.enableOpenBlock ? (
            <OpenAccountButtons
                title={articleData?.openTitle || articleData?.appName}
                categoryName={isTradingPlatform ? categoryName : null}
                description={articleData?.openDescription || articleData?.description}
                image={articleData?.openImagePath || articleData?.imagePath}
                button1Title={articleData?.openButton1Name || articleData?.button1Name}
                button1Link={articleData?.openButton1Url || articleData?.button1Url}
                button2Title={articleData?.openButton2Name || articleData?.button2Name}
                button2Link={articleData?.openButton2Url || articleData?.button2Url}
            />
        ) : null;
    };

    useEffect(async () => {
        let res;
        if (isTradingPlatform) {
            res = await getTradingAppDetail(productCode);
        } else {
            res = await getFinancialProductDetail(productCode);
        }
        if (res) {
            console.log('res....................', res);
            setArticleData(res);
        }
        const tabsArray = [];
        if (res?.tabs?.length) {
            res.tabs.forEach((i, index) => {
                tabsArray.push({ categoryName: i.tabName, id: index, articleContent: JSON.parse(i.content) });
            });
            setArticleTabs(tabsArray);
            setActiveTabKey('0');
        } else if (!res?.tabs?.length) {
            setActiveTabKey('commonQuestion');
        }
        const announcementRes = await getAnnouncement(res?.keywords, 3);
        setAnnouncement(announcementRes);
    }, [productCode]);
    return (
        <>
            <PageHead title={'永豐金理財網'} />
            <Layout className="questionArticleLayout">
                <div className="questionArticleWrapper">
                    {checkServer() ? (
                        <Breadcrumb
                            categoryName={categoryName}
                            articleTitle={serverProducts?.productName || serverProducts?.appName}
                        />
                    ) : (
                        <Breadcrumb
                            categoryName={categoryName}
                            articleTitle={articleData?.productName || articleData?.appName}
                        />
                    )}

                    <div className="article_wrapper">
                        <div className="article_section">
                            <div className="title_group">
                                {checkServer() ? (
                                    <h1>{serverProducts?.productName || serverProducts?.appName}</h1>
                                ) : (
                                    <h1>{articleData?.productName || articleData?.appName}</h1>
                                )}

                                <div className="product-article-back">
                                    <CustomerButton
                                        type="default"
                                        className="web-back-to-list"
                                        onClick={() => {
                                            backToList();
                                        }}
                                    >
                                        返回列表
                                    </CustomerButton>
                                </div>
                            </div>
                            {checkServer() ? (
                                <div className="trading-available-product">
                                    <div>
                                        <p>可交易商品</p>
                                    </div>
                                    <div className="available-product-tags">
                                        {serverProducts?.products?.map(product => (
                                            <CustomerButton
                                                key={product.productCode}
                                                onClick={() => {
                                                    toProduct(product.productCode);
                                                }}
                                            >
                                                {product.productName}
                                            </CustomerButton>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                renderProducts()
                            )}
                            <div className="article">{checkServer() ? serverRender() : clientRender()}</div>
                        </div>

                        <div className="side_section">
                            {checkServer() ? openAccountButtonSsr() : openAccountButtonClir()}
                            <div className="open-related">
                                <main className="qTitle-frame">
                                    <h3 className="qTitle">相關公告</h3>
                                    <div
                                        className="qTitle-more"
                                        onClick={() => {
                                            toAnnouncement();
                                        }}
                                    >
                                        更多 <RightOutlined />
                                    </div>
                                </main>
                                {checkServer() && announcementServerRes?.length ? (
                                    <Announcement data={announcementServerRes} />
                                ) : null}
                                {!checkServer() && announcement.length ? <Announcement data={announcement} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <style jsx>{`
                .article_wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .article_section {
                    /* min-width: 777px; */
                    width: 66%;
                    margin-right: 4%;
                }

                article {
                    padding: 20px 32px 0px 32px;
                }

                .article {
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    width: 100%;
                    /* min-width: 600px; */
                }

                .article > h1 {
                    /* font-family: PingFangTC; */
                    font-size: 24px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.42;
                    letter-spacing: -0.3px;
                    color: #0d1623;
                    margin-bottom: 16px;
                }

                .article > .category-group {
                    /* font-family: PingFangTC; */
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .article > hr {
                    height: 1px;
                    border: solid 1px #d7e0ef;
                    margin: 15.5px 0;
                }

                .article > .category-group {
                    display: flex;
                    flex-direction: row;
                }

                .article > .category-group > .category-question-group {
                    display: flex;
                    flex-direction: row;
                }

                .article > .category-group > .category-time-group {
                    display: flex;
                    flex-direction: row;
                }

                .article > .category-group > .category-time-group > span {
                    margin-top: 1.5px;
                }

                .article > .category-group > .category-question-group > p {
                    margin: 0 12px 0 0;
                }

                .article > .category-group > .category-question-group > span {
                    margin: 0 24px 0 0;
                    color: #3f5372;
                }

                .article > .category-group > .category-time-group > p {
                    margin: 0 12px 0 0;
                }

                .category-time-group > span {
                    font-size: 16px;
                    color: #3f5372;
                }

                .side_section {
                    width: 30%;
                    max-width: 346px;
                }

                .qTitle-frame {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .qTitle {
                    position: relative;
                    padding-left: 12px;
                    /* font-family: PingFangTC; */
                    font-size: 20px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.7;
                    letter-spacing: -0.25px;
                    color: #0d1623;
                    margin: 0 0 16px 0;
                }

                .qTitle:before {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    width: 4px;
                    height: 20px;
                    margin: 7px 12px 5px 0;
                    background-color: #daa360;
                }

                .qTitle-more {
                    padding-bottom: 16px;
                    /* font-family: PingFangTC; */
                    font-size: 16px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    cursor: pointer;
                }

                .qSection {
                    padding: 32px 31px 34px 32px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    margin-bottom: 16px;
                }

                .ad_block {
                    width: 100%;
                    height: 108px;
                    border-radius: 1px;
                    background-color: #e6ebf5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #0d1623;
                    margin-bottom: 24px;
                }

                .qTag {
                    padding: 9px 11px;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #0d1623;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    background-color: #fff;
                    margin-right: 16px;
                    margin-bottom: 16px;
                    cursor: pointer;
                }

                .title_group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    height: 40px;
                }

                .title_group > h1 {
                    /* font-family: PingFangTC; */
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

                .t1 {
                    padding: 32px;
                }

                @media screen and (max-width: 1024px) {
                    .questionArticleWrapper {
                        width: calc(100% - 64px);
                    }

                    .trading-available-product > div > p {
                        padding: 16px;
                    }

                    .available-product-tags {
                        padding: 24px 24px 9px;
                    }

                    .questionArticleLayout .ant-tabs-tab {
                        margin: 0 0 0 16px;
                    }

                    article {
                        padding: 24px;
                    }

                    .article_section {
                        min-width: 0;
                        width: 100%;
                    }

                    .article {
                        min-width: ;
                    }
                }

                @media screen and (max-width: 768px) {
                    .article_wrapper {
                        display: flex;
                        flex-direction: column;
                    }

                    .article_section {
                        width: 100%;
                        margin: auto;
                        max-width: auto;
                        min-width: 0;
                    }

                    .title_group {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        padding: 0;
                        margin: auto;
                        margin-bottom: 20px;
                        height: initial;
                    }

                    .title_group > h1 {
                        text-align: left;
                        width: 100%;
                        font-size: 28px;
                        margin-bottom: 0;
                        margin-top: 12px;
                    }

                    .article {
                        width: 100%;
                        min-width: 0;
                        margin: auto;
                    }

                    .category-group {
                        flex-direction: column !important;
                        font-size: 14px !important;
                    }

                    .category-question-group {
                        width: 100%;
                        margin-bottom: 4px;
                    }

                    .category-time-group {
                        width: 100%;
                    }

                    .side_section {
                        width: 100%;
                        max-width: 100vw;
                        padding: 0 0 16px 0;
                    }

                    .side_section .open-related {
                        display: none;
                    }
                    .t1 {
                        padding: 24px !important;
                    }
                }

                @media screen and (max-width: 450px) {
                    .article {
                        width: 100%;
                    }

                    article {
                        padding: 25px 16px 24px;
                    }

                    .questionArticleWrapper {
                        min-height: 55vh;
                        width: 100%;
                    }

                    .article > .category-group > .category-time-group > span {
                        margin-top: 0;
                    }

                    .title_group {
                        width: 100%;
                        padding: 0 16px;
                        margin-bottom: 12px;
                    }

                    .title_group > h1 {
                        font-size: 20px;
                        margin-top: 0px;
                    }
                    .t1 {
                        padding: 16px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .ant-tabs-content-holder {
                    padding: 0;
                }
                .questionArticleLayout {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 31px 0;
                    margin: auto;
                    background-color: #f9fbff;
                    overflow-x: hidden;
                }

                .title_group .web-back-to-list {
                    width: 105px;
                    height: 40px;
                    border: 1px solid #d7e0ef;
                }

                .title_group .web-back-to-list > span {
                    color: #0d1623;
                }

                .web-back-to-list:hover {
                    background-color: #f3f6fe;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                .web-back-to-list:focus {
                    background-color: #d7e0ef;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                .questionArticleWrapper {
                    width: 97vw;
                    max-width: 1172px;
                    margin: auto;
                }

                .questionArticleWrapper > .site-breadcrumb {
                    width: 100%;
                }

                .SearchInput_question-article-input-search__3QSct
                    > .ant-input-wrapper
                    > .ant-input-search
                    > .ant-input::placeholder {
                    // font-family: PingFangSC !important;
                    font-size: 16px !important;
                    letter-spacing: 0.4px !important;
                    color: #3f5372 !important;
                }

                .question-article-input-search .ant-input-group-addon {
                    width: 80px !important;
                }

                .question-article-input-search .ant-input-search-button {
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

                .question-article-input-search .ant-input-search-button:hover {
                    background-color: #ea6554 !important;
                    border-color: #ea6554 !important;
                }

                .trading-available-product {
                    width: 100%;
                    margin-bottom: 24px;
                    border: 1px solid #d7e0ef;
                    background-color: white;
                }

                .trading-available-product > div > p {
                    border-bottom: 1px solid #d7e0ef;
                    padding: 16px 16px 16px 32px;
                    margin: 0;
                    font-size: 16px;
                    color: #0d1623;
                }

                .available-product-tags {
                    padding: 20px 32px 17px 32px;
                }

                .available-product-tags .customer-button {
                    min-width: 106px;
                    background-color: #e6ebf5;
                    margin: 0 15px 15px 0;
                }

                // override article image size
                article img {
                    max-width: 100% !important;
                    height: 100% !important;
                }

                article p {
                    font-size: 16px;
                    color: #0d1623;
                    margin-bottom: 1rem;
                }

                article h1 {
                    font-size: 20px;
                    font-weight: 600;
                }

                article h1::before {
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin: 10px 12px 8px 0;
                    background-color: #c43826;
                }

                article h2 {
                    font-size: 16px;
                    font-weight: 600;
                }

                article ul,
                article ol {
                    margin-bottom: 1rem;
                }

                article ul > li,
                article ol > li {
                    color: #0d1623;
                    font-size: 16px;
                }

                .toggle-section {
                    padding: 10px 32px;
                }

                .toggle-section .ant-collapse {
                    border-color: #e6ebf5;
                    background-color: #f9fbff;
                }

                .toggle-section .ant-collapse > .ant-collapse-item {
                    border-color: #e6ebf5;
                }

                .toggle-section .ant-collapse-content {
                    border-color: #e6ebf5;
                }

                // toggle-list content box text color
                .ant-collapse-content .ant-collapse-content-box p {
                    color: #0d1623;
                }

                .qTag:hover a {
                    color: #daa360;
                }

                .ant-tabs-top .ant-tabs-nav {
                    margin: 0;
                    padding: 0 0 0 26px;
                    background-color: #fff;
                }

                .ant-tabs-nav {
                    height: 58px;
                }

                .ant-tabs-tab {
                    // font-family: PingFangTC;
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

                // .ant-tabs-content-holder {
                //     // padding-bottom: 30px;
                //     padding: 32px;
                // }

                .product-article-back .ant-btn {
                    width: 105px;
                }

                .side_section .product-open-account-container {
                    min-height: 110px;
                    bottom: 0;
                }

                @media screen and (max-width: 1024px) {                 
                    .questionArticleLayout .ant-tabs-top .ant-tabs-nav {
                        padding: 0 0 0 16px;
                    }
                }


                @media screen and (max-width: 768px) {
                    // .ant-tabs-content-holder {
                    //     // padding-bottom: 30px;
                    //     padding: 24px;
                    // }

                    .questionArticleWrapper > .site-breadcrumb {
                        width: 90vw;
                    }

                    .questionArticleLayout {
                        width: 100%;
                        padding: 20px 0 20px 0;
                        margin: auto;
                    }

                    .ant-tabs-nav {
                        // padding: 0 45px 0 0 !important;
                        padding: 0;
                    }

                    .ant-tabs-ink-bar {
                        margin-left: -1px;
                    }

                    .product-article-back .ant-btn {
                        height: 40px;
                        font-size: 16px;
                    }

                    .side_section .product-open-account-container {
                        height: 82px;
                        min-height: unset;
                        max-height: 106px;
                    }

                @media screen and (max-width: 450px) {
                    // .ant-tabs-content-holder {
                    //     padding: 16px;
                    // }
                    .questionArticleLayout {
                        padding-top: 12px;
                    }

                    .questionArticleWrapper {
                        min-height: 55vh;
                    }

                    .trading-available-product {
                        width: 100%;
                    }

                    .available-product-tags .customer-button {
                        min-width: 45%;
                    }

                    .side_section .product-open-account-container {
                        min-height: unset;
                        max-height: 76px;
                    }

                    .questionArticleLayout .available-product-tags {
                        padding: 24px 1px 9px 16px;
                        width: 100%;
                    }

                    .available-product-tags .customer-button {
                        min-width: calc(50% - 15px);
                    }

                    .toggle-section {
                        padding: 10px 16px;
                    }
                }
            `}</style>
        </>
    );
};

export default FinancialProductArticleComponent;

FinancialProductArticleComponent.propTypes = {
    isTradingPlatform: PropTypes.bool,
};

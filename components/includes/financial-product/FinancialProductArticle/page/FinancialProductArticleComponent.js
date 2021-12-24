import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../../includes/breadcrumb/breadcrumb';
import parse from 'html-react-parser';
// import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PageHead } from '../../../PageHead';
import { Layout, Collapse } from 'antd';
import CustomerButton from '../../../customerSupport/CustomerButton';
import QuestionTab from '../../../customerSupport/questionList/element/QuestionTab';
// import { LeftOutlined } from '@ant-design/icons';
import {
    getFinancialProductDetail,
    getAnnouncement,
} from '../../../../../services/components/financialProduct/financialProductServices';
import OpenAccountButtons from '../element/OpenAccountButtons';
import Announcement from '../element/Announcement';

const FinancialProductArticleComponent = () => {
    // const clientWidth = useSelector(store => store.layout.winWidth);
    const router = useRouter();
    const { Panel } = Collapse;

    const [productCode] = useState(router.query.code);
    const [categoryName] = useState(router.query.category);
    const [articleData, setArticleData] = useState([]);
    const [articleTabs, setArticleTabs] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('0');
    const [announcement, setAnnouncement] = useState([]);

    const onTabsChange = key => {
        setActiveTabKey(key);
    };

    useEffect(async () => {
        const res = await getFinancialProductDetail(productCode);
        setArticleData(res);
        const tabsArray = [];
        if (res?.tabs?.length) {
            res.tabs.forEach((i, index) => {
                tabsArray.push({ categoryName: i.tabName, id: index, articleContent: JSON.parse(i.content) });
            });
            setArticleTabs(tabsArray);
            setActiveTabKey('0');
        }

        const announcementRes = await getAnnouncement(res?.keywords, 3);
        setAnnouncement(announcementRes);
    }, [productCode]);

    return (
        <>
            <PageHead title={'永豐金理財網'} />
            <Layout className="questionArticleLayout">
                <div className="questionArticleWrapper">
                    <Breadcrumb categoryName={categoryName} articleTitle={articleData?.productName} />
                    <div className="article_wrapper">
                        <div className="article_section">
                            <div className="title_group">
                                <h1>{articleData?.productName}</h1>
                                <div className="product-article-back">
                                    <CustomerButton type="default" onClick={() => router.push('/financial-product')}>
                                        返回列表
                                    </CustomerButton>
                                </div>
                            </div>
                            <div className="article">
                                {articleTabs?.length && (
                                    <QuestionTab
                                        className="financial-product-article-tab"
                                        isFinancialProduct={true}
                                        categories={articleTabs}
                                        defaultActiveKey={'0'}
                                        activeKey={activeTabKey}
                                        keywords={articleData.keywords}
                                        attachments={articleData.attachments}
                                        onChange={onTabsChange}
                                    >
                                        {articleTabs[activeTabKey]?.articleContent?.map((item, idx) =>
                                            item.type === 'toggle' ? (
                                                <div className="toggle-section" key={idx}>
                                                    <Collapse>
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
                                )}
                            </div>
                        </div>

                        <div className="side_section">
                            <OpenAccountButtons
                                title={articleData?.openTitle}
                                description={articleData?.openDescription}
                                image={articleData?.openImagePath}
                                button1Link={articleData?.openButton1Url}
                                button1Title={articleData?.openButton1Name}
                                // button2Link={'http://'}
                                // button2Title={'芝麻開門'}
                                button2Link={articleData?.openButton2Url}
                                button2Title={articleData?.openButton2Name}
                            />
                            <div className="open-related">
                                <h3 className="qTitle">相關公告</h3>
                                {announcement.length && <Announcement data={announcement} />}
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
                    min-width: 777px;
                    width: 66%;
                    margin-right: 48px;
                }

                article {
                    padding: 20px 32px 32px 32px;
                }

                .article {
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    width: 100%;
                    min-width: 600px;
                }

                .article > h1 {
                    font-family: PingFangTC;
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
                    font-family: PingFangTC;
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
                    width: 346px;
                }

                .qTitle {
                    border-left: 4px solid #daa360;
                    padding-left: 12px;
                    font-family: PingFangTC;
                    font-size: 20px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.7;
                    letter-spacing: -0.25px;
                    color: #0d1623;
                    margin: 21px 0 16px;
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

                .tag_section {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    flex-direction: row;
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
                    cursor: pointer;
                }

                .title_group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 23px;
                    height: 40px;
                }

                .title_group > h1 {
                    font-family: PingFangTC;
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

                @media screen and (max-width: 1024px) {
                    .questionArticleLayout {
                        padding: 20px 0 0;
                    }

                    .questionArticleWrapper {
                        width: 100%;
                    }

                    .article_wrapper {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
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
                        width: 95%;
                        padding: 0 16px;
                        margin: auto;
                        margin-bottom: 23px;
                        height: initial;
                    }

                    .title_group > h1 {
                        text-align: left;
                        width: 100%;
                        font-size: 20px;
                        margin-bottom: 12px;
                    }

                    .article {
                        width: 92%;
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

                @media screen and (max-width: 450px) {
                    .article {
                        width: 100%;
                        min-width: 0;
                    }

                    .questionArticleWrapper {
                        min-height: 55vh;
                    }
                }
            `}</style>
            <style jsx global>{`
                .questionArticleLayout {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 31px 0;
                    background-color: #f9fbff;
                }

                .questionArticleWrapper {
                    max-width: 1172px;
                }

                .SearchInput_question-article-input-search__3QSct
                    > .ant-input-wrapper
                    > .ant-input-search
                    > .ant-input::placeholder {
                    font-family: PingFangSC !important;
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

                .qTag:hover a {
                    color: #daa360;
                }

                .ant-tabs-top .ant-tabs-nav {
                    margin: 0;
                    padding: 2px 45px 0;
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

                @media screen and (max-width: 1024px) {
                    .questionArticleLayout {
                        padding-bottom: 0;
                    }

                    .ant-tabs-mobile {
                        width: 100vw;
                    }

                    .ant-tabs-nav {
                        padding: 0 45px 0 0 !important;
                    }

                    .ant-tabs-tab {
                        margin: 0s 16px;
                    }

                    .ant-tabs-ink-bar {
                        margin-left: -1px;
                    }

                    .product-article-back .ant-btn {
                        height: 40px;
                        font-size: 16px;
                    }
                }
            `}</style>

            <style jsx global>{``}</style>
        </>
    );
};

export default FinancialProductArticleComponent;

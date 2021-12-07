import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import moment from 'moment';
import { PageHead } from '../../../components/includes/PageHead';
import { Layout, Collapse } from 'antd';
import CustomerButton from '../../../components/includes/customerSupport/CustomerButton';
import { getCommonQuestionArticle } from '../../../services/components/customerSupport/commonQuestion';
import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import Breadcrumb from '../../../components/includes/breadcrumb/breadcrumb';

import SearchInput from '../../../components/includes/customerSupport/SearchInput';

const QuestionArticle = () => {
    const { Panel } = Collapse;
    const router = useRouter();
    const { id } = router.query;
    const clientWidth = useSelector(store => store.layout.winWidth);

    const [articleData, setArticleData] = useState([]);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleContent, setArticleContent] = useState();

    useEffect(async () => {
        const data = await getCommonQuestionArticle(id);
        setArticleData(data);
        setArticleTitle(data.title);
        const content = JSON.parse(data.content);
        setArticleContent(content);
    }, [id]);

    if (!articleData) {
        return 'loading';
    }

    const onSearch = searchKeyword => {
        router.push({
            pathname: '/customer-support/search-result',
            query: { keyword: searchKeyword },
        });
    };

    const keywords = keywords => {
        const keywordArr = keywords.split(',');
        return keywordArr;
    };

    return (
        <>
            <PageHead title={'永豐金理財網'} />
            <Layout className="questionArticleLayout">
                <div className="questionArticleWrapper">
                    <Breadcrumb articleTitle={articleTitle} />
                    <div className="article_wrapper">
                        <div className="article_section">
                            <div className="title_group">
                                <h1>常見問題</h1>
                                {clientWidth > 450 ? (
                                    <CustomerButton type="default" onClick={() => router.back()}>
                                        返回列表
                                    </CustomerButton>
                                ) : (
                                    <div className="back_group">
                                        <CustomerButton type="default" onClick={() => router.back()}>
                                            <LeftOutlined />
                                        </CustomerButton>
                                        <div className="mobile_button">
                                            <SearchInput
                                                onSearch={onSearch}
                                                enterButton="搜尋"
                                                placeholder="輸入關鍵字"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="article">
                                <h1>{articleData.title}</h1>
                                <div className="category-group">
                                    <div className="category-question-group">
                                        <p>問題類別</p>
                                        <span>{`${articleData.category2nd && articleData.category2nd.categoryName} > ${
                                            articleData.category3rd && articleData.category3rd.categoryName
                                        }`}</span>
                                    </div>
                                    <div className="category-time-group">
                                        <p>更新時間</p>
                                        <span>{moment(articleData.updatedAt).format('Y-M-D')}</span>
                                    </div>
                                </div>
                                <hr />
                                {articleContent &&
                                    articleContent.map((item, idx) =>
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
                            </div>
                        </div>
                        <div className="side_section">
                            {clientWidth > 450 && (
                                <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                            )}

                            <h3 className="qTitle">相關問題</h3>

                            <div className="qSection">
                                {articleData.related &&
                                    articleData.related.map(data => {
                                        return (
                                            <div key={data.uuid} className="question_block">
                                                <Link href={`/customer-support/questions/${data.uuid}`}>
                                                    {data.title}
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className="ad_block">廣告圖預留區</div>

                            <div className="qTitle">相關標籤</div>

                            <div className="tag_section">
                                {articleData.keywords &&
                                    keywords(articleData.keywords).map(keyword => (
                                        <div key={keyword} className="qTag">
                                            <Link href={`/customer-support/search-result?keyword=${keyword}`}>
                                                {keyword}
                                            </Link>
                                        </div>
                                    ))}
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
                    max-width: 777px;
                    width: 777px;
                }

                .article {
                    padding: 32px 31px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    width: 100%;
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

                .side_section {
                    max-width: 346px;
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

                .question_block {
                    width: 100%;
                    padding-bottom: 15px;
                    font-family: PingFangTC;
                    font-size: 16px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    cursor: pointer;
                }

                .question_block:hover {
                    color: #daa360;
                }

                .question_block:nth-child(2) {
                    padding: 15px 0 15px;
                    border-top: solid 1px #d7e0ef;
                    border-bottom: solid 1px #d7e0ef;
                }

                .question_block:nth-child(3) {
                    padding-top: 15px;
                    padding-bottom: 0;
                }

                @media screen and (max-width: 450px) {
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
                    }

                    .title_group {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        padding: 0 16px;
                        height: initial;
                    }

                    .title_group > h1 {
                        text-align: left;
                        width: 100%;
                        font-size: 20px;
                        margin-bottom: 12px;
                    }

                    .back_group {
                        display: flex;
                        justify-content: space-between;
                    }

                    .back_group > .mobile_button {
                        margin-left: 16px;
                    }

                    .article {
                        border-right: 0;
                        border-left: 0;
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
                        padding: 0 16px 40px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .questionArticleLayout {
                    display: flex;
                    align-items: center;
                    min-height: 100vh;
                    padding: 31px 0;
                    background-color: #f9fbff;
                }

                .questionArticleWrapper {
                    width: 1172px;
                }
            `}</style>

            <style jsx global>{`
                .question_block {
                    width: 100%;
                    padding-bottom: 15px;
                    font-family: PingFangTC;
                    font-size: 16px;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    cursor: pointer;
                }

                .question_block:hover {
                    color: #daa360;
                }

                .question_block:nth-child(2) {
                    padding: 15px 0 15px;
                    border-top: solid 1px #d7e0ef;
                    border-bottom: solid 1px #d7e0ef;
                }

                .question_block:nth-child(3) {
                    padding-top: 15px;
                    padding-bottom: 0;
                }
            `}</style>
        </>
    );
};

export default QuestionArticle;

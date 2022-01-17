import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import parse from 'html-react-parser';
import moment from 'moment';
import { PageHead } from '../../../PageHead';
import { Layout, Collapse } from 'antd';
import CustomerButton from '../../CustomerButton';
import Relative from '../element/Relative';
import {
    getCommonQuestionArticle,
    putCommonQuestionIsLike,
} from '../../../../../services/components/customerSupport/commonQuestion';
// import { useCheckMobile } from '../../../../../hooks/useCheckMobile';
import { LeftOutlined, FileOutlined } from '@ant-design/icons';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import SearchInput from '../../SearchInput';

const QuestionArticleComponent = () => {
    const { Panel } = Collapse;
    const router = useRouter();
    const { id } = router.query;
    // const isMobile = useCheckMobile();

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

    const downloadFile = filename => {
        window.open(`https://webrd.sinotrade.com.tw/files/${filename}`);
    };

    const keywords = keywords => {
        const keywordArr = keywords.split(',');
        return keywordArr;
    };

    const sendIsHelp = async state => {
        const res = await putCommonQuestionIsLike(id, state);
        console.log(res);
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
                                <CustomerButton
                                    type="default"
                                    className="web-back-to-list"
                                    onClick={() => router.push('/customer-support/question')}
                                >
                                    返回列表
                                </CustomerButton>
                                <div className="back_group">
                                    <CustomerButton type="default" onClick={() => history.back()}>
                                        <LeftOutlined />
                                    </CustomerButton>
                                    <div className="mobile_button">
                                        <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                                    </div>
                                </div>
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
                                {articleData?.attachments?.length
                                    ? articleData.attachments.map((item, idx) => (
                                          <div className="question-attachments" key={idx}>
                                              <div className="question-attachments-left">
                                                  <FileOutlined />
                                                  <p>{item.displayName}</p>
                                              </div>
                                              <CustomerButton
                                                  type="primary"
                                                  onClick={() => {
                                                      downloadFile(item.filename);
                                                  }}
                                              >
                                                  下載
                                              </CustomerButton>
                                          </div>
                                      ))
                                    : ''}
                                <hr />
                                <p className="is-helped-title">回答是否有幫助？</p>
                                <CustomerButton
                                    type="default"
                                    className="is-helped-button"
                                    onClick={() => {
                                        sendIsHelp(true);
                                    }}
                                >
                                    是
                                </CustomerButton>
                                <CustomerButton
                                    type="default"
                                    className="is-helped-button"
                                    onClick={() => {
                                        sendIsHelp(false);
                                    }}
                                >
                                    否
                                </CustomerButton>
                            </div>
                        </div>

                        <div className="side_section">
                            <div className="question-article-input-search">
                                <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                            </div>
                            <h3 className="qTitle">相關問題</h3>
                            {articleData.related && <Relative data={articleData.related} />}
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
                    width: 98vw;
                    max-width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin: auto;
                }

                .article_section {
                    min-width: 777px;
                    width: 66%;
                    margin-right: 48px;
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

                .article > .category-group > .category-time-group > span {
                    margin-top: 1.5px;
                }

                .article > .category-group > .category-question-group > p {
                    font-size: 14px;
                    margin: 0 12px 0 0;
                    color: #0d1623;
                }

                .article > .category-group > .category-question-group > span {
                    font-size: 14px;
                    margin: 0 24px 0 0;
                    color: #3f5372;
                }

                .article > .category-group > .category-time-group > p {
                    margin: 0 12px 0 0;
                }

                .category-time-group > span {
                    font-size: 14px;
                    color: #3f5372;
                }

                .side_section {
                    /* max-width: 346px; */
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
                    flex-wrap: wrap;
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
                    margin-bottom: 16px;
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
                    /* margin-left: 20px; */
                }

                .title_group > .input_search {
                    width: 348px;
                }

                .input_search .ant-input-affix-wrapper {
                    border: 1px solid #d7e0ef;
                }

                .back_group {
                    display: none;
                }

                @media screen and (max-width: 1024px) {
                    .article_section {
                        min-width: 0;
                        width: 100%;
                    }
                }

                @media screen and (max-width: 768px) {
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
                        margin-left: 25px;
                    }

                    .back_group {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                    }

                    .back_group > .mobile_button {
                        margin-left: 16px;
                    }

                    .article {
                        padding: 16px 16px;
                        border-right: 0;
                        border-left: 0;
                    }

                    .article > p > img {
                        width: 100vw !important;
                    }

                    .category-group {
                        flex-direction: column !important;
                        font-size: 14px !important;
                    }

                    .category-question-group {
                        width: 100%;
                        margin-bottom: 5px;
                    }

                    .category-time-group {
                        width: 100%;
                    }

                    .article > .category-group > .category-time-group > span {
                        margin-top: 0;
                    }

                    .side_section {
                        width: 100%;
                        max-width: 100vw;
                        /* padding: 0 16px 40px; */
                        padding: 0 0 16px 0;
                    }

                    @media screen and (max-width: 768px) {
                        .qTitle {
                            margin: 21px 16px 16px;
                        }

                        .tag_section {
                            margin: 0 16px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .back_group > .mobile_button {
                            width: 74vw;
                        }
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

                .questionArticleWrapper > .site-breadcrumb {
                    width: 100%;
                }

                @media screen and (max-width: 768px) {
                    .questionArticleLayout {
                        padding: 20px 0;
                    }
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

                .question-article-input-search .ant-input-search:hover,
                .question-article-input-search .ant-input-search:focus {
                    border-color: #d7e0ef !important;
                }

                .mobile_button .ant-input-search:hover,
                .mobile_button .ant-input-search:focus {
                    border-color: #d7e0ef;
                }

                .back_group > .default {
                    margin-left: 16px;
                    border-color: #d7e0ef;
                }

                article img,
                article .image-blot,
                article .img-container {
                    width: 100%;
                    height: 100%;
                }

                article .img-container > img {
                    width: 100% !important;
                    height: 100% !important;
                }

                article p {
                    font-size: 16px;
                    color: #0d1623;
                }

                // toggle-list content box text color
                .ant-collapse-content .ant-collapse-content-box p {
                    color: #0d1623;
                }

                article h1 {
                    font-size: 20px;
                }

                .toggle-section {
                    margin: 10px 0;
                }

                .question-attachments {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 51px;
                    padding: 12px 20px;
                    margin-bottom: 12px;
                    background-color: #f9fbff;
                    border: 1px solid #e6ebf5;
                }

                .question-attachments-left {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                .question-attachments-left svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                }

                .question-attachments-left p {
                    font-size: 16px;
                    margin-bottom: 0;
                }

                .question-attachments .customer-button {
                    width: 44px;
                    height: 26px;
                    padding: 0;
                }

                .question-attachments .customer-button span {
                    font-size: 12px;
                }

                .is-helped-title {
                    color: #3f5372;
                    font-size: 16px;
                    margin-top: 20px;
                }

                .is-helped-button {
                    min-width: 105px;
                    min-height: 40px;
                    margin-right: 16px;
                    color: #0d1623;
                    border: 1px solid #d7e0ef;
                }

                .is-helped-button:hover {
                    background-color: #f3f6fe;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                .is-helped-button:focus {
                    background-color: #d7e0ef;
                    color: #0d1623;
                    border-color: #d7e0ef;
                }

                @media screen and (max-width: 768px) {
                    .questionArticleWrapper > .site-breadcrumb {
                        width: 90vw;
                    }

                    .side_section > .question-article-input-search {
                        display: none;
                    }

                    .web-back-to-list {
                        display: none;
                    }
                }

                @media screen and (max-width: 450px) {
                    .back_group > .default {
                        margin-left: 5px;
                    }

                    .is-helped-button {
                        width: 41vw;
                    }

                    is-helped-button {
                        margin-right: 0;
                    }
                }

                .qTag:hover a {
                    color: #daa360;
                }

                .mobile_button .ant-input-search-button {
                    background-color: #c43826 !important;
                    border-color: #c43826 !important;
                }

                .question-article-input-search .ant-input::placeholder,
                .mobile_button .ant-input::placeholder {
                    color: #3f5372;
                }

                .question-attachments {
                    height: 64px;
                }
            `}</style>
        </>
    );
};

export default QuestionArticleComponent;

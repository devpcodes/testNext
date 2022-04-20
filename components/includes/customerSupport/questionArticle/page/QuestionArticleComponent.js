import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import parse from 'html-react-parser';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Carousel, message } from 'antd';
import { PageHead } from '../../../PageHead';
import { Layout, Collapse } from 'antd';
import { PlusSquareFilled, CloseSquareFilled } from '@ant-design/icons';
import CustomerButton from '../../CustomerButton';
import Relative from '../element/Relative';
import {
    getCommonQuestionArticle,
    putCommonQuestionIsLike,
} from '../../../../../services/components/customerSupport/commonQuestion';
import { LeftOutlined, FileOutlined, RightOutlined } from '@ant-design/icons';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import SearchInput from '../../SearchInput';
import { getAdSlot } from '../../../../../services/components/bannerSlider/AdSlot';
import { logout } from '../../../../../services/user/logoutFetcher';

const QuestionArticleComponent = () => {
    const { Panel } = Collapse;
    const router = useRouter();
    const { id } = router.query;
    const clientWidth = useSelector(store => store.layout.winWidth);

    const [articleData, setArticleData] = useState([]);
    const [articleTitle, setArticleTitle] = useState('');
    const [articleContent, setArticleContent] = useState();
    const [ads, setAds] = useState([]);
    const [fromCategory, setFromCategory] = useState(0);
    const [haveAnswer, setHaveAnswer] = useState(false);
    useEffect(async () => {
        const data = await getCommonQuestionArticle(id);
        setArticleData(data);
        setFromCategory(data?.category?.id);
        setArticleTitle(data.title);
        const content = JSON.parse(data.content);
        setArticleContent(content);
        if (checkHaveId(id)) {
            setHaveAnswer(true);
        } else {
            setHaveAnswer(false);
        }
    }, [id]);

    useEffect(() => {
        getAds();
    }, [id]);

    const getAds = async () => {
        const data = await getAdSlot('question');
        setAds(data?.ads);
    };

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
        window.open(`${process.env.NEXT_PUBLIC_FILE}/${filename}`);
    };

    const keywords = keywords => {
        const keywordArr = keywords.split(',');
        return keywordArr;
    };

    const sendIsHelp = async state => {
        if (!checkHaveId(id)) {
            const res = await putCommonQuestionIsLike(id, state);
            if (res) {
                message.success('感謝您的意見反應');
                let idArr = JSON.parse(localStorage.getItem('QuestionArticle')) || [];
                idArr.push({ id: id });
                localStorage.setItem('QuestionArticle', JSON.stringify(idArr));
                setHaveAnswer(true);
            }
        }
    };

    const checkHaveId = nowId => {
        let idArr = JSON.parse(localStorage.getItem('QuestionArticle')) || [];
        let haveId;
        if (idArr.length > 0) {
            haveId = idArr.find(item => {
                return item.id === nowId;
            });
        }
        if (haveId == null) {
            return false;
        } else {
            return true;
        }
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
                                    onClick={() => router.push(`/customer-support/question?key=${fromCategory}`)}
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
                                        <div>
                                            <span>
                                                {articleData.category2nd && articleData.category2nd.categoryName}
                                            </span>
                                            <RightOutlined className="rightIcon" />
                                            <span>
                                                {articleData.category3rd && articleData.category3rd.categoryName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="category-time-group">
                                        <p>更新時間</p>
                                        <span>{moment(articleData.updatedAt).format('Y.MM.DD')}</span>
                                    </div>
                                </div>
                                <hr />
                                {articleContent &&
                                    articleContent.map((item, idx) =>
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
                                {articleData?.attachments?.length
                                    ? articleData.attachments.map((item, idx) => (
                                          <div className="question-attachments" key={idx}>
                                              <div className="question-attachments-left">
                                                  <FileOutlined />
                                                  <p>{item.displayName}</p>
                                              </div>
                                              <div
                                                  className="primary-button"
                                                  style={{ textAlign: 'center' }}
                                                  onClick={() => {
                                                      downloadFile(item.filename);
                                                  }}
                                              >
                                                  下載
                                              </div>
                                          </div>
                                      ))
                                    : ''}
                                <hr />
                                <p className="is-helped-title">回答是否有幫助？</p>
                                <div className="is-helped-button-group">
                                    <CustomerButton
                                        type="default"
                                        className="is-helped-button"
                                        onClick={() => {
                                            sendIsHelp(true);
                                        }}
                                        disabled={haveAnswer}
                                    >
                                        是
                                    </CustomerButton>
                                    <CustomerButton
                                        type="default"
                                        className="is-helped-button"
                                        onClick={() => {
                                            sendIsHelp(false);
                                        }}
                                        disabled={haveAnswer}
                                    >
                                        否
                                    </CustomerButton>
                                </div>
                            </div>
                        </div>

                        <div className="side_section">
                            <div className="question-article-input-search">
                                <SearchInput onSearch={onSearch} enterButton="搜尋" placeholder="輸入關鍵字" />
                            </div>
                            <h3 className="qTitle">相關問題</h3>
                            {articleData.related && <Relative data={articleData.related} />}
                            <div className="slot_block">
                                <Carousel dots={{ className: 'dots' }} autoplay>
                                    {Array.isArray(ads) &&
                                        ads.map((e, i) => (
                                            <div key={i}>
                                                <a href={e.url} rel="noreferrer noopener">
                                                    <div
                                                        style={
                                                            clientWidth > 450
                                                                ? {
                                                                      backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${e.desktopImagePath})`,
                                                                  }
                                                                : {
                                                                      backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${e.mobileImagePath})`,
                                                                  }
                                                        }
                                                    ></div>
                                                </a>
                                            </div>
                                        ))}
                                </Carousel>
                            </div>
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
                    max-width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin: auto;
                }

                .article_section {
                    /* min-width: 777px; */
                    min-width: 600px;
                    width: 66%;
                    margin-right: 48px;
                }

                .article {
                    padding: 32px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    width: 100%;
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
                    border: none;
                    color: #d7e0ef;
                    background-color: #d7e0ef;
                    margin: 15.5px 0;
                }

                .article > .category-group > .category-question-group {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .article > .category-group > .category-time-group {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .article > .category-group > .category-time-group > div {
                    margin-top: 1.5px;
                }

                .article > .category-group > .category-question-group > p {
                    margin: 0 12px 0 0;
                    color: #0d1623;
                }

                .article > .category-group > .category-question-group span {
                    color: #3f5372;
                }

                .article > .category-group > .category-question-group span:last-of-type {
                    margin: 0 24px 0 0;
                    color: #3f5372;
                }

                .article > .category-group > .category-time-group > p {
                    margin: 0 12px 0 0;
                }

                .category-time-group > span {
                    color: #3f5372;
                }

                .side_section {
                    width: 30%;
                    max-width: 346px;
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
                    margin: 21px 0 16px;
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

                .qSection {
                    padding: 32px 31px 34px 32px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    margin-bottom: 16px;
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
                    /* font-family: PingFangTC; */
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

                .primary-button {
                    width: 44px;
                    height: 24px;
                    padding: 4px 4px 3px 5px;
                    color: #fff;
                    border-color: #c43826;
                    border-radius: 2px;
                    background-color: #c43826;
                    font-size: 12px;
                    cursor: pointer;
                }

                .primary-button:hover {
                    background-color: #ea6554;
                    color: #fff;
                    border-color: #ea6554;
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
                        width: 91.6vw;
                    }

                    .article_section {
                        width: 100%;
                    }

                    .title_group {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        height: initial;
                        width: 91.6vw;
                        margin: 0 auto 20px auto;
                    }

                    .title_group > h1 {
                        text-align: left;
                        width: 100%;
                        font-size: 28px;
                    }

                    .back_group {
                        display: flex;
                        justify-content: flex-end;
                    }

                    .article > p > img {
                        width: 100vw !important;
                    }

                    .category-question-group {
                        margin-bottom: 5px;
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
                        .back_group > .mobile_button {
                            width: 76vw;
                        }

                        .article > .category-group {
                            justify-content: flex-start;
                        }

                        .qTitle {
                            margin: 32px 16px 16px 0;
                        }

                        .tag_section {
                            margin: 0 16px;
                        }
                        .article {
                            padding: 24px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .article_wrapper {
                            display: flex;
                            flex-direction: column;
                            width: 100vw;
                        }

                        .back_group {
                            width: 100%;
                        }

                        .back_group > .customer-button {
                            margin-right: 10%;
                        }

                        .article > .category-group {
                            font-size: 14px;
                            flex-direction: column;
                        }

                        .category-question-group {
                            width: 100%;
                            margin-bottom: 5px;
                        }

                        .category-time-group {
                            width: 100%;
                        }

                        .title_group > h1 {
                            text-align: left;
                            width: 100%;
                            font-size: 20px;
                            margin-bottom: 12px;
                        }

                        .article {
                            padding: 16px 16px;
                            border-right: 0;
                            border-left: 0;
                        }
                        .article > h1 {
                            font-size: 20px;
                        }

                        .is-helped-button-group {
                            justify-content: space-between;
                        }

                        is-helped-button {
                            margin-right: 0;
                        }

                        .qTitle {
                            margin: 32px 16px 16px 16px;
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

                .ant-tabs-content-holder {
                    padding-bottom: 30px;
                }

                @media screen and (max-width: 768px) {
                    .questionArticleLayout {
                        padding: 20px 0;
                    }
                }

                .questionArticleWrapper {
                    width: 100%;
                    max-width: 1172px;
                }

                @media screen and (max-width: 1172px) {
                    .questionArticleWrapper {
                        width: 92%;
                    }
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

                .question-article-input-search .ant-input-search:hover,
                .question-article-input-search .ant-input-search:focus {
                    border-color: #d7e0ef !important;
                }

                .mobile_button .ant-input-search:hover,
                .mobile_button .ant-input-search:focus {
                    border-color: #d7e0ef;
                }

                .back_group > .default {
                    // margin-left: 16px;
                    border-color: #d7e0ef;
                }

                .article > .category-group > .category-question-group .rightIcon {
                    font-size: 10px;
                    margin: 0 4px 0 4px;
                    color: #3f5372;
                }

                .article > .category-group > .category-question-group .rightIcon svg {
                    margin-bottom: 1px;
                }

                article img,
                article .image-blot,
                article .img-container {
                    max-width: 100%;
                    height: 100%;
                }

                article .img-container > img {
                    width: 100% !important;
                    height: 100% !important;
                }

                article p {
                    font-size: 16px;
                    color: #0d1623;
                    margin-bottom: 1rem;
                }

                // toggle-list content box text color
                .ant-collapse-content .ant-collapse-content-box p {
                    color: #0d1623;
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

                article a,
                article a:hover {
                    color: #daa360;
                }

                .toggle-section {
                    margin: 10px 0;
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

                .is-helped-button-group {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                }

                .is-helped-button {
                    min-width: 105px;
                    min-height: 40px;
                    color: #0d1623;
                    border: 1px solid #d7e0ef;
                }

                .is-helped-button:first-of-type {
                    margin-right: 16px;
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

                .slot_block {
                    position: relative;
                    width: 100%;
                    max-width: 1600px;
                    height: 10vw;
                    max-height: 500px;
                }

                .slot_block div {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    text-align: center;
                    background-color: #fff;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    margin-bottom: 0;
                }

                .slot_block .dots li {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin: 0 4px;
                }

                .slot_block .dots li.slick-active {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    margin: 0 4px;
                }

                .slot_block .dots li button {
                    background-color: #d7e0ef;
                    opacity: 1;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .slot_block .dots li.slick-active button {
                    background-color: #c43826;
                }

                .slot_block .ant-carousel .slick-dots-bottom {
                    bottom: 0;
                }

                @media screen and (max-width: 768px) {
                    .questionArticleWrapper > .site-breadcrumb {
                        width: 91.6vw;
                    }

                    .side_section > .question-article-input-search {
                        display: none;
                    }

                    .web-back-to-list {
                        display: none;
                    }

                    .title_group {
                        position: relative;
                    }

                    .back_group {
                        width: 45vw;
                        position: absolute;
                        top: 0;
                        right: 0;
                    }

                    .back_group > .customer-button {
                        display: none;
                    }

                    .slot_block {
                        position: relative;
                        width: 100%;
                        max-width: 1125px;
                        height: 50vw;
                        max-height: 750px;
                    }

                    .slot_block div {
                        width: 100%;
                        height: 100%;
                    }
                }

                @media screen and (max-width: 450px) {
                    .back_group > .customer-button {
                        display: block;
                        margin-right: 5%;
                    }

                    .is-helped-button {
                        width: 50%;
                    }

                    .back_group {
                        position: relative;
                    }

                    .slot_block {
                        width: 92vw;
                        margin: 15.5px auto 24px auto;
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

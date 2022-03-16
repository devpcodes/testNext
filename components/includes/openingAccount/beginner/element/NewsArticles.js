import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import moment from 'moment';
import { checkServer } from '../../../../../services/checkServer';
import { postArticleList } from '../../../../../services/pages/index/postArticleList';
const richTabs = ['台股', '美股', '存股'];
function NewsArticles({ richClubNews, activeTab }) {
    const [data, setData] = useState([]);
    const [currKey, setCurrKey] = useState(activeTab);
    const { TabPane } = Tabs;
    useEffect(() => {
        getData(currKey);
    }, [currKey]);
    useEffect(() => {
        if (richClubNews?.length > 0) {
            setData(richClubNews);
        }
    }, [richClubNews]);
    const changeHandler = key => {
        setCurrKey(key);
    };
    const getData = async currKey => {
        try {
            const news = await postArticleList(3, currKey);
            console.log('news', news);
            setData(news);
        } catch (error) {}
    };
    return (
        <>
            <div className="card-container">
                <Tabs type="card" onChange={changeHandler}>
                    {richTabs.map((tab, tabIndex) => {
                        return checkServer() ? (
                            <TabPane tab={tab} key={tab} active={activeTab}>
                                <div className="card__container">
                                    {richClubNews?.map((item, index) => (
                                        <a href={item.originUrl} target="_blank" className="card" key={index}>
                                            <Card className="news-articles-card" hoverable>
                                                <div
                                                    className="icon"
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <article>{item.title}</article>
                                                <small>
                                                    {moment(Number(item.createdAt)).format('YYYY-MM-DD')}｜
                                                    {item.channel.name.CN}
                                                </small>
                                            </Card>
                                        </a>
                                    ))}
                                </div>
                            </TabPane>
                        ) : (
                            <TabPane tab={tab} key={tab} active={activeTab}>
                                <div className="card__container">
                                    {data?.map((item, index) => (
                                        <a href={item.originUrl} target="_blank" className="card" key={index}>
                                            <Card className="news-articles-card" hoverable>
                                                <div
                                                    className="icon"
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />
                                                <article>{item.title}</article>
                                                <small>
                                                    {moment(Number(item.createdAt)).format('YYYY-MM-DD')}｜
                                                    {item.channel.name.CN}
                                                </small>
                                            </Card>
                                        </a>
                                    ))}
                                </div>
                            </TabPane>
                        );
                    })}
                </Tabs>
                <a className="open-account--rich" href="https://www.sinotrade.com.tw/richclub/" target="_blank">
                    更多豐雲學堂文章 <RightOutlined />
                </a>
            </div>

            <style jsx>{`
                .card__container {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    /* flex-flow:row wrap; */
                }
                .card {
                    flex: 1;
                    margin-left: 32px;
                    margin-right: 32px;
                }

                .card:first-child {
                    margin-left: 0;
                    margin-right: 0;
                }
                .card:last-child {
                    margin-left: 0;
                    margin-right: 0;
                }

                .open-account--rich {
                    position: absolute;
                    width: 152px;
                    right: 0;
                    bottom: -20px;
                    height: 22px;
                    margin: 0;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    -webkit-letter-spacing: 0.4px;
                    -moz-letter-spacing: 0.4px;
                    -ms-letter-spacing: 0.4px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .card__wrapper {
                    margin-bottom: 40px;
                }
                @media screen and (max-width: 990px) {
                    .card__container {
                        flex-wrap: wrap;
                    }
                    .card {
                        flex: 0 0 48.7%;
                        margin-left: 0;
                        margin-right: 0;
                    }
                    .card:first-child {
                        margin-right: 1.3%;
                        margin-bottom: 2.6%;
                    }
                }
                @media screen and (max-width: 767px) {
                    .card__container {
                        flex-wrap: wrap;
                    }
                    .card {
                        flex: 0 0 100%;
                        margin-left: 0;
                        margin-right: 0;
                        margin-bottom: 2.6%;
                    }
                    .card:first-child {
                        /* margin-right: 1.3%; */
                        margin-bottom: 2.6%;
                    }
                    .open-account--rich {
                        position: absolute;
                        right: 30px;
                        bottom: 32px;
                    }
                }
                @media screen and (max-width: 450px) {
                    .open-account--rich {
                        position: absolute;
                        right: 3%;
                        bottom: 16px;
                    }
                }
            `}</style>
            <style jsx global>
                {`
                    .news-articles-layout.ant-layout {
                        position: relative;
                        padding-top: 9px;
                        background-color: #f9fbff;
                        padding-bottom: 0px;
                    }

                    .news-articles-card {
                        bottom: 0;
                        text-align: left;
                        border: solid 1px #e6ebf5;
                        background-color: #fff;
                        transition: bottom 0.5s;
                    }

                    .news-articles-card:hover {
                        position: relative;
                        bottom: 1rem;
                        box-shadow: 1px 1px 15px 0 rgba(169, 182, 203, 0.4);
                    }

                    .news-articles-card .icon {
                        width: 100%;
                        min-height: 8vw;
                        background-color: #f5f6fb;
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .news-articles-card article {
                        margin: 12px 0 16px;
                        font-size: 18px;
                        font-weight: 700;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.44;
                        letter-spacing: normal;
                        color: #0d1623;
                        height: 52px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }

                    .news-articles-card small {
                        display: inline-block;
                        font-size: 12px;
                        font-weight: 500;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        color: #6c7b94;
                    }

                    .news-articles-card small::before {
                        content: '';
                        position: relative;
                        display: block;
                        width: 26px;
                        height: 3px;
                        margin-bottom: 10px;
                        background-color: #daa360;
                    }
                    .card-container {
                        width: 100%;
                    }
                    .card-container p {
                        margin: 0;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-content {
                        height: auto;
                        margin-top: -16px;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
                        padding: 32px 0 0px;
                    }

                    .card-container > .ant-tabs-card > .ant-tabs-nav::before {
                        display: none;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab {
                        background: transparent;
                        border-color: transparent;
                        width: 116px;
                        height: 40px;
                        padding: 9px 41.2px 9px 41.8px;
                        background-color: #d7e0ef;
                        border-radius: 30.5px !important;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab .ant-tabs-tab-btn {
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        text-align: center;
                        color: #3f5372;
                    }
                    .card-container .ant-tabs-card {
                        width: 100%;
                    }
                    .card-container .ant-tabs-card.ant-tabs-bottom > .ant-tabs-nav .ant-tabs-tab:not(:last-of-type),
                    .card-container
                        .ant-tabs-card.ant-tabs-bottom
                        > div
                        > .ant-tabs-nav
                        .ant-tabs-tab:not(:last-of-type),
                    .card-container .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab:not(:last-of-type),
                    .card-container .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab:not(:last-of-type) {
                        margin-right: 16px;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab:hover {
                        background: transparent;
                        border-color: transparent;
                        background-color: #0d1623;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab-active {
                        background: transparent;
                        border-color: transparent;
                        background-color: #0d1623;
                    }

                    .card-container .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
                    .card-container .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
                        border-bottom-color: transparent;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab-active .ant-tabs-tab-btn {
                        color: #fff;
                        font-weight: 600;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-tab:hover .ant-tabs-tab-btn {
                        color: #fff !important;
                    }

                    .news-articles-layout.ant-layout .open-account {
                        position: absolute;
                        width: 152px;
                        right: 0;
                        bottom: 0;
                        height: 22px;
                        margin: 0;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    @media screen and (max-width: 768px) {
                        .ant-layout.news-articles-layout .ant-col:nth-of-type(3) {
                            display: none;
                        }

                        .news-articles-card .icon {
                            min-height: 20.182vw;
                        }

                        .news-articles-card small {
                            display: inline-block;
                            font-size: 12px;
                            font-weight: 500;
                            font-stretch: normal;
                            font-style: normal;
                            line-height: normal;
                            letter-spacing: normal;
                            color: #6c7b94;
                        }

                        .news-articles-card .customer-button {
                            border-radius: 0.26vw;
                        }

                        .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
                            padding: 24px 0 24px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .ant-layout.news-articles-layout .ant-col:nth-of-type(3) {
                            display: block;
                        }

                        .news-articles-card .icon {
                            min-height: 154px;
                        }

                        .news-articles-layout.ant-layout {
                            padding-top: 4px;
                            width: 100%;
                        }

                        .card-container > .ant-tabs-card .ant-tabs-tab {
                            width: 27.467vw;
                            padding: 9px 34.7px 9px 35.3px;
                        }

                        .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
                            padding: 16px 0 16px;
                        }

                        .card-container .ant-tabs-card.ant-tabs-bottom > .ant-tabs-nav .ant-tabs-tab:not(:last-of-type),
                        .card-container
                            .ant-tabs-card.ant-tabs-bottom
                            > div
                            > .ant-tabs-nav
                            .ant-tabs-tab:not(:last-of-type),
                        .card-container .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab:not(:last-of-type),
                        .card-container
                            .ant-tabs-card.ant-tabs-top
                            > div
                            > .ant-tabs-nav
                            .ant-tabs-tab:not(:last-of-type) {
                            margin-right: 17px;
                        }

                        .card-container .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab:nth-of-type(3) {
                            margin-right: 0px;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default NewsArticles;

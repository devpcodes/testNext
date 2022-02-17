import { Layout, Row, Col, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';

function NewsArticles({ linkData }) {
    const { TabPane } = Tabs;

    return (
        <Layout className="news-articles-layout">
            <div className="card-container">
                <Tabs type="card">
                    {linkData.map((item, index) => (
                        <TabPane tab={item.type} key={index}>
                            <Row
                                gutter={[
                                    { xs: 0, sm: 0, md: 16, lg: 32 },
                                    { xs: 16, sm: 16, md: 16, lg: 32 },
                                ]}
                                className="news-articles"
                            >
                                {item.value.map((e, i) => (
                                    <Col key={i} className="gutter-row" xs={24} sm={24} md={12} lg={8}>
                                        <a href={e.link}>
                                            <Card className="news-articles-card" hoverable>
                                                <div className="icon" style={{ backgroundImage: `url(${e.image})` }} />
                                                <article>{e.text}</article>
                                                <small>
                                                    {e.date}｜{e.news}
                                                </small>
                                            </Card>
                                        </a>
                                    </Col>
                                ))}
                            </Row>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
            <a className="open-account" href="https://www.sinotrade.com.tw/richclub/" target="_blank">
                更多豐雲學堂文章 <RightOutlined />
            </a>
            <style jsx global>
                {`
                    .news-articles-layout.ant-layout {
                        position: relative;
                        padding-top: 9px;
                        background-color: #f9fbff;
                        padding-bottom: 38px;
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
                        box-shadow: 0 1px 2px -2px rgb(169 182 203 / 40%), 0 3px 6px 0 rgb(169 182 203 / 40%),
                            0 5px 12px 4px rgb(169 182 203 / 40%);
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
                        font-weight: 500;
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

                    .card-container p {
                        margin: 0;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-content {
                        height: auto;
                        margin-top: -16px;
                    }

                    .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
                        padding: 32px 0 0;
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
                            padding: 24px 0 0;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .ant-layout.news-articles-layout .ant-col:nth-of-type(3) {
                            display: block;
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
                            padding: 16px 0 0;
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
        </Layout>
    );
}

export default NewsArticles;

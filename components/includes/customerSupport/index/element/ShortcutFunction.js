import { Layout, Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const ShortcutFunction = ({ linkData }) => {
    const router = useRouter();

    const openLink = (site, link, target) => {
        if (site === 'inner') {
            router.push(`${link}`);
        } else if (site === 'outer') {
            window.open(link, target);
        }
    };

    return (
        <Layout>
            <Row gutter={[16, 16]} className="fastLinkButtons">
                {linkData.map((item, index) => (
                    <Col key={index} className="gutter-row" xs={8} sm={6} md={6} lg={4}>
                        <Card
                            className="customerSupportCard"
                            hoverable
                            onClick={() => {
                                openLink(item.site, item.link, item.target);
                            }}
                        >
                            <div className="shortcutFunctionIcon" style={{ backgroundImage: `url(${item.image})` }} />
                            {index === 1 ? (
                                <p className="shortcutFunctionIconText">
                                    <span className="pc-show">{item.title}</span>
                                    <span className="mobile-show">開戶查詢</span>
                                </p>
                            ) : (
                                <p className="shortcutFunctionIconText">{item.title}</p>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
            <style jsx global>{`
                .fastLinkButtons {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-top: 16px;
                }

                .customerSupportCard {
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-heigh: 140px;
                    border: 1px solid #d7e0ef;
                    transition: bottom 0.5s;
                }

                // .ant-card:hover {
                //     box-shadow: rgba(108, 123, 148, 0.2);
                // }

                .customerSupportCard:hover {
                    position: relative;
                    border: 1px solid #d7e0ef;
                    bottom: 1rem;
                    // box-shadow: 0 1px 2px -2px rgba(215, 224, 239, 0.56), 0 3px 6px 0 rgba(215, 224, 239, 0.52),
                    //     0 5px 12px 4px rgba(215, 224, 239, 0.49);
                    box-shadow: 0 1px 2px -2px rgb(169 182 203 / 40%), 0 3px 6px 0 rgb(169 182 203 / 40%),
                        0 5px 12px 4px rgb(169 182 203 / 40%);
                }

                .shortcutFunctionIcon {
                    width: 60px;
                    height: 60px;
                    margin: auto;
                    background-size: cover;
                    background-position: center;
                }

                .shortcutFunctionIconText {
                    color: #0d1623;
                    font-size: 16px;
                    white-space: nowrap;
                    margin-bottom: 0;
                }

                .pc-show {
                    display: block;
                }

                .mobile-show {
                    display: none;
                }

                @media screen and (max-width: 450px) {
                    .fastLinkButtons {
                        width: calc(100% + 16px);
                    }

                    .fastLinkButtons .customerSupportCard {
                        padding: 12px 18px 8px;
                        min-heigh: 90px;
                    }

                    .fastLinkButtons .ant-card-body {
                        padding: 0;
                    }

                    .pc-show {
                        display: none;
                    }

                    .mobile-show {
                        display: block;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default ShortcutFunction;

ShortcutFunction.propTypes = {
    linkData: PropTypes.array,
};

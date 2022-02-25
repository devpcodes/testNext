import { Layout, Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';

const SecuritiesAccountMenu = ({ linkData }) => {
    return (
        <Layout>
            <Row
                gutter={[
                    { xs: 16, sm: 16, md: 16, lg: 32 },
                    { xs: 16, sm: 16, md: 16, lg: 32 },
                ]}
                className="securitiesAcctMenuBtn"
            >
                {linkData.map((item, index) => (
                    <Col key={index} className="gutter-row" xs={12} sm={12} md={6} lg={6}>
                        <Card className="open-account-card" hoverable onClick={() => window.open(item.link)}>
                            <div className="shortcutFunctionIcon" style={{ backgroundImage: `url(${item.image})` }} />
                            <p className="shortcutFunctionIconText">{item.title}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <style jsx global>{`
                .securitiesAcctMenuBtn {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-top: 16px;
                    margin-bottom: 34px !important;
                }

                .securitiesAcctMenuBtn .open-account-card {
                    bottom: 0;
                    display: flex;
                    padding: 24px 76px;
                    border-radius: 2px;
                    justify-content: center;
                    align-items: center;
                    min-heigh: 142px;
                    border: 1px solid #d7e0ef;
                    background-color: #fff;
                    transition: bottom 0.5s;
                }

                // .ant-card:hover {
                //     box-shadow: rgba(108, 123, 148, 0.2);
                // }

                .securitiesAcctMenuBtn .open-account-card:hover {
                    position: relative;
                    bottom: 1rem;
                    box-shadow: 1px 1px 15px 0 rgba(169, 182, 203, 0.4);
                }

                .securitiesAcctMenuBtn .shortcutFunctionIcon {
                    width: 60px;
                    height: 60px;
                    margin: auto;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .securitiesAcctMenuBtn .shortcutFunctionIconText {
                    color: #0d1623;
                    font-size: 16px;
                    white-space: nowrap;
                    margin-top: 12px;
                    margin-bottom: 0px;
                }

                .securitiesAcctMenuBtn .ant-card-body {
                    padding: 0;
                }

                @media screen and (max-width: 768px) {
                    .securitiesAcctMenuBtn {
                        margin-bottom: 32px !important;
                    }

                    .securitiesAcctMenuBtn .open-account-card {
                        padding: 16px 52px;
                        min-heigh: 126px;
                    }

                    .securitiesAcctMenuBtn .shortcutFunctionIconText {
                        letter-spacing: 0.4px;
                    }
                }

                @media screen and (max-width: 450px) {
                    .securitiesAcctMenuBtn {
                        width: calc(100% + 8px);
                        margin-top: 0;
                        margin-bottom: 16px !important;
                    }

                    .securitiesAcctMenuBtn .open-account-card {
                        padding: 16px 60px;
                        min-heigh: 106px;
                    }

                    .securitiesAcctMenuBtn .shortcutFunctionIcon {
                        width: 44px;
                        height: 44px;
                        margin: auto;
                    }

                    .securitiesAcctMenuBtn .shortcutFunctionIconText {
                        color: #0d1623;
                        font-size: 16px;
                        white-space: nowrap;
                        letter-spacing: 0.4px;
                        margin-top: 8px;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default SecuritiesAccountMenu;

SecuritiesAccountMenu.propTypes = {
    linkData: PropTypes.array,
};

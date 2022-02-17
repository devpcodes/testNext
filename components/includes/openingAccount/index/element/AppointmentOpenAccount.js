import { Layout, Row, Col, Card } from 'antd';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const AppointmentOpenAccount = ({ linkData }) => {
    const router = useRouter();

    return (
        <Layout>
            <Row
                gutter={[
                    { xs: 16, sm: 16, md: 16, lg: 32 },
                    { xs: 16, sm: 16, md: 16, lg: 32 },
                ]}
                className="appointmentOpnAcctBtn"
            >
                {linkData.map((item, index) => (
                    <Col key={index} className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                        <Card
                            className="open-account-card"
                            hoverable
                            onClick={() => (index === 1 ? router.push(item.link) : window.open(item.link))}
                        >
                            <div className="shortcutFunctionIcon" style={{ backgroundImage: `url(${item.image})` }} />
                            <p className="shortcutFunctionIconText">{item.title}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <style jsx global>{`
                .appointmentOpnAcctBtn {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    margin-top: 16px;
                    margin-bottom: 34px !important;
                }

                .appointmentOpnAcctBtn .open-account-card {
                    bottom: 0;
                    display: flex;
                    border-radius: 2px;
                    justify-content: center;
                    align-items: center;
                    min-heigh: 230px;
                    padding: 0 0 24px;
                    border: 1px solid #d7e0ef;
                    background-color: #fff;
                    transition: bottom 0.5s;
                }

                .appointmentOpnAcctBtn .open-account-card .ant-card-body {
                    width: 100%;
                    padding: 0;
                }

                // .ant-card:hover {
                //     box-shadow: rgba(108, 123, 148, 0.2);
                // }

                .appointmentOpnAcctBtn .open-account-card:hover {
                    position: relative;
                    bottom: 1rem;
                }

                .appointmentOpnAcctBtn .shortcutFunctionIcon {
                    min-height: 154px;
                    margin: auto;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .appointmentOpnAcctBtn .shortcutFunctionIconText {
                    color: #0d1623;
                    white-space: nowrap;
                    margin-top: 24px;
                    margin-bottom: 0;
                    font-size: 20px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.5px;
                    text-align: center;
                }

                @media screen and (max-width: 768px) {
                    .appointmentOpnAcctBtn {
                        margin-bottom: 0 !important;
                    }

                    .appointmentOpnAcctBtn .open-account-card {
                        min-heigh: 172px;
                        padding: 0 0 16px;
                    }

                    .appointmentOpnAcctBtn .shortcutFunctionIcon {
                        min-height: 118px;
                    }

                    .appointmentOpnAcctBtn .shortcutFunctionIconText {
                        margin-top: 16px;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        font-weight: 500;
                    }
                }

                @media screen and (max-width: 450px) {
                    .appointmentOpnAcctBtn {
                        width: calc(100% + 8px);
                        margin-top: 0;
                        margin-bottom: 16px !important;
                    }

                    .appointmentOpnAcctBtn .open-account-card {
                        min-heigh: 232px;
                        padding: 0 0 16px;
                    }

                    .appointmentOpnAcctBtn .shortcutFunctionIcon {
                        min-height: 180px;
                    }

                    .appointmentOpnAcctBtn .shortcutFunctionIconText {
                        margin-top: 16px;
                        font-size: 16px;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: 0.35px;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default AppointmentOpenAccount;

AppointmentOpenAccount.propTypes = {
    linkData: PropTypes.array,
};

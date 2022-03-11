import { Layout, Row, Col, Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomerButton from '../../../customerSupport/CustomerButton';

function ElectronicTrading({ linkData }) {
    const router = useRouter();

    return (
        <Layout className="E-trading-layout">
            <Row
                gutter={[
                    { xs: 0, sm: 0, md: 16, lg: 32 },
                    { xs: 16, sm: 16, md: 16, lg: 32 },
                ]}
                className="E-trading"
            >
                {linkData.map((item, index) => (
                    <Col key={index} className="gutter-row" xs={24} sm={24} md={12} lg={8}>
                        <Card className="E-trading-card" hoverable>
                            <div className="icon" style={{ backgroundImage: `url(${item.image})` }} />
                            <div className="data-box">
                                <h3>{item.title}</h3>
                                <small>{item.version}</small>
                            </div>
                            <p className="text">{item.des}</p>
                            <CustomerButton
                                type="primary"
                                onClick={() => (index === 1 ? router.push(item.link) : window.open(item.link))}
                            >
                                {item.btnName}
                            </CustomerButton>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Link href={'/trading-platform'}>
                <a className="open-account">
                    更多電子交易平台 <RightOutlined />
                </a>
            </Link>
            <style jsx global>
                {`
                    .ant-layout.E-trading-layout {
                        position: relative;
                        background-color: #f9fbff;
                        padding-bottom: 6px;
                    }

                    .E-trading-card {
                        bottom: 0;
                        text-align: left;
                        border: solid 1px #d7e0ef;
                        background-color: #fff;
                        transition: bottom 0.5s;
                    }

                    .E-trading-card:hover {
                        position: relative;
                        bottom: 1rem;
                    }

                    .E-trading-card .icon {
                        width: 100%;
                        min-height: 8vw;
                        background-color: rgba(230, 235, 245, 0.3);
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .E-trading-card h3 {
                        margin: 12px 0 4px;
                        font-size: 20px;
                        font-weight: 700;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.3;
                        letter-spacing: normal;
                        color: #0d1623;
                    }

                    .E-trading-card small {
                        display: inline-block;
                        margin-bottom: 16px;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: -0.18px;
                        color: #3f5372;
                    }

                    .E-trading-card .text {
                        margin-bottom: 24px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.63;
                        letter-spacing: -0.2px;
                        color: #0d1623;
                        height: 105px;
                    }

                    .E-trading-card .text:hover {
                        background-color: #fff;
                    }

                    .E-trading-card .customer-button {
                        width: 100%;
                        margin-bottom: 0px;
                        border-radius: 0.125vw;
                    }

                    .ant-layout.E-trading-layout .open-account {
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
                        .ant-layout.E-trading-layout {
                            padding-bottom: 22px;
                        }

                        .ant-layout.E-trading-layout .ant-col:nth-of-type(3) {
                            display: none;
                        }

                        .E-trading-card .icon {
                            min-height: 20.182vw;
                        }

                        .E-trading-card h3 {
                            margin: 16px 0 4px;
                        }

                        .E-trading-card small {
                            margin-bottom: 12px;
                        }

                        .E-trading-card .text {
                            margin-bottom: 16px;
                            font-size: 18px;
                            font-weight: 500;
                            line-height: 1.44;
                            letter-spacing: normal;
                        }

                        .E-trading-card .customer-button {
                            border-radius: 0.26vw;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .ant-layout.E-trading-layout {
                            padding-bottom: 16px;
                        }

                        .ant-layout.E-trading-layout .ant-col:nth-of-type(3) {
                            display: block;
                        }

                        .E-trading-card .ant-card-body {
                            padding: 0;
                            flex-direction: row;
                            display: flex;
                        }

                        .E-trading-card .icon {
                            width: 42.667vw;
                            margin-right: 16px;
                        }

                        .E-trading-card .data-box {
                            display: flex;
                            flex-direction: column;
                        }

                        .E-trading-card .text,
                        .E-trading-card .customer-button {
                            display: none;
                        }
                    }
                `}
            </style>
        </Layout>
    );
}

export default ElectronicTrading;

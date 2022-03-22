import { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import CustomerButton from '../../../includes/customerSupport/CustomerButton';
import YellowRedLine from '../element/YellowRedLine';
import bg from '../../../../resources/images/pages/homepage/second_banner/man-on-target.svg';

const SecondBanner = () => {
    const [customerActive, setCustomerActive] = useState(true);
    const [monthActive, setMonthActive] = useState(true);
    const [productActive, setProductActive] = useState(true);
    const clickButton = () => {
        window.open(
            'https://www.sinotrade.com.tw/openact?utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=button_top&strProd=0037&strWeb=0035',
            '_blank',
        );
    };

    return (
        <div className="second-banner-container-box">
            <div className="second-banner-container">
                <div className="second-banner-texts">
                    <h2>一站式投資全球，證券交易的領航者</h2>
                    <p>台股、美股、港股、陸股及日股全球交易零時差</p>
                    <YellowRedLine />
                    <div className="second-banner-number-group">
                        <div className="number-group">
                            <VisibilitySensor
                                partialVisibility
                                offset={{ bottom: 500 }}
                                active={customerActive}
                                onChange={isVisible => isVisible && setCustomerActive(false)}
                            >
                                {({ isVisible }) => <span>{isVisible ? <CountUp end={120} duration={3} /> : '0'}</span>}
                            </VisibilitySensor>
                            <span className="plus">+</span>
                            <span>萬</span>
                            <p>用戶數</p>
                        </div>
                        <div className="number-group">
                            <VisibilitySensor
                                partialVisibility
                                offset={{ bottom: 500 }}
                                active={monthActive}
                                onChange={isVisible => isVisible && setMonthActive(false)}
                            >
                                {({ isVisible }) => (
                                    <span>{isVisible ? <CountUp delay={1} end={3771} duration={3} /> : '0'}</span>
                                )}
                            </VisibilitySensor>
                            <span className="plus">+</span>
                            <span>億</span>
                            <p>每月交易額</p>
                        </div>
                        <div className="number-group">
                            <VisibilitySensor
                                partialVisibility
                                offset={{ bottom: 500 }}
                                active={productActive}
                                onChange={isVisible => isVisible && setProductActive(false)}
                            >
                                {({ isVisible }) => (
                                    <span>{isVisible ? <CountUp delay={2} end={46} duration={3} /> : '0'}</span>
                                )}
                            </VisibilitySensor>
                            <span>種</span>
                            <p>理財商品</p>
                        </div>
                    </div>
                    <CustomerButton type="primary" onClick={clickButton}>
                        立即開戶
                    </CustomerButton>
                </div>
                <div className="second-banner-image" style={{ backgroundImage: `url(${bg})` }} />
            </div>
            <style jsx>
                {`
                    .second-banner-container-box {
                        background-color: #e6ebf5;
                    }

                    .second-banner-container {
                        display: flex;
                        justify-content: center;
                        min-height: 405px;
                        height: auto;
                        padding: 56px 1.5rem;
                        width: 80%;
                        margin: 0 auto;
                    }

                    .second-banner-texts {
                        z-index: 1;
                        width: 50%;
                    }

                    h2 {
                        margin: 0 0 8px 0;
                        font-size: 36px;
                        font-weight: 600;
                        letter-spacing: 0.9px;
                        color: #0d1623;
                    }

                    .second-banner-texts > p {
                        margin: 8px 0 24px 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #0d1623;
                    }

                    .second-banner-number-group {
                        display: flex;
                        width: 40%;
                        margin-top: 8px;
                    }

                    .number-group {
                        margin-right: 3vw;
                    }

                    .number-group:last-of-type {
                        min-width: 100px;
                    }

                    .number-group > span:first-of-type,
                    .plus {
                        font-size: 48px;
                        font-weight: bold;
                        letter-spacing: normal;
                        color: #0d1623;
                    }

                    .number-group > span:last-of-type {
                        margin-left: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        color: #0d1623;
                    }

                    .number-group > p {
                        margin: 0;
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #3f5372;
                    }

                    .second-banner-image {
                        width: 50%;
                        margin-left: 1.25vw;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    @media screen and (max-width: 1250px) {
                        .second-banner-container {
                            width: 90%;
                            min-height: 405px;
                            position: relative;
                            padding-top: 7.292vw;
                            padding-bottom: 56px;
                        }

                        .second-banner-texts {
                            z-index: 1;
                            width: 100%;
                        }

                        .second-banner-number-group {
                            z-index: 1;
                        }

                        .second-banner-image {
                            z-index: 0;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 41.667vw;
                            height: 29.948vw;
                            margin-left: 0;
                            background-position: right;
                        }
                    }

                    @media screen and (max-width: 820px) {
                        .second-banner-image {
                            width: 32.552vw;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .second-banner-container {
                            padding: 24px;
                            width: 100%;
                        }

                        h2 {
                            font-size: 20px;
                        }

                        .second-banner-texts > p {
                            margin-bottom: 12px;
                        }

                        .number-group > span:first-of-type,
                        .plus {
                            font-size: 28px;
                        }

                        .second-banner-image {
                            width: 34.933vw;
                            height: 32vw;
                        }
                    }
                `}
            </style>
            <style jsx global>{`
                .second-banner-container .ant-btn {
                    width: 160px;
                    height: 48px;
                    margin-top: 37px;
                }

                @media screen and (max-width: 450px) {
                    .second-banner-container .ant-btn {
                        height: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SecondBanner;
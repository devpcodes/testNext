import React from 'react';
import CustomerButton from '../../../includes/customerSupport/CustomerButton';
import YellowRedLine from '../element/YellowRedLine';
import bg from '../../../../resources/images/pages/homepage/second_banner/man-on-target.svg';

const SecondBanner = () => {
    const clickButton = () => {
        window.open(
            'https://www.sinotrade.com.tw/openact?utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=button_top&strProd=0037&strWeb=0035',
            '_blank',
        );
    };

    return (
        <>
            <div className="second-banner-container">
                <div className="second-banner-texts">
                    <h2>一站式投資全球，證券交易的領航者</h2>
                    <p>台股、美股、港股、陸股及日股全球交易零時差</p>
                    <YellowRedLine />
                    <div className="second-banner-number-group">
                        <div className="number-group">
                            <span>120</span>
                            <span className="plus">+</span>
                            <span>萬</span>
                            <p>用戶數</p>
                        </div>
                        <div className="number-group">
                            <span>3771</span>
                            <span className="plus">+</span>
                            <span>億</span>
                            <p>每月交易額</p>
                        </div>
                        <div className="number-group">
                            <span>46</span>
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
                    .second-banner-container {
                        display: flex;
                        justify-content: center;
                        min-height: 405px;
                        height: auto;
                        padding: 56px 8%;
                        background-color: #e6ebf5;
                    }

                    .second-banner-texts {
                        z-index: 1;
                        width: 50%;
                    }

                    h2 {
                        margin: 0 20px 8px 0;
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
                        width: 30%;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    @media screen and (max-width: 1100px) {
                        .second-banner-texts {
                            z-index: 1;
                            width: 60%;
                        }

                        .second-banner-image {
                            width: 40%;
                        }
                    }

                    @media screen and (max-width: 795px) {
                        .second-banner-container {
                            min-height: 405px;
                            position: relative;
                        }

                        .second-banner-texts {
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
                            width: 250px;
                            height: 230px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .second-banner-container {
                            padding: 24px;
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
                            width: 131px;
                            height: 120px;
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
        </>
    );
};

export default SecondBanner;

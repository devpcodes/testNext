import React, { useState, useEffect } from 'react';
import CustomerButton from '../../customerSupport/CustomerButton';
import YellowRedLine from './YellowRedLine';

import appBgWeb from '../../../../resources/images/pages/homepage/app_download_section/a1-d-02.jpg';
import appBgTablet from '../../../../resources/images/pages/homepage/app_download_section/a1-t-02.jpg';
import appBgMobile from '../../../../resources/images/pages/homepage/app_download_section/a1-m-02.jpg';
import android from '../../../../resources/images/pages/homepage/app_download_section/img-android.svg';
import ios from '../../../../resources/images/pages/homepage/app_download_section/img-i-os.svg';
import qrCode from '../../../../resources/images/pages/homepage/app_download_section/codeandborder.svg';

const AppDownloadSection = () => {
    const [isQrCodeShow, setIsQrCodeShow] = useState(false);

    const setQrCodeShow = () => {
        setIsQrCodeShow(true);
    };

    const setQrCodeHide = () => {
        setIsQrCodeShow(false);
    };

    const download = () => {
        window.open('https://www.sinotrade.com.tw/richclub/dawhotou/campaign/app', '_blank');
    };

    return (
        <>
            <div className="app-download-container">
                <div className="app-download-left">
                    <h3>首選交易工具 大戶投APP</h3>
                    <p>投資超捷徑，理財PRO 簡單！</p>
                    <YellowRedLine />
                    <p className="description">
                        一站式交易台股、美股，投資訊息即時推播隨時掌握交易動態，不再錯過最佳買賣時機！
                    </p>
                    <div className="app-icons-wrap">
                        <img src={android} alt="android" />
                        <div className="v-line" />
                        <img src={ios} alt="ios" />
                    </div>
                    <div className="btn-box">
                        <CustomerButton
                            type="default"
                            className="web-download"
                            onMouseEnter={setQrCodeShow}
                            onMouseLeave={setQrCodeHide}
                        >
                            立即下載
                        </CustomerButton>
                        {isQrCodeShow ? <div className="download-qr-code"></div> : null}
                    </div>
                    <CustomerButton className="mobile-download" onClick={download}>
                        立即下載
                    </CustomerButton>
                </div>
            </div>
            <style jsx>
                {`
                    .app-download-container {
                        width: 100%;
                        height: fit-content;
                        background-image: url(${appBgWeb});
                        background-size: cover;
                        background-position: center;
                    }

                    .app-download-left {
                        width: 80%;
                        height: fit-content;
                        padding-top: 4%;
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                        margin: 0 auto;
                    }

                    h3 {
                        font-size: 36px;
                        margin-bottom: 0;
                        font-weight: 600;
                        letter-spacing: 0.9px;
                        color: #fff;
                    }

                    .app-download-left > p:first-of-type,
                    .description {
                        font-size: 16px;
                        letter-spacing: 0.4px;
                        color: #fff;
                    }

                    .app-download-left > p {
                        margin-bottom: 20px;
                    }

                    .description {
                        width: 70%;
                        margin-top: 20px;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    .app-icons-wrap {
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                    }

                    .v-line {
                        height: 16px;
                        margin: 0 6px 0 6px;
                        border: 0.5px solid white;
                    }

                    @media screen and (max-width: 1250px) {
                        .app-download-left {
                            width: 90%;
                        }

                        .description {
                            width: 47.52vw;
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        .app-download-left {
                            width: 100%;
                            padding-left: 3rem;
                            padding-right: 3rem;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .app-download-container {
                            width: 100%;
                            min-height: 392px;
                            background-image: url(${appBgTablet});
                        }

                        .app-download-left {
                            // margin: 0 0 0 8%;
                            padding-top: 7%;
                        }
                    }

                    @media screen and (max-width: 600px) {
                        .app-download-left {
                            // margin: 0 0 0 5%;
                            padding-top: 5%;
                        }

                        h3 {
                            white-space: nowrap;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .app-download-container {
                            background-image: url(${appBgMobile});
                            padding: 24px;
                            height: 318px;
                        }

                        .app-download-left {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            height: 318px;
                        }

                        h3 {
                            margin: 0 0 8px 0;
                            font-size: 20px;
                            font-weight: 600;
                            letter-spacing: 0.5px;
                            color: #fff;
                        }

                        .app-download-left > p:first-of-type {
                            margin: 0;
                            margin-bottom: 12px;
                            font-size: 16px;
                            letter-spacing: 0.4px;
                            color: #fff;
                        }

                        .description {
                            width: 100%;
                            margin: 16px 0 16px 0;
                            font-size: 16px;
                            letter-spacing: 0.4px;
                            color: #fff;
                        }

                        .app-icons-wrap {
                            margin-bottom: 32px;
                        }

                        .download-qr-code {
                            display: none;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .app-download-left .ant-btn {
                        width: 160px;
                        height: 48px;
                    }

                    .app-download-left .ant-btn {
                        margin-bottom: 56px;
                    }

                    .app-download-left .ant-btn:focus,
                    .app-download-left .ant-btn:hover {
                        color: rgba(0, 0, 0, 0.65);
                        border-color: transparent;
                    }

                    .btn-box {
                        position: relative;
                    }

                    .download-qr-code {
                        position: absolute;
                        z-index: 1;
                        // opacity: 0;
                        // display: none;
                        width: 232px;
                        height: 241px;
                        background-image: url(${qrCode});
                        background-size: cover;
                        background-position: center;
                        -webkit-box-shadow: 14px 14px 20px -14px rgba(185, 189, 199, 1);
                        -moz-box-shadow: 14px 14px 20px -14px rgba(185, 189, 199, 1);
                        box-shadow: 14px 14px 20px -14px rgba(185, 189, 199, 1);
                        bottom: -187px;
                        left: -40px;
                    }

                    .web-download > span,
                    .mobile-download > span {
                        font-size: 16px;
                    }

                    // .ant-btn:hover .download-qr-code {
                    //     opacity: 1;
                    //     display: block;
                    // }

                    .mobile-download {
                        display: none;
                    }

                    @media screen and (max-width: 450px) {
                        .web-download {
                            display: none;
                        }

                        .mobile-download {
                            display: block;
                        }

                        .app-download-left .ant-btn {
                            width: 160px;
                            height: 40px;
                        }

                        // .app-download-left .ant-btn:focus,
                        // .app-download-left .ant-btn:hover {
                        //   color: rgba(0,0,0,.65);
                        //   border-color: transparent;
                        // }
                    }
                `}
            </style>
        </>
    );
};

export default AppDownloadSection;

// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Space } from 'antd';
import CustomerButton from '../../../customerSupport/CustomerButton';
import { RightOutlined } from '@ant-design/icons';

import bgd from '../../../../../resources/images/pages/customer_support/a41-d-01.jpg';
import bgt from '../../../../../resources/images/pages/customer_support/a41-t-01.jpg';
import bgm from '../../../../../resources/images/pages/customer_support/a41-m-01.jpg';

const OpenAccountHeader = ({ defaultValue, value, onInput, onPressEnter }) => {
    const { Header } = Layout;

    return (
        <>
            <Header className="open-account-header">
                <div className="header-box">
                    <h1>永豐金證券線上開戶</h1>
                    <h2>新朋友線上開戶須為年滿20歲之本國籍自然人，只要備妥雙證件及永豐銀行帳戶，便可立即線上開戶。</h2>
                    <div className="open-account-header-btn-box">
                        <Space className="open-account-header-btn">
                            <CustomerButton
                                type="primary"
                                onClick={() =>
                                    window.open('https://www.sinotrade.com.tw/openact?strProd=0037&strWeb=0035')
                                }
                            >
                                開證券帳戶
                            </CustomerButton>
                            <CustomerButton
                                onClick={() =>
                                    window.open(
                                        'https://www.sinotrade.com.tw/openact/progress?strProd=0037&strWeb=0035',
                                    )
                                }
                            >
                                進度查詢
                            </CustomerButton>
                        </Space>
                        <a className="open-dawho" href="https://dawho.tw/hot/dawhotou/" target="_blank">
                            開銀行大戶 <RightOutlined />
                        </a>
                    </div>
                </div>
                {/* <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} /> */}
            </Header>
            <style jsx>{`
                .open-account-header {
                    position: relative;
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                    height: 347px;
                    background-color: #3f5372;
                    background-image: url(${bgd});
                    background-size: cover;
                }

                .open-account-header > .header-box {
                    width: 374px;
                    height: inherit;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: space-between;
                    padding-top: 60px;
                }

                .open-account-header > .header-box > h1 {
                    z-index: 1;
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                    color: white;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    margin-bottom: 24px;
                }

                .open-account-header > .header-box > h2 {
                    z-index: 1;
                    text-align: left;
                    font-size: 16px;
                    font-weight: normal;
                    color: white;
                    letter-spacing: 0.4px;
                    line-height: normal;
                    margin-bottom: 32px;
                }

                .open-account-header-btn-box {
                    position: relative;
                }

                .open-account-header > .header-box .open-dawho {
                    position: absolute;
                    width: 103px;
                    height: 22px;
                    margin: 0;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    text-align: center;
                    color: #d7e0ef;
                    position: absolute;
                    right: 0;
                    bottom: -38px;
                }

                .backgroundImage {
                    position: absolute;
                    right: 0;
                    width: 346px;
                    height: 347px;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                @media screen and (max-width: 820px) {
                    .backgroundImage {
                        width: 0px;
                        height: 0px;
                    }
                }

                @media screen and (max-width: 768px) {
                    .open-account-header {
                        background-image: url(${bgt});
                    }
                }

                @media screen and (max-width: 450px) {
                    .open-account-header {
                        padding: 0 16px;
                        height: 292px;
                        background-image: url(${bgm});
                    }

                    .open-account-header > .header-box {
                        width: 100%;
                        padding-top: 36px;
                    }

                    .open-account-header > .header-box > h1 {
                        font-size: 20px;
                        letter-spacing: 0.5px;
                        margin-bottom: 16px;
                    }

                    .open-account-header > .header-box > h2 {
                        font-size: 16px;
                        letter-spacing: 1px;
                        margin-bottom: 24px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .open-account-header-btn {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .open-account-header-btn .customer-button {
                    width: 171px;
                }

                .open-account-header-btn > div {
                    line-height: 1;
                }

                @media screen and (max-width: 768px) {
                }

                @media screen and (max-width: 450px) {
                    .open-account-header-btn .customer-button {
                        width: 43.467vw;
                    }
                }
            `}</style>
        </>
    );
};

export default OpenAccountHeader;

OpenAccountHeader.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onInput: PropTypes.func,
    onPressEnter: PropTypes.func,
};

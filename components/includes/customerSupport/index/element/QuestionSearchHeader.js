// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Layout } from 'antd';

import bgd from '../../../../../resources/images/pages/customer_support/a5-d-01.jpg';
import bgt from '../../../../../resources/images/pages/customer_support/a5-t-01.jpg';
import bgm from '../../../../../resources/images/pages/customer_support/a5-m-01.jpg';
import searchIcon from '../../../../../resources/images/pages/customer_support/edit-search.svg';

const QuestionSearchHeader = ({ defaultValue, value, onInput, onPressEnter }) => {
    const { Header } = Layout;

    return (
        <>
            <Header className="customerSupportHeader">
                <h1>歡迎使用，永豐客戶支援</h1>
                <Input
                    type="search"
                    name="search"
                    className="customerSupportSearchInput"
                    size="large"
                    placeholder="你想解決什麼問題？"
                    prefix={<img src={searchIcon} alt="search-icon" />}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onInput}
                    onPressEnter={onPressEnter}
                />
                {/* <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} /> */}
            </Header>
            <style jsx>{`
                .customerSupportHeader {
                    position: relative;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 246px;
                    background-color: #3f5372;
                    background-image: url(${bgd});
                    background-size: cover;
                }

                .customerSupportHeader > h1 {
                    z-index: 1;
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                    color: white;
                }

                .backgroundImage {
                    position: absolute;
                    right: 0;
                    width: 300px;
                    height: 246px;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                @media screen and (max-width: 768px) {
                    .customerSupportHeader {
                        height: 160px;
                        background-image: url(${bgt});
                    }

                    .customerSupportHeader > h1 {
                        font-size: 28px;
                        margin-top: -20px;
                        margin-bottom: 0;
                        white-space: nowrap;
                    }

                    .backgroundImage {
                        display: none;
                        /* width: 100px; */
                        /* height: 160px; */
                    }
                }

                @media screen and (max-width: 450px) {
                    .backgroundImage {
                        display: none;
                        /* top: 0;
                        right: 0;
                        width: 80px;
                        height: 80px; */
                    }
                    .customerSupportHeader > h1 {
                        font-size: 20px;
                    }
                    .customerSupportHeader {
                        background-image: url(${bgm});
                    }
                }
            `}</style>
            <style jsx global>{`
                .customerSupportSearchInput {
                    z-index: 1 !important;
                    width: 31vw;
                    min-width: 510px;
                    height: 56px;
                }

                // search-icon
                .customerSupportSearchInput span {
                    padding: 0 4px;
                    font-size: 20px;
                    color: #3f5372;
                }

                .customerSupportSearchInput .ant-input::placeholder {
                    color: #3f5372;
                }

                @media screen and (max-width: 768px) {
                    .customerSupportHeader {
                        padding: 0;
                    }

                    .customerSupportSearchInput {
                        height: 45px;
                        width: 66.4vw;
                        margin: 0 auto;
                        min-width: 0;
                    }
                }

                @media screen and (max-width: 450px) {
                    .customerSupportHeader {
                        padding: 0 20px;
                    }

                    .customerSupportSearchInput {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default QuestionSearchHeader;

QuestionSearchHeader.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onInput: PropTypes.func,
    onPressEnter: PropTypes.func,
};

// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import bg from '../../../../../resources/images/pages/customer_support/bg_img.svg';

const QuestionSearchHeader = ({ defaultValue, value, onInput, onPressEnter }) => {
    const { Header } = Layout;

    return (
        <>
            <Header className="customerSupportHeader">
                <h1>歡迎使用，永豐客戶支援</h1>
                <Input
                    className="customerSupportSearchInput"
                    size="large"
                    placeholder="你想解決什麼問題？"
                    prefix={<SearchOutlined />}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onInput}
                    onPressEnter={onPressEnter}
                />
                <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} />
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
                }

                .customerSupportHeader > h1 {
                    z-index: 1;
                    text-align: center;
                    font-size: 28px;
                    font-weight: normal;
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
                    }

                    .customerSupportHeader > h1 {
                        font-size: 20px;
                        margin-bottom: 0;
                        white-space: nowrap;
                    }

                    .backgroundImage {
                        width: 100px;
                        height: 160px;
                    }
                }

                @media screen and (max-width: 450px) {
                    .backgroundImage {
                        top: 0;
                        right: 0;
                        width: 80px;
                        height: 80px;
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
                    .customerSupportSearchInput {
                        height: 45px;
                        width: 72vw;
                        min-width: 0;
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

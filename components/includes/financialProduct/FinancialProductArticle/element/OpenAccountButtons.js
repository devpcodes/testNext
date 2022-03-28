import React from 'react';
import PropTypes from 'prop-types';
import CustomerButton from '../../../customerSupport/CustomerButton';
import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';

const OpenAccountButtons = function ({
    isTradingPlatform,
    title,
    categoryName,
    description,
    image,
    button1Title,
    button1Link,
    button2Title,
    button2Link,
}) {
    // const router = useRouter();

    const clientWidth = useSelector(store => store.layout.winWidth);

    const toButton1Link = () => {
        window.open(button1Link);
    };

    const toButton2Link = () => {
        window.open(button2Link);
    };

    return (
        <>
            <main
                className="product-open-account-container"
                style={{ minHeight: !isTradingPlatform && clientWidth <= 768 && clientWidth >= 450 ? '106px' : '' }}
            >
                {/* <div className="open-account-image" style={{ backgroundImage: `url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)` }}/> */}
                <div
                    className="open-account-image"
                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${image})` }}
                />
                <div className="open-title-description">
                    <p className="open-title">{title}</p>
                    <p
                        className="open-category"
                        style={{
                            marginLeft: isTradingPlatform && clientWidth <= 768 ? '8px' : '0',
                            display: !isTradingPlatform && clientWidth <= 768 ? 'none' : '',
                        }}
                    >
                        {categoryName}
                    </p>
                    <p
                        className="open-description"
                        style={{ display: isTradingPlatform && clientWidth <= 768 ? 'none' : 'unset' }}
                    >
                        {description}
                    </p>
                </div>
                <div className="open-buttons">
                    <CustomerButton type="primary" onClick={toButton1Link}>
                        {button1Title}
                    </CustomerButton>
                    {button2Link ? <CustomerButton onClick={toButton2Link}>{button2Title}</CustomerButton> : ''}
                </div>
            </main>
            <style jsx>
                {`
                    .open-account-image {
                        width: 100%;
                        padding-top: 50%;
                        margin-bottom: 16px;
                        background-size: cover;
                        background-position: center;
                    }

                    .product-open-account-container {
                        width: 100%;
                        padding: 32px 32px 16px 32px;
                        margin-bottom: 16px;
                        border: 1px solid #d7e0ef;
                        background-color: #ffffff;
                    }

                    .open-title {
                        margin-bottom: 0;
                        font-size: 20px;
                        color: #0d1623;
                    }

                    .open-category {
                        // font-family: PingFangTC;
                        font-size: 14px;
                        font-weight: normal;
                        letter-spacing: -0.18px;
                        color: #3f5372;
                    }

                    .open-description {
                        margin-top: -3px;
                        font-size: 16px;
                        color: #0d1623;
                    }

                    .open-buttons button {
                        width: 100%;
                    }

                    @media screen and (max-width: 768px) {
                        .open-account-image {
                            display: none;
                        }

                        .product-open-account-container {
                            z-index: 1;
                            display: flex;
                            justify-content: space-between;
                            // width: 99vw;
                            width: 100vw;
                            // position: relative;
                            position: fixed;
                            // left: -5vw;
                            left: 0vw;
                            bottom: 0;
                            margin-bottom: 0;
                            border: none;
                            padding: 16px 24px;
                            background-color: #0d1623;
                            width: 100%;
                        }

                        .open-category {
                            color: #d7e0ef;
                        }

                        .open-title-description {
                            display: flex;
                            flex-direction: column;
                        }

                        .open-buttons {
                            width: fit-content;
                            // min-width: 150px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                        }

                        .open-title {
                            margin-bottom: 9px;
                            font-size: 20px;
                            margin: 0 8px 4px 8px;
                            color: #ffffff;
                            font-size: 16px;
                        }

                        .open-description {
                            font-size: 16px;
                            margin: 0 8px;
                            color: #d7e0ef;
                            display: -webkit-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-open-account-container {
                            // width: 99vw;
                            // bottom: -16px;
                            bottom: 0px;
                            align-items: center;
                            padding: 16px 8px;
                        }

                        .open-account-image {
                            display: none;
                        }

                        .open-title-description {
                            display: none;
                        }

                        .open-buttons {
                            width: 100%;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .open-buttons {
                        // margin: 0 0 16px 20px;
                    }

                    .open-buttons .ant-btn {
                        width: 100%;
                        margin-bottom: 16px;
                    }

                    .open-buttons .ant-btn:first-of-type {
                        margin-top: 24px;
                    }

                    @media screen and (max-width: 768px) {
                        .open-buttons .ant-btn {
                            width: fit-content;
                            margin-bottom: 0;
                        }

                        .open-buttons .ant-btn:first-of-type {
                            margin-top: 0;
                        }

                        .open-buttons .ant-btn:nth-of-type(2) {
                            margin-left: 16px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .open-buttons {
                            margin: 0;
                            align-items: space-between;
                        }

                        .open-buttons .ant-btn {
                            width: 100%;
                            margin: 0 8px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default OpenAccountButtons;

OpenAccountButtons.propTypes = {
    isTradingPlatform: PropTypes.bool,
    title: PropTypes.string,
    categoryName: PropTypes.string,
    description: PropTypes.string,
    button1Title: PropTypes.string,
    button1Link: PropTypes.string,
    button2Title: PropTypes.string,
    button2Link: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import CustomerButton from '../../../customerSupport/CustomerButton';
// import { useRouter } from 'next/router';

const OpenAccountButtons = function ({
    title,
    description,
    image,
    button1Title,
    button1Link,
    button2Title,
    button2Link,
}) {
    // const router = useRouter();

    const toButton1Link = () => {
        window.open(button1Link);
    };

    const toButton2Link = () => {
        window.open(button2Link);
    };

    return (
        <>
            <main className="product-open-account-container">
                {/* <div className="open-account-image" style={{ backgroundImage: `url(https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png)` }}/> */}
                <div
                    className="open-account-image"
                    style={{ backgroundImage: `url(https://webrd.sinotrade.com.tw/files/images/${image})` }}
                />
                <div className="open-title-description">
                    <p className="open-title">{title}</p>
                    <p className="open-description">{description}</p>
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
                        border: 1px solid #d7e0ef;
                        background-color: #ffffff;
                    }

                    .open-title {
                        margin-bottom: 9px;
                        font-size: 20px;
                        color: #0d1623;
                    }

                    .open-description {
                        font-size: 16px;
                        color: #0d1623;
                    }

                    .open-buttons button {
                        width: 100%;
                    }

                    @media screen and (max-width: 1024px) {
                        .open-account-image {
                            display: none;
                        }

                        .product-open-account-container {
                            // z-index: 1;
                            display: flex;
                            justify-content: space-between;
                            width: 99vw;
                            // width: 100vw;
                            position: relative;
                            // position: fixed;
                            left: -5vw;
                            // left: -0.5vw;
                            bottom: -16px;
                            // bottom: 0;
                            border: none;
                            padding: 16px;
                            background-color: #0d1623;
                        }

                        .open-title-description {
                            display: flex;
                            flex-direction: column;
                            width: 55%;
                        }

                        .open-buttons {
                            width: 40%;
                            min-width: 100px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                        }

                        .open-title {
                            margin-bottom: 9px;
                            font-size: 20px;
                            margin: 0 8px 8px 8px;
                            color: #ffffff;
                            font-size: 16px;
                        }

                        .open-description {
                            font-size: 16px;
                            margin: 0 8px;
                            color: #d7e0ef;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-open-account-container {
                            width: 97w;
                            bottom: -16px;
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
                    .open-buttons .ant-btn {
                        width: 100%;
                        margin-bottom: 16px;
                    }

                    @media screen and (max-width: 1024px) {
                        .open-buttons .ant-btn {
                            width: 100%;
                            min-width: 100px;
                            margin: 0 2%;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .open-buttons .ant-btn {
                            width: 100%;
                            min-width: 150px;
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
    title: PropTypes.string,
    description: PropTypes.string,
    button1Title: PropTypes.string,
    button1Link: PropTypes.string,
    button2Title: PropTypes.string,
    button2Link: PropTypes.string,
};

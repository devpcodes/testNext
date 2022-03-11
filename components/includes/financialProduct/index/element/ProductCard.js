import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Card } from 'antd';

const ProductCard = ({
    isTradingPlatform,
    productCode,
    categoryCode,
    categoryName,
    imagePath,
    title,
    description,
    ...props
}) => {
    const router = useRouter();

    useEffect(() => {}, []);

    const toLink = () => {
        if (isTradingPlatform) {
            router.push({
                pathname: `/trading-platform/${productCode}`,
                query: { category: categoryName, categoryCode: categoryCode },
            });
        } else {
            router.push({
                pathname: `/financial-product/${productCode}`,
                query: { category: categoryName, categoryCode: categoryCode },
            });
        }
    };

    return (
        <>
            <Card className="product-card" hoverable onClick={toLink} {...props}>
                <div
                    className="product-card-image"
                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_FILE}/images/${imagePath})` }}
                />
                <div className="product-card-text">
                    <h2>{title}</h2>
                    <div className="yellow-line"></div>
                    <p>{description}</p>
                </div>
            </Card>
            <style jsx>{`
                .product-card-image {
                    width: 100%;
                    height: auto;
                    padding-top: 52.61%;
                    background-size: cover;
                    background-position: center;
                }

                .product-card-text {
                    height: 9.25 vw;
                    padding: 24px 32px;
                    box-sizing: border-box;
                }

                .product-card-text h2 {
                    margin-bottom: 8px;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    /* font-family: PingFangTC; */
                    font-size: 20px;
                    font-weight: 700;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.5px;
                    color: #0d1623;
                }

                .yellow-line {
                    width: 40px;
                    height: 4px;
                    background: #daa360;
                }

                .product-card-text p {
                    min-height: 50px;
                    margin-top: 16px;
                    margin-bottom: 0;
                    font-size: 16px;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                }

                @media screen and (max-width: 820px) {
                    .product-card-image {
                        padding-top: 52.67%;
                    }
                }

                @media screen and (max-width: 450px) {
                    .product-card-image {
                        padding-top: 52.76%;
                    }

                    .product-card-text {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .product-card-text {
                        height: 16vw;
                        padding: 16px 0;
                        text-align: center;
                    }

                    .product-card-text h2 {
                        margin-bottom: 0;
                        font-size: 20px;
                        color: #0d1623;
                        font-weight: 700;
                    }

                    .product-card-text p {
                        display: none;
                    }
                }
            `}</style>
            <style jsx global>
                {`
                    .product-card {
                        bottom: 0;
                        width: calc(100% / 4 - 2.0625vw);
                        height: auto;
                        // min-width: 268px;
                        // max-height: 320px;
                        margin: calc(2.0625vw / 2);
                        border: 1px solid #d7e0ef;
                        transition: bottom 0.5s;
                        box-sizing: border-box;
                    }

                    .product-card .ant-card-body {
                        padding: 0;
                    }

                    .product-card:hover {
                        position: relative;
                        border: 1px solid #d7e0ef;
                        bottom: 1rem;
                        box-shadow: 1px 1px 15px 0 rgba(169, 182, 203, 0.4);
                    }

                    @media screen and (max-width: 820px) {
                        .product-card {
                            width: calc(100% / 3 - 1.041vw * 2);
                            margin: 1.041vw;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-card {
                            width: calc(100% / 2 - 4.27vw);
                            margin: calc(4.27vw / 2);
                        }

                        .yellow-line {
                            display: none;
                        }
                    }

                    .product-card:hover {
                        position: relative;
                        bottom: 1rem;
                    }
                `}
            </style>
        </>
    );
};

export default ProductCard;

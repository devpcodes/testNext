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
                    style={{ backgroundImage: `url(https://webrd.sinotrade.com.tw/files/images/${imagePath})` }}
                />
                <div className="product-card-text">
                    <h2>{title}</h2>
                    <div className="yellow-line"></div>
                    <p>{description}</p>
                </div>
            </Card>
            <style jsx>{`
                .product-card-image {
                    padding-top: 54%;
                    background-size: cover;
                    background-position: center;
                }

                .product-card-text {
                    padding: 24px;
                }

                .product-card-text h2 {
                    margin-bottom: 8px;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
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
                }

                @media screen and (max-width: 450px) {
                    .product-card-text {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .product-card-text h2 {
                        margin-bottom: 0;
                        font-size: 20px;
                        color: #0d1623;
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
                        width: 21.4%;
                        // min-width: 268px;
                        max-height: 320px;
                        margin: 1.7%;
                        border: 1px solid #d7e0ef;
                        transition: bottom 0.5s;
                    }

                    .product-card .ant-card-body {
                        padding: 0;
                    }

                    @media screen and (max-width: 768px) {
                        .product-card {
                            width: 29%;
                            margin: 2%;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-card {
                            width: 43.5%;
                            margin: 2.5%;
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

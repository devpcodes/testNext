import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Card } from 'antd';

const ProductCard = ({ productCode, categoryName, imagePath, title, description, ...props }) => {
    const router = useRouter();

    useEffect(() => {}, []);

    const toLink = () => {
        router.push(`/financial-product/${productCode}?category=${categoryName}`);
    };

    return (
        <>
            <Card
                className="product-card"
                hoverable
                style={{ backgroundImage: `url(https://webrd.sinotrade.com.tw/files/images/${imagePath})` }}
                onClick={toLink}
                {...props}
            >
                <div className="product-card-image" />
                <div className="product-card-text">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </Card>
            <style jsx>{`
                .product-card-image {
                    width: 100%;
                    padding-top: 54%;
                }

                .product-card-text {
                    padding: 24px;
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
                        width: 100%;
                        width: 240px;
                        // max-height: 289px;
                        margin: 17px;
                        border: 1px solid #d7e0ef;
                        transition: bottom 0.5s;
                    }

                    @media screen and (max-width: 1024px) {
                        .product-card {
                            width: 29%;
                            margin: 14px 7px;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .product-card {
                            width: 43%;
                            margin: 14px 7px;
                        }
                    }

                    .product-card:hover {
                        position: relative;
                        bottom: 1rem;
                    }

                    .ant-card-body {
                        padding: 0;
                    }
                `}
            </style>
        </>
    );
};

export default ProductCard;

ProductCard.propTypes = {};

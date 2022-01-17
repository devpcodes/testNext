import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { wrapper } from '../../../../../store/store';
import { setNavItems } from '../../../../../store/components/layouts/action';
import ProductTab from '../element/ProductTab';
import ProductCard from '../element/ProductCard';
import { useRouter } from 'next/router';
import { getFinancialProductCategories } from '../../../../../services/components/financialProduct/financialProductServices';
import { getTradingAppCategories } from '../../../../../services/components/tradingPlatform/tradingPlatformService';
import { getFinancialProductCategoriesAndProduct } from '../../../../../services/components/financialProduct/financialProductServices';
import { getTradingAppCategoriesAndProduct } from '../../../../../services/components/tradingPlatform/tradingPlatformService';
import bg from '../../../../../resources/images/pages/customer_support/bg_img.svg';

const FinancialProductIndexComponent = ({ isTradingPlatform }) => {
    const { Header, Content } = Layout;
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [activeKey, setActiveKey] = useState(null);
    const [currentCategoryName, setCurrentCategoryName] = useState('');
    const [currentProductList, setCurrentProductList] = useState([]);

    const onTabsChange = key => {
        if (key !== router.query.categoryCode) {
            setActiveKey(key);
            categories.forEach(item => {
                if (item.categoryCode === key) {
                    setCurrentCategoryName(item.categoryName);
                    return;
                }
            });
            if (isTradingPlatform) {
                router.push('/trading-platform');
            } else {
                router.push('/financial-product');
            }
        } else {
            setActiveKey(key);
            categories.forEach(item => {
                if (item.categoryCode === key) {
                    setCurrentCategoryName(item.categoryName);
                    return;
                }
            });
        }
    };

    useEffect(async () => {
        let res;
        if (isTradingPlatform) {
            res = await getTradingAppCategories();
        } else {
            res = await getFinancialProductCategories();
        }
        setCategories(res);
        if (router.query.category && router.query.categoryCode) {
            setCurrentCategoryName(router.query.categoryName);
            setActiveKey(router.query.categoryCode);
        } else {
            setCurrentCategoryName(res[0]?.categoryName);
            setActiveKey(res[0]?.categoryCode);
        }
    }, []);

    useEffect(async () => {
        let res;
        if (isTradingPlatform) {
            res = await getTradingAppCategoriesAndProduct(activeKey);
            setCurrentProductList(res?.apps);
        } else {
            res = await getFinancialProductCategoriesAndProduct(activeKey);
            setCurrentProductList(res?.products);
        }
    }, [activeKey]);

    return (
        <>
            <Layout>
                <Header className="financialProductHeader">
                    <h1>{isTradingPlatform ? '交易平台' : '理財商品'}</h1>
                </Header>
                <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} />
                <Content className="productLayoutContent">
                    <ProductTab
                        categories={categories}
                        defaultActiveKey={categories && categories[0]?.categoryCode}
                        activeKey={activeKey}
                        className="product-tabs"
                        onChange={onTabsChange}
                    />
                    <div className="productCardContainer">
                        {currentProductList?.length &&
                            currentProductList.map(i => (
                                <ProductCard
                                    key={i.categoryCode}
                                    title={i.productName || i.appName}
                                    description={i.description}
                                    imagePath={i.imagePath}
                                    productCode={i.productCode || i.appCode}
                                    categoryName={currentCategoryName}
                                    categoryCode={activeKey}
                                    isTradingPlatform={isTradingPlatform}
                                />
                            ))}
                    </div>
                </Content>
                <style jsx>{`
                    .productLayoutContent {
                        width: 71vw;
                        min-height: 100vh;
                        margin: auto;
                        margin-top: 20px;
                    }

                    .financialProductHeader {
                        position: relative;
                        display: flex;
                        width: 100%;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 160px;
                        background-color: #3f5372;
                    }

                    .financialProductHeader > h1 {
                        margin-bottom: 0;
                        font-size: 28px;
                        color: white;
                    }

                    @media screen and (max-width: 450px) {
                        .financialProductHeader {
                            height: 100px;
                        }

                        .financialProductHeader > h1 {
                            font-size: 20px;
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        .productLayoutContent {
                            width: 90%;
                            margin 0 auto;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .productLayoutContent {
                            width: 100%;
                            margin-top: 0px;
                            margin-bottom: 20px;
                            min-height: 0;
                        }
                    }

                    .backgroundImage {
                        position: absolute;
                        right: 0;
                        width: 300px;
                        height: 160px;
                        background-repeat: no-repeat;
                    }

                    @media screen and (max-width: 800px) {
                        .backgroundImage {
                            width: 173px;
                            height: 160px;
                        }
                    }

                    .productCardContainer {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                    }

                    @media screen and (max-width: 1024px) {
                        .productCardContainer {
                            flex-direction: row;
                            flex-wrap: wrap;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .productCardContainer {
                            justify-content: flex-start;
                            flex-direction: row;
                            flex-wrap: wrap;
                            margin: 17px auto 0 auto;
                            padding: 0 5px;
                        }

                        .backgroundImage {
                            display: none;
                        }
                    }
                `}</style>

                <style jsx global>
                    {``}
                </style>
            </Layout>
        </>
    );
};

export default FinancialProductIndexComponent;

FinancialProductIndexComponent.propTypes = {
    isTradingPlatform: PropTypes.bool,
};

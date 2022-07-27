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
import bgd from '../../../../../resources/images/pages/customer_support/a2-d-01.jpg';
import bgt from '../../../../../resources/images/pages/customer_support/a2-t-01.jpg';
import bgm from '../../../../../resources/images/pages/customer_support/a2-m-01.jpg';
import bg2d from '../../../../../resources/images/pages/customer_support/a3-d-01.jpg';
import bg2t from '../../../../../resources/images/pages/customer_support/a3-t-01.jpg';
import bg2m from '../../../../../resources/images/pages/customer_support/a3-m-01.jpg';
import { checkServer } from '../../../../../services/checkServer';

const FinancialProductIndexComponent = ({ isTradingPlatform, serverCategories, serverProducts }) => {
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
            // res = serverCategories;
        } else {
            res = await getFinancialProductCategories();
            // res = serverCategories;
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

    useEffect(() => {
        if (router.query.categoryCode) {
            setTimeout(() => {
                setActiveKey(router.query.categoryCode);
            }, 100);
        }
    }, [router.query.categoryCode]);

    useEffect(async () => {
        console.log('active=======', activeKey);
        let res;
        if (isTradingPlatform) {
            res = await getTradingAppCategoriesAndProduct(activeKey);
            setCurrentProductList(res?.apps);
        } else {
            res = await getFinancialProductCategoriesAndProduct(activeKey);
            if (res?.products) {
                setCurrentProductList(res?.products);
            }
        }
    }, [activeKey]);

    return (
        <>
            <Layout>
                <Header className="financialProductHeader">
                    <h1>{isTradingPlatform ? '交易平台' : '理財商品'}</h1>
                </Header>
                {/* <div className="backgroundImage" style={{ backgroundImage: `url(${bg})` }} /> */}
                <Content className="productLayoutContent">
                    {checkServer() ? (
                        <>
                            <ProductTab
                                categories={serverCategories}
                                defaultActiveKey={serverCategories && serverCategories[0]?.categoryCode}
                                activeKey={activeKey}
                                className="product-tabs"
                                onChange={onTabsChange}
                            />
                            <div className="productCardContainer">
                                {serverProducts?.apps?.length &&
                                    serverProducts?.apps?.map((e, i) => (
                                        <ProductCard
                                            key={i}
                                            title={e.productName || e.appName}
                                            description={e.description}
                                            imagePath={e.imagePath}
                                            productCode={e.productCode || e.appCode}
                                            categoryName={currentCategoryName}
                                            categoryCode={activeKey}
                                            isTradingPlatform={isTradingPlatform}
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <ProductTab
                                categories={categories}
                                defaultActiveKey={categories && categories[0]?.categoryCode}
                                activeKey={activeKey}
                                className="product-tabs"
                                onChange={onTabsChange}
                            />
                            <div className="productCardContainer">
                                {currentProductList?.length &&
                                    currentProductList.map((e, i) => (
                                        <ProductCard
                                            key={i}
                                            title={e.productName || e.appName}
                                            description={e.description}
                                            imagePath={e.imagePath}
                                            productCode={e.productCode || e.appCode}
                                            categoryName={currentCategoryName}
                                            categoryCode={activeKey}
                                            isTradingPlatform={isTradingPlatform}
                                        />
                                    ))}
                            </div>
                        </>
                    )}
                </Content>
                <style jsx>{`
                    .productLayoutContent {
                        width: 80%;
                        padding: 0 1.5rem;
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
                        background-image: url(${isTradingPlatform ? bgd : bg2d});
                        background-size: cover;
                    }

                    .financialProductHeader > h1 {
                        margin-bottom: 0;
                        font-size: 28px;
                        color: white;
                        font-weight: 700;
                    }

                    @media screen and (max-width: 450px) {
                        .financialProductHeader {
                            height: 100px;
                        }

                        .financialProductHeader > h1 {
                            font-size: 20px;
                        }
                    }

                    @media screen and (max-width: 1250px) {
                        .productLayoutContent {
                            width: 90%;
                        }
                    }

                    @media screen and (max-width: 1024px) {
                        .productLayoutContent {
                            width: 100%;
                            margin 0 auto;
                            padding: 0 3rem;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .productLayoutContent {
                            /* width: calc(100% - 64px); */
                            width: 100%;
                            padding: 0;
                            padding-left: 32px;
                            padding-right: 32px;
                        }
                        .financialProductHeader {
                            background-image: url(${isTradingPlatform ? bgt : bg2t});
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .productLayoutContent {
                            /* width: calc(100% - 4.27vw * 2); */
                            margin-top: 0px;
                            margin-bottom: 20px;
                            min-height: 0;
                            padding: 0;
                        }
                        .productCardContainer{
                            padding-left: 16px;
                            padding-right: 16px;
                        }
                        .financialProductHeader {
                            background-image: url(${isTradingPlatform ? bgm : bg2m});
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
                        margin-bottom: 50px;
                        margin-left: calc(-2.0625vw / 2);
                        margin-right: calc(-2.0625vw / 2);
                    }

                    @media screen and (max-width: 1024px) {
                        .productCardContainer {
                            flex-direction: row;
                            flex-wrap: wrap;
                        }
                    }

                    @media screen and (max-width: 820px) {
                        .productCardContainer {
                            margin-left: -1.041vw;
                            margin-right: -1.041vw;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .productCardContainer {
                            justify-content: flex-start;
                            flex-direction: row;
                            flex-wrap: wrap;
                            margin: 17px calc(-4.27vw / 2) 0;
                        }

                        .backgroundImage {
                            display: none;
                        }
                    }
                `}</style>

                <style jsx global>
                    {`
                        @media screen and (max-width: 380px) {
                            .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
                                margin-left: 16px;
                            }
                        }
                    `}
                </style>
            </Layout>
        </>
    );
};

export default FinancialProductIndexComponent;

FinancialProductIndexComponent.propTypes = {
    isTradingPlatform: PropTypes.bool,
};

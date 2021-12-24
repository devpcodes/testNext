import React from 'react';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { wrapper } from '../../../../../store/store';
import { setNavItems } from '../../../../../store/components/layouts/action';
import ProductTab from '../element/ProductTab';
import ProductCard from '../element/ProductCard';
import { getFinancialProductCategories } from '../../../../../services/components/financialProduct/financialProductServices';
import { getFinancialProductCategoriesAndProduct } from '../../../../../services/components/financialProduct/financialProductServices';
import bg from '../../../../../resources/images/pages/customer_support/bg_img.svg';

const FinancialProductIndexComponent = () => {
    const { Header, Content } = Layout;
    const [categories, setCategories] = useState([]);
    const [activeKey, setActiveKey] = useState(null);
    const [currentCategoryName, setCurrentCategoryName] = useState('');
    const [currentProductList, setCurrentProductList] = useState([]);

    const onTabsChange = key => {
        setActiveKey(key);
        categories.forEach(item => {
            if (item.categoryCode === key) {
                setCurrentCategoryName(item.categoryName);
                return;
            }
        });
    };

    useEffect(async () => {
        const res = await getFinancialProductCategories();
        setCategories(res);
        setActiveKey(res[0]?.categoryCode);
        setCurrentCategoryName(res[0]?.categoryName);
    }, []);

    useEffect(async () => {
        const res = await getFinancialProductCategoriesAndProduct(activeKey);
        setCurrentProductList(res?.products);
    }, [activeKey]);

    return (
        <>
            <Layout>
                <Header className="financialProductHeader">
                    <h1>理財商品</h1>
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
                                    title={i.productName}
                                    description={i.description}
                                    imagePath={i.imagePath}
                                    productCode={i.productCode}
                                    categoryName={currentCategoryName}
                                />
                            ))}
                    </div>
                </Content>
                <style jsx>{`
                    .productLayoutContent {
                        width: 71%;
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
                            display: none;
                        }
                    }

                    .productCardContainer {
                        display: flex;
                        margin: auto;
                    }

                    @media screen and (max-width: 1024px) {
                        .productCardContainer {
                            justify-content: space-between;
                            flex-direction: row;
                            flex-wrap: wrap;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .productCardContainer {
                            justify-content: space-around;
                            flex-direction: row;
                            flex-wrap: wrap;
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

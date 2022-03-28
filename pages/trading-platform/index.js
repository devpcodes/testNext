import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import FinancialProductIndexComponent from '../../components/includes/financialProduct/index/page/FinancialProductIndexComponent';
import {
    getTradingAppCategories,
    getTradingAppCategoriesAndProduct,
} from '../../services/components/tradingPlatform/tradingPlatformService';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    const categories = await getTradingAppCategories();
    const categoryCode = categories[0]?.categoryCode;
    const products = await getTradingAppCategoriesAndProduct(categoryCode);
    await store.dispatch(setNavItems());
    return {
        props: { categories, products },
    };
});

const TradingPlatform = function ({ categories, products }) {
    return (
        <div>
            <FinancialProductIndexComponent
                isTradingPlatform={true}
                serverCategories={categories}
                serverProducts={products}
            />
        </div>
    );
};

export default TradingPlatform;

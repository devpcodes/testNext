import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import FinancialProductIndexComponent from '../../components/includes/financialProduct/index/page/FinancialProductIndexComponent';
import { getFinancialProductCategories } from '../../services/components/financialProduct/financialProductServices';
import { getFinancialProductCategoriesAndProduct } from '../../services/components/financialProduct/financialProductServices';
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    const categories = await getFinancialProductCategories();
    const categoryCode = categories[0]?.categoryCode;
    const products = await getFinancialProductCategoriesAndProduct(categoryCode);
    products.apps = products.products;
    await store.dispatch(setNavItems());
    return {
        props: { categories, products },
    };
});

const FinancialProduct = function ({ categories, products }) {
    return (
        <div>
            <FinancialProductIndexComponent serverCategories={categories} serverProducts={products} />
        </div>
    );
};

export default FinancialProduct;

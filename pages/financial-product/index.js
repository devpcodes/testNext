import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import FinancialProductIndexComponent from '../../components/includes/financial-product/index/page/FinancialProductIndexComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const FinancialProduct = function () {
    return (
        <div>
            <FinancialProductIndexComponent />
        </div>
    );
};

export default FinancialProduct;

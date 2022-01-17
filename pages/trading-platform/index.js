import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import FinancialProductIndexComponent from '../../components/includes/financialProduct/index/page/FinancialProductIndexComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const TradingPlatform = function () {
    return (
        <div>
            <FinancialProductIndexComponent isTradingPlatform={true} />
        </div>
    );
};

export default TradingPlatform;

import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import CustomerSupportIndexComponent from '../../components/includes/customerSupport/index/page/CustomerSupportIndexComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const CustomerSupport = () => {
    return <CustomerSupportIndexComponent />;
};

export default CustomerSupport;

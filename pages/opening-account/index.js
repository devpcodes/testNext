import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import OpeningAccountIndexComponent from '../../components/includes/openingAccount/index/page/OpeningAccountIndexComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpeningAccount = () => {
    return <OpeningAccountIndexComponent />;
};

export default OpeningAccount;

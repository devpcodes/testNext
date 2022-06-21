import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import OverviewComponent from '../../components/includes/loan/overview/page/OverviewComponent';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Collateral = () => {
    return <OverviewComponent />;
};

export default Collateral;

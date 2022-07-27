import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import CollateralComponent from '../../components/includes/loan/Collateral/page/CollateralComponent';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Collateral = () => {
    return <CollateralComponent />;
};

export default Collateral;

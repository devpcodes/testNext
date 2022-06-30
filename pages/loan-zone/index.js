import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import LoanIndex from '../../components/includes/loan/Index/page/LoanIndex';
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Index = () => {
    return <LoanIndex />;
};

export default Index;

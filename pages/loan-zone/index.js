import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import LoanIndex from '../../components/includes/loan/Index/page/LoanIndex';
import { PageHead } from '../../components/includes/PageHead';
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Index = () => {
    return (
        <>
            <PageHead title={'借貸專區'} />
            <LoanIndex />;
        </>
    );
};

export default Index;

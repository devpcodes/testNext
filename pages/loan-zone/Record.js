import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import RecordComponent from '../../components/includes/loan/Collateral/page/RecordComponent';
import { PageHead } from '../../components/includes/PageHead';
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Record = () => {
    return (
        <>
            <PageHead title={'借還記錄'} />
            <RecordComponent />;
        </>
    );
};

export default Record;

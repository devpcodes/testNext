import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import RecordComponent from '../../components/includes/loan/Collateral/page/RecordComponent';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Record = () => {
    return <RecordComponent />;
};

export default Record;

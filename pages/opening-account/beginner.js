import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import BeginnerComponent from '../../components/includes/openingAccount/beginner/page/BeginnerComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Beginner = () => {
    return <BeginnerComponent />;
};

export default Beginner;

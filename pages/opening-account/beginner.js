import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import BeginnerComponent from '../../components/includes/openingAccount/beginner/page/BeginnerComponent';
import { postArticleList } from '../../services/pages/index/postArticleList';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
    const activeTab = '台股';
    const richClubNews = await postArticleList(3, activeTab);
    return {
        props: { richClubNews, activeTab },
    };
});

const Beginner = () => {
    return <BeginnerComponent richClubNews={richClubNews} activeTab={activeTab} />;
};

export default Beginner;

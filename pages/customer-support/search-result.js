import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import SearchResultComponent from '../../components/includes/customerSupport/searchResult/page/SearchResultComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const SearchResult = () => {
    return <SearchResultComponent />;
};

export default SearchResult;

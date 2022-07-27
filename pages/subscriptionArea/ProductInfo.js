import React from 'react';
import { wrapper } from '../../store/store';
import { setNavItems } from '../../store/components/layouts/action';
import ProductInfo from '../../components/includes/applyProductInfo/page/ProductInfo';
import { PageHead } from '../../components/includes/PageHead';
export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function ProductInfoPage() {
    // const isMobile = useCheckMobile();
    return (
        <>
            <PageHead title={'申購專區'} />
            <ProductInfo />;
        </>
    );
}

export default ProductInfoPage;

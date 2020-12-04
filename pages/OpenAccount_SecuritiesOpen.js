import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const OpenAccount_SecuritiesOpen = () => {
    const [hash, setHash] = useState('');
    const isMobile = useSelector(store => store.layout.isMobile);

    useEffect(() => {
        const routerHash = window.location.hash;
        setHash(routerHash);
    }, []);

    return (
        <>
            <PageHead title={'證券戶加開'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/OpenAccount_SecuritiesOpen${hash}`}
                    title="永豐金證券"
                    iHeight={isMobile ? 2000 : 1100}
                />
            </div>
        </>
    );
};

export default OpenAccount_SecuritiesOpen;

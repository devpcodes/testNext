import NewWebIframe from '../components/includes/NewWebIframe';
import { useEffect, useState } from 'react';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function RichInfo_News() {
    const [hash, setHash] = useState('');
    useEffect(() => {
        const routerHash = window.location.hash;
        setHash(routerHash);
    }, []);
    return (
        <>
            <PageHead title={'財經新聞'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/RichInfo_News${hash}`}
                    title="永豐金證券"
                    iHeight={2000}
                />
            </div>
        </>
    );
}

export default RichInfo_News;

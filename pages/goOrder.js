import { useState, useEffect } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useRouter } from 'next/router';
import { PageHead } from '../components/includes/PageHead';
import { checkServer } from '../services/checkServer';
import { getParamFromQueryString } from '../services/getParamFromQueryString';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function GoOrder() {
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
    }, [router.query]);

    return (
        <>
            <PageHead title={'快速下單'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/goOrder${queryStr}`}
                    title="永豐金證券"
                    iHeight={830}
                />
            </div>
        </>
    );
}

// nav=0 為無 header，nav=1 為有 header。預設為：有 header。
const setGoOrderLayout = () => {
    const isServer = checkServer();
    if (!isServer) {
        const nav = getParamFromQueryString('nav');
        if (nav == '0') {
            // eslint-disable-next-line react/display-name
            GoOrder.getLayout = page => <GoOrder>{page}</GoOrder>;
        }
    }
};

setGoOrderLayout();

export default GoOrder;

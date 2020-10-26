import { useEffect, useState } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useRouter } from 'next/router';
import { PageHead } from '../components/includes/PageHead';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Inside_Frame() {
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');

    useEffect(() => {
        queryHandler();
    }, []);

    useEffect(() => {
        queryHandler();
    }, [router.query]);

    const queryHandler = () => {
        const qStr = objectToQueryHandler(router.query);
        if (qStr) {
            setQueryStr(qStr);
        }
    };

    return (
        <>
            <PageHead title={'申請服務'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Inside_Frame${decodeURIComponent(queryStr)}`}
                    title="永豐金證券"
                />
            </div>
        </>
    );
}

export default Inside_Frame;

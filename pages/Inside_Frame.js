import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
// import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { PageHead } from '../components/includes/PageHead';
import { getCookie } from '../services/components/layouts/cookieController';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Inside_Frame() {
    const router = useRouter();
    // const [queryStr, setQueryStr] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        // queryHandler();
        const URL = router.query?.URL;
        const token = getCookie('token');
        if (URL && token) {
            setUrl(`${URL}?platform=newweb&TOKEN=${token}`);
        }
    }, [router.query]);

    // const queryHandler = () => {
    //     const qStr = objectToQueryHandler(router.query);
    //     if (qStr) {
    //         setQueryStr(qStr);
    //     }
    // };

    return (
        <>
            <PageHead title={'申請服務'} />
            <div>
                <NewWebIframe iframeSrc={url} title="永豐金證券" iHeight={800} />
            </div>
        </>
    );
}

export default Inside_Frame;

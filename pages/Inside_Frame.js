import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import NewWebIframe from '../components/includes/NewWebIframe';
import { PageHead } from '../components/includes/PageHead';

import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';

import { getToken } from '../services/user/getToken';
import { getLykanInstance } from '../services/myAxios';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Inside_Frame() {
    const router = useRouter();
    const [url, setUrl] = useState('');

    const isMobile = useSelector(store => store.layout.isMobile);

    useEffect(() => {
        const setEBillUrl = async ({ token = '' } = {}) => {
            try {
                const url = '/auth/getEStatementOTP';
                const res = await getLykanInstance().post(url, {
                    token,
                });
                return setUrl(res.data?.result?.url);
            } catch (error) {
                console.log(`error:`, error);
            }
        };

        const target = router.query?.target;
        const URL = router.query?.URL;
        const token = getToken();

        if (target === 'ebill' && token) {
            setEBillUrl({ token });
        } else if (URL && token) {
            setUrl(`${URL}?platform=newweb&TOKEN=${token}`);
        }
    }, [router.query]);

    return (
        <>
            <PageHead title={'申請服務'} />
            <div>
                <NewWebIframe iframeSrc={url} title="永豐金證券" iHeight={isMobile ? 4000 : 2000} />
            </div>
        </>
    );
}

export default Inside_Frame;

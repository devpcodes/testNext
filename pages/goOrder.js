import { useState, useEffect } from 'react';
import NewWebIframe from '../components/includes/NewWebIframe';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { useRouter } from 'next/router';
import { PageHead } from '../components/includes/PageHead';
import { checkServer } from '../services/checkServer';
import { getParamFromQueryString } from '../services/getParamFromQueryString';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { platformMapping } from '../services/platformMapping';
import { usePlatform } from '../hooks/usePlatform';

function GoOrder() {
    const checkLoginHooks = useCheckLogin();
    const router = useRouter();
    const [queryStr, setQueryStr] = useState('');
    const platform = usePlatform();
    const nav = router.query?.nav;

    useEffect(() => {
        const platformSourceObj = platformMapping(platform);
        const newQstr = Object.assign(router.query, platformSourceObj);
        const qStr = objectToQueryHandler(newQstr);
        if (qStr) {
            setQueryStr(qStr);
        }
    }, [router.query, platform]);

    return (
        <>
            {checkLoginHooks && (
                <>
                    <PageHead title={'快速下單'} />
                    <div className={'container'}>
                        <NewWebIframe
                            iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/goOrder${queryStr}`}
                            title="永豐金證券"
                            iHeight={750}
                        />
                    </div>
                </>
            )}

            <style jsx>{`
                .container {
                    margin-top: ${nav == '0' ? '0' : '70px'};
                }
            `}</style>
        </>
    );
}

// nav=0 為無 header，nav=1 為有 header。預設為：有 header。
const setGoOrderLayout = () => {
    const isServer = checkServer();
    if (isServer) {
        GoOrder.getLayout = Page => Page;
    } else {
        const nav = getParamFromQueryString('nav');
        if (nav == '0') {
            GoOrder.getLayout = Page => Page;
        }
    }
};

setGoOrderLayout();

export default GoOrder;

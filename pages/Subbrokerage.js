import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import { checkAccountsType } from '../services/user/checkAccountsType';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function Subbrokerage() {
    const accounts = useSelector(store => store.user.accounts);
    const router = useRouter();
    useEffect(() => {
        if (!checkAccountsType(accounts, 'H')) {
            Modal.error({
                content: '無可交易帳號',
                onOk: () => {
                    router.push('/');
                },
                onCancel: () => {
                    router.push('/');
                },
            });
        }
    }, [accounts]);
    return (
        <>
            <PageHead title={'海外股票交易帳務整合'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/Subbrokerage`}
                    title="永豐金證券"
                    iHeight={1000}
                />
            </div>
            <style global jsx>{`
                body {
                    overflow: hidden !important;
                }
            `}</style>
        </>
    );
}

export default Subbrokerage;

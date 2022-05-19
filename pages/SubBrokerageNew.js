import { wrapper } from '../store/store';
import { useEffect } from 'react';
import { setModal, setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import SubBrokerageMain from '../components/includes/subBrokerage/SubBrokerageMain';
import { useAutoSelectAccount } from '../hooks/useAutoSelectAccount';
import ActiveReturn from '../components/includes/ActiveReturn';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function SubBrokerageNew() {
    const dispatch = useDispatch();
    const router = useRouter();
    const hasAccount = useAutoSelectAccount('H');
    useEffect(() => {
        if (!hasAccount) {
            setTimeout(() => {
                router.push('/');
            }, 300);
            message.error('無可交易帳號');
            // dispatch(
            //     setModal({
            //         visible: true,
            //         type: 'confirm',
            //         content: '無可交易帳號',
            //         title: '系統訊息',
            //         onOk: () => {
            //             router.push('/');
            //             dispatch(setModal({ visible: false }));
            //         },
            //         onCancel: () => {
            //             router.push('/');
            //             dispatch(setModal({ visible: false }));
            //         },
            //     }),
            // );
        }
    }, [hasAccount]);
    return (
        <>
            <ActiveReturn />
            <PageHead title={'海外股票交易帳務整合'} />
            <div>
                <SubBrokerageMain />
            </div>
        </>
    );
}

export default SubBrokerageNew;

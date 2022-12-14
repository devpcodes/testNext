import NewWebIframe from '../components/includes/NewWebIframe';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { objectToQueryHandler } from '../services/objectToQueryHandler';
import { PageHead } from '../components/includes/PageHead';
import { Modal, Button } from 'antd';
import { fetchSBQueryRealTimeQuoteAuth } from '../services/sb/queryRealTimeQuoteAuth';
import { getToken } from '../services/user/accessToken';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function TradingCenter_TWStocks_SubBrokerage() {
    const router = useRouter();
    const isMobile = useSelector(store => store.layout.isMobile);
    const [queryStr, setQueryStr] = useState('');
    const [height, setHeight] = useState(1450);
    const [tab, setTab] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasSBAccount, setHasSBAccount] = useState(false);
    const userAccounts = useSelector(store => store.user.accounts);

    const cancelHandler = () => {
        setIsModalVisible(false);
    };
    const openSBAccount = () => {
        window.open(
            'https://www.sinotrade.com.tw/EX/OpenCount/Apply_SUB01.aspx?strProd=0037&strWeb=0035&utm_campaign=OPSUB_inchannel&utm_source=newweb&utm_medium=button_sign',
        );
    };
    const signSBRealtime = () => {
        window.open(`${process.env.NEXT_PUBLIC_SIGNCENTER_DOMAIN}/SubscriberAgreement?TOKEN=${getToken()}`);
    };
    const getHeightByTab = tab => {
        switch (tab) {
            case '2':
                return isMobile ? 950 : 1650;
            case '3':
                return isMobile ? 1000 : 1600;
            case '4':
                return isMobile ? 1050 : 2100;
            case '5':
                return 1450;
            case '7':
                return 1450;
            default:
                return 1450;
        }
    };

    useEffect(() => {
        const iFrameHeight = getHeightByTab(tab);
        setHeight(iFrameHeight);
    }, [tab, isMobile]);

    useEffect(async () => {
        if (!sessionStorage.getItem('sbRealTimePop')) {
            // ??????????????????????????????
            let hasSBAccount = false;
            userAccounts.some((data, index) => {
                if (data.accttype === 'H') {
                    hasSBAccount = true;
                    return false;
                }
            });
            if (!hasSBAccount) {
                // ????????????????????????????????????????????????
                setHasSBAccount(false);
                setIsModalVisible(true);
            } else {
                // ?????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????
                setHasSBAccount(true);
                const sbRealTimeData = await fetchSBQueryRealTimeQuoteAuth('NASDAQ', getToken());
                if (sbRealTimeData.data.NASDAQ.isAuth === false) {
                    setIsModalVisible(true);
                }
            }
            sessionStorage.setItem('sbRealTimePop', true);
        }
    }, []);

    useEffect(() => {
        const qStr = objectToQueryHandler(router.query);
        console.log(qStr);
        if (qStr) {
            setQueryStr(qStr);
            router.query?.tab && setTab(router.query.tab);
        } else {
            setQueryStr('?tab=2');
            setTab('2');
        }
    }, [router.query]);

    // useEffect(() => {
    //     setQueryStr('?tab=2');
    //     setTab('2');
    // });

    return (
        <>
            <Modal
                visible={isModalVisible}
                title={hasSBAccount ? '???????????????????????????' : '?????????????????????'}
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                okText={hasSBAccount ? '????????????' : '?????????????????????'}
                cancelText="????????????"
                width={320}
                onCancel={cancelHandler}
                onOk={hasSBAccount ? signSBRealtime : openSBAccount}
            >
                {hasSBAccount
                    ? '???????????? NASDAQ ?????????????????????????????????????????????????????????????????????????????????????????????????????????'
                    : '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'}
            </Modal>

            <PageHead title={'????????????'} />
            <div>
                <NewWebIframe
                    iframeSrc={`/${process.env.NEXT_PUBLIC_NEWWEB}/TradingCenter_TWStocks_SubBrokerage${queryStr}`}
                    title="???????????????"
                    iHeight={height}
                />
            </div>
            <style jsx global>{`
                div.ant-modal-title {
                    text-align: left;
                    font-size: 2rem;
                    font-weight: bold;
                }
                div.ant-modal-body {
                    font-size: 1.6rem;
                    color: #3f5372;
                }
                .ant-btn-primary,
                .ant-btn-primary:focus,
                .ant-btn-primary:hover {
                    background-color: #c43826;
                    border: #c43826;
                    color: #fff;
                }
            `}</style>
        </>
    );
}

export default TradingCenter_TWStocks_SubBrokerage;

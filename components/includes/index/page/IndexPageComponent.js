import React, { useState } from 'react';
import { Layout } from 'antd';
import FastLinks from '../element/FastLinks';

import SecondBanner from '../element/SecondBanner';
import BannerSlider from '../element/BannerSlider';
import ThirdSection from '../element/ThirdSection';
import AppDownloadSection from '../element/AppDownloadSection';
import ForthSection from '../element/ForthSection';
import ContactSection from '../element/ContactSection';
import QAShortcut from '../element/QAshortcut';

import newAccount from '../../../../resources/images/pages/homepage/fast_link/img-service-new-account-quick.svg';
import trade from '../../../../resources/images/pages/homepage/fast_link/img-service-trade.svg';
import accounting from '../../../../resources/images/pages/homepage/fast_link/img-service-accounting.svg';
import stock from '../../../../resources/images/pages/homepage/fast_link/img-service-stock.svg';
import support from '../../../../resources/images/pages/homepage/fast_link/img-service-support.svg';

import pig from '../../../../resources/images/pages/homepage/third_section/img-service-account.svg';
import stockSubs from '../../../../resources/images/pages/homepage/third_section/img-service-stock-subscription.svg';
import python from '../../../../resources/images/pages/homepage/third_section/img-service-api.svg';
import borrow from '../../../../resources/images/pages/homepage/third_section/img-service-user-borrow.svg';
import receipt from '../../../../resources/images/pages/homepage/third_section/img-service-advance-receipt.svg';
import noLimit from '../../../../resources/images/pages/homepage/third_section/img-service-no-limit-money.svg';

import preview from '../../../../resources/images/pages/homepage/forth_section/preview.png';
import SafetySection from '../element/SafetySection';

import gov from '../../../../resources/images/pages/homepage/safety_section/img-service-trade-control.svg';
import safe from '../../../../resources/images/pages/homepage/safety_section/img-service-data-safe.svg';
import security from '../../../../resources/images/pages/homepage/safety_section/img-service-trade-security.svg';

const IndexPageComponent = () => {
    const { Content } = Layout;

    const [fastLinkData] = useState([
        {
            title: '極速開戶',
            description: '線上開戶只需 8分鐘',
            site: 'outer',
            link:
                'https://www.sinotrade.com.tw/openact?utm_campaign=OP_inchannel&utm_source=newweb&utm_medium=button_top&strProd=0037&strWeb=0035',
            icon: `${newAccount}`,
            target: '_blank',
        },
        {
            title: '即時行情',
            description: '隨時隨地掌握股市動態',
            site: 'outer',
            link: 'https://www.sinotrade.com.tw/newweb/TradingCenter_TWStocks_Taiex/',
            icon: `${trade}`,
            target: '_self',
        },
        {
            title: '投資情報',
            description: '永豐投顧不敗的選股法',
            site: 'outer',
            link: 'https://www.sinotrade.com.tw/richclub/',
            icon: `${accounting}`,
            target: '_blank',
        },
        {
            title: '交易平台',
            description: '全球市場交易零時差',
            site: 'inner',
            link: '/trading-platform',
            icon: `${stock}`,
            target: '_self',
        },
        {
            title: '客戶支援',
            description: '線上支援你的所有問題',
            site: 'inner',
            link: '/customer-support',
            icon: `${support}`,
            target: '_self',
        },
    ]);

    const [thirdSectionData] = useState({
        title: '多元理財，全方位精準投資',
        subtitle: '針對各類用戶，提供多元化的理財商品',
        cardsData: [
            {
                title: '豐存股',
                description: '台股、美股線上輕鬆存股',
                site: '',
                link: '',
                icon: `${pig}`,
                target: '_blank',
            },
            {
                title: '股票申購',
                description: '申購零門檻，備足資金抽起來',
                site: 'outer',
                link: '',
                icon: `${stockSubs}`,
                target: '_self',
            },
            {
                title: 'Python API',
                description: '程式交易就是要簡單快速',
                site: 'outer',
                link: '',
                icon: `${python}`,
                target: '_blank',
            },
            {
                title: '自然人借券',
                description: '出借庫存股票，低風險、生好息',
                site: 'outer',
                link: '',
                icon: `${borrow}`,
                target: '_blank',
            },
            {
                title: '預收款券',
                description: '處置股、注意股交易超便利',
                site: 'inner',
                link: '/customer-support',
                icon: `${receipt}`,
                target: '_self',
            },
            {
                title: '不限用途借貸',
                description: '隨時借隨時還，撥款超快速',
                site: 'inner',
                link: '',
                icon: `${noLimit}`,
                target: '_self',
            },
        ],
        readMoreTitle: '了解更多理財商品',
        readMorePath: '/financial-product',
    });

    const [forthSectionData] = useState({
        title: '投資路上的不敗法則',
        subtitle: '永豐投顧的選股寶典，投資路上的神隊友',
        cardsData: [
            {
                title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                image: `${preview}`,
                time: '2021.10.31',
                writer: '寰球經濟',
            },
            {
                title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                image: `${preview}`,
                time: '2021.10.31',
                writer: '寰球經濟',
            },
            {
                title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                image: `${preview}`,
                time: '2021.10.31',
                writer: '寰球經濟',
            },
            {
                title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
                image: `${preview}`,
                time: '2021.10.31',
                writer: '寰球經濟',
            },
        ],
        readMoreTitle: '更多豐雲學堂文章',
        readMorePath: 'https://www.sinotrade.com.tw/richclub/',
    });

    const [SafetySectionData] = useState({
        title: '讓你的交易安全無虞',
        subtitle: '交易全程加密，受託金管監理',
        cardsData: [
            {
                icon: `${gov}`,
                title: '金管監理',
                description:
                    '客戶資產及交易過程，皆透過金管會及證期局監督管理，資金獨立託管於永豐銀行，全面保障您的交易及資金安全。',
            },
            {
                icon: `${safe}`,
                title: '資訊安全',
                description: '受託公正第三方資訊安全檢測公司，定期進行資安弱掃，以確保客戶個人資料及財物資產。',
            },
            {
                icon: `${security}`,
                title: '交易加密',
                description:
                    '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述...',
            },
        ],
    });

    return (
        <>
            <Layout>
                <Content>
                    <BannerSlider />
                    <FastLinks data={fastLinkData} key={fastLinkData.index} />
                    <SecondBanner />
                    <ThirdSection data={thirdSectionData} />
                    <AppDownloadSection />
                    <ForthSection data={forthSectionData} />
                    <SafetySection data={SafetySectionData} />
                    <ContactSection />
                </Content>
                <QAShortcut />
            </Layout>
            <style jsx global>
                {`
                    .ant-layout {
                        width: 100%;
                        min-height: 100vh;
                        overflow-x: hidden;
                    }

                    .ant-layout-content {
                        width: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default IndexPageComponent;

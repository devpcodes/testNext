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

import newAccount from '../../../../resources/images/pages/homepage/fast_link/a1-ic-01.svg';
import trade from '../../../../resources/images/pages/homepage/fast_link/a1-ic-02.svg';
import accounting from '../../../../resources/images/pages/homepage/fast_link/a1-ic-03.svg';
import stock from '../../../../resources/images/pages/homepage/fast_link/a1-ic-04.svg';
import support from '../../../../resources/images/pages/homepage/fast_link/a1-ic-05.svg';

import pig from '../../../../resources/images/pages/homepage/third_section/a1-ic-06.svg';
import stockSubs from '../../../../resources/images/pages/homepage/third_section/a1-ic-07.svg';
import python from '../../../../resources/images/pages/homepage/third_section/a1-ic-08.svg';
import borrow from '../../../../resources/images/pages/homepage/third_section/a1-ic-09.svg';
import receipt from '../../../../resources/images/pages/homepage/third_section/a1-ic-10.svg';
import noLimit from '../../../../resources/images/pages/homepage/third_section/a1-ic-11.svg';

import preview from '../../../../resources/images/pages/homepage/forth_section/preview.png';
import SafetySection from '../element/SafetySection';

import gov from '../../../../resources/images/pages/homepage/safety_section/a1-ic-12.svg';
import safe from '../../../../resources/images/pages/homepage/safety_section/a1-ic-13.svg';
import security from '../../../../resources/images/pages/homepage/safety_section/a1-ic-14.svg';
import RichClub from '../element/RichClub';
import subInfo from '../../../../resources/images/pages/homepage/safety_section/subInfo.svg';
import { checkServer } from '../../../../services/checkServer';
const IndexPageComponent = ({ richClubNews }) => {
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
            link: `${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Taiex/`,
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
                site: 'outer',
                link:
                    'https://aiinvest.sinotrade.com.tw/?utm_campaign=AIIN_inchannel&utm_source=newweb&utm_medium=button_0427&strProd=0055&strWeb=0035',
                icon: `${pig}`,
                target: '_blank',
            },
            {
                title: '申購專區',
                description: '申購零門檻，備足資金抽起來',
                site: 'inner',
                link: `/subscriptionArea/Subscription`,
                icon: `${stockSubs}`,
                target: '_self',
            },
            {
                title: '申購信用通',
                description: '先抽後付，用小資金放大機會',
                site: 'outer',
                link: !checkServer()
                    ? location.protocol +
                      '//' +
                      location.host +
                      `${process.env.NEXT_PUBLIC_SUBPATH}` +
                      '/subscriptionArea/ProductInfo/'
                    : `${process.env.NEXT_PUBLIC_SUBPATH}` + '/subscriptionArea/ProductInfo/',
                icon: `${subInfo}`,
                target: '_blank',
            },
            {
                title: 'Python API',
                description: '程式交易就是要簡單快速',
                site: 'outer',
                link:
                    'https://www.sinotrade.com.tw/ec/20191125/Main/index.aspx?utm_campaign=PTAPI_inchannel&utm_source=newweb&utm_medium=button_0427',
                icon: `${python}`,
                target: '_blank',
            },
            {
                title: '自然人借券',
                description: '出借庫存股票，低風險、生好息',
                site: 'outer',
                link: 'https://www.sinotrade.com.tw/SS/Main/LendMenu.aspx',
                icon: `${borrow}`,
                target: '_blank',
            },
            {
                title: '不限用途借貸',
                description: '隨時借隨時還，撥款超快速',
                site: 'outer',
                link: `/newweb/loan-zone/Overview`,
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
                description: '透過嚴密的數據加密與驗證機制，保護雙方資料傳輸的安全性，提供客戶安全且穩定的交易過程。',
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
                    <RichClub richClubNews={richClubNews} />
                    {/* <ForthSection data={forthSectionData} /> */}
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
                        background-color: #f9fbff;
                    }

                    .main-content {
                        background-color: #f9fbff;
                    }
                    .ant-carousel .slick-dots {
                        z-index: 9;
                    }
                `}
            </style>
        </>
    );
};

export default IndexPageComponent;

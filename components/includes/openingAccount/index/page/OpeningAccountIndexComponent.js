import { useState } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import OpenAccountHeader from '../element/OpenAccountHeader';
import SecuritiesAccountMenu from '../element/SecuritiesAccountMenu';
import AppointmentOpenAccount from '../element/AppointmentOpenAccount';

//securitiesAccountTypes
import icon_futures from '../../../../../resources/images/pages/open_account/img-service-user-futures.svg';
import icon_credit from '../../../../../resources/images/pages/open_account/img-service-user-credit.svg';
import icon_sub_brokerage from '../../../../../resources/images/pages/open_account/img-service-sub-brokerage.svg';
import icon_manager_trust from '../../../../../resources/images/pages/open_account/img-service-manager-trust.svg';
import icon_management from '../../../../../resources/images/pages/open_account/img-service-user-management.svg';
import icon_borrow from '../../../../../resources/images/pages/open_account/img-service-user-borrow.svg';
import icon_no_limit_money from '../../../../../resources/images/pages/open_account/img-service-no-limit-money.svg';
import icon_search from '../../../../../resources/images/pages/open_account/img-service-progress-search.svg';

//closeCounter
import icon1 from '../../../../../resources/images/pages/open_account/img-card1.svg';
import icon2 from '../../../../../resources/images/pages/open_account/img-card2.svg';
import icon3 from '../../../../../resources/images/pages/open_account/img-card3.svg';

function OpeningAccountIndexComponent(props) {
    const { Content } = Layout;
    const router = useRouter();
    const [securitiesAccountTypes] = useState([
        {
            title: '信用戶',
            image: icon_credit,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_1?dirtype=99&strProd=0002&strWeb=0001',
        },
        {
            title: '期貨戶',
            image: icon_futures,
            link: 'https://www.sinotrade.com.tw/stfopenact?strProd=0002&strWeb=0001',
        },
        {
            title: '複委託',
            image: icon_sub_brokerage,
            link: 'https://www.sinotrade.com.tw/EX/OpenCount/Apply_SUB01.aspx?dirtype=99&strProd=0002&strWeb=0001',
        },
        {
            title: '財管信託',
            image: icon_manager_trust,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_1?dirtype=99&strProd=0002&strWeb=0001',
        },
        {
            title: '財管人工戶',
            image: icon_management,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_5?dirtype=99&strProd=0002&strWeb=0001',
        },
        {
            title: '借券戶',
            image: icon_borrow,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_2?dirtype=99&strProd=0002&strWeb=0001',
        },
        ,
        {
            title: '不限用途款項',
            image: icon_no_limit_money,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_3?dirtype=99&strProd=0002&strWeb=0001',
        },
        ,
        {
            title: '加開進度查詢',
            image: icon_search,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_2?dirtype=99&strProd=0002&strWeb=0001',
        },
    ]);
    const [closeCounter] = useState([
        {
            title: '預約開戶',
            image: icon1,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_1_1?dirtype=99&strProd=0002&strWeb=0001',
        },
        {
            title: '查詢營業據點',
            image: icon2,
            link: 'https://www.sinotrade.com.tw/newweb/Service_Positions/',
        },
        {
            title: '臨櫃進度查詢',
            image: icon3,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_14?dirtype=99&strProd=0002&strWeb=0001',
        },
    ]);

    return (
        <Layout>
            <OpenAccountHeader />
            <Content className="layoutContent">
                <h2 className="secondTitle">證券戶加開</h2>
                <SecuritiesAccountMenu linkData={securitiesAccountTypes} />
                <h2 className="secondTitle">預約臨櫃開戶</h2>
                <AppointmentOpenAccount linkData={closeCounter} />
            </Content>
            <style jsx>
                {`
                    .layoutContent {
                        width: 71%;
                        margin: auto;
                        margin-top: 40px;
                    }

                    .secondTitle {
                        padding-left: 16px;
                        margin-bottom: 16px;
                        border-left: 4px solid #daa360;
                        font-size: 24px;
                        line-height: 2.7rem;
                        font-weight: 600;
                    }

                    @media screen and (max-width: 768px) {
                        .layoutContent {
                            width: 100%;
                            padding: 32px;
                            padding-right: calc(32px - 16px);
                            padding-bottom: calc(32px - 8px);
                            margin: 0;
                        }
                    }

                    @media screen and (max-width: 450px) {
                        .layoutContent {
                            width: 100%;
                            padding: 24px 16px 0;
                            padding-right: calc(24px - 16px);
                            margin-top: 0;
                        }

                        .secondTitle {
                            border-left: 5px solid #daa360;
                        }
                    }
                `}
            </style>
        </Layout>
    );
}

export default OpeningAccountIndexComponent;

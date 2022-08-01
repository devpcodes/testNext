import { useState } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import OpenAccountHeader from '../element/OpenAccountHeader';
import SecuritiesAccountMenu from '../element/SecuritiesAccountMenu';
import AppointmentOpenAccount from '../element/AppointmentOpenAccount';

//securitiesAccountTypes
import icon_futures from '../../../../../resources/images/pages/open_account/img-service-user-futures.svg';
import icon_credit from '../../../../../resources/images/pages/open_account/a41-ic-01.svg';
import icon_renewal from '../../../../../resources/images/pages/open_account/a-41-ic-09.svg';
import icon_sub_brokerage from '../../../../../resources/images/pages/open_account/a41-ic-03.svg';
import icon_manager_trust from '../../../../../resources/images/pages/open_account/a41-ic-04.svg';
import icon_management from '../../../../../resources/images/pages/open_account/img-service-user-management.svg';
import icon_borrow from '../../../../../resources/images/pages/open_account/a41-ic-05.svg';
import icon_no_limit_money from '../../../../../resources/images/pages/open_account/a41-ic-06.svg';
import icon_search from '../../../../../resources/images/pages/open_account/a41-ic-07.svg';

//feature
import featureOpen from '../../../../../resources/images/pages/open_account/a41-ic-02.svg';
import featureOpenDetail from '../../../../../resources/images/pages/open_account/a41-ic-07.svg';
//closeCounter
import icon1 from '../../../../../resources/images/pages/open_account/a41-img-01.jpg';
import icon2 from '../../../../../resources/images/pages/open_account/a41-img-02.jpg';
import icon3 from '../../../../../resources/images/pages/open_account/a41-img-03.jpg';

function OpeningAccountIndexComponent(props) {
    const { Content } = Layout;
    const router = useRouter();
    const [securitiesAccountTypes] = useState([
        {
            title: '信用戶(新開)',
            image: icon_credit,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_1?dirtype=99&strProd=0037&strWeb=0035',
        },
        {
            title: '信用戶(續約)',
            image: icon_renewal,
            link: process.env.NEXT_PUBLIC_OPENING_ACCOUNT_USER_RENEWAL,
        },
        {
            title: '複委託',
            image: icon_sub_brokerage,
            link: 'https://www.sinotrade.com.tw/EX/OpenCount/Apply_SUB01.aspx?dirtype=99&strProd=0037&strWeb=0035',
        },
        {
            title: '財管信託',
            image: icon_manager_trust,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_1?dirtype=99&strProd=0037&strWeb=0035',
        },
        // {
        //     title: '財管人工戶',
        //     image: icon_management,
        //     link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_5?dirtype=99&strProd=0002&strWeb=0001',
        // },
        {
            title: '借券戶',
            image: icon_borrow,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_2?dirtype=99&strProd=0037&strWeb=0035',
        },
        ,
        ,
        // {
        //     title: '不限用途款項',
        //     image: icon_no_limit_money,
        //     link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_9_4_3?dirtype=99&strProd=0037&strWeb=0035',
        // },
        {
            title: '加開進度查詢',
            image: icon_search,
            link: process.env.NEXT_PUBLIC_OPENING_ACCOUNT_USER_ADDSEARCH,
        },
    ]);
    const [closeCounter] = useState([
        {
            title: '預約開戶',
            image: icon1,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_1_1?dirtype=99&strProd=0037&strWeb=0035',
        },
        {
            title: '查詢營業據點',
            image: icon2,
            link: `/Service_Positions/`,
        },
        {
            title: '臨櫃進度查詢',
            image: icon3,
            link: 'https://www.sinotrade.com.tw/CSCenter/CSCenter_13_14?dirtype=99&strProd=0037&strWeb=0035',
        },
    ]);
    const [featureAccountTypes] = useState([
        {
            title: '期貨戶',
            image: featureOpen,
            link: 'https://www.sinotrade.com.tw/stfopenact?strProd=0037&strWeb=0035',
        },
        {
            title: '開戶進度查詢',
            image: featureOpenDetail,
            link: `https://www.sinotrade.com.tw/stfopenact/progress?strProd=0037&strWeb=0035`,
        },
    ]);
    const [loanZoneTypes] = useState([
        {
            title: '不限用途款項',
            image: icon_no_limit_money,
            link: process.env.NEXT_PUBLIC_LOAN_SERVICE + '/exopact/LNA/Index',
        },
        ,
        {
            title: '加開進度查詢',
            image: icon_search,
            link: process.env.NEXT_PUBLIC_LOAN_SERVICE + '/exopact/LNA/PQLogin',
        },
    ]);
    return (
        <Layout>
            <OpenAccountHeader />
            <Content className="layoutContent">
                <h2 className="secondTitle">證券戶加開</h2>
                <SecuritiesAccountMenu linkData={securitiesAccountTypes} />
                <div className="flexBox">
                    <div>
                        <h2 className="secondTitle">期貨開戶</h2>
                        <SecuritiesAccountMenu linkData={featureAccountTypes} />
                    </div>
                    <div>
                        <h2 className="secondTitle">不限用途款項借貸申辦</h2>
                        <SecuritiesAccountMenu linkData={loanZoneTypes} />
                    </div>
                </div>
                <h2 className="secondTitle">預約臨櫃開戶</h2>
                <AppointmentOpenAccount linkData={closeCounter} />
            </Content>
            <style jsx>
                {`
                    .flexBox {
                        display: flex;
                    }
                    .layoutContent {
                        width: calc(944px + 32px);
                        margin: auto;
                        margin-top: 40px;
                    }

                    .secondTitle {
                        padding-left: 16px;
                        margin-bottom: 16px;
                        border-left: 4px solid #daa360;
                        font-size: 24px;
                        line-height: 2.7rem;
                        font-weight: 700;
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
                    @media screen and (max-width: 767px) {
                        .flexBox {
                            flex-wrap: wrap;
                        }
                        .flexBox * {
                            width: 100%;
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
                            font-size: 20px;
                            border-left: 5px solid #daa360;
                        }
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .flexBox .ant-col-lg-6 {
                        max-width: 50%;
                    }

                    @media screen and (max-width: 767px) {
                    }

                    @media screen and (max-width: 450px) {
                    }
                `}
            </style>
        </Layout>
    );
}

export default OpeningAccountIndexComponent;

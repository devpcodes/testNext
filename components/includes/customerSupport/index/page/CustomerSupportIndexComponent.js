import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { wrapper } from '../../../../../store/store';
import { setNavItems } from '../../../../../store/components/layouts/action';
import QuestionSearchHeader from '../element/QuestionSearchHeader';
import { getCommonQuestionCategories } from '../../../../../services/components/customerSupport/customerSupportService';
import ShortcutFunction from '../element/ShortcutFunction';
import IndexQuestionCategoryCards from '../element/IndexQuestionCategoryCards';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';

//images
import icon_guideline from '../../../../../resources/images/pages/customer_support/img-service-guideline.svg';
import icon_account from '../../../../../resources/images/pages/customer_support/img-service-account.svg';
import icon_password from '../../../../../resources/images/pages/customer_support/img-service-password.svg';
import icon_contact from '../../../../../resources/images/pages/customer_support/img-service-contact.svg';
import icon_paper from '../../../../../resources/images/pages/customer_support/img-service-paper.svg';
import icon_site from '../../../../../resources/images/pages/customer_support/img-service-site.svg';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const CustomerSupportIndexComponent = () => {
    const { Content } = Layout;
    const router = useRouter();
    const [iconLink] = useState([
        {
            title: '新手上路',
            image: icon_guideline,
            link: '/opening-account/beginner',
            site: 'inner',
            target: '_self',
        },
        {
            title: '開戶進度查詢',
            image: icon_account,
            link: 'https://www.sinotrade.com.tw/openact/progress?strProd=0002&strWeb=0001',
            site: 'outer',
            target: '_blank',
        },
        {
            title: '密碼專區',
            image: icon_password,
            link: `${process.env.NEXT_PUBLIC_SUBPATH}/Service_ForgetPassword/`,
            site: 'outer',
            target: '_self',
        },
        {
            title: '查詢營業員',
            image: icon_contact,
            link: 'https://www.sinotrade.com.tw/sinotradeSalesQry/Sales.aspx',
            site: 'outer',
            target: '_blank',
        },
        {
            title: '簽署中心',
            image: icon_paper,
            link: `${process.env.NEXT_PUBLIC_SUBPATH}/Inside_Frame/?URL=https://service.sinotrade.com.tw/signCenter/index/`,
            site: 'outer',
            target: '_self',
        },
        {
            title: '營業據點',
            image: icon_site,
            link: `${process.env.NEXT_PUBLIC_SUBPATH}/Service_Positions/`,
            site: 'outer',
            target: '_self',
        },
    ]);
    const [firstCategoryAndQuestion, setFirstCategoryAndQuestion] = useState([]);
    const [hoverCategoryId, setHoverCategoryId] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');

    const toggleSetCategoryHover = id => {
        setHoverCategoryId(id);
    };

    const setNoneCategoryHover = () => {
        setHoverCategoryId(0);
    };

    const onInput = e => {
        setSearchKeyword(e.target.value);
    };

    const toQuestionList = key => {
        router.push(`/customer-support/question?key=${key}`);
    };

    const onEnterKeyword = () => {
        router.push({
            pathname: '/customer-support/search-result',
            query: { keyword: searchKeyword },
        });
    };

    useEffect(async () => {
        const data = await getCommonQuestionCategories(5);
        setFirstCategoryAndQuestion(data);
    }, []);

    return (
        <Layout>
            <QuestionSearchHeader
                defaultValue={searchKeyword}
                value={searchKeyword}
                onInput={onInput}
                onPressEnter={onEnterKeyword}
            />
            <Content className="layoutContent">
                <h2 className="secondTitle">快捷功能</h2>
                <ShortcutFunction linkData={iconLink} />
                <div className="qaBlockTitle">
                    <h2 className="secondTitle">常見問題</h2>
                    <div className="secondTitleRight">
                        <Link href="/customer-support/question">
                            <a>完整問題</a>
                        </Link>
                        <RightOutlined className="fullQuestionRightIcon" />
                    </div>
                </div>
                <IndexQuestionCategoryCards
                    firstCategoryAndQuestion={firstCategoryAndQuestion}
                    toggleSetCategoryHover={toggleSetCategoryHover}
                    hoverCategoryId={hoverCategoryId}
                    setNoneCategoryHover={setNoneCategoryHover}
                    toQuestionList={toQuestionList}
                />
            </Content>
            <style jsx>
                {`
                    .layoutContent {
                        width: 71%;
                        margin: auto;
                        margin-top: 40px;
                    }

                    @media screen and (max-width: 768px) {
                        .layoutContent {
                            width: 91%;
                        }
                    }

                    .layoutContent h2 {
                        color: #0d1623;
                    }

                    .qaBlockTitle {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 40px;
                        margin-bottom: 1rem;
                    }

                    .secondTitle {
                        padding-left: 16px;
                        margin-bottom: 16px;
                        border-left: 4px solid #daa360;
                        font-size: 24px;
                        line-height: 2.7rem;
                        font-weight: 600;
                    }

                    .secondTitleRight {
                        display: flex;
                        align-items: center;
                    }

                    .secondTitleRight > a {
                        margin-bottom: 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: #0d1623;
                        cursor: pointer;
                    }

                    .secondTitleRight > a:hover {
                        color: #daa360;
                    }

                    @media screen and (max-width: 768px) {
                        .secondTitleRight > a {
                            display: none;
                        }
                    }
                `}
            </style>

            <style jsx global>
                {`
                    .fullQuestionRightIcon {
                        margin-left: 8px;
                        font-size: 13px;
                    }

                    .secondTitleRight:hover > span {
                        color: #daa360;
                        transition: color 0.5s;
                    }

                    @media screen and (max-width: 768px) {
                        .fullQuestionRightIcon {
                            display: none;
                        }
                    }
                `}
            </style>
        </Layout>
    );
};

export default CustomerSupportIndexComponent;

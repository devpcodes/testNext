import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { useSelector } from 'react-redux';
import { PageHead } from '../components/includes/PageHead';
import { DataCard } from '../components/includes/bigProfitLoss/DataCard';

import theme from '../resources/styles/theme';
import reloadImg from '../resources/images/pages/BigProfitLoss/ic_reload.svg';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

function BigProfitLoss() {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <PageHead title={'損益查詢'} />
            <div className="body__container">
                <div className="topBar__container">
                    <div className="account__container"></div>
                    <button className="reload__btn">
                        <img src={reloadImg} alt="reload"></img>
                        {!isMobile && <span>更新</span>}
                    </button>
                </div>
                <div className="text__container">
                    <p className="text">查詢時間：2021.01.29 10:53</p>
                    {!isMobile && <p className="text">交易幣別：新台幣</p>}
                </div>
                <DataCard title={'買進成交總金額'} subTitle={'含手續費'} number={'168,168,000'} styleType={'buy'} />
                <DataCard
                    title={'賣出成交總金額'}
                    subTitle={'含手續費及交易稅'}
                    number={'912,951,213'}
                    styleType={'sell'}
                />
                <DataCard title={'當日已實現損益'} number={'+8,168,005'} />
                <DataCard title={'未實現損益'} number={'-999,168,752'} />
                {isMobile && <p className="text__remark">註：金額皆含手續費或交易稅</p>}
            </div>
            <style jsx>{`
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
                p {
                    margin: 0;
                }
                .body__container {
                    width: 50%;
                    margin: 0 auto;
                    padding: 24px 0;
                }
                .topBar__container,
                .text__container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .account__container {
                    width: 260px;
                    height: 44px;
                    border: solid 1px #a9b6cb;
                }
                button.reload__btn {
                    width: 128px;
                    height: 44px;
                    background-color: #c43826;
                    font-size: 1.6rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                button.reload__btn span {
                    margin: 0 0 0 8px;
                }
                .text__container {
                    margin: 24px 0 0 0;
                    height: 22px;
                }
                .text__container .text {
                    height: 22px;
                    line-height: 22px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                @media (max-width: 1024px) {
                    .body__container {
                        width: 90%;
                        margin: 0 auto;
                    }
                }
                @media (max-width: ${theme.mobileBreakPoint}px) {
                    .body__container {
                        width: 100%;
                        padding: 16px;
                    }
                    .account__container {
                        width: calc(100% - 56px);
                    }
                    button.reload__btn {
                        width: 44px;
                    }
                    .text__container {
                        margin: 12px 0;
                    }
                    .text__remark {
                        height: 22px;
                        line-height: 22px;
                        font-size: 1.6rem;
                        color: #a9b6cb;
                    }
                }
            `}</style>
        </>
    );
}

export default BigProfitLoss;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { DataCard } from './DataCard';

import theme from '../../../resources/styles/theme';
import reloadImg from '../../../resources/images/pages/BigProfitLoss/ic_reload.svg';
import { getProfitLoss } from '../../../services/components/bigProfitLoss/profitLossFetcher';
import { getToken } from '../../../services/user/accessToken';

export const ProfitLoss = () => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = date => {
        let newDate = '--';
        if (date) {
            newDate = moment(date, 'YYYYMMDD').format('YYYY.MM.DD');
        }
        return newDate;
    };

    const formatTime = time => {
        let newTime = '--';
        if (time) {
            newTime = moment(time, 'hhmmss').format('hh:mm:ss');
        }
        return newTime;
    };

    const fetchData = async ({ broker_id, account }) => {
        const data = {
            token: getToken(),
            branch: broker_id,
            account: account,
        };
        setIsLoading(true);
        try {
            const res = await getProfitLoss(data);
            // console.log(`========= res:`, res);
            setData(res.result);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('getProfitLoss-error:', error);
        }
    };

    useEffect(() => {
        // console.log(`========== currentAccount:`, currentAccount);
        if (Object.keys(currentAccount).length !== 0) {
            fetchData(currentAccount);
        }
    }, [currentAccount]);

    return (
        <>
            <div className="body__container">
                <div className="topBar__container">
                    <div className="account__container"></div>
                    <button
                        className="reload__btn"
                        onClick={() => {
                            fetchData(currentAccount);
                        }}
                        disabled={isLoading}
                    >
                        <img src={reloadImg} alt="reload"></img>
                        {!isMobile && <span>更新</span>}
                    </button>
                </div>
                <div className="text__container">
                    <p className="text">
                        查詢時間：{`${formatDate(data?.updateDate)} ${formatTime(data?.updateTime)}`}
                    </p>
                    {!isMobile && <p className="text">交易幣別：新台幣</p>}
                </div>
                <DataCard title={'買進成交總金額'} subTitle={'含手續費'} value={data?.buyAmount} styleType={'buy'} />
                <DataCard
                    title={'賣出成交總金額'}
                    subTitle={'含手續費及交易稅'}
                    value={data?.sellAmount}
                    styleType={'sell'}
                />
                <DataCard title={'當日已實現損益'} value={data?.realPrtlosSum} numberStyle={true} />
                <DataCard title={'未實現損益'} value={data?.unrealPrtlosSum} numberStyle={true} />
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
                    background-color: ${theme.colors.primary};
                    font-size: 1.6rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: ${theme.button.transition};
                }
                button.reload__btn:hover:enabled {
                    background-color: ${theme.colors.primaryHover};
                }
                button.reload__btn span {
                    margin: 0 0 0 8px;
                }
                button.reload__btn:disabled {
                    opacity: 50%;
                }
                button.reload__btn:disabled img {
                    animation: spin 0.5s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
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
};

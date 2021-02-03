import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Select } from 'antd';
import { DataCard } from './DataCard';

import theme from '../../../resources/styles/theme';
import reloadImg from '../../../resources/images/components/hfProfitLoss/ic_reload.svg';
import dropdownImg from '../../../resources/images/components/hfProfitLoss/arrow-chevron-down.svg';
import { getProfitLoss } from '../../../services/components/hfProfitLoss/profitLossFetcher';
import { getToken } from '../../../services/user/accessToken';
import { setCurrentAccount } from '../../../store/user/action';

const { Option } = Select;

const DropDownArrow = () => {
    return (
        <>
            <img src={dropdownImg} alt="arrow" className="dropDownArrow__img"></img>
        </>
    );
};

export const ProfitLoss = () => {
    const dispatch = useDispatch();
    const isMobile = useSelector(store => store.layout.isMobile);
    const accounts = useSelector(store => store.user.accounts);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const userSettings = useSelector(store => store.user.userSettings);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [stockAccounts, setStockAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleChange = value => {
        const selectedAccount = stockAccounts.find(account => `${account.broker_id}-${account.account}` === value);
        if (selectedAccount) {
            dispatch(setCurrentAccount(selectedAccount));
            setSelectedAccount(selectedAccount);
        }
    };

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
            setData(res.result);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('getProfitLoss-error:', error);
        }
    };

    const getData = selectedAccount => {
        if (selectedAccount != null) {
            fetchData(selectedAccount);
        }
    };

    useEffect(() => {
        const stockAccounts = accounts.filter(account => account.accttype === 'S');
        if (Array.isArray(stockAccounts) && stockAccounts.length) {
            setStockAccounts(stockAccounts);
        }
    }, [accounts]);

    /*
        處理與個人選單帳號連動的邏輯。
        因定時洗價損益查詢功能只限台股帳號，個人選單帳號為台股時，與個人選單連動；
        個人選單帳號非台股時，以個人化設定的台股帳號或第一筆台股帳號為預設帳號顯示。
    */
    useEffect(() => {
        if (currentAccount?.accttype === 'S') {
            const selectedAccount = stockAccounts.find(
                account =>
                    `${account.broker_id}-${account.account}` ===
                    `${currentAccount.broker_id}-${currentAccount.account}`,
            );
            if (selectedAccount) {
                setSelectedAccount(selectedAccount);
            }
        } else if (currentAccount?.accttype !== 'S' && Array.isArray(stockAccounts) && stockAccounts.length) {
            const selectedAccount = stockAccounts.find(
                account => `${account.broker_id}-${account.account}` === userSettings?.defaultStockAccount,
            );
            if (selectedAccount) {
                setSelectedAccount(selectedAccount);
            } else {
                setSelectedAccount(stockAccounts[0]);
            }
        }
    }, [currentAccount, stockAccounts]);

    useEffect(() => {
        getData(selectedAccount);
    }, [selectedAccount]);

    return (
        <>
            <div className="body__container">
                <div className="topBar__container">
                    <Select
                        // defaultValue={`${currentAccount.broker_id}-${currentAccount.account}`}
                        value={
                            selectedAccount ? `${selectedAccount?.broker_id}-${selectedAccount?.account}` : '無可用帳號'
                        }
                        style={{
                            width: isMobile ? 'calc(100% - 56px)' : 260,
                            border: 'solid 1px #a9b6cb',
                            height: 44,
                            fontSize: '1.6rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onChange={handleChange}
                        getPopupContainer={trigger => trigger.parentElement}
                        bordered={false}
                        suffixIcon={<DropDownArrow />}
                        notFoundContent={null}
                    >
                        {stockAccounts.map(account => (
                            <Option
                                key={account.datacount}
                                value={`${account.broker_id}-${account.account}`}
                            >{`${account.broker_id}-${account.account} ${account.username}`}</Option>
                        ))}
                    </Select>
                    <button className="reload__btn" onClick={() => getData(selectedAccount)} disabled={isLoading}>
                        <img src={reloadImg} alt="reload"></img>
                        {!isMobile && <span>更新</span>}
                    </button>
                </div>
                <div className="text__container">
                    <p className="text">
                        更新時間：{`${formatDate(data?.updateDate)} ${formatTime(data?.updateTime)}`}
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
            <style jsx global>{`
                .topBar__container .dropDownArrow__img {
                    position: absolute;
                    top: -6px;
                    right: 0px;
                }
            `}</style>
        </>
    );
};

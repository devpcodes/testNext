import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import { useUser } from '../../../../../hooks/useUser';
import { fetchAccountStatus } from '../../../../../services/components/loznZone/calculation/fetchAccountStatus';
import { getToken } from '../../../../../services/user/accessToken';
import { showLoginHandler } from '../../../../../store/components/layouts/action';
import BuyButton from '../../../tradingAccount/vipInventory/buttons/BuyButton';
import LoanCalculationItem from './LoanCalculationItem';
import { setModal } from '../../../../../store/components/layouts/action';
import { formatNum } from '../../../../../services/formatNum';
import SinoBtn from './SinoBtn';
import { fetchApplyStatus } from '../../../../../services/components/loznZone/calculation/fetchApplyStatus';
import { debounce } from '../../../../../services/throttle';
import { fetchRepaymentAccount } from '../../../../../services/components/loznZone/overview/fetchRepaymentAccount';
// import arrow from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy.svg'
const LoanCalculation = ({
    loanDays,
    allLoanMoney,
    interest,
    handlingFee,
    qty,
    currentKey,
    submitData,
    goLoanHandler,
    getPhone,
}) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    // const [hasSubmitAccount, setHasSubmitAccount] = useState(false);
    const { isLogin, accounts } = useUser();
    const [loanIdno, setLoanIdno] = useState('');
    const accountError = useRef(false);
    const [loanAccounts, setLoanAccounts] = useState([]);
    const [repaymentAcc, setRepaymentAcc] = useState({});
    // const loanIdno = useRef('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogin) {
            getAccountStatus();
        }
    }, [isLogin]);

    useEffect(() => {
        debounce(checkAccountError, 500);
        debounce(getRepaymentAccount, 500);
    }, [currentAccount]);

    const getAccountStatus = async () => {
        const res = await fetchAccountStatus(getToken());
        if (res.success && res.result?.length > 0) {
            // setHasSubmitAccount(true)
            // loanIdno.current = jwt_decode(getToken()).user_id;
            // checkAccountError(res.result[0]);
            setLoanAccounts(res.result);
            // setLoanIdno(jwt_decode(getToken()).user_id);
        }
    };

    const getRepaymentAccount = async () => {
        try {
            const res = await fetchRepaymentAccount(getToken(), currentAccount.broker_id);
            getPhone(res.phone);
            setRepaymentAcc(res);
        } catch (error) {
            message.error('伺服器錯誤');
        }
    };

    const checkAccountError = async res => {
        if (res != null) {
            if (res.status !== 'A') {
                accountError.current = true;
            }
            return;
        }
        // debounce()
        const result = await fetchAccountStatus(getToken());
        console.log('++++++', result);
        if (result?.result[0]?.status !== 'A') {
            accountError.current = true;
            return;
        }
        accountError.current = false;
    };

    const submitHandler = async () => {
        if (!isLogin) {
            console.log(isLogin);
            dispatch(showLoginHandler(true));
            return;
        }
        // console.log('------', loanIdno.current, currentAccount?.idno)
        console.log('allLoanMoney', allLoanMoney);
        if (loanAccounts.length === 0) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'confirm',
                    title: '提醒',
                    content: '歡迎您使用永豐金證券不限用途款項借貸服務，請先申辦借貸戶加入不限用途的行列。',
                    okText: '立即申辦',
                    cancelText: '稍後申辦',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    onOk: () => {
                        window.open(process.env.NEXT_PUBLIC_LOANACCOUNT);
                    },
                }),
            );
            return;
        }
        if (!checkLoanCurrentAccount()) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'confirm',
                    title: '提醒',
                    content:
                        '噯呀糟糕！這個帳號不是您所開立的不限用途款項借貸帳號呢！請先進行股票匯撥，再接續借貸申請。',
                    okText: '立即匯撥',
                    cancelText: '稍後匯撥',
                    noCloseIcon: true,
                    noTitleIcon: true,
                }),
            );
            return;
        }
        console.log('accountError', accountError.current);
        if (!checkLoanAccountStatus()) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'info',
                    title: '提醒',
                    content: `噯呀糟糕！目前您的不限用途借貸帳戶狀態異常，請洽您的營業員。${repaymentAcc.phone}`,
                    okText: '確認',
                    noCloseIcon: true,
                    noTitleIcon: true,
                }),
            );
            return;
        }
        if (allLoanMoney === '--' || submitData.length === 0 || allLoanMoney == 0) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'info',
                    title: '提醒',
                    content: (
                        <>
                            <p>請勾選單保品後進行試算</p>
                        </>
                    ),
                    okText: '確認',
                    noCloseIcon: true,
                    noTitleIcon: true,
                }),
            );
            return;
        }
        //判斷當日有無借款
        const status = await checkApplyStatus();
        //判斷是否為內部人
        const notInsider = checkInsider(submitData);
        //判斷授信額度
        const quota = await checkQuota(submitData[0].canFinancing, allLoanMoney);
        console.log('quota', quota);
        if (status && notInsider && quota) {
            goLoanHandler();
        }

        //'歡迎您使用永豐金證券不限用途款項借貸服務，請先申辦借貸戶加入不限用途的行列。'
    };

    const checkLoanCurrentAccount = () => {
        const haveCanLoanAccount = loanAccounts.filter(item => {
            if (item.account === currentAccount?.account) {
                return true;
            }
        });
        return haveCanLoanAccount.length > 0 ? true : false;
    };

    const checkLoanAccountStatus = () => {
        const loanAccountStatus = loanAccounts.filter(item => {
            if (item.account === currentAccount?.account && item.status === 'A') {
                return true;
            }
        });
        return loanAccountStatus.length > 0 ? true : false;
    };

    const checkQuota = (canFinancing, allLoanMoney) => {
        if (allLoanMoney > canFinancing) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'info',
                    title: '提醒',
                    content: (
                        <>
                            <p>噯呀糟糕！您的可借款額度已達您當初所申請的授信上限。</p>
                            <p>
                                (您可至不限用途帳戶總覽查看您的授信額度，若要調高授信上限請洽您的所屬業務員。
                                {`${repaymentAcc.phone}`})
                            </p>
                        </>
                    ),
                    okText: '確認',
                    noCloseIcon: true,
                    noTitleIcon: true,
                }),
            );
            return false;
        }
        return true;
    };

    const checkInsider = data => {
        const newData = data.filter(element => {
            if (element.insider === 'Y') {
                return true;
            }
        });
        console.log('insider', newData);
        if (newData.length > 0) {
            dispatch(
                setModal({
                    visible: true,
                    type: 'info',
                    title: '提醒',
                    content: (
                        <>
                            <p>
                                提醒您，公司內部人之股票借款須至臨櫃設質後辦理。請取消勾選畫面中您為內部人之股票，再進行線上借貸。
                            </p>
                            <p>若您的內部人身分已異動，請洽您的所屬業務員。{repaymentAcc.phone}</p>
                        </>
                    ),
                    okText: '確認',
                    noCloseIcon: true,
                    noTitleIcon: true,
                }),
            );
            return false;
        }
        return true;
    };

    const checkCanLoan = data => {
        console.log('[DATA]', data);
        const newData = data.filter(element => {
            console.log('[element]', element);
            if (element.canCancel !== 'Y') {
                console.log('[element]', element.canCancel);
                return true;
            }
            // else if (element.status !== '2' && element.status !== '4') {
            //     return true;
            // }
        });
        console.log('[newData]', newData);
        if (newData.length > 0) {
            return false;
        }
        return true;
    };
    const checkApplyStatus = async () => {
        try {
            const res = await fetchApplyStatus(
                getToken(),
                currentAccount.broker_id,
                currentAccount.account,
                moment().format('YYYYMMDD'),
                moment().format('YYYYMMDD'),
            );
            if (res.length === 0) {
                return true;
            } else {
                const canLoan = checkCanLoan(res);
                if (canLoan) {
                    return true;
                }
                dispatch(
                    setModal({
                        visible: true,
                        type: 'info',
                        title: '提醒',
                        content: (
                            <>
                                <p>噯呀糟糕！您的借貸申請次數已達當日上限，請勿重複申請。</p>
                                <p>
                                    若有調整借款需求，請至借貸明細 > 在途中進行編輯。或洽您的所屬業務員。
                                    {repaymentAcc.phone}
                                </p>
                            </>
                        ),
                        okText: '確認',
                        noCloseIcon: true,
                        noTitleIcon: true,
                    }),
                );
                return;
            }
        } catch (error) {
            message.error(error);
        }
        return false;
    };
    // console.log('---------...........', isLogin, loanIdno.current,  loanIdnoa);
    return (
        <div className="caluculation">
            <p className="calculation__all">可借款總額</p>
            <span className="calculation__money">{formatNum(allLoanMoney || '--')}</span>
            <span className="calculation__unit">元</span>
            <div className="calculation__line"></div>
            <div className="calculation__detail--container">
                <LoanCalculationItem
                    style={{ marginBottom: '12px' }}
                    label="預計借款天數"
                    num={loanDays || '--'}
                    unit="天"
                />
                <LoanCalculationItem
                    style={{ marginBottom: '12px' }}
                    label="預估利息"
                    num={interest || '--'}
                    unit="元"
                    tooltipText="預估利息=可貸款額度 * 利率 * ( 貸款天數/365 )"
                />
                <LoanCalculationItem
                    style={{ marginBottom: '12px' }}
                    label="手續費"
                    num={handlingFee || '--'}
                    unit="元"
                />
                <LoanCalculationItem style={{ marginBottom: '23px' }} label="撥券費" num={qty || '--'} unit="元" />
            </div>
            <div className="calculation__line"></div>
            <p className="calculation__description">以上試算結果僅供參考，最終可借款總額以實際金額為主。</p>
            {/* <BuyButton onClick={submitHandler} text="立即借貸" width="100%" height="48px" fontSize="16px" color="#c43826"/> */}
            <SinoBtn
                style={{
                    width: '100%',
                    height: '48px',
                    fontSize: '16px',
                    background: currentKey === 'self' && isLogin && loanAccounts.length !== 0 ? '#e6ebf5' : '#c43826',
                    color: currentKey === 'self' && isLogin && loanAccounts.length !== 0 ? '#a9b6cb' : 'white',
                    border: 'none',
                }}
                parentClass="caluculation"
                text={'立即借貸'}
                onClick={submitHandler}
                disabled={currentKey === 'self' && isLogin && loanAccounts.length !== 0 ? true : false}
            />
            <div
                className="calculation__openAcc--container"
                style={{ display: isLogin && loanAccounts.length !== 0 ? 'none' : 'block' }}
            >
                <a
                    className="calcu__openAccount"
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_LOANACCOUNT}
                    rel="noreferrer noopener"
                >
                    立即申辦借貸帳戶
                    <span className="calcu__img">{'>'}</span>
                    {/* <img className="calcu__img" src={arrow} alt="借貸"/> */}
                </a>
            </div>
            <style jsx>{`
                .caluculation {
                    padding: 30px 30px 27px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                    /* height: 567px; */
                }
                .calculation__all {
                    color: #3f5372;
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .calculation__money {
                    font-size: 28px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    margin-bottom: 23px;
                    display: inline-block;
                }
                .calculation__unit {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    margin-left: 9px;
                }
                .calculation__line {
                    height: 1px;
                    background-color: #d7e0ef;
                }
                .calculation__detail--container {
                    margin-top: 24px;
                }
                .calculation__description {
                    margin-top: 23px;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.35px;
                    color: #3f5372;
                    margin-bottom: 16px;
                }
                .calculation__openAcc--container {
                    text-align: center;
                }
                .calcu__openAccount {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    margin-top: 25px;
                    display: inline-block;
                }
                .calcu__img {
                    margin-top: -3px;
                    margin-left: 9px;
                    font-weight: bold;
                    transform: scaleX(0.8);
                }
                .calcu__openAccount:hover {
                    color: #daa360;
                }
                @media (max-width: 920px) {
                    .caluculation {
                        border: none;
                        padding: 0;
                    }
                }
                /* .calcu__img:hover {
                    filter: invert(12%) sepia(63%) saturate(6234%) hue-rotate(246deg) brightness(87%) contrast(156%);
                } */
            `}</style>
            <style jsx global>{`
                .ant-drawer-header-no-title .ant-drawer-close {
                    margin-top: 4px;
                }
            `}</style>
        </div>
    );
};

export default LoanCalculation;

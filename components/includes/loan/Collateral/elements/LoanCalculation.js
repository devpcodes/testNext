import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
// import arrow from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy.svg'
const LoanCalculation = ({ loanDays, allLoanMoney, interest, handlingFee, qty, currentKey }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    // const [hasSubmitAccount, setHasSubmitAccount] = useState(false);
    const { isLogin, accounts } = useUser();
    const [loanIdno, setLoanIdno] = useState('');
    // const loanIdno = useRef('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLogin) {
            getAccountStatus();
        }
    }, [isLogin]);

    const getAccountStatus = async () => {
        const res = await fetchAccountStatus(getToken());
        if (res.success) {
            // setHasSubmitAccount(true)
            // loanIdno.current = jwt_decode(getToken()).user_id;
            setLoanIdno(jwt_decode(getToken()).user_id);
        }
    };

    const submitHandler = () => {
        if (!isLogin) {
            console.log(isLogin);
            dispatch(showLoginHandler(true));
            return;
        }
        // console.log('------', loanIdno.current, currentAccount?.idno)
        if (loanIdno === '') {
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
                }),
            );
            return;
        }
        if (loanIdno !== currentAccount?.idno) {
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

        alert('submit');
        //'歡迎您使用永豐金證券不限用途款項借貸服務，請先申辦借貸戶加入不限用途的行列。'
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
                    background: currentKey === 'self' && isLogin && loanIdno !== '' ? '#e6ebf5' : '#c43826',
                    color: currentKey === 'self' && isLogin && loanIdno !== '' ? '#a9b6cb' : 'white',
                    border: 'none',
                }}
                parentClass="caluculation"
                text={'立即借貸'}
                onClick={submitHandler}
                disabled={currentKey === 'self' && isLogin && loanIdno !== '' ? true : false}
            />
            <div
                className="calculation__openAcc--container"
                style={{ display: isLogin && loanIdno !== '' ? 'none' : 'block' }}
            >
                <a className="calcu__openAccount">
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

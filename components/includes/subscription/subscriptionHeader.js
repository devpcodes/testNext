import { useCallback, useState, useEffect, memo, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AccountDropdown } from '../personalArea/accountDropdown/AccountDropdown';
import info from '../../../resources/images/pages/subscription/ic-info.svg';
import Link from 'next/link';
import IconBtn from '../tradingAccount/vipInventory/IconBtn';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import icon from '../../../resources/images/components/mySubscription/ic-circle (1).svg';
import { setModal } from '../../../store/components/layouts/action';
const SubscriptionHeader = memo(({ onRefresh }) => {
    const dispatch = useDispatch();
    const newSubscriptionUrl = '/subscriptionArea/Subscription';
    const mySubscriptionUrl = '/subscriptionArea/MySubscription';
    const router = useRouter();
    const accounts = useSelector(store => store.user.accounts);
    const idno = useSelector(store => store.user.currentAccount.idno);
    const [newBtnActive, setNewBtnActive] = useState('');
    const [myBtnActive, setMyBtnActive] = useState('');
    const isMobile = useCheckMobile();
    useEffect(() => {
        console.log('---', router.pathname);
        if (router.pathname === newSubscriptionUrl) {
            setNewBtnActive(true);
            setMyBtnActive(false);
        }
        if (router.pathname === mySubscriptionUrl) {
            setMyBtnActive(true);
            setNewBtnActive(false);
        }
    }, [router.pathname]);
    const refreshClickHandler = () => {
        onRefresh();
    };
    const showDescription = () => {
        dispatch(
            setModal({
                visible: true,
                type: 'info',
                title: '申購說明',
                content: (
                    <div className="desc">
                        <p>
                            1.
                            主管機關規定每一位投資人限制申請同檔股票一次，不同券商或同券商不同分公司均適用，重覆申購者，均將視為不合格件。
                        </p>
                        <p>
                            2.
                            若您在本公司擁有多個帳號，請先於【我的申購】依帳號查詢申購現況，以避免重複申購造成申購失敗。
                        </p>
                        <p>
                            3.
                            申購人重複申購同一檔股票，本公司依每筆申購向申購人執行扣款作業，待證交所或櫃檯買賣中心審核為不合格件後將退回申購款及中籤通知郵寄工本費(50元)，但仍會收取每筆申購處理費(20元)。
                        </p>
                        <p>
                            4.
                            申購人應在申購截止日15:30前確認銀行存款餘額應有認購價款、申購處理費(20元)、中籤通知郵寄工本費(50元)之合計金額，供銀行執行扣款，否則為不合格件。
                        </p>
                        <p>
                            5.
                            同一日辦理二件（含）以上承銷案件之預扣價款者，應以各承銷案件之有價證券認購價款、申購處理費及中籤通知郵寄工本費之合計總額為準，否則均為不合格件。
                        </p>
                        <p>6. 申購興櫃股票時，須先行簽署【興櫃股票風險預告書】；若無簽署者，於申購後將視為不合格件。</p>
                        <p>
                            7.
                            本公司網路申購委託及取消每日以13:30為截止時點，申購後不得撤回或更改申購委託書，13:30後申請申購委託者，視為次一營業日之申購委託。
                        </p>
                        <p>8. 開戶完成日「當天」若欲參加股票申購，請透由所屬營業員專人申購。</p>
                    </div>
                ),
                okText: '我知道了',
                width: 600,
            }),
        );
    };
    return (
        <>
            <div className="subscription__header">
                <div className="subscription__title">
                    <h2>申購專區</h2>
                    {isMobile && <img className="subscription__icon" src={icon} />}
                </div>
                <div>
                    <div className="subscription__toolbar">
                        <div className="subscription__toolbar__left">
                            <Link href={newSubscriptionUrl}>
                                <a className={newBtnActive ? 'active nav__items' : 'nav__items'}>新股申購</a>
                            </Link>
                            <Link href={mySubscriptionUrl}>
                                <a className={myBtnActive ? 'active nav__items' : 'nav__items'}>我的申購</a>
                            </Link>
                        </div>
                        <div className="subscription__toolbar__right">
                            {myBtnActive && !isMobile && (
                                <span className="desc__update">{'最後更新時間：2022.02.18 15:36'}</span>
                            )}
                            {myBtnActive && (
                                <IconBtn
                                    type={'refresh'}
                                    onClick={refreshClickHandler}
                                    className="subscription__refresh"
                                />
                            )}
                            {!isMobile && (
                                <Button className="subscription__description__btn" onClick={showDescription}>
                                    <img src={info} /> 申購說明
                                </Button>
                            )}
                            {isMobile ? (
                                <AccountDropdown
                                    style={{ flex: '3 0 0' }}
                                    type={'S'}
                                    personalAreaVisible={false}
                                    tradingLayout={true}
                                    width={'100%'}
                                />
                            ) : (
                                <AccountDropdown
                                    type={'S'}
                                    personalAreaVisible={false}
                                    tradingLayout={true}
                                    width={'100%'}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .desc__update {
                    color: #3f5372;
                    font-size: 14px;
                    display: inline-block;
                    margin-right: 13px;
                }
                .active.nav__items {
                    background-color: #0d1623;
                    color: white;
                }
                .nav__items:first-child {
                    margin-right: 20px;
                }
                .subscription__title > h2 {
                    display: inline-block;
                    font-size: 2.6rem;
                    font-weight: bold;
                    margin: 0 28px 0 0;
                    padding: 0;
                }
                .subscription__toolbar {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }

                .subscription__toolbar__left {
                    display: flex;
                }
                .nav__items {
                    width: 116px;
                    height: 40px;
                    background-color: #d7e0ef;
                    color: #3f5372;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.6rem;
                    border-radius: 20px;
                }
                .nav__items .active {
                    background-color: #0d1623;
                    color: #fff;
                }
                @media (max-width: 1000px) {
                    .subscription__toolbar {
                        display: block;
                    }
                    .subscription__toolbar__right {
                        margin-top: 15px;
                    }
                }
                @media (max-width: 768px) {
                    .subscription__toolbar__right {
                        display: flex;
                        justify-content: space-between;
                    }
                    .nav__items {
                        width: 50%;
                    }
                    .subscription__icon {
                        display: inline-block;
                        margin-top: -2px;
                    }
                    .subscription__title {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            `}</style>
            <style jsx global>{`
                .desc {
                    color: #0d1623;
                    font-size: 16px;
                }
                .desc p {
                    margin-bottom: 2px;
                }
                .subscription__description__btn {
                    border: solid 1px #d7e0ef;
                    width: 121px;
                    height: 40px;
                    color: #0d1623;
                    font-size: 16px;
                    vertical-align: top;
                    margin-right: 13px;
                }
                .subscription__description__btn:hover,
                .subscription__description__btn:focus {
                    border: solid 1px #d7e0ef;
                    color: #0d1623;
                }
                .subscription__toolbar__right .subscription__refresh.download__btn {
                    vertical-align: top;
                    margin-right: 13px;
                }
                .subscription__toolbar__right .account__container.trading__container {
                    margin-right: 0;
                }
            `}</style>
        </>
    );
});

export default SubscriptionHeader;

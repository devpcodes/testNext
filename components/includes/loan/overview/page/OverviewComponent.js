import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import moment from 'moment';
import { message } from 'antd';
import Breadcrumb from '../../../breadcrumb/breadcrumb';
import Btn from '../elements/Btn';
import LoanBox from '../elements/LoanBox';
import RepaymentBox from '../elements/RepaymentBox';
import UseBox from '../elements/UseBox';
import info from '../../../../../resources/images/pages/subscription/ic-info.svg';
import TopTabBar from '../../../subBrokerage/elements/TopTabBar';
import SelfTable from '../../Collateral/elements/SelfTable';
import { fetchAccountOverview } from '../../../../../services/components/loznZone/overview/fetchAccountOverview';
import { getToken } from '../../../../../services/user/accessToken';
import { debounce } from '../../../../../services/throttle';
import { setModal } from '../../../../../store/components/layouts/action';
import { formatNum } from '../../../../../services/formatNum';
import { useRouter } from 'next/router';
import { useLoanAccount } from '../../../../../hooks/useLoanAccount';
const OverviewComponent = () => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const menuList = [
        { key: 'notGuaranteed', title: '未擔保' },
        { key: 'guaranteed', title: '已擔保' },
    ];
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [current, setCurrent] = useState('notGuaranteed');
    const [allCanLoan, setAllCanLoan] = useState(0);
    const [resultAllCanLoan, setResultAllCanLoan] = useState(0);
    const [accountOverview, setAccountOverview] = useState({});
    const [financing, setFinancing] = useState('--');
    // const { isLogin, accounts } = useUser();
    // const [loanIdno, setLoanIdno] = useState('');
    const router = useRouter();
    const haveLoanAccount = useLoanAccount(getToken());

    useEffect(() => {
        if (!haveLoanAccount && haveLoanAccount != null) {
            router.push('/loan-zone');
        }
    }, [haveLoanAccount]);

    useEffect(() => {
        if (currentAccount?.idno != null) {
            debounce(getAccountOverview, 500);
        }
    }, [currentAccount]);

    const getAccountOverview = async () => {
        const token = getToken();
        try {
            const res = await fetchAccountOverview(token, currentAccount.broker_id, currentAccount.account);
            setAccountOverview(res[0]);
            setFinancing(res[0].financing);
        } catch (error) {
            // message.error('');
        }
    };

    useEffect(() => {
        //1
        if (accountOverview.status === 'F' && accountOverview.blockReason == '1') {
            accountDetailHandler();
        }
    }, [accountOverview]);

    const tabClickHandler = key => {
        setCurrent(key);
    };
    const currentDataHandler = () => {};
    const accountDetailHandler = () => {
        dispatch(
            setModal({
                visible: true,
                type: 'info',
                noCloseIcon: true,
                noTitleIcon: true,
                title: '帳戶詳情',
                content: renderContent(),
            }),
        );
    };
    const renderContent = () => {
        return (
            <div className="accountDetail">
                <div className="account__item">
                    <div className="account__label">帳戶狀態</div>
                    <div className="account__val">
                        {accountOverview.status === 'A' && '正常'}
                        {accountOverview.status === 'D' && '已銷戶'}
                        {accountOverview.status === 'F' && '凍結'}
                        {accountOverview.status === 'F' && accountOverview.blockReason == '1' && '未開通'}
                    </div>
                </div>
                <div className="account__item">
                    <div className="account__label">開通日</div>
                    <div className="account__val">{moment(accountOverview.openDate).format('YYYY/MM/DD')}</div>
                </div>
                <div className="account__item">
                    <div className="account__label">不限用途借貸授信額度</div>
                    <div className="account__val" style={{ lineHeight: '43px' }}>
                        {'$' + formatNum(accountOverview.quota)}
                    </div>
                </div>
                <div className="account__item">
                    <div className="account__label">不限用途借貸帳號</div>
                    <div className="account__val" style={{ lineHeight: '25px' }}>
                        <p style={{ marginBottom: 0 }}>{accountOverview?.branchName}</p>
                        <p style={{ marginBottom: 0 }}>{accountOverview.branch + '-' + accountOverview.account}</p>
                    </div>
                </div>
                <div className="account__item" style={{ borderBottom: 'none' }}>
                    <div className="account__label">撥入與扣款帳號</div>
                    <div className="account__val" style={{ lineHeight: '25px' }}>
                        <p style={{ marginBottom: 0 }}>{accountOverview?.bankName}</p>
                        <p style={{ marginBottom: 0 }}>{accountOverview.bankAccount}</p>
                    </div>
                </div>
            </div>
        );
    };
    const canLoanHandler = useCallback(allCanLoan => {
        setAllCanLoan(allCanLoan);
    });

    useEffect(() => {
        console.log('financing....', financing);
        setResultAllCanLoan(Number(allCanLoan) + Number(financing));
    }, [financing, allCanLoan]);

    const tooltipHandler = () => {
        return (
            <div>
                <p style={{ marginBottom: 0 }}>1. 擔保维持率=(已抵押庫存市值+補繳保證金)/已申請借款 *100%。</p>
                <p style={{ marginBottom: 0 }}>2. 本資料每日16:00後更新。</p>
                <p style={{ marginBottom: 0 }}>3. 維持率低於130%，須補繳繳保證金。</p>
            </div>
        );
    };
    return (
        <div className="overview__container">
            <Breadcrumb />
            <div className="overview__head">
                <h1 className="overview__title">借款總覽</h1>
                <div className="overview__btns">
                    <Btn
                        type="accountInfo"
                        text="帳戶詳情"
                        // style={{ marginRight: 16 }}
                        onClick={accountDetailHandler}
                    />
                    {/* <Btn type="money" text="借貸商品" /> */}
                </div>
            </div>
            <LoanBox allCanLoan={resultAllCanLoan} financing={accountOverview.financing} />
            <div className="overview__useContainer">
                <UseBox
                    style={{ width: isMobile ? '100%' : '49.3%', marginRight: isMobile ? 0 : '1.4%' }}
                    financing={accountOverview.financing}
                    usedFinancing={accountOverview.usedFinancing}
                />
                <RepaymentBox style={{ width: isMobile ? '100%' : '49.3%', marginTop: isMobile ? '16px' : '0' }} />
            </div>
            <div className="overview__head2">
                <h2 className="overview__title">擔保品明細</h2>
                <div className="overview__ratio">
                    <Tooltip title={tooltipHandler} placement="bottom">
                        <img className="overview__icon" src={info} />
                    </Tooltip>
                    <span className="overview__hold--label">整戶維持率：</span>
                    <span className="overview__hold--val">{(accountOverview.marginRatio || '--') + '%'}</span>
                </div>
            </div>
            <div className="overview__table">
                <TopTabBar menuList={menuList} current={current} onClick={tabClickHandler} activeKey={current} />
                <SelfTable currentKey={current} setCurrentData={currentDataHandler} canLoanHandler={canLoanHandler} />
            </div>

            <style jsx>{`
                .overview__container {
                    width: 80%;
                    margin: 0 auto;
                    padding-top: 24px;
                }
                .overview__title {
                    font-size: 28px;
                    color: #0d1623;
                    font-weight: bold;
                }
                .overview__head {
                    margin-top: 24px;
                    display: flex;
                    justify-content: space-between;
                }
                .overview__head2 {
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-between;
                }
                .overview__useContainer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 17px;
                }
                .overview__hold--label {
                    font-size: 16px;
                    color: #0d1623;
                }
                .overview__hold--val {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .overview__icon {
                    margin-top: -5px;
                }
                @media (max-width: 1024px) {
                    .overview__container {
                        width: 90%;
                    }
                }
                @media (max-width: 768px) {
                    .overview__container {
                        width: 100%;
                    }
                    .overview__title {
                        font-size: 20px;
                    }
                    .overview__head {
                        display: block;
                        padding: 0 16px;
                    }
                    .overview__btns {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 16px;
                    }
                    .overview__useContainer {
                        display: block;
                    }
                    .overview__head2 {
                        padding: 0 16px;
                        margin-top: 16px;
                    }
                    .overview__ratio {
                        margin-top: -7px;
                    }
                }
                @media (max-width: 450px) {
                    .overview__container {
                        padding-top: 1px !important;
                    }
                }
            `}</style>
            <style jsx global>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
                .overview__table .sino__table .ant-table-tbody > tr > td:last-child {
                    padding-right: 12px;
                }
                .accountDetail {
                    width: 100%;
                    border: solid 1px #d7e0ef;
                    border-radius: 2px;
                }
                .account__item {
                    border-bottom: solid 1px #d7e0ef;
                    display: flex;
                    justify-content: space-between;
                }
                .account__label {
                    font-size: 16px;
                    color: #3f5372;
                    background-color: #f2f5fa;
                    flex: 1 0 0;
                    padding: 6px 16px;
                    border-right: solid 1px #d7e0ef;
                }
                .account__val {
                    flex: 1.5 0 0;
                    padding: 6px 16px;
                    text-align: right;
                    font-size: 16px;
                    font-weight: 500;
                    color: #0d1623;
                }

                @media (max-width: 768px) {
                    .subscription__description__btn {
                        flex: 1 0 0;
                    }
                    .site-breadcrumb {
                        padding-left: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default OverviewComponent;

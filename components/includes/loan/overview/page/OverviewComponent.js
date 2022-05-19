import { useState, useEffect } from 'react';
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
const OverviewComponent = () => {
    const dispatch = useDispatch();
    const menuList = [
        { key: 'notGuaranteed', title: '未擔保' },
        { key: 'guaranteed', title: '已擔保' },
    ];
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [current, setCurrent] = useState('notGuaranteed');
    const [allCanLoan, setAllCanLoan] = useState(0);
    const [accountOverview, setAccountOverview] = useState({});

    useEffect(() => {
        if (currentAccount.idno != null) {
            debounce(getAccountOverview, 500);
        }
    }, [currentAccount]);

    const getAccountOverview = async () => {
        const token = getToken();
        try {
            const res = await fetchAccountOverview(token, currentAccount.broker_id, currentAccount.account);
            setAccountOverview(res[0]);
        } catch (error) {
            message.error(error);
        }
    };

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
                    <div className="account__val" style={{ lineHeight: '43px' }}>
                        {accountOverview.branch + '-' + accountOverview.account}
                    </div>
                </div>
                <div className="account__item" style={{ borderBottom: 'none' }}>
                    <div className="account__label">撥入與扣款帳號</div>
                    <div className="account__val" style={{ lineHeight: '43px' }}>
                        {accountOverview.bankAccount}
                    </div>
                </div>
            </div>
        );
    };
    const canLoanHandler = allCanLoan => {
        // alert(allCanLoan)
        setAllCanLoan(allCanLoan);
    };
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
                        style={{ marginRight: 16 }}
                        onClick={accountDetailHandler}
                    />
                    <Btn type="money" text="借貸商品" />
                </div>
            </div>
            <LoanBox allCanLoan={allCanLoan} financing={accountOverview.financing} />
            <div className="overview__useContainer">
                <UseBox
                    style={{ width: '49.3%', marginRight: '1.4%' }}
                    financing={accountOverview.financing}
                    usedFinancing={accountOverview.usedFinancing}
                />
                <RepaymentBox style={{ width: '49.3%' }} />
            </div>
            <div className="overview__head2">
                <h2 className="overview__title">擔保品明細</h2>
                <div>
                    <Tooltip title={tooltipHandler} placement="bottom">
                        <img className="overview__icon" src={info} />
                    </Tooltip>
                    <span className="overview__hold--label">整戶維持率：</span>
                    <span className="overview__hold--val">{accountOverview.marginRatio + '%'}</span>
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
            `}</style>
        </div>
    );
};

export default OverviewComponent;

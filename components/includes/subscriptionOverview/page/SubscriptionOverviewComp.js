import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import LoanBox from '../elements/LoanBox';
import Btn from '../../loan/overview/elements/Btn';
import AccountSelect from '../elements/AccountSelect';
import TopTabBar from '../../../../components/includes/subBrokerage/elements/TopTabBar';
import AmountTable from '../elements/AmountTable';
import InterestTable from '../elements/InterestTable';
import icon from '../../../../resources/images/components/subscriptionOverview/ic-circle (2).svg';
import { fetchAccountStatus } from '../../../../services/components/subscriptionOverview/fetchAccountStatus';
import { getToken } from '../../../../services/user/accessToken';
import { setModal } from '../../../../store/components/layouts/action';
import VerticalTable from '../../loan/overview/elements/VerticalTable';
import moment from 'moment';
import { formatNum } from '../../../../services/formatNum';
import { fetchAccount } from '../../../../services/components/subscriptionOverview/fetchAccount';
import { message } from 'antd';
const baseData = [
    {
        label: '額度',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '期數',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '利率',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '75px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '75px',
            lineHeight: '19px',
            color: '#0d1623',
        },
    },
    {
        label: '還款方式',
        value: '每期還息，到期還本',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '計息期間',
        value: '上月21日至本月20日(含)止',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '利息扣繳日',
        value: '每日計算利息，每月21日一併扣繳',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '撥入與扣款帳號',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '50px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '50px',
            color: '#0d1623',
        },
    },
    {
        label: '貸款日',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
    {
        label: '到期日',
        value: '',
        labelStyle: {
            flex: '1.5 0 0',
            height: '32px',
            color: '#3f5372',
        },
        valueStyle: {
            flex: '3 0 0',
            height: '32px',
            color: '#0d1623',
        },
    },
];
const mockData = {
    lnMainAccount: '10805500007623',
    limitLine: '3783715.0002200.01',
    odAccount: '10806200000016',
    odSwac: '10803400002608',
    limitAmount: '300000',
    maxTenorMM: '24',
    origStartDate: '20220216',
    locExpDate: '20240216',
    totalOs: '168456',
    availAmount: '131544',
    loanRate: '0',
    frozenFlag: 'Y',
    infoInterest: '585',
    infoDate: '20220620',
    overDueInterest: '0',
    overDuePE: '0',
    overDueDays: '0',
    legalFee: '0',
    repayAccount: '10801890016313',
    repayAccountBalance: '12440',
    corrInterestFlag: 'N',
    corrInterest: '4.12',
    branch: '9A95',
};
const SubscriptionOverviewComp = () => {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState('amount');
    const isMobile = useSelector(store => store.layout.isMobile);
    const [allCanLoan, setAllCanLoan] = useState('--');
    const [financing, setFinancing] = useState('--');
    const [repayAccount, setRepayAccount] = useState('--');
    const [locExpDate, setLocExpDate] = useState('');
    // const [arrears, setArrears] = useState('--')
    const [accountData, setAccountData] = useState([]);
    const [updateTime, setUpdateTime] = useState('--');
    const router = useRouter();
    const menuList = [
        { key: 'amount', title: '額度使用紀錄' },
        // { key: 'interest', title: '利息紀錄' },
    ];
    const tabClickHandler = key => {
        setCurrent(key);
    };

    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = async () => {
        try {
            const res = await fetchAccount(getToken());
            if (res.applyStatus === '1') {
                getAccountStatus();
            } else {
                dispatch(
                    setModal({
                        visible: true,
                        title: '無申購信用通帳戶',
                        content: '您目前無申購信用通帳戶，是否立即前往了解更多？',
                        noCloseIcon: true,
                        noTitleIcon: true,
                        okButtonProps: {
                            style: {
                                background: '#c43826',
                            },
                        },
                        okText: '確認',
                        cancelText: '取消',
                        onOk: () => {
                            dispatch(setModal({ visible: false }));
                            router.push('/subscriptionArea/ProductInfo');
                        },
                    }),
                );
            }
        } catch (error) {
            message.error(error);
        }
    };

    const getAccountStatus = async () => {
        try {
            const res = await fetchAccountStatus(getToken());
            console.log('res', res);
            setAllCanLoan(res.limitAmount);
            setFinancing(res.totalOs);
            setRepayAccount(res.repayAccount);
            setLocExpDate(res.locExpDate);
            const newData = sortBaseData(baseData, res);
            setAccountData(newData);
            setUpdateTime(moment().format('YYYY.MM.DD HH:mm'));
        } catch (err) {
            message.error(err);
        }
    };
    const sortBaseData = (baseData, mockData) => {
        baseData.map(item => {
            if (item.label === '額度') {
                item.value = (
                    <p>
                        {formatNum(mockData.limitAmount)}
                        <span style={{ color: '#3f5372' }}>(循環額度)</span>
                    </p>
                );
            }
            if (item.label === '期數') {
                item.value = (
                    <p>
                        {mockData.maxTenorMM}期<span style={{ color: '#3f5372' }}>(不綁約)</span>
                    </p>
                );
            }
            if (item.label === '利率') {
                item.value = (
                    <>
                        <p
                            style={{
                                marginBottom: '3px',
                                marginTop: '6px',
                            }}
                        >
                            {mockData.loanRate}%
                        </p>
                        <p>機動年利率，依個金放款/房貸指標(月)+10%</p>
                    </>
                );
            }
            if (item.label === '撥入與扣款帳號') {
                item.value = <p style={{ marginTop: '6px' }}>{mockData.lnMainAccount}</p>;
            }
            if (item.label === '貸款日') {
                item.value = moment(mockData.origStartDate).format('YYYY/MM/DD');
            }
            if (item.label === '到期日') {
                item.value = moment(mockData.locExpDate).format('YYYY/MM/DD');
            }
        });
        return baseData;
    };
    const accountClickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                title: '帳戶資訊',
                type: 'info',
                width: '600px',
                bodyStyle: {
                    overflow: 'auto',
                },
                noCloseIcon: true,
                noTitleIcon: true,
                content: (
                    <>
                        <VerticalTable data={accountData} />
                        <p style={{ color: '#3f5372', marginTop: '10px', marginBottom: '0' }}>
                            如有任何帳戶問題，請洽銀行客服<span style={{ color: '#c43826' }}>(02)2505-9999</span>
                        </p>
                    </>
                ),
            }),
        );
    };
    const infoClickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                title: '注意事項',
                type: 'info',
                width: '600px',
                bodyStyle: {
                    height: 300,
                    overflow: 'auto',
                },
                content: (
                    <>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            1.
                            私房錢設立額度後，可在額度內隨借隨還，償還之本金將流用至本借款可動用額度繼續循環動用，每月只繳利息，到期還本。
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            2.
                            我要還款：僅供還本使用，請先將還本金額存入約定之撥入與扣款存款帳號，按下「我要還款」輸入還本金額並確認後，系統將自約定之撥入與扣款存款帳號扣款並執行還本。
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            3.
                            利息自動扣繳：利息應繳款日為每月21日(遇假日順延至下一營業日)，請將應繳利息存入約定之撥入與扣款存款帳號，系統將於應繳日自動執行扣繳。
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            4. 利息計算：
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                                paddingLeft: '40px',
                                marginBottom: '5px',
                            }}
                        >
                            •
                            以日計息，每日利息以當日日終(約21:00~24:00，惟仍依本行系統當日作業時間為準)之動用金額乘以貸款利率除以365天計算。利息計算範例：小豐貸款利率為8%，1/1動用5,000元，1/6動用10,000元，1/16還本3,000元，1/20結算利息，應繳利息為51元，計算公式如下：
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                                paddingLeft: '50px',
                            }}
                        >
                            5,000元*8%*(5/365)+15,000元*8%*(10/365)+ 12,000元*8%*(5/365)=51元
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                                paddingLeft: '40px',
                            }}
                        >
                            •
                            每月20日結算利息，如20日為非營業日，將於前一個營業日結息，即以前一個營業日日終動用金額結算至20日的利息，該非營業日期間提領或還款所新增或減少之利息將計入次月計息期間之利息，並於次月繳息日繳納或歸還。
                        </p>
                        <p
                            style={{
                                lineHeight: '1.63',
                                letterSpacing: 'normal',
                                color: '#0d1623',
                            }}
                        >
                            5.
                            本月應繳利息：如查詢日未到結息日，將以目前動用總金額計算至結息日以預估本月應繳利息，故動用金額異動，本月應繳利息也會隨之變動。
                        </p>
                    </>
                ),
                noCloseIcon: true,
                noTitleIcon: true,
                onCancel: () => {
                    dispatch(setModal({ visible: false }));
                },
                onOk: async () => {
                    dispatch(setModal({ visible: false }));
                },
                okText: '確認',
                cancelText: '取消',
                maskClosable: false,
            }),
        );
    };
    const subProductClick = () => {
        router.push('/subscriptionArea/ProductInfo/');
    };
    console.log('accountData.locExpDate', accountData);
    return (
        <div className="subOverview__container">
            <div className="subOverview__bread">
                <Breadcrumb />
            </div>

            <div className="subOverview__head">
                {isMobile ? (
                    <div className="subOverview__mobileHead">
                        <h1 className="subOverview__title">申購信用通總覽</h1>
                        <img className="subOverview__icon" src={icon} onClick={subProductClick} />
                    </div>
                ) : (
                    <h1 className="subOverview__title">申購信用通總覽</h1>
                )}
                <div className="subOverview__control">
                    <Btn
                        text="申購信用通"
                        type="info"
                        style={{
                            width: '133px',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                            marginRight: '16px',
                            display: isMobile ? 'none' : 'inline-block',
                        }}
                        onClick={subProductClick}
                    />
                    <AccountSelect
                        accText={'帳戶資訊'}
                        data={[repayAccount]}
                        value={repayAccount}
                        open={false}
                        onClick={accountClickHandler}
                        style={{
                            height: '40px',
                            width: '100%',
                        }}
                    />
                </div>
            </div>
            <LoanBox allCanLoan={allCanLoan} financing={financing} locExpDate={locExpDate} />
            <div className="subOverview__down">
                {isMobile ? (
                    <div className="subOverview__downHead">
                        <h2 className="subOverview__h2">使用明細</h2>
                        <img className="subOverview__icon" src={icon} onClick={infoClickHandler} />
                    </div>
                ) : (
                    <h2 className="subOverview__h2">使用明細</h2>
                )}
                <div className="subOverview__downControl">
                    <span className="subOverview__updatePc">最後更新時間：{updateTime}</span>
                    <Btn
                        text="注意事項"
                        type="info"
                        style={{
                            marginLeft: '16px',
                        }}
                        onClick={infoClickHandler}
                    />
                </div>
            </div>
            <div>
                <TopTabBar menuList={menuList} current={current} onClick={tabClickHandler} activeKey={current} />
                {current === 'amount' && <AmountTable />}
                <p className="subOverview__desc">僅提供近一年之使用明細，詳細資訊依永豐銀行公告為準。</p>
                <p className="subOverview__update">最後更新時間：2022.02.18 15:36</p>
            </div>
            <style jsx>{`
                .subOverview__update {
                    display: none;
                }
                .subOverview__updatePc {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    display: inline-block;
                    margin-top: 10px;
                }
                .subOverview__container {
                    padding-top: 20px;
                    padding-left: 10%;
                    padding-right: 10%;
                }
                .subOverview__head {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;
                }
                .subOverview__control {
                    display: flex;
                    justify-content: space-between;
                }
                .subOverview__title {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .subOverview__h2 {
                    font-size: 28px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .subOverview__down {
                    margin-top: 32px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 6px;
                }
                .subOverview__update {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    display: inline-block;
                    margin-top: 10px;
                    display: none;
                }
                .subOverview__desc {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #3f5372;
                    margin-top: -12px;
                    margin-bottom: 40px;
                }
                @media (max-width: 1024px) {
                    .subOverview__container {
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                    .subOverview__bread {
                        width: 90%;
                    }
                }
                @media (max-width: 768px) {
                    .subOverview__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                    .subOverview__head {
                        /* width: 90%; */
                        padding: 0 16px;
                        display: block;
                    }
                    .subOverview__bread {
                        width: 90%;
                        padding-left: 16px;
                    }
                    .subOverview__mobileHead {
                        display: flex;
                        justify-content: space-between;
                    }
                    .subOverview__control {
                        margin-bottom: 15px;
                    }
                    .subOverview__icon {
                        margin-top: 6px;
                        height: 20px;
                    }
                    .subOverview__down {
                        margin-top: 15px;
                        padding-left: 16px;
                    }
                    .subOverview__downControl {
                        display: none;
                    }
                    .subOverview__downHead {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        padding-right: 16px;
                    }
                    .subOverview__desc {
                        text-align: center;
                        margin-bottom: 16px;
                    }
                    .subOverview__update {
                        display: block;
                        text-align: center;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: normal;
                        letter-spacing: normal;
                        color: #3f5372;
                        margin-top: -12px;
                        margin-bottom: 40px;
                    }
                    .subOverview__updatePc {
                        display: none;
                    }
                }
            `}</style>
            <style jsx global>
                {`
                    .page__container {
                        background-color: #f9fbff;
                        padding-bottom: 32px;
                    }
                `}
            </style>
        </div>
    );
};

export default SubscriptionOverviewComp;

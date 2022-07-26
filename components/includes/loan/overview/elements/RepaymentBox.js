import go from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy (1).svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import info from '../../../../../resources/images/components/loanZone/ic-ic-attention-info-circle.svg';
import Bar from './Bar';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../../../store/components/layouts/action';
import SinoBtn from '../../Collateral/elements/SinoBtn';
import VerticalTable from './VerticalTable';
import qrCode from '../../../../../resources/images/components/loanZone/demo.jpg';
import { fetchRepaymentAccount } from '../../../../../services/components/loznZone/overview/fetchRepaymentAccount';
import { getToken } from '../../../../../services/user/accessToken';
import { message } from 'antd';
import { formatNum } from '../../../../../services/formatNum';
const RepaymentBox = ({ style, amount, estimatePayable }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [repaymentData, setRepaymentData] = useState({});
    useEffect(() => {
        getRepaymentAcc();
    }, [currentAccount]);
    const getRepaymentAcc = async () => {
        try {
            if (currentAccount.broker_id != null) {
                const res = await fetchRepaymentAccount(getToken(), currentAccount.broker_id);
                setRepaymentData(res);
            }
        } catch (error) {
            message.error(error);
        }
    };
    const clickHandler = () => {
        const data = [
            {
                label: '銀行帳戶',
                value: (
                    <>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            {repaymentData.bankCode + repaymentData.bankName}
                            {' ' + repaymentData.bankBranch + repaymentData.bankBranchName}
                        </p>
                        <p className="item__p" style={{ marginBottom: 0 }}>
                            {repaymentData.bankAccount}
                        </p>
                    </>
                ),
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '戶名',
                value: repaymentData.accountName,
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
            {
                label: '分公司電話',
                value: repaymentData.phone,
                labelStyle: {
                    flex: '1.5 0 0',
                },
                valueStyle: {
                    flex: '3 0 0',
                },
            },
        ];
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '如何申請動用',
                type: 'info',
                bodyStyle: {
                    height: 350,
                    overflow: 'auto',
                },
                content: (
                    <>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>
                            1. 每筆借款期限為6個月，到期可向分公司申請展延，或於借貸期間隨時申請還款。
                        </p>
                        <p style={{ marginBottom: '5px', color: '#0d1623' }}>2. 還款方式：</p>
                        <div style={{ marginLeft: '30px', color: '#0d1623' }}>
                            <p style={{ marginBottom: '5px' }}>
                                • <span style={{ fontWeight: 'bold' }}>賣股還款：</span>
                                透過線上或臨櫃交易賣出擔保品以償還該筆借款，扣除利息與相關費用並償還本金後，餘額將返還至您的交割帳戶。
                            </p>
                            <p>
                                • <span style={{ fontWeight: 'bold' }}>現金還款：</span>
                                請將還款金額轉帳或匯款至各分公司之償還帳戶，並去電至分公司進行還款指示，或以現金至臨櫃完成還款，還款費用以扣除利息與相關費用後再償還本金。
                            </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <VerticalTable
                                data={data}
                                style={{
                                    // marginRight: isMobile ? '0' : '18px',
                                    flex: '3 0 0',
                                }}
                            />
                            {/* <img
                                src={qrCode}
                                style={{
                                    width: '145px',
                                    height: '135px',
                                    display: isMobile ? 'none' : 'inline-block',
                                    flex: '1 0 0',
                                }}
                            /> */}
                        </div>
                        {/* <p
                            style={{
                                marginTop: '16px',
                                color: '#6c7b94',
                                marginBottom: 0,
                                display: isMobile ? 'none' : 'block',
                            }}
                        >
                            此條碼支援銀行轉帳，掃描後即可轉帳。
                        </p> */}
                    </>
                ),
                okText: '確認',
                width: '600px',
            }),
        );
    };

    return (
        <div className="loan__container" style={style}>
            <div className="loan__head">
                <span className="loan__title">還款</span>
                <Link href="/loan-zone/Record/?tab=1">
                    <a className="loan__gobtn">
                        還款紀錄 <img className="loan__goIcon" src={go} />
                    </a>
                </Link>
            </div>
            <div className="loan__content">
                <div>
                    <span className="canLoanMoney">應還款金額</span>
                    {/* <img className="canLoanIcon" src={info} /> */}
                    <span className="canLoanDesc">(含息)</span>
                </div>
                <p className="loan__money">{'$' + formatNum(amount) || '--'}</p>
                <div className="loan__contentBottom">
                    <div className="loan__left">
                        {/* <Bar /> */}
                        <div className="loan__text--box">
                            <div>
                                <span className="loan__money--lable">利息及其他費用</span>
                                <span className="loan__money--val">{'$' + formatNum(estimatePayable) || '--'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="loan__right">
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'還款紀錄'}
                            style={{
                                display: isMobile ? 'inline-block' : 'none',
                                border: '1px solid #d7e0ef',
                                outline: 'none',
                                // width: '100%',
                                height: '40px',
                                fontSize: '16px',
                                padding: '9px 19px 9px 20px',
                                borderRadius: '2px',
                                backgroundColor: 'white',
                                color: '#0d1623',
                                verticalAlign: 'top',
                                flex: '1 0 0',
                                marginRight: '16px',
                            }}
                            onClick={() => {
                                router.push('/loan-zone/Record/?tab=1');
                            }}
                        />
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'立即還款'}
                            style={{
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                height: '40px',
                                fontSize: '16px',
                                padding: '9px 19px 9px 20px',
                                borderRadius: '2px',
                                backgroundColor: '#c43826',
                                color: 'white',
                                verticalAlign: 'top',
                                flex: '1 0 0',
                            }}
                            onClick={clickHandler}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .loan__container {
                    height: 240px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .loan__head {
                    height: 39px;
                    border-bottom: solid 1px #d7e0ef;
                    background-color: #f2f5fa;
                    padding: 8px 12px 9px 30px;
                    display: flex;
                    justify-content: space-between;
                }
                .loan__title {
                    font-size: 16px;
                    color: #3f5372;
                }
                .loan__gobtn {
                    font-size: 14px;
                    letter-spacing: 0.35px;
                    color: #0d1623;
                }
                .loan__goIcon {
                    margin-top: -1px;
                    margin-left: 8px;
                }
                .loan__content {
                    padding: 30px 30px 16px 30px;
                }
                .canLoanMoney {
                    font-size: 16px;
                    letter-spacing: 0.5px;
                    color: #0d1623;
                }
                .canLoanIcon {
                    margin-left: 4px;
                    margin-top: -7px;
                    margin-right: 4px;
                }
                .canLoanDesc {
                    font-size: 16px;
                    color: #3f5372;
                }
                .loan__money {
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .loan__contentBottom {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .loan__text--box {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 12px;
                }
                .loan__left {
                    flex: 4 0 0;
                    margin-right: 10%;
                }
                .loan__right {
                    flex: 1 0 0;
                    width: 100%;
                }
                .loan__footer {
                    height: 53px;
                    border-top: 1px solid #e6ebf5;
                    text-align: right;
                    padding-right: 28px;
                    padding-top: 11px;
                }
                .footer__text {
                    font-size: 16px;
                    color: #3f5372;
                    /* margin-top: 7px; */
                    display: inline-block;
                    margin-right: 12px;
                }
                .footer__link {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #c97b1d;
                }
                .loan__money--lable {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-right: 8px;
                }
                .loan__money--val {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                }
                .loan__all--label {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-right: 8px;
                }
                .loan__all--val {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                }
                @media (max-width: 768px) {
                    .loan__text--box {
                        /* justify-content: space-around;
                        text-align: center; */
                    }
                    .canLoanMoney {
                        font-size: 16px;
                    }
                    .canLoanDesc {
                        display: none;
                    }
                    .loan__content {
                        padding: 19px 16px;
                    }
                    .loan__money {
                        font-size: 24px;
                    }
                    .loan__contentBottom {
                        margin-top: 16px;
                        display: block;
                    }
                    .loan__all--label {
                        /* display: block; */
                        margin-bottom: 6px;
                    }
                    .loan__money--lable {
                        /* display: block; */
                        margin-bottom: 6px;
                    }
                    .loan__left {
                        margin-right: 0;
                    }
                    .loan__line {
                        display: block;
                        width: 1px;
                        height: 42px;
                        background-color: #d7e0ef;
                    }
                    .loan__right {
                        margin-top: 16px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .loan__container {
                        height: auto;
                        border-left: none;
                        border-right: none;
                    }
                    .loan__footer {
                        height: auto;
                        border-top: none;
                        padding-right: 0;
                        padding-top: 0;
                        text-align: center;
                        padding-bottom: 15px;
                    }
                    .loan__head {
                        height: 28px;
                        padding: 0 0 0 16px;
                    }
                    .loan__title {
                        font-size: 14px;
                        line-height: 28px;
                    }
                    .loan__gobtn {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default RepaymentBox;

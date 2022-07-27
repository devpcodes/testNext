import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import go from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy (1).svg';
import info from '../../../../../resources/images/components/loanZone/ic-ic-attention-info-circle.svg';
import Bar from './Bar';
import SinoBtn from '../../Collateral/elements/SinoBtn';
import { formatNum } from '../../../../../services/formatNum';
import { Tooltip } from 'antd';
const LoanBox = ({ allCanLoan, financing }) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const router = useRouter();
    const titleHandler = () => {
        return (
            <div>
                <p style={{ marginBottom: 0 }}>1. 本服務以日計息，自撥款日起算。</p>
                <p style={{ marginBottom: 0 }}>2. 線上手續費每筆100 元。</p>
                <p style={{ marginBottom: 0 }}>3. (匯入多筆庫存同時一次申請借貸時，以一筆計算)。</p>
                <p style={{ marginBottom: 0 }}>4. 撥券費以股票張數計算，每張 1 元。</p>
                <p style={{ marginBottom: 0 }}>5. 上述費用於還款時收取。</p>
            </div>
        );
    };
    return (
        <div className="loan__container">
            <div className="loan__head">
                <span className="loan__title">借款</span>
                <Link href="/loan-zone/Record/">
                    <a className="loan__gobtn">
                        借款紀錄 <img className="loan__goIcon" src={go} />
                    </a>
                </Link>
            </div>
            <div className="loan__content">
                <div>
                    <span className="canLoanMoney">可借款金額</span>
                    <Tooltip title={titleHandler} placement="bottom">
                        <img className="canLoanIcon" src={info} />
                    </Tooltip>

                    <span className="canLoanDesc">借款說明</span>
                </div>
                <p className="loan__money">
                    $
                    {Number(allCanLoan) - Number(financing) < 0
                        ? '--'
                        : formatNum(Number(allCanLoan) - Number(financing))}
                </p>
                <div className="loan__contentBottom">
                    <div className="loan__left">
                        <Bar min={financing} max={allCanLoan} />
                        <div className="loan__text--box">
                            <div>
                                <span className="loan__money--lable">已申請借款</span>
                                <span className="loan__money--val">${formatNum(financing)}</span>
                            </div>
                            <div className="loan__line"></div>
                            <div>
                                <span className="loan__all--label">總計可借款</span>
                                <span className="loan__all--val">${formatNum(allCanLoan)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="loan__right">
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'借款紀錄'}
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
                                router.push('/loan-zone/Record/');
                            }}
                        />
                        <SinoBtn
                            parentClass={'search__container'}
                            text={'立即借貸'}
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
                            onClick={() => {
                                router.push('/loan-zone/Collateral/');
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="loan__footer">
                <span className="footer__text">想獲得更高額度的借款金額?</span>
                <Link href="/loan-zone/Collateral/">
                    <a className="footer__link">自選試算 ></a>
                </Link>
            </div>
            <style jsx>{`
                .loan__line {
                    display: none;
                }
                .loan__container {
                    height: 300px;
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
                    font-size: 20px;
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
                    font-size: 40px;
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
                        justify-content: space-around;
                        text-align: center;
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
                        display: block;
                        margin-bottom: 6px;
                    }
                    .loan__money--lable {
                        display: block;
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
                @media (max-width: 350px) {
                    .footer__text {
                        font-size: 14px;
                    }
                    .footer__link {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoanBox;

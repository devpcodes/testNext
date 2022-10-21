import go from '../../../../../resources/images/components/loanZone/arrow-chevron-down-copy (1).svg';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../../../store/components/layouts/action';
import SinoBtn from '../../Collateral/elements/SinoBtn';
import { formatNum } from '../../../../../services/formatNum';
import RepayContent from '../../Collateral/elements/RepayContent';
const RepaymentBox = ({ style, amount, estimatePayable }) => {
    // const currentAccount = useSelector(store => store.user.currentAccount);
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                noCloseIcon: true,
                noTitleIcon: true,
                title: '如何申請還款',
                type: 'info',
                bodyStyle: {
                    height: 350,
                    overflow: 'auto',
                },
                content: <RepayContent />,
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

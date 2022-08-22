import icon from '../../../../resources/images/components/mySubscription/basic-help-circle (3).svg';
import SinoBtn from '../../../includes/loan/Collateral/elements/SinoBtn';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../../store/components/layouts/action';

const MoneyBox = ({ title, data, style, locExpDate, overDueInterest, financing = null }) => {
    const isMobile = useCheckMobile();
    const router = useRouter();
    const dispatch = useDispatch();
    const onClickHandler = () => {
        if (financing != null) {
            router.push('/subscriptionArea/MySubscription/Loans/');
        }
    };
    const repaymentHandler = () => {
        if (financing <= 0 || moment(locExpDate).isBefore(moment()) || Number(overDueInterest) != 0) {
            dispatch(
                setModal({
                    visible: true,
                    content: (
                        <>
                            <p>您的申購便利通目前無法還款請洽銀行客服</p>
                            <p>(02)2505-9999</p>
                        </>
                    ),
                    type: 'info',
                    icon: false,
                    noTitleIcon: true,
                    title: '提醒',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                    },
                }),
            );
            return;
        }
        window.open(process.env.NEXT_PUBLIC_SUBSCRIPTION_BANKREPAYMENT);
    };

    const iconClickHandler = () => {
        router.push('/subscriptionArea/ProductInfo');
    };
    const titleClickHandler = val => {
        if (val === '申購便利通') {
            router.push('/subscriptionArea/MySubscription/Loans');
        }
    };
    return (
        <div className="money__container" style={style}>
            <div className="money__header">
                {title.map((element, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span style={element.style}>
                                {!!element.icon && (
                                    <img onClick={iconClickHandler} className="title__icon" src={icon} />
                                )}
                                <span
                                    style={{
                                        textDecoration: element.val === '申購便利通' ? 'underline' : 'none',
                                        cursor: element.val === '申購便利通' ? 'pointer' : 'auto',
                                    }}
                                    onClick={titleClickHandler.bind(null, element.val)}
                                    className="title__val"
                                >
                                    {element.val}
                                </span>
                            </span>
                            {!isMobile && element.linkText && (
                                <a
                                    onClick={repaymentHandler}
                                    className={
                                        'money__Alink ' +
                                        (financing <= 0 ||
                                        moment(locExpDate).isBefore(moment()) ||
                                        Number(overDueInterest) != 0
                                            ? 'disabled'
                                            : '')
                                    }
                                >
                                    {element.linkText} >
                                </a>
                            )}
                            {i !== title.length - 1 && <div className="money__line--head"></div>}
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="money__content">
                {data.map((element, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="money__item" style={element.style}>
                                <p style={{ cursor: 'pointer' }} className="money__label" onClick={onClickHandler}>
                                    {element.label}
                                </p>
                                <p style={{ cursor: 'pointer' }} className="money__val" onClick={onClickHandler}>
                                    {element.val}
                                </p>
                            </div>
                            {
                                <div
                                    className="money__line"
                                    style={{ display: element.showLine ? 'block' : 'none' }}
                                ></div>
                            }
                        </React.Fragment>
                    );
                })}
                {isMobile && title[0]?.linkText && (
                    <div className="money__item" style={{ textAlign: 'center' }}>
                        <SinoBtn
                            text={'我要還款'}
                            style={{
                                margin: '0 auto',
                                backgroundColor:
                                    financing <= 0 ||
                                    moment(locExpDate).isBefore(moment()) ||
                                    Number(overDueInterest) != 0
                                        ? '#e6ebf5'
                                        : '#daa360',
                                color:
                                    financing <= 0 ||
                                    moment(locExpDate).isBefore(moment()) ||
                                    Number(overDueInterest) != 0
                                        ? '#a9b6cb'
                                        : 'white',
                                border: 'none',
                                marginTop: '4px',
                            }}
                            disabled={
                                financing <= 0 || moment(locExpDate).isBefore(moment()) || Number(overDueInterest) != 0
                            }
                            onClick={repaymentHandler}
                        />
                    </div>
                )}
            </div>
            <style jsx>{`
                .title__icon {
                    margin-top: -2px;
                    margin-right: 2px;
                    cursor: pointer;
                }

                .money__container {
                    height: 130px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .money__header {
                    position: relative;
                    height: 39px;
                    background-color: #f2f5fa;
                    border-bottom: 1px solid #d7e0ef;
                    text-align: center;
                    color: #3f5372;
                    font-size: 16px;
                    line-height: 39px;
                    display: flex;
                    justify-content: space-around;
                }
                .money__Alink {
                    position: absolute;
                    right: 12px;
                    font-size: 14px;
                    color: #0d1623;
                }

                .money__content {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 22px;
                }
                .money__label {
                    text-align: center;
                    color: #3f5372;
                    font-size: 14px;
                    margin-bottom: 0;
                    /* margin-top: 18px; */
                }
                .money__val {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    color: #0d1623;
                    margin-bottom: 0;
                    margin-top: -4px;
                }
                .money__line {
                    width: 1px;
                    height: 44px;
                    background-color: #d7e0ef;
                }
                .money__item {
                    flex: 1 0 0;
                }
                .disabled {
                    color: #cfcfcf !important;
                    cursor: not-allowed;
                }
                @media (max-width: 900px) {
                    .money__Alink {
                        right: 0;
                        font-size: 12px;
                    }
                }
                @media (max-width: 768px) {
                    .money__header {
                        height: 28px;
                        line-height: 28px;
                    }
                    .money__line--head {
                        height: 13px;
                        background-color: #d7e0ef;
                        width: 1px;
                        margin-top: 5px;
                    }
                    .money__container {
                        border-left: none;
                        border-right: none;
                        height: 93px;
                    }
                    .money__label {
                        font-size: 12px;
                        color: #3f5372;
                    }
                    .money__val {
                        font-size: 16px;
                    }
                    .money__content {
                        margin-top: 11px;
                    }
                }
            `}</style>
        </div>
    );
};

export default MoneyBox;

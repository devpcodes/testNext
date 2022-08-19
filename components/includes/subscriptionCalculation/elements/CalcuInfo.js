import { useState, useEffect } from 'react';
import CalcuItem from './CalcuItem';
import Line from './Line';
import icon from '../../../../resources/images/components/subscriptionCalculation/basic-help-circle (4).svg';
import SinoBtn from '../../loan/Collateral/elements/SinoBtn';
import { useUser } from '../../../../hooks/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, showLoginHandler } from '../../../../store/components/layouts/action';
import SubscriptionAccErrModal from './SubscriptionAccErrModal';
import { formatNum } from '../../../../services/formatNum';
import moment from 'moment';
import { useRouter } from 'next/router';

import { getToken } from '../../../../services/user/accessToken';
import { checkSignCA, sign } from '../../../../services/webCa';
import { postOrder } from '../../../../services/components/mySubscription/postOrder';
import { message } from 'antd';
const CalcuInfo = ({ amount, sfee, availAmount, endDate, allOrderAmount, stockId, stockName }) => {
    const { isLogin, accounts } = useUser();
    const isMobile = useSelector(store => store.layout.isMobile);
    const [checkAccount, setCheckAccount] = useState(false);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    const router = useRouter();

    const submitHandler = () => {
        if (!isLogin) {
            dispatch(showLoginHandler(true));
        } else {
            setCheckAccount(true);
            setTimeout(() => {
                setCheckAccount(false);
            }, 500);
        }
    };

    const openClickHandler = () => {
        router.push('/subscriptionArea/ProductInfo');
    };

    const successHandler = val => {
        // alert(val);

        if (val) {
            dispatch(
                setModal({
                    visible: true,
                    okText: '確定',
                    type: 'confirm',
                    title: '提醒',
                    noCloseIcon: true,
                    noTitleIcon: true,
                    content:
                        '離開永豐金證券理財網前往永豐銀MMA的列車即將出發，如確定上車請點選 【確定】，如還捨不得離開請點【取消】。',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                        await postOrderHandler();
                    },
                }),
            );
        }
    };

    const postOrderHandler = async () => {
        if (currentAccount.broker_id != null) {
            const token = getToken();
            const ca_content = sign(
                {
                    idno: currentAccount.idno,
                    broker_id: currentAccount.broker_id,
                    account: currentAccount.account,
                },
                true,
                token,
                true,
            );
            if (checkSignCA(ca_content)) {
                const callbackUrl =
                    location.protocol +
                    '//' +
                    location.host +
                    `${process.env.NEXT_PUBLIC_SUBPATH}` +
                    '/subscriptionArea/MySubscription';
                console.log('1111', callbackUrl);

                // console.log('postOrder', postOrder)
                // const res = await postOrder({
                //     isAppropriation: true,
                //     bankChannel: isMobile ? 'MWEB' : 'NETBANK',
                //     callbackUrl,
                //     branch: currentAccount.broker_id,
                //     account: currentAccount.account,
                //     stockId: stockId,
                //     token,
                //     ca_content,
                // });
                // window.location = res.url;

                try {
                    const res = await postOrder({
                        isAppropriation: true,
                        bankChannel: isMobile ? 'MWEB' : 'NETBANK',
                        callbackUrl,
                        branch: currentAccount.broker_id,
                        account: currentAccount.account,
                        stockId: stockId,
                        token,
                        ca_content,
                    });
                    window.location = res.url;
                } catch (error) {
                    // console.log('error', error)
                    message.error(error);
                }
            }
        }
    };

    return (
        <div className="info__container">
            <SubscriptionAccErrModal
                successHandler={successHandler}
                checkAccount={checkAccount}
                availAmount={availAmount}
                allOrderAmount={allOrderAmount}
                stockId={stockId}
                stockName={stockName}
            />
            <p className="info__title">申購便利通合計</p>
            <div>
                <span className="info__num">{formatNum(allOrderAmount)}</span>
                <span className="info__unit">元</span>
            </div>
            <Line style={{ marginTop: '20px' }} />
            <CalcuItem
                style={{ marginTop: '20px' }}
                label="申購款"
                val={formatNum(amount)}
                icon={icon}
                tooltip={
                    <div>
                        <p style={{ marginBottom: '0' }}>
                            1.申購款：申購款＝（申購價*申購張數）+申購處理費(20元) ＋中籤通知郵寄工本費(50元)。
                        </p>
                        <p style={{ marginBottom: '0' }}>
                            2.退款：未中籤及不合格申購於退款日將郵寄工本費及認購款退回，申購處理費不予退回。
                        </p>
                        <p style={{ marginBottom: '0' }}>
                            3.申購人銀行存款不足，不夠支付交割價款及預扣價款時，以交割價款為優先扣款。
                        </p>
                    </div>
                }
            />
            <CalcuItem
                style={{ marginTop: '12px' }}
                label="金流服務費"
                val={sfee}
                icon={icon}
                tooltip={'提供申購借款相關金流服務與平台使用 ，以次計費完成銀行動用即收取不予退回。'}
            />
            <Line style={{ marginTop: '20px' }} />
            <CalcuItem style={{ marginTop: '20px' }} label="可動用金額" val={formatNum(availAmount)} />
            <SinoBtn
                text={'預約借款申購'}
                style={{
                    display: 'block',
                    // border: '1px solid #d7e0ef',
                    outline: 'none',
                    width: '100%',
                    height: '48px',
                    fontSize: '16px',
                    padding: '9px 19px 9px 20px',
                    borderRadius: '2px',
                    backgroundColor: '#c43826',
                    color: 'white',
                    verticalAlign: 'top',
                    marginTop: '20px',
                    borderRadius: '2px',
                }}
                onClick={submitHandler}
            />
            <p className="description mr">預約成功將於截止日{moment(endDate).format('YYYY/MM/DD')}動用</p>
            <div className="footer">
                <span className="description">還沒有申購便利通帳戶？</span>
                <a className="link" onClick={openClickHandler}>
                    立即開戶 >
                </a>
            </div>
            <style jsx>{`
                .info__container {
                    padding: 24px 30px;
                    border: solid 1px #d7e0ef;
                    border-radius: 2px;
                }
                .info__title {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    margin-bottom: 0;
                }
                .info__num {
                    font-size: 28px;
                    font-weight: bold;
                    color: #0d1623;
                }
                .info__unit {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #0d1623;
                    padding-left: 4px;
                }
                .description {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                    text-align: center;
                    margin-bottom: 0;
                }
                .mr {
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 4px;
                }
                .link {
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.4px;
                    color: #daa360;
                }
                @media (max-width: 768px) {
                    .description {
                        font-size: 15px;
                    }
                    .info__container {
                        border-left: none;
                        border-right: none;
                        padding: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CalcuInfo;

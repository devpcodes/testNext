import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import Btn from '../../loan/overview/elements/Btn';
import CalcuInfo from '../elements/CalcuInfo';
import StockDetail from '../elements/StockDetail';
import { setModal } from '../../../../store/components/layouts/action';
import icon from '../../../../resources/images/components/subscriptionOverview/ic-circle (2).svg';
import { useUser } from '../../../../hooks/useUser';
import { fetchCalculation } from '../../../../services/components/subscirptionCalcuInfo/fetchCalculation';
import { getToken } from '../../../../services/user/accessToken';
import { useRouter } from 'next/router';
const CalculationComponents = () => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [calculationData, setCalculationData] = useState({});
    const [stockId, setStockId] = useState('');
    const { isLogin } = useUser();
    const router = useRouter();

    useEffect(() => {
        getCalculationData();
    }, [isLogin, stockId]);

    useEffect(() => {
        if (router.query.stockId != null && router.query.stockId !== '') {
            setStockId(router.query.stockId);
        }
    }, [router.query]);

    const getCalculationData = async () => {
        let token = '';
        if (isLogin) {
            token = getToken();
        }
        if (stockId) {
            try {
                const res = await fetchCalculation(stockId, token);
                setCalculationData(res);
            } catch (error) {}
        }
    };

    const clickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                content: (
                    <>
                        <p>1. 預約申請後於截止日進行動用：借款金額 X 利率 X (借款天數 / 365天) = 應付利息。</p>
                        <p>2. 未登入或未申辦客戶以最低利率試算，實際利率仍依個別客戶狀況審核。</p>
                        <p>3. 已申辦客戶以實際利率試算，但仍依預約動用當日之利率計息。</p>
                        <p>4. 詳細私房錢資料依永豐銀行公告為準。</p>
                    </>
                ),
                type: 'info',
                title: '試算說明',
                noCloseIcon: true,
                noTitleIcon: true,
            }),
        );
    };
    return (
        <>
            <Breadcrumb style={{ paddingLeft: isMobile ? '16px' : 0 }} />
            <div className="calcu__head">
                <h1 className="calcu__title">申購試算</h1>
                {isMobile ? (
                    <img className="calcu__icon" src={icon} onClick={clickHandler} />
                ) : (
                    <Btn
                        type="info"
                        text="試算說明"
                        style={{ width: '121px', height: '40px' }}
                        onClick={clickHandler}
                    />
                )}
            </div>
            <div className="calcu__content">
                <div className="calcu__left">
                    <StockDetail calculationData={calculationData} />
                </div>
                <div className="calcu__right">
                    <CalcuInfo
                        allOrderAmount={Number(calculationData.orderAmount) + Number(calculationData.sfee)}
                        amount={Number(calculationData.orderAmount)}
                        sfee={calculationData.sfee}
                        availAmount={calculationData.availAmount}
                        endDate={calculationData.endDate}
                    />
                </div>
            </div>
            <style jsx>{`
                .calcu__icon {
                    margin-top: -14px;
                }
                .calcu__title {
                    font-size: 28px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: 0.7px;
                    color: #0d1623;
                }
                .calcu__head {
                    display: flex;
                    justify-content: space-between;
                }
                .calcu__content {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                }
                .calcu__left {
                    flex: 2 0 0;
                    margin-right: 24px;
                }
                .calcu__right {
                    /* border: solid 1px #d7e0ef; */
                    flex: 1 0 0;
                    background: white;
                }
                @media (max-width: 768px) {
                    .calcu__content {
                        display: block;
                    }
                    .calcu__head {
                        padding-left: 16px;
                        padding-right: 16px;
                    }
                    .calcu__left {
                        margin-right: 0;
                    }
                    .calcu__right {
                        margin-top: 12px;
                    }
                }
            `}</style>
            <style global jsx>{`
                .page__container {
                    background-color: #f9fbff;
                    padding-bottom: 32px;
                }
            `}</style>
        </>
    );
};

export default CalculationComponents;

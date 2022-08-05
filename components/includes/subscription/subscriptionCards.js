import { memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { openGoOrder } from '../../../services/openGoOrder';
import { useCheckMobile } from '../../../hooks/useCheckMobile';
import { useRouter } from 'next/router';
import { formatNum } from '../../../services/formatNum';
const SubscriptionCards = memo(({ stockData, onActionClick, onCancelClick, footerHidden, settingDate }) => {
    // console.log(stockData);
    const isMobile = useCheckMobile();
    const router = useRouter();

    const formatDate = date => {
        return `${date.slice(4, 6)}/${date.slice(6, 8)}`;
    };

    const formatAmount = amount => {
        const regExp = new RegExp('\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))', 'g');
        return (amount + '').replace(regExp, ',');
    };

    const getDateClassName = date => {
        let dateClassName = '';
        let today = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
        const sdate = +new Date(date.slice(0, 4), date.slice(4, 6), date.slice(6, 8));
        if (settingDate) {
            today = +new Date(settingDate.getFullYear(), settingDate.getMonth() + 1, settingDate.getDate());
        }
        // console.log(today, sdate);
        if (today > sdate) {
            dateClassName = 'before';
        } else if (today === sdate) {
            dateClassName = 'now';
        } else if (today < sdate) {
            dateClassName = 'after';
        }
        return `time__course ${dateClassName}`;
    };

    const openSellGoOrder = stockid => {
        openGoOrder(
            {
                stockid: stockid,
                bs: 'S',
                qty: 1,
                marketType: 'S',
            },
            isMobile,
            router,
        );
    };

    const openCollateral = stockId => {
        window.open(
            `${location.protocol}//${location.host}${
                process.env.NEXT_PUBLIC_SUBPATH
            }/subscriptionArea/Calculation/?stockId=${stockId}${router.query.nav === '0' ? '&nav=0' : ''}`,
            '_blank',
        );
    };

    const openLoanCollateral = () => {
        window.open(
            `${location.protocol}//${location.host}${process.env.NEXT_PUBLIC_SUBPATH}/loan-zone/Collateral/${
                router.query.nav === '0' ? '?nav=0' : ''
            }`,
            '_blank',
        );
    };

    const renderBtn = () => {
        const btn = (
            <>
                {stockData.canAppropriation && stockData.canOrder ? (
                    <button className="action__btn mortgage" onClick={() => openCollateral(stockData.stockId)}>
                        借款申購
                    </button>
                ) : (
                    <></>
                )}

                {stockData.canOrder ? (
                    <button
                        className="action__btn buy"
                        onClick={() =>
                            onActionClick(stockData.stockName, stockData.stockId, stockData.orderAmount, false)
                        }
                    >
                        立即申購
                    </button>
                ) : (
                    <></>
                )}

                {stockData.canAppropriation && !stockData.canOrder ? (
                    <button className="action__btn buy" onClick={() => openCollateral(stockData.stockId)}>
                        申請預約動用
                    </button>
                ) : (
                    <></>
                )}

                {stockData.canCancelOrder ? (
                    <button
                        className="action__btn cancel"
                        onClick={() =>
                            onCancelClick(stockData.stockName, stockData.stockId, stockData.orderAmount, false)
                        }
                    >
                        立即取消
                    </button>
                ) : (
                    <></>
                )}

                {!stockData.canCancelOrder && stockData.canCancelAppropriation ? (
                    <button
                        className="action__btn cancel"
                        onClick={() =>
                            onCancelClick(stockData.stockName, stockData.stockId, stockData.orderAmount, true)
                        }
                    >
                        取消預約動用
                    </button>
                ) : (
                    <></>
                )}

                {stockData.canSellStock ? (
                    <button className="action__btn sell" onClick={() => openSellGoOrder(stockData.stockId)}>
                        立即賣股
                    </button>
                ) : (
                    <></>
                )}

                {stockData.canMortgage ? (
                    <button className="action__btn mortgage" onClick={() => openLoanCollateral()}>
                        抵押借款
                    </button>
                ) : (
                    <></>
                )}

                {!stockData.canOrder &&
                !stockData.canCancelOrder &&
                !stockData.canAppropriation &&
                !stockData.canCancelAppropriation &&
                !stockData.canSellStock &&
                !stockData.canMortgage ? (
                    <button disabled className="action__btn disabled">
                        {stockData.status == 'A'
                            ? '即將開始'
                            : stockData.status == 'E' && ['S1', 'S2', 'Y', 'N1', 'W1'].includes(stockData.orderStatus)
                            ? '已申購'
                            : '申購期間已過'}
                    </button>
                ) : (
                    <></>
                )}
            </>
        );

        return btn;
    };

    return (
        <>
            <div>
                <div className="subscriptionCards__header">
                    <a
                        className="subscriptionCards__title"
                        href={`${process.env.NEXT_PUBLIC_SUBPATH}/TradingCenter_TWStocks_Stock/?code=${stockData.stockId}`}
                        target="_blank"
                    >
                        <div className="name">{stockData.stockName}</div>
                        <div className="code">{stockData.stockId}</div>
                    </a>
                    <div className="action">{stockData.marketStatus}</div>
                    <div className="status">{stockData.statusMessage}</div>
                </div>
                <div className="subscriptionCards__body">
                    <div className="info">
                        <div className="info__cell">
                            <div className="info__cell__title">申購價</div>
                            <div className="info__cell__amount">{stockData.price}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">總申購張數</div>
                            <div className="info__cell__amount">{formatNum(parseInt(stockData.share / 1000))}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">市價</div>
                            <div className="info__cell__amount">{stockData.close}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">申購張數</div>
                            <div className="info__cell__amount">{formatNum(parseInt(stockData.applyShare / 1000))}</div>
                        </div>
                    </div>
                    <div className={stockData.diffPrice > 0 ? 'price__difference up' : 'price__difference down'}>
                        <span>價差</span>
                        <span className="price">{formatNum(parseInt(stockData.diffPrice * stockData.applyShare))}</span>
                        <span>元</span>
                        <span className="percent">
                            {stockData.diffRatio > 0 ? `(+${stockData.diffRatio}%)` : `(${stockData.diffRatio})%`}
                        </span>
                    </div>
                    <div className="time__block">
                        <div className={getDateClassName(stockData.beginDate)}>
                            <div className="step"> 開始 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.beginDate)} </div>
                        </div>
                        <div className={getDateClassName(stockData.endDate)}>
                            <div className="step"> 截止 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.endDate)} </div>
                        </div>
                        <div className={getDateClassName(stockData.feeDate)}>
                            <div className="step"> 扣款 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.feeDate)} </div>
                        </div>
                        <div className={getDateClassName(stockData.lotDate)}>
                            <div className="step"> 抽籤 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.lotDate)} </div>
                        </div>
                        <div className={getDateClassName(stockData.moneyDate)}>
                            <div className="step"> 退款 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.moneyDate)} </div>
                        </div>
                        <div className={getDateClassName(stockData.stkDate)}>
                            <div className="step"> 撥券 </div>
                            <div className="point"></div>
                            <div className="date"> {formatDate(stockData.stkDate)} </div>
                        </div>
                        <hr className="time__line" />
                    </div>
                </div>
                {footerHidden ? '' : <div className="subscriptionCards__footer">{renderBtn()}</div>}
            </div>

            <style jsx>{`
                .subscriptionCards__header {
                    position: relative;
                    border-bottom: solid 1px #d7e0ef;
                    padding-bottom: 11px;
                }
                .subscriptionCards__title {
                    display: flex;
                    margin-bottom: -4px;
                    color: #0d1623;
                    font-weight: bold;
                    align-items: flex-end;
                }
                .price__difference {
                    padding: 10px 16px;
                    font-size: 1.6rem;
                    margin: 12px 0 22px 0;
                    font-weight: bold;
                }
                .price__difference .price {
                    font-size: 2.6rem;
                    margin: 0 7px;
                }
                .price__difference .percent {
                    margin: 0 7px;
                }
                .price__difference.up {
                    background: #feefee;
                    color: #f45a4c;
                }
                .price__difference.down {
                    background: #def1ea;
                    color: #22a16f;
                }
                .time__block {
                    height: 62px;
                    display: flex;
                    position: relative;
                }
                .time__course {
                    width: 16.666%;
                    text-align: center;
                    z-index: 1;
                }
                .dot {
                    background: #fff;
                    padding: 0 4px;
                    width: fit-content;
                    margin: 0 auto;
                }
                .dot::before {
                    content: '';
                    display: inline-block;
                    border: 2px solid #d7e0ef;
                    width: 12px;
                    height: 12px;
                    border-radius: 8px;
                    background: #3f5372;
                }
                .time__course .point {
                    background: #fff;
                    padding: 0 3px;
                    width: fit-content;
                    margin: 0 auto;
                }
                .time__course .point::before {
                    content: '';
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 8px;
                    vertical-align: middle;
                }
                .time__course.before > div {
                    color: #6c7b94;
                }
                .time__course.before .point::before {
                    background: #a9b6cb;
                    border: solid 2px #d7e0ef;
                }
                .time__course.after > div {
                    color: #0d1623;
                }
                .time__course.after .point::before {
                    background: #3f5372;
                    border: solid 2px #d7e0ef;
                }
                .time__course.now > div {
                    color: #c43826;
                }
                .time__course.now .point::before {
                    background: #c43826;
                    border: solid 2px #ebbdb7;
                }
                .time__line {
                    width: 84%;
                    position: absolute;
                    top: 50%;
                    border: none;
                    background: #d7e0ef;
                    height: 1px;
                    left: 8%;
                    padding: 0;
                    margin: 0;
                }
                .name {
                    font-size: 2.4rem;
                    margin-right: 5px;
                }
                .time__course .date {
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .time__course .step {
                    font-size: 1.4rem;
                    font-weight: bold;
                }
                .code {
                    font-size: 2rem;
                    padding-bottom: 2px;
                }
                .action {
                    color: #3f5372;
                    font-size: 1.4rem;
                }
                .status {
                    position: absolute;
                    background-color: #d7e0ef;
                    color: #254a91;
                    font-size: 1.4rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    right: 0;
                    padding: 3px 7px;
                }
                .info {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin-top: 11px;
                }
                .info__cell {
                    width: 48%;
                    display: flex;
                    justify-content: space-between;
                    color: #3f5372;
                    font-size: 1.6rem;
                }
                .subscriptionCards__footer {
                    display: flex;
                    justify-content: space-between;
                    margin: 21px 0 0 0;
                }
            `}</style>
            <style jsx global>{`
                .action__btn {
                    height: 38px;
                    width: 100%;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #f3f6fe;
                    color: #a9b6cb;
                    font-size: 1.6rem;
                }
                .action__btn.fifty__percent {
                    width: 45%;
                }
                .action__btn.buy {
                    background: #c43826;
                    color: #fff;
                    border: 1px solid #c43826;
                }
                .action__btn.cancel {
                    background: #254a91;
                    color: #fff;
                    border: 1px solid #254a91;
                }
                .action__btn.sell {
                    background: #22a16f;
                    color: #fff;
                    border: 1px solid #22a16f;
                }
                .action__btn.mortgage {
                    background: #daa360;
                    color: #fff;
                    border: 1px solid #daa360;
                }
                .subscriptionCards__footer .action__btn:nth-child(n + 1) {
                    margin-left: 15px;
                }
            `}</style>
        </>
    );
});

export default SubscriptionCards;

import { memo } from 'react';
import { useSelector } from 'react-redux';

const SubscriptionCards = memo(({ stockData }) => {
    console.log(stockData);
    return (
        <>
            <div className="subscriptionCards">
                <div className="subscriptionCards__header">
                    <div className="subscriptionCards__title">
                        <div className="name">{stockData.stockName}</div>
                        <div className="code">{stockData.stockId}</div>
                    </div>
                    <div className="action">{stockData.marketStatus}</div>
                    <div className="status">{stockData.status}</div>
                </div>
                <div className="subscriptionCards__body">
                    <div className="info">
                        <div className="info__cell">
                            <div className="info__cell__title">申購價</div>
                            <div className="info__cell__amount">{stockData.price}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">總申購張數</div>
                            <div className="info__cell__amount">{stockData.share}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">市價</div>
                            <div className="info__cell__amount">{stockData.close}</div>
                        </div>
                        <div className="info__cell">
                            <div className="info__cell__title">申購張數</div>
                            <div className="info__cell__amount">{stockData.applyShare}</div>
                        </div>
                    </div>
                    <div className="price__difference up">
                        <span>價差</span>
                        <span className="price">{stockData.diffPrice}</span>
                        <span>元</span>
                        <span className="percent">(+{stockData.diffRatio}%)</span>
                    </div>
                    <div className="time__block">
                        <div className="time__course">
                            <div className="step"> 開始 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.beginDate} </div>
                        </div>
                        <div className="time__course">
                            <div className="step"> 截止 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.endDate} </div>
                        </div>
                        <div className="time__course">
                            <div className="step"> 扣款 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.feeDate} </div>
                        </div>
                        <div className="time__course">
                            <div className="step"> 抽籤 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.lotDate} </div>
                        </div>
                        <div className="time__course">
                            <div className="step"> 退款 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.moneyDate} </div>
                        </div>
                        <div className="time__course">
                            <div className="step"> 撥券 </div>
                            <div className="point"></div>
                            <div className="date"> {stockData.stkDate} </div>
                        </div>
                        <hr className="time__line" />
                    </div>
                </div>

                <div className="subscriptionCards__footer">
                    <button className="action__btn buy">立即申購</button>
                </div>
            </div>

            <style jsx>{`
                .subscriptionCards {
                    border: solid 1px #d7e0ef;
                    padding: 24px;
                    width: 30%;
                    margin-top: 24px;
                    height: 400px;
                    max-height: 400px;
                    min-height: 400px;
                    margin-bottom: 20px;
                    margin-right: 5%;
                }
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
                .time__block {
                    display: flex;
                    position: relative;
                }
                .time__course {
                    width: 16.666%;
                    text-align: center;
                    z-index: 1;
                }
                .time__course .point {
                    width: 12px;
                    height: 12px;
                    background: #3f5372;
                    border-radius: 50%;
                    border: solid 2px #d7e0ef;
                    margin: 5px auto;
                }
                .time__line {
                    width: 84%;
                    position: absolute;
                    top: 47%;
                    border: none;
                    background: #d7e0ef;
                    height: 1px;
                    left: 8%;
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
                    width: 58px;
                    height: 26px;
                    background-color: #d7e0ef;
                    color: #254a91;
                    font-size: 1.4rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 0;
                    right: 0;
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
            `}</style>
        </>
    );
});

export default SubscriptionCards;

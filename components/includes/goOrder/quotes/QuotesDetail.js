import { useSelector } from 'react-redux';
import { checkServer } from '../../../../services/checkServer';
import { toDecimal, priceColor, formatPrice } from '../../../../services/numFormat';
const QuotesDetail = ({ stopRender, show } = { stopRender: false, show: true }) => {
    const solaceData = useSelector(store => store.solace.solaceData);
    const lot = useSelector(store => store.goOrder.lot); //useSelector(store => store.goOrder.lot)
    const renderAmountSum = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return isNaN(Math.round(parseInt(solaceData[0]?.data?.OddlotAmountSum) / 1000000) / 100)
                    ? '--'
                    : Math.round(parseInt(solaceData[0]?.data?.OddlotAmountSum) / 1000000) / 100;
            } else {
                if (solaceData[0]?.data?.AmountSum?.length > 0 && solaceData[0].data.AmountSum[0] != null) {
                    return Math.round(parseInt(solaceData[0].data.AmountSum[0]) / 1000000) / 100;
                } else {
                    return '--';
                }
            }
        } else {
            return '--';
        }
    };

    const getReference = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return formatPrice(solaceData[0]?.data?.OddlotReference, '--') || '--';
            } else {
                return formatPrice(solaceData[0]?.data?.Reference, '--') || '--';
            }
        } else {
            return '--';
        }
    };

    const getOpen = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return simtradeHandler(formatPrice(solaceData[0]?.data?.OddlotOpen, '--')) || '--';
            } else {
                return simtradeHandler(formatPrice(solaceData[0]?.data?.Open, '--')) || '--';
            }
        } else {
            return '--';
        }
    };

    const getHigh = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return simtradeHandler(formatPrice(solaceData[0]?.data?.OddlotHigh, '--')) || '--';
            } else {
                if (solaceData[0]?.data?.High?.length > 0) {
                    return simtradeHandler(formatPrice(solaceData[0]?.data?.High[0], '--')) || '--';
                }
            }
        } else {
            return '--';
        }
    };

    const getLow = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return simtradeHandler(formatPrice(solaceData[0]?.data?.OddlotLow, '--')) || '--';
            } else {
                if (solaceData[0]?.data?.Low?.length > 0) {
                    return simtradeHandler(formatPrice(solaceData[0]?.data?.Low[0], '--')) || '--';
                }
            }
        } else {
            return '--';
        }
    };

    const getAvgPrice = () => {
        if (!checkServer() && !stopRender && solaceData.length > 0) {
            if (lot === 'Odd') {
                return formatPrice(solaceData[0]?.data?.OddlotAvgPrice, '--') || '--';
            } else {
                if (solaceData[0]?.data?.AvgPrice?.length > 0) {
                    return formatPrice(solaceData[0]?.data?.AvgPrice[0], '--') || '--';
                }
            }
        } else {
            return '--';
        }
    };

    const simtradeHandler = price => {
        if (isNaN(Number(price))) {
            return price;
        }
        if (lot === 'Odd') {
            if (!!solaceData[0]?.data?.OddlotSimtrade) {
                return price + '*';
            } else {
                return price;
            }
        } else {
            if (!!solaceData[0]?.data?.Simtrade) {
                return price + '*';
            } else {
                return price;
            }
        }
    };

    return (
        <>
            <div className="quotes__container" style={{ display: show ? 'block' : 'none' }}>
                <div className="item__container--top">
                    <div className="item__box">
                        <span className="label">昨收</span>
                        <button className="item">{getReference()}</button>
                    </div>
                    <div className="item__box">
                        <span className="label">開盤</span>
                        <button
                            className="item"
                            style={{
                                color: priceColor(getOpen(), getReference()),
                            }}
                        >
                            {getOpen()}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">金額(億)</span>
                        <span className="item">{renderAmountSum()}</span>
                    </div>
                </div>
                <div>
                    <div className="item__box">
                        <span className="label">最高</span>
                        <button
                            className="item"
                            style={{
                                color: priceColor(getHigh(), getReference()),
                            }}
                        >
                            {getHigh()}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">最低</span>
                        <button
                            className="item"
                            style={{
                                color: priceColor(getLow(), getReference()),
                            }}
                        >
                            {getLow()}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">均價</span>
                        <button
                            className="item"
                            style={{
                                color: priceColor(getAvgPrice(), getReference()),
                            }}
                        >
                            {getAvgPrice()}
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .item {
                    margin: 0;
                    padding: 0;
                    border: none;
                    outline: none;
                    background-color: white;
                    font-size: 1.6rem;
                    float: right;
                    font-weight: bold;
                    color: #0d1623;
                }

                .label {
                    height: 22px;
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    font-weight: bold;
                }
                @media (max-width: 370px) {
                    .item {
                        font-size: 1.4rem;
                    }
                    .label {
                        font-size: 1.4rem;
                    }
                }
                .item__box {
                    font-size: 0;
                    display: inline-block;
                    width: calc((100% - 18px) / 3);
                    margin-right: 9px;
                }
                .item__box:last-child {
                    margin-right: 0;
                }
                .item__container--top {
                    margin-bottom: 4px;
                }
                .quotes__container {
                    padding: 0 16px;
                }
            `}</style>
        </>
    );
};

export default QuotesDetail;

import { useSelector } from 'react-redux';
import { checkServer } from '../../../../services/checkServer';
import { toDecimal, priceColor } from '../../../../services/numFormat';
const QuotesDetail = () => {
    const solaceData = useSelector(store => store.solace.solaceData);
    const renderAmountSum = () => {
        if (solaceData[0]?.data?.AmountSum?.length > 0 && solaceData[0].data.AmountSum[0] != null) {
            return Math.round(parseInt(solaceData[0].data.AmountSum[0]) / 1000000) / 100;
        } else {
            return '';
        }
    };
    return (
        <>
            <div className="quotes__container">
                <div className="item__container--top">
                    <div className="item__box">
                        <span className="label">昨收</span>
                        <button className="item">
                            {(!checkServer() && solaceData.length > 0 && toDecimal(solaceData[0]?.data?.Reference)) ||
                                '--'}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">開盤</span>
                        <button
                            className="item"
                            style={{
                                color:
                                    !checkServer() &&
                                    solaceData.length > 0 &&
                                    priceColor(solaceData[0]?.data?.Open, solaceData[0]?.data?.Reference),
                            }}
                        >
                            {(!checkServer() && solaceData.length > 0 && toDecimal(solaceData[0]?.data?.Open)) || '--'}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">金額(億)</span>
                        <span className="item">
                            {(!checkServer() && solaceData.length > 0 && renderAmountSum()) || '--'}
                        </span>
                    </div>
                </div>
                <div>
                    <div className="item__box">
                        <span className="label">最高</span>
                        <button
                            className="item"
                            style={{
                                color:
                                    !checkServer() &&
                                    solaceData.length > 0 &&
                                    solaceData[0]?.data?.High?.length > 0 &&
                                    priceColor(solaceData[0]?.data?.High[0], solaceData[0]?.data?.Reference),
                            }}
                        >
                            {(!checkServer() &&
                                solaceData.length > 0 &&
                                solaceData[0]?.data?.High?.length > 0 &&
                                toDecimal(solaceData[0]?.data?.High[0])) ||
                                '--'}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">最低</span>
                        <button
                            className="item"
                            style={{
                                color:
                                    !checkServer() &&
                                    solaceData.length > 0 &&
                                    solaceData[0]?.data?.Low?.length > 0 &&
                                    priceColor(solaceData[0]?.data?.Low[0], solaceData[0]?.data?.Reference),
                            }}
                        >
                            {(!checkServer() &&
                                solaceData.length > 0 &&
                                solaceData[0]?.data?.Low?.length > 0 &&
                                toDecimal(solaceData[0]?.data?.Low[0])) ||
                                '--'}
                        </button>
                    </div>
                    <div className="item__box">
                        <span className="label">均價</span>
                        <button
                            className="item"
                            style={{
                                color:
                                    !checkServer() &&
                                    solaceData.length > 0 &&
                                    solaceData[0]?.data?.AvgPrice?.length > 0 &&
                                    priceColor(solaceData[0]?.data?.AvgPrice[0], solaceData[0]?.data?.Reference),
                            }}
                        >
                            {(!checkServer() &&
                                solaceData.length > 0 &&
                                solaceData[0]?.data?.AvgPrice?.length > 0 &&
                                toDecimal(solaceData[0]?.data?.AvgPrice[0])) ||
                                '--'}
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
                @media (max-width: 350px) {
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

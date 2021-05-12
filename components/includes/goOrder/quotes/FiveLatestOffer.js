import { useCallback, memo } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { checkServer } from '../../../../services/checkServer';
import { toDecimal, priceColor, formatPrice, formatPriceByUnit } from '../../../../services/numFormat';
import { setOrderPrice } from '../../../../store/goOrder/action';

const FiveLatestOffer = ({ code, stopRender, solaceData, lot, checkLot } = { stopRender: false }) => {
    // const solaceData = useSelector(store => store.solace.solaceData);
    // const lot = useSelector(store => store.goOrder.lot); //useSelector(store => store.goOrder.lot)
    // const checkLot = useSelector(store => store.goOrder.checkLot);

    const dispatch = useDispatch();
    const getVolumeSum = keyName => {
        if (!checkServer() && !stopRender && solaceData.length > 0 && solaceData[0].topic != null) {
            var volumeSum = 0;
            if (solaceData[0].data[keyName].length > 0) {
                solaceData[0].data[keyName].forEach((item, index) => {
                    volumeSum += solaceData[0].data[keyName][index];
                });
                return volumeSum;
            }
        }
        return 0;
    };

    const simtradeHandler = price => {
        if (lot === 'Odd' && checkLot) {
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

    const HLHandler = price => {
        if (lot === 'Odd' && checkLot) {
            if (solaceData[0].data.High == price) {
                return 'H';
            }
            if (solaceData[0].data.Low == price) {
                return 'L';
            }
        } else {
            if (Array.isArray(solaceData[0].data.High) && solaceData[0].data.High[0] == price) {
                return 'H';
            }
            if (Array.isArray(solaceData[0].data.Low) && solaceData[0].data.Low[0] == price) {
                return 'L';
            }
        }
    };

    const priceClickHandler = val => {
        val = val.split('*')[0];
        if (!isNaN(Number(val))) {
            dispatch(setOrderPrice(val));
        }
    };

    const getWidthHandler = item => {
        if (formatPriceByUnit(code, item).length <= 2) {
            return '40px';
        }
        return formatPriceByUnit(code, item).length * 8 + 'px';
    };

    const renderBidPrice = useCallback(
        (priceKey, volumeKey) => {
            let data = [];
            if (!checkServer() && !stopRender && solaceData.length > 0 && solaceData[0].topic != null) {
                if (solaceData[0].topic.indexOf('SNP') >= 0 || solaceData[0].topic.indexOf('QUT' >= 0)) {
                    let data = solaceData;
                    if (data.length > 0) {
                        if (priceKey === 'BidPrice' || priceKey === 'OddlotBidPrice') {
                            if (data[0].data[priceKey] != null && Array.isArray(data[0].data[priceKey])) {
                                return data[0].data[priceKey].map((item, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <span
                                                style={{
                                                    color: priceColor(
                                                        item,
                                                        lot === 'Odd' && checkLot
                                                            ? data[0].data.OddlotReference
                                                            : data[0].data.Reference,
                                                    ),
                                                    fontSize: '1.4rem',
                                                    marginTop: '1px',
                                                }}
                                                className="hL"
                                            >
                                                {HLHandler(item)}
                                            </span>
                                            <span
                                                className="volume"
                                                style={sellPriceStyleHandler(data[0].data[volumeKey][index], 'buy')}
                                            >
                                                {data[0].data[volumeKey][index]}
                                            </span>
                                            <span
                                                className="price"
                                                style={{
                                                    color: priceColor(
                                                        item,
                                                        lot === 'Odd' && checkLot
                                                            ? data[0].data.OddlotReference
                                                            : data[0].data.Reference,
                                                    ),
                                                    width: getWidthHandler(item), //formatPrice(item).length * 8 + 'px'
                                                    float: 'right',
                                                }}
                                                onClick={priceClickHandler.bind(
                                                    null,
                                                    simtradeHandler(formatPriceByUnit(code, item, '--')),
                                                )}
                                            >
                                                {simtradeHandler(formatPriceByUnit(code, item, '--'))}
                                            </span>
                                            <div
                                                className="box"
                                                style={sellBoxStyleHandler(
                                                    data[0].data[volumeKey][index],
                                                    !!data[0].data.OddlotSimtrade || !!data[0].data.Simtrade,
                                                    'buy',
                                                    formatPriceByUnit(code, item, '--').length,
                                                    item,
                                                )}
                                                // style={{
                                                //     width: `calc(100% - ${50 + toDecimal(item).length * 8}px)`,
                                                // }}
                                            >
                                                <div
                                                    className="box__content"
                                                    style={{
                                                        width: boxContentWidth(
                                                            (data[0].data[volumeKey][index] * 100) /
                                                                getVolumeSum(volumeKey),
                                                        ),
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                });
                            }
                        } else {
                            if (data[0].data[priceKey] != null && Array.isArray(data[0].data[priceKey])) {
                                return data[0].data[priceKey].map((item, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <span
                                                style={{
                                                    color: priceColor(
                                                        item,
                                                        lot === 'Odd' && checkLot
                                                            ? data[0].data.OddlotReference
                                                            : data[0].data.Reference,
                                                    ),
                                                    fontSize: '1.4rem',
                                                    marginTop: '1px',
                                                    textAlign: 'right',
                                                }}
                                                className="hL"
                                            >
                                                {HLHandler(item)}
                                            </span>
                                            <span
                                                className="volume"
                                                style={{
                                                    color: priceColor(
                                                        item,
                                                        lot === 'Odd' && checkLot
                                                            ? data[0].data.OddlotReference
                                                            : data[0].data.Reference,
                                                    ),
                                                    width: getWidthHandler(item),
                                                }}
                                                onClick={priceClickHandler.bind(
                                                    null,
                                                    simtradeHandler(formatPriceByUnit(code, item, '--')),
                                                )}
                                            >
                                                {simtradeHandler(formatPriceByUnit(code, item, '--'))}
                                            </span>
                                            <div
                                                className="box"
                                                style={sellBoxStyleHandler(
                                                    data[0].data[volumeKey][index],
                                                    !!data[0].data.OddlotSimtrade || !!data[0].data.Simtrade,
                                                    'sell',
                                                    formatPriceByUnit(code, item, '--').length,
                                                    item,
                                                )}
                                            >
                                                <div
                                                    className="box__content"
                                                    style={{
                                                        width: boxContentWidth(
                                                            (data[0].data[volumeKey][index] * 100) /
                                                                getVolumeSum(volumeKey),
                                                        ),
                                                    }}
                                                ></div>
                                            </div>
                                            <span
                                                className="price"
                                                style={sellPriceStyleHandler(data[0].data[volumeKey][index])}
                                            >
                                                {data[0].data[volumeKey][index]}
                                            </span>
                                        </div>
                                    );
                                });
                            }
                        }
                    }
                }
            }
            if (Object.keys(solaceData).length == 0 || data.length === 0 || stopRender) {
                return defaultRender(priceKey);
            }
        },
        [lot, solaceData, checkLot],
    );

    const boxContentWidth = price => {
        if (isNaN(Number(price)) || Math.ceil(price) == 0) {
            return '0%';
        } else {
            return Math.round(price) + '%';
        }
        // if (Math.ceil(price) >= 0) {
        //     return '1%';
        // } else {
        //     return Math.round(price) + '%';
        // }
    };

    const sellBoxStyleHandler = (amount, simtrade, type = 'sell', priceLength, item) => {
        if (item === '市價') {
            priceLength = 4;
        }

        let w;
        if (String(amount).length + priceLength >= 10) {
            w = '108px';
        } else if (String(amount).length + priceLength >= 7) {
            w = '100px';
        } else {
            w = '90px';
        }

        if (type === 'sell') {
            return {
                width: `calc(100% - ${w})`,
                paddingLeft: `${simtrade ? '9px' : '5px'}`,
            };
        } else {
            return {
                width: `calc(100% - ${w})`,
                float: 'right',
            };
        }
    };

    const sellPriceStyleHandler = (amount, type = 'sell') => {
        let w;
        if (String(amount).length <= 4) {
            w = '35px';
        } else if (String(amount).length == 5) {
            w = '45px';
        } else {
            w = '55px';
        }
        if (type === 'sell') {
            return {
                width: w,
                float: 'right',
            };
        } else {
            return {
                width: w,
            };
        }
    };

    const defaultRender = priceKey => {
        if (priceKey === 'BidPrice' || priceKey === 'OddlotBidPrice') {
            return [1, 2, 3, 4, 5].map((item, index) => (
                <div className="item" key={index}>
                    <span className="hL"></span>
                    <span className="volume">0</span>
                    <div className="box">
                        <div className="box__content"></div>
                    </div>
                    <span className="price">--</span>
                </div>
            ));
        } else {
            return [1, 2, 3, 4, 5].map((item, index) => (
                <div className="item" key={index}>
                    <span className="hL"></span>
                    <span className="volume">--</span>
                    <div className="box">
                        <div className="box__content"></div>
                    </div>
                    <span className="price">0</span>
                </div>
            ));
        }
    };
    return (
        <>
            <div className="five__container">
                <span className="blackLine"></span>
                <div className="buySell__header">
                    <div className="buySell__left">
                        <span className="header__lText header__text">買量</span>
                        <span className="header__rText header__text">買進</span>
                    </div>
                    <div className="buySell__right">
                        <span className="header__text">賣出</span>
                        <span className="header__rText header__text">賣量</span>
                    </div>
                </div>
                <div className="five__content">
                    <div className="buy__box">
                        {lot === 'Odd' && checkLot
                            ? renderBidPrice('OddlotBidPrice', 'OddlotBidShares')
                            : renderBidPrice('BidPrice', 'BidVolume')}
                    </div>
                    <div className="sell__box">
                        {lot === 'Odd' && checkLot
                            ? renderBidPrice('OddlotAskPrice', 'OddlotAskShares')
                            : renderBidPrice('AskPrice', 'AskVolume')}
                    </div>
                </div>
                <span className="blackLine"></span>
            </div>
            <style jsx>{`
                /* .five__container {
                    padding: 0 16px;
                }
                .blackLine {
                    display: block;
                    margin-top: 8px;
                    height: 1px;
                    background: #0d1623;
                }
                .blackLine:last-child {
                    margin-top: 2px;
                }
                .buySell__header {
                    height: 24px;
                    margin: 0 0 3px;
                    padding: 0 0 3px;
                    background-color: #e6ebf5;
                    font-size: 0;
                }
                .buySell__left {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-left: 15px;
                    margin-right: 8px;
                }
                .buySell__right {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-right: 20px;
                    margin-left: 8px;
                }
                .header__rText {
                    float: right;
                }
                .header__text {
                    line-height: 24px;
                } */
            `}</style>
            <style jsx global>{`
                .five__container {
                    padding: 0 16px;
                }
                .blackLine {
                    display: block;
                    margin-top: 8px;
                    height: 1px;
                    background: #0d1623;
                }
                .blackLine:last-child {
                    margin-top: 2px;
                }
                .buySell__header {
                    height: 24px;
                    margin: 0 0 3px;
                    padding: 0 0 3px;
                    background-color: ${lot === 'Odd' && checkLot ? '#f5e8d7' : '#e6ebf5'};
                    font-size: 0;
                }
                .buySell__left {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-left: 15px;
                    margin-right: 8px;
                }
                .buySell__right {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-right: 15px;
                    margin-left: 8px;
                }
                .header__rText {
                    float: right;
                }
                .header__text {
                    line-height: 24px;
                }

                .five__container .item {
                    font-size: 1.6rem;
                    font-weight: bold;
                    height: 22px;
                    clear: both;
                }

                .five__container .buy__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                }
                .five__container .sell__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                    float: right;
                }
                .five__container .sell__box .item {
                    margin-bottom: 2px;
                }
                .five__container .hL {
                    width: 15px;
                    display: inline-block;
                }
                .five__container .sell__box .hL {
                    float: right;
                }
                .five__container .sell__box .box__content {
                    background-color: #22a16f;
                }
                .five__container .volume {
                    width: 35px;
                    display: inline-block;
                }
                .five__container .price {
                    width: 60px;
                    display: inline-block;
                    text-align: right;
                }

                .five__container .buy__box .price {
                    float: right;
                }
                .five__container .box {
                    width: calc(100% - 110px);
                    height: 8px;
                    display: inline-block;
                    padding-right: 0;
                    vertical-align: top;
                    margin-top: 8px;
                    padding-right: 5px;
                }

                .five__container .box__content {
                    width: 0%;
                    height: 8px;
                    background: #c43826;
                    vertical-align: middle;
                    float: right;
                }
                .five__container .sell__box .box__content {
                    float: left;
                }
                .five__container .sell__box .volume {
                    width: 60px;
                }
                .five__container .sell__box .price {
                    width: 35px;
                }
                .five__container .sell__box .box {
                    padding-left: 5px;
                    padding-right: 0;
                }
            `}</style>
        </>
    );
};

const mapStateToProps = state => {
    return {
        solaceData: state.solace.solaceData,
        lot: state.goOrder.lot,
        checkLot: state.goOrder.checkLot,
    };
};
function arePropsEqual(prevProps, nextProps) {
    if (prevProps.checkLot !== nextProps.checkLot) {
        return false;
    }
    if (prevProps.lot !== nextProps.lot) {
        return false;
    }
    if (nextProps.solaceData.length && nextProps.solaceData.length > 0) {
        if (
            nextProps.solaceData[0].topic.indexOf('QUT') !== -1 ||
            nextProps.solaceData[0].topic.indexOf('SNP') !== -1
        ) {
            return false;
        }
    }
    return true;
}

export default connect(mapStateToProps, null)(memo(FiveLatestOffer, arePropsEqual));

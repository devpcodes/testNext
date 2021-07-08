import { useCallback, useState, useEffect } from 'react';
import ChangeNum from '../../searchList/ChangeNum';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import { checkRealtimeMarket } from '../../../../../services/components/goOrder/sb/checkRealtimeMarket';
import { getPriceJumpPoint } from '../../../../../services/components/goOrder/sb/getPriceJumpPoint';
import { setPrice, setQueryPrice } from '../../../../../store/goOrderSB/action';
const PriceBox = () => {
    const touch = useSelector(store => store.goOrderSB.touch);
    const bs = useSelector(store => store.goOrderSB.bs);
    const quote = useSelector(store => store.goOrderSB.quote);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const queryPrice = useSelector(store => store.goOrderSB.queryPrice);
    const [val, setVal] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (queryPrice) {
            setVal(queryPrice);
            return;
        }
        if (productInfo.market != null && checkRealtimeMarket(productInfo.market) && !queryPrice) {
            setVal(quote.ls);
        } else {
            setVal(stockInfo['@refPrice']);
        }
    }, [quote, stockInfo, productInfo, queryPrice]);

    useEffect(() => {
        dispatch(setPrice(val));
    }, [val]);

    const plusHandler = useCallback((val, productInfo) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            const pt = getPriceJumpPoint(productInfo?.market, val, false);
            let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
            const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
            setVal(parseFloat(prevValue + pt).toFixed(tickPointLen));
        }
    });

    const minusHandler = useCallback((val, productInfo) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            const pt = getPriceJumpPoint(productInfo?.market, val, true);
            let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
            const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
            if (prevValue - pt <= 0) {
                setVal(parseFloat(pt).toFixed(tickPointLen));
            } else {
                setVal(parseFloat(prevValue - pt).toFixed(tickPointLen));
            }
        }
    });

    const changeHandler = useCallback(value => {
        setVal(value);
    });
    return (
        <ChangeNum
            title={touch ? '委託價' : '價格'}
            color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
            textAlign={'center'}
            inputWidth={'calc(100vw - 32px - 100px - 54px - 8px)'}
            style={{ width: '100vw' }}
            val={val}
            plusClickHandler={plusHandler.bind(null, val, productInfo)}
            minusClickHandler={minusHandler.bind(null, val, productInfo)}
            changeHandler={changeHandler}
        />
    );
};

export default PriceBox;

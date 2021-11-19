import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../../panel/PanelTabs';
import ChangeNum from '../../searchList/ChangeNum';
import { getPriceJumpPoint } from '../../../../../services/components/goOrder/sb/getPriceJumpPoint';
import { setTouchedPrice } from '../../../../../store/goOrderSB/action';
import { setModal } from '../../../../../store/components/layouts/action';
const TouchPriceBox = () => {
    const bs = useSelector(store => store.goOrderSB.bs);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const [val, setVal] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTouchedPrice(val));
    }, [val]);

    const changeHandler = useCallback(value => {
        setVal(value);
    });

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

    const iconClickHandler = () => {
        dispatch(
            setModal({
                visible: true,
                title: '美股觸價單規則',
                content: (
                    <div style={{ color: '#3f5372', fontSize: '1.6rem' }}>
                        <div>
                            1. 追價買進價格限制：委託價格 ≧ 觸發價格 ≧ 目前市場賣價(外盤價) ；開盤前委託時依昨收價
                        </div>
                        <div>
                            2. 追價賣出價格限制：委託價格 ≦ 觸發價格 ≦ 目前市場買價(內盤價) ；開盤前委託時依昨收價
                            （開盤前委託時依昨收價）以上價格條件若不符，委託單將被駁回。
                        </div>
                        <div>3. 長效單(GTC)若遭駁回，將永久失效，次日不再送出。</div>
                        <div>4. 因美股不同交易所掛牌報價資訊會有所不同，本系統觸發價格依交易上手資訊源為準。</div>
                    </div>
                ),
                type: 'info',
            }),
        );
    };
    return (
        <ChangeNum
            title={'觸發價'}
            color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
            conditionText={bs === 'B' ? '≥' : '≤'}
            textAlign={'center'}
            inputWidth={'calc(100vw - 32px - 100px - 54px - 14px)'}
            style={{ width: '100vw' }}
            val={val}
            changeHandler={changeHandler}
            plusClickHandler={plusHandler.bind(null, val, productInfo)}
            minusClickHandler={minusHandler.bind(null, val, productInfo)}
            showIcon={true}
            iconClickHandler={iconClickHandler}
        />
    );
};

export default TouchPriceBox;

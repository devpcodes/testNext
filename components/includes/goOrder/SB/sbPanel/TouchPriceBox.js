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
                title: '?????????????????????',
                content: (
                    <div style={{ color: '#3f5372', fontSize: '1.6rem' }}>
                        <div>
                            1. ??????????????????????????????????????? ??? ???????????? ??? ??????????????????(?????????) ?????????????????????????????????
                        </div>
                        <div>
                            2. ??????????????????????????????????????? ??? ???????????? ??? ??????????????????(?????????) ?????????????????????????????????
                            ??????????????????????????????????????????????????????????????????????????????????????????
                        </div>
                        <div>3. ?????????(GTC)??????????????????????????????????????????????????????</div>
                        <div>4. ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????</div>
                    </div>
                ),
                type: 'info',
            }),
        );
    };
    return (
        <ChangeNum
            title={'?????????'}
            color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
            conditionText={bs === 'B' ? '???' : '???'}
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

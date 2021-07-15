import { useCallback, useState, useEffect } from 'react';
import ChangeNum from '../../searchList/ChangeNum';
import { themeColor } from '../../panel/PanelTabs';
import { useSelector, useDispatch } from 'react-redux';
import { setQty } from '../../../../../store/goOrderSB/action';
const QtyBox = ({ label, color, parentVal }) => {
    const bs = useSelector(store => store.goOrderSB.bs);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const queryQty = useSelector(store => store.goOrderSB.queryQty);
    const [val, setVal] = useState('');
    const [disabledPlus, setDisabledPlus] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (queryQty && parentVal == null) {
            setVal(queryQty);
            return;
        }
        if (stockInfo['@LotSize'] != null && !queryQty && parentVal == null) {
            setVal(stockInfo['@LotSize']);
        }
    }, [stockInfo, queryQty, parentVal]);

    useEffect(() => {
        if (parentVal != null) {
            setVal(parentVal);
        }
    }, [parentVal]);

    useEffect(() => {
        if (parentVal != null) {
            if (val >= parentVal) {
                setDisabledPlus(true);
            } else {
                setDisabledPlus(false);
            }
        }
        dispatch(setQty(val));
    }, [val]);

    const changeHandler = useCallback(v => {
        setVal(v);
    });
    const plusHandler = useCallback((val, stockInfo, parentVal) => {
        if (parentVal != null) {
            if (Number(val) >= parentVal) {
                return;
            }
        }
        let newVal = Number(val) + Number(stockInfo['@LotSize']);
        setVal(newVal);
    });
    const minusHandler = useCallback((val, stockInfo) => {
        if (Number(val) - Number(stockInfo['@LotSize']) <= 0) {
            setVal(Number(stockInfo['@LotSize']));
        } else {
            let newVal = Number(val) - Number(stockInfo['@LotSize']);
            setVal(newVal);
        }
    });
    return (
        <ChangeNum
            title={label || '股數'}
            color={color == null ? (bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor) : color}
            textAlign={'center'}
            inputWidth={'calc(100vw - 32px - 100px - 54px - 8px)'}
            style={{ width: '100vw' }}
            changeHandler={changeHandler}
            val={val}
            plusClickHandler={plusHandler.bind(null, val, stockInfo, parentVal)}
            minusClickHandler={minusHandler.bind(null, val, stockInfo)}
            disabledPlus={disabledPlus}
        />
    );
};

export default QtyBox;

import { useCallback, useState, useEffect } from 'react';
import ChangeNum from '../../searchList/ChangeNum';
import { themeColor } from '../../panel/PanelTabs';
import { useSelector, useDispatch } from 'react-redux';
import { setQty } from '../../../../../store/goOrderSB/action';
const QtyBox = () => {
    const bs = useSelector(store => store.goOrderSB.bs);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const [val, setVal] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (stockInfo['@LotSize'] != null) {
            setVal(stockInfo['@LotSize']);
        }
    }, [stockInfo]);

    useEffect(() => {
        dispatch(setQty(val));
    }, [val]);

    const changeHandler = useCallback(v => {
        setVal(v);
    });
    const plusHandler = useCallback((val, stockInfo) => {
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
            title={'股數'}
            color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
            textAlign={'center'}
            inputWidth={'calc(100vw - 32px - 100px - 54px - 8px)'}
            style={{ width: '100vw' }}
            changeHandler={changeHandler}
            val={val}
            plusClickHandler={plusHandler.bind(null, val, stockInfo)}
            minusClickHandler={minusHandler.bind(null, val, stockInfo)}
        />
    );
};

export default QtyBox;

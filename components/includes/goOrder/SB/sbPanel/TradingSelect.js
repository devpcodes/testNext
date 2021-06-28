import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderSelect from './OrderSelect';
import { themeColor } from '../../panel/PanelTabs';
import ChangeNum from '../../searchList/ChangeNum';
import SubmitBtn from './SubmitBtn';
import SwitchBox from './SwitchBox';
import { setTouch } from '../../../../../store/goOrderSB/action';
import PriceBox from './PriceBox';
import QtyBox from './QtyBox';
import TouchPriceBox from './TouchPriceBox';

const TradingSelect = () => {
    const dispatch = useDispatch();
    const bs = useSelector(store => store.goOrderSB.bs);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const touch = useSelector(store => store.goOrderSB.touch);
    const [priceTypeDisabled, setPriceTypeDisabled] = useState(false);
    const [showTouchPriceInput, setShowTouchPriceInput] = useState(false);
    const [showGTCDate, setShowGTCDate] = useState(true);
    const [touchPriceOpt, setTouchPriceOpt] = useState([
        { txt: '限價單', val: 0 },
        { txt: '觸價單', val: 1 },
    ]);
    const [priceTypeOpt, setPriceTypeOpt] = useState([
        { txt: '可部份成交', val: 'ANY' },
        { txt: '限完全成交', val: 'AON' },
    ]);

    useEffect(() => {
        if (productInfo.market != null) {
            optHandler(productInfo.market);
            priceTypeDisabledHandler(productInfo.market);
            showGTCDateHandler(productInfo.market);
        }
    }, [productInfo]);

    useEffect(() => {
        if (touch) {
            setShowTouchPriceInput(true);
        } else {
            setShowTouchPriceInput(false);
        }
    }, [touch]);

    const changeTouchPrice = useCallback(val => {
        dispatch(setTouch(val));
    });

    const optHandler = market => {
        if (market === 'US') {
            setTouchPriceOpt([
                { txt: '限價單', val: 0 },
                { txt: '觸價單', val: 1 },
            ]);
        } else {
            setTouchPriceOpt([{ txt: '限價單', val: 0 }]);
            dispatch(setTouch(0));
        }
    };

    const priceTypeDisabledHandler = market => {
        if (market === 'US') {
            setPriceTypeDisabled(false);
        } else {
            setPriceTypeDisabled(true);
        }
    };

    const showGTCDateHandler = market => {
        if (market === 'US') {
            setShowGTCDate(true);
        } else {
            setShowGTCDate(false);
        }
    };

    const textHandler = useCallback((touch, bs) => {
        if (touch) {
            return `追價${bs === 'B' ? '買進' : '賣出'}`;
        } else {
            return `委託${bs === 'B' ? '買進' : '賣出'}`;
        }
    });
    return (
        <div className="tradingSelect__container">
            <div className="trading__box">
                <div className="select__container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* calc((100vw - 32px - 16px) / 2); */}
                    <OrderSelect
                        style={{ display: 'inline-block', marginRight: '4px', textAlign: 'center' }}
                        width="calc((100vw - 7px - 32px) / 2)"
                        height="44px"
                        defaultValue={touch || 0}
                        value={touch}
                        color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                        data={touchPriceOpt}
                        arrowLeft="-32px"
                        onChange={changeTouchPrice}
                    />
                    <OrderSelect
                        style={{ display: 'inline-block', marginLeft: '4px', textAlign: 'center' }}
                        width="calc((100vw - 7px - 32px) / 2)"
                        height="44px"
                        value="ANY"
                        color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                        data={priceTypeOpt}
                        arrowLeft="-9px"
                        disabled={priceTypeDisabled}
                    />
                </div>
                {showTouchPriceInput && (
                    <TouchPriceBox />
                    // <ChangeNum
                    //     title={'觸發價'}
                    //     color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    //     conditionText={bs === 'B' ? '≥' : '≤'}
                    //     textAlign={'center'}
                    //     inputWidth={'calc(100vw - 32px - 100px - 54px - 8px)'}
                    //     style={{ width: '100vw' }}
                    // />
                )}
                <PriceBox />
                <QtyBox />
                {showGTCDate && <SwitchBox color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor} />}
            </div>

            <SubmitBtn text={textHandler(touch, bs)} />

            <style jsx>{`
                .selector__container {
                    display: flex;
                    justify-content: space-between;
                }
                .tradingSelect__container {
                    /* padding-left: 16px;
                    padding-right: 16px; */
                }
                .trading__box {
                    height: 230px;
                    overflow: auto;
                    padding-left: 16px;
                    padding-right: 16px;
                    overflow-x: hidden;
                }
            `}</style>
        </div>
    );
};

export default TradingSelect;

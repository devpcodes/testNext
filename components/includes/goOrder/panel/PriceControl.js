import { useState, useEffect, useRef, useMemo } from 'react';
import { Select, Input, Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import selectIcon from '../../../../resources/images/components/goOrder/arrow-chevron-down_black.png';
import { themeColor } from './PanelTabs';
import { checkServer } from '../../../../services/checkServer';
import { formatPrice, formatPriceByUnit } from '../../../../services/numFormat';
import { getStockPriceRange, getStockType } from '../../../../services/stockTickType';
import { setPriceType, setOrdQty, setOrderPrice, setDefaultOrdPrice } from '../../../../store/goOrder/action';
import infoIcon from '../../../../resources/images/components/goOrder/attention-info-circle.svg';

const { Option } = Select;

var remeberLot = '';
var remeberCode = '';
var setPrice = false;
var init = false;
const PriceControl = ({ title }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const bs = useSelector(store => store.goOrder.bs);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const ordType = useSelector(store => store.goOrder.ord_type);
    const solaceData = useSelector(store => store.solace.solaceData);
    const priceType = useSelector(store => store.goOrder.price_type);
    const ordQty = useSelector(store => store.goOrder.ord_qty);
    const ordPrice = useSelector(store => store.goOrder.ord_price);
    const checkLot = useSelector(store => store.goOrder.checkLot);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const defaultOrdPrice = useSelector(store => store.goOrder.defaultOrdPrice);

    // const [ordPrice, setOrderPrice] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [priceTypeOption, setPriceTypeOption] = useState([
        { txt: '限價', val: ' ' },
        { txt: '市價', val: '4' },
        { txt: '漲停', val: '2' },
        { txt: '跌停', val: '3' },
        { txt: '平盤', val: '1' },
    ]);
    useEffect(() => {
        document.body.addEventListener('click', bodyClickHandler);
        return () => {
            document.body.removeEventListener('click', bodyClickHandler);
        };
    }, []);
    useEffect(() => {
        // 整零切換先清空價格
        // console.log(code, lot, solaceData.topic, 'cc:', currentLot.current);
        if (defaultOrdPrice !== '') {
            setTimeout(() => {
                dispatch(setOrderPrice(defaultOrdPrice));
                dispatch(setDefaultOrdPrice(''));
                remeberLot = lot;
                remeberCode = code;

                setPrice = true;
            }, 500);

            return;
        }

        if (lot !== remeberLot || code !== remeberCode) {
            setPrice = false;
            dispatch(setDefaultOrdPrice(''));
            dispatch(setOrderPrice(''));
        }

        remeberLot = lot;
        remeberCode = code;

        setPriceHandler();
        setPriceTypeOptionHandler(lot, priceType, productInfo);
    }, [code, lot, solaceData, defaultOrdPrice, productInfo]);

    useEffect(() => {
        if (router.query.qty == null && init) {
            dispatch(setOrdQty('1'));
        } else {
            init = true;
        }
    }, [lot, code, router]);

    const getUnit = () => {
        if (solaceData.length > 0 && solaceData[0].data.Unit != null) {
            return solaceData[0].data.Unit;
        }
    };

    const bodyClickHandler = () => {
        setShowTooltip(false);
    };

    const setPriceTypeOptionHandler = (lot, priceType, productInfo) => {
        if (productInfo != null && productInfo.solaceMarket != null && productInfo.solaceMarket === '興櫃') {
            dispatch(setPriceType(' '));
            setPriceTypeOption([{ txt: '限價', val: ' ' }]);
            return;
        }
        if (lot === 'Odd') {
            if (priceType === '4') {
                dispatch(setPriceType(' '));
            }

            setPriceTypeOption([
                { txt: '限價', val: ' ' },
                { txt: '漲停', val: '2' },
                { txt: '跌停', val: '3' },
                { txt: '平盤', val: '1' },
            ]);
        } else {
            setPriceTypeOption([
                { txt: '限價', val: ' ' },
                { txt: '市價', val: '4' },
                { txt: '漲停', val: '2' },
                { txt: '跌停', val: '3' },
                { txt: '平盤', val: '1' },
            ]);
        }
    };

    const setPriceHandler = () => {
        if (setPrice) return;
        if (lot === 'Odd' && checkLot) {
            if (code !== '' && solaceData.length > 0 && solaceData[0].data.OddlotOpen != null) {
                if (solaceData[0].topic.indexOf(code) >= 0 && solaceData[0].topic.indexOf('ODDLT')) {
                    if (!isNaN(Number(ordPrice))) {
                        if (Number(solaceData[0].data.OddlotClose) == 0) {
                            dispatch(setOrderPrice(''));
                        } else {
                            dispatch(setOrderPrice(formatPriceByUnit(code, solaceData[0].data.OddlotClose)));
                            setPrice = true;
                        }
                    }
                }
            }
        } else {
            if (code !== '' && solaceData.length > 0 && Array.isArray(solaceData[0].data.Close)) {
                if (solaceData[0].topic.indexOf(code) >= 0) {
                    if (!isNaN(Number(ordPrice))) {
                        if (Number(solaceData[0].data.Close[0]) == 0) {
                            dispatch(setOrderPrice(''));
                        } else {
                            dispatch(setOrderPrice(formatPriceByUnit(code, solaceData[0].data.Close[0])));
                            setPrice = true;
                        }
                    }
                }
            }
        }
    };

    const priceChangeHandler = e => {
        var regex;
        if (title === '張數' || title === '股數') {
            regex = /^[0-9/]*$/;
        } else {
            regex = /^[0-9/.]*$/;
        }

        if (!regex.test(e.target.value)) {
            return;
        }
        if (title === '張數' || title === '股數') {
            dispatch(setOrdQty(e.target.value));
        } else {
            dispatch(setOrderPrice(e.target.value));
            setPrice = true;
        }
    };

    const onClickHandler = symbol => {
        const type = getStockType(code).type;
        if (title === '限價') {
            if (ordPrice === '') return;
            let unit;
            if (symbol === '+') {
                if (isNaN(Number(ordPrice))) {
                    dispatch(setOrderPrice(''));
                    return;
                }
                unit = getStockPriceRange(type, ordPrice, true);
                dispatch(setOrderPrice(formatPriceByUnit(code, parseFloat(ordPrice) + unit)));
            } else {
                if (isNaN(Number(ordPrice))) {
                    dispatch(setOrderPrice(''));
                    return;
                }
                unit = getStockPriceRange(type, ordPrice, true);
                if (parseFloat(ordPrice) - unit <= unit) {
                    dispatch(setOrderPrice(formatPriceByUnit(code, unit)));
                } else {
                    dispatch(setOrderPrice(formatPriceByUnit(code, parseFloat(ordPrice) - unit)));
                }
            }
        } else {
            let unit = 1;
            if (symbol === '+') {
                dispatch(setOrdQty(Number(ordQty) + unit));
            } else {
                if (ordQty - unit === 0) {
                    dispatch(setOrdQty(Number(ordQty)));
                } else {
                    dispatch(setOrdQty(Number(ordQty) - unit));
                }
            }
        }
    };

    const priceTypeHandler = value => {
        dispatch(setPriceType(value));
    };

    const getPriceValHandler = () => {
        if (ordType === 'P') {
            return '定價';
        }
        if (priceType === ' ') {
            return ordPrice;
        } else {
            const inpVal = priceTypeOption.filter(item => {
                return item.val === priceType;
            });
            return inpVal[0].txt;
        }
    };

    const focusHandler = () => {
        if (title === '限價') {
            if (priceType !== ' ') {
                dispatch(setPriceType(' '));
            }
        }
    };

    const tooltipClickHandler = e => {
        e.stopPropagation();
        if (!showTooltip) {
            setShowTooltip(true);
        }
    };

    const typeHandler = val => {
        if (isNaN(Number(val))) {
            return 'text';
        } else {
            return 'number';
        }
    };

    return (
        <div className="price_control">
            <div className="select__box">
                {title === '限價' && ordType !== 'P' ? (
                    <Select value={priceType} suffixIcon={<img src={selectIcon} />} onChange={priceTypeHandler}>
                        {priceTypeOption.map((item, index) => {
                            return (
                                <Option key={index} value={item.val}>
                                    {item.txt}
                                </Option>
                            );
                        })}
                    </Select>
                ) : (
                    <div className="select__label">
                        {title === '限價' ? '價格' : title}
                        {title !== '限價' && lot !== 'Odd' ? (
                            <Tooltip
                                color="white"
                                arrowPointAtCenter={true}
                                placement="topLeft"
                                title={'1單位=' + getUnit() + '股'}
                                visible={showTooltip}
                            >
                                <img
                                    style={{
                                        marginLeft: '5px',
                                        marginTop: '-2px',
                                    }}
                                    src={infoIcon}
                                    onClick={tooltipClickHandler}
                                />
                            </Tooltip>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </div>
            <div className="input__box">
                <Input
                    disabled={title === '限價' && ordType === 'P'}
                    value={title === '限價' ? getPriceValHandler() : ordQty}
                    onChange={priceChangeHandler}
                    onFocus={focusHandler}
                    type={title === '限價' ? typeHandler(getPriceValHandler()) : typeHandler(ordQty)}
                />
            </div>
            <div className="btn__box">
                <Button
                    disabled={(title === '限價' && priceType !== ' ') || (title === '限價' && ordType === 'P')}
                    onClick={onClickHandler.bind(null, '-')}
                >
                    -
                </Button>
                <Button
                    disabled={(title === '限價' && priceType !== ' ') || (title === '限價' && ordType === 'P')}
                    onClick={onClickHandler.bind(null, '+')}
                    style={{ marginLeft: '8px' }}
                >
                    +
                </Button>
            </div>
            <style jsx>{``}</style>
            <style global jsx>{`
                .ant-tooltip-inner {
                    color: black;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                    /* height: 56px; */
                    font-weight: bold;
                }
                .tooltip__val {
                    font-weight: bold;
                    margin-left: 5px;
                    color: black;
                }
                .select__label {
                    width: 62px;
                    font-size: 1.6rem;
                    color: #0d1623;
                    margin-top: 4px;
                }
                .price_control {
                    margin-top: 8px;
                    height: 46px;
                }
                .select__box {
                    display: inline-block;
                    height: 46px;
                    vertical-align: top;
                    padding-top: 7px;
                }
                .input__box {
                    display: inline-block;
                    width: calc(100vw - 32px - 100px - 54px - 8px);
                    /* width: calc(100vw - 160px); */
                }
                .btn__box {
                    width: 100px;
                    text-align: right;
                    vertical-align: top;
                }
                .price_control .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    /* width: calc((100vw - 100px) / 4); */
                    height: 40px;
                    background: white;
                    border: none;
                    padding: 0;
                }
                .price_control .ant-select {
                    margin-right: 8px;
                    width: 54px;
                }
                .price_control .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .price_control
                    .ant-select-focused.ant-select-single:not(.ant-select-customize-input)
                    .ant-select-selector {
                    box-shadow: none;
                }
                .price_control .ant-input:placeholder-shown {
                    height: 45px;
                    /* width: 80%; */
                }
                .price_control .ant-select-arrow {
                    top: 24%;
                    right: 7px;
                }
                .price_control .ant-btn {
                    display: inline-block;
                    height: 46px;
                    border: none;
                    background: ${bs == 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    color: white;
                    width: 46px;
                    font-size: 3.6rem;
                    line-height: 0;
                }
                .btn__box {
                    display: inline-block;
                }
                .btn__box .ant-btn {
                    display: inline-block;
                }
                .price_control .ant-btn > span {
                    margin-left: -2px;
                }
                .price_control .ant-input-focused,
                .ant-input:focus {
                    /* box-shadow: none; */
                }
                .price_control .ant-input {
                    height: 46px;
                    font-size: 2.6rem;
                    color: black;
                }
                .price_control .ant-input:hover {
                    border-color: #dedede;
                }

                .price_control .ant-btn[disabled] {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
                .price_control .ant-btn[disabled],
                .ant-btn[disabled]:active {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
                .price_control .ant-btn[disabled],
                .ant-btn[disabled]:active,
                .ant-btn[disabled]:focus,
                .ant-btn[disabled]:hover {
                    background-color: #d2d2d2;
                    color: #ffffff;
                }
            `}</style>
        </div>
    );
};
// function arePropsEqual(prevProps, nextProps) {
//     console.log('==========render============');
//     return true;
// }
export default PriceControl;

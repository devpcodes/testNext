import { useState, useEffect, useRef } from 'react';
import { Select, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import selectIcon from '../../../../resources/images/components/goOrder/arrow-chevron-down_black.png';
import { themeColor } from './PanelTabs';
import { checkServer } from '../../../../services/checkServer';
import { formatPrice } from '../../../../services/numFormat';
import { getStockPriceRange, getStockType } from '../../../../services/stockTickType';

const { Option } = Select;
const PriceControl = ({ title }) => {
    const currentCode = useRef('');
    const currentLot = useRef('');

    const bs = useSelector(store => store.goOrder.bs);
    const code = useSelector(store => store.goOrder.code);
    const lot = useSelector(store => store.goOrder.lot);
    const solaceData = useSelector(store => store.solace.solaceData);
    const [ordPrice, setOrderPrice] = useState('');
    const [priceTypeOption, setPriceTypeOption] = useState([
        { txt: '限價', val: ' ' },
        { txt: '市價', val: '4' },
        { txt: '漲停', val: '2' },
        { txt: '跌停', val: '3' },
        { txt: '平盤', val: '1' },
    ]);
    useEffect(() => {
        // 整零切換先清空價格
        if (lot !== currentLot.current) {
            setOrderPrice('');
        }
        if (code === currentCode.current && lot === currentLot.current) {
            return;
        }

        setPriceHandler();
    }, [code, lot, solaceData]);

    const setPriceHandler = () => {
        if (lot === 'Odd') {
            if (code !== '' && !checkServer() && solaceData.length > 0 && solaceData[0].data.OddlotClose != null) {
                if (solaceData[0].topic.indexOf(code) >= 0 && solaceData[0].topic.indexOf('ODDLT')) {
                    currentCode.current = code;
                    currentLot.current = lot;
                    setOrderPrice(formatPrice(solaceData[0].data.OddlotClose));
                }
            }
        } else {
            if (code !== '' && !checkServer() && solaceData.length > 0 && Array.isArray(solaceData[0].data.Close)) {
                if (solaceData[0].topic.indexOf(code) >= 0) {
                    currentCode.current = code;
                    currentLot.current = lot;
                    setOrderPrice(formatPrice(solaceData[0].data.Close[0]));
                }
            }
        }
    };

    const priceChangeHandler = e => {
        setOrderPrice(e.target.value);
    };

    const onClickHandler = symbol => {
        const type = getStockType(code).type;
        let unit;
        if (symbol === '+') {
            unit = getStockPriceRange(type, ordPrice, true);
            setOrderPrice(formatPrice(parseFloat(ordPrice) + unit));
        } else {
            unit = getStockPriceRange(type, ordPrice, true);
            if (parseFloat(ordPrice) - unit <= unit) {
                setOrderPrice(formatPrice(unit));
            } else {
                setOrderPrice(formatPrice(parseFloat(ordPrice) - unit));
            }
        }
    };
    return (
        <div className="price_control">
            <div className="select__box">
                {title === '限價' ? (
                    <Select value=" " suffixIcon={<img src={selectIcon} />}>
                        {priceTypeOption.map((item, index) => {
                            return (
                                <Option key={index} value={item.val}>
                                    {item.txt}
                                </Option>
                            );
                        })}
                    </Select>
                ) : (
                    <div className="select__label">{title}</div>
                )}
            </div>
            <div className="input__box">
                <Input value={title === '限價' ? ordPrice : ''} onChange={priceChangeHandler} />
            </div>
            <div className="btn__box">
                <Button onClick={onClickHandler.bind(null, '-')}>-</Button>
                <Button onClick={onClickHandler.bind(null, '+')} style={{ marginLeft: '8px' }}>
                    +
                </Button>
            </div>
            <style jsx>{``}</style>
            <style global jsx>{`
                .select__label {
                    width: 62px;
                    font-size: 1.6rem;
                    color: #0d1623;
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
                    box-shadow: none;
                }
                .price_control .ant-input {
                    height: 46px;
                    font-size: 2.6rem;
                    color: black;
                }
                .price_control .ant-input:hover {
                    border-color: #dedede;
                }
            `}</style>
        </div>
    );
};

export default PriceControl;

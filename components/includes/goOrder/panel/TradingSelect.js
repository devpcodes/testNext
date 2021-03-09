import { useEffect, useState } from 'react';
import { Select } from 'antd';
import selectIcon from '../../../../resources/images/components/goOrder/arrow-selectdown.png';

import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from './PanelTabs';
import { setOrdType, setLot, setTradeTime, setTimeInForce, setOrdCount } from '../../../../store/goOrder/action';

const { Option } = Select;
const TradingSelect = () => {
    const dispatch = useDispatch();
    const bs = useSelector(store => store.goOrder.bs);
    const lot = useSelector(store => store.goOrder.lot);
    const tradeTime = useSelector(store => store.goOrder.tradeTime);
    const timeInForce = useSelector(store => store.goOrder.time_in_force);
    const ordCound = useSelector(store => store.goOrder.ord_cond);

    const [ordCoundOption, setOrdCoundOption] = useState([
        { txt: '現股', val: '0' },
        { txt: '融資', val: '3' },
        { txt: '融券', val: '4' },
    ]);
    useEffect(() => {
        if (lot === 'Board' && tradeTime === 'ing') {
            dispatch(setOrdType('0'));
        }
        if (lot === 'Board' && tradeTime === 'after') {
            dispatch(setOrdType('P'));
        }
        if (lot === 'Odd' && tradeTime === 'ing') {
            dispatch(setOrdType('C'));
        }
        if (lot === 'Odd' && tradeTime === 'after') {
            dispatch(setOrdType('2'));
        }

        updateOrdCound(lot);
    }, [lot, tradeTime]);

    const lotChange = value => {
        dispatch(setLot(value));
    };
    const tradeTimeChange = value => {
        dispatch(setTradeTime(value));
    };
    const timeInForceChange = value => {
        dispatch(setTimeInForce(value));
    };
    const ordCoundChange = value => {
        dispatch(setOrdCount(value));
    };
    const updateOrdCound = lot => {
        // 零股交易只有現股
        if (lot === 'Odd') {
            setOrdCoundOption([{ txt: '現股', val: '0' }]);
            dispatch(setOrdCount('0'));
        } else {
            setOrdCoundOption([
                { txt: '現股', val: '0' },
                { txt: '融資', val: '3' },
                { txt: '融券', val: '4' },
            ]);
        }
    };
    return (
        <div className="select__container">
            <div className="selectBox">
                <Select value={lot} suffixIcon={<img src={selectIcon} />} onChange={lotChange}>
                    <Option value="Board">整股</Option>
                    <Option value="Odd">零股</Option>
                </Select>
            </div>
            <div className="selectBox">
                <Select value={tradeTime} suffixIcon={<img src={selectIcon} />} onChange={tradeTimeChange}>
                    <Option value="ing">盤中</Option>
                    <Option value="after">盤後</Option>
                </Select>
            </div>
            <div className="selectBox">
                <Select value={ordCound} suffixIcon={<img src={selectIcon} />} onChange={ordCoundChange}>
                    {ordCoundOption.map((item, index) => {
                        return (
                            <Option key={index} value={item.val}>
                                {item.txt}
                            </Option>
                        );
                    })}
                </Select>
            </div>
            <div className="selectBox">
                <Select value={timeInForce} suffixIcon={<img src={selectIcon} />} onChange={timeInForceChange}>
                    <Option value="0">ROD</Option>
                    <Option value="3">IOC</Option>
                    <Option value="4">FOK</Option>
                </Select>
            </div>
            <style jsx>{`
                .selectBox {
                    display: inline-block;
                }
                .selectBox:not(:first-child) {
                    margin-left: 8px;
                }
            `}</style>
            <style global jsx>{`
                .select__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    width: calc((100vw - 32px - 24px) / 4);
                    height: 40px;
                    background: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    border: none;
                }
                .select__container .ant-select-single .ant-select-selector .ant-select-selection-item,
                .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: 40px;
                    color: #ffffff;
                    letter-spacing: 1px;
                    font-size: 1.6rem;
                }
                .select__container .ant-select-arrow {
                    top: 38%;
                    right: 11px;
                }
                .select__container .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
                .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
                    padding-right: 0;
                }
            `}</style>
        </div>
    );
};
//#f45a4c
export default TradingSelect;

import { useEffect, useCallback } from 'react';
import moment from 'moment';
import { Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import DateSelectBox from './DateSelectBox';
import { setGtc, setGtcDate } from '../../../../../store/goOrderSB/action';
const SwitchBox = ({ color }) => {
    // const [checked, setChecked] = useState(false);
    const gtc = useSelector(store => store.goOrderSB.gtc);
    const gtcDate = useSelector(store => store.goOrderSB.gtcDate);
    const touch = useSelector(store => store.goOrderSB.touch);
    const bs = useSelector(store => store.goOrderSB.bs);
    const price = useSelector(store => store.goOrderSB.price);
    const TouchedPrice = useSelector(store => store.goOrderSB.TouchedPrice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!gtc) {
            dispatch(setGtcDate(''));
        }
    }, [gtc]);

    const switchChangeHandler = val => {
        dispatch(setGtc(val));
    };
    const infoHandler = useCallback((touch, bs, price, TouchedPrice) => {
        if (touch && TouchedPrice) {
            return `當金額${bs === 'B' ? '≥' : '≤'}${TouchedPrice}時以${price}委託${bs === 'B' ? '買進' : '賣出'}`;
        } else {
            return '';
        }
    });
    const dateChangeHandler = useCallback(date => {
        dispatch(setGtcDate(date));
    });
    const getMaxDate = useCallback(() => {
        const newDate = moment().add(6, 'months').format('YYYY/MM/DD');
        return new Date(newDate);
    });
    return (
        <div className="firstSell__box">
            <span className="text">長效單</span>
            <Switch checked={gtc} size="small" onChange={switchChangeHandler} />
            <span className="info"> {infoHandler(touch, bs, price, TouchedPrice)}</span>
            {gtc && (
                <div className="date__box">
                    <span className="text date__text">長效單截止日</span>
                    <DateSelectBox
                        style={{ display: 'inline-block' }}
                        width={'calc(100vw - 140px)'}
                        selected={gtcDate}
                        onChange={dateChangeHandler}
                        popperPlacement="top-end"
                        maxDate={getMaxDate()}
                    />
                </div>
            )}
            <style jsx>{`
                .date__box {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                }
                .firstSell__box {
                    margin-top: 18px;
                    margin-bottom: 26px;
                    position: relative;
                }
                .firstSell__box .text {
                    color: #0d1623;
                }
                .info {
                    display: inline-block;
                    width: 140px;
                    font-size: 1.2rem;
                    position: absolute;
                    right: 0;
                    top: 0;
                    text-align: right;
                    color: #6c7b94;
                }
                .date__text {
                    line-height: 40px;
                }
            `}</style>
            <style global jsx>{`
                .info__item {
                    font-size: 1.5rem;
                    color: #a9b6cb;
                    padding: 0 4px 1px 5px;
                    border-radius: 2px;
                    border: solid 1px #e6ebf5;
                    margin-right: 5px;
                    font-weight: bold;
                }
                @media (max-width: 350px) {
                    .firstSell__box {
                        font-size: 1.1rem;
                    }
                }
                .firstSell__box .ant-switch-small {
                    width: 46px;
                    margin-left: 18px;
                    height: 25px;
                    background-color: #e6ebf5;
                }
                .firstSell__box .ant-switch-handle:before {
                    width: 19px;
                    height: 19px;
                    box-shadow: 0 2px 4px 0 rgba(169, 182, 203, 0.35);
                    background-color: #a9b6cb;
                    /* left: -8px; */
                }
                .firstSell__box .ant-switch-checked .ant-switch-handle:before {
                    left: -8px;
                    background-color: #fff;
                }
                .firstSell__box .ant-switch-checked {
                    background-color: ${color};
                }
            `}</style>
        </div>
    );
};
export default SwitchBox;

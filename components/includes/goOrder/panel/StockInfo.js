import { useState, useEffect, useCallback } from 'react';
import { Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { stockInfoFetcher } from '../../../../services/stock/stockInfoFetcher';
import { setIsFirstSell, setT30 } from '../../../../store/goOrder/action';

const StockInfo = () => {
    const dispatch = useDispatch();
    const [stockInfo, setStockInfo] = useState({});
    const code = useSelector(store => store.goOrder.code);
    const bs = useSelector(store => store.goOrder.bs);
    const lot = useSelector(store => store.goOrder.lot);
    const ordCound = useSelector(store => store.goOrder.ord_cond);
    const isFirstSell = useSelector(store => store.goOrder.is_first_sell);
    useEffect(() => {
        if (code !== '') {
            fetchInfo();
        }
    }, [code]);

    const fetchInfo = async () => {
        const res = await stockInfoFetcher(code);
        dispatch(setT30(res));
        setStockInfo(res);
    };

    const getInfoTag = useCallback(() => {
        if (typeof stockInfo === 'object' && Object.keys(stockInfo).length > 0) {
            return Object.keys(stockInfo).map((item, index) => {
                if (item === '平盤下可券賣' && stockInfo[item] == 1) {
                    return (
                        <span key={index} className="info__item">
                            盤下可空
                        </span>
                    );
                }
                if (item === '現股當沖註記' && stockInfo[item] == 'X') {
                    return (
                        <span key={index} className="info__item">
                            可先買賣
                        </span>
                    );
                }
                if (item === '現股當沖註記' && stockInfo[item] == 'Y') {
                    return (
                        <span key={index} className="info__item">
                            可先買
                        </span>
                    );
                }
                if (item === '現股當沖註記' && stockInfo[item] == '#') {
                    return (
                        <span key={index} className="info__item">
                            不可現沖
                        </span>
                    );
                }
            });
        }
    }, [stockInfo]);

    const switchChangeHandler = val => {
        console.log('vv', val);
        if (val) {
            dispatch(setIsFirstSell('Y'));
        } else {
            dispatch(setIsFirstSell('N'));
        }
    };

    return (
        <div className="info__container">
            <div className="info__box">{getInfoTag()}</div>
            {bs === 'S' && lot === 'Board' && ordCound == 0 && (
                <div className="firstSell__box">
                    <span>先賣</span>
                    <Switch checked={isFirstSell === 'Y' ? true : false} size="small" onChange={switchChangeHandler} />
                </div>
            )}
            <style jsx>{`
                .info__container {
                    margin-top: 11px;
                    margin-left: 62px;
                }
                .info__box {
                    display: inline-block;
                }
                .firstSell__box {
                    float: right;
                    display: inline-block;
                    width: 100px;
                    font-size: 1.6rem;
                    color: #0d1623;
                    text-align: right;
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
                    .info__item {
                        font-size: 1.1rem;
                    }
                }
                .info__container .ant-switch-small {
                    width: 46px;
                    margin-left: 14px;
                    height: 25px;
                    background-color: #e6ebf5;
                }
                .info__container .ant-switch-handle:before {
                    width: 19px;
                    height: 19px;
                    box-shadow: 0 2px 4px 0 rgba(169, 182, 203, 0.35);
                    background-color: #a9b6cb;
                    /* left: -8px; */
                }
                .info__container .ant-switch-checked .ant-switch-handle:before {
                    left: -8px;
                    background-color: #fff;
                }
                .info__container .ant-switch-checked {
                    background-color: #22a16f;
                }
            `}</style>
        </div>
    );
};

export default StockInfo;

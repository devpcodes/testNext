import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChangeNum from '../../../../goOrder/searchList/ChangeNum';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { Select, Switch, Button, message } from 'antd';
import moment from 'moment';
import { postStockInfo } from '../../../../../../services/components/goOrder/sb/postStockInfo';
import { getToken } from '../../../../../../services/user/accessToken';
import { setOrderList } from '../../../../../../store/subBrokerage/action';
import { fetchQuerySubBrokerageQuote } from '../../../../../../services/sb/querySubBrokerageQuote';
import { getPriceJumpPoint } from '../../../../../../services/components/goOrder/sb/getPriceJumpPoint';
import { getTransactionCost } from '../../../../../../services/components/goOrder/sb/getTransitionCost';
import { fetchSBEstimated } from '../../../../../../services/sb/querySBEstimated';
import { getTT } from '../../../../../../services/components/goOrder/sb/dataMapping';
import { getCookie } from '../../../../../../services/components/layouts/cookieController';
import { getWebId } from '../../../../../../services/components/goOrder/getWebId';
import { submitService } from '../../../../../../services/components/goOrder/sb/submitService';
import { setStockInfo } from '../../../../../../store/goOrderSB/action';
const OrderBoxBS = ({ type, orderData, product }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const orderList = useSelector(store => store.subBrokerage.orderList);
    //const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const [disabledPlus, setDisabledPlus] = useState(false);
    const [aon, setAon] = useState('ANY');
    const [bs, setBs] = useState('B');
    const [color, setColor] = useState(null);
    const [usSelect, setUsSelect] = useState(false);
    const [dateSelect, setDateSelect] = useState(false);
    const [toDay, setToDay] = useState([]);
    const [dataType, setDataType] = useState('p');
    const [date, setDate] = useState('');
    const [valPrice, setValPrice] = useState('');
    const [valNum, setValNum] = useState('');
    const [transactionCost, setTransactionCost] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [stockInfo, setStockInfo] = useState({});
    const [productInfo, setProductInfo] = useState('');
    const [orderBoxData, setOrderBoxData] = useState('');
    const dispatch = useDispatch();
    const { Option } = Select;
    const broker_id = useSelector(store => store.user.currentAccount.broker_id);
    const account = useSelector(store => store.user.currentAccount.account);

    useEffect(async () => {
        if (stockInfo['@StockID'] && valPrice && valNum) {
            let val = await fetchSBEstimated(
                stockInfo['@Exch'],
                bs,
                parseFloat(valPrice),
                parseFloat(valNum),
                broker_id,
                account,
            );
            // console.log('試算', valNum, valPrice, bs, stockInfo['@Currency'], val);
            setTransactionCost(val.amount);
        }
    }, [valNum, valPrice, bs, stockInfo]);

    useEffect(() => {
        setBs(type);
    }, [type]);

    useEffect(() => {
        setProductInfo(product);
    }, [product]);

    useEffect(() => {
        let d = moment(new Date()).format('YYYY-MM-DD');
        let d_ = moment(d).add(6, 'M').format('YYYY-MM-DD');
        setToDay([d, d_]);
        setDate(d_);
    }, []);

    // useEffect(() => {
    //     console.log('stockInfo', stockInfo);
    //     let pt = getPriceJumpPoint(stockInfo['@Exch'], val, true);
    //     setPriceJumpPoint(pt);
    // }, [stockInfo]);

    useEffect(() => {
        if (product.id) {
            console.log('[productInfo]', product);
            setDataType('p');
            queryStockQuote('p');
            queryStockInfo('p');
        }
    }, [product]);

    useEffect(() => {
        if (orderData.symbol) {
            setOrderBoxData(orderData);
            setDataType('o');
            queryStockQuote('o');
            queryStockInfo('o');
            // if (orderData.qty && orderData.qty !== '0') {
            //     console.log('QTY',orderData.qty)
            //     setValNum(orderData.qty);
            // }
        }
    }, [orderData]);

    const onDateChange = e => {
        setDate(e.target.value);
        console.log('date', e.target.value);
    };

    const onChange = useCallback(val => {
        console.log('date__', val);
        setDateSelect(val);
    });

    const handleChange = useCallback(val => {
        setAon(val);
    });

    const plusHandler = useCallback((val, stockInfo, type) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            if (type === 'qty') {
                // if (Number(val) >= parentVal) {
                //     return;
                // }
                let newVal = Number(val) + Number(stockInfo['@LotSize']);
                setValNum(newVal);
            } else {
                const pt = getPriceJumpPoint(stockInfo['@Exch'], val, false);
                let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
                const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
                setValPrice(parseFloat(prevValue + pt).toFixed(tickPointLen));
            }
        }
    });

    const minusHandler = useCallback((val, stockInfo, type) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            if (type === 'qty') {
                if (Number(val) - Number(stockInfo['@LotSize']) <= 0) {
                    setValNum(Number(stockInfo['@LotSize']));
                } else {
                    let newVal = Number(val) - Number(stockInfo['@LotSize']);
                    setValNum(newVal);
                }
            } else {
                const pt = getPriceJumpPoint(stockInfo['@Exch'], val, true);
                let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
                const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
                if (prevValue - pt <= 0) {
                    setValPrice(parseFloat(pt).toFixed(tickPointLen));
                } else {
                    setValPrice(parseFloat(prevValue - pt).toFixed(tickPointLen));
                }
            }
        }
    });

    const changeHandlerQty = useCallback(val => {
        setValNum(val);
    });

    const changeHandlerPrice = useCallback(val => {
        setValPrice(val);
    });

    const submitHandler = async () => {
        try {
            setSubmitLoading(true);
            let obj = {
                CID: getWebId('newweb', 'recommisiioned'),
                StockID: stockInfo['@symbol'],
                Price: valPrice,
                Qty: valNum,
                BS: bs,
                GTCDate: dateSelect ? date : '',
                aon: aon,
                Exchid: stockInfo['@Exch'],
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
            };
            let check = await dataCheck(obj);
            console.log('check', check);
            if (check) {
                const res = await submitService(obj);
                console.log('[submitHandler]', res);
                if (res.success == 'True') {
                    message.success({
                        content: '委託已送出',
                    });
                } else {
                    throw '委託未送出';
                }
            } else {
                message.error({
                    content: '資料不齊全',
                });
            }
            setSubmitLoading(false);
        } catch (error) {
            setSubmitLoading(false);
            message?.error({
                content: error,
            });
        }
    };
    const queryStockQuote = async type => {
        try {
            let token = getToken();
            let stock_list = {};
            let key = '';
            if (type === 'p') {
                stock_list = {
                    symbol: product.symbol,
                    exchange: product.market,
                };
                key = product.symbol + '.' + product.market;
            } else {
                stock_list = {
                    symbol: orderData.symbol,
                    exchange: orderData.market,
                };
                key = orderData.symbol + '.' + orderData.market;
            }
            console.log('stock_list', stock_list);
            let result = await fetchQuerySubBrokerageQuote([stock_list], token, true);
            console.log('queryStockQuote', result);
            if (!result[key]) {
                setValPrice('');
                setValNum('');
                setTransactionCost(null);
                throw '查無資料';
            }
            let price = result[key].refPrice || result[key].preClose || '';
            let num = result[key].lotSize || result[key].lotSize || '';
            setValPrice(price);
            // if(type=== 'p'){
            setValNum(num);
            // }
        } catch (error) {
            console.log(error);
        }
    };
    const queryStockInfo = async type => {
        try {
            let AID = currentAccount.broker_id + currentAccount.account;
            let token = getToken();
            let Exchid = '';
            let stockID = '';
            if (type === 'p') {
                Exchid = product.market;
                stockID = product.symbol;
            } else {
                Exchid = orderData.market;
                stockID = orderData.symbol;
            }
            let result = await postStockInfo({ AID, Exchid, stockID, token });
            let text = result['@StockID'];
            result['@symbol'] = text.substring(0, text.lastIndexOf('.'));
            console.log('stockInfo', result);
            setStockInfo(result);
        } catch (error) {
            console.log(error);
        }
    };
    const addLocal = async () => {
        //加入暫存夾
        try {
            console.log('dateSelect', dateSelect, dateSelect ? date : null);
            console.log('dateSelect2', stockInfo);
            let TT = getTT(setDataType == 'p' ? product.market : orderData.market);
            let pt = await getPriceJumpPoint(stockInfo['@Exch'], valPrice, true);
            let newData = {
                AID: currentAccount.broker_id + currentAccount.account,
                BS: bs,
                CID: getWebId('newweb', 'recommisiioned'),
                ClientIP: getCookie('client_ip'),
                Creator: currentAccount.idno,
                Exchid: stockInfo['@Exch'],
                OT: '0',
                Price: valPrice,
                PriceType: '0',
                Qty: valNum,
                StockID: stockInfo['@symbol'],
                TT: TT,
                GTCDate: dateSelect ? date : '',
                lotSize: stockInfo['@LotSize'],
                priceJumpPoint: pt,
                aon: aon,
                StockName: stockInfo['@StockName'],
            };
            console.log('newData', newData);
            let check = await dataCheck(newData);
            console.log('check', check);
            if (check) {
                let nd = orderList.concat(newData);
                dispatch(setOrderList(nd));
                message.success({
                    content: '已加入暫存夾',
                });
            } else {
                throw '資料不齊全';
            }
        } catch (error) {
            message.error({
                content: error,
            });
        }
    };

    const dataCheck = obj => {
        console.log('dataCheck', obj);
        if (obj.Price === '' || obj.Qty === '' || obj.StockID === '') {
            return false;
        }
        return true;
    };

    return (
        <div className="OrderBox_BS">
            <div className="ctrl_item">
                <ChangeNum
                    title={'價格'}
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    textAlign={'center'}
                    inputWidth={'calc(100% - 100px - 54px - 8px)'}
                    style={{ width: '100%' }}
                    val={valPrice}
                    plusClickHandler={plusHandler.bind(null, valPrice, stockInfo, 'price')}
                    minusClickHandler={minusHandler.bind(null, valPrice, stockInfo, 'price')}
                    changeHandler={changeHandlerPrice}
                />
            </div>
            <div className="ctrl_item">
                <ChangeNum
                    title={'股數'}
                    color={color == null ? (bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor) : color}
                    textAlign={'center'}
                    inputWidth={'calc(100% - 100px - 54px - 8px)'}
                    style={{ width: '100%' }}
                    changeHandler={changeHandlerQty}
                    val={valNum}
                    plusClickHandler={plusHandler.bind(null, valNum, stockInfo, 'qty')}
                    minusClickHandler={minusHandler.bind(null, valNum, stockInfo, 'qty')}
                    disabledPlus={disabledPlus}
                />
            </div>
            {stockInfo['@Exch'] == 'US' ? (
                <>
                    <div className="ctrl_item mt-8 ctrl_item_select">
                        <span>條件</span>
                        <Select defaultValue="ANY" style={{ width: 110 }} onChange={handleChange} size="large">
                            <Option value="ANY">ANY</Option>
                            <Option value="AON">AON</Option>
                        </Select>
                    </div>
                    <div className="ctrl_item mt-8">
                        <span>長效單</span>
                        <Switch onChange={onChange} />
                        {dateSelect ? (
                            <input type="date" onChange={onDateChange} min={toDay[0]} max={toDay[1]} value={date} />
                        ) : (
                            ''
                        )}
                    </div>
                </>
            ) : (
                ''
            )}

            <div className="ctrl_item mt-8 submit_box">
                <Button type="primary" size="large" onClick={submitHandler} loading={submitLoading}>
                    委託{bs == 'B' ? '買進' : '賣出'}
                </Button>
                <br></br>
                <Button size="large" onClick={addLocal}>
                    加入暫存夾
                </Button>
            </div>
            {transactionCost ? (
                <div className="text_view">
                    預估金額 {transactionCost}元({stockInfo['@CHCurrency']})
                </div>
            ) : (
                ''
            )}
            <style jsx>
                {`
                    input[type='date'] {
                        margin-left: 10px;
                    }
                    .symbo_text {
                        font-size: 14px;
                        line-height: 2;
                    }

                    .mt-8 {
                        margin-top: 8px;
                    }
                    .ctrl_item {
                        min-height: 46px;
                        padding: 0 25px;
                    }
                    .ctrl_item.submit_box {
                        margin-top: 90px;
                    }
                    .ctrl_item > span {
                        width: 62px;
                        display: inline-block;
                        font-size: 1.6rem;
                        color: #0d1623;
                    }
                    .text_view {
                        opacity: 0.7;
                        font-family: PingFangTC, Arial;
                        font-size: 16px;
                        font-weight: 900;
                        line-height: 2;
                        margin-top: 20px;
                        text-align: center;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .subBrokerage .price_control {
                        display: flex;
                        flex-wrap: nowrap;
                    }
                    .subBrokerage .price_control .btn__box-modal {
                        display: flex;
                        flex-wrap: nowrap;
                    }
                    .subBrokerage .OrderBox_BS .ant-switch-checked {
                        background-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    }
                    .subBrokerage .ctrl_item_select .ant-select-selector,
                    .subBrokerage
                        .ctrl_item_select
                        .ant-select-single:not(.ant-select-customize-input)
                        .ant-select-selector {
                        border-color: transparent;
                        background-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                        color: #fff;
                        border-color: transparent;
                    }
                    .subBrokerage .left_box_inner .ant-select-single .ant-select-arrow {
                        color: #fff;
                    }
                    .subBrokerage .left_box_inner .submit_box button {
                        width: 100%;
                        line-height: 50px;
                        height: 60px;
                        margin: 4px auto;
                    }
                    .subBrokerage .left_box_inner .submit_box .ant-btn-primary {
                        background-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                        border-color: ${bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    }
                `}
            </style>
        </div>
    );
};

export default OrderBoxBS;

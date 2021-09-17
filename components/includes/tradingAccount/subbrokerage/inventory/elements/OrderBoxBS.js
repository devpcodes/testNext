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
    const [date, setDate] = useState('');
    const [valPrice, setValPrice] = useState('');
    const [valNum, setValNum] = useState('');
    const [transactionCost, setTransactionCost] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [stockInfo, setStockInfo] = useState({});
    const [productInfo, setProductInfo] = useState('');
    const [priceJumpPoint, setPriceJumpPoint] = useState('');
    const [orderBoxData, setOrderBoxData] = useState('');
    const dispatch = useDispatch();
    const { Option } = Select;
    useEffect(() => {
        if (stockInfo['@StockID']) {
            let val = getTransactionCost(valNum, valPrice, bs, stockInfo['@Currency']);
            console.log('試算', valNum, valPrice, bs, stockInfo['@Currency'], val);
            setTransactionCost(val);
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
    }, []);

    // useEffect(() => {
    //     console.log('[orderList]', symbolList);
    // }, [symbolList]);

    useEffect(() => {
        console.log('stockInfo', stockInfo);
        setPriceJumpPoint(stockInfo['@LotSize']);
    }, [stockInfo]);

    useEffect(() => {
        if (product.id) {
            console.log('[productInfo]', product);
            queryStockQuote();
            queryStockInfo();
        }
    }, [product]);

    useEffect(() => {
        console.log('od', orderData);
        if (orderData) {
            setOrderBoxData(orderData);
        }
    }, [orderData]);

    const onDateChange = e => {
        //let d = e.target.value.replaceAll('-', '');
        setDate(e.target.value);
        console.log('date', e.target.value);
    };

    const onChange = useCallback(val => {
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
                const pt = getPriceJumpPoint(stockInfo?.market, val, false);
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
                const pt = getPriceJumpPoint(stockInfo?.market, val, true);
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

    const changeHandler = useCallback(value => {
        setVal(value);
    });

    const submitHandler = async () => {
        try {
            console.log('[submitHandler1]', date);
            setSubmitLoading(true);
            let obj = {
                CID: getWebId('newweb', 'recommisiioned'),
                StockID: product.symbol,
                Price: valPrice,
                Qty: valNum,
                BS: bs,
                GTCDate: dateSelect ? date : '',
                aon: aon,
                TouchedPrice: 0,
                Exchid: product.market,
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
            };
            console.log('[submitHandler]', obj);
            const res = await submitService(obj);
            console.log('[WT]', res);
            setSubmitLoading(false);
            message.success({
                content: '委託已送出',
            });
            //closeHandler();
            //dispatch(setSBActiveTabKey('3'));
        } catch (error) {
            setSubmitLoading(false);
            message.info({
                content: error,
            });
        }
    };
    const queryStockQuote = async () => {
        try {
            let token = getToken();
            let stock_list = {
                symbol: product.symbol,
                exchange: product.market,
            };
            let key = product.symbol + '.' + product.market;
            let result = await fetchQuerySubBrokerageQuote([stock_list], token, true);
            let price = result[key].refPrice || result[key].preClose || '';
            setValPrice(price);
            setValNum(1);
        } catch (error) {
            console.log(error);
        }
    };
    const queryStockInfo = async () => {
        try {
            let AID = currentAccount.broker_id + currentAccount.account;
            let token = getToken();
            let Exchid = product.market;
            let stockID = product.symbol;
            let result = await postStockInfo({ AID, Exchid, stockID, token });
            setStockInfo(result);
        } catch (error) {
            console.log(error);
        }
    };
    const addLocal = async () => {
        try {
            let test = {
                AID: '9A950000087',
                BS: 'B',
                CID: '11',
                ClientIP: '10.255.0.2',
                Creator: 'MCCAFIGAGI',
                Exchid: 'US',
                OT: '0',
                Price: 48.0,
                PriceType: '0',
                Qty: '1',
                StockID: 'AA',
                TT: '2',
                GTCDate: '',
                lotSize: '1',
                priceJumpPoint: 0.01,
                aon: 'ANY',
            };
            let TT = getTT(product.market);
            let newData = {
                AID: currentAccount.broker_id + currentAccount.account,
                BS: bs,
                CID: getWebId('newweb', 'recommisiioned'),
                ClientIP: getCookie('client_ip'),
                Creator: currentAccount.idno,
                Exchid: product.market,
                OT: '0',
                Price: valPrice, //valPrice,
                PriceType: '0',
                Qty: valNum,
                StockID: product.symbol,
                TT: TT,
                GTCDate: date,
                lotSize: priceJumpPoint,
                priceJumpPoint: 0.01,
                aon: aon,
            };
            let nd = orderList.concat(newData);
            //console.log('POSTDATA',newData)
            dispatch(setOrderList(nd));
        } catch (error) {
            console.log(error);
        }
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
                    changeHandler={changeHandler}
                />
            </div>
            <div className="ctrl_item">
                <ChangeNum
                    title={'股數'}
                    color={color == null ? (bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor) : color}
                    textAlign={'center'}
                    inputWidth={'calc(100% - 100px - 54px - 8px)'}
                    style={{ width: '100%' }}
                    changeHandler={changeHandler}
                    val={valNum}
                    plusClickHandler={plusHandler.bind(null, valNum, stockInfo, 'qty')}
                    minusClickHandler={minusHandler.bind(null, valNum, stockInfo, 'qty')}
                    disabledPlus={disabledPlus}
                />
            </div>
            {usSelect ? (
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
                        {dateSelect ? <input type="date" onChange={onDateChange} min={toDay[0]} max={toDay[1]} /> : ''}
                    </div>
                </>
            ) : (
                ''
            )}

            <div className="ctrl_item mt-8 submit_box">
                <Button type="primary" size="large" onClick={submitHandler}>
                    委託{bs == 'B' ? '買進' : '賣出'}
                </Button>
                <br></br>
                <Button size="large" onClick={addLocal}>
                    加入暫存夾
                </Button>
            </div>
            <div className="text_view">
                預估金額 {transactionCost}元({stockInfo['@CHCurrency']})
            </div>
            <div>{submitLoading ? 'Loading...' : ''}</div>
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

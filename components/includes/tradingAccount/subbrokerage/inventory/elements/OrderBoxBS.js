import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchAutoComplete from '../../../vipInventory/SearchAutoComplete';
import ChangeNum from '../../../../goOrder/searchList/ChangeNum';
import { themeColor } from '../../../../goOrder/panel/PanelTabs';
import { Select, Switch, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { postStockInfo } from '../../../../../../services/components/goOrder/sb/postStockInfo';
import { getToken } from '../../../../../../services/user/accessToken';
import { setOrderList } from '../../../../../../store/subBrokerage/action';
import { fetchQuerySubBrokerageQuote } from '../../../../../../services/sb/querySubBrokerageQuote';
import { getPriceJumpPoint } from '../../../../../../services/components/goOrder/sb/getPriceJumpPoint';
import { getTransactionCost } from '../../../../../../services/stock/transactionCost';
import { getTT } from '../../../../../../services/components/goOrder/sb/dataMapping';
import { getCookie } from '../../../../../../services/components/layouts/cookieController';
import { getWebId } from '../../../../../../services/components/goOrder/getWebId';
import { submitService } from '../../../../../../services/components/goOrder/sb/submitService';
import { setStockInfo } from '../../../../../../store/goOrderSB/action';
import { concat } from 'lodash';
const OrderBoxBS = ({ type, orderData }) => {
    const currentAccount = useSelector(store => store.user.currentAccount);
    const orderList = useSelector(store => store.subBrokerage.orderList);
    //const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const [disabledPlus, setDisabledPlus] = useState(false);
    const [aon, setAon] = useState('ANY');
    const [bs, setBs] = useState('B');
    const [color, setColor] = useState(null);
    const [usSelect, setUsSelect] = useState(false);
    const [dateSelect, setDateSelect] = useState(false);
    const selected = useRef(false);
    const selectSymbol = useRef('');
    const [date, setDate] = useState('');
    const [valPrice, setValPrice] = useState('');
    const [valNum, setValNum] = useState('');
    const [transactionCost, setTransactionCost] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [stockInfo, setStockInfo] = useState({});
    const [productInfo, setProductInfo] = useState({});
    const [priceJumpPoint, setPriceJumpPoint] = useState('');
    const [orderBoxData, setOrderBoxData] = useState('');
    const dispatch = useDispatch();
    const { Option } = Select;
    useEffect(() => {
        if(stockInfo['@StockID']){
            console.log('[getTransactionCost-]',valNum, valPrice, bs, stockInfo['@Currency']) 
        let val = getTransactionCost(valNum, valPrice, bs, stockInfo['@Currency'])
        console.log('[getTransactionCost]',val)
        setTransactionCost(val);            
        }
    }, [valNum, valPrice, bs, stockInfo]);

    useEffect(() => {
    setBs(type);
    }, [type]);

    useEffect(() => {
    console.log('[orderList]',orderList)
    }, [orderList]);

    useEffect(() => {
        console.log('stockInfo',stockInfo)
        setPriceJumpPoint(stockInfo['@LotSize'])
    }, [stockInfo]);
    
    useEffect(() => {
        console.log('[productInfo]',productInfo)
        if(inputVal!=''){
           queryStockQuote(); 
           queryStockInfo()
        }
    }, [productInfo]);

    useEffect(() => {
        console.log('od',orderData)
        if(orderData){
            setOrderBoxData(orderData)
        }
    }, [orderData]);

    const selectHandler = useCallback(async (val, option) => {
        try {
            let info = option.item
            if (info.market == 'US') {
                setUsSelect(true);
            } else {
                setUsSelect(false);
            }
            setInputVal(val);
            setProductInfo(info);
            console.log('[handler]', val, option);
        } catch (error) {
            console.log(error);
        }
    });

    const onDateChange = e => {
        //let d = e.target.value.replaceAll('-', '');
        setDate(e.target.value);
        console.log('date', e.target.value);
    };

    const onChangeHandler = useCallback(val => {
        console.log(val);
    });

    const selectedHandler = useCallback(bol => {
        selected.current = bol;
    });

    const handleChange = useCallback(val => {
        setAon(val);
    });

    const onChange = useCallback(val => {
        setDateSelect(val);
    });

    const plusHandler = useCallback((val, productInfo) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            const pt = getPriceJumpPoint(productInfo?.market, val, false);
            let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
            const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
            setVal(parseFloat(prevValue + pt).toFixed(tickPointLen));
        }
    });

    const minusHandler = useCallback((val, productInfo) => {
        if (isNaN(parseFloat(val))) {
            return;
        } else {
            const pt = getPriceJumpPoint(productInfo?.market, val, true);
            let tickPointLen = pt.toString().indexOf('.') > 0 ? pt.toString().split('.')[1].length : 0;
            const prevValue = parseFloat(parseFloat(val).toFixed(tickPointLen));
            if (prevValue - pt <= 0) {
                setVal(parseFloat(pt).toFixed(tickPointLen));
            } else {
                setVal(parseFloat(prevValue - pt).toFixed(tickPointLen));
            }
        }
    });

    const changeHandler = useCallback(value => {
        setVal(value);
    });
    
    const submitHandler = async () => {
        try {
            console.log('[submitHandler1]',date)
           setSubmitLoading(true);
           let obj = {
                CID: getWebId('newweb', 'recommisiioned'),
                StockID: productInfo.symbol,
                Price: valPrice,
                Qty: valNum,
                BS: bs,
                GTCDate: dateSelect?date:'',
                aon: aon,
                TouchedPrice: 0,
                Exchid: productInfo.market,
                Creator: currentAccount.idno,
                token: getToken(),
                currentAccount,
           }
           console.log('[submitHandler]',obj)
            const res = await submitService(obj);
            console.log('[WT]',res)
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
                symbol: productInfo.symbol,
                exchange: productInfo.market,
            };
            let key = productInfo.symbol+'.'+productInfo.market
            console.log('stock_list', stock_list);
            let result = await fetchQuerySubBrokerageQuote([stock_list], token, true);
            console.log('[queryStockQuote]', result[key]);
            let price = result[key].refPrice || result[key].preClose || ''
            setValPrice(price)
            setValNum(1)
        } catch (error) {
            console.log(error);
        }
    };
    const queryStockInfo = async () => {
        try {
            let AID = currentAccount.broker_id + currentAccount.account;
            let token = getToken();
            let Exchid = productInfo.market;
            let stockID = productInfo.symbol;
            let result = await postStockInfo({ AID, Exchid, stockID, token });
            setStockInfo(result)
            
            console.log('[queryStockInfo]', result);
        } catch (error) {
            console.log(error);
        }
    };
    const addLocal = async() => {
        try{
            // const res = await submitService({
            //     CID: getWebId('newweb', 'recommisiioned'),
            //     StockID: productInfo.symbol,
            //     Price: valPrice,
            //     Qty: valNum,
            //     BS: bs,
            //     GTCDate: date,
            //     aon: aon,
            //     TouchedPrice: 0,
            //     Exchid: productInfo.market,
            //     Creator: currentAccount.idno,
            //     token: getToken(),
            //     currentAccount,
            // });
            let test = {
                AID: "9A950000087",
                BS: "B",
                CID: "11",
                ClientIP: "10.255.0.2",
                Creator: "MCCAFIGAGI",
                Exchid: "US",
                OT: "0",
                Price: 48.00,
                PriceType: "0",
                Qty: '1',
                StockID: "AA",
                TT: "2",
                GTCDate: "",
                lotSize: "1",
                priceJumpPoint: 0.01,
                aon: "ANY",
            }
            let TT = getTT(productInfo.market)
            let newData = {
                AID: currentAccount.broker_id + currentAccount.account,
                BS: bs,
                CID: getWebId('newweb', 'recommisiioned'),
                ClientIP: getCookie('client_ip'),
                Creator: currentAccount.idno,
                Exchid: productInfo.market,
                OT: '0',
                Price: valPrice,//valPrice,
                PriceType: '0',
                Qty: valNum,
                StockID: productInfo.symbol,
                TT: TT,
                GTCDate: date,
                lotSize: priceJumpPoint,
                priceJumpPoint: 0.01,
                aon: aon       
            }
            let nd = orderList.concat(newData)
            //console.log('POSTDATA',newData)
            dispatch(setOrderList(nd));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="OrderBox_BS">
            <div className="ctrl_item for_search">
                <div className="search_box">
                    <SearchOutlined style={{ fontSize: '16px', color: '#333' }} />
                    <SearchAutoComplete
                        selectHandler={selectHandler}
                        onChange={onChangeHandler}
                        width={'100%'}
                        height={'40px'}
                        marketType={['SB']}
                        selectedHandler={selectedHandler}
                        placeholder={'股票代號／名稱'}
                    />
                </div>
             { /*  <div className="symbo_text">{{data:orderData}}</div>*/}
            </div>
            <div className="ctrl_item">
                <ChangeNum
                    title={'價格'}
                    color={bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor}
                    textAlign={'center'}
                    inputWidth={'calc(100% - 100px - 54px - 8px)'}
                    style={{ width: '100%' }}
                    val={valPrice}
                    plusClickHandler={plusHandler.bind(null, valPrice, productInfo)}
                    minusClickHandler={minusHandler.bind(null, valPrice, productInfo)}
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
                    plusClickHandler={plusHandler.bind(null, valNum, stockInfo)}
                    minusClickHandler={minusHandler.bind(null, valNum, stockInfo)}
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
                        {dateSelect ? <input type="date" onChange={onDateChange} /> : ''}
                    </div>
                </>
            ) : ('')}

            <div className="ctrl_item mt-8 submit_box">
                <Button type="primary" size="large" onClick={submitHandler}>
                    委託{bs=='B'?'買進':'賣出'}
                </Button>
                <br></br>
                <Button size="large" onClick={addLocal}>
                    加入暫存夾
                </Button>
            </div>
            <div className="text_view">預估金額 {transactionCost}元(台幣)</div>
            <div>
                {submitLoading?('Loading...'):('')}
            </div>
            <style jsx>
                {`
                    input[type='date'] {
                        margin-left: 10px;
                    }
                    .symbo_text {
                        font-size: 14px;
                        line-height: 2;
                    }
                    .for_search {
                        position: absolute;
                        top: 15px;
                        left: 0;
                        width: 100%;
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
                    .search_box {
                        display: flex;
                        align-items: center;
                        border: 1px solid #e6ebf5;
                        border-radius: 2px;
                        padding: 0 10px;
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
                    .subBrokerage .left_box_inner .search_box .autoComplete__container {
                        margin-left: 10px;
                    }
                    .subBrokerage .left_box_inner .search_box .ant-select-selector {
                        border: none !important;
                    }
                    .subBrokerage .left_box_inner .search_box .ant-select {
                        vertical-align: super;
                    }
                    .subBrokerage .left_box_inner .search_box .ant-select-selection-placeholder {
                        line-height: 40px;
                    }
                `}
            </style>
        </div>
    );
};

export default OrderBoxBS;

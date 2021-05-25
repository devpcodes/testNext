import { Button, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkServer } from '../../../../services/checkServer';
import { getWebId } from '../../../../services/components/goOrder/getWebId';
import { postOrder } from '../../../../services/components/goOrder/postOrder';
import { getCookie } from '../../../../services/components/layouts/cookieController';
import { formatNum } from '../../../../services/formatNum';
import { formatPrice } from '../../../../services/numFormat';
import { getTransactionCost } from '../../../../services/stock/transactionCost';
import { getToken } from '../../../../services/user/accessToken';
import { checkSignCA, sign } from '../../../../services/webCa';
import {
    setConfirmBoxOpen,
    setTransactionCost,
    setConfirmBoxTitle,
    setConfirmBoxColor,
    setResetData,
    setOrdQty,
    setLot,
    setOrdType,
    setTradeTime,
    setTimeInForce,
    setOrdCount,
    setPriceType,
    setDefaultOrdPrice,
    setActiveTabKey,
} from '../../../../store/goOrder/action';
import { themeColor } from './PanelTabs';

const SubmitBtn = () => {
    const dispatch = useDispatch();
    const code = useSelector(store => store.goOrder.code);
    const bs = useSelector(store => store.goOrder.bs);
    const lot = useSelector(store => store.goOrder.lot);
    const T30Data = useSelector(store => store.goOrder.T30Data);
    const ord_price = useSelector(store => store.goOrder.ord_price);
    const offerShare = useSelector(store => store.goOrder.ord_qty);
    const solaceData = useSelector(store => store.solace.solaceData);
    const ord_type = useSelector(store => store.goOrder.ord_type);
    const ord_cond = useSelector(store => store.goOrder.ord_cond);
    const tradeTime = useSelector(store => store.goOrder.tradeTime);
    const price_type = useSelector(store => store.goOrder.price_type);
    const transactionCost = useSelector(store => store.goOrder.transactionCost);
    const userSettings = useSelector(store => store.user.userSettings);

    const currentAccount = useSelector(store => store.user.currentAccount);
    const type = useSelector(store => store.goOrder.type);

    const ordCond = useSelector(store => store.goOrder.ord_cond);
    const timeInForce = useSelector(store => store.goOrder.time_in_force);
    const ordPrice = useSelector(store => store.goOrder.ord_price);
    const ordQty = useSelector(store => store.goOrder.ord_qty);
    const ordType = useSelector(store => store.goOrder.ord_type);
    const priceType = useSelector(store => store.goOrder.price_type);
    const stockId = useSelector(store => store.goOrder.code);
    const is_first_sell = useSelector(store => store.goOrder.is_first_sell);
    const resetData = useSelector(store => store.goOrder.resetData);
    const market = useSelector(store => store.goOrder.productInfo.solaceMarket);
    const [submitLoading, setSubmitLoading] = useState(false);
    useEffect(() => {
        let capitalPercent = T30Data['資成數'] == null ? 0 : T30Data['資成數'] / 10;
        let voucherPercent = T30Data['券成數'] == null ? 0 : T30Data['券成數'] / 10;
        let dealing = bs === 'B' ? 'BUY' : 'SELL';
        let unit;
        let reference;
        if (solaceData.length > 0 && solaceData[0].topic != null) {
            unit = solaceData[0].data.Unit || solaceData[0].data.OddlotUnit;
            reference = solaceData[0].data.Reference || solaceData[0].data.OddlotReference;
        }
        if ((ord_type === '2' || ord_type === 'C') && unit) {
            unit = unit / 1000;
        }
        let tradeType = getTradeType(ord_cond);
        const offerPrice = getOfferPrice(ord_price, reference, price_type);
        let cost = getTransactionCost(offerPrice, offerShare, unit, dealing, capitalPercent, voucherPercent, tradeType);
        // console.log('===cost===', offerPrice, offerShare, unit, dealing, capitalPercent, voucherPercent, tradeType);
        if (price_type === '4') {
            cost = '市價';
        }
        if (tradeTime === 'after') {
            cost = '盤後';
        }
        dispatch(setTransactionCost(cost));
    }, [code, T30Data, ord_price, bs, offerShare, solaceData, ord_type, ord_cond, tradeTime, price_type]);

    useEffect(() => {
        if (resetData) {
            dispatch(setOrdQty(userSettings.stockOrderUnit || '1'));
            dispatch(setOrdType('0'));
            dispatch(setTradeTime('ing'));
            dispatch(setTimeInForce('0'));
            dispatch(setOrdCount('0'));
            dispatch(setPriceType(' '));
            dispatch(setLot('Board'));

            //確認切回整股後取當時現價
            setTimeout(() => {
                if (solaceData.length > 0 && lot === 'Board') {
                    dispatch(setDefaultOrdPrice(formatPrice(solaceData[0].data.Close[0])));
                    // if(lot === 'Board'){
                    //     dispatch(setDefaultOrdPrice(formatPrice(solaceData[0].data.Close[0])))
                    // }else{
                    //     dispatch(setDefaultOrdPrice(formatPrice(solaceData[0].data.OddlotClose)))
                    // }
                }
            }, 500);
        }
    }, [resetData, solaceData]);

    const getOfferPrice = (ordPrice, reference, price_type) => {
        let offerPrice = ordPrice;
        if (price_type === '2') {
            offerPrice = Number(reference) * 1.1;
        }
        if (price_type === '3') {
            offerPrice = Number(reference) * 0.9;
        }
        if (price_type === '1') {
            offerPrice = reference;
        }
        return offerPrice;
    };

    const getTradeType = ordCond => {
        let tradeType = '';
        if (ordCond === '0') {
            tradeType = 'BYCASH';
        } else if (ordCond === '3') {
            tradeType = 'BYSOURCE';
        } else if (ordCond === '4') {
            tradeType = 'BYSECURITY';
        }
        return tradeType;
    };

    const submitHandler = () => {
        let color = bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor;
        if (currentAccount.accttype !== type) {
            Modal.error({
                title: '無可交易帳號',
                // content: '請確認價格或張數(股數)資料填寫正確',
            });
            return;
        }
        if (ord_price === '' || offerShare === '' || offerShare == 0) {
            Modal.error({
                title: '資料格式錯誤',
                content: '請確認價格或張數(股數)資料填寫正確',
            });
            return;
        }
        if (userSettings.confirmAfterStockOrdered != null && userSettings.confirmAfterStockOrdered) {
            dispatch(setConfirmBoxOpen(true));
            dispatch(setConfirmBoxTitle('委託確認'));
            dispatch(setConfirmBoxColor(color));
        } else {
            submitDataHandler();
        }
    };
    const checkReset = () => {
        if (userSettings.clearAfterStockOrdered != null && userSettings.clearAfterStockOrdered) {
            dispatch(setResetData(true));
            setTimeout(() => {
                dispatch(setResetData(false));
            }, 500);
        }
    };
    const submitDataHandler = async () => {
        const token = getToken();
        const ID = currentAccount.idno;
        //TODO cookie之後會廢掉
        const IP = getCookie('client_ip');
        const account = currentAccount.account;
        const broker_id = currentAccount.broker_id;
        const market_id = market === '上市' || market === '權證' ? 'S' : market === '上櫃' ? 'O' : 'R';
        const ord_bs = bs;
        const ord_cond = ordCond;
        const ord_price = ordPrice;
        const ord_qty = ordQty;
        const ord_type = ordType;
        const price_type = priceType;
        const stock_id = stockId;
        const time_in_force = timeInForce;
        const web_id = getWebId(platform, 'stock');
        const ca_content = sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token,
        );
        // const ca_content = {
        //     signature:
        //         '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',
        //     plainText: 'ACCIFFACDJ1582264901237',
        //     certSN: '6036E563',
        //     type: 'web',
        // };

        if (checkSignCA(ca_content)) {
            setSubmitLoading(true);
            const res = await postOrder({
                ID,
                IP,
                account,
                broker_id,
                is_first_sell,
                market_id,
                ord_bs,
                ord_cond,
                ord_price,
                ord_qty,
                ord_type,
                price_type,
                stock_id,
                time_in_force,
                token,
                web_id,
                ca_content,
            });
            setSubmitLoading(false);
            if (res.success === 'True') {
                // Modal.success({
                //     content: '委託成功',
                //     onOk: () => {
                //         dispatch(setActiveTabKey('3'));
                //         // checkReset();
                //     },
                // });
                message.success({
                    content: '委託成功',
                });
                dispatch(setActiveTabKey('3'));
            } else {
                // Modal.info({
                //     content: res.result.msg,
                // });
                message.info({
                    content: res.result.msg,
                });
            }
        }
    };

    return (
        <div className="submit__container">
            <Button
                style={{
                    width: '100%',
                    height: '85px',
                    background: bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor,
                }}
                type="primary"
                loading={submitLoading}
                onClick={e => {
                    e.stopPropagation();
                    submitHandler();
                }}
            >
                {bs === 'B' ? '委託買進' : '委託賣出'}
            </Button>
            <div className="estimatedAmount">預估金額 {formatNum(transactionCost) || '--'}元(台幣)</div>
            <style global jsx>{`
                .submit__container {
                    position: absolute;
                    top: 276px;
                    left: 0;
                    width: 100%;
                    height: 80px;
                }
                .submit__container .ant-btn-primary {
                    border: none;
                }
                .submit__container .ant-btn > span {
                    position: absolute;
                    top: 38%;
                    font-size: 2rem;
                    left: 50%;
                    font-weight: bold;
                    transform: translate(-50%, -50%);
                }
                .estimatedAmount {
                    position: absolute;
                    font-weight: bold;
                    top: 68%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #ffffff;
                    font-size: 1.6rem;
                    opacity: 0.6;
                    width: 100%;
                    text-align: center;
                    pointer-events: none;
                }
                .submit__container .ant-btn-loading-icon {
                    position: absolute !important;
                    left: 37% !important;
                    top: 37% !important;
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default SubmitBtn;

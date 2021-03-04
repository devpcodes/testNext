import { useEffect, useState } from 'react';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../panel/PanelTabs';
import ChangeNum from './ChangeNum';
import {
    mappingCommissionedCode,
    mappingWebId,
    mappingIspreOrder,
    padLeft,
} from '../../../../services/components/goOrder/dataMapping';
import { timeFormatter } from '../../../../services/timeFormatter';
import { formatPrice } from '../../../../services/numFormat';
import { getStockPriceRange, getStockType } from '../../../../services/stockTickType';
import infoIcon from '../../../../resources/images/components/goOrder/attention-info-circle.svg';
import { postUpdatePrice } from '../../../../services/components/goOrder/postUpdatePrice';
import { getCookie } from '../../../../services/components/layouts/cookieController';
import { getToken } from '../../../../services/user/accessToken';
import { setConfirmBoxOpen } from '../../../../store/goOrder/action';
import { CAHandler } from '../../../../services/webCa';

const qtyUnit = 1;
const ChangeBox = ({ type, tabKey }) => {
    const dispatch = useDispatch();
    const info = useSelector(store => store.goOrder.confirmBoxChanValInfo);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [priceVal, setPriceVal] = useState('');
    const [qtyVal, setQtyVal] = useState('');
    const [disabledPlus, setDisabledPlus] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    useEffect(() => {
        setPriceVal(info.price);
        const qty =
            mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                ? Number(info.qty) / 1000
                : Number(info.qty);
        setQtyVal(qty);
    }, [info]);

    useEffect(() => {
        switch (tabKey) {
            case '1':
                setPriceVal(info.price);
                break;
            case '2':
                const qty =
                    mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                        ? Number(info.qty) / 1000
                        : Number(info.qty);
                setQtyVal(qty);
                break;
            default:
                break;
        }
    }, [tabKey]);

    const plusPriceHandler = () => {
        if (isNaN(Number(priceVal))) {
            setPriceVal('');
            return;
        }
        const type = getStockType(info.stock_id || '').type;
        const unit = getStockPriceRange(type, priceVal, true);
        setPriceVal(formatPrice(parseFloat(priceVal) + unit));
    };

    const minusPriceHandler = () => {
        if (isNaN(Number(priceVal))) {
            setPriceVal('');
            return;
        }
        const type = getStockType(info.stock_id || '').type;
        const unit = getStockPriceRange(type, priceVal, true);
        if (parseFloat(priceVal) - unit <= unit) {
            setPriceVal(formatPrice(unit));
        } else {
            setPriceVal(formatPrice(parseFloat(priceVal) - unit));
        }
    };

    const priceChangeHandler = val => {
        setPriceVal(val);
    };

    const plusQtyHandler = () => {
        setQtyVal(Number(qtyVal) + qtyUnit);
        plusDisabledHandler(Number(qtyVal) + qtyUnit);
    };

    const minusQtyHandler = () => {
        if (Number(qtyVal) - qtyUnit === 0) {
            setQtyVal(Number(qtyVal));
            plusDisabledHandler(Number(qtyVal));
        } else {
            setQtyVal(Number(qtyVal) - qtyUnit);
            plusDisabledHandler(Number(qtyVal) - qtyUnit);
        }
    };

    const qtyChangeHandler = val => {
        if (isNaN(Number(val))) {
            return;
        } else {
            const qty =
                mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                    ? Number(info.qty) / 1000
                    : Number(info.qty);
            if (Number(val) >= qty) {
                plusDisabledHandler(val);
                setQtyVal(qty);
                return;
            }
        }
        plusDisabledHandler(val);
        setQtyVal(val);
    };

    const plusDisabledHandler = val => {
        const qty =
            mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                ? Number(info.qty) / 1000
                : Number(info.qty);
        if (Number(val) >= qty) {
            setDisabledPlus(true);
        } else {
            setDisabledPlus(false);
        }
    };

    const submitData = async () => {
        var signDict = {
            signature:
                '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',
            plainText: 'ACCIFFACDJ1582264901237',
            certSN: '6036E563',
            type: 'web',
        };
        const token = getToken();
        CAHandler(token, async () => {
            const ca = new CA_Component({
                windowURL: process.env.NEXT_PUBLIC_WEBCAFRM,
                webcaURL: process.env.NEXT_PUBLIC_WEBCAURL,
                getIdentifyNoURL: process.env.NEXT_PUBLIC_GETIDENTIfYNOURL,
                DM: DM,
            });
            signDict.signature = ca.getSignature();
            signDict.plainText = ca.getSignCode();
            signDict.certSN = ca.getCertSN();
            signDict.type = 'web'; //goOrder.shell.isDevicePC() ? "web" : "mobile";

            setSubmitLoading(true);
            const ID = currentAccount.idno;
            //TODO cookie之後會廢掉
            const IP = getCookie('client_ip');
            const account = currentAccount.account;
            const broker_id = currentAccount.broker_id;
            const is_preorder = mappingIspreOrder(info.ord_no);
            const market_id = info.market_id;
            const ord_bs = info.ord_bs;
            const ord_cond = info.ord_type2;
            const ord_no = info.ord_no;
            const ord_price = priceVal;
            const ord_qty = qtyVal;
            const ord_seq = padLeft(info.sord_seq, 6);
            const ord_type = info.ord_type1;
            const stock_id = info.stock_id;

            const web_id = '129';
            const ca_content = signDict;
            const resVal = await postUpdatePrice({
                ID,
                IP,
                account,
                broker_id,
                is_preorder,
                market_id,
                ord_bs,
                ord_cond,
                ord_no,
                ord_price,
                ord_qty,
                ord_seq,
                ord_type,
                stock_id,
                token,
                web_id,
                ca_content,
                postName: type,
            });
            setSubmitLoading(false);
            if (resVal.indexOf('成功') >= 0) {
                Modal.success({
                    content: resVal,
                });
            } else {
                Modal.warning({
                    content: resVal,
                });
            }
        });
    };
    return (
        <>
            <div className="tradingInfo__container">
                <div className="title__box">
                    <span className="ord__char">
                        {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1)}
                    </span>
                    <div className="name__zh">
                        <span className="bs">{info.ord_bs === 'B' ? '買進' : '賣出'}</span>
                        {info.name_zh.trim()}
                        <Tooltip
                            placement="bottom"
                            title={
                                <span>
                                    委託時間 {timeFormatter(info.ord_time, false)}
                                    <br />
                                    委託條件 {info.time_in_force}
                                    <br />
                                    委託書號 {info.ord_no}
                                    <br />
                                    網路單號 {info.sord_seq}
                                    <br />
                                    下單來源 {mappingWebId(info.web_id)}
                                </span>
                            }
                            color="white"
                        >
                            <img className="info__icon" src={infoIcon} />
                        </Tooltip>
                    </div>
                </div>

                <div className="price__box">
                    <span className="price__label">委託價格</span>
                    <span className="price__val">{info.price}</span>
                </div>
                <div className="qty__box">
                    <span className="qty__label">委託數量</span>
                    <span className="qty__val">
                        {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                            ? Number(info.qty) / 1000
                            : info.qty}
                    </span>
                    <span className="qty__unit">
                        {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零' ? '張' : '股'}
                    </span>
                </div>
                {type === 'price' && (
                    <ChangeNum
                        key="2"
                        title="新價格"
                        defaultVal={info.price}
                        val={priceVal}
                        plusClickHandler={plusPriceHandler}
                        minusClickHandler={minusPriceHandler}
                        changeHandler={priceChangeHandler}
                    />
                )}
                {type === 'qty' && (
                    <ChangeNum
                        key="1"
                        title="欲減量"
                        defaultVal={
                            mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '零'
                                ? Number(info.qty) / 1000
                                : Number(info.qty)
                        }
                        val={qtyVal}
                        plusClickHandler={plusQtyHandler}
                        minusClickHandler={minusQtyHandler}
                        changeHandler={qtyChangeHandler}
                        disabledPlus={disabledPlus}
                    />
                )}
                <div className="btn__container">
                    <Button
                        style={{
                            height: '60px',
                            width: 'calc( 50% - 8px )',
                            marginRight: '16px',
                            backgroundColor: '#e6ebf5',
                            border: 'none',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                        onClick={() => {
                            dispatch(setConfirmBoxOpen(false));
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        style={{
                            height: '60px',
                            width: 'calc( 50% - 8px )',
                            backgroundColor: '#254a91',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            border: 'none',
                        }}
                        onClick={submitData}
                        loading={submitLoading}
                    >
                        確定
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .info__icon {
                    margin-left: 6px;
                    margin-top: -4px;
                }
                .tradingInfo__container {
                    padding: 0 16px 0 16px;
                }
                .ord__char {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    font-size: 1.69rem;
                    color: white;
                    background-color: ${info.ord_bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
                    text-align: center;
                    border-radius: 2.8px;
                    margin-right: 8px;
                    vertical-align: middle;
                }
                .name__zh {
                    display: inline-block;
                    font-size: 24px;
                    line-height: 1px;
                    vertical-align: middle;
                    margin-top: 3px;
                    font-weight: bold;
                    color: black;
                }
                .bs {
                    color: ${themeColor.buyTabColor};
                }
                .price__box {
                    margin-top: 13px;
                    display: inline-block;
                }
                .price__label {
                    color: #0d1623;
                }
                .price__val {
                    color: #0d1623;
                    margin-left: 10px;
                }
                .qty__box {
                    display: inline-block;
                    margin-left: 77px;
                    color: #0d1623;
                    margin-bottom: 12px;
                }
                .qty__val {
                    margin-left: 10px;
                }
                .qty__unit {
                    margin-left: 2px;
                }
                .btn__container {
                    font-size: 0;
                    width: 100%;
                    /* margin-top: 35px; */
                    position: absolute;
                    padding-right: 32px;
                    top: 275px;
                }
            `}</style>
            <style jsx global>{`
                .ant-tooltip-inner {
                    color: black;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                }
            `}</style>
        </>
    );
};

export default ChangeBox;

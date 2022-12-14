import { useEffect, useState, useRef } from 'react';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { themeColor } from '../panel/PanelTabs';
import ChangeNum from './ChangeNum';
import {
    mappingCommissionedCode,
    mappingWebId,
    mappingIspreOrder,
    mappingCommissionedCodeTradingAcc,
    padLeft,
    mappingPriceMsg,
} from '../../../../services/components/goOrder/dataMapping';
import { timeFormatter } from '../../../../services/timeFormatter';
import { formatPrice, formatPriceByUnit } from '../../../../services/numFormat';
import { getStockPriceRange, getStockType } from '../../../../services/stockTickType';
import infoIcon from '../../../../resources/images/components/goOrder/attention-info-circle.svg';
import { postUpdatePrice } from '../../../../services/components/goOrder/postUpdatePrice';
import { getCookie } from '../../../../services/components/layouts/cookieController';
import { getToken } from '../../../../services/user/accessToken';
import {
    setConfirmBoxOpen,
    setConfirmBoxClickSource,
    setSearchListSubmitSuccess,
} from '../../../../store/goOrder/action';
import { CAHandler, sign, checkSignCA } from '../../../../services/webCa';
import { usePlatform } from '../../../../hooks/usePlatform';
import { getWebId } from '../../../../services/components/goOrder/getWebId';

const qtyUnit = 1;
const ChangeBox = ({ type, tabKey, btnClassName }) => {
    const dispatch = useDispatch();
    const info = useSelector(store => store.goOrder.confirmBoxChanValInfo);
    const code = useSelector(store => store.goOrder.code);
    const currentAccount = useSelector(store => store.user.currentAccount);
    const [priceVal, setPriceVal] = useState('');
    const [qtyVal, setQtyVal] = useState('');
    const [disabledPlus, setDisabledPlus] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const platform = usePlatform();
    useEffect(() => {
        console.log('info', info);
        setPriceVal(info.price == 0 ? '' : info.price);
        // const qty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.qty) / 1000
        //         : Number(info.qty);
        // const cancelQty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.cancel_qty) / 1000
        //         : Number(info.cancel_qty);
        setQtyVal(getQtyHandler());
    }, [info]);

    useEffect(() => {
        switch (tabKey) {
            case '1':
                setPriceVal(info.price == 0 ? '' : info.price);
                break;
            case '2':
                // const qty =
                //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
                //         ? Number(info.qty) / 1000
                //         : Number(info.qty);
                // const cancelQty =
                //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
                //         ? Number(info.cancel_qty) / 1000
                //         : Number(info.cancel_qty);

                setQtyVal(getQtyHandler());
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
        setPriceVal(formatPriceByUnit(code, parseFloat(priceVal) + unit));
    };

    const minusPriceHandler = () => {
        if (isNaN(Number(priceVal))) {
            setPriceVal('');
            return;
        }
        const type = getStockType(info.stock_id || '').type;
        const unit = getStockPriceRange(type, priceVal, true);
        if (parseFloat(priceVal) - unit <= unit) {
            setPriceVal(formatPriceByUnit(code, unit));
        } else {
            setPriceVal(formatPriceByUnit(code, parseFloat(priceVal) - unit));
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
            // const qty =
            //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
            //         ? Number(info.qty) / 1000
            //         : Number(info.qty);
            // const cancelQty =
            //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
            //         ? Number(info.cancel_qty) / 1000
            //         : Number(info.cancel_qty);
            if (Number(val) >= getQtyHandler()) {
                plusDisabledHandler(val);
                setQtyVal(getQtyHandler());
                return;
            }
        }
        plusDisabledHandler(val);
        setQtyVal(val);
    };

    const plusDisabledHandler = val => {
        // const qty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.qty) / 1000
        //         : Number(info.qty);
        // const cancelQty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.cancel_qty) / 1000
        //         : Number(info.cancel_qty);
        if (Number(val) >= getQtyHandler()) {
            setDisabledPlus(true);
        } else {
            setDisabledPlus(false);
        }
    };

    const submitData = async () => {
        // var ca_content = {
        //     signature:
        //         'MIIHHgYJKoZIhvcNAQcCoIIHDzCCBwsCAQExCzAJBgUrDgMCGgUAMD0GCSqGSIb3DQEHAaAwBC5BAEMAQwBJAEYARgBBAEMARABKADEANQA4ADIAMgA2ADQAOQAwADEAMgAzADcAoIIE9TCCBPEwggPZoAMCAQICBGA25WMwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlRXMRswGQYDVQQKExJUQUlXQU4tQ0EuQ09NIEluYy4xNzA1BgNVBAsTLkNlcnRpZmljYXRpb24gU2VydmljZSBQcm92aWRlci1FdmFsdWF0aW9uIE9ubHkxKTAnBgNVBAMTIFRhaUNBIFNlY3VyZSBDQSAtRXZhbHVhdGlvbiBPbmx5MB4XDTIwMDIyMTA1MzYxMVoXDTIwMDMwNjE1NTk1OVowgdsxCzAJBgNVBAYTAlRXMSowKAYDVQQKEyFUYWlDQSBTZWN1cmUgQ0EgLSBFdmFsdWF0aW9uIE9ubHkxNzA1BgNVBAoTLkNlcnRpZmljYXRlIFNlcnZpY2UgUHJvdmlkZXIgLSBFdmFsdWF0aW9uIE9ubHkxEzARBgNVBAsTClJBLVNJTk9QQUMxHDAaBgNVBAsTEzIzMTEzMzQzLVJBLVNJTk9QQUMxITAfBgNVBAMTGEFDQ0lGRkFDREotMDAtMDA6OkhXQzE5NjERMA8GCSqGSIb3DQEJARYCQEAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLVh3DJu/F8Iu+WZhlqcNqJksbMxNj7Qzu5sPiApiSAbGB26jfONGNGbFOAonlGJfXwiYnO+yJ9dIbycspDamhAPGjF9ZqBgQ89OOSfb2Isot5OPFftUhzu/VwUGFVdgiRjARZEjOQ/qrYB815xS9Gw6m2SL8hBcaVoF/O9a/PvZ9+rw3jATkrYItvVFySjEG8z72//wab1XN5YFOcayZhgn6v89sKEqsqMyO9Qd8vNhKs6y2bysnGPYRCndB7ZDhVOBbNyu59o4yFpLDL+MRZd4P+ysZ1vGi1Vp8o0a4BXcHNFBkwCyVvKuuvHR/s9cTC/jtzseY96jVDCcv47yUnAgMBAAGjggEGMIIBAjAfBgNVHSMEGDAWgBQFWID2lwpEP3cruhPU2BjmdxeEsTAdBgNVHQ4EFgQUn6Nn3c75FLtjFhlk0UjIKGa1WJEwQwYDVR0fBDwwOjA4oDagNIYyaHR0cDovL2l0YXgudHdjYS5jb20udHcvdGVzdGNybC90ZXN0X2VjcGxfMjAxMi5jcmwwYAYDVR0gBFkwVzBVBghghnYDAQOHZzBJMCMGCCsGAQUFBwIBFhdodHRwOi8vd3d3LnR3Y2EuY29tLnR3LzAiBggrBgEFBQcCAjAWGhRSZXN0cmljdGlvbiA9My4yLjMuMjAJBgNVHRMEAjAAMA4GA1UdDwEB/wQEAwIE8DANBgkqhkiG9w0BAQUFAAOCAQEATqRdEPK2DBj9PkYLM+kuq8UnbksY+8e3cPCgztfCjh//DiFZ2ZrUEXJNnepaaN5WrcTkpxbnm9/mPf9jk3Gt7jCMKY6gEcawX9VFzeocOubXAYk4FRA1ALMXUL8pWpYTq/2VSmavr+dHihIvQnTabh30odAI1XMrADSaEGL5bfgeX1MgQeL8D9ldO3HpmuUn73/q6SFywqxGxVN+qqofWeL8MfVjJTEkAlYT3P/agaqqZJ8wiQsy5O6hbcnUWqDXqjJQ2gKo6aVt7LPRFerfplN2FPXfvY1gOX7uDNNJpdsK43mYOJ6V6Z5Gf+S6llv9xb6jqRjf8T3hB23lOTihIjGCAb8wggG7AgEBMIGXMIGOMQswCQYDVQQGEwJUVzEbMBkGA1UEChMSVEFJV0FOLUNBLkNPTSBJbmMuMTcwNQYDVQQLEy5DZXJ0aWZpY2F0aW9uIFNlcnZpY2UgUHJvdmlkZXItRXZhbHVhdGlvbiBPbmx5MSkwJwYDVQQDEyBUYWlDQSBTZWN1cmUgQ0EgLUV2YWx1YXRpb24gT25seQIEYDblYzAJBgUrDgMCGgUAMA0GCSqGSIb3DQEBAQUABIIBABO7xGAz/9dW3faZdEsMOIITGHinWgxv7BMNVA6v25YGSj0h148Lf8IsK6dn8iweA57cHkpW06iBaZxfYUM7jlmtoK6P75eLyQ4Kh3j/0kPP8ImofzZ2j95A7BgHz6zJ9H9YCdG/tyetcsvyoSW4xp3dsA5ejTMfLyXp5s81BYd/ot3keahxUhFPhU8mTSQhOH4sE0FwVI+iJuiR97utM6n5dcXXOo0rs5XgyQNxjzZ3tpOvkC7ibHufOrvuyZYsajTBUXcVXoyHgOAJ2t5aqq9yQKqnOczpIzcS9ZTZMRPzYLu/9X/2Ik2cHKft70M1sHAaTbP4kQZbHajI7rN/HuY=',
        //     plainText: 'ACCIFFACDJ1582264901237',
        //     certSN: '6036E563',
        //     type: 'web',
        // };
        const token = getToken();
        const ca_content = sign(
            {
                idno: currentAccount.idno,
                broker_id: currentAccount.broker_id,
                account: currentAccount.account,
            },
            true,
            token,
        );
        if (checkSignCA(ca_content)) {
            setSubmitLoading(true);
            dispatch(setSearchListSubmitSuccess(false));
            const ID = currentAccount.idno;
            //TODO cookie???????????????
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
            // const web_id = '129';
            const web_id = getWebId(platform, 'stock');
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
            if (resVal.indexOf('??????') >= 0) {
                Modal.success({
                    content: resVal,
                });
                closeHandler();
                dispatch(setSearchListSubmitSuccess(true));
            } else {
                Modal.warning({
                    content: resVal,
                });
            }
        }
    };
    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
        dispatch(setConfirmBoxClickSource(''));
    };
    const getQtyHandler = () => {
        let qty;
        let cancelQty;
        let match_qty;
        if (info.ord_type1 === '2' || info.ord_type1 === 'C') {
            qty = Number(info.qty);
            cancelQty = Number(info.cancel_qty);
            match_qty = Number(info.match_qty);
        } else {
            qty = Number(info.qty) / 1000;
            cancelQty = Number(info.cancel_qty) / 1000;
            match_qty = Number(info.match_qty) / 1000;
        }
        return qty - cancelQty - match_qty;

        // const qty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.qty) / 1000
        //         : Number(info.qty);
        // const cancelQty =
        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
        //         ? Number(info.cancel_qty) / 1000
        //         : Number(info.cancel_qty);
        // return qty - cancelQty;
    };
    return (
        <>
            <div className="tradingInfo__container">
                <div className="title__box">
                    <span className="ord__char">
                        {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1)}
                    </span>
                    <div className="name__zh">
                        <span className="bs">{info.ord_bs === 'B' ? '??????' : '??????'}</span>
                        {info.name_zh.trim()}
                        <Tooltip
                            placement="bottom"
                            title={
                                <>
                                    <span>????????????</span>
                                    <span className="tooltip__val">
                                        {mappingCommissionedCodeTradingAcc(
                                            info.ord_bs,
                                            info.ord_type2,
                                            info.market_id,
                                            info.ord_type1,
                                        )}
                                    </span>
                                    <br />
                                    <span>???????????? </span>
                                    <span className="tooltip__val">{info.time_in_force}</span>
                                    <br />
                                    <span>???????????? </span>
                                    <span className="tooltip__val">{info.ord_no}</span>
                                    <br />
                                    <span>???????????? </span>
                                    <span className="tooltip__val">{info.sord_seq}</span>
                                    <br />
                                    <span>????????????</span>
                                    <span className="tooltip__val">{mappingWebId(info.web_id)}</span>
                                </>
                            }
                            color="white"
                        >
                            <img className="info__icon" src={infoIcon} />
                        </Tooltip>
                    </div>
                </div>

                <div className="price__box">
                    <span className="price__label">????????????</span>
                    <span className="price__val">
                        {formatPriceByUnit(
                            info.stock_id,
                            mappingPriceMsg(info.price, info.price_type, info.price_flag, info.ord_type1),
                        )}
                    </span>
                </div>
                <div className="qty__box">
                    <span className="qty__label">????????????</span>
                    <span className="qty__val">{getQtyHandler()}</span>
                    <span className="qty__unit">
                        {/* {mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???' ? '???' : '???'} */}
                        {info.ord_type1 === '2' || info.ord_type1 === 'C' ? '???' : '???'}
                    </span>
                </div>
                {type === 'price' && (
                    <ChangeNum
                        key="2"
                        title="?????????"
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
                        title="?????????"
                        // defaultVal={
                        //     mappingCommissionedCode(info.ord_type2, info.market_id, info.ord_type1) !== '???'
                        //         ? Number(info.qty) / 1000
                        //         : Number(info.qty)
                        // }
                        val={qtyVal}
                        plusClickHandler={plusQtyHandler}
                        minusClickHandler={minusQtyHandler}
                        changeHandler={qtyChangeHandler}
                        disabledPlus={disabledPlus}
                    />
                )}
                <div className={btnClassName}>
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
                            closeHandler();
                        }}
                    >
                        ??????
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
                        ??????
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
                    color: ${info.ord_bs === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
                    color: #0d1623;
                    font-size: 1.6rem;
                    box-shadow: 0 2px 15px 0 rgba(169, 182, 203, 0.7);
                    padding: 16px;
                    line-height: 25px;
                }
                .tooltip__val {
                    font-weight: bold;
                    margin-left: 5px;
                    color: #0d1623;
                }
            `}</style>
        </>
    );
};

export default ChangeBox;

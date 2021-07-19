import { useEffect, useState, useRef } from 'react';
import { Button, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import QtyBox from '../sbPanel/QtyBox';
import { themeColor } from '../../panel/PanelTabs';
import TitleBox from './TitleBox';
import { setConfirmBoxOpen, setSearchListSubmitSuccess } from '../../../../../store/goOrderSB/action';
import { usePlatform } from '../../../../../hooks/usePlatform';
import { getTT } from '../../../../../services/components/goOrder/sb/dataMapping';
import { getWebId } from '../../../../../services/components/goOrder/getWebId';
import { postUpdate } from '../../../../../services/components/goOrder/sb/postUpdate';
import { postCancel } from '../../../../../services/components/goOrder/sb/postCancel';

const ChangeBox = ({ type, tabKey, btnClassName, info, stockInfo }) => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(store => store.user.currentAccount);
    const qty = useSelector(store => store.goOrderSB.qty);
    const [submitLoading, setSubmitLoading] = useState(false);
    const platform = usePlatform();
    useEffect(() => {
        getCancel(info);
    }, [info]);

    const getCancel = () => {
        if (info.hasOwnProperty('Qcurrent') && info['Qmatched'] != null && !isNaN(info['Qmatched'])) {
            info.cancel = parseFloat((info.Qoriginal - parseFloat(info['Qnext'])).toPrecision(12));
            return parseFloat((info.Qoriginal - parseFloat(info['Qnext'])).toPrecision(12));
        }
    };

    const getCanCancelQty = info => {
        return parseFloat(info?.Qoriginal) - parseFloat(info?.cancel) - parseFloat(info?.Qmatched);
    };

    const closeHandler = () => {
        dispatch(setConfirmBoxOpen(false));
    };

    const submitData = async (info, currentAccount) => {
        const marketID = info.StockID.split('.').slice(-1).pop();
        console.log('marketID', marketID);
        let newQty = getCanCancelQty(info) - qty;
        if (newQty == 0) {
            try {
                const resVal = await postCancel({
                    currentAccount,
                    BS: info.BS,
                    CID: getWebId(platform, 'recommisiioned'),
                    Creator: currentAccount.idno,
                    DJCrypt_pwd: info.DJCrypt_pwd != null ? info.DJCrypt_pwd : '',
                    Exchid: marketID,
                    OID: info.OID,
                    OT: '0',
                    StockID: info.StockID.substring(0, info.StockID.lastIndexOf('.')),
                    TT: getTT(marketID),
                });
                dispatch(setSearchListSubmitSuccess(true));
                Modal.info({
                    content: resVal,
                });
            } catch (error) {
                message.info({
                    content: error,
                });
            }
        } else {
            try {
                const resVal = await postUpdate({
                    currentAccount,
                    BS: info.BS,
                    CID: getWebId(platform, 'recommisiioned'),
                    Creator: currentAccount.idno,
                    DJCrypt_pwd: info.DJCrypt_pwd != null ? info.DJCrypt_pwd : '',
                    Exchid: marketID,
                    OID: info.OID,
                    OT: '0',
                    StockID: info.StockID.substring(0, info.StockID.lastIndexOf('.')),
                    TT: getTT(marketID),
                    NewQty: newQty,
                });
                setSubmitLoading(false);
                dispatch(setSearchListSubmitSuccess(true));
                Modal.success({
                    content: resVal,
                });
                closeHandler();
            } catch (error) {
                message.info({
                    content: error,
                });
            }
        }
    };
    return (
        <>
            <div className="tradingInfo__container">
                <TitleBox info={info} stockInfo={stockInfo} />

                <div className="price__box">
                    <span className="price__label">委託價格</span>
                    <span className="price__val">{!isNaN(info.Price) ? parseFloat(info.Price) : 0}</span>
                </div>
                <div className="qty__box">
                    <span className="qty__label">剩餘數量</span>
                    <span className="qty__val">{getCanCancelQty(info)}</span>
                    <span className="qty__unit">股</span>
                </div>
                <QtyBox label="欲減量" color="#254a91" parentVal={getCanCancelQty(info)} />

                <div
                    className={btnClassName}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        paddingRight: '32px',
                        top: '320px',
                    }}
                >
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
                        onClick={submitData.bind(null, info, currentAccount)}
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
                    background-color: ${info.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
                    color: ${info.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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

import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message, Modal } from 'antd';
import { postStockInfo } from '../../../../../../services/components/goOrder/sb/postStockInfo';
import { getToken } from '../../../../../../services/user/accessToken';
import { setModal } from '../../../../../../store/components/layouts/action';
import UpdateQtyModal from './UpdateQtyModal';
import TitleBox from '../../../../goOrder_SB/SB/searchList/TitleBox';
import { postCancel } from '../../../../../../services/components/goOrder/sb/postCancel';
import { postUpdate } from '../../../../../../services/components/goOrder/sb/postUpdate';
import { getWebId } from '../../../../../../services/components/goOrder/getWebId';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import { getPriceType, getTT, goOrderMapping } from '../../../../../../services/components/goOrder/sb/dataMapping';

const ControlBtns = ({ BS, CanCancel, CanModify, data, successHandler }) => {
    const dispatch = useDispatch();
    const platform = usePlatform();
    const nowQty = useRef(0);
    const currentAccount = useSelector(store => store.user.currentAccount);

    const getQtyValueHandler = qty => {
        nowQty.current = qty;
    };

    const delHandler = info => {
        dispatch(
            setModal({
                visible: true,
                title: '刪單確認',
                type: 'confirm',
                content: '確認刪除1筆資料嗎？',
                onOk: async () => {
                    closeHandler();
                    await delSubmit(info);
                },
            }),
        );
    };

    const delSubmit = async info => {
        const marketID = info.StockID.split('.').slice(-1).pop();
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
            successHandler();
            Modal.info({
                content: resVal,
            });
        } catch (error) {
            message.info({
                content: error,
            });
        }
    };

    const closeHandler = () => {
        dispatch(setModal({ visible: false }));
    };

    const getType = info => {
        const marketID = info.StockID.split('.').slice(-1).pop();
        const priceType = getPriceType(info.PriceType);
        let arr = goOrderMapping(priceType, info.GTCDate);
        arr = arr.filter(item => {
            if (item === 'ANY' || item === 'AON') {
                return item;
            }
        });
        if (marketID !== 'US') {
            return '--';
        } else {
            return arr[0] || '--';
        }
    };

    const submitData = async (info, currentAccount) => {
        const marketID = info.StockID.split('.').slice(-1).pop();
        console.log('marketID', marketID);
        let newQty = getCanCancelQty(info) - nowQty.current;

        const type = getType(info);
        if (type === 'AON' && newQty < 100 && newQty != 0) {
            message.error({
                title: '資料格式錯誤',
                content: 'AON 委託不得低於 100 股',
            });
            return;
        }

        if (newQty == 0) {
            closeHandler();
            await delSubmit(info);
        } else {
            try {
                closeHandler();
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
                successHandler();
                Modal.success({
                    content: resVal,
                });
            } catch (error) {
                message.info({
                    content: error,
                });
            }
        }
    };

    const getCanCancelQty = info => {
        if (info.hasOwnProperty('Qcurrent') && info['Qmatched'] != null && !isNaN(info['Qmatched'])) {
            info.cancel = parseFloat((info.Qoriginal - parseFloat(info['Qnext'])).toPrecision(12));
            return parseFloat(info?.Qoriginal) - parseFloat(info?.cancel) - parseFloat(info?.Qmatched);
        }
    };

    const updateHandler = async () => {
        const marketID = data.StockID.split('.').slice(-1).pop();
        const symbol = data.StockID.substring(0, data.StockID.lastIndexOf('.'));
        try {
            const stockInfo = await getStockInfo(currentAccount, marketID, symbol);
            dispatch(
                setModal({
                    title: '改量',
                    type: 'confirm',
                    content: (
                        <UpdateQtyModal
                            title={
                                <TitleBox
                                    info={data}
                                    stockInfo={stockInfo}
                                    style={{ marginBottom: '10px' }}
                                    showIcon={false}
                                />
                            }
                            color={BS === 'B' ? '#f45a4c' : '#22a16f'}
                            price={parseFloat(data.Price)}
                            unit={'股'}
                            value={getCanCancelQty(data)}
                            getValue={getQtyValueHandler}
                            data={data}
                            qtyUnit={Number(stockInfo['@LotSize'])}
                        />
                    ),
                    visible: true,
                    onOk: submitData.bind(null, data, currentAccount),
                }),
            );
        } catch (error) {
            message.error({
                content: error,
            });
        }
    };

    const getStockInfo = async (currentAccount, market, code) => {
        if (getToken()) {
            let AID = null;
            if (currentAccount != null && currentAccount.broker_id != null && currentAccount.accttype === 'H') {
                AID = currentAccount.broker_id + currentAccount.account;
            }
            const Exchid = market;
            const stockID = code;
            const token = getToken();
            return await postStockInfo({ AID, Exchid, stockID, token });
        }
    };

    return (
        <>
            {CanCancel === 'Y' && (
                <button className="btn" onClick={delHandler.bind(null, data)}>
                    <span>刪</span>
                </button>
            )}
            {CanModify === 'Y' && (
                <button className="btn" onClick={updateHandler}>
                    <span>改</span>
                </button>
            )}
            <style jsx>
                {`
                    .btn {
                        margin: 0;
                        padding: 0;
                        border: none;
                        outline: none;
                        background-color: ${BS === 'B' ? '#feefed' : '#e7f7f1'};
                        color: ${BS === 'B' ? '#f45a4c' : '#22a16f'};
                        padding-left: 4px;
                        padding-right: 4px;
                        margin-right: 4px;
                        font-weight: bold;
                        border-radius: 2px;
                        transition: all 0.3s;
                    }
                    .btn:last-child {
                        margin-right: 0;
                    }
                    .btn:hover {
                        background-color: ${BS === 'B' ? '#ffded9' : '#d1f1e5'};
                    }
                `}
            </style>
        </>
    );
};
export default ControlBtns;

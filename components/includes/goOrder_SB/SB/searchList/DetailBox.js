import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import moment from 'moment';
// import { timeFormatter } from '../../../../services/timeFormatter';
import { themeColor } from '../../panel/PanelTabs';
// import { setConfirmBoxTitle, setConfirmBoxClickSource } from '../../../../store/goOrder/action';
import infoIcon from '../../../../../resources/images/components/goOrder/attention-info-circle.svg';
import { timeFormatter } from '../../../../../services/timeFormatter';
import { getPriceType, goOrderMapping } from '../../../../../services/components/goOrder/sb/dataMapping';
import TitleBox from './TitleBox';
import { setConfirmBoxClickSource, setConfirmBoxTitle } from '../../../../../store/goOrderSB/action';

const DetailBox = () => {
    const dispatch = useDispatch();
    const info = useSelector(store => store.goOrderSB.confirmBoxChanValInfo);
    const stockInfo = useSelector(store => store.goOrderSB.stockInfo);
    const [icons, setIcons] = useState([]);
    useEffect(() => {
        getIcon(info);
    }, [info]);
    const clickHandler = status_code => {
        if (showInfoHandler(status_code)) {
            dispatch(setConfirmBoxTitle('成交明細'));
            dispatch(setConfirmBoxClickSource('detail'));
        }
    };

    const showHandler = () => {
        // return mappingShowChangeBtn(info.status_code);
        if (info.CanModify === 'Y') {
            return true;
        } else {
            return false;
        }
    };

    const showInfoHandler = status_code => {
        if (status_code === '2' || status_code === '3') {
            return (
                <span
                    style={{
                        marginLeft: '5px',
                        fontSize: '1.6rem',
                        fontWeight: 'bold',
                        currsor: 'pointer',
                    }}
                >
                    {'>'}
                </span>
            );
        } else {
            return '';
        }
    };

    const getTimerHandler = info => {
        const timeArr = info.CreateTime.split(' ');
        const d = moment(timeArr[0]).format('YYYY/MM/DD');
        const timeStr = timeFormatter(timeArr[1], false);
        return d + ' ' + timeStr;
    };

    const getCancel = () => {
        if (info.hasOwnProperty('Qcurrent') && info['Qmatched'] != null && !isNaN(info['Qmatched'])) {
            info.cancel = parseFloat((info.Qoriginal - parseFloat(info['Qnext'])).toPrecision(12));
            return parseFloat((info.Qoriginal - parseFloat(info['Qnext'])).toPrecision(12));
        }
    };

    const getCanCancelQty = () => {
        return parseFloat(info?.Qoriginal) - parseFloat(info?.cancel) - parseFloat(info?.Qmatched);
    };

    const getIcon = info => {
        const priceType = getPriceType(info.PriceType);
        let arr = goOrderMapping(priceType, info.GTCDate);
        arr = arr.filter(item => {
            if (item !== 'ANY' && item !== 'AON') {
                return item;
            }
        });
        console.log('icons...', arr);
        setIcons(arr);
    };

    const getTouchPrice = info => {
        const marketID = info.StockID.split('.').slice(-1).pop();
        if (info.hasOwnProperty('TouchedPrice')) {
            if (info.hasOwnProperty('PriceType') && marketID == 'US') {
                if (info['PriceType'] == '60' || info['PriceType'] == '66') {
                    if (info['BS'] === 'B') {
                        return '≥' + parseFloat(info['TouchedPrice']);
                    } else if (info['BS'] === 'S') {
                        return '≤' + parseFloat(info['TouchedPrice']);
                    }
                }
            }
        }
    };

    return (
        <>
            <div className="detail__container">
                <TitleBox info={info} stockInfo={stockInfo} />
                <div className="info__box">
                    <div className="info__box--left">
                        <div className="item">
                            <span className="item__label">委託價格</span>
                            <span className="item__val">{parseFloat(info?.Price)}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">取消數量</span>
                            <span className="item__val">{getCancel()}</span>
                        </div>
                        <div className="item" onClick={clickHandler.bind(null, info.status_code)}>
                            <span className="item__label">成交均價</span>
                            <span className="item__val">{parseFloat(info?.AvgPrice) || '--'}</span>
                            {/* {showInfoHandler(info.status_code)} */}
                        </div>
                        <div className="item">
                            <span className="item__label">委託狀態</span>
                            <span className="item__val">{info?.StateMsg}</span>
                        </div>
                    </div>
                    <div className="info__box--right">
                        <div className="item">
                            <span className="item__label">委託數量</span>
                            <span className="item__val">{info?.Qoriginal}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">剩餘數量</span>
                            <span className="item__val">{getCanCancelQty()}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">成交數量</span>
                            <span className="item__val">{parseFloat(info?.Qmatched) || '--'}</span>
                        </div>
                        {parseFloat(info?.TouchedPrice) != 0 && (
                            <div className="item">
                                <span className="item__label">觸發價格</span>
                                <span className="item__val">{getTouchPrice(info)}</span>
                            </div>
                        )}
                    </div>
                    <div className="item">
                        <span className="item__label">委託時間</span>
                        <span className="item__val">{getTimerHandler(info)}</span>
                    </div>
                    {info.CodeMsg && (
                        <div className="item">
                            <span className="item__label">失敗原因</span>
                            <span className="item__val">{info.CodeMsg}</span>
                        </div>
                    )}
                </div>
                <div className="btn__container">
                    {showHandler() && (
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
                                dispatch(setConfirmBoxTitle('刪改委託單'));
                                dispatch(setConfirmBoxClickSource('detail'));
                            }}
                        >
                            刪改委託單
                        </Button>
                    )}
                    <Button
                        style={{
                            height: '60px',
                            width: showHandler() ? 'calc( 50% - 8px )' : '100%',
                            backgroundColor: '#254a91',
                            color: 'white',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            border: 'none',
                        }}
                        onClick={() => {
                            window.open(process.env.NEXT_PUBLIC_SUBPATH + '/TradingAccount?option=SB&tab=position');
                        }}
                        // loading={}
                    >
                        查看庫存
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .info__icon {
                    margin-left: 6px;
                    margin-top: -4px;
                }
                .detail__container {
                    padding: 16px 16px 0 16px;
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

                .info__box {
                    margin-top: 13px;
                }
                .info__box--left {
                    display: inline-block;
                    width: 50%;
                }
                .info__box--right {
                    display: inline-block;
                    width: 50%;
                    vertical-align: top;
                }
                .item__label {
                    color: #0d1623;
                    font-size: 1.6rem;
                }
                .item__val {
                    color: #0d1623;
                    font-size: 1.6rem;
                    padding-left: 8px;
                    font-weight: bold;
                }
                .item {
                    margin-top: 8px;
                }
                .btn__container {
                    font-size: 0;
                    width: 100%;
                    /* margin-top: 35px; */
                    position: absolute;
                    padding-right: 32px;
                    top: 312px;
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
                .detail__container .ant-btn:disabled {
                    color: white !important;
                }
            `}</style>
        </>
    );
};

export default DetailBox;

import { useSelector, useDispatch } from 'react-redux';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import {
    mappingCommissionedCode,
    mappingWebId,
    mappingPriceMsg,
    mappingStatusMsg,
} from '../../../../services/components/goOrder/dataMapping';
import { timeFormatter } from '../../../../services/timeFormatter';
import { themeColor } from '../panel/PanelTabs';
import { setConfirmBoxTitle, setConfirmBoxClickSource } from '../../../../store/goOrder/action';
import infoIcon from '../../../../resources/images/components/goOrder/attention-info-circle.svg';

const DetailBox = () => {
    const dispatch = useDispatch();
    const info = useSelector(store => store.goOrder.confirmBoxChanValInfo);
    return (
        <>
            <div className="detail__container">
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
                                <>
                                    <span>委託時間</span>
                                    <span className="tooltip__val">{timeFormatter(info.ord_time, false)}</span>
                                    <br />
                                    <span>委託條件 </span>
                                    <span className="tooltip__val">{info.time_in_force}</span>
                                    <br />
                                    <span>委託書號 </span>
                                    <span className="tooltip__val">{info.ord_no}</span>
                                    <br />
                                    <span>網路單號 </span>
                                    <span className="tooltip__val">{info.sord_seq}</span>
                                    <br />
                                    <span>下單來源</span>
                                    <span className="tooltip__val">{mappingWebId(info.web_id)}</span>
                                </>
                            }
                            color="white"
                        >
                            <img className="info__icon" src={infoIcon} />
                        </Tooltip>
                    </div>
                </div>
                <div className="info__box">
                    <div className="info__box--left">
                        <div className="item">
                            <span className="item__label">委託價格</span>
                            <span className="item__val">
                                {mappingPriceMsg(info.price, info.price_type, info.price_flag, info.ord_type1)}
                            </span>
                        </div>
                        <div className="item">
                            <span className="item__label">取消數量</span>
                            <span className="item__val">{info.cancel_qty}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">成交均價</span>
                            <span className="item__val">{info.match_price}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">委託狀態</span>
                            <span className="item__val">{mappingStatusMsg(info.status_code)}</span>
                        </div>
                    </div>
                    <div className="info__box--right">
                        <div className="item">
                            <span className="item__label">委託數量</span>
                            <span className="item__val">{info.qty}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">剩餘數量</span>
                            <span className="item__val">{Number(info.qty) - Number(info.cancel_qty)}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">成交數量</span>
                            <span className="item__val">{info.match_qty}</span>
                        </div>
                        <div className="item">
                            <span className="item__label">委託時間</span>
                            <span className="item__val">{timeFormatter(info.ord_time, false)}</span>
                        </div>
                    </div>
                </div>
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
                            dispatch(setConfirmBoxTitle('刪改委託單'));
                            dispatch(setConfirmBoxClickSource('detail'));
                        }}
                    >
                        刪改委託單
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
                        // onClick={}
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

export default DetailBox;

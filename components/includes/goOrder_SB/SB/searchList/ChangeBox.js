import { useEffect, useState, useRef } from 'react';
import { Button, Tooltip, Modal, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import QtyBox from '../sbPanel/QtyBox';
import { themeColor } from '../../panel/PanelTabs';

const qtyUnit = 1;
const ChangeBox = ({ type, tabKey, btnClassName, info }) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="tradingInfo__container">
                <div className="title__box">
                    <span className="ord__char">{123}</span>
                    <div className="name__zh">
                        <span className="bs">{'買進'}</span>
                        {123}
                        {/* <Tooltip
                            placement="bottom"
                            title={
                                <>
                                    <span>買賣條件</span>
                                    <span className="tooltip__val">
                                        {mappingCommissionedCodeTradingAcc(
                                            info.ord_bs,
                                            info.ord_type2,
                                            info.market_id,
                                            info.ord_type1,
                                        )}
                                    </span>
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
                        </Tooltip> */}
                    </div>
                </div>

                <div className="price__box">
                    <span className="price__label">委託價格</span>
                    <span className="price__val">100</span>
                </div>
                <div className="qty__box">
                    <span className="qty__label">剩餘數量</span>
                    <span className="qty__val">{12}</span>
                    <span className="qty__unit">股</span>
                </div>
                <QtyBox label="欲減量" color="#254a91" />

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
                        // onClick={submitData}
                        // loading={submitLoading}
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

import { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import infoIcon from '../../../../../resources/images/components/goOrder/attention-info-circle.svg';
import { getCurrency, getPriceType, goOrderMapping } from '../../../../../services/components/goOrder/sb/dataMapping';
import { themeColor } from '../../panel/PanelTabs';
import moment from 'moment';
import { wordingService } from '../../../../../services/components/goOrder/sb/wordingService';

const TitleBox = ({ info, stockInfo, style, icon }) => {
    const [icons, setIcons] = useState([]);
    useEffect(() => {
        getIcon(info);
    }, [info]);
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
    const getType = () => {
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
    return (
        <div className="title__box" style={style ? style : {}}>
            {icons.map((icon, i) => (
                <span key={i} className="ord__char" style={{ backgroundColor: icon === '長' && '#6c7b94' }}>
                    {icon}
                </span>
            ))}

            <div className="name__zh">
                <span className="bs">{info.BS === 'B' ? '買進' : '賣出'}</span>
                <span>{wordingService(info.name, 13)}</span>
                {icon && (
                    <Tooltip
                        placement="bottom"
                        title={
                            <>
                                <span>買賣類別</span>
                                <span className="tooltip__val">{getType()}</span>
                                <br />
                                <span>幣別</span>
                                <span className="tooltip__val">{stockInfo['@CHCurrency']}</span>
                                <br />
                                <span>長效單</span>
                                <span className="tooltip__val">
                                    {info.GTCDate ? moment(info.GTCDate).format('YYYY/MM/DD') : '--'}
                                </span>
                                <br />
                                <span>委託書號</span>
                                <span className="tooltip__val">{info.OrderNo || '--'}</span>
                                <br />
                                <span>下單來源</span>
                                <span className="tooltip__val">{info.Source}</span>
                            </>
                        }
                        color="white"
                    >
                        <img className="info__icon" src={infoIcon} />
                    </Tooltip>
                )}
            </div>
            <style jsx>{`
                .info__icon {
                    margin-left: 6px;
                    margin-top: -4px;
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
                @media (max-width: 340px) {
                    .name__zh {
                        font-size: 20px;
                    }
                }
                .bs {
                    color: ${info.BS === 'B' ? themeColor.buyTabColor : themeColor.sellTabColor};
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
        </div>
    );
};

export default TitleBox;

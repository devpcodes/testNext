import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { checkServer } from '../../../../services/checkServer';
const FiveLatestOffer = () => {
    const solaceData = useSelector(store => store.solace.solaceData);
    const renderBidPrice = (priceKey, volumeKey) => {
        let data = [];
        if (!checkServer() && solaceData.length > 0 && solaceData[0].topic != null) {
            if (solaceData[0].topic.indexOf('SNP') >= 0 || solaceData[0].topic.indexOf('QUT' >= 0)) {
                //2345 我要的symbol，先寫死做測試
                let data = solaceData.filter(sItem => sItem.topic.indexOf('2345') >= 0);
                if (data.length > 0) {
                    let volumeSum = 0;
                    data[0].data[volumeKey].forEach((item, index) => {
                        volumeSum += data[0].data[volumeKey][index];
                    });
                    return data[0].data[priceKey].map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <span className="hL"></span>
                                <span className="volume">{data[0].data[volumeKey][index]}</span>
                                <div className="box">
                                    <div
                                        className="box__content"
                                        style={{
                                            width: Math.round((data[0].data[volumeKey][index] * 100) / volumeSum) + '%',
                                        }}
                                    ></div>
                                </div>
                                <span className="price">{item}</span>
                            </div>
                        );
                    });
                }
            }
        }
        if (Object.keys(solaceData).length == 0 || data.length === 0) {
            return [1, 2, 3, 4, 5].map((item, index) => (
                <div className="item" key={index}>
                    <span className="hL"></span>
                    <span className="volume">0</span>
                    <div className="box">
                        <div className="box__content"></div>
                    </div>
                    <span className="price">--</span>
                </div>
            ));
        }
    };
    console.log('solaceData.....', solaceData);
    return (
        <>
            <div className="five__container">
                <span className="blackLine"></span>
                <div className="buySell__header">
                    <div className="buySell__left">
                        <span className="header__lText header__text">買量</span>
                        <span className="header__rText header__text">買進</span>
                    </div>
                    <div className="buySell__right">
                        <span className="header__text">賣出</span>
                        <span className="header__rText header__text">賣量</span>
                    </div>
                </div>
                <div className="five__content">
                    <div className="buy__box">{renderBidPrice('BidPrice', 'BidVolume')}</div>
                    <div className="sell__box">{renderBidPrice('AskPrice', 'AskVolume')}</div>
                </div>
                <span className="blackLine"></span>
            </div>
            <style jsx>{`
                .five__container {
                    padding: 0 16px;
                }
                .blackLine {
                    display: block;
                    margin-top: 8px;
                    height: 1px;
                    background: #0d1623;
                }
                .blackLine:last-child {
                    margin-top: 2px;
                }
                .buySell__header {
                    height: 24px;
                    margin: 0 0 3px;
                    padding: 0 0 3px;
                    background-color: #e6ebf5;
                    font-size: 0;
                }
                .buySell__left {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-left: 15px;
                    margin-right: 8px;
                }
                .buySell__right {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-right: 20px;
                    margin-left: 8px;
                }
                .header__rText {
                    float: right;
                }
                .header__text {
                    line-height: 24px;
                }
            `}</style>
            <style jsx global>{`
                .five__container .item {
                    font-size: 1.6rem;
                    font-weight: bold;
                    height: 22px;
                    clear: both;
                }
                @media (max-width: 350px) {
                    .five__container .item {
                        font-size: 1.4rem;
                    }
                }
                .five__container .buy__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                }
                .five__container .sell__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                    float: right;
                }
                .five__container .sell__box .item {
                    margin-bottom: 2px;
                }
                .five__container .hL {
                    width: 15px;
                    display: inline-block;
                }
                .five__container .sell__box .hL {
                    float: right;
                }
                .five__container .sell__box .box__content {
                    background-color: #22a16f;
                }
                .five__container .volume {
                    width: 45px;
                    display: inline-block;
                }
                .five__container .price {
                    width: 45px;
                    display: inline-block;
                    text-align: right;
                }
                @media (max-width: 350px) {
                    .five__container .volume {
                        width: 38px;
                    }
                    .five__container .price {
                        width: 38px;
                    }
                    .five__container .sell__box .item {
                        margin-bottom: 0;
                    }
                }
                .five__container .buy__box .price {
                    float: right;
                }
                .five__container .box {
                    width: calc(100% - 110px);
                    height: 8px;
                    display: inline-block;
                    padding-right: 5px;
                    vertical-align: top;
                    margin-top: 8px;
                }
                @media (max-width: 350px) {
                    .five__container .box {
                        width: calc(100% - 96px);
                        margin-top: 6px;
                    }
                }
                .five__container .box__content {
                    width: 100%;
                    height: 8px;
                    background: #c43826;
                    vertical-align: middle;
                    float: right;
                }
            `}</style>
        </>
    );
};

export default FiveLatestOffer;

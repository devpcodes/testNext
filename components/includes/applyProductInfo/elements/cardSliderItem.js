import { useState, useEffect } from 'react';
import SubscriptionCards from '../../subscription/subscriptionCards';
import { Carousel } from 'antd';
import { PlusOutlined, InfoCircleFilled } from '@ant-design/icons';
const CardSliderItem = ({ rowData, itemNum = 3 }) => {
    const [origin, setOrigin] = useState([]);
    const [side, setSide] = useState(true);

    useEffect(() => {
        setOrigin(rowData);
    }, [rowData]);

    const cardFlipFunc = side => {
        if (side == 'A') {
            setSide(true);
        } else {
            setSide(false);
        }
    };

    return (
        <div className={'slideCard ' + (side ? 'ASide' : 'BSide')}>
            <div className="flipBox">
                <div className="slideCardType TypeA">
                    <div className="slideCardTypeInner">
                        <SubscriptionCards
                            stockData={rowData}
                            activeBtn={true}
                            footerHidden={true}
                            clickToFlip={cardFlipFunc}
                            settingDate={new Date(rowData.settingDate)}
                        />
                        <div className="activeBtnBox">
                            <a onClick={cardFlipFunc.bind(null, 'B')}>
                                <PlusOutlined />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="slideCardType TypeB">
                    <div className="slideCardTypeInner">
                        <div>
                            <p>最低只須</p>
                            <p>
                                <span>{origin.lowest}</span> 元
                            </p>
                            <p>買個中籤夢！</p>
                        </div>
                        <div>
                            <p className="flexBox">
                                <span>申購處理費</span>
                                <span>{origin.m1} 元</span>
                            </p>
                            <p className="flexBox">
                                <span>金流服務費</span>
                                <span>{origin.m2} 元</span>
                            </p>
                            <p className="flexBox">
                                <span>未中籤退款日還款利息</span>
                                <span>{origin.m3} 元</span>
                            </p>
                        </div>
                        <div className="flexBox">
                            <a>
                                <InfoCircleFilled />
                            </a>
                            <p>試算說明：借款金額 × 最低利率 × (借款天數 / 365 天)，最低利率依銀行公告為準。</p>
                        </div>
                        <div>
                            <a onClick={cardFlipFunc.bind(null, 'A')} className="closeBtn">
                                <PlusOutlined />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="slideCardType BaseType"></div>
            </div>

            <style jsx>{`
                .flexBox {
                    display: flex;
                    justify-content: space-between;
                }
                .TypeB .Inner > div {
                    font-size: 16px;
                }
                .TypeB .slideCardTypeInner > div > p {
                    margin-bottom: 0px;
                }
                .TypeB .slideCardTypeInner > div:nth-child(1) p {
                    text-align: center;
                    color: #fff;
                    line-height: 1.5;
                }
                .TypeB .slideCardTypeInner > div:nth-child(1) p:nth-child(2) {
                    color: #f45a4c;
                }
                .TypeB .slideCardTypeInner > div:nth-child(1) p:nth-child(2) span {
                    font-size: 48px;
                    font-weight: bold;
                }
                .TypeB .slideCardTypeInner > div:nth-child(1) p:nth-child(3) {
                    padding-left: 0.5em;
                }
                .TypeB .slideCardTypeInner > div:nth-child(2) {
                    width: 96%;
                    max-width: 295px;
                    background-color: #3f5372;
                    color: #a9b6cb;
                    margin: 15px auto;
                    padding: 0.5em 1em;
                    border-radius: 2px;
                }
                .TypeB .slideCardTypeInner > div:nth-child(2) p {
                    line-height: 2;
                }
                .TypeB .slideCardTypeInner > div:nth-child(3) {
                    color: #6c7b94;
                    font-size: 14px;
                    width: 96%;
                    max-width: 295px;
                    margin: 0 auto;
                }
                .TypeB .slideCardTypeInner > div:nth-child(3) p {
                    padding-left: 0.5em;
                }
                .TypeB .slideCardTypeInner > div:nth-child(4) {
                    text-align: center;
                    color: #fff;
                    font-size: 30px;
                    margin-top: 10px;
                }
                .TypeB .slideCardTypeInner > div:nth-child(4) a span {
                }
                .slideCard {
                    position: relative;
                    min-height: 380px;
                }
                .flipBox {
                    position: relative;
                    perspective: 1000px;
                }
                .slideCardType {
                    position: absolute;
                    border: 1px solid #d7e0ef;
                    border-radius: 2px;
                    padding: 24px 24px 16px;
                    width: 100%;
                    height: 400px;
                    max-width: 342px;
                    backface-visibility: hidden;
                    transition: 1s;
                }
                .BaseType {
                    position: relative;
                    background: tansparent;
                    pointer-events: none;
                    border: none;
                }
                .TypeA {
                    z-index: 10;
                    background: #fff;
                    transform: rotateY(0deg);
                }
                .TypeB {
                    z-index: 0;
                    background: #192639;
                    transform: rotateY(-180deg);
                }

                .BSide .TypeA {
                    transform: rotateY(180deg);
                }
                .BSide .TypeB {
                    transform: rotateY(0deg);
                }
                .activeBtnBox {
                    text-align: center;
                    border-top: 1px solid #d7e0ef;
                    margin-top: 25px;
                    padding-top: 15px;
                }
                .activeBtnBox a {
                    font-size: 26px;
                    line-height: 1;
                    text-align: center;
                    display: inline-block;
                    color: #a9b6cb;
                }
                @media (max-width: 768px) {
                    .slideCard {
                        min-height: 400px;
                    }
                    .TypeB .slideCardTypeInner > div > p {
                        letter-spacing: -0.05em;
                    }
                }
                @media (max-width: 500px) {
                    .slideCard {
                    }
                }
                @media (max-width: 374px) {
                    .slideCardType .TypeA {
                        padding: 6%;
                    }
                }
            `}</style>
            <style jsx global>{`
                #cardSlider__container .closeBtn span {
                    transform: rotate(45deg);
                }
                #cardSlider__container .slick-list {
                    overflow-y: visible;
                    overflow-x: clip;
                }
            `}</style>
        </div>
    );
};

export default CardSliderItem;

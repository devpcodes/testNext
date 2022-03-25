import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useCallback, useState, memo } from 'react';
import { Card } from 'antd';
import leftAllow from '../../../resources/images/pages/asset/ic-ic-arrow-chevron-left@2x.png';
import rightAllow from '../../../resources/images/pages/asset/ic-ic-arrow-chevron-right@2x.png';

const AssetCarouselOverview = memo(({}) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1200, min: 464 },
            items: 3,
        },
    };

    const CustomLeftArrow = ({ onClick }) => {
        return (
            <>
                <div className="left__arrow" onClick={() => onClick()}>
                    <img src={leftAllow} alt={'leftAllow'}></img>
                </div>
            </>
        );
    };

    const CustomRightArrow = ({ onClick }) => {
        return (
            <>
                <div className="right__arrow" onClick={() => onClick()}>
                    <img src={rightAllow} alt={'rightAllow'}></img>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="asset__carousel__overview">
                <Carousel
                    responsive={responsive}
                    shouldResetAutoplay={false}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                    itemClass="card__items"
                >
                    <div className="carousel__card">
                        <Card title="國內證券 (12.58%)">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="海外證券 (3.2%)">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="期權 (10.2%)">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="基金 ( 18.25%)">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="債券 ( 0%)">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="結構型">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="在途款">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title="約當現金">
                            <p className="asset__carousel__amount">$16,954,147</p>
                        </Card>
                    </div>
                </Carousel>
            </div>

            <style jsx>{`
                .asset__carousel__overview {
                    margin: 20px -20px 20px 0;
                }
                .asset__carousel__amount {
                    font-size: 24px;
                    font-weight: bold;
                    color: #0d1623;
                    margin: 0;
                }
                .carousel__card {
                    margin: 0px 0px;
                }
            `}</style>
            <style jsx global>{`
                .asset__carousel__overview .ant-card-head {
                    background-color: #f2f5fa;
                    color: #3f5372;
                    min-height: 39px;
                    border-bottom: solid 1px #d7e0ef;
                }

                .asset__carousel__overview .ant-card-head-title {
                    text-align: center;
                    padding: 7px 0;
                }

                .asset__carousel__overview .ant-card-bordered {
                    border-radius: 2px;
                    border-top: solid 1px #d7e0ef;
                    border-left: solid 1px #d7e0ef;
                    border-right: solid 1px #d7e0ef;
                }

                .asset__carousel__overview .ant-card-body {
                    border-bottom: solid 1px #d7e0ef;
                    padding: 11px 24px;
                    text-align: center;
                }

                .asset__carousel__overview .react-multi-carousel-list {
                    position: inherit;
                }

                .asset__carousel__overview .card__items {
                    padding-right: 20px;
                }

                .asset__carousel__overview .right__arrow {
                    position: absolute;
                    z-index: 1000;
                    border: 0;
                    min-width: 40px;
                    min-height: 40px;
                    opacity: 1;
                    cursor: pointer;
                    right: calc(4% + 1px);
                }

                .asset__carousel__overview .left__arrow {
                    position: absolute;
                    z-index: 1000;
                    border: 0;
                    min-width: 40px;
                    min-height: 40px;
                    opacity: 1;
                    cursor: pointer;
                    left: calc(4% + 1px);
                }
            `}</style>
        </>
    );
});

export default AssetCarouselOverview;

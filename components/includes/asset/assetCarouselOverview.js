import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useCallback, useState, memo, useEffect } from 'react';
import { Card } from 'antd';
import leftAllow from '../../../resources/images/pages/asset/ic-ic-arrow-chevron-left@2x.png';
import rightAllow from '../../../resources/images/pages/asset/ic-ic-arrow-chevron-right@2x.png';
import { useSelector, useDispatch } from 'react-redux';
import { formatNum } from '../../../services/formatNum';

const AssetCarouselOverview = memo(({}) => {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    const realTimePrtLosSumTotal = useSelector(store => store.asset.realTimePrtLosSum.total);
    const [domData, setDomData] = useState({});
    useEffect(() => {
        const data = {
            // 證券
            S: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat((realTimePrtLosSum?.S.sum_namt / realTimePrtLosSumTotal) * 100).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.S.sum_namt), // 總額
            },
            // 基金
            OF: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              ((parseInt(realTimePrtLosSum?.OF.sum_twd) +
                                  parseInt(realTimePrtLosSum?.WM_FUND.sum_twd)) /
                                  realTimePrtLosSumTotal) *
                                  100,
                          ).toFixed(2)
                        : '--',
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.OF.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND.sum_twd),
                ),
            },
            F: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              ((parseInt(realTimePrtLosSum?.F.sum_balv) +
                                  parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd)) /
                                  realTimePrtLosSumTotal) *
                                  100,
                          ).toFixed(2)
                        : '--',
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.F.sum_balv) + parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd),
                ),
            },
            H: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              ((parseInt(realTimePrtLosSum?.H.sum_twd) +
                                  parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                                  parseInt(realTimePrtLosSum?.MIP.sum_twd)) /
                                  realTimePrtLosSumTotal) *
                                  100,
                          ).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd),
                ), // 總額
            },
            BOND: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              (realTimePrtLosSum?.BOND.sum_total_value_twd / realTimePrtLosSumTotal) * 100,
                          ).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.BOND.sum_total_value_twd), // 總額
            },
            SN: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              (parseInt(realTimePrtLosSum?.SN.sum_twd) +
                                  parseInt(realTimePrtLosSum?.WM_SN.sum_twd) / realTimePrtLosSumTotal) *
                                  100,
                          ).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.SN.sum_twd) + parseInt(realTimePrtLosSum?.WM_SN.sum_twd),
                ), // 總額
            },
            INTRANSIT: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              (realTimePrtLosSum?.WM_FUND_INTRANSIT.sum_twd / realTimePrtLosSumTotal) * 100,
                          ).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.WM_FUND_INTRANSIT.sum_twd), // 總額
            },
            DEPOSIT: {
                total_proportion:
                    parseInt(realTimePrtLosSumTotal) != 0
                        ? parseFloat(
                              (realTimePrtLosSum?.WM_TRUST_DEPOSIT.sum_twd / realTimePrtLosSumTotal) * 100,
                          ).toFixed(2)
                        : '--', // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.WM_TRUST_DEPOSIT.sum_twd), // 總額
            },
        };
        setDomData(data);
    }, [realTimePrtLosSum]);

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
                        <Card title={`國內證券 (${domData.S?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.S?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`海外證券 (${domData.H?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.H?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`期權 (${domData.F?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.F?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`基金 (${domData.OF?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.OF?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`債券 (${domData.BOND?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.BOND?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`結構型 (${domData.SN?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.SN?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`在途款 (${domData.INTRANSIT?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.INTRANSIT?.sum_amt}</p>
                        </Card>
                    </div>
                    <div className="carousel__card">
                        <Card title={`約當現金 (${domData.DEPOSIT?.total_proportion}%)`}>
                            <p className="asset__carousel__amount">${domData.DEPOSIT?.sum_amt}</p>
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

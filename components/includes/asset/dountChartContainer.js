import { useCallback, useState, memo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { formatNum } from '../../../services/formatNum';
const DountChart = dynamic(() => import('./dountChart'), { ssr: false });

const DountChartContainer = memo(({}) => {
    const realTimePrtLosSum = useSelector(store => store.asset.realTimePrtLosSum.data);
    const realTimePrtLosSumTotal = useSelector(store => store.asset.realTimePrtLosSum.total);
    const [domData, setDomData] = useState({});
    useEffect(() => {
        const data = {
            // 證券
            S: {
                total_proportion: parseFloat((realTimePrtLosSum?.S.sum_amt / realTimePrtLosSumTotal) * 100).toFixed(2), // 總佔比
                sum_amt: formatNum(realTimePrtLosSum?.S.sum_amt), // 總額
                profit_loss_percent: formatNum(
                    parseFloat(
                        ((realTimePrtLosSum?.S.sum_amt - realTimePrtLosSum?.S.sum_cost) /
                            realTimePrtLosSum?.S.sum_cost) *
                            100,
                    ).toFixed(2),
                ),
                is_profit: realTimePrtLosSum?.S.sum_amt - realTimePrtLosSum?.S.sum_cost >= 0 ? true : false,
            },
            // 基金
            OF: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.OF.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND.sum_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2),
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.OF.sum_twd) + parseInt(realTimePrtLosSum?.WM_FUND.sum_twd),
                ),
            },
            F: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.F.sum_balv) + parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2),
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.F.sum_balv) + parseInt(realTimePrtLosSum?.FF.sum_dlbaln_twd),
                ),
            },
            H: {
                total_proportion: parseFloat(
                    ((parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd)) /
                        realTimePrtLosSumTotal) *
                        100,
                ).toFixed(2), // 總佔比
                sum_amt: formatNum(
                    parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd),
                ), // 總額
                profit_loss_percent: (
                    ((parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd) -
                        (parseInt(realTimePrtLosSum?.H.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.FIP.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.MIP.sum_cost_twd))) /
                        (parseInt(realTimePrtLosSum?.H.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.FIP.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.MIP.sum_cost_twd))) *
                    100
                ).toFixed(2),
                is_profit:
                    parseInt(realTimePrtLosSum?.H.sum_twd) +
                        parseInt(realTimePrtLosSum?.FIP.sum_twd) +
                        parseInt(realTimePrtLosSum?.MIP.sum_twd) -
                        (parseInt(realTimePrtLosSum?.H.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.FIP.sum_cost_twd) +
                            parseInt(realTimePrtLosSum?.MIP.sum_cost_twd)) >=
                    0
                        ? true
                        : false,
            },
        };
        setDomData(data);
    }, [realTimePrtLosSum]);
    return (
        <>
            <div className="dountchart__container">
                <DountChart />

                <div className="dount__desc funds">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>基金{' '}
                        <span className="pl__percent">({domData.OF?.total_proportion}%)</span>
                    </p>
                    <p className="dount__desc__amount">${domData.OF?.sum_amt}</p>
                    {/* <p className="dount__desc__pl loss">損益 -5.05%</p> OF 沒有成本   */}
                </div>

                <div className="dount__desc stock">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>國內證券{' '}
                        <span className="pl__percent">({domData.S?.total_proportion}%)</span>
                    </p>
                    <p className="dount__desc__amount">${domData.S?.sum_amt}</p>
                    <p className={domData.S?.is_profit ? 'dount__desc__pl profit' : 'dount__desc__pl loss'}>
                        損益 {domData.S?.is_profit ? '+' : '-'}
                        {domData.S?.profit_loss_percent}%
                    </p>
                </div>

                <div className="dount__desc feature">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>期權{' '}
                        <span className="pl__percent">({domData.F?.total_proportion}%)</span>
                    </p>
                    <p className="dount__desc__amount">${domData.F?.sum_amt}</p>
                    {/* <p className="dount__desc__pl profit">損益 +5.26%</p> */}
                </div>

                <div className="dount__desc subBrokerage">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>海外證券{' '}
                        <span className="pl__percent">({domData.H?.total_proportion}%)</span>
                    </p>
                    <p className="dount__desc__amount">${domData.H?.sum_amt}</p>
                    <p className={domData.H?.is_profit ? 'dount__desc__pl profit' : 'dount__desc__pl loss'}>
                        損益 {domData.H?.is_profit ? '+' : '-'}
                        {domData.H?.profit_loss_percent}%
                    </p>
                </div>
            </div>

            <style jsx>{`
                .dountchart__container {
                    width: 300px;
                    height: 300px;
                    margin: 0 auto;
                    position: relative;
                }

                .dount__desc {
                    width: 150px;
                    position: absolute;
                }

                .dount__desc > p {
                    margin-bottom: 0.1rem;
                    font-weight: bold;
                    color: #0d1623;
                }

                .dount__desc > .dount__desc__name {
                    margin-left: -19px;
                    font-size: 1.6rem;
                }

                .dount__desc > .dount__desc__amount {
                }

                .dount__desc > .dount__desc__pl {
                    display: inline-block;
                    padding: 1px 5px;
                }

                .dount__desc > .dount__desc__pl.loss {
                }

                .dount__desc > .dount__desc__pl.profit {
                    background-color: rgb(244, 90, 76, 0.15);
                    color: #f45a4c;
                }

                .dount__desc > .dount__desc__pl.loss {
                    background-color: rgb(34, 161, 111, 0.15);
                    color: #22a16f;
                }

                .point__circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 10px;
                    margin-bottom: 2px;
                }

                .funds .point__circle {
                    background-color: #3f5372;
                }

                .stock .point__circle {
                    background-color: #c43826;
                }

                .feature .point__circle {
                    background-color: #daa360;
                }

                .subBrokerage .point__circle {
                    background-color: #192639;
                }

                .funds {
                    top: 0;
                    left: -130px;
                }

                .stock {
                    top: 0;
                    left: 365px;
                }

                .feature {
                    top: 226px;
                    left: -130px;
                }

                .subBrokerage {
                    top: 226px;
                    left: 365px;
                }

                @media (max-width: 900px) {
                    .funds {
                        top: 0;
                        left: -60px;
                    }

                    .stock {
                        top: 0;
                        left: 275px;
                    }

                    .feature {
                        top: 226px;
                        left: -60px;
                    }

                    .subBrokerage {
                        top: 226px;
                        left: 275px;
                    }
                }

                @media (max-width: 768px) {
                    .dount__desc__amount,
                    .dount__desc > .dount__desc__pl {
                        display: none;
                    }
                    .pl__percent {
                        display: block;
                        margin-left: 19px;
                    }
                    .funds {
                        top: 0;
                        left: 0;
                    }

                    .stock {
                        top: 0;
                        left: 255px;
                    }

                    .feature {
                        top: 250px;
                        left: 0;
                    }

                    .subBrokerage {
                        top: 250px;
                        left: 255px;
                    }
                }
            `}</style>
            <style jsx global>{``}</style>
        </>
    );
});

export default DountChartContainer;

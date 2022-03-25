import { useCallback, useState, memo } from 'react';
import dynamic from 'next/dynamic';
const DountChartContainer = memo(({}) => {
    const DountChart = dynamic(() => import('./dountChart'), { ssr: false });

    return (
        <>
            <div className="dountchart__container">
                <DountChart />

                <div className="dount__desc funds">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>基金 <span className="pl__percent">(18.25%)</span>
                    </p>
                    <p className="dount__desc__amount">$135,000</p>
                    <p className="dount__desc__pl loss">損益 -5.05%</p>
                </div>

                <div className="dount__desc stock">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>國內證券 <span className="pl__percent">(12.8%)</span>
                    </p>
                    <p className="dount__desc__amount">$16,954,147</p>
                    <p className="dount__desc__pl profit">損益 +5.26%</p>
                </div>

                <div className="dount__desc feature">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>期權 <span className="pl__percent">(10.2%)</span>
                    </p>
                    <p className="dount__desc__amount">$980,000</p>
                    <p className="dount__desc__pl profit">損益 +5.26%</p>
                </div>

                <div className="dount__desc subBrokerage">
                    <p className="dount__desc__name">
                        <span className="point__circle"></span>海外證券 <span className="pl__percent">(3.2%)</span>
                    </p>
                    <p className="dount__desc__amount">$180,482</p>
                    <p className="dount__desc__pl loss">損益 -5.05%</p>
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

                @media (max-width: 800px) {
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

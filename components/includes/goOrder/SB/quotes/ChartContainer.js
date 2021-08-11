import { useRef, useEffect, useState } from 'react';
import Chart from '../Chart';

const ChartContainer = ({ getHeight, bottomLineVisible }) => {
    const chartElement = useRef(null);
    const [chartWidth, setChartWidth] = useState(0);
    useEffect(() => {
        if (chartElement.current != null) {
            // console.log('hh', chartElement.current.clientHeight)
            if (getHeight != null) {
                getHeight(chartElement.current.clientHeight + 5);
                setChartWidth(chartElement.current.clientWidth - 30);
                console.log('wwwwwwww', chartElement.current.clientWidth);
            }
        }
    });
    return (
        <>
            <div className="chart__container" ref={chartElement}>
                {/* <div className="chart__info">
                    <span className="text">報價時間／美東，幣別／美金</span>
                    <span className="line"></span>
                </div> */}
                <div className="chart">
                    {/* {bottomLineVisible && <Chart width={chartWidth}/>} */}
                    <Chart width={chartWidth} visible={bottomLineVisible} />
                </div>
                <div className="bottom__line"></div>
            </div>
            <style jsx>{`
                .chart__container {
                    padding-right: 16px;
                    padding-left: 16px;
                }
                .chart__info {
                    display: flex;
                }
                .line {
                    display: inline-block;
                    background-color: #0d1623;
                    width: 100%;
                    height: 1px;
                    justify-content: space-between;
                    margin-top: 7px;
                }
                .text {
                    justify-content: space-between;
                    white-space: nowrap;
                    margin-right: 8px;
                    color: #0d1623;
                    font-size: 1.2rem;
                }
                .chart {
                    width: 343px;
                    height: 205px;
                }
                .bottom__line {
                    background-color: #0d1623;
                    width: 100%;
                    height: ${bottomLineVisible ? '1px' : 0};
                }
            `}</style>
        </>
    );
};
export default ChartContainer;

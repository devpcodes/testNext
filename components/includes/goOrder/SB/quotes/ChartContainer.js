const ChartContainer = () => {
    return (
        <>
            <div className="chart__container">
                <div className="chart__info">
                    <span className="text">報價時間／美東，幣別／美金</span>
                    <span className="line"></span>
                </div>
                <div className="chart"></div>
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
                    height: 1px;
                }
            `}</style>
        </>
    );
};
export default ChartContainer;

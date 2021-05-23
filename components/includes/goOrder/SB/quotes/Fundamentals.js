const Fundamentals = () => {
    return (
        <>
            <div className="container">
                <div className="up">
                    <div className="item">
                        <span className="item__key">昨收</span>
                        <span className="item__value">152.3</span>
                    </div>
                    <div className="item">
                        <span className="item__key">市值</span>
                        <span className="item__value">120.5兆</span>
                    </div>
                    <div className="item">
                        <span className="item__key">交易量</span>
                        <span className="item__value">32.5億</span>
                    </div>
                </div>
                <div className="up">
                    <div className="item">
                        <span className="item__key">本益比</span>
                        <span className="item__value">32.44</span>
                    </div>
                    <div className="item">
                        <span className="item__key">值利率</span>
                        <span className="item__value">0.68%</span>
                    </div>
                    <div className="item">
                        <span className="item__key">股息</span>
                        <span className="item__value">3.31</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container {
                    padding: 16px;
                }
                .up {
                    display: flex;
                    justify-content: space-between;
                }
                .up:last-child {
                    margin-top: 6px;
                }
                .item {
                    width: 32%;
                    font-size: 1.6rem;
                    display: inline-block;
                    position: relative;
                    margin-right: 9px;
                }
                .item:last-child {
                    margin-right: 0;
                }
                .item__key {
                    width: 49px;
                    color: #6c7b94;
                }
                .item__value {
                    text-align: right;
                    width: 59px;
                    position: absolute;
                    right: 0;
                    color: #0d1623;
                    font-weight: bold;
                }
            `}</style>
        </>
    );
};

export default Fundamentals;

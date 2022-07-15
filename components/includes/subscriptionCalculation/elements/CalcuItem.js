const CalcuItem = ({ style }) => {
    return (
        <div className="item__container" style={style}>
            <div className="label">申購款</div>
            <div>
                <span className="val__num">20,070</span>
                <span className="val__unit">元</span>
            </div>
            <style jsx>{`
                .item__container {
                    display: flex;
                    justify-content: space-between;
                }
                .label {
                    font-size: 16px;
                    letter-spacing: 0.4px;
                    color: #3f5372;
                }
                .val__num {
                    font-weight: bold;
                    color: #0d1623;
                    font-size: 16px;
                }
                .val__unit {
                    font-weight: bold;
                    color: #0d1623;
                    font-size: 16px;
                    margin-left: 2px;
                }
            `}</style>
        </div>
    );
};

export default CalcuItem;

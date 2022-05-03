const MoneyBox = ({ title, data, style }) => {
    return (
        <div className="money__container" style={style}>
            <div className="money__header">{title}</div>
            <div className="money__content">
                {data.map((element, index) => {
                    return (
                        <>
                            <div className="money__item">
                                <p className="money__label">{element.label}</p>
                                <p className="money__val">{element.val}</p>
                            </div>
                            {index !== data.length - 1 && <div className="money__line"></div>}
                        </>
                    );
                })}
            </div>
            <style jsx>{`
                .money__container {
                    height: 130px;
                    border-radius: 2px;
                    border: solid 1px #d7e0ef;
                    background-color: #fff;
                }
                .money__header {
                    height: 39px;
                    background-color: #f2f5fa;
                    border-bottom: 1px solid #d7e0ef;
                    text-align: center;
                    color: #3f5372;
                    font-size: 16px;
                    line-height: 39px;
                }
                .money__content {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 22px;
                }
                .money__label {
                    text-align: center;
                    color: #3f5372;
                    font-size: 14px;
                    margin-bottom: 0;
                    /* margin-top: 18px; */
                }
                .money__val {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    color: #0d1623;
                    margin-bottom: 0;
                    margin-top: -4px;
                }
                .money__line {
                    width: 1px;
                    height: 44px;
                    background-color: #d7e0ef;
                }
                .money__item {
                    flex: 1 0 0;
                }
            `}</style>
        </div>
    );
};

export default MoneyBox;

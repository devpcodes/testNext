const QuotesDetail = () => {
    return (
        <>
            <div className="quotes__container">
                <div className="item__container--top">
                    <div className="item__box">
                        <span className="label">昨收</span>
                        <button className="item">489.0</button>
                    </div>
                    <div className="item__box">
                        <span className="label">開盤</span>
                        <button className="item">493.0</button>
                    </div>
                    <div className="item__box">
                        <span className="label">金額(億)</span>
                        <span className="item">579</span>
                    </div>
                </div>
                <div>
                    <div className="item__box">
                        <span className="label">最高</span>
                        <button className="item">493.5</button>
                    </div>
                    <div className="item__box">
                        <span className="label">最低</span>
                        <button className="item">480.0</button>
                    </div>
                    <div className="item__box">
                        <span className="label">均價</span>
                        <button className="item">483.1</button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .item {
                    margin: 0;
                    padding: 0;
                    border: none;
                    outline: none;
                    background-color: white;
                    font-size: 1.6rem;
                    float: right;
                    font-weight: bold;
                    color: #0d1623;
                }

                .label {
                    height: 22px;
                    margin: 0;
                    font-size: 1.6rem;
                    font-weight: 500;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #0d1623;
                    font-weight: bold;
                }
                @media (max-width: 350px) {
                    .item {
                        font-size: 1.4rem;
                    }
                    .label {
                        font-size: 1.4rem;
                    }
                }
                .item__box {
                    font-size: 0;
                    display: inline-block;
                    width: calc((100% - 18px) / 3);
                    margin-right: 9px;
                }
                .item__box:last-child {
                    margin-right: 0;
                }
                .item__container--top {
                    margin-bottom: 4px;
                }
                .quotes__container {
                    padding: 0 16px;
                }
            `}</style>
        </>
    );
};

export default QuotesDetail;

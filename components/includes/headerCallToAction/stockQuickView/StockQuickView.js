export const StockQuickView = () => {
    return (
        <>
            <div className="StockQuickView__container">
                <p>國內證券未實現損益</p>
                <p className="unrealized">-55213</p>
                <div className="settlementMoney__box">
                    <p>當日交割款</p>
                    <div className="currency__box">
                        <div className="currency__item">
                            <span className="currency">NTD</span>
                            <p className="amount">435100</p>
                        </div>
                        <div className="currency__item">
                            <span className="currency">USD</span>
                            <p className="amount">-315</p>
                        </div>
                        <div className="currency__item">
                            <span className="currency">CNY</span>
                            <p className="amount">-117</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .StockQuickView__container {
                    margin-top: 18px;
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                .StockQuickView__container p{
                    margin: 0;
                }
                .StockQuickView__container .unrealized {
                    font-size: 3rem;
                    color: #22a16f;
                    margin-top: 0.2rem;
                    font-weight: bold;
                }
                .currency {
                    border: 1px solid #a9b6cb;
                    border-radius: 3px;
                    font-size: 10px;
                    color: #a9b6cb;
                    padding: 0 1px;
                }
                .amount {
                    font-size: 2.6rem;
                    font-weight: bold;
                }
                .currency__item {
                    width: 50%;
                    display: inline-block;
                }
                /* .currency__box */
            `}</style>
        </>
    );
};

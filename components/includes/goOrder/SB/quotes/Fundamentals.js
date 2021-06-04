import { useSelector } from 'react-redux';
const Fundamentals = () => {
    const quote = useSelector(store => store.goOrderSB.quote);
    return (
        <>
            <div className="container">
                <div className="up">
                    <div className="item">
                        <span className="item__key">昨收</span>
                        <span className="item__value">{quote?.hc || '-'}</span>
                    </div>
                    <div className="item">
                        <span className="item__key">市值</span>
                        <span className="item__value mktVal">{quote?.mktvalue || '-'}</span>
                    </div>
                    <div className="item">
                        <span className="item__key">交易額</span>
                        <span className="item__value">{quote?.am || '-'}</span>
                    </div>
                </div>
                <div className="up">
                    <div className="item">
                        <span className="item__key">本益比</span>
                        <span className="item__value">{quote?.per || '-'}</span>
                    </div>
                    <div className="item">
                        <span className="item__key">殖利率</span>
                        <span className="item__value">{quote?.yield || '-'}</span>
                    </div>
                    <div className="item">
                        <span className="item__key">股息</span>
                        <span className="item__value">{quote?.div || '-'}</span>
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
                    font-size: 1.4rem;
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
                .mktVal {
                    width: 70px;
                    font-size: 1.4rem;
                    margin-top: 2px;
                }
                @media (max-width: 370px) {
                    .item {
                        font-size: 1.4rem;
                    }
                    .mktVal {
                        margin-top: 0;
                    }
                }
                @media (max-width: 340px) {
                    .mktVal {
                        font-size: 1.2rem;
                        margin-top: 2px;
                    }
                }
            `}</style>
        </>
    );
};

export default Fundamentals;

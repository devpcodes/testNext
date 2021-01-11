const FiveLatestOffer = () => {
    return (
        <>
            <div className="five__container">
                <span className="blackLine"></span>
                <div className="buySell__header">
                    <div className="buySell__left">
                        <span className="header__lText header__text">買量</span>
                        <span className="header__rText header__text">買進</span>
                    </div>
                    <div className="buySell__right">
                        <span className="header__text">賣出</span>
                        <span className="header__rText header__text">賣量</span>
                    </div>
                </div>
                <div className="five__content">
                    <div className="buy__box">
                        <div className="item">
                            <span className="hL"></span>
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                        </div>
                        <div className="item">
                            <span className="hL">L</span>
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                        </div>
                        <div className="item">
                            <span className="hL"></span>
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                        </div>
                        <div className="item">
                            <span className="hL"></span>
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                        </div>
                        <div className="item">
                            <span className="hL"></span>
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                        </div>
                    </div>
                    <div className="sell__box">
                        <div className="item">
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                            <span className="hL">H</span>
                        </div>
                        <div className="item">
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                            <span className="hL"></span>
                        </div>
                        <div className="item">
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                            <span className="hL"></span>
                        </div>
                        <div className="item">
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                            <span className="hL"></span>
                        </div>
                        <div className="item">
                            <span className="volume">467</span>
                            <div className="box">
                                <div className="box__content"></div>
                            </div>
                            <span className="price">435.5</span>
                            <span className="hL"></span>
                        </div>
                    </div>
                </div>
                <span className="blackLine"></span>
            </div>
            <style jsx>{`
                .five__container {
                    padding: 0 16px;
                }
                .blackLine {
                    display: block;
                    margin-top: 8px;
                    height: 1px;
                    background: #0d1623;
                }
                .blackLine:last-child {
                    margin-top: 2px;
                }
                .buySell__header {
                    height: 24px;
                    margin: 0 0 3px;
                    padding: 0 0 3px;
                    background-color: #e6ebf5;
                    font-size: 0;
                }
                .buySell__left {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-left: 15px;
                    margin-right: 8px;
                }
                .buySell__right {
                    display: inline-block;
                    width: calc(50% - 8px);
                    font-size: 1.2rem;
                    padding-right: 20px;
                    margin-left: 8px;
                }
                .header__rText {
                    float: right;
                }
                .header__text {
                    line-height: 24px;
                }

                .item {
                    font-size: 1.6rem;
                    font-weight: bold;
                    height: 22px;
                    clear: both;
                }
                @media (max-width: 350px) {
                    .item {
                        font-size: 1.4rem;
                    }
                }
                .buy__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                }
                .sell__box {
                    display: inline-block;
                    width: calc(50% - 8px);
                    float: right;
                }
                .sell__box .item {
                    margin-bottom: 2px;
                }
                .hL {
                    width: 15px;
                    display: inline-block;
                }
                .sell__box .hL {
                    float: right;
                }
                .sell__box .box__content {
                    background-color: #22a16f;
                }
                .volume {
                    width: 45px;
                    display: inline-block;
                }
                .price {
                    width: 45px;
                    display: inline-block;
                    text-align: right;
                }
                @media (max-width: 350px) {
                    .volume {
                        width: 38px;
                    }
                    .price {
                        width: 38px;
                    }
                    .sell__box .item {
                        margin-bottom: 0;
                    }
                }
                .buy__box .price {
                    float: right;
                }
                .box {
                    width: calc(100% - 110px);
                    height: 8px;
                    display: inline-block;
                    padding-right: 5px;
                    vertical-align: top;
                    margin-top: 8px;
                }
                @media (max-width: 350px) {
                    .box {
                        width: calc(100% - 96px);
                        margin-top: 6px;
                    }
                }
                .box__content {
                    width: 100%;
                    height: 8px;
                    background: #c43826;
                    vertical-align: middle;
                    float: right;
                }
            `}</style>
        </>
    );
};

export default FiveLatestOffer;

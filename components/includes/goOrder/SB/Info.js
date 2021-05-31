import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../../resources/styles/theme';
import { getArrow } from '../../../../services/numFormat';
import searchIcon from '../../../../resources/images/components/goOrder/edit-search.svg';
import MoreInfo from '../infoArea/MoreInfo';
import { Search } from '../search/Search';
import { InstallWebCA } from '../infoArea/InstallWebCA';
import UpdateBar from './UpdateBar';
import { getToken } from '../../../../services/user/accessToken';
import { fetchGetQuote } from '../../../../services/components/goOrder/sb/fetchGetQuote';
import { setProductInfo } from '../../../../store/goOrder/action';
import { getCodeType } from '../../../../services/components/goOrder/sb/dataMapping';
import { setQuote } from '../../../../store/goOrderSB/action';

export const defaultProductInfo = {
    symbol: 'AAPL',
    name: 'Apple',
    market: 'US',
    marketType: 'SB',
};
const Info = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const code = useSelector(store => store.goOrder.code);
    const type = useSelector(store => store.goOrder.type);
    const quote = useSelector(store => store.goOrderSB.quote);
    const dispatch = useDispatch();
    const [checkCA, setCheckCA] = useState(false);

    useEffect(() => {
        dispatch(setProductInfo(defaultProductInfo));
    }, [type]);

    useEffect(() => {
        if (productInfo.market) {
            const codeType = getCodeType(productInfo.market);
            getData(code + '.' + codeType);
        }
    }, [code, productInfo]);

    const getData = useCallback(async code => {
        const token = getToken();
        try {
            const res = await fetchGetQuote(code, token);
            console.log('res', res);
            dispatch(setQuote(res));
        } catch (error) {
            console.log(error);
        }
    });

    const getCloseInfo = () => {
        let nc = '';
        let pc = '';
        if (quote.nc != null) {
            nc = Math.abs(Number(quote.nc));
        }
        if (quote.pc != null) {
            pc = Math.abs(Number(quote.pc));
        }
        return `${quote?.ls || '--'} ${getArrow(quote?.ls, quote?.refprice)} ${nc} (${pc}%)`;
    };
    const handleCancel = useCallback(() => {
        setIsSearchVisible(false);
    }, []);
    const searchHandler = useCallback(() => {
        setIsSearchVisible(true);
    }, []);
    const getCheckCA = useCallback(boo => {
        setCheckCA(boo);
    });
    return (
        <>
            <InstallWebCA getCheckCA={getCheckCA} />
            {checkCA && <UpdateBar text={'請手動點擊更新，刷新報價'} />}
            <div className="info__container">
                <div className="info__box">
                    <div className="row">
                        <div className="product__container">
                            <div
                                className="product__name"
                                style={{
                                    fontSize: '2.6rem',
                                }}
                            >
                                {productInfo.marketType === 'SB' ? productInfo.symbol : defaultProductInfo.symbol}
                            </div>
                            <div className="product__code">
                                {productInfo.marketType === 'SB' ? productInfo.name : defaultProductInfo.name}
                            </div>
                        </div>
                        <div className="toolbar__container">
                            {/* <button className="share" onClick={shareHandler}>
                                <img src={share} alt="share"></img>
                            </button> */}
                            <button className="search" onClick={searchHandler}>
                                <img src={searchIcon} alt="search"></img>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="price__container">{getCloseInfo()}</div>
                        <div className="volume__container">
                            <div className="volume">總量 100</div>
                            <div className="unit">萬股</div>
                        </div>
                    </div>
                    <MoreInfo>
                        <div className="market__container">
                            <span className="market">美股</span>
                            <span className="close__info">03.19 16:00 收盤價</span>
                        </div>
                    </MoreInfo>
                </div>
            </div>
            <Search isVisible={isSearchVisible} handleCancel={handleCancel} />
            <style jsx>{`
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .row ~ .row {
                    margin-top: 8px;
                }
                .info__box {
                    margin: 16px;
                    margin-top: 14px;
                }
                .info__container {
                    margin: 0;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }
                .product__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((9 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .product__name {
                    font-size: 2.6rem;
                }
                .product__code {
                    font-size: 1.4rem;
                    margin-left: 1.2rem;
                }
                .toolbar__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((3 / 12) * 100%);
                }
                .toolbar__container .search {
                    margin-left: 1rem;
                }
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
                .price__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);

                    color: rgb(196, 56, 38);
                    font-size: 2rem;
                }
                @media (max-width: 340px) {
                    .price__container {
                        font-size: 1.8rem;
                    }
                }
                .volume__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((5 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .volume__container .volume {
                    font-size: 1.6rem;
                }
                @media (max-width: 340px) {
                    .volume__container .volume {
                        font-size: 1.4rem;
                    }
                }
                .volume__container .unit {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 2px 4px;
                }
                @media (max-width: 340px) {
                    .volume__container .unit {
                        margin: 0 0 0 4px;
                    }
                }
                .market {
                    display: inline-block;
                    color: #0d1623;
                    font-size: 1.5rem;
                    padding: 0 6px 1px;
                    border-radius: 2px;
                    background-color: #e6ebf5;
                    width: 42px;
                    height: 22px;
                }
                .close__info {
                    color: #0d1623;
                    font-size: 1.5rem;
                    margin-left: 8px;
                }
            `}</style>
        </>
    );
};

export default Info;

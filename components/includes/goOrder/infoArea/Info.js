import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trim } from 'lodash';

import { Search } from '../search/Search';
import { TextBox } from './TextBox';

import {
    priceColor,
    getArrow,
    toDecimal,
    formatPrice,
    trimMinus,
    simTradeHandler,
} from '../../../../services/numFormat';
import { setLot, setProductInfo } from '../../../../store/goOrder/action';

import share from '../../../../resources/images/components/goOrder/basic-share-outline.svg';
import search from '../../../../resources/images/components/goOrder/edit-search.svg';

import theme from '../../../../resources/styles/theme';
import { checkServer } from '../../../../services/checkServer';
import { marketIdToMarket } from '../../../../services/stock/marketIdToMarket';

// TODO: 暫時寫死，需發 API 查詢相關資料顯示
const moreItems = [
    { id: '1', color: 'dark', text: '融' },
    { id: '2', color: 'red', text: '詳' },
    { id: '3', color: 'orange', text: '存' },
    { id: '4', color: 'green', text: '借' },
    { id: '5', color: 'blue', text: '學' },
    { id: '6', color: 'brown', text: '+ 自選' },
];

// 因 solace 定義的資料結構較雜亂，需要小心處理初始值及預設型態
const solaceDataHandler = (solaceData, lot) => {
    const isSimTrade = lot === 'Odd' ? !!solaceData[0]?.data?.OddlotSimtrade : !!solaceData[0]?.data?.Simtrade;

    if (lot === 'Odd') {
        const [
            {
                data: {
                    Name = '', // TODO: 等 Solace 提供零股中文名欄位時要補上，解構出的名稱由 `Name` 改為 Solace 定義的名稱
                    OddlotClose = 0,
                    OddlotDiffPrice = 0,
                    OddlotDiffRate = 0,
                    OddlotSharesSum = 0,
                    OddlotReference = 0,
                } = {},
            } = {},
        ] = solaceData;

        return {
            name: Name,
            close: OddlotClose,
            diffPrice: OddlotDiffPrice,
            diffRate: OddlotDiffRate,
            volSum: OddlotSharesSum,
            reference: OddlotReference,
            isSimTrade,
        };
    } else {
        const [
            { data: { Name = '', Close = [], DiffPrice = [], DiffRate = [], VolSum = [], Reference = 0 } = {} } = {},
        ] = solaceData;

        return {
            name: Name,
            close: Close[0] || 0,
            diffPrice: DiffPrice[0] || 0,
            diffRate: DiffRate[0] || 0,
            volSum: VolSum[0] || 0,
            reference: Reference,
            isSimTrade,
        };
    }
};

// TODO: 零股顯示價差
export const Info = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const dispatch = useDispatch();
    const lot = useSelector(store => store.goOrder.lot);
    const code = useSelector(store => store.goOrder.code);
    const productInfo = useSelector(store => store.goOrder.productInfo);
    const solaceData = useSelector(store => store.solace.solaceData);
    const { name, close, diffPrice, diffRate, volSum, reference, isSimTrade } = solaceDataHandler(solaceData, lot);

    useEffect(() => {
        if (!checkServer() && solaceData.length > 0 && solaceData[0].topic != null) {
            if (solaceData[0].data.Jck1 != null) {
                const marketId = solaceData[0].data.Jck1;
                const market = marketIdToMarket(marketId);
                const solaceName = solaceData[0].data.Name;

                let oldProductInfo = { ...productInfo };
                oldProductInfo.solaceMarket = market;
                oldProductInfo.solaceName = trim(solaceName);
                dispatch(setProductInfo(oldProductInfo));
            }
        }
    }, [solaceData]);

    const lotHandler = () => {
        const nextLot = lot === 'Board' ? 'Odd' : 'Board';
        dispatch(setLot(nextLot));
    };

    const showSearch = () => {
        setIsSearchVisible(true);
    };

    const handleCancel = useCallback(() => {
        setIsSearchVisible(false);
    }, []);

    const lotWidthHandler = () => {
        if (productInfo?.solaceMarket && productInfo.solaceMarket !== '興櫃' && productInfo.solaceMarket !== '權證') {
            return { width: '44px' };
        } else {
            return { width: '22px' };
        }
    };

    const shareHandler = () => {
        console.log('share!!!');
    };

    return (
        <div className="info__container">
            <div className="row">
                <div className="product__container">
                    <div
                        className="product__name"
                        style={{
                            fontSize: trim(productInfo?.solaceName).length >= 5 ? '2rem' : '2.6rem',
                        }}
                    >
                        {trim(productInfo?.solaceName)}
                    </div>
                    <div className="product__code">{code}</div>
                </div>
                <div className="toolbar__container">
                    <button className="share" onClick={shareHandler}>
                        <img src={share} alt="share"></img>
                    </button>
                    <button className="search" onClick={showSearch}>
                        <img src={search} alt="search"></img>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="price__container">{`${simTradeHandler(formatPrice(close), isSimTrade)} ${getArrow(
                    close,
                    reference,
                )} ${simTradeHandler(trimMinus(toDecimal(diffPrice)), isSimTrade)} (${trimMinus(
                    toDecimal(diffRate),
                )}%)`}</div>
                <div className="volume__container">
                    <div className="volume">{`總量 ${volSum}`}</div>
                    <div className="unit">{lot === 'Odd' ? '股' : '張'}</div>
                </div>
            </div>
            <div className="row">
                <div className="market__container">
                    <button className="lot__box" onClick={lotHandler} style={lotWidthHandler()}>
                        <div className="box board">整</div>
                        {productInfo?.solaceMarket &&
                            productInfo.solaceMarket !== '興櫃' &&
                            productInfo.solaceMarket !== '權證' && <div className="box odd">零</div>}
                    </button>
                    {productInfo?.solaceMarket != null && <div className="market__box">{productInfo.solaceMarket}</div>}
                </div>
                <div className="more__container">
                    {moreItems.map(item => (
                        <TextBox key={item.id} color={item.color} text={item.text} />
                    ))}
                </div>
            </div>
            <Search isVisible={isSearchVisible} handleCancel={handleCancel} />
            <style jsx>{`
                button {
                    border: none;
                    padding: 0;
                    background-color: inherit;
                }
                .info__container {
                    margin: 16px;
                    font-weight: 600;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }
                .row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .row ~ .row {
                    margin-top: 8px;
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
                    font-size: 1.8rem;
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
                .price__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);
                    color: ${priceColor(close, reference)};
                    font-size: 2rem;
                }
                @media (max-width: 340px), print {
                    .price__container {
                        font-size: 1.8rem;
                    }
                }
                .volume__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((4 / 12) * 100%);
                    color: ${theme.colors.darkBg};
                }
                .volume__container .volume {
                    font-size: 1.6rem;
                }
                @media (max-width: 340px), print {
                    .volume__container .volume {
                        font-size: 1.4rem;
                    }
                }
                .volume__container .unit {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 2px 4px;
                }
                @media (max-width: 340px), print {
                    .volume__container .unit {
                        margin: 0 0 0 4px;
                    }
                }
                .market__container {
                    display: flex;
                    align-items: flex-end;
                    max-width: calc((4 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                }
                button.lot__box {
                    width: 44px;
                    height: 22px;
                    border-radius: 2px;
                    background-color: ${lot === 'Board' ? theme.colors.normalBg : '#f5e8d7'};
                }
                .lot__box .box {
                    display: inline-block;
                    padding: 1px 3px 1px 4px;
                    width: 22px;
                    height: 22px;
                    border-radius: 2px;
                }
                .lot__box .box.board {
                    background-color: ${lot === 'Board' ? '#0d1623' : 'inherit'};
                    color: ${lot === 'Board' ? theme.colors.text : theme.colors.secondary};
                }
                .lot__box .box.odd {
                    background-color: ${lot === 'Odd' ? theme.colors.secondary : 'inherit'};
                    color: ${lot === 'Odd' ? theme.colors.text : '#a9b6cb'};
                }
                .market__box {
                    width: 42px;
                    height: 22px;
                    margin-left: 4px;
                    padding: 1px 6px;
                    border-radius: 2px;
                    background-color: ${theme.colors.normalBg};
                    color: ${theme.colors.darkBg};
                }
                .more__container {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    max-width: calc((8 / 12) * 100%);
                    font-size: 1.5rem;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

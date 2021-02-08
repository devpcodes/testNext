import { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, isEqual, uniqWith } from 'lodash';

import MyTransition from '../../myTransition';
import { SearchItem } from './SearchItem';
import { setCode, setLot, setProductInfo, setType } from '../../../../store/goOrder/action';
import { fetchPopularStocks, fetchProducts } from '../../../../services/components/goOrder/productFetcher';

import theme from '../../../../resources/styles/theme';
import searchImg from '../../../../resources/images/components/goOrder/edit-search.svg';
import closeImg from '../../../../resources/images/components/goOrder/menu-close-big.svg';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

export const Search = memo(({ isVisible, handleCancel }) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [historyByType, setHistoryByType] = useState([]);
    const [searchHistory, setSearchHistory] = useLocalStorage('newweb_search_history', []);
    const type = useSelector(store => store.goOrder.type);
    const textInput = useRef(null);

    const getMarketType = type => {
        switch (type) {
            case 'S':
                return 'S';
            case 'H':
                return 'SB';
            case 'F':
                return 'F';
            case 'O':
                return 'O';
            default:
                return 'S';
        }
    };

    const getTypeByMarketType = marketType => {
        switch (marketType) {
            case 'S':
                return 'S';
            case 'SB':
                return 'H';
            case 'F':
                return 'F';
            case 'O':
                return 'O';
            default:
                return 'S';
        }
    };

    const saveSearchHistory = selectedProduct => {
        const maxLength = 5;
        const newSearchHistory = uniqWith(searchHistory, isEqual); // copy 並自動濾除重複的項目
        const index = newSearchHistory.findIndex(
            item => item.symbol === selectedProduct.symbol && item.marketType === selectedProduct.marketType,
        );
        if (index >= 0) {
            newSearchHistory.splice(index, 1);
        }
        newSearchHistory.push(selectedProduct);

        const historyByType = newSearchHistory.filter(item => item.marketType === getMarketType(type));
        const lastHistoryByType = historyByType.slice(Math.max(historyByType.length - maxLength, 0));
        const otherHistory = searchHistory.filter(item => item.marketType !== getMarketType(type));

        setSearchHistory([...lastHistoryByType, ...otherHistory]);
    };

    const selectHandler = item => {
        if (item) {
            saveSearchHistory(item);
            dispatch(setCode(item?.symbol));
            dispatch(setType(getTypeByMarketType(item?.marketType)));
            dispatch(setLot('Board'));
            dispatch(setProductInfo(item));
            cancelHandler();
        }
    };

    const getPopularItems = async () => {
        // TODO: 目前僅有台股，未來需要依市場 (type) 取得對應的熱門商品
        try {
            const res = await fetchPopularStocks();
            setPopularItems(res.result);
        } catch (error) {
            console.error(`fetchPopularItems-error:`, error);
        }
    };

    const focusHandler = () => {
        getPopularItems();
    };

    const enterHandler = keyword => {
        const selectedProduct = products.find(
            product => product.symbol === keyword || product.name_zh === keyword || product.name === keyword,
        );
        selectHandler(selectedProduct);
    };

    const changeHandler = e => {
        const keyword = e.target.value;
        setKeyword(keyword);
    };

    const clearHandler = () => {
        setKeyword('');
    };

    const cancelHandler = () => {
        clearHandler();
        handleCancel();
    };

    useEffect(() => {
        const historyByType = searchHistory.filter(item => item.marketType === getMarketType(type));
        setHistoryByType(historyByType);
    }, [type, searchHistory]);

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                query: keyword,
                marketType: [getMarketType(type)],
                limit: 30,
                isOrder: true,
            };
            try {
                const { result } = await fetchProducts(data);
                setProducts(result);
            } catch (error) {
                console.error(`fetchProducts-error:`, error);
            }
        };

        if (keyword === '') {
            setProducts([]);
        } else if (isVisible && keyword !== '') {
            fetchData();
        }
    }, [keyword]);

    useEffect(() => {
        if (isVisible) {
            textInput.current.focus();
        }
    }, [isVisible]);

    return (
        <MyTransition isVisible={isVisible} classNames={'loginMobile'}>
            <>
                <div className="search__container">
                    <div className="topBar__container">
                        <div className="autoComplete__container">
                            <img src={searchImg} alt="search"></img>
                            <input
                                type="text"
                                name="inputOfSearch"
                                placeholder="請輸入股票代碼或名稱"
                                value={keyword}
                                onChange={changeHandler}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        enterHandler(keyword);
                                    }
                                }}
                                className="autoComplete__input"
                                ref={textInput}
                                onFocus={focusHandler}
                            />
                            <button onClick={clearHandler}>
                                <img src={closeImg} alt="search"></img>
                            </button>
                        </div>
                        <button
                            className="cancel__btn"
                            onClick={() => {
                                cancelHandler();
                            }}
                        >
                            取消
                        </button>
                    </div>
                    <section className="dropdown__container">
                        {keyword ? (
                            <article className="dropdown__group">
                                {/* {<div className="group__title">個股</div>} */}
                                {products.map(item => (
                                    <SearchItem
                                        key={item.id}
                                        item={item}
                                        keyword={keyword}
                                        selectHandler={selectHandler}
                                        isMatched={true}
                                    />
                                ))}
                            </article>
                        ) : (
                            <>
                                <article className="dropdown__group">
                                    {!isEmpty(historyByType) && <div className="group__title">最近搜尋</div>}
                                    {historyByType
                                        .slice()
                                        .reverse()
                                        .map(item => (
                                            <SearchItem key={item.id} item={item} selectHandler={selectHandler} />
                                        ))}
                                </article>
                                <article className="dropdown__group">
                                    <div className="group__title">本日熱門搜尋</div>
                                    {type === 'S' &&
                                        popularItems.map(item => (
                                            <SearchItem key={item.id} item={item} selectHandler={selectHandler} />
                                        ))}
                                </article>
                            </>
                        )}
                    </section>
                </div>
                <style jsx>{`
                    button,
                    input {
                        border: none;
                        padding: 0;
                        background-color: inherit;
                    }
                    .search__container {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background-color: #ffffff;
                        z-index: 10001;
                    }
                    .topBar__container {
                        height: 68px;
                        width: 100%;
                        padding: 12px 16px;
                        background-color: ${theme.colors.darkBg};
                        display: flex;
                        align-items: center;
                    }
                    .topBar__container .cancel__btn {
                        color: ${theme.colors.text};
                        font-size: 1.6rem;
                        font-weight: 500;
                        margin: 0 0 0 16px;
                        width: 36px;
                        height: 22px;
                        line-height: 1.6rem;
                    }
                    .autoComplete__container {
                        width: calc(100% - 52px);
                        height: 44px;
                        padding: 10px 12px;
                        background-color: ${theme.colors.lightBg};
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .autoComplete__container .autoComplete__input {
                        height: 22px;
                        width: calc(100% - 56px);
                        line-height: 22px;
                        font-size: 1.6rem;
                        color: ${theme.colors.darkBg};
                    }
                    .autoComplete__container .autoComplete__input::placeholder {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */
                        color: #a9b6cb;
                        opacity: 1; /* Firefox */
                    }
                    .autoComplete__container .autoComplete__input::-ms-input-placeholder {
                        /* Internet Explorer 10-11 */
                        color: #a9b6cb;
                    }
                    .autoComplete__container .autoComplete__input::-ms-input-placeholder {
                        /* Microsoft Edge */
                        color: #a9b6cb;
                    }
                    .dropdown__container {
                        width: 100%;
                        height: calc(100% - 68px);
                        overflow-y: auto;
                        border-bottom: solid 1px ${theme.colors.normalBg};
                    }
                    .dropdown__group {
                        width: 100%;
                        color: ${theme.colors.darkBg};
                    }
                    .dropdown__group .group__title {
                        width: 100%;
                        height: 24px;
                        line-height: 24px;
                        padding: 0 16px;
                        background-color: ${theme.colors.normalBg};
                        font-size: 1.2rem;
                    }
                `}</style>
            </>
        </MyTransition>
    );
});

Search.displayName = 'goOrder-search';

Search.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

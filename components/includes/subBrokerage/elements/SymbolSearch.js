import { useRef, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import lodash from 'lodash';
import { message } from 'antd';
import { setSymbolList } from '../../../../store/subBrokerage/action';
import AddSelfSelect from '../../selfSelect/AddSelfSelect';
import { SearchOutlined } from '@ant-design/icons';
import SearchAutoComplete from '../../tradingAccount/vipInventory/SearchAutoComplete';
const SymbolSearch = ({ getProductInfo, defaultVal }) => {
    const selected = useRef(false);
    const selectSymbol = useRef('');
    const [productInfo, setProductInfo] = useState({});
    const [defaultValue, setDefaultValue] = useState(null);
    const dispatch = useDispatch();
    const symbolList = useSelector(store => store.subBrokerage.symbolList);

    useEffect(() => {
        if (localStorage.getItem('subBrokerage_symbolList')) {
            const oldSymbolList = JSON.parse(localStorage.getItem('subBrokerage_symbolList'));
            console.log('oldSymbolList', oldSymbolList);
            dispatch(setSymbolList(oldSymbolList));
        }
    }, []);

    useEffect(() => {
        console.log('defaultVal', defaultVal);
        if (defaultVal.symbol) {
            let val = defaultVal.symbol + ' ' + defaultVal.name;
            setDefaultValue(val);
        }
    }, [defaultVal]);

    const selectHandler = useCallback(async (val, option) => {
        try {
            let maxLength = 10; //標籤最大值
            let info = option.item;
            console.log('***info', info);
            getProductInfo(info);
            let data = [...symbolList];
            const findIndex = _.findIndex(data, ['symbol', info.symbol]);
            if (findIndex !== -1) {
                return;
            }
            if (data.length >= maxLength) {
                data.splice(0, 1);
            }
            let newSymbolList = data.concat(info);
            console.log(data, newSymbolList);
            dispatch(setSymbolList(newSymbolList));
            localUpdate(newSymbolList);
        } catch (error) {
            console.log(error);
        }
    });

    const localUpdate = newData => {
        console.log('***UPDATE');
        localStorage.setItem('subBrokerage_symbolList', JSON.stringify(newData));
    };

    const onChangeHandler = useCallback(val => {
        console.log('[onChangeHandler]', val);
    });
    const selectedHandler = useCallback(bol => {
        selected.current = bol;
    });
    const onClickHandler = useCallback((e, txt, symbol) => {
        e.preventDefault();
        console.log('[onClickHandler]', txt, symbol);
        setDefaultValue(txt);
        let info = symbolList.filter(x => x.symbol == symbol);
        console.log('[onClickHandler2]', info);
        getProductInfo(info[0]);
        selected.current = true;
    });

    return (
        <div className="ctrl_item for_search">
            <div className="search_box">
                <SearchOutlined style={{ fontSize: '16px', color: '#333' }} />
                <SearchAutoComplete
                    selectHandler={selectHandler}
                    onChange={onChangeHandler}
                    width={'100%'}
                    height={'40px'}
                    marketType={['SB']}
                    selectedHandler={selectedHandler}
                    placeholder={'股票代號／名稱'}
                    parentValue={defaultValue}
                    isOrder={true}
                />
            </div>
            <div className="searchLabelBox">
                {symbolList.map(x => {
                    return (
                        <a onClick={e => onClickHandler(e, x.symbol + ' ' + x.name, x.symbol)}>
                            <label key={x.id}>{x.symbol}</label>
                        </a>
                    );
                })}
            </div>
            <style jsx>
                {`
                    .for_search {
                        width: 100%;
                        min-height: 85px;
                    }
                    .searchLabelBox {
                        margin-top: 8px;
                    }
                    .searchLabelBox label {
                        padding: 0px 0.7em;
                        line-height: 32px;
                        background: #f9fbff;
                        border: 1px solid #d7e0ef;
                        display: inline-block;
                        font-size: 16px;
                        font-weight: 700;
                        margin-bottom: 5px;
                        cursor: pointer;
                    }
                    .searchLabelBox a:not(:last-child) {
                        margin-right: 10px;
                    }

                    .ctrl_item {
                        min-height: 46px;
                        padding: 0 25px;
                    }
                    .search_box {
                        display: flex;
                        align-items: center;
                        border: 1px solid #e6ebf5;
                        border-radius: 2px;
                        padding: 0 10px;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .for_search .search_box .ant-select-selection-placeholder {
                        line-height: 40px;
                    }
                    .for_search
                        .autoComplete__container
                        .ant-select-single:not(.ant-select-customize-input)
                        .ant-select-selector {
                        border-color: transparent;
                    }
                    .for_search .search_box {
                        display: flex;
                        align-items: center;
                        border: 1px solid #e6ebf5;
                        border-radius: 2px;
                        padding: 0 10px;
                    }
                `}
            </style>
        </div>
    );
};

export default SymbolSearch;

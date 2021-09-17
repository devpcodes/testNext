import { useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import lodash from 'lodash';
import { message } from 'antd';
import { setSymbolList } from '../../../../store/subBrokerage/action';
import AddSelfSelect from '../../selfSelect/AddSelfSelect';
import { SearchOutlined } from '@ant-design/icons';
import SearchAutoComplete from '../../tradingAccount/vipInventory/SearchAutoComplete';
const SymbolSearch = ({getProductInfo}) => {
    const selected = useRef(false);
    const selectSymbol = useRef('');
    const [productInfo, setProductInfo] = useState({});
    const symbolList = useSelector(store => store.subBrokerage.symbolList);
    const dispatch = useDispatch();
    const selectHandler = useCallback(async (val, option) => {
        try {
            let info = option.item;
            console.log('***info',info)
            let obj = {
                id:info.id,
                symbol:info.symbol,
                name:info.name,
                exchange:info.exchange,
                market:"US",
                sortId:100,
                marketType:"SB",
                hasChinese:false
            }
            // if (info.market == 'US') {
            //     setUsSelect(true);
            // } else {
            //     setUsSelect(false);
            // }
            // setInputVal(val);
            // setProductInfo(info);
            getProductInfo(info)
            let newSymbolList = symbolList.concat(info)
            dispatch(setSymbolList(newSymbolList))
        } catch (error) {
            console.log(error);
        }
    });
    const onChangeHandler = useCallback(val => {
        console.log('[onChangeHandler]',val);
    });
    const selectedHandler = useCallback(bol => {
        selected.current = bol;
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
                />
            </div>
            <div className="searchLabelBox">
                {symbolList.map(x => {
                    return <label key={x.id}>{x.symbol}</label>;
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
                    }
                    .searchLabelBox label:not(:last-child) {
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

import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import Highlighter from 'react-highlight-words';
import { fetchProducts } from '../../../../services/components/goOrder/productFetcher';

const SearchAutoComplete = ({ selectHandler, parentValue, onChange }) => {
    const [value, setValue] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('val', parentValue);
        setValue(parentValue);
        if (parentValue === '') {
            setProducts([]);
        }
    }, [parentValue]);

    const fetchData = async value => {
        const data = {
            query: value,
            marketType: ['S'],
            limit: 15,
            isOrder: false,
        };
        try {
            const { result } = await fetchProducts(data);
            const searchOptions = result.map(item => {
                // return {value: item.symbol + ' ' + item.name_zh};
                return { label: <></>, options: [renderItem(item, value)] };
            });
            setProducts(searchOptions);
        } catch (error) {
            console.error(`fetchProducts-error:`, error);
        }
    };

    const renderItem = (item, value) => {
        return {
            value: item.symbol + ' ' + item.name_zh,
            label: (
                <div className="item__container">
                    <Highlighter
                        highlightStyle={{ padding: 0, color: '#daa360', backgroundColor: 'rgba(255,255,255,0)' }}
                        searchWords={[value]}
                        autoEscape
                        textToHighlight={item.symbol + ' ' + item.name_zh}
                    />
                </div>
            ),
        };
    };

    const changeHandler = val => {
        console.log('change', val);
        setValue(val);
        if (val === '') {
            setProducts([]);
        } else {
            fetchData(val);
        }

        if (typeof eval(onChange) == 'function') {
            onChange(val);
        }
    };

    const onSelect = value => {
        console.log('select', value);
        selectHandler(value);
    };

    return (
        <>
            <div className="autoComplete__container">
                <AutoComplete
                    style={{ height: '38px' }}
                    options={products}
                    placeholder="請輸入股號或商品名稱"
                    dropdownClassName="searchDropdown"
                    dropdownMatchSelectWidth={240}
                    onChange={changeHandler}
                    value={value}
                    autoFocus={true}
                    defaultActiveFirstOption={false}
                    onSelect={onSelect}
                />
            </div>
            <style global jsx>{`
                /* .searchDropdown {
                    height: 136px;
                    overflow-y: auto;
                } */
                .autoComplete__container .ant-select.ant-select-auto-complete.ant-select-single.ant-select-show-search {
                    width: 219px;
                    height: 38px;
                }
                .autoComplete__container .ant-select-selector {
                    height: 38px !important;
                    line-height: 38px !important;
                }
                .item__container .ant-select-item-group {
                    height: 0;
                    display: inline-block;
                }
                .searchDropdown .ant-select-item {
                    min-height: 0 !important;
                }
                .searchDropdown .ant-select-item-option-grouped {
                    font-size: 1.6rem;
                    padding-left: 20px;
                    color: #0d1623;
                }
                .searchDropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
                    background-color: #f2f5fa;
                }
                .search__container .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: 36px;
                    color: #6c7b94;
                }
                .autoComplete__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border: solid 1px #e6ebf5;
                }
            `}</style>
        </>
    );
};

export default SearchAutoComplete;
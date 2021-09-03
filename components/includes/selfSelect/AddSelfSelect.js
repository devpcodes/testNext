import { Input, Space } from 'antd';
import { useState, useEffect, useRef } from 'react';
import SearchAutoComplete from '../tradingAccount/vipInventory/SearchAutoComplete';
import { fetchAddSelectStock } from '../../../services/selfSelect/addSelectStock';
import { useSelector } from 'react-redux';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
const { Search } = Input;

const AddSelfSelect = ({
    tabkey,
    reloadSelectReloadTime,
    controlFunction,
    width = '219px',
    marketType = ['S', 'SB', 'F', 'O'],
    className = '',
}) => {
    const [inputVal, setInputVal] = useState('');
    const [searchData, setSearchData] = useState(null);
    const socalLoginData = useSelector(store => store.user.socalLogin);
    const currentData = useRef({});
    const selectHandler = (val, options) => {
        setInputVal(val);
        setSearchData(options.item);
        currentData.current = options.item;
    };

    const onChangeHandler = val => {
        setSearchData(null);
    };

    const onPressEnter = (value, products) => {
        if (controlFunction != null) {
            if (currentData.current?.symbol && value.split(' ')[1]) {
                controlFunction(currentData.current);
                return;
            }
        }

        if (products[0]?.options[0]?.item.symbol) {
            if (controlFunction == null && currentData.current?.symbol) {
                addSelectStock();
            }
        }
    };

    const addSelectStock = async () => {
        if (controlFunction == null) {
            if (currentData.current?.symbol && inputVal.split(' ')[1]) {
                const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
                const addReqData = {
                    selectId: tabkey,
                    symbol: currentData.current.symbol,
                    exchange: currentData.current.exchange,
                    market: currentData.current.marketType,
                    token: isSocalLogin ? getSocalToken() : getToken(),
                };
                const res = await fetchAddSelectStock(addReqData, isSocalLogin);
                reloadSelectReloadTime();
                setInputVal('');
            }
        } else {
            controlFunction(searchData);
        }
    };

    return (
        <>
            <div className={`add__select__block ${['0'].includes(tabkey) ? 'hidden' : 'show'}`}>
                <SearchAutoComplete
                    selectHandler={selectHandler}
                    parentValue={inputVal}
                    onChange={onChangeHandler}
                    marketType={marketType}
                    width={width}
                    className={className}
                    onPressEnter={onPressEnter}
                />
                <button
                    className="add__stock__btn"
                    onClick={addSelectStock}
                    disabled={searchData === null ? true : false}
                >
                    新增個股
                </button>
            </div>

            <style jsx>{`
                .add__select__block {
                    display: flex;
                }
                .add__select__block.hidden {
                    display: none;
                }
                .add__select__block.show {
                    display: flex;
                }

                .add__stock__btn {
                    width: 95px;
                    height: 37px;
                    border-radius: 2px;
                    background-color: #c43826;
                    font-size: 1.4rem;
                    color: #fff;
                    border: 0;
                }
                .add__stock__btn:disabled {
                    cursor: no-drop;
                    background-color: #e6ebf5;
                    color: #a9b6cb;
                }
            `}</style>
            <style jsx global>{`
                .add__select__block .ant-btn-primary,
                .ant-btn-primary:focus,
                .ant-btn-primary:hover {
                    background: #c43826;
                    border-color: #c43826;
                }
                .add__select__block .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
                    line-height: 36px;
                    color: #3f5372;
                    font-size: 1.4rem;
                    letter-spacing: 0;
                }
                .searchDropdown {
                    width: 350px !important;
                }
            `}</style>
        </>
    );
};

export default AddSelfSelect;

import { Input, Space } from 'antd';
import { useState, useEffect } from 'react';
import SearchAutoComplete from '../tradingAccount/vipInventory/SearchAutoComplete';
import { fetchAddSelectStock } from '../../../services/selfSelect/addSelectStock';
import { useSelector } from 'react-redux';
import { getSocalToken, getToken } from '../../../services/user/accessToken';
const { Search } = Input;

const AddSelfSelect = ({ tabkey, reloadSelectReloadTime }) => {
    const [inputVal, setInputVal] = useState(null);
    const [searchData, setSearchData] = useState(null);
    const socalLoginData = useSelector(store => store.user.socalLogin);

    const selectHandler = (val, options) => {
        setInputVal(val);
        setSearchData(options.item);
    };

    const onChangeHandler = val => {
        setInputVal(val);
        setSearchData(null);
    };

    const addSelectStock = async () => {
        const isSocalLogin = Object.keys(socalLoginData).length > 0 ? true : false;
        const addReqData = {
            selectId: tabkey,
            symbol: searchData.symbol,
            exchange: searchData.exchange,
            market: searchData.marketType,
            token: isSocalLogin ? getSocalToken() : getToken(),
        };
        const res = await fetchAddSelectStock(addReqData, isSocalLogin);
        reloadSelectReloadTime();
    };

    return (
        <>
            <div className={`add__select__block ${['0'].includes(tabkey) ? 'hidden' : 'show'}`}>
                <SearchAutoComplete
                    selectHandler={selectHandler}
                    parentValue={inputVal}
                    onChange={onChangeHandler}
                    marketType={['S', 'SB', 'F', 'O']}
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
                .ant-btn-primary,
                .ant-btn-primary:focus,
                .ant-btn-primary:hover {
                    background: #c43826;
                    border-color: #c43826;
                }
            `}</style>
        </>
    );
};

export default AddSelfSelect;

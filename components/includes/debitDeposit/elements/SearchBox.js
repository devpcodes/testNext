import { useState, useMemo, useContext } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { ReducerContext } from '../../../../store/advanceCollection/reducerContext';
import { ACTIVETYPE } from '../../../../store/advanceCollection/actionType';

const SearchBox = ({ showFilter }) => {
    const [state, dispatch] = useContext(ReducerContext);
    // const [activeType, setActiveType] = useState('1');
    const [searchVal, setSearchVal] = useState('');
    const searchHandler = () => {};
    const resetHandler = () => {};
    const filterBtnHandler = type => {
        // setActiveType(type);
        dispatch({ type: ACTIVETYPE, payload: type });
        // setSearchVal('');
        // setSearchStock('');
    };
    const selectCodeHandler = e => {
        setSearchVal(e.target.value);
    };

    const showFilterHandler = useMemo(() => {
        if (showFilter) {
            return (
                <div className={'filterBox'}>
                    <Button
                        type="primary"
                        className={state.accountsReducer.activeType == '1' ? 'active searchBtn' : 'searchBtn'}
                        onClick={filterBtnHandler.bind(null, '1')}
                    >
                        全額/收足/處置類股票
                    </Button>
                    <Button
                        type="primary"
                        className={state.accountsReducer.activeType == '2' ? 'active searchBtn' : 'searchBtn'}
                        onClick={filterBtnHandler.bind(null, '2')}
                    >
                        一般股票
                    </Button>
                </div>
            );
        }
    }, [showFilter, state.accountsReducer.activeType]);

    return (
        <div className="searchBox">
            <Input
                onChange={selectCodeHandler}
                value={searchVal}
                placeholder="請輸入股票名稱或代號"
                className="searchInp"
            />
            {/* <SearchAutoComplete onChange={selectCodeHandler} selectHandler={selectCodeHandler} width={width <= 580 ? "100%" : '200px'}/> */}
            <Button type="primary" className="searchBtn" onClick={searchHandler.bind(null, 'apply')}>
                搜尋
            </Button>
            <Button type="primary" className="searchBtn" onClick={resetHandler.bind(null, 'apply')}>
                重置
            </Button>
            {showFilterHandler}
            <style jsx>{`
                .searchBox {
                    padding-left: 2px;
                    padding-right: 2px;
                    padding-top: 15px;
                }
                @media (max-width: 580px) {
                    .title {
                        font-size: 26px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .filterBox {
                    display: inline-block;
                    float: right;
                }
                @media (max-width: 580px) {
                    .filterBox {
                        display: block;
                        float: none;
                        margin-top: 20px;
                    }
                }
                .active.searchBtn {
                    background: #425b77 !important;
                }
                .searchBox .ant-input {
                    width: 160px;
                    font-size: 16px;
                }
                .searchBox .ant-input.searchInp {
                    width: 200px;
                }
                .searchBox .ant-input::placeholder {
                    font-size: 16px;
                }

                .searchBox .ant-btn.searchBtn {
                    background: #587ea8;
                    height: 37px;
                    margin-left: 5px;
                    vertical-align: bottom;
                }
                .searchBox .ant-btn.searchBtn:not([disabled]):hover {
                    background: #4e6d90;
                }
                @media (max-width: 580px) {
                    .searchBox .ant-btn.searchBtn {
                        width: calc(100% -5px);
                        margin-top: 5px;
                        margin-left: 0;
                    }
                    .searchBox .ant-input.searchInp {
                        width: 100%;
                        height: 35px !important;
                    }
                    .searchBox .ant-input {
                        width: 100%;
                    }
                }

                .searchBox .ant-btn {
                    font-size: 16px;
                    border: none;
                    color: #ffffff;
                    background: #d23749;
                    line-height: 26px;
                    font-weight: bold;
                    transition: 0.3s;
                    border-radius: 3px;
                }
                @media (max-width: 580px) {
                    .searchBox .ant-btn {
                        width: 100%;
                    }
                }
                .searchBox .ant-btn:not([disabled]):hover {
                    background: #bb1428;
                }
                .searchBox .ant-btn:disabled {
                    background: #b7b7b7;
                    color: #dadada;
                }
                .searchBox .ant-btn:disabled:hover {
                    background: #b7b7b7;
                    color: #dadada;
                }
                .searchBox .ant-input {
                    text-align: center;
                    font-size: 18px;
                }
            `}</style>
        </div>
    );
};
SearchBox.PropTypes = {
    showFilter: PropTypes.bool,
};

export default SearchBox;

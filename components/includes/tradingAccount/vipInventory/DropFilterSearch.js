import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import ConfirmButton from './buttons/ConfirmButton';
import ResetButton from './buttons/ResetButton';
import SearchAutoComplete from './SearchAutoComplete';

const DropFilterSearch = ({ onSubmit, onReset, value }) => {
    const [inputVal, setInputVal] = useState(null);

    useEffect(() => {
        setInputVal(value);
    }, [value]);

    const onChangeHandler = val => {
        setInputVal(val);
    };

    const resetClickHandler = () => {
        setInputVal('');
        onReset();
    };

    const onSubmitHandler = val => {
        const patt = /^[\s-+a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/;
        if (patt.test(val)) {
            onSubmit(val);
        } else {
            Modal.error({
                title: '輸入格式錯誤',
            });
        }
    };

    const selectHandler = val => {
        setInputVal(val);
    };

    return (
        <>
            <div className="search__container">
                <div className="input__box">
                    {/* <Input
                        placeholder="請輸入股號或商品名稱"
                        style={{ height: '38px' }}
                        onChange={onChangeHandler}
                        onPressEnter={onSubmitHandler.bind(null, inputVal)}
                        // value={inputVal == null ? value : inputVal}
                        value={inputVal}
                    /> */}
                    <SearchAutoComplete
                        selectHandler={selectHandler}
                        parentValue={inputVal}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="searchBtn__box">
                    <ResetButton text="重置" onClick={resetClickHandler} />
                    <ConfirmButton text="確定" onClick={onSubmitHandler.bind(null, inputVal)} />
                </div>
            </div>
            <style global jsx>{`
                .search__container: {
                    width: 251px;
                    height: 136px;
                }
                .input__box {
                    padding-left: 16px;
                    padding-right: 16px;
                    padding-top: 20px;
                }
                .searchBtn__box {
                    margin-top: 16px;
                    border-top: 1px solid #e6ebf5;
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: right;
                    padding-right: 16px;
                }
                .search__container .ant-btn-primary {
                    background-color: #c43826;
                    border: none;
                }
            `}</style>
        </>
    );
};

export default DropFilterSearch;

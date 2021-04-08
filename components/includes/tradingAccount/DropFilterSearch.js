import { useState } from 'react';
import { Input, Button } from 'antd';
const DropFilterSearch = ({ onSubmit, onReset }) => {
    const [inputVal, setInputVal] = useState('');

    const onChangeHandler = e => {
        setInputVal(e.target.value);
    };

    const resetClickHandler = () => {
        setInputVal('');
        onReset();
    };

    const onSubmitHandler = val => {
        onSubmit(val);
    };

    return (
        <>
            <div className="search__container">
                <div className="input__box">
                    <Input
                        placeholder="請輸入股號或商品名稱"
                        style={{ height: '38px' }}
                        onChange={onChangeHandler}
                        value={inputVal}
                    />
                </div>
                <div className="searchBtn__box">
                    <Button
                        style={{
                            display: 'inline-block',
                            width: '52px',
                            height: '32px',
                            padding: 0,
                            border: 'solid 1px #d7e0ef',
                            color: '#a9b6cb',
                        }}
                        onClick={resetClickHandler}
                    >
                        重置
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            display: 'inline-block',
                            width: '52px',
                            height: '32px',
                            padding: 0,
                            marginLeft: '12px',
                        }}
                        onClick={onSubmitHandler.bind(null, inputVal)}
                    >
                        確定
                    </Button>
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

import { Button, Checkbox } from 'antd';
import { useState, useCallback, useEffect } from 'react';

// type: String；radio: 單選； checkbox: 多選
const DropfilterCheckBox = ({ type, onSubmit, onReset, value, data }) => {
    const [checkboxValue, setValue] = useState(null);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const changeHandler = useCallback(
        checkedValue => {
            if (type === 'radio') {
                if (checkedValue.length > 0) {
                    const newVal = checkedValue[checkedValue.length - 1];
                    setValue([newVal]);
                }
            } else {
                setValue(checkedValue);
            }
        },
        [type],
    );

    const onClickHandler = () => {
        onSubmit(checkboxValue);
    };

    const onResetHandler = () => {
        setValue([]);
        onReset();
    };

    const getStyle = () => {
        if (checkboxValue?.length === 0) {
            return {
                width: '52px',
                height: '31px',
                marginRight: '12px',
                padding: 0,
                border: 'solid 1px #d7e0ef',
                color: '#a9b6cb',
            };
        } else {
            return {
                width: '52px',
                height: '31px',
                marginRight: '12px',
                padding: 0,
                border: 'solid 1px #d7e0ef',
                color: '#0d1623',
            };
        }
    };

    return (
        <>
            <div className="checkbox__container">
                <Checkbox.Group onChange={changeHandler} value={checkboxValue}>
                    {data.map(item => {
                        return (
                            <div className="checkox__box" key={item.value}>
                                <Checkbox value={item.value}>{item.text}</Checkbox>
                            </div>
                        );
                    })}
                    <div className="btn__box">
                        <Button style={getStyle()} onClick={onResetHandler}>
                            重置
                        </Button>
                        <Button
                            onClick={onClickHandler}
                            type="primary"
                            style={{ width: '52px', height: '31px', padding: 0 }}
                        >
                            確定
                        </Button>
                    </div>
                </Checkbox.Group>
            </div>
            <style global jsx>{`
                .checkbox__container {
                    position: relative;
                    width: 148px;
                    /* height: 217px; */
                    padding-top: 15px;
                    overflow-y: auto;
                    max-height: 248px;
                    overflow-x: hidden;
                }
                .checkbox__container .ant-checkbox-inner {
                    width: 20px;
                    height: 20px;
                }
                .checkbox__container .checkox__box {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    padding-left: 15px;
                }
                .checkbox__container .ant-checkbox-wrapper span {
                    font-size: 1.6rem;
                    color: #0d1623;
                }
                .btn__box {
                    width: 148px;
                    padding-left: 16px;
                    padding-right: 16px;
                    /* position: absolute; */
                    border-top: 1px solid #e6ebf5;
                    padding-top: 12px;
                    /* bottom: 12px; */
                    margin-bottom: 12px;
                }
                .checkbox__container .ant-btn-primary {
                    background-color: #c43826;
                    border: none;
                }
                .checkox__box {
                    transition: all 0.5s;
                    width: 148px;
                    background-color: white;
                }
                .checkox__box:hover {
                    background-color: #e6ebf5;
                }
                .checkbox__container .ant-checkbox-wrapper:hover .ant-checkbox-inner {
                    border: solid 1px #a9b6cb;
                }
                .checkbox__container .ant-checkbox-wrapper .ant-checkbox-inner {
                    border: solid 1px #a9b6cb;
                }
                .checkbox__container .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #c43826;
                    border: solid 1px #c43826;
                }
                .checkbox__container .ant-checkbox-checked:after {
                    border: none;
                }
            `}</style>
        </>
    );
};

export default DropfilterCheckBox;

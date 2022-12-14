import { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;
const AccountSelect = ({ data, onSelect, value, ...props } = { value: '' }) => {
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
        selectHandler(value);
    }, []);

    useEffect(() => {
        selectHandler(value);
    }, [value]);

    const selectHandler = val => {
        setSelectedValue(val);
        const selected = data.filter((item, key) => {
            if (item.broker_id + item.account === val) {
                return true;
            }
        });
        onSelect(selected[0]);
    };
    return (
        <div className="accountSelect__container">
            <Select {...props} value={selectedValue} onSelect={selectHandler} style={{ width: '100%' }}>
                {!!data &&
                    data.map((val, key) => {
                        return (
                            <Option key={key} value={val.broker_id + val.account}>
                                {val.broker_id + val.account}
                            </Option>
                        );
                    })}
            </Select>
            <style jsx>{`
                @media (max-width: 580px) {
                    margin-top: 10px;
                }
            `}</style>

            <style jsx global>{`
                .accountSelect__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    height: 43px;
                }
                .accountSelect__container .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                    line-height: 43px;
                }
                .accountSelect__container .ant-select-selection-item {
                    line-height: 43px;
                }
                .accountSelect__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    border-radius: 5px;
                    border: 1px solid #777777;
                    font-size: 20px;
                }
                @media (max-width: 580px) {
                    .accountSelect__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                        height: 35px;
                    }
                    .accountSelect__container .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
                        line-height: 35px;
                    }
                    .accountSelect__container .ant-select-selection-item {
                        line-height: 35px;
                    }
                    .accountSelect__container .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                        font-size: 14px;
                    }
                }

                .accountSelect__container .ant-select-arrow {
                    color: black !important;
                }
                .accountSelect__container .ant-select-selector {
                    box-shadow: none !important;
                }
                .account__container .ant-select-arrow {
                    display: block !important;
                }
            `}</style>
        </div>
    );
};

export default React.memo(AccountSelect);

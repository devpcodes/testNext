import { useReducer, createContext, useState } from 'react';
import { Select, Radio } from 'antd';
import AdvanceCollectionLayout from '../components/layouts/AdvanceCollectionLayout';
import ReservationStock from '../components/includes/advanceCollection/ReservationStock';
import { reducers } from '../store/advanceCollection/combineReducer';
import EarmarkReserve from '../components/includes/advanceCollection/EarmarkReserve';
const initState = reducers();
export const ReducerContext = createContext();

const { Option } = Select;

const options = [
    { label: '預收款項', value: 'earmarkReserve' },
    { label: '預收股票', value: 'stockReserve' },
];
// 有獨立全局狀態不是redux
const AdvanceCollection = function () {
    const [selectOption, setSelectOption] = useState('earmarkReserve');
    const reducer = useReducer(reducers, initState);
    const handleChange = value => {
        // setSelectOption(value);
        setSelectOption(value.target.value);
    };
    return (
        <>
            <ReducerContext.Provider value={reducer}>
                <AdvanceCollectionLayout startTime={'08:00'} endTime={'14:30'} type={selectOption}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px' }}>
                        {/* <Select defaultValue="earmarkReserve" className={'reserve__container'} onChange={handleChange}>
                            <Option value="earmarkReserve">預收款項</Option>
                            <Option value="stockReserve">預收股票</Option>
                        </Select> */}
                        <Radio.Group
                            className={'reserve__container'}
                            options={options}
                            onChange={handleChange}
                            value={selectOption}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>
                    {selectOption === 'earmarkReserve' ? <EarmarkReserve /> : <ReservationStock />}
                </AdvanceCollectionLayout>
            </ReducerContext.Provider>
            <style global jsx>{`
                .reserve__container {
                    width: 287px;
                    height: 38px;
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: bold;
                }
                /* .reserve__container .ant-select-selector {
                    border: 1px solid #777777 !important;
                    border-radius: 2px !important;
                }

                .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
                    height: 38px;
                }
                .reserve__container .ant-select-arrow {
                    color: black;
                }
                .reserve__container .ant-select-selection-item {
                    line-height: 40px !important;
                }
                .reserve__container .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before {
                    background-color: white;
                } */
                .reserve__container.ant-radio-group-solid
                    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                    color: #fff;
                    background: #587ea8;
                    border-color: #587ea8;
                }
                .reserve__container .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):before {
                    background-color: #587ea8;
                }
                .reserve__container .ant-radio-button-wrapper:hover {
                    color: #587ea8;
                }
            `}</style>
        </>
    );
};

{
    /* AdvanceCollection.getLayout = page => {
    const reducer = useReducer(reducers, initState);
    return (
        <ReducerContext.Provider value={reducer}>
            <AdvanceCollectionLayout children={page} startTime={'08:00'} endTime={'14:30'} />
        </ReducerContext.Provider>
    );
}; */
}

export default AdvanceCollection;

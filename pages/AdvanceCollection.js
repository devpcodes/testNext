import { useReducer, createContext, useState } from 'react';
import { Select } from 'antd';
import AdvanceCollectionLayout from '../components/layouts/AdvanceCollectionLayout';
import ReservationStock from '../components/includes/advanceCollection/ReservationStock';
import { reducers } from '../store/advanceCollection/combineReducer';
import EarmarkReserve from '../components/includes/advanceCollection/EarmarkReserve';
const initState = reducers();
export const ReducerContext = createContext();

const { Option } = Select;
// 有獨立全局狀態不是redux
const AdvanceCollection = function () {
    const [selectOption, setSelectOption] = useState('earmarkReserve');
    const reducer = useReducer(reducers, initState);
    const handleChange = value => {
        setSelectOption(value);
    };
    return (
        <>
            <ReducerContext.Provider value={reducer}>
                <AdvanceCollectionLayout startTime={'08:00'} endTime={'14:30'}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px' }}>
                        <Select defaultValue="earmarkReserve" className={'reserve__container'} onChange={handleChange}>
                            <Option value="earmarkReserve">預收款項</Option>
                            <Option value="stockReserve">預收股票</Option>
                        </Select>
                    </div>
                    {selectOption === 'earmarkReserve' ? <EarmarkReserve /> : <ReservationStock />}
                </AdvanceCollectionLayout>
            </ReducerContext.Provider>
            <style global jsx>{`
                .reserve__container {
                    width: 220px;
                    height: 32px;
                    margin-top: 20px;
                    font-size: 16px;
                }
                .reserve__container .ant-select-selector {
                    border: 1px solid #777777 !important;
                    border-radius: 2px !important;
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

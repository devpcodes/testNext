import React, { useReducer, createContext } from 'react';
import AdvanceCollectionLayout from '../components/layouts/AdvanceCollectionLayout';
import ReservationStock from '../components/includes/advanceCollection/ReservationStock';
import { reducers } from '../store/advanceCollection/combineReducer';
const initState = reducers();
export const ReducerContext = createContext();

// 有獨立全局狀態不是redux
const AdvanceCollection = function () {
    const reducer = useReducer(reducers, initState);
    return (
        <>
            <ReducerContext.Provider value={reducer}>
                <AdvanceCollectionLayout startTime={'08:00'} endTime={'14:30'}>
                    <ReservationStock />
                </AdvanceCollectionLayout>
            </ReducerContext.Provider>
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

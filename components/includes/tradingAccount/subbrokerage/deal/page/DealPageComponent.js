import { useState } from 'react';
import ControlBar from '../element/ControlBar';
import DealTable from '../element/DealTable';

const DealPageComponent = () => {
    const [type, setType] = useState('detail');
    const reFreshHandler = () => {};
    const typeChangeHandler = val => {
        console.log('vvv', val);
        setType(val);
    };
    return (
        <>
            <ControlBar reFreshHandler={reFreshHandler} typeChangeHandler={typeChangeHandler} />
            <DealTable type={type} />
        </>
    );
};

export default DealPageComponent;

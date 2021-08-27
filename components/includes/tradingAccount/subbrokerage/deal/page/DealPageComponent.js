import { useState } from 'react';
import ControlBar from '../element/ControlBar';
import DealTable from '../element/DealTable';

const DealPageComponent = () => {
    const [type, setType] = useState('detail');
    const [controlReload, setControlReload] = useState(0);
    const reFreshHandler = () => {
        setControlReload(prev => {
            return (prev += 1);
        });
    };
    const typeChangeHandler = val => {
        console.log('vvv...', val);
        setType(val);
    };
    return (
        <div style={{ position: 'relative' }}>
            <ControlBar
                reFreshHandler={reFreshHandler}
                typeChangeHandler={typeChangeHandler}
                style={{ position: 'absolute', top: '-100px' }}
            />
            <DealTable type={type} controlReload={controlReload} />
        </div>
    );
};

export default DealPageComponent;

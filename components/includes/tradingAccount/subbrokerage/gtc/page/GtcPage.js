import { useState } from 'react';
import IconBtn from '../../../vipInventory/IconBtn';
import GtcTable from '../elements/GtcTable';

const GtcPage = () => {
    const [controlReload, setControlReload] = useState(0);
    const reFreshHandler = () => {
        setControlReload(prev => {
            return (prev += 1);
        });
        setTimeout(() => {
            setControlReload(0);
        }, 500);
    };
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-100px', right: 0 }}>
                <IconBtn
                    onClick={reFreshHandler}
                    type={'refresh'}
                    style={{
                        verticalAlign: 'top',
                        marginBottom: '10px',
                        cursor: 'pointer',
                    }}
                />
            </div>
            <GtcTable controlReload={controlReload} />
        </div>
    );
};

export default GtcPage;

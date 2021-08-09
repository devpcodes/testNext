import { useState } from 'react';
import { Button } from 'antd';
import ShareholdingTable from '../elements/ShareholdingTable';
import IconBtn from '../../../vipInventory/IconBtn';

const ShareholdingPage = () => {
    const [showSell, setShowSell] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [controlReload, setControlReload] = useState(0);
    const sellBtnHandler = data => {
        console.log('dddd', data);
        if (data.length > 0) {
            setShowSell(true);
            setSelectData(data);
        } else {
            setShowSell(false);
            setSelectData([]);
        }
    };
    const sellClickHandler = () => {};
    const reFreshHandler = () => {
        setControlReload(prev => {
            return (prev += 1);
        });
        // setTimeout(() => {
        //     setControlReload(0);
        // }, 500);
    };
    return (
        <div>
            <div style={{ textAlign: 'right', position: 'relative' }}>
                {showSell && (
                    <Button style={{ marginBottom: '10px', position: 'absolute', left: 0 }} onClick={sellClickHandler}>
                        選取賣出
                    </Button>
                )}
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
            <ShareholdingTable showSellBtn={sellBtnHandler} controlReload={controlReload} />
        </div>
    );
};

export default ShareholdingPage;

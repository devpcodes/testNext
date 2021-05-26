import { useCallback, useState } from 'react';
import { Drawer } from 'antd';
import { InstallWebCA } from '../infoArea/InstallWebCA';
import UpdateBar from './UpdateBar';
import Info from './Info';
import ChartContainer from './quotes/ChartContainer';
import Fundamentals from './quotes/Fundamentals';
import DKbar from './quotes/DKbar';
import OrderDrawer from './OrderDrawer';
import OrderTab from './sbPanel/OrderTab';
const SBContainer = () => {
    const [checkCA, setCheckCA] = useState(false);
    const getCheckCA = useCallback(boo => {
        setCheckCA(boo);
    });
    return (
        <>
            <div className="SB__container">
                <InstallWebCA getCheckCA={getCheckCA} />
                {checkCA && <UpdateBar text={'請手動點擊更新，刷新報價'} />}
                <Info />
                <ChartContainer />
                <Fundamentals />
                <DKbar
                    close={78.99}
                    open={98.99}
                    low={58.99}
                    high={103.83}
                    text={'當日價格區間'}
                    style={{ marginBottom: '18px' }}
                />
                <DKbar close={78.99} open={98.99} low={53.15} high={145.09} text={'52週區間'} />
                <OrderDrawer>
                    <OrderTab />
                </OrderDrawer>
            </div>
        </>
    );
};

export default SBContainer;

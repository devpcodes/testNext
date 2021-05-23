import { useCallback, useState } from 'react';
import { InstallWebCA } from '../infoArea/InstallWebCA';
import UpdateBar from './UpdateBar';
import Info from './Info';
import ChartContainer from './quotes/ChartContainer';
import Fundamentals from './quotes/Fundamentals';
import DKbar from './quotes/DKbar';
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
                <DKbar close={78.99} open={98.99} low={58.99} high={103.83} />
            </div>
        </>
    );
};

export default SBContainer;

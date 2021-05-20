import { useCallback, useState } from 'react';
import { InstallWebCA } from '../infoArea/InstallWebCA';
import UpdateBar from './UpdateBar';

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
            </div>
        </>
    );
};

export default SBContainer;

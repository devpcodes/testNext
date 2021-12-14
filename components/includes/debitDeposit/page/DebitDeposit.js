import { useCallback, useContext, useState, useEffect } from 'react';
import AdvanceCollectionTabs from '../elements/AdvanceCollectionTabs';
import Apply from '../elements/Apply';
import Status from '../elements/Status';

const DebitDeposit = () => {
    const [acKey, setAcKey] = useState('0');
    const tabsDataHandler = () => {
        return [
            {
                name: '借券圈存申請',
                render: activeIndex => {
                    return <Apply active={acKey === '0' ? true : false} />;
                },
            },
            {
                name: '借券圈存查詢',
                render: activeIndex => {
                    return <Status active={acKey === '1' ? true : false} />;
                },
            },
        ];
    };

    const activeHandler = key => {
        setAcKey(key);
    };

    return (
        <div className="content">
            <h1 className="title">借券圈存</h1>
            <AdvanceCollectionTabs data={tabsDataHandler()} activeKeyHandler={activeHandler} />
            <style jsx>{`
                .content {
                    margin: 20px auto 0 auto;
                    max-width: 1000px;
                    font-size: 0px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .title {
                    text-align: center;
                    color: #333;
                    font-size: 36px;
                    font-weight: bold;
                    letter-spacing: 6px;
                    margin-bottom: 0;
                }
            `}</style>
        </div>
    );
};

export default DebitDeposit;

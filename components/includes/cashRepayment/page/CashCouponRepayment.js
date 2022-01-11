import { useCallback, useContext, useState, useEffect } from 'react';
import AdvanceCollectionTabs from '../../debitDeposit/elements/AdvanceCollectionTabs';
import Apply from '../elements/Apply';
import Status from '../elements/Status';

const CashCouponRepayment = () => {
    const [acKey, setAcKey] = useState('0');
    const tabsDataHandler = () => {
        return [
            {
                name: '現券償還申請',
                render: activeIndex => {
                    return <Apply active={acKey === '0' ? true : false} showSearchBox={false} />;
                },
            },
            {
                name: '現券償還查詢',
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
            <h1 className="title">現券償還</h1>
            <AdvanceCollectionTabs data={tabsDataHandler()} activeKeyHandler={activeHandler} />
            <style jsx>{`
                .content {
                    margin: 20px auto 0 auto;
                    max-width: 1280px;
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

export default CashCouponRepayment;

import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import AssetChartOverview from '../asset/chartOverview';
import AssetCarouselOverview from '../asset/assetCarouselOverview';
import AssetDetailContainer from '../asset/assetDetailContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchQueryRealTimePrtLosSum } from '../../../services/asset/queryRealTimePrtLosSum';
import { getToken } from '../../../services/user/accessToken';
import { setRealTimePrtLosSum } from '../../../store/asset/action';

const AssetMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    useEffect(async () => {
        const res = await fetchQueryRealTimePrtLosSum(getToken());
        dispatch(setRealTimePrtLosSum(res));
    }, []);
    return (
        <>
            <div className="asset__container">
                <AssetHeader title="資產總覽" />
                <AssetChartOverview />
                {!isMobile ? <AssetCarouselOverview /> : <></>}
                <AssetDetailContainer />
            </div>

            <style jsx>{`
                .asset__container {
                    padding-left: 10%;
                    padding-right: 10%;
                    padding-top: 20px;
                }
                @media (max-width: 768px) {
                    .asset__container {
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
            `}</style>
        </>
    );
});

export default AssetMain;

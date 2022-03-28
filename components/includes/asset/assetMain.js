import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import AssetChartOverview from '../asset/chartOverview';
import AssetCarouselOverview from '../asset/assetCarouselOverview';
import AssetDetailContainer from '../asset/assetDetailContainer';
import { useSelector } from 'react-redux';
const AssetMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    return (
        <>
            <div className="asset__container">
                <AssetHeader />
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

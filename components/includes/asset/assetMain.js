import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import AssetChartOverview from '../asset/chartOverview';
import AssetCarouselOverview from '../asset/assetCarouselOverview';
import AssetDetailContainer from '../asset/assetDetailContainer';
const AssetMain = memo(({}) => {
    return (
        <>
            <div className="asset__container">
                <AssetHeader />
                <AssetChartOverview />
                <AssetCarouselOverview />
                <AssetDetailContainer />
            </div>

            <style jsx>{`
                .asset__container {
                    padding-left: 10%;
                    padding-right: 10%;
                    padding-top: 20px;
                }
                @media (max-width: 800px) {
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

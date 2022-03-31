import { useCallback, useState, memo } from 'react';
import AssetHeader from '../asset/header';
import { useSelector } from 'react-redux';
import AssetDetailOverview from '../asset/assetDetailOverview';
import AssetDetailTable from '../asset/assetDetailTable';

const AssetDetailMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);

    return (
        <>
            <div className="asset__container">
                <AssetHeader title="台股庫存總市值" />
                <AssetDetailOverview />
                <AssetDetailTable />
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

export default AssetDetailMain;

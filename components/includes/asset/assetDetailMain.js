import { useCallback, useState, memo, useEffect } from 'react';
import AssetHeader from '../asset/header';
import { useSelector, useDispatch } from 'react-redux';
import AssetDetailOverview from '../asset/assetDetailOverview';
import AssetDetailTable from '../asset/assetDetailTable';
import { useRouter } from 'next/router';
import { fetchQueryRealTimePrtLosSum } from '../../../services/asset/queryRealTimePrtLosSum';
import { getToken } from '../../../services/user/accessToken';
import { setRealTimePrtLosSum } from '../../../store/asset/action';
import { getTitleData } from './getData';

const AssetDetailMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(async () => {
        const res = await fetchQueryRealTimePrtLosSum(getToken());
        dispatch(setRealTimePrtLosSum(res));
        setReload(true);
    }, []);
    const [reload, setReload] = useState(false);

    const titleDomData = getTitleData(router.query.type);

    return (
        <>
            <div className="asset__container">
                <AssetHeader title={titleDomData.title} type={router.query.type} />
                <AssetDetailOverview type={router.query.type} />
                <AssetDetailTable type={router.query.type} reload={reload} />
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

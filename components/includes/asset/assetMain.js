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
import Breadcrumb from '../breadcrumb/breadcrumb';
import { Modal } from 'antd';

const AssetMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [tabType, setTabType] = useState('S');

    const changeTypeHandler = useCallback(t => {
        setTabType(t);
    });

    useEffect(async () => {
        const res = await fetchQueryRealTimePrtLosSum(getToken());
        if (res?.success != null && res?.success === true) {
            dispatch(setRealTimePrtLosSum(res.result));
        } else {
            Modal.error({
                content: res === '伺服器錯誤' ? res : res.message,
            });
        }
    }, []);
    return (
        <>
            <div className="asset__container">
                <Breadcrumb categoryName={'首頁'} articleTitle={'資產總覽'} />
                <AssetHeader title="資產總覽" />
                <AssetChartOverview />
                {!isMobile ? <AssetCarouselOverview changeTypeHandler={changeTypeHandler} /> : <></>}
                <AssetDetailContainer tabType={tabType} />
            </div>

            <style jsx>{`
                .asset__container {
                    padding-left: 10%;
                    padding-right: 10%;
                    padding-top: 20px;
                    background-color: #f9fbff;
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

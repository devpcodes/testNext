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
import { Modal, message } from 'antd';

const AssetMain = memo(({}) => {
    const isMobile = useSelector(store => store.layout.isMobile);
    const dispatch = useDispatch();
    const [tabType, setTabType] = useState('S');

    const changeTypeHandler = useCallback(t => {
        setTabType(t);
    });

    useEffect(async () => {
        const res = await fetchQueryRealTimePrtLosSum(getToken());

        const errorMsgArr = [];
        Object.keys(res.result.data).map(function (objectKey, index) {
            var responseStatus = res.result.data[objectKey].status;
            if (!responseStatus.success) {
                errorMsgArr.push(responseStatus.message);
            }
        });
        if (errorMsgArr.length > 0) {
            message.destroy();
            message.error({
                content: (
                    <>
                        <h4 className="msg__title">部分商品結算或系統維護中,會有資產總數減少的情況,請稍候再做查詢。</h4>
                    </>
                ),
            });
        }

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
            <style jsx global>{`
                .msg__title {
                    display: inline;
                    font-weight: bold;
                }
                .msg__content {
                    margin: 7px 5px 0px 0px;
                }
            `}</style>
        </>
    );
});

export default AssetMain;

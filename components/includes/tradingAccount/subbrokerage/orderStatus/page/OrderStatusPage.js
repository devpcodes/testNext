import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderStatusTable from '../elements/OrderStatusTable';
import theme from '../../../../../../resources/styles/theme';
// import IconBtn from '../../../vipInventory/IconBtn';
// import { useCheckMobile } from '../../../../../../hooks/useCheckMobile';
import ControlBar from '../elements/ControlBar';
import DelButton from '../../../vipOrderStatus/buttons/DelButton';
import { setModal } from '../../../../../../store/components/layouts/action';
import { delCancelList } from '../../../../../../services/components/goOrder/sb/postCancel';
import { usePlatform } from '../../../../../../hooks/usePlatform';

const OrderStatusPage = () => {
    const [touchPriceFilterValue, setTouchPriceFilterValue] = useState(false);
    const [controlReload, setControlReload] = useState(0);
    const [selectData, setSelectData] = useState([]);
    const [showDel, setShowDel] = useState(false);
    const userInfo = useSelector(store => store.user.currentAccount);
    const dispatch = useDispatch();
    const platform = usePlatform();
    const delClickHandler = () => {
        if (selectData.length > 0) {
            dispatch(
                setModal({
                    title: '刪單確認',
                    content: `確認刪除${selectData.length}筆資料嗎？`,
                    visible: true,
                    type: 'confirm',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                        let res = await delCancelList(userInfo, selectData, platform, true);
                        const delSuccess = res.filter(item => {
                            if (item === 'True') {
                                return true;
                            }
                        });

                        setControlReload(prev => {
                            return (prev += 1);
                        });
                        setTimeout(() => {
                            setControlReload(0);
                        }, 1000);
                        setShowDel(false);
                        dispatch(
                            setModal({
                                visible: true,
                                content: `共刪除${selectData.length}筆資料，${delSuccess.length}筆資料刪除成功，${
                                    selectData.length - delSuccess.length
                                }筆資料刪除失敗`,
                                type: 'info',
                                title: '系統訊息',
                            }),
                        );
                    },
                }),
            );
        }
    };

    const reFreshHandler = useCallback(() => {
        setControlReload(prev => {
            return (prev += 1);
        });
        setTimeout(() => {
            setControlReload(0);
        }, 500);
    });

    const filterHandler = useCallback(checked => {
        setTouchPriceFilterValue(checked);
    });

    const delBtnHandler = useCallback(data => {
        if (data.length > 0) {
            setShowDel(true);
            setSelectData(data);
        } else {
            setShowDel(false);
            setSelectData([]);
        }
    });

    return (
        <div className="vipOrderStatus__container">
            {showDel && <DelButton text="刪單" style={{ position: 'absolute' }} onClick={delClickHandler} />}
            <ControlBar filterHandler={filterHandler} reFreshHandler={reFreshHandler} />
            <OrderStatusTable
                touchPriceFilterValue={touchPriceFilterValue}
                controlReload={controlReload}
                showDelBtn={delBtnHandler}
            />
            <style jsx>
                {`
                    .sum__container {
                        margin-bottom: 17px;
                        margin-top: -7px;
                    }
                    .vipOrderStatus__container {
                        position: relative;
                        // padding-left: 10%;
                        // padding-right: 10%;
                        // padding-top: 50px;
                    }
                    @media (max-width: 1250px) {
                        .vipOrderStatus__container {
                            padding-left: 5%;
                            padding-right: 5%;
                        }
                    }
                    @media (max-width: 1111px) {
                        .vipOrderStatus__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                    }
                    .title {
                        font-size: 2.8rem;
                        color: #0d1623;
                        margin-top: -30px;
                        margin-bottom: 20px;
                    }
                    .control__container {
                        position: relative;
                    }
                    @media (max-width: ${theme.mobileBreakPoint}px) {
                        .vipOrderStatus__container {
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .control__container {
                            padding-left: 20px;
                            padding-right: 20px;
                        }
                        .title {
                            font-size: 2rem;
                            font-weight: bold;
                            margin-top: -36px;
                            margin-bottom: 10px;
                        }
                        .sum__container {
                            padding: 0 20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};
export default OrderStatusPage;

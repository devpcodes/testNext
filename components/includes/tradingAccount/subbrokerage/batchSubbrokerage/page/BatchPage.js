import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { usePlatform } from '../../../../../../hooks/usePlatform';
import { submitListService } from '../../../../../../services/components/goOrder/sb/submitService';
import { setModal } from '../../../../../../store/components/layouts/action';
import { setOrderList } from '../../../../../../store/subBrokerage/action';
import IconBtn from '../../../vipInventory/IconBtn';
import DelButton from '../../../vipOrderStatus/buttons/DelButton';
import BatchTable from '../elements/BatchTable';

const BatchPage = () => {
    const [showBtn, setShowBtn] = useState(false);
    const [selectData, setSelectData] = useState([]);
    const [parentLoading, setParentLoading] = useState(false);
    const orderList = useSelector(store => store.subBrokerage.orderList);
    const userInfo = useSelector(store => store.user.currentAccount);
    const [refresh, setRefresh] = useState(0);
    const platform = usePlatform();
    const dispatch = useDispatch();
    const selectItemHandler = useCallback(data => {
        if (data.length > 0) {
            setShowBtn(true);
            setSelectData(data);
        } else {
            setShowBtn(false);
            setSelectData([]);
        }
    });
    const delHandler = (selectData, orderList) => {
        const newOrderList = orderList.filter(item => {
            const delData = selectData.findIndex(sItem => {
                return item.key === sItem.key;
            });
            if (delData === -1) {
                return true;
            }
        });
        dispatch(setOrderList(newOrderList));
    };

    const submitHandler = (selectData, type) => {
        if (selectData.length > 0) {
            dispatch(
                setModal({
                    title: '賣出送出',
                    content: type === 'signle' ? '確認送出此筆資料嗎？' : `確認送出${selectData.length}筆資料嗎？`,
                    visible: true,
                    type: 'confirm',
                    onOk: async () => {
                        dispatch(setModal({ visible: false }));
                        let subData = dataHandler(selectData);
                        try {
                            setParentLoading(true);
                            let res = await submitListService(userInfo, subData, platform);
                            setParentLoading(false);
                            const sellSuccess = subData.filter((item, i) => {
                                if (res[i] === 'True') {
                                    return true;
                                }
                            });
                            dispatch(setOrderList(keepHandler(sellSuccess)));
                            if (type !== 'signle') {
                                dispatch(
                                    setModal({
                                        visible: true,
                                        content: `共刪除${selectData.length}筆資料，${
                                            sellSuccess.length
                                        }筆資料刪除成功，${selectData.length - sellSuccess.length}筆資料刪除失敗`,
                                        type: 'info',
                                        title: '系統訊息',
                                    }),
                                );
                            } else {
                                dispatch(
                                    setModal({
                                        visible: true,
                                        content: '委託已送出',
                                        type: 'info',
                                        title: '系統訊息',
                                    }),
                                );
                            }
                        } catch (error) {
                            dispatch(
                                setModal({
                                    visible: true,
                                    content: error,
                                    type: 'info',
                                    title: '系統訊息',
                                }),
                            );
                        }
                    },
                }),
            );
        }
    };

    const refreshHandler = () => {
        setRefresh(prev => {
            return (prev += 1);
        });
    };

    const dataHandler = data => {
        const newData = data.map(item => {
            item.price = item.Price;
            item.qty = item.Qty;
            item.exch = item.Exchid;
            if (item?.GTCDate) {
                item.useGtc = true;
                item.gtcDate = moment(item.GTCDate).format('YYYY-MM-DD');
            }
            return item;
        });
        return newData;
    };

    const keepHandler = data => {
        const newData = data.filter(item => {
            if (item.isKeep) {
                return true;
            }
        });
        return newData;
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: '-100px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    {showBtn && (
                        <>
                            <DelButton text="刪單" onClick={delHandler.bind(null, selectData, orderList)} />
                            <DelButton
                                text="送單"
                                type={'submit'}
                                style={{ backgroundColor: '#10419c', marginLeft: '18px' }}
                                onClick={submitHandler.bind(null, selectData, orderList)}
                                loading={parentLoading}
                            />
                        </>
                    )}
                </div>
                <IconBtn type={'refresh'} style={{ verticalAlign: 'top' }} onClick={refreshHandler} />
            </div>
            <BatchTable
                selectItemHandler={selectItemHandler}
                submitHandler={submitHandler}
                refresh={refresh}
                parentLoading={parentLoading}
            />
        </div>
    );
};

export default BatchPage;
